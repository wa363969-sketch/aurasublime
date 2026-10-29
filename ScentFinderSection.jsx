import React from 'react';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';

export default function ScentFinderSection({ onOpenScentFinder }) {
  return (
    <section className="py-20 bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-950 border-y border-gold-500/20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-obsidian-850 to-obsidian-950 border border-gold-500/30 rounded-2xl p-8 sm:p-12 lg:p-16 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-luxury">
              <Compass className="w-4 h-4 text-gold-400 animate-spin-slow" />
              <span>Interactive Fragrance Discovery</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50 uppercase tracking-tight">
              Unsure Where To Begin? <br />
              <span className="gold-text-gradient">Take The Scent Quiz</span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              Every persona carries a unique scent signature. Tell us your mood, cherished occasions, and preferred accords — our perfumer matchmaker will curate your ideal bottle in under 60 seconds.
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-center gap-3">
            <button
              onClick={onOpenScentFinder}
              className="bg-gold-gradient hover:opacity-95 text-obsidian-950 font-semibold px-8 py-4 rounded text-xs uppercase tracking-luxury flex items-center gap-3 shadow-xl hover:scale-105 transition-all"
            >
              <span>Launch Matchmaker</span>
              <Sparkles className="w-4 h-4" />
            </button>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">
              Takes 1 minute • Bespoke recommendations
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
