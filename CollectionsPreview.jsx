import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { COLLECTIONS } from '../../config/constants';

export default function CollectionsPreview() {
  return (
    <section className="py-24 bg-obsidian-900 border-b border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-2">
            Curated Olfactory Realms
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50 uppercase tracking-tight">
            The Collections
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4 mb-4" />
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Every collection is meticulously formulated around rare distillations, evoking distinct moods of nobility, romance, and nocturnal magnetism.
          </p>
        </div>

        {/* Collections 4-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              to={`/collections/${col.slug}`}
              className="group relative h-[420px] rounded-xl overflow-hidden border border-gold-500/20 shadow-xl flex flex-col justify-end p-6 transition-all duration-500 hover:border-gold-400 hover:-translate-y-1"
            >
              {/* Background Image */}
              <img
                src={col.image}
                alt={col.name}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-90"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

              {/* Floating Action Button */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-obsidian-900/80 border border-gold-500/30 flex items-center justify-center text-gold-300 group-hover:bg-gold-500 group-hover:text-obsidian-950 transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-1.5">
                <span className="text-[10px] uppercase tracking-regal text-gold-400 font-semibold block">
                  Aura Sublime
                </span>
                <h3 className="font-serif text-xl font-bold text-ivory-50 group-hover:text-gold-200 transition-colors">
                  {col.name}
                </h3>
                <p className="text-xs text-gold-200/90 italic font-display">
                  "{col.tagline}"
                </p>
                <p className="text-[11px] text-gray-300 line-clamp-2 pt-1 font-light">
                  {col.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
