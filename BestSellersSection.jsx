import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductGrid from '../product/ProductGrid';

export default function BestSellersSection({ products = [], onQuickView }) {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-24 bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-gold-400 text-[10px] font-bold uppercase tracking-luxury mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Patron Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50 uppercase tracking-tight">
              Best-Selling Creations
            </h2>
            <div className="w-16 h-0.5 bg-gold-500 mt-3" />
          </div>

          <Link
            to="/shop"
            className="mt-4 md:mt-0 text-xs font-semibold uppercase tracking-wider text-gold-300 hover:text-gold-200 flex items-center gap-2 group"
          >
            <span>View All Perfumes</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Cards */}
        <ProductGrid products={bestSellers} onQuickView={onQuickView} />
      </div>
    </section>
  );
}
