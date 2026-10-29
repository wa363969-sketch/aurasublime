import React, { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import CollectionsPreview from '../components/home/CollectionsPreview';
import BestSellersSection from '../components/home/BestSellersSection';
import BrandStorySection from '../components/home/BrandStorySection';
import FragranceNotesSection from '../components/home/FragranceNotesSection';
import ScentFinderSection from '../components/home/ScentFinderSection';
import PromoBanner from '../components/home/PromoBanner';
import RealReviewsSection from '../components/home/RealReviewsSection';
import EditorialGallery from '../components/home/EditorialGallery';
import FAQSection from '../components/home/FAQSection';
import QuickViewModal from '../components/common/QuickViewModal';
import ScentFinderModal from '../components/common/ScentFinderModal';
import SEOHead from '../components/common/SEOHead';
import { productService, reviewService } from '../config/appwrite';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '../config/seedData';

export default function Home() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isScentFinderOpen, setIsScentFinderOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const prodData = await productService.getAll();
        if (prodData && prodData.length > 0) setProducts(prodData);
        const revData = await reviewService.getAll();
        if (revData && revData.length > 0) setReviews(revData);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      }
    }
    loadData();
  }, []);

  return (
    <>
      <SEOHead
        title="Luxury Perfumes & Royal Cambodian Oud"
        description="Experience AURA SUBLIME — Premium Yet Accessible Luxury perfumes. Formulated at high Extrait concentrations with Cambodian oud and French botanicals."
      />

      <div className="space-y-0">
        {/* 1. Cinematic Hero Section */}
        <HeroSection onOpenScentFinder={() => setIsScentFinderOpen(true)} />

        {/* 2. Collections Preview */}
        <CollectionsPreview />

        {/* 3. Best Sellers */}
        <BestSellersSection
          products={products}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* 4. Brand Heritage Story */}
        <BrandStorySection />

        {/* 5. Fragrance Notes Breakdown */}
        <FragranceNotesSection />

        {/* 6. Interactive Scent Finder Teaser */}
        <ScentFinderSection onOpenScentFinder={() => setIsScentFinderOpen(true)} />

        {/* 7. Promotional Release Banner */}
        <PromoBanner />

        {/* 8. Genuine Customer Impressions */}
        <RealReviewsSection reviews={reviews} />

        {/* 9. Editorial Gallery */}
        <EditorialGallery />

        {/* 10. FAQs */}
        <FAQSection />

        {/* Modals */}
        <QuickViewModal
          product={quickViewProduct}
          isOpen={Boolean(quickViewProduct)}
          onClose={() => setQuickViewProduct(null)}
        />

        <ScentFinderModal
          isOpen={isScentFinderOpen}
          onClose={() => setIsScentFinderOpen(false)}
        />
      </div>
    </>
  );
}
