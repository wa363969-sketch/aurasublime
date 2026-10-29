import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, MessageSquare, Printer, ArrowRight, Package, Truck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { orderService } from '../config/appwrite';
import { formatPKR } from '../utils/currency';
import { createWhatsAppUrl, generateOrderSupportMessage } from '../utils/whatsapp';
import SEOHead from '../components/common/SEOHead';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#C5A059', '#FAF8F5', '#8E6733'],
      });
    } catch {}

    async function loadOrder() {
      try {
        const found = await orderService.getByOrderNumber(orderId);
        setOrder(found);
      } catch (err) {
        console.error('Error fetching order confirmation:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppFollowUp = () => {
    const msg = generateOrderSupportMessage(order?.orderNumber || orderId, order?.customerName || 'Valued Patron');
    const url = createWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SEOHead
        title={`Order Confirmed — ${orderId}`}
        description="Your AURA SUBLIME order has been confirmed and submitted to our atelier."
      />

      <div className="bg-obsidian-950 min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Confirmation Header */}
          <div className="text-center space-y-4 mb-10">
            <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/40 flex items-center justify-center mx-auto text-gold-400 shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block">
              Atelier Order Received
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50 uppercase tracking-tight">
              Thank You For Your Patronage
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto font-light leading-relaxed">
              Your flacon selection has been scheduled for bespoke preparation and packaging at our flagship studio.
            </p>

            <div className="inline-block bg-obsidian-900 border border-gold-500/30 px-5 py-2.5 rounded-xl">
              <span className="text-xs text-gray-400 mr-2">Order Reference:</span>
              <strong className="font-serif text-gold-300 text-base tracking-widest">{orderId}</strong>
            </div>
          </div>

          {/* Order Details Card */}
          <div className="bg-obsidian-900 border border-gold-500/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl print:bg-white print:text-black">
            <div className="flex items-center justify-between pb-4 border-b border-gold-500/15">
              <h2 className="font-serif text-base font-bold text-ivory-50 uppercase tracking-wider print:text-black">
                Order Specification
              </h2>
              <button
                onClick={handlePrint}
                className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1.5 transition-colors print:hidden"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
            </div>

            {/* Recipient Details */}
            {order && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300 border-b border-gold-500/15 pb-6">
                <div>
                  <div className="text-[10px] uppercase text-gray-500 font-semibold mb-1">Delivering To:</div>
                  <div className="font-semibold text-ivory-100">{order.customerName}</div>
                  <div>{order.shippingAddress}</div>
                  <div className="text-gold-300">{order.city}, Pakistan</div>
                  <div className="text-gray-400 mt-1">Phone: {order.customerPhone}</div>
                </div>

                <div>
                  <div className="text-[10px] uppercase text-gray-500 font-semibold mb-1">Payment & Dispatch:</div>
                  <div className="font-semibold text-ivory-100 uppercase">
                    {order.paymentMethod === 'cod' ? 'Cash on Delivery (Nationwide)' : order.paymentMethod}
                  </div>
                  <div className="text-emerald-400 mt-1">Status: {order.orderStatus.toUpperCase()}</div>
                  <div className="text-gray-400 mt-1">Notification sent to: {order.customerEmail}</div>
                </div>
              </div>
            )}

            {/* Items Table */}
            {order?.items && (
              <div className="space-y-3">
                <div className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2">
                  Reserved Items
                </div>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-obsidian-800">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img src={item.image} alt="" className="w-10 h-12 object-cover rounded border border-gold-500/20" />
                      )}
                      <div>
                        <div className="font-serif font-semibold text-ivory-100">{item.name}</div>
                        <div className="text-[10px] text-gray-400">Size: {item.size} • Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="font-serif font-semibold text-gold-300">
                      {formatPKR(item.price * item.quantity)}
                    </div>
                  </div>
                ))}

                {/* Totals */}
                <div className="space-y-1.5 pt-4 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPKR(order.subtotal)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-gold-400">
                      <span>Privilege Discount</span>
                      <span>-{formatPKR(order.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping Across Pakistan</span>
                    <span>{order.shippingFee === 0 ? 'Complimentary' : formatPKR(order.shippingFee)}</span>
                  </div>
                  <div className="flex justify-between font-serif text-base font-bold text-ivory-50 pt-2 border-t border-obsidian-800">
                    <span>Total Amount</span>
                    <span className="text-gold-300">{formatPKR(order.total)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 print:hidden">
            <button
              onClick={handleWhatsAppFollowUp}
              className="w-full sm:flex-1 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 py-3.5 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Confirm with Concierge on WhatsApp</span>
            </button>

            <Link
              to="/track-order"
              className="w-full sm:flex-1 bg-obsidian-900 hover:bg-obsidian-850 border border-gold-500/30 text-gold-200 py-3.5 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <Truck className="w-4 h-4 text-gold-400" />
              <span>Track Dispatch Status</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
