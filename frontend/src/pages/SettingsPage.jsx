import React, { useState, useEffect } from 'react';
import { fetchSettings } from '../services/api';
import { Settings, Key, Bell, Sliders, Shield } from 'lucide-react';
import { Button } from '../components/common/Button';

export const SettingsPage = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings().then(res => setSettings(res));
  }, []);

  if (!settings) return <div className="p-8 text-center font-mono text-ocean-cyan">Loading Settings...</div>;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2 glass-panel p-6 rounded-card border border-ocean-cyan/20">
        <Settings className="w-6 h-6 text-ocean-cyan" />
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Platform Settings & API Configuration</h1>
          <p className="text-xs text-slate-400 mt-1">Configure telemetry intervals, unit preferences, and developer access keys.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Telemetry & Display Settings */}
        <div className="glass-panel p-6 rounded-card border border-ocean-cyan/20 space-y-4">
          <h3 className="font-heading font-bold text-white text-base border-b border-slate-800 pb-2">
            Telemetry & Telemetry Units
          </h3>

          <div className="space-y-3 text-xs font-mono">
            <div className="flex items-center justify-between p-3 rounded-xl bg-ocean-midnight/80 border border-slate-800">
              <span className="text-slate-300">Auto Refresh Interval</span>
              <span className="text-ocean-cyan font-bold">Every {settings.autoRefreshIntervalSec}s</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-ocean-midnight/80 border border-slate-800">
              <span className="text-slate-300">Depth Metric System</span>
              <span className="text-white font-bold">{settings.units.depth}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-ocean-midnight/80 border border-slate-800">
              <span className="text-slate-300">Temperature Scale</span>
              <span className="text-white font-bold">{settings.units.temperature}</span>
            </div>
          </div>
        </div>

        {/* Developer API Key */}
        <div className="glass-panel p-6 rounded-card border border-ocean-cyan/20 space-y-4">
          <h3 className="font-heading font-bold text-white text-base border-b border-slate-800 pb-2 flex items-center gap-2">
            <Key className="w-4 h-4 text-ocean-cyan" />
            <span>Developer API Keys</span>
          </h3>

          <div className="p-3 rounded-xl bg-ocean-midnight/90 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="text-slate-400">Live Production Key</div>
            <input
              type="text"
              readOnly
              value={settings.apiKey}
              className="w-full bg-slate-900 border border-ocean-cyan/30 rounded p-2 text-ocean-cyan font-mono text-xs focus:outline-none"
            />
          </div>

          <Button variant="secondary" size="sm">
            Regenerate API Key
          </Button>
        </div>
      </div>
    </div>
  );
};
