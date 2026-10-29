import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { BRAND } from '../../config/constants';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-obsidian-950 via-gold-900/60 to-obsidian-950 border-b border-gold-500/20 text-gold-200 text-xs py-2 px-4 relative z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-6 hidden md:block"></div>
        
        <div className="flex-1 flex items-center justify-center gap-2 text-center font-medium tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0 animate-pulse-subtle" />
          <span>{BRAND.announcement}</span>
          <span className="hidden sm:inline text-gold-400/50">|</span>
          <span className="hidden sm:inline text-gold-300/80 font-normal">Use Code <strong className="text-gold-300 font-semibold tracking-widest">AURA10</strong> for 10% Off</span>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-gold-400/70 hover:text-gold-200 transition-colors p-0.5 rounded"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
