import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, HeartHandshake, Award, Compass, ArrowRight } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOHead from '../components/common/SEOHead';
import { BRAND } from '../config/constants';

export default function About() {
  return (
    <>
      <SEOHead
        title="Our Heritage & Philosophy"
        description="Learn the artisanal story behind AURA SUBLIME. Premium yet accessible luxury fragrances crafted with rare Cambodian oud and French botanicals."
      />

      <div className="bg-obsidian-950 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Our Story' }]} />

          {/* Hero Banner */}
          <div className="my-12 text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block">
              Atelier Origins & Vision
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-ivory-50 uppercase tracking-tight">
              The Genesis of <br />
              <span className="gold-text-gradient">AURA SUBLIME</span>
            </h1>
            <p className="font-display italic text-xl text-gold-300">
              "{BRAND.tagline}"
            </p>
          </div>

          {/* Cinematic Image Frame */}
          <div className="rounded-2xl overflow-hidden border border-gold-500/25 shadow-2xl mb-16 aspect-[21/9] bg-obsidian-900 relative">
            <img
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1800&auto=format&fit=crop"
              alt="AURA SUBLIME Atelier"
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
          </div>

          {/* Narrative Content */}
          <div className="max-w-4xl mx-auto space-y-12 text-sm text-gray-300 leading-relaxed font-light">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-ivory-100 uppercase tracking-wide">
                1. The Olfactory Dilemma
              </h2>
              <p>
                For decades, the luxury fragrance industry followed an antiquated paradigm: astronomical markups driven by celebrity endorsements, opulent Parisian retail leases, and layers of distributor margins. In markets like Pakistan, genuine niche Extrait perfumes became an exorbitant indulgence accessible only to a select few.
              </p>
              <p>
                <strong>AURA SUBLIME</strong> was born to challenge this dogma. We asked a fundamental question: <em>What if the true luxury lay strictly in the flacon itself—the precious Cambodian agarwood, the pure Italian neroli, the maceration time—and was offered directly to discerning connoisseurs at an accessible price?</em>
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-ivory-100 uppercase tracking-wide">
                2. Sourcing Without Compromise
              </h2>
              <p>
                Our master perfumer traverses the traditional agarwood distilleries of Koh Kong in Cambodia and the high-altitude rose terraces of Taif. Each batch of oil is subjected to rigorous olfactory evaluation and macerated for sixty days to achieve optimum resonance, deep sillage, and 12+ hours of tenacity.
              </p>
              <p>
                We formulate primarily at <strong>Extrait de Parfum (20% to 28% oil concentration)</strong>, ensuring that a single morning application creates an elegant aura that commands reverence without shouting.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-12 pt-8 border-t border-gold-500/15">
              <div className="bg-obsidian-900 p-6 rounded-xl border border-gold-500/15 text-center">
                <div className="font-serif text-3xl font-bold text-gold-300 mb-1">28%</div>
                <div className="text-xs uppercase tracking-wider text-ivory-200 font-semibold">Peak Concentration</div>
                <p className="text-[11px] text-gray-400 mt-1">Niche extrait oil ratio.</p>
              </div>

              <div className="bg-obsidian-900 p-6 rounded-xl border border-gold-500/15 text-center">
                <div className="font-serif text-3xl font-bold text-gold-300 mb-1">60 Days</div>
                <div className="text-xs uppercase tracking-wider text-ivory-200 font-semibold">Artisanal Maceration</div>
                <p className="text-[11px] text-gray-400 mt-1">Slow aging for rich depth.</p>
              </div>

              <div className="bg-obsidian-900 p-6 rounded-xl border border-gold-500/15 text-center">
                <div className="font-serif text-3xl font-bold text-gold-300 mb-1">100%</div>
                <div className="text-xs uppercase tracking-wider text-ivory-200 font-semibold">Direct Atelier Model</div>
                <p className="text-[11px] text-gray-400 mt-1">No middleman inflation.</p>
              </div>
            </div>

            <div className="text-center pt-8">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-gold-gradient text-obsidian-950 font-semibold px-8 py-4 rounded text-xs uppercase tracking-luxury shadow-xl hover:scale-105 transition-all"
              >
                <span>Experience The Fragrances</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
