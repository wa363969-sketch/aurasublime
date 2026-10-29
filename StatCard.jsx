import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, trend }) {
  return (
    <div className="bg-obsidian-850 border border-gold-500/20 rounded-xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">
          {title}
        </span>
        {Icon && (
          <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="font-serif text-2xl font-bold text-ivory-50 mb-1">
        {value}
      </div>

      {subtitle && (
        <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
          {trend && <span className="text-emerald-400 font-semibold">{trend}</span>}
          <span>{subtitle}</span>
        </div>
      )}
    </div>
  );
}
