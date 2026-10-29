import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products = [], onQuickView, loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-obsidian-850 rounded-xl border border-gold-500/10 p-4 space-y-4 animate-pulse">
            <div className="aspect-[4/5] bg-obsidian-800 rounded-lg w-full" />
            <div className="h-4 bg-obsidian-750 rounded w-1/3" />
            <div className="h-5 bg-obsidian-750 rounded w-3/4" />
            <div className="h-3 bg-obsidian-750 rounded w-1/2" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-6 bg-obsidian-750 rounded w-1/3" />
              <div className="h-8 bg-obsidian-750 rounded w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-obsidian-850/50 rounded-2xl border border-gold-500/15">
        <h3 className="font-serif text-xl font-semibold text-ivory-100 mb-2">
          No Fragrances Found
        </h3>
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          We could not find fragrances matching your current search or filter criteria. Try adjusting your selections or exploring our complete collection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
      ))}
    </div>
  );
}
