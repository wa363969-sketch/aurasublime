import React, { useState, useEffect } from 'react';
import { Mail, Download, Users, Calendar } from 'lucide-react';
import { subscriberService } from '../../config/appwrite';
import SEOHead from '../../components/common/SEOHead';
import { useToast } from '../../context/ToastContext';

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function load() {
      try {
        const data = await subscriberService.getAll();
        setSubscribers(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleExportCSV = () => {
    if (subscribers.length === 0) return;
    const csvContent = "data:text/csv;charset=utf-8," +
      ["Email,SubscribedAt,Source", ...subscribers.map(s => `${s.email},${s.subscribedAt},${s.source}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `aura_sublime_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Subscribers CSV exported successfully.', 'success');
  };

  return (
    <>
      <SEOHead title="Subscribers — Admin Atelier" />

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gold-500/20">
          <div>
            <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-1">
              Royal Circle Registry
            </span>
            <h1 className="font-serif text-3xl font-bold text-ivory-50 uppercase tracking-tight">
              Newsletter Subscribers
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Patrons registered for private vintage releases and privilege invitations.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="bg-obsidian-850 hover:bg-gold-500/20 border border-gold-500/30 text-gold-200 px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider flex items-center gap-2 self-start transition-colors font-semibold"
          >
            <Download className="w-4 h-4 text-gold-400" />
            <span>Export Subscribers (.CSV)</span>
          </button>
        </div>

        <div className="bg-obsidian-850 border border-gold-500/20 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 bg-obsidian-900 border-b border-obsidian-750 flex items-center justify-between text-xs text-gray-400">
            <span>Total Registered Patrons: <strong className="text-gold-300">{subscribers.length}</strong></span>
          </div>

          <div className="divide-y divide-obsidian-800 text-xs">
            {subscribers.map((sub) => (
              <div key={sub.id} className="p-4 flex items-center justify-between hover:bg-obsidian-800/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-ivory-100">{sub.email}</div>
                    <div className="text-[10px] text-gray-500">Source: {sub.source}</div>
                  </div>
                </div>

                <div className="text-gray-400 text-[11px] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span>{new Date(sub.subscribedAt).toLocaleDateString('en-PK')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
