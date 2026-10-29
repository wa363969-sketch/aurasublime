import React from 'react';
import { Sparkles, Camera } from 'lucide-react';
import { BRAND } from '../../config/constants';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

export default function EditorialGallery() {
  const galleryItems = [
    {
      img: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
      title: 'Golden Hour In The Atelier',
      handle: '@aurasublime'
    },
    {
      img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
      title: 'Cambodian Agarwood Crystals',
      handle: '@aurasublime'
    },
    {
      img: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop',
      title: 'Dew-Kissed Petals',
      handle: '@aurasublime'
    },
    {
      img: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop',
      title: 'The Art of Black Leather',
      handle: '@aurasublime'
    },
    {
      img: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
      title: 'Maceration & Bottling',
      handle: '@aurasublime'
    },
  ];

  return (
    <section className="py-20 bg-obsidian-950 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 text-center sm:text-left gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-1">
              #AuraSublimeParfums
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory-50 uppercase">
              The Visual Gallery
            </h3>
          </div>

          <a
            href={BRAND.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-obsidian-850 hover:bg-obsidian-800 border border-gold-500/30 text-gold-300 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow on Instagram</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-xl overflow-hidden border border-gold-500/20 bg-obsidian-900"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-obsidian-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                <InstagramIcon className="w-5 h-5 text-gold-400 mb-1" />
                <span className="text-xs font-serif text-ivory-100 font-semibold">{item.title}</span>
                <span className="text-[10px] text-gold-300/80">{item.handle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
