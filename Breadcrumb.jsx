import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-xs text-gray-400">
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link to="/" className="hover:text-gold-400 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-gold-500/50 shrink-0" />
              {isLast || !item.href ? (
                <span className="text-gold-300 font-medium truncate max-w-xs">{item.label}</span>
              ) : (
                <Link to={item.href} className="hover:text-gold-400 transition-colors truncate max-w-xs">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
