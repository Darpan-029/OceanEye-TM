import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Shield, Globe2, ScanEye, Activity, Fish, Radio, AlertTriangle } from 'lucide-react';

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    { title: 'Mission Control Dashboard', category: 'Navigation', path: '/dashboard', icon: Shield },
    { title: 'Ocean Atlas GIS GIS', category: 'Navigation', path: '/atlas', icon: Globe2 },
    { title: 'VisionAI Pollution Detector', category: 'Navigation', path: '/vision', icon: ScanEye },
    { title: 'CoralScan Reef Audit', category: 'Navigation', path: '/coral', icon: Activity },
    { title: 'Marine Species Census', category: 'Navigation', path: '/census', icon: Fish },
    { title: 'Fleet Drone Telemetry (DR-001 - DR-006)', category: 'Fleet', path: '/fleet', icon: Radio },
    { title: 'Alert Triage Center', category: 'Alerts', path: '/alerts', icon: AlertTriangle },
    { title: 'Sector SEC-B4 Central Equatorial Ridge', category: 'Sector', path: '/atlas', icon: Globe2 },
    { title: 'Blue Whale Pod Telemetry (SPC-001)', category: 'Species', path: '/census', icon: Fish },
    { title: 'Ghost Net Recovery Target DET-2013', category: 'Detection', path: '/vision', icon: ScanEye }
  ];

  const filtered = commands.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-xl glass-panel rounded-panel border border-ocean-cyan/30 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 py-3 border-b border-ocean-cyan/20">
          <Search className="w-5 h-5 text-ocean-cyan mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search species, drones, sectors..."
            className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none text-sm font-medium"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No results found for "<span className="text-ocean-cyan font-mono">{query}</span>"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.path)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-ocean-blue/30 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-ocean-midnight border border-ocean-cyan/20 flex items-center justify-center text-ocean-cyan group-hover:border-ocean-cyan">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-ocean-cyan">{item.title}</div>
                      <div className="text-[10px] font-mono text-slate-400">{item.category}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500 group-hover:text-slate-300">Jump →</span>
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 bg-ocean-midnight/80 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between">
          <span>Use ↑↓ to navigate, Enter to select</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
