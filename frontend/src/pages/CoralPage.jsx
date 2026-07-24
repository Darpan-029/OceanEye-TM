import React, { useState, useEffect } from 'react';
import { fetchCoralReefs } from '../services/api';
import { Activity, Thermometer, ShieldAlert, CheckCircle, TrendingDown, Layers } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const CoralPage = () => {
  const [reefs, setReefs] = useState([]);
  const [selectedReef, setSelectedReef] = useState(null);

  useEffect(() => {
    fetchCoralReefs().then(res => {
      setReefs(res);
      if (res.length > 0) setSelectedReef(res[0]);
    });
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-card border border-ocean-cyan/20">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-bold font-heading text-white">CoralScan Reef Sanctuary Monitor</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Multispectral oceanographic reef health scoring and thermal stress auditing.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold">
          Global Reef Health: 84.2% (Grade A)
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coral Reef Details & Satellite Comparison */}
        <div className="lg:col-span-2 space-y-6">
          {selectedReef ? (
            <div className="glass-panel p-6 rounded-card border border-ocean-cyan/20 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-xl font-heading font-bold text-white">{selectedReef.name}</h2>
                  <div className="text-xs font-mono text-ocean-cyan">Sector {selectedReef.sector} • Sanctuary Lat/Long: [{selectedReef.latitude}, {selectedReef.longitude}]</div>
                </div>
                <Badge status={selectedReef.bleachingRisk === 'LOW' ? 'success' : 'warning'}>
                  {selectedReef.status}
                </Badge>
              </div>

              {/* KPI Score Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-ocean-midnight/80 border border-slate-800">
                  <div className="text-slate-400">Health Score</div>
                  <div className="text-2xl font-bold text-emerald-400">{selectedReef.healthScore}%</div>
                </div>
                <div className="p-3.5 rounded-xl bg-ocean-midnight/80 border border-slate-800">
                  <div className="text-slate-400">Bleaching %</div>
                  <div className="text-2xl font-bold text-amber-300">{selectedReef.bleachingPercent}%</div>
                </div>
                <div className="p-3.5 rounded-xl bg-ocean-midnight/80 border border-slate-800">
                  <div className="text-slate-400">Surface Temp</div>
                  <div className="text-2xl font-bold text-sky-300">{selectedReef.surfaceTempC}°C</div>
                </div>
                <div className="p-3.5 rounded-xl bg-ocean-midnight/80 border border-slate-800">
                  <div className="text-slate-400">Health Trend</div>
                  <div className="text-base font-bold text-emerald-400 mt-1">{selectedReef.trend}</div>
                </div>
              </div>

              {/* Imagery Banner */}
              <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-900 border border-ocean-cyan/30">
                <img
                  src={selectedReef.imageUrl}
                  alt={selectedReef.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/assets/coral/coral-placeholder.svg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-darkest via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
                  <span>AUV Multispectral Scan Data</span>
                  <span className="px-2 py-0.5 rounded bg-black/60 border border-ocean-cyan/30 text-ocean-cyan">
                    Inspection: {new Date(selectedReef.lastInspectionDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Reef Sanctuary Selector */}
        <div className="lg:col-span-1 glass-panel p-5 rounded-card border border-ocean-cyan/20 space-y-3">
          <h3 className="font-heading font-bold text-white text-base border-b border-slate-800 pb-2">
            Reef Sanctuaries ({reefs.length})
          </h3>

          <div className="space-y-2.5">
            {reefs.map(reef => (
              <button
                key={reef.id}
                onClick={() => setSelectedReef(reef)}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  selectedReef?.id === reef.id
                    ? 'bg-ocean-blue/30 border-ocean-cyan shadow-glow-cyan'
                    : 'bg-ocean-midnight/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white text-xs">{reef.name}</span>
                  <Badge status={reef.bleachingRisk === 'LOW' ? 'success' : 'warning'}>{reef.bleachingRisk}</Badge>
                </div>
                <div className="flex items-center justify-between mt-2 text-[11px] font-mono text-slate-400">
                  <span>Health: <strong className="text-emerald-400">{reef.healthScore}%</strong></span>
                  <span>Temp: {reef.surfaceTempC}°C</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
