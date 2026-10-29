import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle2, Clock, AlertCircle, Phone, ArrowRight } from 'lucide-react';
import { orderService } from '../config/appwrite';
import { formatPKR } from '../utils/currency';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOHead from '../components/common/SEOHead';

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    setError('');
    setHasSearched(true);

    if (!orderNumber.trim()) {
      setError('Please provide an order reference number (e.g. AS-98214).');
      return;
    }

    setLoading(true);
    try {
      const found = await orderService.getByOrderNumber(orderNumber.trim());
      if (found) {
        setOrder(found);
      } else {
        setOrder(null);
        setError(`No active order found with reference "${orderNumber.trim()}". Please verify the code or contact concierge.`);
      }
    } catch {
      setError('Failed to fetch tracking data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { key: 'pending', label: 'Order Placed', desc: 'Received in atelier system' },
    { key: 'processing', label: 'Artisanal Preparation', desc: 'Bottle inspection & maceration check' },
    { key: 'dispatched', label: 'Dispatched via Express Courier', desc: 'In transit with TCS / Leopards' },
    { key: 'delivered', label: 'Delivered', desc: 'Handed to patron' }
  ];

  const getStepStatus = (stepKey, currentStatus) => {
    const orderIndex = { pending: 0, processing: 1, dispatched: 2, delivered: 3 };
    const currentIdx = orderIndex[currentStatus] ?? 1;
    const stepIdx = orderIndex[stepKey];

    if (stepIdx < currentIdx) return 'completed';
    if (stepIdx === currentIdx) return 'current';
    return 'upcoming';
  };

  return (
    <>
      <SEOHead
        title="Track Your Order Status"
        description="Check real-time dispatch and courier tracking for your AURA SUBLIME luxury fragrance orders across Pakistan."
      />

      <div className="bg-obsidian-950 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Track Order Status' }]} />

          <div className="text-center max-w-xl mx-auto my-10">
            <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-2">
              Nationwide Logistics
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50 uppercase tracking-tight">
              Track Order Dispatch
            </h1>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4 mb-4" />
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Enter your order reference code (found in your SMS or email confirmation, e.g. AS-98214) to view live courier status.
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-obsidian-900 border border-gold-500/20 p-6 sm:p-8 rounded-2xl shadow-xl max-w-2xl mx-auto mb-10">
            <form onSubmit={handleTrack} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                  Order Reference *
                </label>
                <div className="relative">
                  <Package className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g. AS-98214 or AS-98215"
                    className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg pl-10 pr-3.5 py-3 text-xs text-ivory-100 placeholder-gray-500 uppercase focus:outline-none focus:border-gold-400 font-serif"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-lg text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold-gradient hover:opacity-95 text-obsidian-950 font-semibold py-3 px-4 rounded-lg text-xs uppercase tracking-luxury flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
              >
                <Search className="w-4 h-4" />
                <span>{loading ? 'Consulting Logistics...' : 'Locate Order'}</span>
              </button>
            </form>
          </div>

          {/* Tracking Result Card */}
          {order && (
            <div className="bg-obsidian-900 border border-gold-500/25 rounded-2xl p-6 sm:p-10 space-y-8 shadow-2xl animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gold-500/15 gap-4">
                <div>
                  <div className="text-[10px] uppercase text-gold-400 font-bold tracking-widest">
                    Live Dispatch Record
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-ivory-50 mt-1">
                    Order {order.orderNumber}
                  </h3>
                  <div className="text-xs text-gray-400 mt-1">
                    Placed by <strong className="text-ivory-200">{order.customerName}</strong> ({order.city})
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs text-gray-400">Total Value:</div>
                  <div className="font-serif text-lg font-bold text-gold-300">
                    {formatPKR(order.total)}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold uppercase mt-0.5">
                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Prepaid'}
                  </div>
                </div>
              </div>

              {/* Courier Tracking ID if available */}
              {order.trackingNumber && (
                <div className="bg-gold-500/10 border border-gold-500/30 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-gold-400" />
                    <div>
                      <div className="text-[10px] uppercase text-gray-400 font-semibold">Courier Consignment Number</div>
                      <div className="font-mono text-sm text-gold-300 font-bold">{order.trackingNumber}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-300 font-medium">TCS Express</span>
                </div>
              )}

              {/* Visual Timeline */}
              <div className="space-y-6">
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-gold-300">
                  Fulfillment Progression
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                  {steps.map((st, idx) => {
                    const status = getStepStatus(st.key, order.orderStatus);
                    return (
                      <div
                        key={st.key}
                        className={`p-4 rounded-xl border text-center flex flex-col items-center justify-between transition-all ${
                          status === 'completed'
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                            : status === 'current'
                            ? 'bg-gold-500/15 border-gold-400 ring-1 ring-gold-400/50 text-gold-200'
                            : 'bg-obsidian-850 border-obsidian-800 text-gray-500'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2 font-bold text-xs bg-obsidian-900 border">
                          {status === 'completed' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : status === 'current' ? (
                            <Clock className="w-4 h-4 text-gold-400 animate-spin" />
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <div className="font-serif text-xs font-semibold uppercase">{st.label}</div>
                        <p className="text-[10px] text-gray-400 mt-1">{st.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
