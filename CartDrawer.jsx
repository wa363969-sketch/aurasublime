import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageSquare, Tag, Check, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPKR } from '../../utils/currency';
import { createWhatsAppUrl, generateCartInquiry } from '../../utils/whatsapp';
import { BRAND } from '../../config/constants';

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError,
    amountNeededForFreeShipping,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    const msg = generateCartInquiry(items, total);
    const url = createWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-obsidian-900 border-l border-gold-500/30 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-gold-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gold-400" />
                <h2 className="font-serif text-lg font-semibold tracking-wider text-ivory-50 uppercase">
                  Your Shopping Bag
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-ivory-100 p-1"
                aria-label="Close cart drawer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="mt-4 bg-obsidian-800/80 p-3 rounded-lg border border-gold-500/20">
              {amountNeededForFreeShipping > 0 ? (
                <div>
                  <div className="flex items-center justify-between text-xs text-ivory-200 mb-1.5">
                    <span>Complimentary Delivery Meter</span>
                    <span className="text-gold-300 font-semibold">
                      Add {formatPKR(amountNeededForFreeShipping)} more
                    </span>
                  </div>
                  <div className="w-full bg-obsidian-700 h-1.5 rounded-full overflow-hidden">
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
                  <span>You have unlocked complimentary delivery across Pakistan!</span>
                </div>
              )}
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-obsidian-800 border border-gold-500/20 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-gold-400/60" />
                </div>
                <h3 className="font-serif text-lg text-ivory-100 mb-2">Your Bag is Empty</h3>
                <p className="text-xs text-gray-400 max-w-xs mb-6">
                  Experience true olfactory art. Explore our signature Cambodian oud and exquisite floral parfums.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs font-semibold px-6 py-3 rounded uppercase tracking-wider transition-colors"
                >
                  Explore Fragrances
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex gap-4 p-3 bg-obsidian-850 rounded-lg border border-gold-500/10 hover:border-gold-500/30 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded bg-obsidian-950 border border-gold-500/20 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.slug || item.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-serif text-sm font-semibold text-ivory-100 hover:text-gold-300 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          className="text-gray-500 hover:text-red-400 p-0.5 transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs text-gold-400/90 mt-0.5">
                        Size: <span className="text-ivory-200">{item.selectedSize}</span>
                      </div>
                      <div className="text-xs font-medium text-gold-300 mt-1">
                        {formatPKR(item.price)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-obsidian-750">
                      <div className="flex items-center border border-gold-500/30 rounded bg-obsidian-900">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                          className="p-1 text-gray-400 hover:text-ivory-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-ivory-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                          className="p-1 text-gray-400 hover:text-ivory-100"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-ivory-100">
                        {formatPKR(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gold-500/20 bg-obsidian-950/80 space-y-4">
              {/* Voucher Code Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-gold-500/10 border border-gold-500/30 px-3 py-2 rounded text-xs text-gold-300">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-gold-400" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.description})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-gray-400 hover:text-red-400 text-xs uppercase underline ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Privilege Voucher (Try AURA10)"
                    className="flex-1 bg-obsidian-850 border border-gold-500/30 rounded px-3 py-2 text-xs text-ivory-100 placeholder-gray-500 focus:outline-none focus:border-gold-400 uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-obsidian-800 border border-gold-500/40 hover:border-gold-400 text-gold-300 px-3 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-400">{couponError}</p>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-300 pt-2 border-t border-obsidian-800">
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
                  <span>Shipping (Pakistan)</span>
                  <span className="text-ivory-100 font-medium">
                    {shippingFee === 0 ? <strong className="text-gold-400 uppercase font-semibold">Free</strong> : formatPKR(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-ivory-100 pt-2 border-t border-obsidian-800">
                  <span className="font-serif">Total</span>
                  <span className="text-gold-300 font-bold">{formatPKR(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-gold-gradient hover:opacity-95 text-obsidian-950 font-semibold py-3 px-4 rounded text-xs uppercase tracking-luxury flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-emerald-800/20 hover:bg-emerald-800/30 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 py-2.5 px-4 rounded text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Inquire / Order via WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
