import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, Check } from 'lucide-react';
import { BRAND } from '../config/constants';
import { createWhatsAppUrl } from '../utils/whatsapp';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOHead from '../components/common/SEOHead';
import { useToast } from '../context/ToastContext';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your concierge inquiry has been delivered. We will respond within 4 business hours.', 'success');
  };

  const handleOpenWhatsApp = () => {
    const url = createWhatsAppUrl(
      `Hello AURA SUBLIME Concierge,\n\nI have an inquiry regarding your fragrances and order assistance.`,
      BRAND.whatsappNumber
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SEOHead
        title="Client Concierge & Atelier Contact"
        description="Connect with AURA SUBLIME concierge for fragrance consultations, bespoke orders, and order assistance across Pakistan."
      />

      <div className="bg-obsidian-950 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Client Concierge' }]} />

          <div className="my-10 text-center max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-2">
              At Your Service
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ivory-50 uppercase tracking-tight">
              Client Concierge
            </h1>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4 mb-4" />
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Whether you desire personalized olfactory recommendations, wedding scent bar curation, or tracking support, our dedicated fragrance consultants are at your service.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-12">
            {/* Contact Details & WhatsApp Card */}
            <div className="space-y-6">
              {/* WhatsApp Concierge Banner */}
              <div className="bg-gradient-to-br from-emerald-950/50 to-obsidian-900 border border-emerald-500/30 p-6 rounded-2xl shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-ivory-100 uppercase">
                      Direct WhatsApp Desk
                    </h3>
                    <div className="text-[11px] text-emerald-300">Instant response time</div>
                  </div>
                </div>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Chat directly with our fragrance stylists on WhatsApp for instant flacon recommendations and expedited order booking.
                </p>
                <button
                  onClick={handleOpenWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start WhatsApp Conversation</span>
                </button>
              </div>

              {/* Atelier Details */}
              <div className="bg-obsidian-900 border border-gold-500/20 p-6 rounded-2xl space-y-4">
                <h3 className="font-serif text-sm font-bold text-gold-300 uppercase tracking-wider pb-3 border-b border-obsidian-800">
                  Flagship Atelier
                </h3>
                <ul className="space-y-4 text-xs text-gray-300">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-ivory-100">Studio & Showroom</div>
                      <div className="text-gray-400 mt-0.5">{BRAND.address}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-ivory-100">Direct Telephone</div>
                      <div className="text-gray-400 mt-0.5">{BRAND.supportPhone}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-ivory-100">Concierge Email</div>
                      <div className="text-gray-400 mt-0.5">{BRAND.supportEmail}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-ivory-100">Operating Hours</div>
                      <div className="text-gray-400 mt-0.5">Monday – Saturday: 11:00 AM – 10:00 PM PKT</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Inquiries Form */}
            <div className="lg:col-span-2 bg-obsidian-900 border border-gold-500/20 p-6 sm:p-10 rounded-2xl shadow-xl">
              <h2 className="font-serif text-xl font-bold text-ivory-50 uppercase tracking-wide mb-2">
                Send a Bespoke Message
              </h2>
              <p className="text-xs text-gray-400 mb-6">
                Our concierge desk will review your requirements and respond via email or telephone.
              </p>

              {submitted ? (
                <div className="bg-gold-500/10 border border-gold-500/30 p-6 rounded-xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto text-gold-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-ivory-100">Message Delivered</h3>
                  <p className="text-xs text-gray-300 max-w-sm mx-auto">
                    Thank you, {name}. A member of our concierge team will reach out to you promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ayesha Malik"
                        className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg px-3.5 py-2.5 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. ayesha@example.com"
                        className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg px-3.5 py-2.5 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                        Mobile Number (Pakistan)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0321-7654321"
                        className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg px-3.5 py-2.5 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                        Inquiry Nature
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg px-3.5 py-2.5 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                      >
                        <option value="Product Inquiry">Product Inquiry & Notes Consultation</option>
                        <option value="Order Tracking">Order Dispatch & Courier Tracking</option>
                        <option value="Bespoke Wedding Scenting">Wedding & Corporate Gifting</option>
                        <option value="Other">Other Atelier Inquiries</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows="4"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please let us know how we may assist you..."
                      className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg px-3.5 py-2.5 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-gold-gradient hover:opacity-95 text-obsidian-950 font-semibold py-3 px-6 rounded-lg text-xs uppercase tracking-luxury flex items-center justify-center gap-2 shadow-xl transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiries</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
