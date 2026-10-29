import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Star,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isAppwriteConfigured } from '../../config/appwrite';

export default function AdminSidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/admin', end: true, label: 'Overview', icon: LayoutDashboard },
    { to: '/admin/products', label: 'Perfume Catalog', icon: Package },
    { to: '/admin/orders', label: 'Orders & Logistics', icon: ShoppingBag },
    { to: '/admin/reviews', label: 'Review Moderation', icon: Star },
    { to: '/admin/subscribers', label: 'Subscribers', icon: Users },
    { to: '/admin/settings', label: 'Store Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-obsidian-950 border-r border-gold-500/20 flex flex-col justify-between shrink-0 min-h-screen">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-gold-500/20">
          <Link to="/" className="block">
            <div className="font-serif text-lg font-bold tracking-widest text-gold-300 uppercase">
              AURA SUBLIME
            </div>
            <div className="text-[10px] uppercase tracking-luxury text-gray-400 mt-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-gold-400" />
              <span>Admin Atelier Portal</span>
            </div>
          </Link>

          {/* Database status pill */}
          <div className="mt-4 p-2 rounded bg-obsidian-900 border border-gold-500/15 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isAppwriteConfigured ? 'bg-emerald-400' : 'bg-gold-400'} animate-ping`} />
            <div className="text-[10px] text-gray-300">
              {isAppwriteConfigured ? 'Appwrite Cloud Connected' : 'Local Persistence (Demo Mode)'}
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40 shadow-md'
                      : 'text-gray-400 hover:text-ivory-100 hover:bg-obsidian-850'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-gold-400" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="p-4 border-t border-gold-500/20 space-y-3">
        <div className="px-3 py-2 bg-obsidian-900 rounded-lg">
          <div className="text-xs font-semibold text-ivory-100 truncate">{user?.name}</div>
          <div className="text-[10px] text-gray-500 truncate">{user?.email}</div>
        </div>

        <div className="flex gap-2">
          <Link
            to="/"
            target="_blank"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded bg-obsidian-850 hover:bg-obsidian-800 border border-gold-500/20 text-xs text-gold-300 font-semibold uppercase tracking-wider transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 rounded bg-obsidian-850 hover:bg-red-950/40 border border-obsidian-750 hover:border-red-500/40 text-gray-400 hover:text-red-400 transition-colors"
            title="Sign Out"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
