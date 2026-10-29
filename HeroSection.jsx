import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { BRAND } from '../../config/constants';

export default function HeroSection({ onOpenScentFinder }) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-obsidian-950">
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2000&auto=format&fit=crop"
          alt="AURA SUBLIME Luxury Perfume"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/70 to-obsidian-950/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-obsidian-950/40 to-obsidian-950" />
      </div>

      {/* Decorative Gold Rings */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-gold-500/10 pointer-events-none -top-40 -right-40 animate-pulse-subtle" />
      <div className="absolute w-[800px] h-[800px] rounded-full border border-gold-500/5 pointer-events-none -bottom-60 -left-60" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 flex flex-col items-center">
        {/* Emblem Badge */}
        <div className="inline-flex items-center gap-2 bg-obsidian-900/80 border border-gold-500/30 px-4 py-1.5 rounded-full text-gold-300 text-xs font-semibold uppercase tracking-luxury mb-6 backdrop-blur-md shadow-xl animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Extrait & Eau de Parfum Concentrations</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ivory-50 uppercase leading-tight sm:leading-none mb-6">
          The Art of <br />
          <span className="gold-text-gradient font-extrabold">Sublime Presence</span>
        </h1>

        {/* Descriptive Tagline */}
        <p className="font-display italic text-lg sm:text-2xl text-gold-200/90 max-w-2xl mx-auto mb-4 font-light">
          "Premium Yet Accessible Luxury"
        </p>

        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed font-normal">
          Distilled from rare Cambodian oud, dew-kissed Taif roses, and sacred Florentine iris. Exceptional longevity, regal presentation, and complimentary nationwide express delivery.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            to="/shop"
            className="w-full sm:w-auto bg-gold-gradient hover:opacity-95 text-obsidian-950 font-semibold px-8 py-4 rounded text-xs uppercase tracking-luxury flex items-center justify-center gap-3 shadow-2xl transition-all hover:scale-105"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={onOpenScentFinder}
            className="w-full sm:w-auto bg-obsidian-900/90 hover:bg-obsidian-850 border border-gold-500/40 hover:border-gold-400 text-gold-200 px-8 py-4 rounded text-xs uppercase tracking-luxury flex items-center justify-center gap-2.5 backdrop-blur-md transition-all hover:scale-105"
          >
            <Compass className="w-4 h-4 text-gold-400" />
            <span>Fragrance Matchmaker</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-6 sm:gap-12 mt-16 pt-8 border-t border-gold-500/15 text-center text-xs text-gray-400 max-w-2xl">
          <div>
            <div className="font-serif text-lg sm:text-xl font-bold text-gold-300">28%</div>
            <div className="text-[10px] uppercase tracking-wider text-gray-400">Pure Oil Essence</div>
          </div>
          <div>
            <div className="font-serif text-lg sm:text-xl font-bold text-gold-300">14+ Hrs</div>
            <div className="text-[10px] uppercase tracking-wider text-gray-400">Proven Longevity</div>
          </div>
          <div>
            <div className="font-serif text-lg sm:text-xl font-bold text-gold-300">Pakistan</div>
            <div className="text-[10px] uppercase tracking-wider text-gray-400">Nationwide Express COD</div>
          </div>
        </div>
      </div>
    </section>
  );
}
