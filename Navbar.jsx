import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { COLLECTIONS, BRAND } from '../../config/constants';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { totalItemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCollectionsOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-obsidian-950/95 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-2xl'
            : 'bg-obsidian-900/90 backdrop-blur-sm border-b border-gold-500/10 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Menu Toggle & Desktop Navigation */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-ivory-100 hover:text-gold-400 p-1.5 transition-colors"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <nav className="hidden lg:flex items-center gap-7 text-xs tracking-regal uppercase font-medium">
                <Link
                  to="/shop"
                  className={`transition-colors hover:text-gold-400 ${
                    location.pathname === '/shop' ? 'text-gold-400 font-semibold' : 'text-ivory-200'
                  }`}
                >
                  Shop All
                </Link>

                {/* Collections Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsCollectionsOpen(true)}
                  onMouseLeave={() => setIsCollectionsOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1.5 transition-colors hover:text-gold-400 ${
                      location.pathname.startsWith('/collections') ? 'text-gold-400 font-semibold' : 'text-ivory-200'
                    }`}
                  >
                    <span>Collections</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCollectionsOpen ? 'rotate-180 text-gold-400' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isCollectionsOpen && (
                    <div className="absolute top-full left-0 w-64 pt-3 z-50">
                      <div className="bg-obsidian-850/95 border border-gold-500/30 rounded-lg shadow-2xl backdrop-blur-md p-2 flex flex-col gap-1">
                        {COLLECTIONS.map(col => (
                          <Link
                            key={col.id}
                            to={`/collections/${col.slug}`}
                            className="px-4 py-3 rounded-md hover:bg-obsidian-750 text-ivory-100 hover:text-gold-300 transition-all text-left group"
                          >
                            <div className="font-serif tracking-widest text-xs font-semibold text-gold-300 group-hover:text-gold-200">
                              {col.name}
                            </div>
                            <div className="text-[10px] text-gray-400 tracking-normal normal-case mt-0.5 line-clamp-1">
                              {col.tagline}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  to="/about"
                  className={`transition-colors hover:text-gold-400 ${
                    location.pathname === '/about' ? 'text-gold-400 font-semibold' : 'text-ivory-200'
                  }`}
                >
                  Our Story
                </Link>

                <Link
                  to="/contact"
                  className={`transition-colors hover:text-gold-400 ${
                    location.pathname === '/contact' ? 'text-gold-400 font-semibold' : 'text-ivory-200'
                  }`}
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Center: Brand Identity Logo */}
            <div className="text-center">
              <Link to="/" className="inline-block group focus:outline-none">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    {/* Gold Emblem SVG */}
                    <svg className="w-5 h-5 text-gold-400 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 100" fill="currentColor">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="6 6" />
                      <path d="M50 20 L74 74 L65 74 L59 62 L41 62 L35 74 L26 74 Z M44 52 L56 52 L50 38 Z" />
                      <circle cx="50" cy="24" r="3" fill="#FFF" />
                    </svg>
                    <span className="font-serif text-xl sm:text-2xl md:text-3xl tracking-regal uppercase text-ivory-50 font-bold group-hover:text-gold-300 transition-colors">
                      AURA SUBLIME
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-sans tracking-luxury uppercase text-gold-400/90 font-medium -mt-0.5">
                    Premium Yet Accessible Luxury
                  </span>
                </div>
              </Link>
            </div>

            {/* Right: Actions (Search, Wishlist, Account, Cart) */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-ivory-200 hover:text-gold-400 p-1.5 transition-colors relative"
                aria-label="Search Fragrances"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="text-ivory-200 hover:text-gold-400 p-1.5 transition-colors relative"
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-500 text-obsidian-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse-subtle">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account / Admin Portal */}
              <Link
                to={user ? (isAdmin ? '/admin' : '/account') : '/login'}
                className="text-ivory-200 hover:text-gold-400 p-1.5 transition-colors relative hidden sm:block"
                aria-label="User Account"
                title={user ? `${user.name} (${user.role})` : 'Sign In'}
              >
                <div className="flex items-center gap-1.5">
                  <User className="w-5 h-5" />
                  {isAdmin && (
                    <span className="text-[10px] bg-gold-500/20 text-gold-300 border border-gold-500/40 px-1.5 py-0.5 rounded uppercase font-semibold">
                      Admin
                    </span>
                  )}
                </div>
              </Link>

              {/* Shopping Bag Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-gold-500/20 to-gold-600/10 border border-gold-500/40 hover:border-gold-400 px-3 py-1.5 rounded-full text-ivory-100 hover:text-gold-300 transition-all group"
                aria-label={`Shopping Bag (${totalItemCount} items)`}
              >
                <ShoppingBag className="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-gold-300">{totalItemCount}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Search Overlay */}
        {isSearchOpen && (
          <div className="border-t border-gold-500/20 bg-obsidian-950/95 backdrop-blur-md px-4 py-4 mt-3 transition-all animate-slide-down">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-gold-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search perfumes by name, notes (e.g. Cambodian Oud, Bergamot, Rose)..."
                className="w-full bg-transparent border-b border-gold-500/40 text-ivory-100 placeholder-gray-500 py-2 px-1 text-sm focus:border-gold-400 focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs font-semibold px-4 py-2 rounded uppercase tracking-wider transition-colors shrink-0"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-400 hover:text-ivory-100 p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Menu Slide-Over */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-sm bg-obsidian-900 border-r border-gold-500/30 p-6 flex flex-col justify-between h-full z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gold-500/20">
                <div className="flex flex-col">
                  <span className="font-serif text-lg font-bold tracking-widest text-gold-300">AURA SUBLIME</span>
                  <span className="text-[9px] uppercase tracking-luxury text-gold-400/80">Premium Fragrances</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-ivory-100 p-1"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 flex flex-col gap-4 text-sm font-medium tracking-wider uppercase">
                <Link
                  to="/"
                  className="py-2 text-ivory-100 hover:text-gold-400 border-b border-obsidian-800"
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  className="py-2 text-ivory-100 hover:text-gold-400 border-b border-obsidian-800"
                >
                  Shop All Perfumes
                </Link>

                <div className="py-2 border-b border-obsidian-800">
                  <div className="text-xs text-gold-400 font-semibold tracking-widest mb-2">Collections</div>
                  <div className="flex flex-col gap-2 pl-3">
                    {COLLECTIONS.map(col => (
                      <Link
                        key={col.id}
                        to={`/collections/${col.slug}`}
                        className="text-xs normal-case text-ivory-200 hover:text-gold-300 py-1"
                      >
                        {col.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/track-order"
                  className="py-2 text-ivory-100 hover:text-gold-400 border-b border-obsidian-800"
                >
                  Track Order
                </Link>
                <Link
                  to="/about"
                  className="py-2 text-ivory-100 hover:text-gold-400 border-b border-obsidian-800"
                >
                  Our Story
                </Link>
                <Link
                  to="/faqs"
                  className="py-2 text-ivory-100 hover:text-gold-400 border-b border-obsidian-800"
                >
                  FAQs
                </Link>
                <Link
                  to="/contact"
                  className="py-2 text-ivory-100 hover:text-gold-400 border-b border-obsidian-800"
                >
                  Contact Us
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="py-2 text-gold-300 font-bold border-b border-gold-500/30 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-gold-400" />
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </div>

            {/* Bottom Account Action */}
            <div className="pt-6 border-t border-gold-500/20">
              {user ? (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gold-300 font-semibold">{user.name}</div>
                    <div className="text-[10px] text-gray-400">{user.email}</div>
                  </div>
                  <Link
                    to="/account"
                    className="text-xs bg-gold-500/20 border border-gold-500/40 text-gold-200 px-3 py-1.5 rounded"
                  >
                    Account
                  </Link>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block text-center w-full py-2.5 rounded bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-semibold text-xs uppercase tracking-wider"
                >
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
