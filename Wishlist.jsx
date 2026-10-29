import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/currency';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOHead from '../components/common/SEOHead';

export default function Wishlist() {
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
      <SEOHead
        title="Your Curated Wishlist"
        description="View your saved AURA SUBLIME perfumes and Cambodian oud fragrances."
      />

      <div className="bg-obsidian-950 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Curated Wishlist' }]} />

          <div className="flex flex-col sm:flex-row items-center justify-between my-8 pb-4 border-b border-gold-500/15 gap-4">
            <div>
              <h1 className="font-serif text-3xl font-bold text-ivory-50 uppercase tracking-tight">
                Your Saved Fragrances
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                You have {wishlist.length} creations saved in your private sanctuary.
              </p>
            </div>

            {wishlist.length > 0 && (
              <button
                onClick={clearWishlist}
                className="text-xs text-gray-400 hover:text-red-400 uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Wishlist</span>
              </button>
            )}
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-20 bg-obsidian-900 border border-gold-500/15 rounded-2xl max-w-xl mx-auto p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-obsidian-850 border border-gold-500/20 flex items-center justify-center mx-auto text-gold-400">
                <Heart className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-ivory-100">
                Your Wishlist is Empty
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                Explore our collections and tap the heart icon on any flacon to save your preferred scents for future moments.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-gold-gradient text-obsidian-950 font-semibold px-6 py-3 rounded text-xs uppercase tracking-luxury shadow-lg"
              >
                <span>Discover Perfumes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map((product) => {
                const defaultSize = product.sizes?.[0]?.size || '100ml';
                const defaultPrice = product.sizes?.[0]?.price || product.price;

                return (
                  <div
                    key={product.id}
                    className="bg-obsidian-850 rounded-xl border border-gold-500/15 overflow-hidden flex flex-col justify-between hover:border-gold-500/40 transition-all shadow-xl"
                  >
                    <div className="relative aspect-[4/5] bg-obsidian-950 overflow-hidden">
                      <Link to={`/product/${product.slug || product.id}`}>
                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </Link>

                      <button
                        onClick={() => toggleWishlist(product)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-obsidian-900/80 text-gold-400 hover:bg-gold-500 hover:text-obsidian-950 transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <div className="text-[10px] text-gold-400 uppercase tracking-wider font-semibold">
                          {product.collection}
                        </div>
                        <Link
                          to={`/product/${product.slug || product.id}`}
                          className="font-serif text-base font-semibold text-ivory-100 hover:text-gold-300 transition-colors block truncate"
                        >
                          {product.name}
                        </Link>
                        <div className="font-serif text-sm font-bold text-gold-300 mt-1">
                          {formatPKR(defaultPrice)}
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(product, defaultSize, 1)}
                        className="w-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-semibold py-2.5 px-3 rounded text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add {defaultSize} to Bag</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
