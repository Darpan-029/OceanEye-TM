import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Globe2,
  ScanEye,
  Activity,
  Fish,
  Radio,
  BarChart3,
  AlertTriangle,
  User,
  Settings,
  ShieldAlert,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const Sidebar = ({ isOpen, onToggle }) => {
  const navItems = [
    { path: '/dashboard', label: 'Mission Control', icon: LayoutDashboard },
    { path: '/atlas', label: 'Ocean Atlas GIS', icon: Globe2 },
    { path: '/vision', label: 'VisionAI Scan', icon: ScanEye },
    { path: '/coral', label: 'CoralScan', icon: Activity },
    { path: '/census', label: 'Marine Census', icon: Fish },
    { path: '/fleet', label: 'Fleet Monitor', icon: Radio },
    { path: '/risk', label: 'AI Risk Engine', icon: ShieldAlert },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/alerts', label: 'Alert Center', icon: AlertTriangle },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`fixed left-0 top-16 bottom-0 z-30 transition-all duration-300 glass-nav border-r border-ocean-cyan/10 flex flex-col justify-between ${
      isOpen ? 'w-64' : 'w-16'
    } hidden lg:flex`}>
      <div className="py-4 space-y-1 px-2">
        {/* Return to Landing Page */}
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 mb-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all border border-cyan-500/20 group"
          title="Return to Landing Page"
        >
          <img src="/logo.png" alt="OceanEye Logo" className="w-6 h-6 object-contain flex-shrink-0 group-hover:scale-110 transition-transform" />
          {isOpen && <span className="font-heading font-bold text-sm tracking-wide text-white">Ocean<span className="text-cyan-400">Eye</span> Home</span>}
        </NavLink>

        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                  isActive
                    ? 'bg-ocean-blue text-white shadow-glow-blue font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-ocean-midnight/80'
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0 text-ocean-cyan" />
              {isOpen && <span className="truncate">{item.label}</span>}
              {!isOpen && (
                <div className="absolute left-full ml-2 px-2.5 py-1 rounded-md bg-ocean-midnight text-xs font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none z-50 border border-ocean-cyan/20">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>

      <div className="p-3 border-t border-slate-800">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-ocean-midnight transition-colors"
          title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
};
