import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Context Providers
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Common Components
import AnnouncementBar from './components/common/AnnouncementBar';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CartDrawer from './components/common/CartDrawer';
import WhatsAppFloatingButton from './components/common/WhatsAppFloatingButton';

// Storefront Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import CollectionPage from './pages/CollectionPage';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import TrackOrder from './pages/TrackOrder';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import OrderHistory from './pages/OrderHistory';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import ShippingReturns from './pages/ShippingReturns';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import NotFound from './pages/NotFound';

// Admin Atelier
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminReviews from './pages/admin/AdminReviews';
import AdminSubscribers from './pages/admin/AdminSubscribers';
import AdminSettings from './pages/admin/AdminSettings';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-obsidian-900 text-ivory-100 selection:bg-gold-500 selection:text-obsidian-950">
      {/* Top Bar & Navigation (Hidden on Admin portal for clean focus) */}
      {!isAdminRoute && (
        <>
          <AnnouncementBar />
          <Navbar />
          <CartDrawer />
          <WhatsAppFloatingButton />
        </>
      )}

      {/* Main Page Routing */}
      <main className="flex-1">
        <Routes>
          {/* Storefront Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections/:collectionSlug" element={<CollectionPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/orders" element={<OrderHistory />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/shipping-returns" element={<ShippingReturns />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />

          {/* Admin Atelier Routes (Protected) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="subscribers" element={<AdminSubscribers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Footer */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
