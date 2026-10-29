import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Truck, Sparkles, Check } from 'lucide-react';
import { BRAND, COLLECTIONS } from '../../config/constants';
import { subscriberService } from '../../config/appwrite';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please provide a valid email address.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const res = await subscriberService.subscribe(email, 'footer');
      setIsSubmitted(true);
      showToast(res.message, 'success');
      setEmail('');
    } catch {
      showToast('Subscription failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-obsidian-950 border-t border-gold-500/20 text-ivory-200">
      {/* Brand Values Banner */}
      <div className="border-b border-gold-500/10 py-8 bg-obsidian-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-lg bg-obsidian-850/50 border border-gold-500/10">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-ivory-100 uppercase tracking-wider">
                  Express Delivery Nationwide
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Complimentary tracked courier on all orders above Rs. 5,000 across Pakistan.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-lg bg-obsidian-850/50 border border-gold-500/10">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-ivory-100 uppercase tracking-wider">
                  Extrait Concentrations
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Formulated with 20% to 28% pure oil essence for 12+ hours of majestic sillage.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-lg bg-obsidian-850/50 border border-gold-500/10">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-ivory-100 uppercase tracking-wider">
                  100% Authentic Artisanship
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Pure Cambodian agarwood and French botanical extractions guaranteed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <div className="font-serif text-2xl tracking-regal text-ivory-50 uppercase font-bold">
                AURA SUBLIME
              </div>
              <div className="text-[10px] text-gold-400 tracking-luxury uppercase font-medium">
                {BRAND.tagline}
              </div>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Crafted for those who appreciate rare Cambodian oud, timeless florals, and unapologetic elegance. Experience accessible luxury across Pakistan with bespoke craftsmanship in every flacon.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h5 className="font-serif text-xs font-semibold uppercase tracking-wider text-gold-300 mb-2">
                Join The Royal Circle
              </h5>
              <p className="text-xs text-gray-400 mb-3">
                Receive private invitations to limited batch extractions and 10% privilege on your first purchase.
              </p>
              {isSubmitted ? (
                <div className="flex items-center gap-2 text-xs text-gold-300 bg-gold-500/15 border border-gold-500/30 p-2.5 rounded">
                  <Check className="w-4 h-4 text-gold-400" />
                  <span>Thank you. You are now subscribed to our private releases.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 bg-obsidian-850 border border-gold-500/30 rounded px-3 py-2 text-xs text-ivory-100 placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-semibold px-4 py-2 rounded text-xs uppercase tracking-wider transition-colors disabled:opacity-50 shrink-0"
                  >
                    {isLoading ? '...' : 'Join'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Collections */}
          <div>
            <h5 className="font-serif text-xs font-semibold uppercase tracking-wider text-gold-300 mb-4">
              Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link to="/shop" className="hover:text-gold-300 transition-colors">
                  Shop All Perfumes
                </Link>
              </li>
              {COLLECTIONS.map((c) => (
                <li key={c.id}>
                  <Link to={`/collections/${c.slug}`} className="hover:text-gold-300 transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies */}
          <div>
            <h5 className="font-serif text-xs font-semibold uppercase tracking-wider text-gold-300 mb-4">
              Client Concierge
            </h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link to="/track-order" className="hover:text-gold-300 transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/shipping-returns" className="hover:text-gold-300 transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-gold-300 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-gold-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-gold-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-300 transition-colors">
                  Our Story & Heritage
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Flagship Atelier */}
          <div>
            <h5 className="font-serif text-xs font-semibold uppercase tracking-wider text-gold-300 mb-4">
              Flagship Atelier
            </h5>
            <ul className="space-y-3 text-xs text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>{BRAND.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{BRAND.supportPhone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{BRAND.supportEmail}</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-obsidian-800">
              <div className="text-[11px] text-gold-300/80 mb-2 uppercase tracking-wider font-medium">
                Payment Options
              </div>
              <div className="flex flex-wrap gap-2 text-[10px] text-gray-400">
                <span className="bg-obsidian-850 px-2 py-1 rounded border border-obsidian-750">Cash on Delivery</span>
                <span className="bg-obsidian-850 px-2 py-1 rounded border border-obsidian-750">Bank Transfer</span>
                <span className="bg-obsidian-850 px-2 py-1 rounded border border-obsidian-750">WhatsApp Order</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gold-500/10 py-6 bg-obsidian-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>
            © {new Date().getFullYear()} {BRAND.name}. All Rights Reserved. Luxury fragrance house registered in Pakistan.
          </div>
          <div className="flex items-center gap-4 text-gray-400 text-xs">
            <Link to="/privacy-policy" className="hover:text-gold-300">Privacy</Link>
            <span>•</span>
            <Link to="/terms-conditions" className="hover:text-gold-300">Terms</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-gold-300">Concierge</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
