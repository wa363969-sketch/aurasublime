import React from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOHead from '../components/common/SEOHead';
import { BRAND } from '../config/constants';

export default function TermsConditions() {
  return (
    <>
      <SEOHead
        title="Terms & Conditions"
        description="AURA SUBLIME terms of service, orders, pricing in PKR, and product authenticity terms."
      />

      <div className="bg-obsidian-950 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Terms & Conditions' }]} />

          <div className="my-10 text-center max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-2">
              Legal Framework
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50 uppercase tracking-tight">
              Terms & Conditions
            </h1>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4 mb-4" />
          </div>

          <div className="bg-obsidian-900 border border-gold-500/20 p-8 sm:p-12 rounded-2xl shadow-xl space-y-6 text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
            <h3 className="font-serif text-base font-bold text-ivory-100 uppercase tracking-wide">
              1. Acceptance of Terms
            </h3>
            <p>
              By accessing, browsing, or purchasing from the {BRAND.name} online platform, you agree to comply with and be bound by these Terms and Conditions in accordance with the laws of the Islamic Republic of Pakistan.
            </p>

            <h3 className="font-serif text-base font-bold text-ivory-100 uppercase tracking-wide pt-4 border-t border-obsidian-800">
              2. Fragrance Artisanship & Natural Variations
            </h3>
            <p>
              Our perfumes contain exceptionally high concentrations of natural raw materials, including aged Cambodian agarwood, wild frankincense, and distilled florals. Minor variations in tincture color or batch nuance may occur and are the hallmarks of genuine artisanal perfumery rather than synthetic uniformity.
            </p>

            <h3 className="font-serif text-base font-bold text-ivory-100 uppercase tracking-wide pt-4 border-t border-obsidian-800">
              3. Pricing & Currency
            </h3>
            <p>
              All prices quoted across the website are in Pakistani Rupees (PKR) and inclusive of applicable packaging. We reserve the right to modify prices based on international raw agarwood and flower harvest costs without prior notice.
            </p>

            <h3 className="font-serif text-base font-bold text-ivory-100 uppercase tracking-wide pt-4 border-t border-obsidian-800">
              4. Order Validation & Cancellation
            </h3>
            <p>
              We reserve the right to decline or cancel any order if inaccurate contact details or unserviceable courier coordinates are provided. Clients will be notified promptly via phone or email.
            </p>

            <div className="pt-6 border-t border-obsidian-800 text-xs text-gray-400">
              Registered in Lahore, Pakistan. Copyright © {new Date().getFullYear()} {BRAND.name}.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
