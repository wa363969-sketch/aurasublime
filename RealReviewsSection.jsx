import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { INITIAL_REVIEWS } from '../../config/seedData';

export default function RealReviewsSection({ reviews = INITIAL_REVIEWS }) {
  const approvedReviews = reviews.filter(r => r.status === 'approved');

  return (
    <section className="py-24 bg-obsidian-900 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-2">
            Verified Customer Impressions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50 uppercase tracking-tight">
            Voices of Distinction
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4 mb-4" />
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Genuine experiences shared by patrons across Pakistan who have made AURA SUBLIME their defining olfactory presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {approvedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-obsidian-850 rounded-xl border border-gold-500/15 p-6 flex flex-col justify-between hover:border-gold-500/40 transition-colors shadow-lg relative"
            >
              <div>
                <Quote className="w-6 h-6 text-gold-500/30 mb-3" />

                {/* Star rating */}
                <div className="flex text-gold-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400" />
                  ))}
                </div>

                <h4 className="font-serif text-sm font-bold text-ivory-100 mb-2">
                  "{rev.headline}"
                </h4>

                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  {rev.comment}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-obsidian-750 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-gold-300 flex items-center gap-1">
                    <span>{rev.customerName}</span>
                    {rev.isVerified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" title="Verified Buyer" />
                    )}
                  </div>
                  <div className="text-[10px] text-gray-500">
                    {rev.city}, Pakistan
                  </div>
                </div>

                <span className="text-[10px] text-gray-400 bg-obsidian-900 px-2 py-0.5 rounded border border-obsidian-700">
                  {rev.productName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
