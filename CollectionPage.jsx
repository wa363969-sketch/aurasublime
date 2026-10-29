import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import QuickViewModal from '../components/common/QuickViewModal';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOHead from '../components/common/SEOHead';
import { productService } from '../config/appwrite';
import { COLLECTIONS } from '../config/constants';
import { INITIAL_PRODUCTS } from '../config/seedData';

export default function CollectionPage() {
  const { collectionSlug } = useParams();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const collectionInfo = COLLECTIONS.find(c => c.slug === collectionSlug) || {
    name: 'Luxury Collection',
    tagline: 'Artisanal Scents of Distinction',
    description: 'Immerse yourself in our signature creations.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1400&auto=format&fit=crop'
  };

  useEffect(() => {
    async function load() {
      try {
        const all = await productService.getAll();
        if (all && all.length > 0) setProducts(all);
      } catch (err) {
        console.error('Failed to load collection products:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [collectionSlug]);

  const collectionProducts = products.filter(p => p.collection === collectionSlug);

  return (
    <>
      <SEOHead
        title={`${collectionInfo.name} — Handcrafted Perfumes`}
        description={collectionInfo.description}
        image={collectionInfo.image}
      />

      <div className="bg-obsidian-950 min-h-screen pb-20">
        {/* Collection Hero Banner */}
        <div className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center overflow-hidden border-b border-gold-500/20">
          <img
            src={collectionInfo.image}
            alt={collectionInfo.name}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.35] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/60 to-transparent" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-16">
            <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-2">
              Aura Sublime Collection
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-ivory-50 uppercase tracking-tight mb-3">
              {collectionInfo.name}
            </h1>
            <p className="font-display italic text-lg sm:text-xl text-gold-200/90 mb-4">
              "{collectionInfo.tagline}"
            </p>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              {collectionInfo.description}
            </p>
          </div>
        </div>

        {/* Catalog Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumb
            items={[
              { label: 'Collections', href: '/shop' },
              { label: collectionInfo.name }
            ]}
          />

          <div className="flex items-center justify-between my-8 pb-4 border-b border-gold-500/15">
            <div className="text-xs text-gray-400">
              Showing <strong className="text-gold-300 font-semibold">{collectionProducts.length}</strong> master creations
            </div>
            <Link
              to="/shop"
              className="text-xs text-gold-400 hover:text-gold-300 font-semibold uppercase tracking-wider"
            >
              ← Back to All Collections
            </Link>
          </div>

          <ProductGrid
            products={collectionProducts}
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
