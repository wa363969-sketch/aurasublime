import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../../config/constants';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="py-24 bg-obsidian-900 border-t border-gold-500/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-2">
            Inquiries & Guidance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50 uppercase tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4 mb-4" />
          <p className="text-xs text-gray-400 max-w-lg mx-auto">
            Everything you need to know about our formulations, nationwide delivery across Pakistan, and royal customer care.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-gold-500/15 bg-obsidian-850 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-sm sm:text-base font-semibold text-ivory-100">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gold-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs text-gray-300 font-light leading-relaxed border-t border-obsidian-800 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
