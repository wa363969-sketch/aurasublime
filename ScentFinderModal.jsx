import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, X, ArrowRight, RotateCcw, Check, ShoppingBag } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../../config/seedData';
import { formatPKR } from '../../utils/currency';
import { useCart } from '../../context/CartContext';

export default function ScentFinderModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('');
  const [matchedPerfume, setMatchedPerfume] = useState(null);

  const { addToCart } = useCart();

  if (!isOpen) return null;

  const moods = [
    { id: 'Regal', title: 'Regal & Authoritative', desc: 'Commanding, deep oud and amber resonance' },
    { id: 'Warm', title: 'Warm & Sensual', desc: 'Comforting sandalwood, cinnamon, and cashmere' },
    { id: 'Energizing', title: 'Crisp & Energizing', desc: 'Invigorating citrus, clean vetiver, and sea salt' },
    { id: 'Romantic', title: 'Romantic & Luminous', desc: 'Powdery orris, dew-kissed rose, and white musk' },
  ];

  const occasions = [
    { id: 'Black Tie', title: 'Evening Galas & Black Tie', desc: 'Long-lasting projection and hypnotic presence' },
    { id: 'Executive', title: 'Daily Office & Executive Meetings', desc: 'Polished, sophisticated, never intrusive' },
    { id: 'Weddings', title: 'Weddings & Celebrations', desc: 'Opulent, unforgettable floral and oriental sillage' },
    { id: 'Daily', title: 'Casual Days & Evening Walks', desc: 'Breezy freshness and intimate elegance' },
  ];

  const families = [
    { id: 'Oud & Amber', title: 'Imperial Oud & Ambergris', desc: 'Wild Cambodian agarwood and rich resins' },
    { id: 'Woody Oriental', title: 'Creamy Sandalwood & Spices', desc: 'Australian santal, cinnamon bark, cardamom' },
    { id: 'Floral Powdery', title: 'Florentine Iris & Taif Rose', desc: 'Powdery orris butter and morning florals' },
    { id: 'Aromatic Leather', title: 'Smoky Leather & Black Pepper', desc: 'Calabrian bergamot, leather, tonka' },
  ];

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Calculate match
      let match = INITIAL_PRODUCTS.find(p => p.fragranceFamily === selectedFamily);
      if (!match) {
        match = INITIAL_PRODUCTS.find(p => p.mood.includes(selectedMood));
      }
      if (!match) {
        match = INITIAL_PRODUCTS[0]; // Default to Oud Royale Sublime
      }
      setMatchedPerfume(match);
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedMood('');
    setSelectedOccasion('');
    setSelectedFamily('');
    setMatchedPerfume(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-obsidian-900 border border-gold-500/30 rounded-xl shadow-2xl p-6 sm:p-8 z-10 animate-fade-in">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-ivory-100 p-1.5 rounded-full hover:bg-obsidian-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-luxury mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Artisanal Scent Matchmaker</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ivory-50">
              Discover Your Olfactory Signature
            </h2>
            <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
              Answer 3 curated questions and allow our master perfumer algorithm to curate your ideal AURA SUBLIME fragrance.
            </p>

            {/* Step Indicator */}
            {step <= 3 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step === s ? 'w-8 bg-gold-400' : step > s ? 'w-4 bg-gold-600' : 'w-4 bg-obsidian-750'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Step 1: Mood */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gold-300 uppercase tracking-wider text-center">
                1. How do you desire your fragrance to make you feel?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {moods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMood(m.id)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      selectedMood === m.id
                        ? 'border-gold-400 bg-gold-500/15 shadow-lg'
                        : 'border-obsidian-750 bg-obsidian-850 hover:border-gold-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-sm font-semibold text-ivory-100">{m.title}</span>
                      {selectedMood === m.id && <Check className="w-4 h-4 text-gold-400" />}
                    </div>
                    <p className="text-xs text-gray-400">{m.desc}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-end pt-4">
                <button
                  disabled={!selectedMood}
                  onClick={handleNextStep}
                  className="bg-gold-500 hover:bg-gold-400 disabled:opacity-40 text-obsidian-950 text-xs font-semibold px-6 py-2.5 rounded uppercase tracking-wider flex items-center gap-2 transition-all"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Occasion */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gold-300 uppercase tracking-wider text-center">
                2. What primary occasion is this parfum destined for?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {occasions.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setSelectedOccasion(o.id)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      selectedOccasion === o.id
                        ? 'border-gold-400 bg-gold-500/15 shadow-lg'
                        : 'border-obsidian-750 bg-obsidian-850 hover:border-gold-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-sm font-semibold text-ivory-100">{o.title}</span>
                      {selectedOccasion === o.id && <Check className="w-4 h-4 text-gold-400" />}
                    </div>
                    <p className="text-xs text-gray-400">{o.desc}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-400 hover:text-ivory-100 text-xs uppercase tracking-wider"
                >
                  Back
                </button>
                <button
                  disabled={!selectedOccasion}
                  onClick={handleNextStep}
                  className="bg-gold-500 hover:bg-gold-400 disabled:opacity-40 text-obsidian-950 text-xs font-semibold px-6 py-2.5 rounded uppercase tracking-wider flex items-center gap-2 transition-all"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Fragrance Family */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gold-300 uppercase tracking-wider text-center">
                3. Which fragrance accords resonate most with you?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {families.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFamily(f.id)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      selectedFamily === f.id
                        ? 'border-gold-400 bg-gold-500/15 shadow-lg'
                        : 'border-obsidian-750 bg-obsidian-850 hover:border-gold-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-sm font-semibold text-ivory-100">{f.title}</span>
                      {selectedFamily === f.id && <Check className="w-4 h-4 text-gold-400" />}
                    </div>
                    <p className="text-xs text-gray-400">{f.desc}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="text-gray-400 hover:text-ivory-100 text-xs uppercase tracking-wider"
                >
                  Back
                </button>
                <button
                  disabled={!selectedFamily}
                  onClick={handleNextStep}
                  className="bg-gold-gradient hover:opacity-95 text-obsidian-950 text-xs font-semibold px-6 py-2.5 rounded uppercase tracking-luxury flex items-center gap-2 shadow-lg transition-all"
                >
                  <span>Reveal My Scent</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Result Match */}
          {step === 4 && matchedPerfume && (
            <div className="bg-obsidian-850 border border-gold-500/30 rounded-xl p-6 text-center space-y-4 animate-scale-up">
              <div className="inline-block bg-gold-500/20 text-gold-300 border border-gold-500/40 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                100% Bespoke Match
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 text-left">
                <img
                  src={matchedPerfume.images?.[0]}
                  alt={matchedPerfume.name}
                  className="w-36 h-44 object-cover rounded-lg border border-gold-500/20 shadow-xl shrink-0"
                />

                <div className="flex-1 space-y-2">
                  <div className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold">
                    {matchedPerfume.collection} Collection • {matchedPerfume.fragranceFamily}
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-ivory-50">
                    {matchedPerfume.name}
                  </h4>
                  <p className="text-xs text-gray-300 italic font-display">
                    "{matchedPerfume.tagline}"
                  </p>
                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                    {matchedPerfume.description}
                  </p>
                  <div className="text-sm font-semibold text-gold-300 pt-1">
                    Starting from {formatPKR(matchedPerfume.price)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-obsidian-750">
                <button
                  onClick={() => {
                    addToCart(matchedPerfume, '100ml', 1);
                    onClose();
                  }}
                  className="flex-1 bg-gold-gradient text-obsidian-950 font-semibold py-3 px-4 rounded text-xs uppercase tracking-luxury flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add 100ml to Bag</span>
                </button>

                <Link
                  to={`/product/${matchedPerfume.slug || matchedPerfume.id}`}
                  onClick={onClose}
                  className="flex-1 bg-obsidian-800 border border-gold-500/40 hover:border-gold-400 text-ivory-100 font-semibold py-3 px-4 rounded text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <span>Explore Full Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={handleReset}
                  className="p-3 text-gray-400 hover:text-gold-300 transition-colors"
                  title="Retake Quiz"
                  aria-label="Retake quiz"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
