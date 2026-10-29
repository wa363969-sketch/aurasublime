import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import QuickViewModal from '../components/common/QuickViewModal';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOHead from '../components/common/SEOHead';
import { productService } from '../config/appwrite';
import { INITIAL_PRODUCTS } from '../config/seedData';
import { COLLECTIONS, FRAGRANCE_FAMILIES } from '../config/constants';

export default function Shop() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state
  const [selectedCollection, setSelectedCollection] = useState(searchParams.get('collection') || 'all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedFamily, setSelectedFamily] = useState('All Families');
  const [sortBy, setSortBy] = useState('featured');
  const [priceMax, setPriceMax] = useState(20000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await productService.getAll();
        if (data && data.length > 0) setProducts(data);
      } catch (err) {
        console.error('Failed to load shop catalog:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Update when URL search params change
  useEffect(() => {
    const colParam = searchParams.get('collection');
    if (colParam) setSelectedCollection(colParam);
  }, [searchParams]);

  // Filtering and sorting logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search term in name, notes, accords
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          const matchName = p.name.toLowerCase().includes(term);
          const matchNotes = [...(p.topNotes || []), ...(p.heartNotes || []), ...(p.baseNotes || [])]
            .some(n => n.toLowerCase().includes(term));
          const matchDesc = p.description.toLowerCase().includes(term);
          if (!matchName && !matchNotes && !matchDesc) return false;
        }

        // Collection filter
        if (selectedCollection !== 'all' && p.collection !== selectedCollection) {
          return false;
        }

        // Gender filter
        if (selectedGender !== 'all' && p.category.toLowerCase() !== selectedGender.toLowerCase()) {
          return false;
        }

        // Fragrance Family
        if (selectedFamily !== 'All Families' && p.fragranceFamily !== selectedFamily) {
          return false;
        }

        // Price ceiling
        if (p.price > priceMax) {
          return false;
        }

        // Stock availability
        if (inStockOnly && p.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return (a.discountPrice || a.price) - (b.discountPrice || b.price);
        if (sortBy === 'price-desc') return (b.discountPrice || b.price) - (a.discountPrice || a.price);
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, searchTerm, selectedCollection, selectedGender, selectedFamily, priceMax, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCollection('all');
    setSelectedGender('all');
    setSelectedFamily('All Families');
    setSortBy('featured');
    setPriceMax(20000);
    setInStockOnly(false);
    setSearchTerm('');
    setSearchParams({});
  };

  return (
    <>
      <SEOHead
        title="Shop All Luxury Perfumes"
        description="Browse all handcrafted perfumes by AURA SUBLIME. Filter by collection, notes, Cambodian oud, and gender. Formulated for remarkable longevity."
      />

      <div className="bg-obsidian-950 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Shop All Fragrances' }]} />

          {/* Page Title */}
          <div className="text-center max-w-2xl mx-auto my-10">
            <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-2">
              The Grand Flacon Vault
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ivory-50 uppercase tracking-tight">
              Artisanal Perfumes
            </h1>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4 mb-4" />
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Explore pure Cambodian oud, smoked amber, Florentine iris, and French leather creations formulated with high oil concentrations for timeless distinction.
            </p>
          </div>

          {/* Search & Mobile Filter Toggle Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-obsidian-900 p-4 rounded-xl border border-gold-500/20">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gold-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by perfume name or notes..."
                className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg pl-9 pr-3 py-2 text-xs text-ivory-100 placeholder-gray-500 focus:outline-none focus:border-gold-400"
              />
            </div>

            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <span className="text-xs text-gray-400">
                Showing <strong className="text-gold-300 font-semibold">{filteredProducts.length}</strong> creations
              </span>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-obsidian-850 border border-gold-500/30 text-ivory-100 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-gold-400"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Batches</option>
              </select>
            </div>
          </div>

          {/* Main Layout: Filters Sidebar + Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block space-y-6 bg-obsidian-900 border border-gold-500/15 p-6 rounded-xl h-fit sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-gold-500/15">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-300">
                  <SlidersHorizontal className="w-4 h-4 text-gold-400" />
                  <span>Filter Vault</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-gray-400 hover:text-gold-300 text-[11px] flex items-center gap-1 transition-colors"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Collections Filter */}
              <div>
                <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-ivory-100 mb-3">
                  Collections
                </h4>
                <div className="space-y-1.5 text-xs">
                  <button
                    onClick={() => setSelectedCollection('all')}
                    className={`block w-full text-left py-1 px-2 rounded transition-colors ${
                      selectedCollection === 'all' ? 'bg-gold-500/20 text-gold-300 font-semibold' : 'text-gray-400 hover:text-ivory-100'
                    }`}
                  >
                    All Collections
                  </button>
                  {COLLECTIONS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCollection(c.slug)}
                      className={`block w-full text-left py-1 px-2 rounded transition-colors ${
                        selectedCollection === c.slug ? 'bg-gold-500/20 text-gold-300 font-semibold' : 'text-gray-400 hover:text-ivory-100'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender Category */}
              <div className="pt-4 border-t border-obsidian-800">
                <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-ivory-100 mb-3">
                  Gender Persona
                </h4>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {['all', 'Men', 'Women', 'Unisex'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGender(g)}
                      className={`py-1.5 px-2 rounded text-center border capitalize transition-colors ${
                        selectedGender.toLowerCase() === g.toLowerCase()
                          ? 'border-gold-400 bg-gold-500/20 text-gold-200'
                          : 'border-obsidian-750 text-gray-400 hover:border-gold-500/30'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fragrance Families */}
              <div className="pt-4 border-t border-obsidian-800">
                <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-ivory-100 mb-3">
                  Fragrance Family
                </h4>
                <div className="space-y-1 text-xs">
                  {FRAGRANCE_FAMILIES.map((fam) => (
                    <button
                      key={fam}
                      onClick={() => setSelectedFamily(fam)}
                      className={`block w-full text-left py-1 px-2 rounded transition-colors ${
                        selectedFamily === fam ? 'bg-gold-500/20 text-gold-300 font-semibold' : 'text-gray-400 hover:text-ivory-100'
                      }`}
                    >
                      {fam}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Ceiling Slider */}
              <div className="pt-4 border-t border-obsidian-800">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-serif font-semibold uppercase text-ivory-100">Max Price</span>
                  <span className="text-gold-300 font-semibold">Rs. {priceMax.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="20000"
                  step="500"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-gold-500 cursor-pointer"
                />
              </div>

              {/* In Stock Toggle */}
              <div className="pt-4 border-t border-obsidian-800 flex items-center justify-between text-xs">
                <span className="text-gray-300">In Stock Flacons Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-gold-500 w-4 h-4 rounded cursor-pointer"
                />
              </div>
            </aside>

            {/* Product Grid Area */}
            <div className="lg:col-span-3">
              <ProductGrid
                products={filteredProducts}
                loading={loading}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            </div>
          </div>
        </div>

        {/* Quick View Modal */}
        <QuickViewModal
          product={quickViewProduct}
          isOpen={Boolean(quickViewProduct)}
          onClose={() => setQuickViewProduct(null)}
        />
      </div>
    </>
  );
}
