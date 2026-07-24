import React, { useState } from 'react';
import { Wind, Waves, Thermometer, Droplet, Eye, ShieldAlert, SlidersHorizontal } from 'lucide-react';

export const WeatherPanel = ({ weather = {} }) => {
  const [unitImperial, setUnitImperial] = useState(false);
  const [forecastIndex, setForecastIndex] = useState(3); // Default index for ~12:00

  const forecast = weather.forecast24h || [
    { hour: "00:00", wave: 1.2, temp: 26.8, wind: 10.2 },
    { hour: "04:00", wave: 1.1, temp: 26.5, wind: 9.8 },
    { hour: "08:00", wave: 1.3, temp: 27.4, wind: 11.5 },
    { hour: "12:00", wave: 1.5, temp: 28.5, wind: 13.2 },
    { hour: "16:00", wave: 1.6, temp: 28.1, wind: 14.0 },
    { hour: "20:00", wave: 1.4, temp: 27.2, wind: 12.0 }
  ];

  const currentForecastPoint = forecast[forecastIndex] || forecast[0];

  const displayWave = unitImperial
    ? `${(currentForecastPoint.wave * 3.28084).toFixed(1)} ft`
    : `${currentForecastPoint.wave} m`;

  const displayWind = unitImperial
    ? `${(currentForecastPoint.wind * 1.15078).toFixed(1)} mph`
    : `${currentForecastPoint.wind} kn`;

  const displayTemp = unitImperial
    ? `${((currentForecastPoint.temp * 9) / 5 + 32).toFixed(1)}°F`
    : `${currentForecastPoint.temp}°C`;

  return (
    <div className="glass-panel p-5 rounded-card border border-ocean-cyan/15 space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-ocean-cyan/20 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-bold text-white text-base">Oceanographic Weather Telemetry</h3>
            <span className="px-2 py-0.5 rounded bg-ocean-midnight border border-ocean-cyan/30 text-[10px] font-mono text-ocean-cyan">
              Sector {weather.sector || 'SEC-B4'}
            </span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-0.5">
            Interactive 24-hour hydrodynamic forecast simulation
          </p>
        </div>

        {/* Unit Toggle Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setUnitImperial(prev => !prev)}
            className="px-3 py-1 rounded-xl bg-ocean-midnight border border-ocean-cyan/30 text-xs font-mono text-ocean-cyan hover:text-white transition-colors flex items-center gap-1.5"
            title="Toggle between Metric and Imperial units"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Units: <strong>{unitImperial ? 'Imperial (ft, mph, °F)' : 'Metric (m, kn, °C)'}</strong></span>
          </button>
        </div>
      </div>

      {/* Interactive 24-Hour Forecast Time Scrubber Slider */}
      <div className="p-3 rounded-xl bg-ocean-midnight/70 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-ocean-cyan animate-pulse" />
            Forecast Time Scrubber:
          </span>
          <span className="text-ocean-cyan font-bold text-sm bg-ocean-darkest px-2 py-0.5 rounded border border-ocean-cyan/30">
            {currentForecastPoint.hour} UTC
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={forecast.length - 1}
          value={forecastIndex}
          onChange={(e) => setForecastIndex(Number(e.target.value))}
          className="w-full accent-ocean-cyan cursor-pointer h-2 rounded-lg bg-slate-800"
        />

        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          {forecast.map((f, idx) => (
            <span
              key={idx}
              onClick={() => setForecastIndex(idx)}
              className={`cursor-pointer hover:text-white ${forecastIndex === idx ? 'text-ocean-cyan font-bold' : ''}`}
            >
              {f.hour}
            </span>
          ))}
        </div>
      </div>

      {/* Hydrodynamic Telemetry KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-ocean-midnight/80 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Waves className="w-3.5 h-3.5 text-ocean-cyan" />
            <span>Wave Height</span>
          </div>
          <div className="text-base font-bold text-white">{displayWave}</div>
        </div>

        <div className="p-3 rounded-xl bg-ocean-midnight/80 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Wind className="w-3.5 h-3.5 text-ocean-cyan" />
            <span>Wind Speed</span>
          </div>
          <div className="text-base font-bold text-white">{displayWind}</div>
        </div>

        <div className="p-3 rounded-xl bg-ocean-midnight/80 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Thermometer className="w-3.5 h-3.5 text-ocean-cyan" />
            <span>Water Temp</span>
          </div>
          <div className="text-base font-bold text-white">{displayTemp}</div>
        </div>

        <div className="p-3 rounded-xl bg-ocean-midnight/80 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Droplet className="w-3.5 h-3.5 text-ocean-cyan" />
            <span>Salinity</span>
          </div>
          <div className="text-base font-bold text-white">{weather.salinityPSU || 35.1} PSU</div>
        </div>

        <div className="p-3 rounded-xl bg-ocean-midnight/80 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Eye className="w-3.5 h-3.5 text-ocean-cyan" />
            <span>Visibility</span>
          </div>
          <div className="text-base font-bold text-white">{weather.visibilityMeters || 28.0} m</div>
        </div>

        <div className="p-3 rounded-xl bg-ocean-midnight/80 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldAlert className="w-3.5 h-3.5 text-ocean-cyan" />
            <span>Storm Risk</span>
          </div>
          <div className="text-base font-bold text-emerald-400">{weather.stormProbabilityPct || 8.5}%</div>
        </div>
      </div>
    </div>
  );
};
