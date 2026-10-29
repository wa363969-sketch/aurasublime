import React from 'react';
import { Sparkles, Heart, Anchor } from 'lucide-react';

export default function FragrancePyramid({ topNotes = [], heartNotes = [], baseNotes = [] }) {
  return (
    <div className="bg-obsidian-850/80 border border-gold-500/20 rounded-xl p-6 sm:p-8 space-y-6">
      <div className="text-center">
        <h4 className="font-serif text-lg font-bold text-ivory-50 uppercase tracking-widest">
          The Olfactory Pyramid
        </h4>
        <p className="text-xs text-gold-300/80 font-display italic mt-1">
          An architectural symphony of evolving accords from opening spray to drydown.
        </p>
      </div>

      <div className="flex flex-col gap-4 max-w-lg mx-auto">
        {/* Top Notes (Peak of Pyramid) */}
        <div className="p-4 rounded-lg bg-obsidian-900 border border-gold-500/30 text-center relative group hover:border-gold-400 transition-colors">
          <div className="inline-flex items-center gap-1.5 text-gold-400 text-[10px] font-bold uppercase tracking-luxury mb-1">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Top Notes (First 15–30 Mins)</span>
          </div>
          <div className="text-sm font-serif font-medium text-ivory-100">
            {topNotes.join('  •  ')}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            The instant sparkling impression that awakens the senses upon application.
          </p>
        </div>

        {/* Heart Notes (Center of Pyramid) */}
        <div className="p-4 rounded-lg bg-obsidian-900 border border-gold-500/30 text-center relative group hover:border-gold-400 transition-colors">
          <div className="inline-flex items-center gap-1.5 text-gold-300 text-[10px] font-bold uppercase tracking-luxury mb-1">
            <Heart className="w-3.5 h-3.5 text-gold-300" />
            <span>Heart Notes (2–6 Hours)</span>
          </div>
          <div className="text-sm font-serif font-medium text-ivory-100">
            {heartNotes.join('  •  ')}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            The soul of the fragrance that defines its character and warmth.
          </p>
        </div>

        {/* Base Notes (Foundation of Pyramid) */}
        <div className="p-4 rounded-lg bg-obsidian-900 border border-gold-500/40 text-center relative group hover:border-gold-400 transition-colors shadow-lg">
          <div className="inline-flex items-center gap-1.5 text-gold-400 text-[10px] font-bold uppercase tracking-luxury mb-1">
            <Anchor className="w-3.5 h-3.5 text-gold-400" />
            <span>Base Notes (8–16+ Hours)</span>
          </div>
          <div className="text-sm font-serif font-semibold text-gold-200">
            {baseNotes.join('  •  ')}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            Deep Cambodian agarwood and amber accords that ground the trail on skin and fabric.
          </p>
        </div>
      </div>
    </div>
  );
}
