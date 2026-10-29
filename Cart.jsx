import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageSquare, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/currency';
import { createWhatsAppUrl, generateCartInquiry } from '../utils/whatsapp';
import { BRAND } from '../config/constants';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOHead from '../components/common/SEOHead';

export default function Cart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shippingFee,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError,
    amountNeededForFreeShipping,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  const handleWhatsAppInquiry = () => {
    if (items.length === 0) return;
    const msg = generateCartInquiry(items, total);
    const url = createWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SEOHead
        title="Your Shopping Bag"
        description="Review your luxury perfume selections before proceeding to secure checkout."
      />

      <div className="bg-obsidian-950 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Shopping Bag' }]} />

          <div className="flex flex-col sm:flex-row items-center justify-between my-8 pb-4 border-b border-gold-500/15 gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50 uppercase tracking-tight">
                Your Shopping Bag
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                You have {items.length} unique fragrances in your selection.
              </p>
            </div>

            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-gray-400 hover:text-red-400 uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Empty Bag</span>
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20 bg-obsidian-900 border border-gold-500/15 rounded-2xl max-w-xl mx-auto p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-obsidian-850 border border-gold-500/20 flex items-center justify-center mx-auto text-gold-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-ivory-100">
                Your Bag is Empty
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                Explore our collections and discover an exquisite Cambodian oud or floral masterpiece to complete your style.
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                {/* Free Shipping Meter */}
                <div className="bg-obsidian-900 p-4 rounded-xl border border-gold-500/20">
                  {amountNeededForFreeShipping > 0 ? (
                    <div>
                      <div className="flex justify-between text-xs text-ivory-200 mb-1.5 font-medium">
                        <span>Complimentary Pakistan Express Delivery Meter</span>
                        <span className="text-gold-300 font-bold">
                          Add {formatPKR(amountNeededForFreeShipping)} more
                        </span>
                      </div>
                      <div className="w-full bg-obsidian-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-gold-600 to-gold-400 h-full transition-all duration-500"
                          style={{
                            width: `${Math.min(100, (subtotal / BRAND.freeShippingThreshold) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-gold-300 font-medium">
                      <Sparkles className="w-4 h-4 text-gold-400" />
                      <span>Congratulations! You qualify for complimentary express delivery across Pakistan.</span>
                    </div>
                  )}
                </div>

                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize}`}
                    className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-obsidian-900 rounded-xl border border-gold-500/15"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-28 object-cover rounded-lg bg-obsidian-950 border border-gold-500/20 shrink-0"
                    />

                    <div className="flex-1 space-y-1 text-center sm:text-left">
                      <div className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold">
                        {item.collection}
                      </div>
                      <Link
                        to={`/product/${item.slug || item.id}`}
                        className="font-serif text-lg font-semibold text-ivory-100 hover:text-gold-300 transition-colors block"
                      >
                        {item.name}
                      </Link>
                      <div className="text-xs text-gray-400">
                        Bottle Volume: <span className="text-gold-200 font-medium">{item.selectedSize}</span>
                      </div>
                      <div className="text-sm font-serif font-bold text-gold-300 mt-1">
                        {formatPKR(item.price)}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-gold-500/30 rounded-lg bg-obsidian-850 px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                        className="p-1 text-gray-400 hover:text-ivory-100"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-ivory-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                        className="p-1 text-gray-400 hover:text-ivory-100"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Item Total & Remove */}
                    <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                      <div className="font-serif text-base font-bold text-ivory-50">
                        {formatPKR(item.price * item.quantity)}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-gray-500 hover:text-red-400 p-1 text-xs flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Order Summary */}
              <div className="bg-obsidian-900 border border-gold-500/20 p-6 rounded-xl space-y-6 h-fit sticky top-24">
                <h3 className="font-serif text-lg font-bold text-ivory-50 uppercase tracking-wider pb-4 border-b border-gold-500/15">
                  Order Summary
                </h3>

                {/* Voucher Code */}
                {appliedCoupon ? (
                  <div className="bg-gold-500/10 border border-gold-500/30 p-3 rounded-lg flex items-center justify-between text-xs text-gold-300">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gold-400" />
                      <span>{appliedCoupon.code} applied ({appliedCoupon.description})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-gray-400 hover:text-red-400 underline text-xs uppercase"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Privilege Voucher (Try AURA10)"
                        className="flex-1 bg-obsidian-850 border border-gold-500/30 rounded-lg px-3 py-2 text-xs text-ivory-100 placeholder-gray-500 uppercase focus:outline-none focus:border-gold-400"
                      />
                      <button
                        type="submit"
                        className="bg-obsidian-800 border border-gold-500/40 hover:border-gold-400 text-gold-300 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-red-400">{couponError}</p>}
                  </form>
                )}

                {/* Price Table */}
                <div className="space-y-2.5 text-xs text-gray-300 pt-2 border-t border-obsidian-800">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-ivory-100 font-medium">{formatPKR(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-gold-400">
                      <span>Privilege Discount</span>
                      <span>-{formatPKR(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping Across Pakistan</span>
                    <span className="text-ivory-100 font-medium">
                      {shippingFee === 0 ? <strong className="text-gold-400 uppercase font-semibold">Free</strong> : formatPKR(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-ivory-50 pt-3 border-t border-obsidian-800">
                    <span className="font-serif">Estimated Total</span>
                    <span className="text-gold-300">{formatPKR(total)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-gold-gradient hover:opacity-95 text-obsidian-950 font-semibold py-3.5 px-4 rounded-lg text-xs uppercase tracking-luxury flex items-center justify-center gap-2 shadow-xl transition-all"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleWhatsAppInquiry}
                    className="w-full bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 py-3 px-4 rounded-lg text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Inquire / Order via WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
