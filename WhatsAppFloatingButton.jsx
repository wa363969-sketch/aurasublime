import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { createWhatsAppUrl } from '../../utils/whatsapp';
import { BRAND } from '../../config/constants';

export default function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = `Hello AURA SUBLIME Concierge,\n\nI am browsing the collection on your website and would appreciate fragrance recommendations and assistance with ordering.`;

  const handleOpenChat = () => {
    const url = createWhatsAppUrl(defaultMessage, BRAND.whatsappNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
      {/* Concierge Tooltip Banner */}
      {showTooltip && (
        <div className="relative bg-obsidian-850/95 border border-gold-500/30 text-ivory-100 p-3 rounded-lg shadow-2xl backdrop-blur-md max-w-xs animate-slide-up flex items-start gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0 animate-ping" />
          <div className="text-xs">
            <div className="font-serif font-semibold text-gold-300">AURA SUBLIME Concierge</div>
            <p className="text-[11px] text-gray-300 mt-0.5 leading-snug">
              Need assistance selecting a fragrance or placing an order? We are live on WhatsApp.
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-gray-400 hover:text-ivory-100 p-0.5 ml-1"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleOpenChat}
        className="group flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border border-emerald-400/30"
        aria-label="Open WhatsApp Business Chat"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="text-xs font-semibold tracking-wider uppercase font-sans">
          WhatsApp Concierge
        </span>
      </button>
    </div>
  );
}
