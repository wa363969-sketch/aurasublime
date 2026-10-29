import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, ShoppingBag, Heart, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPKR } from '../../utils/currency';
import { createWhatsAppUrl, generateProductInquiry } from '../../utils/whatsapp';

export default function QuickViewModal({ product, isOpen, onClose }) {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0]?.size || '100ml'
  );
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || ''
  );
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const currentSizeObj = product.sizes?.find(s => s.size === selectedSize) || product.sizes?.[0];
  const currentPrice = currentSizeObj ? currentSizeObj.price : product.price;
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    onClose();
  };

  const handleWhatsAppInquiry = () => {
    const msg = generateProductInquiry(product, selectedSize);
    const url = createWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-obsidian-900 border border-gold-500/30 rounded-xl shadow-2xl overflow-hidden z-10 animate-fade-in">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-gray-400 hover:text-ivory-100 p-1.5 bg-obsidian-950/60 rounded-full border border-gold-500/20 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Imagery */}
            <div className="p-6 bg-obsidian-950 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gold-500/10">
              <div className="aspect-square w-full rounded-lg overflow-hidden border border-gold-500/20 bg-obsidian-900">
                <img
                  src={selectedImage || product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-14 h-14 rounded overflow-hidden border transition-all ${
                        selectedImage === img
                          ? 'border-gold-400 scale-105'
                          : 'border-obsidian-750 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Perfume Details */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-regal text-gold-400 font-semibold mb-1">
                  {product.collection} Collection • {product.category}
                </div>

                <h3 className="font-serif text-2xl font-bold text-ivory-50 mb-1">
                  {product.name}
                </h3>

                <p className="text-xs text-gold-300/80 italic font-display mb-3">
                  "{product.tagline}"
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-gold-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-300 font-medium">
                    {product.rating} ({product.reviewCount} verified reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-serif text-2xl font-bold text-gold-300">
                    {formatPKR(currentPrice)}
                  </span>
                  {currentSizeObj?.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPKR(currentSizeObj.originalPrice)}
                    </span>
                  )}
                  <span className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded uppercase font-semibold">
                    In Stock ({product.stock} units)
                  </span>
                </div>

                {/* Fragrance Notes Breakdown */}
                <div className="mb-4 bg-obsidian-850 p-3 rounded-lg border border-gold-500/15 text-xs space-y-1.5">
                  <div className="text-gold-400 font-semibold tracking-wider uppercase text-[10px] mb-1">
                    Fragrance Pyramid
                  </div>
                  <div className="text-gray-300">
                    <strong className="text-gold-200">Top Notes:</strong> {product.topNotes?.join(', ')}
                  </div>
                  <div className="text-gray-300">
                    <strong className="text-gold-200">Heart Notes:</strong> {product.heartNotes?.join(', ')}
                  </div>
                  <div className="text-gray-300">
                    <strong className="text-gold-200">Base Notes:</strong> {product.baseNotes?.join(', ')}
                  </div>
                </div>

                {/* Bottle Size Selector */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                    Select Bottle Volume
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {product.sizes?.map((sizeItem) => (
                      <button
                        key={sizeItem.size}
                        onClick={() => setSelectedSize(sizeItem.size)}
                        className={`py-2 px-3 rounded text-xs font-medium border text-center transition-all ${
                          selectedSize === sizeItem.size
                            ? 'border-gold-400 bg-gold-500/20 text-gold-200 shadow-md'
                            : 'border-obsidian-700 bg-obsidian-850 text-gray-400 hover:border-gold-500/40'
                        }`}
                      >
                        <div className="font-semibold">{sizeItem.size}</div>
                        <div className="text-[10px] opacity-80">{formatPKR(sizeItem.price)}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-obsidian-800">
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gold-gradient hover:opacity-95 text-obsidian-950 font-semibold py-2.5 px-4 rounded text-xs uppercase tracking-luxury flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-2.5 rounded border transition-colors ${
                      isWishlisted
                        ? 'border-gold-400 bg-gold-500/20 text-gold-400'
                        : 'border-gold-500/30 text-gray-400 hover:text-ivory-100'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-gold-400' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={handleWhatsAppInquiry}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire on WhatsApp</span>
                  </button>

                  <Link
                    to={`/product/${product.slug || product.id}`}
                    onClick={onClose}
                    className="text-gold-400 hover:text-gold-300 flex items-center gap-1 transition-colors underline"
                  >
                    <span>Full Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
