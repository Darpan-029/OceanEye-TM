import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertTriangle, Radio, Fish, CheckCircle2, Send } from 'lucide-react';
import { Badge } from '../common/Badge';

export const LiveEventFeed = ({ events = [], onOpenDispatch }) => {
  const [filterType, setFilterType] = useState('ALL');
  const [acknowledgedEvents, setAcknowledgedEvents] = useState({});

  const getIcon = (type) => {
    switch (type) {
      case 'POLLUTION_DETECTED': return AlertTriangle;
      case 'DRONE_TELEMETRY': return Radio;
      case 'CORAL_ALERT': return Activity;
      case 'CORAL_SCAN': return Activity;
      case 'SPECIES_SPOTTED': return Fish;
      case 'SPECIES_TRACK': return Fish;
      default: return Activity;
    }
  };

  const handleAcknowledge = (id, e) => {
    e.stopPropagation();
    setAcknowledgedEvents(prev => ({ ...prev, [id]: true }));
  };

  const filteredEvents = events.filter(ev => {
    if (filterType === 'ALL') return true;
    if (filterType === 'CRITICAL') return ev.severity === 'CRITICAL';
    if (filterType === 'POLLUTION') return ev.type.includes('POLLUTION') || ev.type.includes('VISION');
    if (filterType === 'TELEMETRY') return ev.type.includes('TELEMETRY') || ev.type.includes('DRONE');
    if (filterType === 'SPECIES') return ev.type.includes('SPECIES');
    return true;
  });

  return (
    <div className="glass-panel p-5 rounded-card border border-ocean-cyan/15 h-[500px] lg:h-[580px] flex flex-col justify-between space-y-3">
      {/* Header & Filter Bar */}
      <div>
        <div className="flex items-center justify-between border-b border-ocean-cyan/20 pb-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="font-heading font-bold text-white text-base">Live Event Stream</h3>
          </div>
          <span className="text-[10px] font-mono text-ocean-cyan">Telemetry Frequency: 10s</span>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
          {['ALL', 'CRITICAL', 'POLLUTION', 'TELEMETRY', 'SPECIES'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-2 py-0.5 rounded-lg transition-colors ${
                filterType === cat
                  ? 'bg-ocean-cyan text-ocean-darkest font-bold'
                  : 'bg-ocean-midnight/80 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
        <AnimatePresence initial={false}>
          {filteredEvents.map((ev) => {
            const Icon = getIcon(ev.type);
            const isAck = acknowledgedEvents[ev.id];

            return (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-xl border transition-all flex flex-col gap-2 text-xs ${
                  isAck
                    ? 'bg-ocean-midnight/40 border-slate-800 opacity-60'
                    : ev.isUserDispatched
                    ? 'bg-ocean-blue/20 border-ocean-cyan/50 shadow-glow-blue'
                    : 'bg-ocean-midnight/70 border-slate-800 hover:border-ocean-cyan/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      ev.severity === 'CRITICAL'
                        ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                        : 'bg-ocean-blue/30 border-ocean-cyan/30 text-ocean-cyan'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-white leading-tight">{ev.title}</div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">{ev.sector}</div>
                    </div>
                  </div>

                  <div className="text-right font-mono flex-shrink-0">
                    <span className="text-[10px] text-slate-500 block">{ev.time}</span>
                    <Badge status={ev.severity}>{ev.confidence || '100%'}</Badge>
                  </div>
                </div>

                {/* Interactive Action Row */}
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-800/60 text-[10px] font-mono">
                  {onOpenDispatch && (
                    <button
                      onClick={() => onOpenDispatch(ev)}
                      className="px-2 py-0.5 rounded bg-ocean-blue/30 text-ocean-cyan hover:bg-ocean-blue hover:text-white transition-colors flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Dispatch</span>
                    </button>
                  )}
                  <button
                    onClick={(e) => handleAcknowledge(ev.id, e)}
                    disabled={isAck}
                    className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1 ${
                      isAck
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{isAck ? 'Ack' : 'Acknowledge'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="border-t border-slate-800 pt-2 text-[10px] font-mono text-slate-400 text-center">
        Real-time telemetry synchronized with Satellite Vessel Alpha
      </div>
    </div>
  );
};
