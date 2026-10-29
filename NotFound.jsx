import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="Flacon Not Found (404)"
        description="The requested fragrance sanctuary page could not be located."
      />

      <div className="bg-obsidian-950 min-h-[80vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center space-y-6 bg-obsidian-900 border border-gold-500/20 p-8 sm:p-12 rounded-2xl shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-400">
            <Compass className="w-8 h-8 animate-spin-slow" />
          </div>

          <div>
            <div className="font-serif text-5xl font-bold gold-text-gradient mb-2">404</div>
            <h1 className="font-serif text-2xl font-bold text-ivory-50 uppercase tracking-wide">
              An Uncharted Essence
            </h1>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              The page or flacon record you are seeking has evaporated into memory or has been moved to an exclusive archive.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/"
              className="flex-1 bg-gold-gradient text-obsidian-950 font-semibold py-3 px-4 rounded text-xs uppercase tracking-luxury flex items-center justify-center gap-2 shadow-lg"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>

            <Link
              to="/shop"
              className="flex-1 bg-obsidian-850 hover:bg-obsidian-800 border border-gold-500/30 text-gold-200 py-3 px-4 rounded text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <span>Explore Vault</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
