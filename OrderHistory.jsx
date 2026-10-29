import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, ExternalLink, ArrowRight } from 'lucide-react';
import { orderService } from '../config/appwrite';
import { formatPKR } from '../utils/currency';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOHead from '../components/common/SEOHead';
import { useAuth } from '../context/AuthContext';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const all = await orderService.getAll();
        // If user logged in, filter or show all demo orders
        setOrders(all);
      } catch (err) {
        console.error('Error fetching order history:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user]);

  return (
    <>
      <SEOHead
        title="Patron Order History"
        description="Review past AURA SUBLIME perfume orders, delivery status, and consignment tracking."
      />

      <div className="bg-obsidian-950 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Account', href: '/account' },
              { label: 'Order History' }
            ]}
          />

          <div className="my-8 pb-4 border-b border-gold-500/15 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-1">
                Records of Distinction
              </span>
              <h1 className="font-serif text-3xl font-bold text-ivory-50 uppercase tracking-tight">
                Your Order Archive
              </h1>
            </div>
            <Link
              to="/account"
              className="text-xs text-gold-400 hover:text-gold-300 uppercase tracking-wider"
            >
              ← Back to Account
            </Link>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center">
              <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16 bg-obsidian-900 border border-gold-500/15 rounded-2xl p-8 space-y-4">
              <Package className="w-12 h-12 text-gold-400/50 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-ivory-100">No Orders Placed Yet</h3>
              <p className="text-xs text-gray-400">You have not ordered any fragrances yet.</p>
              <Link to="/shop" className="inline-block bg-gold-500 text-obsidian-950 px-6 py-2.5 rounded text-xs uppercase font-semibold">
                Explore Scents
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-obsidian-900 border border-gold-500/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-obsidian-800">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-serif font-bold text-lg text-gold-300">
                          {ord.orderNumber}
                        </span>
                        <span className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded border ${
                          ord.orderStatus === 'delivered'
                            ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
                            : ord.orderStatus === 'dispatched'
                            ? 'bg-blue-950/60 border-blue-500/30 text-blue-300'
                            : 'bg-gold-500/15 border-gold-500/30 text-gold-200'
                        }`}>
                          {ord.orderStatus}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-400 mt-1">
                        Placed on {new Date(ord.createdAt || Date.now()).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        to={`/order-confirmation/${ord.orderNumber}`}
                        className="text-xs bg-obsidian-800 hover:bg-obsidian-750 border border-gold-500/20 text-gold-200 px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Receipt</span>
                      </Link>

                      <Link
                        to="/track-order"
                        className="text-xs bg-gold-500/20 hover:bg-gold-500/30 border border-gold-500/40 text-gold-300 px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Track</span>
                      </Link>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="space-y-2">
                    {ord.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1.5">
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <img src={item.image} alt="" className="w-10 h-12 object-cover rounded border border-gold-500/20" />
                          )}
                          <div>
                            <div className="font-serif font-semibold text-ivory-100">{item.name}</div>
                            <div className="text-[10px] text-gray-400">Volume: {item.size} • Qty: {item.quantity}</div>
                          </div>
                        </div>
                        <div className="font-serif font-semibold text-gold-300">
                          {formatPKR(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total and destination footer */}
                  <div className="pt-4 border-t border-obsidian-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-400 gap-2">
                    <div>
                      Destination: <strong className="text-ivory-200">{ord.shippingAddress}, {ord.city}</strong>
                    </div>
                    <div>
                      Total Paid / Payable:{' '}
                      <strong className="font-serif text-gold-300 text-sm font-bold ml-1">
                        {formatPKR(ord.total)}
                      </strong>{' '}
                      ({ord.paymentMethod.toUpperCase()})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
