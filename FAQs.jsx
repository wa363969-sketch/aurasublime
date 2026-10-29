import React from 'react';
import FAQSection from '../components/home/FAQSection';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOHead from '../components/common/SEOHead';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { BRAND } from '../config/constants';
import { createWhatsAppUrl } from '../utils/whatsapp';

export default function FAQs() {
  const handleOpenWhatsApp = () => {
    const url = createWhatsAppUrl(
      `Hello AURA SUBLIME Concierge,\n\nI have a question that was not answered in the FAQ section.`,
      BRAND.whatsappNumber
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions"
        description="Find answers regarding AURA SUBLIME perfume concentrations, express courier delivery across Pakistan, and bottle preservation."
      />

      <div className="bg-obsidian-950 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Frequently Asked Questions' }]} />

          <FAQSection />

          {/* Need More Assistance Banner */}
          <div className="max-w-2xl mx-auto my-16 bg-obsidian-900 border border-gold-500/25 p-8 rounded-2xl text-center space-y-4">
            <h3 className="font-serif text-xl font-bold text-ivory-100 uppercase">
              Still Have An Olfactory Inquiry?
            </h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Our fragrance concierges are available via WhatsApp to help guide your choice of scent, batch notes, or gifting arrangements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleOpenWhatsApp}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>
              <Link
                to="/contact"
                className="text-xs text-gold-300 hover:text-gold-200 uppercase tracking-wider underline py-2"
              >
                Visit Contact Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
