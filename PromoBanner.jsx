import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="py-16 bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 bg-obsidian-900 shadow-2xl">
          {/* Background Visual */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1600&auto=format&fit=crop"
              alt="Limited Royal Batch"
              className="w-full h-full object-cover object-center opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950 via-obsidian-950/80 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 px-3 py-1 rounded text-gold-300 text-[10px] font-bold uppercase tracking-luxury">
              <Clock className="w-3.5 h-3.5" />
              <span>Limited Master Batch Release</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50 uppercase tracking-tight">
              Sultani Amber Oud <br />
              <span className="gold-text-gradient">Royal Autumn Vintage</span>
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              Distilled using aged wild Assam agarwood macerated with golden fossil amber and frankincense. Only 150 individually numbered bottles prepared for this season.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/product/sultani-amber-oud"
                className="bg-gold-gradient text-obsidian-950 font-semibold px-6 py-3 rounded text-xs uppercase tracking-luxury flex items-center gap-2 shadow-lg hover:opacity-95 transition-all"
              >
                <span>Reserve Flacon</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-xs text-gold-300 font-serif">
                Special Privilege: Use code <strong>AURA10</strong> at checkout
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
