import React, { useState } from 'react';
import { useRealtimeData } from '../contexts/RealtimeDataContext';
import { Radio, Camera, X } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const FleetPage = () => {
  const { drones } = useRealtimeData();
  const [activeDrone, setActiveDrone] = useState(null);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-card border border-ocean-cyan/20">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-ocean-cyan" />
            <h1 className="text-2xl font-bold font-heading text-white">Fleet Telemetry & Probe Command</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time status monitoring for autonomous underwater vehicles (AUVs) and trench ROVs.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-ocean-midnight border border-ocean-cyan/30 text-xs font-mono text-ocean-cyan">
          Active Drones: <strong>{drones.filter(d => d.status === 'ACTIVE').length} / {drones.length}</strong>
        </div>
      </div>

      {/* Drone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drones.map((drone) => (
          <div
            key={drone.id}
            className="glass-panel rounded-card border border-ocean-cyan/15 hover:border-ocean-cyan/40 glass-card-hover overflow-hidden flex flex-col justify-between"
          >
            {/* Card Image Banner */}
            <div className="relative h-40 bg-slate-900 overflow-hidden">
              <img
                src={drone.streamUrl || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"}
                alt={drone.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-darkest via-ocean-darkest/30 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/70 text-ocean-cyan border border-ocean-cyan/30 font-bold">
                  {drone.id}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-slate-300">
                  {drone.model}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <Badge status={drone.status === 'ACTIVE' ? 'active' : 'warning'}>{drone.status}</Badge>
              </div>
            </div>

            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-heading font-bold text-white">{drone.name}</h3>
                <div className="text-xs font-mono text-slate-300 mt-1">
                  Mission: <span className="text-white font-sans">{drone.mission}</span>
                </div>

                {/* Telemetry Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono mt-3">
                  <div className="p-2.5 rounded-xl bg-ocean-midnight/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Battery Level</div>
                    <div className={`text-base font-bold ${drone.battery < 30 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {drone.battery}%
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-ocean-midnight/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Current Depth</div>
                    <div className="text-base font-bold text-sky-300">{drone.depth} m</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-ocean-midnight/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Speed</div>
                    <div className="text-base font-bold text-white">{drone.speed} kn</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-ocean-midnight/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Signal Quality</div>
                    <div className="text-base font-bold text-ocean-cyan">{drone.signal}%</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Sector: <strong className="text-white">{drone.sector}</strong></span>
                <button
                  onClick={() => setActiveDrone(drone)}
                  className="px-3 py-1.5 rounded-xl bg-ocean-blue text-white text-[11px] font-medium hover:bg-blue-600 transition-colors flex items-center gap-1.5 shadow-glow-blue"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Optical Stream</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optical Feed Stream Modal */}
      {activeDrone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-2xl w-full glass-panel p-6 rounded-panel border border-ocean-cyan/40 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-xl font-heading font-bold text-white">{activeDrone.name} — Live Feed</h2>
                <div className="text-xs font-mono text-ocean-cyan">{activeDrone.id} • Sector {activeDrone.sector} • Camera ONLINE</div>
              </div>
              <button onClick={() => setActiveDrone(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden bg-slate-950 border border-ocean-cyan/30">
              <img
                src={activeDrone.streamUrl || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"}
                alt={activeDrone.name}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-rose-600 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" /> OPTICAL FEED LIVE
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white bg-black/60 p-2.5 rounded-xl border border-ocean-cyan/30 backdrop-blur-sm">
                <span>Depth: {activeDrone.depth}m | Speed: {activeDrone.speed}kn</span>
                <span>Signal: {activeDrone.signal}% EXCELLENT</span>
              </div>
            </div>

            <button
              onClick={() => setActiveDrone(null)}
              className="w-full py-2.5 rounded-button bg-ocean-midnight border border-slate-700 text-slate-300 font-mono text-xs hover:text-white transition-colors"
            >
              Close Feed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
