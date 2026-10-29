import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, Heart, LogOut, ShieldCheck, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOHead from '../components/common/SEOHead';

export default function Account() {
  const { user, logout, isAdmin } = useAuth();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-[70vh] bg-obsidian-950 flex flex-col items-center justify-center text-center p-4">
        <h2 className="font-serif text-2xl font-bold text-ivory-100 mb-2">Patron Sign-In Required</h2>
        <p className="text-xs text-gray-400 mb-6">Please sign in to view your membership profile and order records.</p>
        <Link to="/login" className="bg-gold-500 text-obsidian-950 px-6 py-2.5 rounded text-xs font-semibold uppercase tracking-wider">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="My Customer Account"
        description="Manage your AURA SUBLIME profile, view order history, and access saved wishlist fragrances."
      />

      <div className="bg-obsidian-950 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Patron Account' }]} />

          <div className="my-8 pb-4 border-b border-gold-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-1">
                Royal Patron Membership
              </span>
              <h1 className="font-serif text-3xl font-bold text-ivory-50 uppercase tracking-tight">
                Welcome, {user.name}
              </h1>
            </div>

            <button
              onClick={handleLogout}
              className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1.5 transition-colors uppercase tracking-wider"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Profile Overview */}
            <div className="bg-obsidian-900 border border-gold-500/20 rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-300">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-serif font-bold text-ivory-100">{user.name}</div>
                <div className="text-[11px] text-gray-400">{user.email}</div>
              </div>
              <div className="pt-2 border-t border-obsidian-800 flex items-center justify-between text-[11px]">
                <span className="text-gray-400">Membership Tier:</span>
                <span className="text-gold-300 font-semibold uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-gold-400" />
                  {isAdmin ? 'Master Director' : 'Royal Connoisseur'}
                </span>
              </div>
            </div>

            {/* Orders Quick Nav */}
            <Link
              to="/account/orders"
              className="bg-obsidian-900 border border-gold-500/20 hover:border-gold-400 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-300 mb-4">
                  <Package className="w-6 h-6" />
                </div>
                <div className="font-serif text-lg font-bold text-ivory-100 group-hover:text-gold-300 transition-colors">
                  Order History & Logistics
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  View past flacon orders, receipts, and live courier tracking.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1.5 text-xs text-gold-400 font-semibold uppercase tracking-wider">
                <span>View Orders</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Wishlist Quick Nav */}
            <Link
              to="/wishlist"
              className="bg-obsidian-900 border border-gold-500/20 hover:border-gold-400 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-300 mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <div className="font-serif text-lg font-bold text-ivory-100 group-hover:text-gold-300 transition-colors">
                  Curated Wishlist ({wishlistCount})
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Access your reserved perfume scents and bottles.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1.5 text-xs text-gold-400 font-semibold uppercase tracking-wider">
                <span>View Wishlist</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>

          {isAdmin && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-obsidian-900 to-obsidian-850 border border-gold-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gold-300 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  <span>Administrative Privileges Detected</span>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  You have authorized administrator credentials to manage products, update order dispatch status, moderate reviews, and configure store settings.
                </p>
              </div>
              <Link
                to="/admin"
                className="bg-gold-gradient text-obsidian-950 font-semibold px-6 py-2.5 rounded text-xs uppercase tracking-luxury shadow-lg shrink-0"
              >
                Access Admin Atelier
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
