import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import QuickViewModal from '../components/common/QuickViewModal';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOHead from '../components/common/SEOHead';
import { productService } from '../config/appwrite';
import { INITIAL_PRODUCTS } from '../config/seedData';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const all = await productService.getAll();
        if (all && all.length > 0) setProducts(all);
      } catch (err) {
        console.error('Failed to load products for search:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    }
  };

  const matchingProducts = products.filter((p) => {
    if (!query) return true;
    const term = query.toLowerCase();
    const matchName = p.name.toLowerCase().includes(term);
    const matchCollection = p.collection.toLowerCase().includes(term);
    const matchFamily = (p.fragranceFamily || '').toLowerCase().includes(term);
    const matchNotes = [...(p.topNotes || []), ...(p.heartNotes || []), ...(p.baseNotes || [])]
      .some(n => n.toLowerCase().includes(term));
    const matchDesc = p.description.toLowerCase().includes(term);
    return matchName || matchCollection || matchFamily || matchNotes || matchDesc;
  });

  return (
    <>
      <SEOHead
        title={query ? `Search Results for "${query}"` : 'Search Fragrances'}
        description="Search AURA SUBLIME luxury perfumes, Cambodian oud, and exquisite botanical essences."
      />

      <div className="bg-obsidian-950 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Search Results' }]} />

          <div className="max-w-2xl mx-auto text-center my-8">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50 uppercase mb-4">
              Fragrance Search
            </h1>
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <SearchIcon className="w-5 h-5 text-gold-400 absolute left-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by perfume name, notes (e.g. Cambodian Oud, Amber, Rose)..."
                className="w-full bg-obsidian-900 border border-gold-500/30 rounded-xl pl-12 pr-28 py-3.5 text-sm text-ivory-100 placeholder-gray-500 focus:outline-none focus:border-gold-400"
              />
              <button
                type="submit"
                className="absolute right-2 bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs font-semibold px-5 py-2.5 rounded-lg uppercase tracking-wider transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          <div className="my-8 pb-4 border-b border-gold-500/15 flex items-center justify-between text-xs text-gray-400">
            <div>
              {query ? (
                <span>
                  Found <strong className="text-gold-300 font-semibold">{matchingProducts.length}</strong> creations for <span className="text-ivory-100 italic font-display text-sm">"{query}"</span>
                </span>
              ) : (
                <span>Displaying all {matchingProducts.length} master creations</span>
              )}
            </div>
            <Link to="/shop" className="text-gold-400 hover:underline">
              Browse All Fragrances
            </Link>
          </div>

          <ProductGrid
            products={matchingProducts}
            loading={loading}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        </div>

        <QuickViewModal
          product={quickViewProduct}
          isOpen={Boolean(quickViewProduct)}
          onClose={() => setQuickViewProduct(null)}
        />
      </div>
    </>
  );
}
