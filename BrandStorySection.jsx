import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, HeartHandshake, Award } from 'lucide-react';
import { BRAND } from '../../config/constants';

export default function BrandStorySection() {
  return (
    <section className="py-24 bg-gradient-to-b from-obsidian-900 to-obsidian-950 border-y border-gold-500/10 relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Imagery Grid */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop"
                alt="AURA SUBLIME Perfumer Crafting Fragrance"
                className="w-full h-[480px] object-cover"
              />
            </div>

            {/* Overlapping Detail Card */}
            <div className="absolute -bottom-8 -right-4 sm:-right-8 z-20 bg-obsidian-850/95 border border-gold-500/40 p-6 rounded-xl shadow-2xl backdrop-blur-md max-w-xs hidden sm:block">
              <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Award className="w-4 h-4 text-gold-400" />
                <span>Niche Olfactory Standards</span>
              </div>
              <p className="text-xs text-gray-300 italic font-display">
                "We believe luxury should be an intimate sensory truth, not an unattainable illusion."
              </p>
              <div className="text-[10px] text-gold-300/80 uppercase font-semibold mt-2">
                — Master Perfumer, AURA SUBLIME
              </div>
            </div>
          </div>

          {/* Right: Narrative */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-luxury">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Philosophy & Heritage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory-50 uppercase tracking-tight leading-tight">
              Democratizing <br />
              <span className="gold-text-gradient">Royal Distinction</span>
            </h2>

            <p className="font-display italic text-lg text-gold-300">
              "{BRAND.tagline}"
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              <p>
                Founded with a bold vision in Pakistan, <strong>AURA SUBLIME</strong> bridges the divide between astronomical international niche pricing and accessible artisanal elegance. We believe discerning individuals should experience pure Cambodian oud, French iris, and Bulgarian rose without compromise.
              </p>
              <p>
                By cutting out traditional global intermediaries and exorbitant retail marketing markups, we channel resources directly into sourcing superior raw essences and formulating at genuine <strong>Extrait de Parfum concentrations (20% to 28%)</strong>.
              </p>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gold-500/15">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-ivory-100 uppercase">Macerated Formulations</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">Aged 60 days for peak depth and sillage.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-ivory-100 uppercase">Direct Concierge</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">Live WhatsApp guidance & nationwide COD.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs uppercase font-semibold tracking-luxury text-gold-300 hover:text-gold-200 border-b border-gold-400 pb-1 hover:border-gold-200 transition-all"
              >
                <span>Read Full Brand Memoir</span>
                <span className="text-base">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
