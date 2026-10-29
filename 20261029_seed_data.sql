-- ============================================================================
-- AURA SUBLIME — Complete Production Seed Migration
-- Target: Supabase PostgreSQL 15+
-- ============================================================================

-- 1. SEED CATEGORIES / COLLECTIONS
INSERT INTO public.categories (slug, name, tagline, description, image, display_order, is_active)
VALUES
  ('men', 'Men''s Collection', 'Bold, Magnetizing & Architectured', 'Deep leathers, smoked woods, and crisp citrus notes engineered for presence and undeniable confidence.', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop', 1, true),
  ('women', 'Women''s Collection', 'Ethereal, Sensual & Timeless', 'Florentine orris, Taif rose, and bourbon vanilla woven into lingering trails of soft luxury.', 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1000&auto=format&fit=crop', 2, true),
  ('oud', 'Oud Collection', 'Imperial Cambodian & Assam Agarwood', 'A tribute to age-old Arabian perfumery featuring pure aged oud resin, saffron nectar, and golden amber.', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop', 3, true),
  ('signature', 'Signature Scents', 'The Quintessential AURA SUBLIME Blends', 'Our master perfumer''s crown creations, balancing rare ingredients with extraordinary projection.', 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop', 4, true)
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active;

-- 2. SEED STORE SETTINGS
INSERT INTO public.store_settings (
  id, whatsapp_number, delivery_fee, free_shipping_threshold, announcement_text,
  is_announcement_active, support_email, support_phone, store_address, currency, currency_symbol
) VALUES (
  'global',
  '923001234567',
  250,
  5000,
  'Enjoy Complimentary Delivery Across Pakistan on Orders Above Rs. 5,000',
  true,
  'concierge@aurasublime.com',
  '+92 300 1234567',
  'Flagship Studio, Galleria Promenade, Gulberg III, Lahore, Pakistan',
  'PKR',
  'Rs.'
) ON CONFLICT (id) DO UPDATE
SET
  whatsapp_number = EXCLUDED.whatsapp_number,
  delivery_fee = EXCLUDED.delivery_fee,
  free_shipping_threshold = EXCLUDED.free_shipping_threshold,
  announcement_text = EXCLUDED.announcement_text,
  is_announcement_active = EXCLUDED.is_announcement_active,
  support_email = EXCLUDED.support_email,
  support_phone = EXCLUDED.support_phone,
  store_address = EXCLUDED.store_address;

-- 3. SEED PRODUCTS
INSERT INTO public.products (
  id, slug, name, tagline, description, collection, category, fragrance_family,
  price, discount_price, stock, longevity, sillage, concentration, sizes,
  top_notes, heart_notes, base_notes, images, mood, occasion,
  is_featured, is_best_seller, is_new_arrival, rating, review_count
) VALUES
(
  'prod-1',
  'oud-royale-sublime',
  'Oud Royale Sublime',
  'The Crown Jewel of Eastern Perfumery',
  'An intoxicating blend of wild Cambodian oud steeped in saffron nectar and smoked Damascena rose petals. Formulated for royalty, Oud Royale Sublime commands reverence and projects a warm, golden aura that lingers gracefully for hours.',
  'oud',
  'Unisex',
  'Oud & Amber',
  14500,
  12900,
  24,
  '12-16 Hours',
  'Enormous',
  'Extrait de Parfum (28%)',
  '[{"size": "30ml", "price": 5500, "inStock": true}, {"size": "50ml", "price": 8500, "inStock": true}, {"size": "100ml", "price": 12900, "originalPrice": 14500, "inStock": true}]'::jsonb,
  '["Persian Saffron", "Calabrian Bergamot", "Pink Peppercorn"]'::jsonb,
  '["Bulgarian Rose", "Smoked Leather", "Cedarwood Heart"]'::jsonb,
  '["Aged Cambodian Oud", "Golden Ambergris", "Bourbon Vanilla", "Sandalwood"]'::jsonb,
  '["https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop"]'::jsonb,
  '["Regal", "Nocturnal", "Authoritative"]'::jsonb,
  '["Black Tie", "Evening Galas", "Winter Ceremonies"]'::jsonb,
  true, true, false, 4.9, 38
),
(
  'prod-2',
  'velvet-santal-amber',
  'Velvet Santal & Amber',
  'Warmth, Opulence, and Timeless Distinction',
  'Creamy Australian sandalwood embraced by glowing amber resin, roasted cardamom, and powdery orris root. A velvety, comforting masterpiece that envelops the wearer like a warm cashmere shawl on a crisp autumn evening.',
  'signature',
  'Unisex',
  'Woody Oriental',
  12800,
  NULL,
  35,
  '10-12 Hours',
  'Moderate to Heavy',
  'Eau de Parfum (22%)',
  '[{"size": "30ml", "price": 4900, "inStock": true}, {"size": "50ml", "price": 7800, "inStock": true}, {"size": "100ml", "price": 12800, "inStock": true}]'::jsonb,
  '["Green Cardamom", "Crisp Bergamot", "Violet Leaf"]'::jsonb,
  '["Florentine Orris", "Ceylon Cinnamon", "Nutmeg"]'::jsonb,
  '["Australian Sandalwood", "Golden Amber", "Cashmere Wood", "White Musk"]'::jsonb,
  '["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop"]'::jsonb,
  '["Warm", "Cozy", "Sophisticated"]'::jsonb,
  '["Date Night", "Daily Luxury", "Intimate Gatherings"]'::jsonb,
  true, true, false, 4.8, 29
),
(
  'prod-3',
  'noir-eclat',
  'Noir Éclat',
  'The Enigmatic Essence of Nocturnal Magnetism',
  'Tailored for the modern gentleman of poise. Opening with zesty black pepper and bergamot, Noir Éclat quickly transitions into a brooding heart of French lavender and dark saddle leather before settling into smoky Haitian vetiver and tonka bean.',
  'men',
  'Men',
  'Aromatic Leather',
  11500,
  9900,
  18,
  '10-14 Hours',
  'Heavy',
  'Extrait de Parfum (24%)',
  '[{"size": "30ml", "price": 4500, "inStock": true}, {"size": "50ml", "price": 7200, "inStock": true}, {"size": "100ml", "price": 9900, "originalPrice": 11500, "inStock": true}]'::jsonb,
  '["Calabrian Bergamot", "Crushed Black Pepper", "Mandarin Zest"]'::jsonb,
  '["Provence Lavender", "Smoky Saddle Leather", "Nutmeg"]'::jsonb,
  '["Haitian Vetiver", "Dark Patchouli", "Roasted Tonka Bean"]'::jsonb,
  '["https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop"]'::jsonb,
  '["Mysterious", "Confident", "Sharp"]'::jsonb,
  '["Evening Dinners", "Executive Meetings", "Special Events"]'::jsonb,
  true, true, false, 4.9, 42
),
(
  'prod-4',
  'celestial-iris',
  'Celestial Iris',
  'A Whispered Symphony of Powdery Elegance',
  'An ethereal floral composition celebrating the aristocratic beauty of Florentine iris. Tender pear blossom and Italian neroli yield to powdery orris butter and Sambac jasmine, resting gracefully on a bed of sensual white musk.',
  'women',
  'Women',
  'Floral Powdery',
  13200,
  NULL,
  22,
  '8-10 Hours',
  'Moderate',
  'Eau de Parfum (20%)',
  '[{"size": "30ml", "price": 5200, "inStock": true}, {"size": "50ml", "price": 8000, "inStock": true}, {"size": "100ml", "price": 13200, "inStock": true}]'::jsonb,
  '["Crisp Pear", "Italian Mandarin", "Neroli Blossoms"]'::jsonb,
  '["Florentine Orris Root", "Damask Rose", "Night Sambac Jasmine"]'::jsonb,
  '["Silken White Musk", "Bourbon Vanilla Pod", "Siam Benzoin"]'::jsonb,
  '["https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop"]'::jsonb,
  '["Graceful", "Romantic", "Luminous"]'::jsonb,
  '["Weddings", "Daytime Elegance", "High Tea"]'::jsonb,
  true, false, true, 4.7, 19
),
(
  'prod-5',
  'sultani-amber-oud',
  'Sultani Amber Oud',
  'Imperial Majesty in Every Drop',
  'A decadent, dark creation featuring ancient Assam agarwood macerated with frankincense, styrax, and fossilized amber. Intense, hypnotic, and unforgettable—this fragrance is for those who leave an indelible legacy.',
  'oud',
  'Unisex',
  'Oud & Amber',
  16500,
  14800,
  12,
  '14-20 Hours',
  'Enormous',
  'Extrait de Parfum (30%)',
  '[{"size": "30ml", "price": 6200, "inStock": true}, {"size": "50ml", "price": 9800, "inStock": true}, {"size": "100ml", "price": 14800, "originalPrice": 16500, "inStock": true}]'::jsonb,
  '["Omani Frankincense", "Nutmeg", "Black Plum"]'::jsonb,
  '["Guaiac Wood", "Labdanum Resin", "Smoked Clove"]'::jsonb,
  '["Pure Assam Oud", "Fossil Amber", "Castoreum Accord", "Oakwood"]'::jsonb,
  '["https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop"]'::jsonb,
  '["Imperial", "Hypnotic", "Rare"]'::jsonb,
  '["Royal Occasions", "Cold Winter Nights", "Celebrations"]'::jsonb,
  false, false, true, 5.0, 14
),
(
  'prod-6',
  'rose-de-taif-musk',
  'Rose De Taif & Musk',
  'The Dew-Kissed Bloom of Arabesque Gardens',
  'Handpicked at dawn in the high-altitude gardens of Taif, this crystalline rose essence is harmonized with sweet lychee and velvet white musk. Light yet remarkably enduring, it represents modern romance at its most sublime.',
  'women',
  'Women',
  'Floral Powdery',
  12000,
  NULL,
  28,
  '9-12 Hours',
  'Moderate',
  'Eau de Parfum (22%)',
  '[{"size": "30ml", "price": 4800, "inStock": true}, {"size": "50ml", "price": 7500, "inStock": true}, {"size": "100ml", "price": 12000, "inStock": true}]'::jsonb,
  '["Morning Dew Accord", "Sparkling Lychee", "Pink Peony"]'::jsonb,
  '["Mountain Taif Rose", "Rose Geranium", "White Magnolia"]'::jsonb,
  '["Clean Crystal Musk", "Cedarwood", "Wild Honey"]'::jsonb,
  '["https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop"]'::jsonb,
  '["Romantic", "Fresh", "Gentle"]'::jsonb,
  '["Spring Days", "Garden Parties", "Weddings"]'::jsonb,
  false, true, false, 4.8, 31
),
(
  'prod-7',
  'emerald-vetiver',
  'Emerald Vetiver',
  'Crisp Precision and Earthy Sophistication',
  'A crisp, crystalline opening of bitter grapefruit and pink pepper grounds itself in the earthy roots of Haitian vetiver and wet granite. Clean, sharp, and invigorating, this is the definitive signature scent for discerning tastemakers.',
  'men',
  'Men',
  'Citrus Earthy',
  10800,
  NULL,
  20,
  '8-11 Hours',
  'Moderate',
  'Eau de Parfum (20%)',
  '[{"size": "30ml", "price": 4200, "inStock": true}, {"size": "50ml", "price": 6800, "inStock": true}, {"size": "100ml", "price": 10800, "inStock": true}]'::jsonb,
  '["Ruby Grapefruit", "Bitter Orange", "Crushed Peppercorns"]'::jsonb,
  '["Haitian Vetiver", "French Clary Sage", "Geranium"]'::jsonb,
  '["Forest Oakmoss", "Siam Benzoin", "Atlas Cedar"]'::jsonb,
  '["https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop"]'::jsonb,
  '["Energizing", "Clean", "Polished"]'::jsonb,
  '["Office", "Summer Evenings", "Signature Daily"]'::jsonb,
  false, false, false, 4.6, 16
),
(
  'prod-8',
  'musk-al-bahr',
  'Musk Al-Bahr',
  'Aquatic Freshness Embraced by Clean Sensuality',
  'Inspired by sea salt mist crashing against Arabian coastal cliffs. Marine ozone meets delicate water lily and driftwood, anchored by a deep drydown of silver ambergris and skin-warmed white musk.',
  'signature',
  'Unisex',
  'Fresh Aquatic',
  11000,
  9500,
  19,
  '8-10 Hours',
  'Moderate',
  'Eau de Parfum (20%)',
  '[{"size": "30ml", "price": 4300, "inStock": true}, {"size": "50ml", "price": 6900, "inStock": true}, {"size": "100ml", "price": 9500, "originalPrice": 11000, "inStock": true}]'::jsonb,
  '["Sea Salt Air", "Coastal Bergamot", "Ozonic Water Accord"]'::jsonb,
  '["Blue Cypress", "Water Lily", "Sea Spray Sage"]'::jsonb,
  '["Silver Ambergris", "White Cashmere Musk", "Driftwood"]'::jsonb,
  '["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1000&auto=format&fit=crop"]'::jsonb,
  '["Breezy", "Luminous", "Revitalizing"]'::jsonb,
  '["Resort", "Day Wear", "Summer Casual"]'::jsonb,
  false, false, true, 4.7, 21
)
ON CONFLICT (id) DO UPDATE
SET
  slug = EXCLUDED.slug,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  fragrance_family = EXCLUDED.fragrance_family,
  price = EXCLUDED.price,
  discount_price = EXCLUDED.discount_price,
  stock = EXCLUDED.stock,
  sizes = EXCLUDED.sizes,
  top_notes = EXCLUDED.top_notes,
  heart_notes = EXCLUDED.heart_notes,
  base_notes = EXCLUDED.base_notes,
  images = EXCLUDED.images;

-- 4. SEED INITIAL ORDERS
INSERT INTO public.orders (
  id, order_number, customer_name, customer_email, customer_phone, city,
  shipping_address, order_notes, items, subtotal, shipping_fee, discount, total,
  payment_method, payment_status, order_status, tracking_number, courier_name, created_at
) VALUES
(
  'order-101',
  'AS-98214',
  'Bilal Ahmed',
  'bilal.ahmed@example.com',
  '0301-4567890',
  'Lahore',
  'House 42, Street 8, Phase 5 DHA, Lahore',
  'Please deliver before 5 PM',
  '[{"id": "prod-1", "name": "Oud Royale Sublime", "size": "100ml", "price": 12900, "quantity": 1, "image": "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=300&auto=format&fit=crop"}]'::jsonb,
  12900,
  0,
  0,
  12900,
  'cod',
  'pending',
  'dispatched',
  'TCS-928173491',
  'TCS Express',
  '2026-10-28 11:30:00+00'
),
(
  'order-102',
  'AS-98215',
  'Zainab Raza',
  'zainab.raza@example.com',
  '0321-7654321',
  'Karachi',
  'Apartment 4B, Creek Vistas, DHA Phase 8, Karachi',
  '',
  '[{"id": "prod-4", "name": "Celestial Iris", "size": "50ml", "price": 8000, "quantity": 1, "image": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=300&auto=format&fit=crop"}, {"id": "prod-6", "name": "Rose De Taif & Musk", "size": "30ml", "price": 4800, "quantity": 1, "image": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=300&auto=format&fit=crop"}]'::jsonb,
  12800,
  0,
  1000,
  11800,
  'bank_transfer',
  'paid',
  'processing',
  '',
  'TCS Express',
  '2026-10-29 09:15:00+00'
)
ON CONFLICT (id) DO NOTHING;

-- 5. SEED INITIAL REVIEWS
INSERT INTO public.reviews (
  id, product_id, product_name, customer_name, city, rating, headline, comment, is_verified, status, created_at
) VALUES
(
  'rev-1',
  'prod-1',
  'Oud Royale Sublime',
  'Hamza Tariq',
  'Lahore',
  5,
  'Unrivaled sillage and authentic royal oud!',
  'I have tried niche fragrances from Roja and Xerjoff, and Oud Royale Sublime stands shoulder to shoulder with them at a fraction of the cost. Applied at 8 AM, and it was still radiating at midnight. Outstanding presentation box as well.',
  true,
  'approved',
  '2026-10-14 12:00:00+00'
),
(
  'rev-2',
  'prod-3',
  'Noir Éclat',
  'Daniyal Sheikh',
  'Karachi',
  5,
  'The ultimate evening signature scent.',
  'Noir Éclat received multiple compliments at an executive reception. The leather and lavender blend is exceptionally refined. Delivery across Karachi was within 24 hours.',
  true,
  'approved',
  '2026-10-20 15:30:00+00'
),
(
  'rev-3',
  'prod-4',
  'Celestial Iris',
  'Ayesha Malik',
  'Islamabad',
  5,
  'Pure poetry in a bottle.',
  'Soft, powdery Florentine iris with a creamy vanilla drydown. It feels extraordinarily regal without being overpowering. Will definitely be ordering the 100ml size next.',
  true,
  'approved',
  '2026-10-22 09:10:00+00'
),
(
  'rev-4',
  'prod-2',
  'Velvet Santal & Amber',
  'Farhan Zafar',
  'Rawalpindi',
  5,
  'Warm, cozy, and unmistakably premium.',
  'The sandalwood in this is creamy and rich. Perfect for cooler evenings. The magnetic bottle cap and weighted glass feel so luxurious.',
  true,
  'approved',
  '2026-10-25 18:45:00+00'
)
ON CONFLICT (id) DO NOTHING;

-- 6. SEED WEBSITE CONTENT (CMS)
INSERT INTO public.website_content (id, section, title, subtitle, content, media_url, cta_text, cta_link, is_active, display_order)
VALUES
(
  'hero_slide_1',
  'hero',
  'The Imperial Art of Scent',
  'Crown Formulations Steeped in Wild Agarwood & Grasse Florals',
  'Discover extraordinary extraits crafted for royalty and discerning connoisseurs across Pakistan.',
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1920&auto=format&fit=crop',
  'Explore The Vault',
  '/shop',
  true,
  1
),
(
  'promo_banner_1',
  'promo',
  'Complimentary Royale Discovery Sample with Every Flacon',
  'Hand-bottled 2ml Extrait discovery sample enclosed with all orders above Rs. 5,000.',
  'Use code ROYALTY at checkout for exclusive privileges.',
  NULL,
  'Claim Privilege',
  '/shop',
  true,
  1
),
(
  'brand_manifesto',
  'brand_story',
  'Our Olfactory Manifesto',
  'The Pursuit of Sublime Perfection',
  'AURA SUBLIME was founded upon a singular uncompromising ethos: to dismantle the compromise between accessible value and the intoxicating luxury of pure high-concentration perfumery. Sourcing vintage Cambodian oud distillations and French absolute extraits, each flacon undergoes 90 days of cool maceration.',
  'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop',
  'Read Atelier Story',
  '/about',
  true,
  1
)
ON CONFLICT (id) DO NOTHING;
