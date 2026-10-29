import React, { useState, useEffect } from 'react';
import { Save, Check, Phone, DollarSign, Bell, Mail, ShieldAlert } from 'lucide-react';
import { settingsService, isAppwriteConfigured } from '../../config/appwrite';
import { useToast } from '../../context/ToastContext';
import SEOHead from '../../components/common/SEOHead';

export default function AdminSettings() {
  const [whatsappNumber, setWhatsappNumber] = useState('923404942126');
  const [deliveryFee, setDeliveryFee] = useState(250);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(5000);
  const [announcementText, setAnnouncementText] = useState('');
  const [isAnnouncementActive, setIsAnnouncementActive] = useState(true);
  const [supportEmail, setSupportEmail] = useState('wa363969@gmail.com');
  const [supportPhone, setSupportPhone] = useState('+92 340 4942126');
  const [loading, setLoading] = useState(true);

  const { showToast } = useToast();

  useEffect(() => {
    async function load() {
      try {
        const s = await settingsService.get();
        if (s) {
          setWhatsappNumber(s.whatsappNumber || '923404942126');
          setDeliveryFee(s.deliveryFee || 250);
          setFreeShippingThreshold(s.freeShippingThreshold || 5000);
          setAnnouncementText(s.announcementText || '');
          setIsAnnouncementActive(s.isAnnouncementActive ?? true);
          setSupportEmail(s.supportEmail || 'wa363969@gmail.com');
          setSupportPhone(s.supportPhone || '+92 340 4942126');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    await settingsService.update({
      whatsappNumber,
      deliveryFee: Number(deliveryFee),
      freeShippingThreshold: Number(freeShippingThreshold),
      announcementText,
      isAnnouncementActive,
      supportEmail,
      supportPhone,
    });
    showToast('Atelier settings updated successfully.', 'success');
  };

  return (
    <>
      <SEOHead title="Store Settings — Admin Atelier" />

      <div className="space-y-6">
        <div className="pb-6 border-b border-gold-500/20">
          <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-1">
            Global Atelier Configuration
          </span>
          <h1 className="font-serif text-3xl font-bold text-ivory-50 uppercase tracking-tight">
            Store Parameters & Logistics
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage your WhatsApp business number, delivery fees in PKR, and announcement bar.
          </p>
        </div>

        {/* Database notice */}
        <div className="bg-obsidian-850 p-4 rounded-xl border border-gold-500/20 flex items-center justify-between">
          <div className="text-xs">
            <span className="font-semibold text-gold-300">Backend Service Integration:</span>{' '}
            <span className="text-gray-300">
              {isAppwriteConfigured ? 'Connected to Appwrite Cloud' : 'Active on Local Persistence Layer (Ready to link Appwrite)'}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
            Operational
          </span>
        </div>

        <form onSubmit={handleSave} className="bg-obsidian-850 border border-gold-500/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl max-w-2xl">
          <div className="space-y-4 text-xs">
            <h3 className="font-serif text-sm font-bold text-gold-300 uppercase tracking-wider pb-2 border-b border-obsidian-750">
              1. WhatsApp Business Concierge
            </h3>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                WhatsApp Business Number (International Format, no +, e.g. 923001234567)
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full bg-obsidian-900 border border-gold-500/30 rounded px-3 py-2 text-ivory-100 font-mono focus:outline-none focus:border-gold-400"
                required
              />
              <span className="text-[10px] text-gray-500">All floating buttons, product inquiries, and cart messages link directly to this number.</span>
            </div>
          </div>

          <div className="space-y-4 text-xs pt-4 border-t border-obsidian-750">
            <h3 className="font-serif text-sm font-bold text-gold-300 uppercase tracking-wider pb-2 border-b border-obsidian-750">
              2. Delivery Pricing & Thresholds (PKR)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                  Default Courier Delivery Fee (PKR)
                </label>
                <input
                  type="number"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(e.target.value)}
                  className="w-full bg-obsidian-900 border border-gold-500/30 rounded px-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                  Complimentary Delivery Threshold (PKR)
                </label>
                <input
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(e.target.value)}
                  className="w-full bg-obsidian-900 border border-gold-500/30 rounded px-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 text-xs pt-4 border-t border-obsidian-750">
            <h3 className="font-serif text-sm font-bold text-gold-300 uppercase tracking-wider pb-2 border-b border-obsidian-750">
              3. Storefront Announcement Bar
            </h3>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                Announcement Headline
              </label>
              <input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="e.g. Enjoy Complimentary Delivery Across Pakistan on Orders Above Rs. 5,000"
                className="w-full bg-obsidian-900 border border-gold-500/30 rounded px-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <div className="space-y-4 text-xs pt-4 border-t border-obsidian-750">
            <h3 className="font-serif text-sm font-bold text-gold-300 uppercase tracking-wider pb-2 border-b border-obsidian-750">
              4. Concierge Contact Coordinates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full bg-obsidian-900 border border-gold-500/30 rounded px-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                  Telephone Hotline
                </label>
                <input
                  type="text"
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="w-full bg-obsidian-900 border border-gold-500/30 rounded px-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-obsidian-800 flex justify-end">
            <button
              type="submit"
              className="bg-gold-gradient hover:opacity-95 text-obsidian-950 font-semibold py-3 px-6 rounded-lg text-xs uppercase tracking-luxury flex items-center gap-2 shadow-xl transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Atelier Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
