import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Globe2,
  ScanEye,
  Activity,
  Radio,
  BarChart3
} from 'lucide-react';

export const MobileNav = () => {
  const items = [
    { path: '/dashboard', label: 'Control', icon: LayoutDashboard },
    { path: '/atlas', label: 'Atlas', icon: Globe2 },
    { path: '/vision', label: 'VisionAI', icon: ScanEye },
    { path: '/coral', label: 'Coral', icon: Activity },
    { path: '/fleet', label: 'Fleet', icon: Radio },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-nav h-16 border-t border-ocean-cyan/15 flex items-center justify-around px-2 lg:hidden">
      {items.map(item => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full py-1 text-[10px] font-mono font-medium transition-colors ${
                isActive ? 'text-ocean-cyan font-bold' : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
