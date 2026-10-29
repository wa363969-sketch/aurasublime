import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOHead from '../components/common/SEOHead';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/account';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      if (res.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from, { replace: true });
      }
    } else {
      setErrorMessage(res.error || 'Invalid credentials. Please try again.');
    }
  };

  const handleQuickAdminDemo = () => {
    setEmail('shabeer_ahmed@aurasublime.com');
    setPassword('AuraAdmin2026!');
  };

  const handleQuickCustomerDemo = () => {
    setEmail('patron@aurasublime.com');
    setPassword('Patron2026!');
  };

  return (
    <>
      <SEOHead
        title="Sign In — Patron Concierge"
        description="Access your AURA SUBLIME account to track orders and save your olfactory wishlist."
      />

      <div className="bg-obsidian-950 min-h-screen py-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-obsidian-900 border border-gold-500/30 rounded-2xl p-8 sm:p-10 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block">
                Patron Portal
              </span>
              <h1 className="font-serif text-3xl font-bold text-ivory-50 uppercase tracking-tight">
                Sign In
              </h1>
              <p className="text-xs text-gray-400">
                Welcome back to your private fragrance atelier.
              </p>
            </div>

            {/* Quick Demo Access Bar */}
            <div className="bg-obsidian-850 p-3 rounded-lg border border-gold-500/20 text-xs space-y-2">
              <div className="text-[10px] uppercase tracking-wider font-semibold text-gold-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Quick Demonstration Credentials:</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleQuickAdminDemo}
                  className="flex-1 bg-obsidian-800 hover:bg-gold-500/20 border border-gold-500/30 text-gold-200 py-1.5 px-2 rounded text-[11px] font-semibold transition-colors text-center"
                >
                  Fill Admin
                </button>
                <button
                  type="button"
                  onClick={handleQuickCustomerDemo}
                  className="flex-1 bg-obsidian-800 hover:bg-gold-500/20 border border-gold-500/30 text-gold-200 py-1.5 px-2 rounded text-[11px] font-semibold transition-colors text-center"
                >
                  Fill Customer
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. patron@aurasublime.com"
                    className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-ivory-100 placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-ivory-100 placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold-gradient hover:opacity-95 text-obsidian-950 font-semibold py-3 px-4 rounded-lg text-xs uppercase tracking-luxury flex items-center justify-center gap-2 shadow-xl transition-all disabled:opacity-50"
              >
                <span>{loading ? 'Authenticating...' : 'Enter Atelier'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center pt-2 text-xs text-gray-400">
              New to AURA SUBLIME?{' '}
              <Link to="/register" className="text-gold-300 hover:text-gold-200 underline font-semibold">
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
