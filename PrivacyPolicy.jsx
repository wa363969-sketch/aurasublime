import React from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOHead from '../components/common/SEOHead';
import { BRAND } from '../config/constants';

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="AURA SUBLIME patron privacy protection policy and data handling principles."
      />

      <div className="bg-obsidian-950 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

          <div className="my-10 text-center max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-2">
              Client Confidentiality
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50 uppercase tracking-tight">
              Privacy Policy
            </h1>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4 mb-4" />
          </div>

          <div className="bg-obsidian-900 border border-gold-500/20 p-8 sm:p-12 rounded-2xl shadow-xl space-y-6 text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
            <p>
              At <strong>{BRAND.name}</strong> ("we", "our", or "the Atelier"), we hold your privacy in the highest regard. This charter delineates how your personal data is collected, handled, and safeguarded when you explore our boutique or acquire our artisanal fragrances.
            </p>

            <h3 className="font-serif text-base font-bold text-ivory-100 uppercase tracking-wide pt-4 border-t border-obsidian-800">
              1. Information We Collect
            </h3>
            <p>
              When an order is placed or an account created, we collect necessary logistics details: your name, contact telephone number, delivery address in Pakistan, and email address. We do not store or collect credit/debit card numbers directly on our servers.
            </p>

            <h3 className="font-serif text-base font-bold text-ivory-100 uppercase tracking-wide pt-4 border-t border-obsidian-800">
              2. Purpose of Collection
            </h3>
            <p>
              Your information is utilized solely to fulfill fragrance dispatch via express courier, deliver tracking alerts via SMS or WhatsApp, process returns, and occasionally share limited private vintage releases if you have opted into our Royal Circle newsletter.
            </p>

            <h3 className="font-serif text-base font-bold text-ivory-100 uppercase tracking-wide pt-4 border-t border-obsidian-800">
              3. Protection & Non-Disclosure
            </h3>
            <p>
              We maintain a strict non-disclosure protocol. Your personal data is never sold, leased, or distributed to third-party marketing brokers. Only authorized courier partners receiving destination labels for physical package delivery have access to shipping coordinates.
            </p>

            <div className="pt-6 border-t border-obsidian-800 text-xs text-gray-400">
              Last updated: October 2026. For privacy inquiries, contact our legal atelier at <span className="text-gold-300 font-medium">{BRAND.supportEmail}</span>.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
