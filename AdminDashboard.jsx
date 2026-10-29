import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Banknote,
  ShoppingBag,
  Package,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Clock,
  Sparkles
} from 'lucide-react';
import StatCard from '../../components/admin/StatCard';
import { productService, orderService } from '../../config/appwrite';
import { formatPKR } from '../../utils/currency';
import SEOHead from '../../components/common/SEOHead';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [prodList, orderList] = await Promise.all([
          productService.getAll(),
          orderService.getAll(),
        ]);
        setProducts(prodList || []);
        setOrders(orderList || []);
      } catch (err) {
        console.error('Error fetching admin stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  // Compute metrics from stored orders
  const grossSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(grossSales / totalOrdersCount) : 0;
  const activeProductsCount = products.length;
  const lowStockProducts = products.filter(p => p.stock <= 15);
  const recentOrders = orders.slice(0, 5);

  return (
    <>
      <SEOHead title="Atelier Executive Overview" />

      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gold-500/20">
          <div>
            <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-1">
              Command Center
            </span>
            <h1 className="font-serif text-3xl font-bold text-ivory-50 uppercase tracking-tight">
              Executive Atelier Overview
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Real-time metrics, order fulfillments, and stock inventory.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/products"
              className="bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-semibold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors"
            >
              + Create Flacon
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Gross Revenue"
            value={formatPKR(grossSales)}
            subtitle="Based on stored orders"
            trend="+18%"
            icon={Banknote}
          />
          <StatCard
            title="Total Flacon Orders"
            value={totalOrdersCount}
            subtitle="Across Pakistan"
            trend="+12%"
            icon={ShoppingBag}
          />
          <StatCard
            title="Average Order Value"
            value={formatPKR(avgOrderValue)}
            subtitle="Extrait & EDP blends"
            icon={TrendingUp}
          />
          <StatCard
            title="Active Perfume Vault"
            value={activeProductsCount}
            subtitle="Master creations"
            icon={Package}
          />
        </div>

        {/* Low Stock Warning Banner if any */}
        {lowStockProducts.length > 0 && (
          <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <div className="font-semibold text-amber-200 uppercase tracking-wider">
                Low Inventory Notice ({lowStockProducts.length} Blends)
              </div>
              <p className="text-gray-300 mt-0.5">
                The following master creations are under 15 units remaining:{' '}
                {lowStockProducts.map(p => `${p.name} (${p.stock} units)`).join(', ')}. Consider initiating a fresh maceration batch.
              </p>
            </div>
            <Link
              to="/admin/products"
              className="text-xs text-amber-300 hover:underline shrink-0 uppercase font-semibold"
            >
              Restock Vault →
            </Link>
          </div>
        )}

        {/* Recent Orders Section */}
        <div className="bg-obsidian-850 border border-gold-500/20 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-obsidian-750">
            <div>
              <h2 className="font-serif text-lg font-bold text-ivory-50 uppercase tracking-wide">
                Recent Client Orders
              </h2>
              <p className="text-xs text-gray-400">Latest nationwide acquisitions</p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs text-gold-400 hover:text-gold-300 font-semibold uppercase tracking-wider flex items-center gap-1"
            >
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase tracking-wider text-gray-400 border-b border-obsidian-800">
                <tr>
                  <th className="py-3 px-3">Order Ref</th>
                  <th className="py-3 px-3">Client</th>
                  <th className="py-3 px-3">City</th>
                  <th className="py-3 px-3">Items</th>
                  <th className="py-3 px-3">Total</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-obsidian-800 text-gray-300">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-obsidian-800/50 transition-colors">
                    <td className="py-3.5 px-3 font-serif font-bold text-gold-300">
                      {ord.orderNumber}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-ivory-100">{ord.customerName}</div>
                      <div className="text-[10px] text-gray-500">{ord.customerPhone}</div>
                    </td>
                    <td className="py-3.5 px-3">{ord.city}</td>
                    <td className="py-3.5 px-3">
                      {ord.items?.length || 1} Flacon(s)
                    </td>
                    <td className="py-3.5 px-3 font-serif font-bold text-ivory-100">
                      {formatPKR(ord.total)}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded border ${
                        ord.orderStatus === 'delivered'
                          ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
                          : ord.orderStatus === 'dispatched'
                          ? 'bg-blue-950/60 border-blue-500/30 text-blue-300'
                          : 'bg-gold-500/15 border-gold-500/30 text-gold-300'
                      }`}>
                        {ord.orderStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 uppercase text-[10px]">
                      {ord.paymentMethod}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
