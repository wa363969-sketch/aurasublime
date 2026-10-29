import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SEOHead from '../components/common/SEOHead';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    const res = await register(name, email, password);
    setLoading(false);

    if (res.success) {
      navigate('/account');
    } else {
      setErrorMessage(res.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <>
      <SEOHead
        title="Register — Royal Privilege Membership"
        description="Create your AURA SUBLIME patron account for complimentary delivery privilege and private batch access."
      />

      <div className="bg-obsidian-950 min-h-screen py-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-obsidian-900 border border-gold-500/30 rounded-2xl p-8 sm:p-10 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block">
                Privilege Registry
              </span>
              <h1 className="font-serif text-3xl font-bold text-ivory-50 uppercase tracking-tight">
                Create Account
              </h1>
              <p className="text-xs text-gray-400">
                Join our royal membership for private releases and bespoke concierge.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Farhan Zafar"
                    className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-ivory-100 placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    required
                  />
                </div>
              </div>

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
                    placeholder="e.g. farhan@example.com"
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
                    placeholder="At least 8 characters"
                    className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-ivory-100 placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
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
                <span>{loading ? 'Creating Membership...' : 'Register Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center pt-2 text-xs text-gray-400">
              Already a patron?{' '}
              <Link to="/login" className="text-gold-300 hover:text-gold-200 underline font-semibold">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
