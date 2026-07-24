import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Volume2, VolumeX, Shield, Command, Menu, X } from 'lucide-react';
import { useAudio } from '../../contexts/AudioContext';
import { useRealtimeData } from '../../contexts/RealtimeDataContext';

export const Navbar = ({ onOpenCommandPalette, onToggleSidebar, isSidebarOpen }) => {
  const location = useLocation();
  const { audioEnabled, toggleAudio } = useAudio();
  const { alerts } = useRealtimeData();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadAlertsCount = alerts.filter(a => !a.read).length;
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav py-4 px-6 lg:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-ocean-blue flex items-center justify-center text-white shadow-glow-blue group-hover:scale-105 transition-transform">
            <Shield className="w-6 h-6 text-ocean-cyan" />
          </div>
          <div>
            <span className="font-heading font-bold text-xl tracking-tight text-white block leading-none">
              OceanEye
            </span>
            <span className="text-[10px] font-mono text-ocean-cyan tracking-widest uppercase block mt-1">
              Marine Intelligence
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleAudio}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-ocean-midnight/60 border border-ocean-cyan/20 text-xs font-mono text-slate-300 hover:text-white hover:border-ocean-cyan/50 transition-all"
            title="Toggle Ambient Audio"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-ocean-cyan animate-pulse" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            <span className="hidden sm:inline">{audioEnabled ? 'Audio On' : 'Audio Off'}</span>
          </button>

          <Link
            to="/dashboard"
            className="px-5 py-2 rounded-button bg-ocean-blue text-white font-medium text-sm hover:bg-blue-600 shadow-glow-blue transition-all flex items-center gap-2 hover:-translate-y-0.5"
          >
            <span>Launch Mission Control</span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 glass-nav h-16 px-4 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-ocean-midnight lg:hidden"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <Link to="/" className="flex items-center gap-2.5 group cursor-pointer" title="Return to Landing Page">
          <img src="/logo.png" alt="OceanEye Logo" className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" />
          <span className="font-heading font-bold text-xl text-white tracking-tight">
            Ocean<span className="text-cyan-400">Eye</span>
          </span>
        </Link>
      </div>

      {/* Global Search Bar (Trigger Command Palette) - Centered */}
      <button
        onClick={onOpenCommandPalette}
        className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-xl bg-ocean-midnight/80 border border-ocean-cyan/20 text-slate-400 hover:text-slate-200 hover:border-ocean-cyan/40 transition-all text-xs font-mono w-64 lg:w-80"
      >
        <Search className="w-3.5 h-3.5 text-ocean-cyan" />
        <span className="flex-1 text-left">Search species, drones, sectors...</span>
        <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700 flex items-center gap-0.5">
          <Command className="w-3 h-3" /> K
        </kbd>
      </button>

      <div className="flex items-center gap-3">
        {/* Audio Toggle */}
        <button
          onClick={toggleAudio}
          className="p-2 rounded-xl bg-ocean-midnight/60 border border-ocean-cyan/20 text-slate-400 hover:text-ocean-cyan transition-all"
          title="Toggle Hydrophone Audio"
        >
          {audioEnabled ? <Volume2 className="w-4 h-4 text-ocean-cyan" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Notifications Dropdown Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(prev => !prev)}
            className="p-2 rounded-xl bg-ocean-midnight/60 border border-ocean-cyan/20 text-slate-400 hover:text-white relative transition-all"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          {/* Quick Notifications Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 glass-panel rounded-card border border-ocean-cyan/30 p-4 shadow-2xl z-50">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="text-xs font-heading font-bold text-white uppercase tracking-wider">
                  Live Alerts
                </span>
                <span className="text-[10px] font-mono text-ocean-cyan">
                  {unreadAlertsCount} Unread
                </span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {alerts.map(alert => (
                  <div key={alert.id} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-slate-300 font-medium">
                      <span>{alert.title}</span>
                      <span className="text-[9px] font-mono text-amber-400">{alert.severity}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{alert.description}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/alerts"
                onClick={() => setShowNotifications(false)}
                className="block text-center text-xs font-mono text-ocean-cyan hover:underline mt-3"
              >
                View Alert Center →
              </Link>
            </div>
          )}
        </div>

        {/* Profile Pill */}
        <Link to="/profile" className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
            alt="Dr. Elena Rostova"
            className="w-8 h-8 rounded-full border border-ocean-cyan/40 object-cover"
          />
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-white leading-tight">Dr. Elena Rostova</div>
            <div className="text-[10px] font-mono text-ocean-cyan">Chief Scientist</div>
          </div>
        </Link>
      </div>
    </header>
  );
};
