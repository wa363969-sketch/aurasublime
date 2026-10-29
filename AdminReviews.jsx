import React, { useState, useEffect } from 'react';
import { Star, CheckCircle2, XCircle, Trash2, ShieldCheck } from 'lucide-react';
import { reviewService } from '../../config/appwrite';
import { useToast } from '../../context/ToastContext';
import SEOHead from '../../components/common/SEOHead';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const loadReviews = async () => {
    try {
      const data = await reviewService.getAll();
      setReviews(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    await reviewService.updateStatus(id, status);
    showToast(`Review status updated to ${status}.`, 'info');
    loadReviews();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this customer review permanently?')) {
      await reviewService.delete(id);
      showToast('Review removed.', 'info');
      loadReviews();
    }
  };

  return (
    <>
      <SEOHead title="Review Moderation — Admin Atelier" />

      <div className="space-y-6">
        <div className="pb-6 border-b border-gold-500/20">
          <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-1">
            Quality & Authenticity
          </span>
          <h1 className="font-serif text-3xl font-bold text-ivory-50 uppercase tracking-tight">
            Review Moderation Atelier
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Moderate genuine customer feedback submitted on product pages.
          </p>
        </div>

        <div className="bg-obsidian-850 border border-gold-500/20 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 bg-obsidian-900 border-b border-obsidian-750 flex justify-between items-center text-xs">
            <span className="text-gray-400">Total Customer Impressions: <strong className="text-gold-300">{reviews.length}</strong></span>
          </div>

          <div className="divide-y divide-obsidian-800 text-xs text-gray-300">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-obsidian-800/40 transition-colors">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-serif font-bold text-ivory-100">{rev.customerName}</span>
                    <span className="text-[10px] text-gray-500">• {rev.city}</span>
                    <span className="text-[10px] text-gold-400 bg-obsidian-900 px-2 py-0.5 rounded border border-obsidian-750">{rev.productName}</span>
                    <div className="flex text-gold-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-gold-400" />
                      ))}
                    </div>
                  </div>

                  {rev.headline && (
                    <div className="font-serif font-semibold text-ivory-200">
                      "{rev.headline}"
                    </div>
                  )}

                  <p className="text-xs text-gray-400 font-light max-w-2xl">
                    {rev.comment}
                  </p>

                  <div className="text-[10px] text-gray-500">Submitted: {rev.date}</div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    rev.status === 'approved' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                  }`}>
                    {rev.status}
                  </span>

                  {rev.status !== 'approved' && (
                    <button
                      onClick={() => handleUpdateStatus(rev.id, 'approved')}
                      className="p-1.5 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-400 border border-emerald-500/30 rounded"
                      title="Approve Review"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(rev.id)}
                    className="p-1.5 bg-obsidian-800 hover:bg-red-950/40 text-gray-400 hover:text-red-400 border border-obsidian-750 rounded"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
