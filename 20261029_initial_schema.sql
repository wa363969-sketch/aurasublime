-- ============================================================================
-- AURA SUBLIME — Complete Production Database Schema & Security Migrations
-- Target: Supabase PostgreSQL 15+
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. PROFILES TABLE (Linked to Supabase Auth)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('admin', 'customer', 'staff')),
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index on role for fast permission checks
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Helper function: Check if current authenticated user has admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile upon new Supabase user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  initial_role TEXT := 'customer';
BEGIN
  -- If user email matches admin, automatically grant admin role
  IF NEW.email = 'admin@aurasublime.com' THEN
    initial_role := 'admin';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    initial_role
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================================================
-- 2. CATEGORIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  image TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);


-- ============================================================================
-- 3. PRODUCTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  collection TEXT NOT NULL DEFAULT 'signature',
  category TEXT DEFAULT 'Unisex',
  fragrance_family TEXT DEFAULT 'Woody Oriental',
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  discount_price NUMERIC(10, 2) CHECK (discount_price IS NULL OR discount_price >= 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  longevity TEXT DEFAULT '10-12 Hours',
  sillage TEXT DEFAULT 'Moderate',
  concentration TEXT DEFAULT 'Eau de Parfum',
  sizes JSONB DEFAULT '[]'::jsonb,
  top_notes JSONB DEFAULT '[]'::jsonb,
  heart_notes JSONB DEFAULT '[]'::jsonb,
  base_notes JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  mood JSONB DEFAULT '[]'::jsonb,
  occasion JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT FALSE,
  is_best_seller BOOLEAN DEFAULT FALSE,
  is_new_arrival BOOLEAN DEFAULT FALSE,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_collection ON public.products(collection);
CREATE INDEX IF NOT EXISTS idx_products_stock ON public.products(stock);


-- ============================================================================
-- 4. ORDERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  city TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  order_notes TEXT DEFAULT '',
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal NUMERIC(10, 2) NOT NULL,
  shipping_fee NUMERIC(10, 2) NOT NULL DEFAULT 0,
  discount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'cod',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  order_status TEXT NOT NULL DEFAULT 'processing' CHECK (order_status IN ('pending', 'processing', 'dispatched', 'delivered', 'cancelled')),
  tracking_number TEXT DEFAULT '',
  courier_name TEXT DEFAULT 'TCS Express',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_order_status ON public.orders(order_status);


-- ============================================================================
-- 5. REVIEWS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  product_name TEXT,
  customer_name TEXT NOT NULL,
  city TEXT DEFAULT 'Pakistan',
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  headline TEXT,
  comment TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT TRUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);


-- ============================================================================
-- 6. NEWSLETTER SUBSCRIBERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'footer',
  subscribed_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);


-- ============================================================================
-- 7. STORE SETTINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.store_settings (
  id TEXT PRIMARY KEY DEFAULT 'global',
  whatsapp_number TEXT DEFAULT '923001234567',
  delivery_fee NUMERIC(10, 2) DEFAULT 250,
  free_shipping_threshold NUMERIC(10, 2) DEFAULT 5000,
  announcement_text TEXT DEFAULT 'Enjoy Complimentary Delivery Across Pakistan on Orders Above Rs. 5,000',
  is_announcement_active BOOLEAN DEFAULT TRUE,
  support_email TEXT DEFAULT 'concierge@aurasublime.com',
  support_phone TEXT DEFAULT '+92 300 1234567',
  store_address TEXT DEFAULT 'Flagship Studio, Galleria Promenade, Gulberg III, Lahore, Pakistan',
  currency TEXT DEFAULT 'PKR',
  currency_symbol TEXT DEFAULT 'Rs.',
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);


-- ============================================================================
-- 8. WEBSITE CONTENT (CMS) TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.website_content (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  content TEXT,
  media_url TEXT,
  cta_text TEXT,
  cta_link TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_website_content_section ON public.website_content(section);


-- ============================================================================
-- 9. MEDIA ASSETS METADATA TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bucket TEXT NOT NULL DEFAULT 'product-assets',
  path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  filename TEXT NOT NULL,
  size_bytes BIGINT,
  mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);


-- ============================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- --- PROFILES POLICIES ---
DROP POLICY IF EXISTS "Public profiles read" ON public.profiles;
CREATE POLICY "Public profiles read" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id OR public.is_admin())
  WITH CHECK (auth.uid() = id OR public.is_admin());

-- --- CATEGORIES POLICIES ---
DROP POLICY IF EXISTS "Anyone can view categories" ON public.categories;
CREATE POLICY "Anyone can view categories" ON public.categories
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
CREATE POLICY "Admins can manage categories" ON public.categories
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- --- PRODUCTS POLICIES ---
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- --- ORDERS POLICIES ---
DROP POLICY IF EXISTS "Anyone can create order" ON public.orders;
CREATE POLICY "Anyone can create order" ON public.orders
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Customers can view their orders" ON public.orders;
CREATE POLICY "Customers can view their orders" ON public.orders
  FOR SELECT USING (
    customer_id = auth.uid() OR
    public.is_admin() OR
    auth.uid() IS NULL -- allows guest order tracking by order_number
  );

DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
CREATE POLICY "Admins can update orders" ON public.orders
  FOR UPDATE USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete orders" ON public.orders;
CREATE POLICY "Admins can delete orders" ON public.orders
  FOR DELETE USING (public.is_admin());

-- --- REVIEWS POLICIES ---
DROP POLICY IF EXISTS "Anyone can read approved reviews" ON public.reviews;
CREATE POLICY "Anyone can read approved reviews" ON public.reviews
  FOR SELECT USING (status = 'approved' OR public.is_admin());

DROP POLICY IF EXISTS "Anyone can submit reviews" ON public.reviews;
CREATE POLICY "Anyone can submit reviews" ON public.reviews
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can manage reviews" ON public.reviews;
CREATE POLICY "Admins can manage reviews" ON public.reviews
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- --- SUBSCRIBERS POLICIES ---
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
CREATE POLICY "Anyone can subscribe" ON public.subscribers
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view and delete subscribers" ON public.subscribers;
CREATE POLICY "Admins can view and delete subscribers" ON public.subscribers
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- --- STORE SETTINGS POLICIES ---
DROP POLICY IF EXISTS "Anyone can read settings" ON public.store_settings;
CREATE POLICY "Anyone can read settings" ON public.store_settings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can update settings" ON public.store_settings;
CREATE POLICY "Admins can update settings" ON public.store_settings
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- --- WEBSITE CONTENT POLICIES ---
DROP POLICY IF EXISTS "Anyone can read website content" ON public.website_content;
CREATE POLICY "Anyone can read website content" ON public.website_content
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage website content" ON public.website_content;
CREATE POLICY "Admins can manage website content" ON public.website_content
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- --- MEDIA ASSETS POLICIES ---
DROP POLICY IF EXISTS "Anyone can read media assets" ON public.media_assets;
CREATE POLICY "Anyone can read media assets" ON public.media_assets
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage media assets" ON public.media_assets;
CREATE POLICY "Admins can manage media assets" ON public.media_assets
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());


-- ============================================================================
-- 11. SUPABASE STORAGE BUCKET CONFIGURATION
-- ============================================================================
-- Note: Insert storage bucket if storage schema exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-assets', 'product-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies
DROP POLICY IF EXISTS "Public assets access" ON storage.objects;
CREATE POLICY "Public assets access" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-assets');

DROP POLICY IF EXISTS "Authenticated admin asset upload" ON storage.objects;
CREATE POLICY "Authenticated admin asset upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-assets' AND public.is_admin());

DROP POLICY IF EXISTS "Authenticated admin asset delete" ON storage.objects;
CREATE POLICY "Authenticated admin asset delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'product-assets' AND public.is_admin());
