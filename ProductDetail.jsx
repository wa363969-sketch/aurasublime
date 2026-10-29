import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Heart,
  MessageSquare,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Plus,
  Minus,
  Check,
  Clock,
  Wind
} from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import FragrancePyramid from '../components/product/FragrancePyramid';
import ProductGrid from '../components/product/ProductGrid';
import SEOHead from '../components/common/SEOHead';
import { productService, reviewService } from '../config/appwrite';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '../config/seedData';
import { formatPKR, calculateDiscountPercent } from '../../src/utils/currency';
import { createWhatsAppUrl, generateProductInquiry } from '../../src/utils/whatsapp';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { BRAND } from '../config/constants';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('100ml');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('notes');

  // Review submission state
  const [reviewName, setReviewName] = useState('');
  const [reviewCity, setReviewCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewHeadline, setReviewHeadline] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const productsList = await productService.getAll();
        setAllProducts(productsList);

        const found = productsList.find(p => p.slug === id || p.id === id);
        if (found) {
          setProduct(found);
          setSelectedImage(found.images?.[0] || '');
          setSelectedSize(found.sizes?.[0]?.size || '100ml');

          // Track recently viewed
          try {
            const recent = JSON.parse(localStorage.getItem('aura_sublime_recently_viewed') || '[]');
            const updated = [found.id, ...recent.filter(item => item !== found.id)].slice(0, 6);
            localStorage.setItem('aura_sublime_recently_viewed', JSON.stringify(updated));
          } catch {}

          // Load reviews
          const revs = await reviewService.getByProductId(found.id);
          setReviews(revs);
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] bg-obsidian-950 flex flex-col items-center justify-center text-center p-4">
        <h2 className="font-serif text-2xl text-ivory-100 mb-2">Fragrance Not Found</h2>
        <p className="text-xs text-gray-400 mb-6">The requested perfume flacon does not exist or has been archived.</p>
        <Link to="/shop" className="bg-gold-500 text-obsidian-950 px-6 py-2.5 rounded text-xs font-semibold uppercase tracking-wider">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const sizeObj = product.sizes?.find(s => s.size === selectedSize) || product.sizes?.[0];
  const currentPrice = sizeObj ? sizeObj.price : product.price;
  const originalPrice = sizeObj?.originalPrice || (product.discountPrice ? product.price : null);
  const discountPercent = calculateDiscountPercent(originalPrice, currentPrice);

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.collection === product.collection || p.fragranceFamily === product.fragranceFamily))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleWhatsAppInquiry = () => {
    const msg = generateProductInquiry(product, selectedSize);
    const url = createWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) {
      showToast('Please complete all review fields.', 'error');
      return;
    }
    setIsSubmittingReview(true);
    try {
      const newRev = await reviewService.addReview({
        productId: product.id,
        productName: product.name,
        customerName: reviewName,
        city: reviewCity || 'Pakistan',
        rating: reviewRating,
        headline: reviewHeadline || 'Verified Experience',
        comment: reviewComment,
      });
      setReviews([newRev, ...reviews]);
      setReviewSubmitted(true);
      showToast('Thank you! Your verified review has been published.', 'success');
      setReviewComment('');
      setReviewHeadline('');
    } catch {
      showToast('Failed to post review. Please try again.', 'error');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <>
      <SEOHead
        title={`${product.name} — Luxury Fragrance`}
        description={product.description}
        image={selectedImage}
      />

      <div className="bg-obsidian-950 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Shop', href: '/shop' },
              { label: product.collection.toUpperCase(), href: `/collections/${product.collection}` },
              { label: product.name },
            ]}
          />

          {/* Product Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 my-8">
            {/* Left: Gallery */}
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-obsidian-900 border border-gold-500/20 shadow-2xl relative">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-obsidian-950/80 border border-gold-400 text-gold-300 text-[10px] uppercase tracking-widest px-3 py-1 rounded backdrop-blur-md font-semibold">
                    {product.concentration}
                  </span>
                  {product.isBestSeller && (
                    <span className="bg-gold-500 text-obsidian-950 text-[10px] uppercase tracking-widest px-3 py-1 rounded font-bold shadow-lg">
                      Best Seller
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
                    isWishlisted
                      ? 'bg-gold-500 text-obsidian-950'
                      : 'bg-obsidian-900/80 text-gray-300 hover:text-gold-400 border border-gold-500/20'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-obsidian-950' : ''}`} />
                </button>
              </div>

              {/* Thumbnail Selector */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-24 rounded-lg overflow-hidden border transition-all ${
                        selectedImage === img
                          ? 'border-gold-400 ring-2 ring-gold-400/30 scale-105'
                          : 'border-obsidian-750 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Story & Commercial Actions */}
            <div className="space-y-6">
              <div>
                <div className="text-xs uppercase tracking-regal text-gold-400 font-semibold mb-2">
                  {product.collection} Collection • {product.category} • {product.fragranceFamily}
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory-50 mb-2">
                  {product.name}
                </h1>

                <p className="font-display italic text-lg sm:text-xl text-gold-300/90 mb-4">
                  "{product.tagline}"
                </p>

                {/* Rating */}
                <div className="flex items-center gap-3 pb-4 border-b border-gold-500/15">
                  <div className="flex text-gold-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-300 font-medium">
                    {product.rating} / 5.0 ({product.reviewCount} verified connoisseurs)
                  </span>
                </div>
              </div>

              {/* Price & Stock */}
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-gold-300">
                  {formatPKR(currentPrice)}
                </span>
                {originalPrice && (
                  <span className="text-base text-gray-500 line-through">
                    {formatPKR(originalPrice)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-red-950/80 text-red-300 border border-red-500/30 text-xs px-2.5 py-0.5 rounded font-semibold uppercase">
                    Save {discountPercent}%
                  </span>
                )}
                <div className="ml-auto text-xs text-emerald-400 flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>In Stock ({product.stock} units available)</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Longevity & Sillage Pills */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-obsidian-900 border border-gold-500/20 text-xs">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-gold-400" />
                  <div>
                    <div className="text-[10px] uppercase text-gray-400">Longevity on Skin</div>
                    <div className="font-semibold text-ivory-100">{product.longevity}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Wind className="w-4 h-4 text-gold-400" />
                  <div>
                    <div className="text-[10px] uppercase text-gray-400">Sillage & Trail</div>
                    <div className="font-semibold text-ivory-100">{product.sillage}</div>
                  </div>
                </div>
              </div>

              {/* Bottle Volume Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-200 mb-2">
                  Select Flacon Size
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {product.sizes?.map((item) => (
                    <button
                      key={item.size}
                      onClick={() => setSelectedSize(item.size)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        selectedSize === item.size
                          ? 'border-gold-400 bg-gold-500/20 text-gold-200 shadow-md ring-1 ring-gold-400/50'
                          : 'border-obsidian-750 bg-obsidian-900 text-gray-400 hover:border-gold-500/40'
                      }`}
                    >
                      <div className="font-serif font-bold text-sm">{item.size}</div>
                      <div className="text-xs opacity-90 font-medium mt-0.5">{formatPKR(item.price)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart & WhatsApp */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-4">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-gold-500/30 rounded-lg bg-obsidian-900 px-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-gray-400 hover:text-ivory-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-semibold text-xs text-ivory-100">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-gray-400 hover:text-ivory-100"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gold-gradient hover:opacity-95 text-obsidian-950 font-semibold py-3.5 px-6 rounded-lg text-xs uppercase tracking-luxury flex items-center justify-center gap-2.5 shadow-xl transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {quantity}x to Bag</span>
                  </button>
                </div>

                {/* Direct WhatsApp Concierge Button */}
                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Inquire or Order via WhatsApp ({formatPKR(currentPrice * quantity)})</span>
                </button>
              </div>

              {/* Guarantees List */}
              <div className="pt-4 border-t border-gold-500/15 grid grid-cols-2 gap-4 text-[11px] text-gray-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Free tracked delivery across Pakistan over Rs. 5,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>100% Guaranteed Authentic Cambodian Oud</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fragrance Notes Pyramid */}
          <div className="my-16">
            <FragrancePyramid
              topNotes={product.topNotes}
              heartNotes={product.heartNotes}
              baseNotes={product.baseNotes}
            />
          </div>

          {/* Customer Reviews Section */}
          <div className="my-16 bg-obsidian-900 border border-gold-500/20 rounded-2xl p-6 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gold-500/15">
              <div>
                <h3 className="font-serif text-2xl font-bold text-ivory-50 uppercase tracking-tight">
                  Connoisseur Reviews
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Verified feedback from patrons who wear {product.name}.
                </p>
              </div>

              <div className="flex items-center gap-2 text-gold-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400" />
                ))}
                <span className="text-sm font-bold text-ivory-100 ml-1">
                  {product.rating} Average Rating
                </span>
              </div>
            </div>

            {/* Existing Reviews */}
            <div className="space-y-4 mb-10">
              {reviews.length === 0 ? (
                <p className="text-xs text-gray-400 italic">
                  Be the first to share your impression of {product.name}.
                </p>
              ) : (
                reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl bg-obsidian-850 border border-gold-500/15 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-gold-300">{rev.customerName}</span>
                        {rev.isVerified && (
                          <span className="text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                            Verified Connoisseur
                          </span>
                        )}
                        <span className="text-[10px] text-gray-500">• {rev.city}</span>
                      </div>
                      <div className="flex text-gold-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-gold-400" />
                        ))}
                      </div>
                    </div>
                    {rev.headline && (
                      <h4 className="font-serif text-xs font-bold text-ivory-100">
                        "{rev.headline}"
                      </h4>
                    )}
                    <p className="text-xs text-gray-300 leading-relaxed font-light">
                      {rev.comment}
                    </p>
                    <div className="text-[10px] text-gray-500">{rev.date}</div>
                  </div>
                ))
              )}
            </div>

            {/* Review Submission Form */}
            <div className="bg-obsidian-850 p-6 rounded-xl border border-gold-500/15">
              <h4 className="font-serif text-sm font-bold text-gold-300 uppercase tracking-wider mb-4">
                Share Your Fragrance Impression
              </h4>
              {reviewSubmitted ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-4 rounded border border-emerald-500/30">
                  <Check className="w-4 h-4" />
                  <span>Thank you. Your review has been submitted and verified.</span>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="e.g. Haider Tariq"
                        className="w-full bg-obsidian-900 border border-gold-500/30 rounded px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                        City (Pakistan)
                      </label>
                      <input
                        type="text"
                        value={reviewCity}
                        onChange={(e) => setReviewCity(e.target.value)}
                        placeholder="e.g. Lahore / Karachi"
                        className="w-full bg-obsidian-900 border border-gold-500/30 rounded px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                        Star Rating
                      </label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full bg-obsidian-900 border border-gold-500/30 rounded px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                      >
                        <option value="5">★★★★★ (5 Stars — Masterpiece)</option>
                        <option value="4">★★★★☆ (4 Stars — Excellent)</option>
                        <option value="3">★★★☆☆ (3 Stars — Good)</option>
                        <option value="2">★★☆☆☆ (2 Stars — Fair)</option>
                        <option value="1">★☆☆☆☆ (1 Star — Poor)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                        Headline
                      </label>
                      <input
                        type="text"
                        value={reviewHeadline}
                        onChange={(e) => setReviewHeadline(e.target.value)}
                        placeholder="e.g. Unrivaled Cambodian oud sillage"
                        className="w-full bg-obsidian-900 border border-gold-500/30 rounded px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                      Detailed Review
                    </label>
                    <textarea
                      rows="3"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Describe the projection, compliment factor, and evolving drydown..."
                      className="w-full bg-obsidian-900 border border-gold-500/30 rounded px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-semibold px-6 py-2.5 rounded text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {isSubmittingReview ? 'Submitting...' : 'Submit Verified Review'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Related Fragrances */}
          {relatedProducts.length > 0 && (
            <div className="my-16">
              <div className="text-center mb-10">
                <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-1">
                  Harmonizing Accords
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory-50 uppercase">
                  You May Also Admire
                </h3>
              </div>
              <ProductGrid products={relatedProducts} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
