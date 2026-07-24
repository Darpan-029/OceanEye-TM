import React, { useState, useEffect } from 'react';
import { fetchRiskForecast } from '../services/api';
import { ShieldAlert, AlertTriangle, CheckCircle, Brain, Sparkles } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const RiskPage = () => {
  const [riskData, setRiskData] = useState(null);

  useEffect(() => {
    fetchRiskForecast().then(res => setRiskData(res));
  }, []);

  if (!riskData) return <div className="p-8 text-center font-mono text-ocean-cyan">Loading AI Risk Forecast...</div>;

  const { overallRiskScore, riskRating, aiConfidence, forecasts, recommendations } = riskData;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-card border border-ocean-cyan/20">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
            <h1 className="text-2xl font-bold font-heading text-white">AI Environmental Threat Risk Engine</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Predictive modeling for oil spill trajectories, coral thermal stress, and habitat loss risks.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-ocean-midnight border border-ocean-cyan/30 text-xs font-mono text-ocean-cyan flex items-center gap-2">
          <Brain className="w-4 h-4 text-ocean-cyan" />
          <span>Model Confidence: <strong>{aiConfidence}%</strong></span>
        </div>
      </div>

      {/* Main Threat Score & Forecasts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 glass-panel p-6 rounded-card border border-ocean-cyan/20 text-center space-y-4 flex flex-col items-center justify-center">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">Overall Environmental Risk Score</div>
          
          <div className="w-40 h-40 rounded-full border-4 border-ocean-cyan/30 flex flex-col items-center justify-center bg-ocean-midnight shadow-glow-cyan">
            <span className="text-5xl font-bold font-heading text-white">{overallRiskScore}</span>
            <span className="text-xs font-mono text-emerald-400 mt-1">/ 100 Risk</span>
          </div>

          <Badge status="warning">{riskRating.replace('_', ' ')}</Badge>

          <p className="text-xs text-slate-300 font-sans max-w-xs leading-relaxed">
            Ecosystem parameters remain within manageable variance. Zero critical oil slick breaches detected today.
          </p>
        </div>

        {/* Predictive Sub-Forecast Gauges */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-card border border-ocean-cyan/20 space-y-4">
          <h3 className="font-heading font-bold text-white text-base border-b border-slate-800 pb-2">
            Predictive Sub-Risk Vectors
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-ocean-midnight/80 border border-slate-800 space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Pollution Dispersal Risk</span>
                <span className="text-amber-400 font-bold">{forecasts.pollutionDispersalRisk}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${forecasts.pollutionDispersalRisk}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-ocean-midnight/80 border border-slate-800 space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Coral Bleaching Probability</span>
                <span className="text-emerald-400 font-bold">{forecasts.coralBleachingProbability}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${forecasts.coralBleachingProbability}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-ocean-midnight/80 border border-slate-800 space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Storm Impact Severity</span>
                <span className="text-sky-300 font-bold">{forecasts.stormImpactSeverity}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-sky-400 rounded-full" style={{ width: `${forecasts.stormImpactSeverity}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-ocean-midnight/80 border border-slate-800 space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Species Habitat Loss</span>
                <span className="text-emerald-400 font-bold">{forecasts.speciesHabitatLoss}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${forecasts.speciesHabitatLoss}%` }} />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="text-xs font-mono text-ocean-cyan font-bold">AI Recommended Mitigations:</div>
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-3 rounded-xl bg-ocean-midnight/90 border border-ocean-cyan/20 text-xs">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span>{rec.title}</span>
                  <Badge status="warning">{rec.priority}</Badge>
                </div>
                <p className="text-slate-400 mt-1">{rec.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
