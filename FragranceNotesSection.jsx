import React, { useState } from 'react';
import { Sparkles, Flower2, Droplets, Sun, Wind, Flame } from 'lucide-react';

export default function FragranceNotesSection() {
  const [activeTier, setActiveTier] = useState('all');

  const notesData = [
    {
      tier: 'Top',
      name: 'Persian Saffron & Bergamot',
      nature: 'Sparkling & Zesty',
      duration: 'First 15-30 Mins',
      desc: 'Opens with brilliant citrus sunshine and golden spice threads that lift the spirits.',
      icon: Sun,
      color: 'from-amber-500/20 to-yellow-500/10'
    },
    {
      tier: 'Heart',
      name: 'Damascena Rose & Florentine Orris',
      nature: 'Sensual & Aristocratic',
      duration: '2 to 6 Hours',
      desc: 'The blooming core of velvety petals and velvety powdery roots that define the character.',
      icon: Flower2,
      color: 'from-rose-500/20 to-pink-500/10'
    },
    {
      tier: 'Base',
      name: 'Wild Cambodian Oud & Amber',
      nature: 'Deep, Smoky & Imperial',
      duration: '10 to 18+ Hours',
      desc: 'Ancient agarwood resin and ambergris creating an indelible signature that clings to fabric.',
      icon: Flame,
      color: 'from-amber-700/20 to-orange-950/20'
    }
  ];

  return (
    <section className="py-24 bg-obsidian-950 border-b border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-2">
            The Science & Poetry of Notes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50 uppercase tracking-tight">
            Anatomy of a Sublime Fragrance
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4 mb-4" />
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Perfume is living art. Learn how our three distinct note tiers unfold dynamically upon your skin throughout day and night.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {notesData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-obsidian-900 border border-gold-500/20 hover:border-gold-400 rounded-xl p-8 relative transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold font-serif text-gold-400 uppercase tracking-luxury px-3 py-1 rounded bg-gold-500/10 border border-gold-500/30">
                      {item.tier} Tier
                    </span>
                    <div className="w-10 h-10 rounded-full bg-obsidian-800 border border-gold-500/20 flex items-center justify-center text-gold-300 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-ivory-50 mb-2">
                    {item.name}
                  </h3>

                  <div className="text-xs text-gold-300/90 font-medium mb-3">
                    {item.nature} • <span className="text-gray-400 font-normal">{item.duration}</span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-obsidian-800 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Projection</span>
                  <span className="text-gold-300 font-medium">
                    {item.tier === 'Top' ? 'Radiant & Immediate' : item.tier === 'Heart' ? 'Expanding Presence' : 'Intimate & Persistent'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
