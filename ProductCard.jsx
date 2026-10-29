import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPKR, calculateDiscountPercent } from '../../utils/currency';

export default function ProductCard({ product, onQuickView }) {
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0]?.size || '100ml'
  );
  const [isHovered, setIsHovered] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  const sizeObj = product.sizes?.find(s => s.size === selectedSize) || product.sizes?.[0];
  const currentPrice = sizeObj ? sizeObj.price : product.price;
  const originalPrice = sizeObj?.originalPrice || (product.discountPrice ? product.price : null);
  const discountPercent = calculateDiscountPercent(originalPrice, currentPrice);

  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop';
  const hoverImage = product.images?.[1] || mainImage;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-obsidian-850 rounded-xl border border-gold-500/15 hover:border-gold-500/40 transition-all duration-500 hover:shadow-2xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-obsidian-950">
        <Link to={`/product/${product.slug || product.id}`}>
          <img
            src={isHovered ? hoverImage : mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-gradient-to-r from-gold-600 to-gold-400 text-obsidian-950 font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded shadow-md">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-obsidian-900/90 border border-gold-400 text-gold-300 font-semibold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded shadow-md">
              New Batch
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-red-900/90 text-red-100 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border border-red-500/40">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
            isWishlisted
              ? 'bg-gold-500 text-obsidian-950 scale-110 shadow-lg'
              : 'bg-obsidian-900/70 text-gray-300 hover:text-gold-400 hover:scale-105 border border-gold-500/20'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-obsidian-950' : ''}`} />
        </button>

        {/* Quick View Button (Shows on Hover) */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex gap-2">
          <button
            onClick={handleQuickView}
            className="flex-1 bg-obsidian-900/90 hover:bg-obsidian-950 border border-gold-500/40 text-gold-200 hover:text-gold-300 py-2 rounded text-xs font-semibold uppercase tracking-wider backdrop-blur-md flex items-center justify-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Collection & Accords */}
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-gold-400/90 font-medium mb-1">
            <span>{product.collection} • {product.category}</span>
            <div className="flex items-center gap-1 text-gold-400">
              <Star className="w-3 h-3 fill-gold-400" />
              <span className="text-ivory-200">{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <Link
            to={`/product/${product.slug || product.id}`}
            className="block font-serif text-base font-semibold text-ivory-100 group-hover:text-gold-300 transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Tagline */}
          <p className="text-[11px] text-gray-400 italic font-display line-clamp-1 mt-0.5">
            "{product.tagline}"
          </p>

          {/* Key Fragrance Notes */}
          <div className="text-[11px] text-gray-400/90 mt-2 line-clamp-1">
            <span className="text-gold-300/80 font-medium">Notes: </span>
            {product.topNotes?.slice(0, 2).join(', ')}, {product.baseNotes?.[0]}
          </div>
        </div>

        {/* Size Selector Tabs */}
        <div>
          <div className="flex items-center gap-1.5 py-1">
            {product.sizes?.map((sizeItem) => (
              <button
                key={sizeItem.size}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedSize(sizeItem.size);
                }}
                className={`text-[10px] font-semibold px-2 py-0.5 rounded border transition-colors ${
                  selectedSize === sizeItem.size
                    ? 'border-gold-400 bg-gold-500/20 text-gold-200'
                    : 'border-obsidian-700 text-gray-400 hover:border-gold-500/40'
                }`}
              >
                {sizeItem.size}
              </button>
            ))}
          </div>

          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between pt-2 border-t border-obsidian-750">
            <div>
              <div className="font-serif text-sm sm:text-base font-bold text-gold-300">
                {formatPKR(currentPrice)}
              </div>
              {originalPrice && (
                <div className="text-[10px] text-gray-500 line-through">
                  {formatPKR(originalPrice)}
                </div>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-gold-500 hover:bg-gold-400 text-obsidian-950 p-2 rounded-lg transition-transform active:scale-95 shadow-md flex items-center gap-1.5 group/btn"
              title="Add to shopping bag"
              aria-label={`Add ${product.name} to shopping bag`}
            >
              <ShoppingBag className="w-4 h-4 text-obsidian-950" />
              <span className="text-[11px] font-bold uppercase tracking-wider hidden sm:inline">Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
