import React, { useState } from 'react';
import { useRealtimeData } from '../contexts/RealtimeDataContext';
import { markAlertRead } from '../services/api';
import { AlertTriangle, Check, Camera } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const AlertsPage = () => {
  const { alerts } = useRealtimeData();
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [readState, setReadState] = useState({});

  const handleMarkRead = async (id) => {
    await markAlertRead(id);
    setReadState(prev => ({ ...prev, [id]: true }));
  };

  const filtered = alerts.filter(a => filterSeverity === 'ALL' || a.severity === filterSeverity);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-card border border-ocean-cyan/20">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <h1 className="text-2xl font-bold font-heading text-white">Alert Triage & Incident Dispatch</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Categorized system alerts, ghost net entanglement flags, and thermal threshold warnings.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          {['ALL', 'CRITICAL', 'WARNING', 'INFO'].map(sev => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                filterSeverity === sev ? 'bg-ocean-cyan text-ocean-darkest font-bold' : 'bg-ocean-midnight text-slate-400'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(alert => {
          const isRead = alert.read || readState[alert.id];
          return (
            <div
              key={alert.id}
              className={`p-5 rounded-card border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                isRead
                  ? 'bg-ocean-midnight/40 border-slate-800 opacity-80'
                  : 'bg-ocean-midnight/90 border-ocean-cyan/30 shadow-glow-cyan'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
                {alert.imageUrl && (
                  <div className="w-full sm:w-28 h-20 rounded-xl overflow-hidden bg-slate-900 border border-ocean-cyan/30 flex-shrink-0 relative">
                    <img src={alert.imageUrl} alt={alert.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="absolute bottom-1 right-1 p-0.5 rounded bg-black/60 text-ocean-cyan">
                      <Camera className="w-3 h-3" />
                    </span>
                  </div>
                )}

                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-ocean-cyan font-bold">{alert.id}</span>
                    <Badge status={alert.severity}>{alert.severity}</Badge>
                    <span className="text-[11px] font-mono text-slate-500">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <h3 className="font-heading font-bold text-white text-base">{alert.title}</h3>
                  <p className="text-xs text-slate-300 font-sans">{alert.description}</p>
                  {alert.actionRequired && (
                    <div className="text-[11px] font-mono text-amber-300 pt-1">Action: {alert.actionRequired}</div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                {!isRead && (
                  <button
                    onClick={() => handleMarkRead(alert.id)}
                    className="px-4 py-2 rounded-xl bg-ocean-blue text-white text-xs font-medium hover:bg-blue-600 transition-colors flex items-center gap-1.5 shadow-glow-blue"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Acknowledge Alert</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
