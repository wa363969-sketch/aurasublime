import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, Lock } from 'lucide-react';

export default function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
          <span className="font-serif text-sm tracking-widest text-gold-300 uppercase">
            Verifying Atelier Security...
          </span>
        </div>
      </div>
    );
  }

  // Admin access protection check
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-obsidian-900 border border-gold-500/30 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-950/40 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-ivory-50 uppercase tracking-wider mb-2">
              Protected Atelier Access
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              This portal is strictly reserved for authorized AURA SUBLIME administrators and master perfumers.
            </p>
          </div>

          <div className="bg-obsidian-850 p-4 rounded-lg border border-gold-500/20 text-left text-xs space-y-1">
            <div className="text-gold-300 font-semibold mb-1 uppercase tracking-wider">
              Demo Admin Credentials:
            </div>
            <div className="text-gray-300">Email: <code className="text-gold-200">admin@aurasublime.com</code></div>
            <div className="text-gray-300">Password: <code className="text-gold-200">AuraAdmin2026!</code></div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              to="/login"
              className="w-full bg-gold-gradient text-obsidian-950 font-semibold py-3 rounded text-xs uppercase tracking-luxury shadow-lg hover:opacity-95 transition-all text-center block"
            >
              Sign In to Admin Portal
            </Link>
            <Link
              to="/"
              className="text-xs text-gray-400 hover:text-ivory-100 uppercase tracking-wider py-2"
            >
              Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian-900 flex text-ivory-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-6 lg:p-10 max-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
