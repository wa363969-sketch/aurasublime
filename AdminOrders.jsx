import React, { useState, useEffect } from 'react';
import { Search, Eye, Truck, CheckCircle2, Clock, X, AlertCircle } from 'lucide-react';
import { orderService } from '../../config/appwrite';
import { formatPKR } from '../../utils/currency';
import { useToast } from '../../context/ToastContext';
import SEOHead from '../../components/common/SEOHead';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Status update modal state
  const [newStatus, setNewStatus] = useState('processing');
  const [trackingNumber, setTrackingNumber] = useState('');
  const { showToast } = useToast();

  const loadOrders = async () => {
    try {
      const data = await orderService.getAll();
      setOrders(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleOpenStatusModal = (ord) => {
    setSelectedOrder(ord);
    setNewStatus(ord.orderStatus);
    setTrackingNumber(ord.trackingNumber || '');
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;

    await orderService.updateStatus(selectedOrder.id, newStatus, trackingNumber);
    showToast(`Order ${selectedOrder.orderNumber} updated to ${newStatus.toUpperCase()}.`, 'success');
    setSelectedOrder(null);
    loadOrders();
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'all' && o.orderStatus !== statusFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchNum = o.orderNumber.toLowerCase().includes(term);
      const matchName = o.customerName.toLowerCase().includes(term);
      const matchPhone = (o.customerPhone || '').includes(term);
      const matchCity = (o.city || '').toLowerCase().includes(term);
      if (!matchNum && !matchName && !matchPhone && !matchCity) return false;
    }
    return true;
  });

  return (
    <>
      <SEOHead title="Orders & Logistics — Admin Atelier" />

      <div className="space-y-6">
        {/* Header */}
        <div className="pb-6 border-b border-gold-500/20">
          <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-1">
            Fulfillment Concierge
          </span>
          <h1 className="font-serif text-3xl font-bold text-ivory-50 uppercase tracking-tight">
            Orders & Express Logistics
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Review nationwide orders, update dispatch state, and assign TCS / Leopards tracking consignments.
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-obsidian-850 p-4 rounded-xl border border-gold-500/20">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gold-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by order ref, client name, city..."
              className="w-full bg-obsidian-900 border border-gold-500/30 rounded-lg pl-9 pr-3 py-2 text-xs text-ivory-100 placeholder-gray-500 focus:outline-none focus:border-gold-400"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {['all', 'pending', 'processing', 'dispatched', 'delivered'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                  statusFilter === st
                    ? 'bg-gold-500 text-obsidian-950 shadow-md'
                    : 'bg-obsidian-900 border border-obsidian-750 text-gray-400 hover:text-ivory-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-obsidian-850 border border-gold-500/20 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase tracking-wider text-gray-400 bg-obsidian-900 border-b border-obsidian-750">
                <tr>
                  <th className="py-3.5 px-4">Order Ref</th>
                  <th className="py-3.5 px-3">Date</th>
                  <th className="py-3.5 px-3">Client</th>
                  <th className="py-3.5 px-3">City & Address</th>
                  <th className="py-3.5 px-3">Total Payable</th>
                  <th className="py-3.5 px-3">Fulfillment</th>
                  <th className="py-3.5 px-3">Tracking</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-obsidian-800 text-gray-300">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-obsidian-800/40 transition-colors">
                    <td className="py-3 px-4 font-serif font-bold text-gold-300">
                      {ord.orderNumber}
                    </td>
                    <td className="py-3 px-3 text-gray-400 text-[11px]">
                      {new Date(ord.createdAt || Date.now()).toLocaleDateString('en-PK')}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-ivory-100">{ord.customerName}</div>
                      <div className="text-[10px] text-gray-500">{ord.customerPhone}</div>
                    </td>
                    <td className="py-3 px-3 max-w-xs">
                      <div className="font-semibold text-ivory-200">{ord.city}</div>
                      <div className="text-[10px] text-gray-500 truncate">{ord.shippingAddress}</div>
                    </td>
                    <td className="py-3 px-3 font-serif font-bold text-ivory-100">
                      {formatPKR(ord.total)}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        ord.orderStatus === 'delivered'
                          ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300'
                          : ord.orderStatus === 'dispatched'
                          ? 'bg-blue-950/60 border border-blue-500/30 text-blue-300'
                          : 'bg-gold-500/15 border border-gold-500/30 text-gold-200'
                      }`}>
                        {ord.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-gold-300">
                      {ord.trackingNumber || '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleOpenStatusModal(ord)}
                        className="bg-obsidian-800 hover:bg-gold-500/20 border border-gold-500/30 text-gold-200 px-3 py-1.5 rounded text-xs uppercase font-semibold transition-colors"
                      >
                        Manage Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status & Fulfillment Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />

            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="relative w-full max-w-lg bg-obsidian-900 border border-gold-500/30 rounded-2xl p-6 sm:p-8 z-10 shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gold-500/15">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-ivory-50 uppercase tracking-wide">
                      Manage Order {selectedOrder.orderNumber}
                    </h3>
                    <div className="text-xs text-gray-400">{selectedOrder.customerName} ({selectedOrder.city})</div>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-ivory-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Items in order */}
                <div className="bg-obsidian-850 p-4 rounded-xl border border-gold-500/15 space-y-2 text-xs">
                  <div className="text-[10px] uppercase font-bold text-gray-400">Bottles In Order:</div>
                  {selectedOrder.items?.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-gray-300">
                      <span>{it.name} ({it.size}) × {it.quantity}</span>
                      <span className="font-serif font-bold text-gold-300">{formatPKR(it.price * it.quantity)}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-obsidian-800 flex justify-between font-bold text-ivory-100">
                    <span>Total Amount:</span>
                    <span>{formatPKR(selectedOrder.total)}</span>
                  </div>
                </div>

                <form onSubmit={handleUpdateStatus} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                      Fulfillment Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full bg-obsidian-850 border border-gold-500/30 rounded px-3 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400"
                    >
                      <option value="pending">Pending Verification</option>
                      <option value="processing">Artisanal Processing & Bottling</option>
                      <option value="dispatched">Dispatched via Courier</option>
                      <option value="delivered">Delivered to Patron</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                      Courier Consignment Tracking # (TCS / Leopards)
                    </label>
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="e.g. TCS-98214152"
                      className="w-full bg-obsidian-850 border border-gold-500/30 rounded px-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400 font-mono"
                    />
                    <span className="text-[10px] text-gray-500">Patrons can track this on the storefront tracking page.</span>
                  </div>

                  <div className="pt-4 border-t border-obsidian-800 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(null)}
                      className="px-4 py-2 rounded text-gray-400 hover:text-ivory-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-semibold px-6 py-2 rounded uppercase tracking-wider"
                    >
                      Update Fulfillment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
