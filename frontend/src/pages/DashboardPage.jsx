import React, { useState, useEffect } from 'react';
import { useRealtimeData } from '../contexts/RealtimeDataContext';
import { KPIGrid } from '../components/dashboard/KPIGrid';
import { MapView } from '../components/dashboard/MapView';
import { LiveEventFeed } from '../components/dashboard/LiveEventFeed';
import { WeatherPanel } from '../components/dashboard/WeatherPanel';
import { Shield, Radio, Flame, Send, Download, CheckCircle2, AlertCircle, X, RefreshCw } from 'lucide-react';
import { Button } from '../components/common/Button';

export const DashboardPage = () => {
  const { dashboardData, drones, loading } = useRealtimeData();
  const [isThermalMode, setIsThermalMode] = useState(false);
  const [isRadarScanning, setIsRadarScanning] = useState(false);
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [dispatchSector, setDispatchSector] = useState('SEC-B4');
  const [dispatchDroneId, setDispatchDroneId] = useState('DR-004');
  const [dispatchMission, setDispatchMission] = useState('Automated Surface Skim Collection');
  const [toastMessage, setToastMessage] = useState(null);
  const [customLiveEvents, setCustomLiveEvents] = useState([]);

  // Auto-dismiss toast notification
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  if (loading || !dashboardData) {
    return (
      <div className="p-8 text-center text-ocean-cyan font-mono text-sm animate-pulse">
        Connecting to Mission Control Telemetry Grid...
      </div>
    );
  }

  const { kpis, topDetections, coralSummary, liveFeed, weather } = dashboardData;

  // Combine store feed with user-dispatched events
  const combinedFeed = [...customLiveEvents, ...(liveFeed || [])];

  const handleRadarSweep = () => {
    setIsRadarScanning(true);
    setToastMessage({
      type: 'info',
      title: 'AI Sector Radar Sweep Initiated',
      desc: 'Scanning 18 active submersiles & acoustic telemetry channels...'
    });
    setTimeout(() => {
      setIsRadarScanning(false);
      setToastMessage({
        type: 'success',
        title: 'Radar Sweep Complete',
        desc: 'Grid Synchronized: 6 Drones & 4 Marine Targets Verified Active.'
      });
    }, 2800);
  };

  const handleToggleThermal = () => {
    const nextState = !isThermalMode;
    setIsThermalMode(nextState);
    setToastMessage({
      type: 'info',
      title: nextState ? 'Thermal Infrared Mode ACTIVE' : 'Hydrographic Map Mode RESTORED',
      desc: nextState ? 'Displaying multispectral sea surface heat anomaly layer.' : 'Standard dark bathymetric vector layer loaded.'
    });
  };

  const handleOpenDispatch = (target = null) => {
    if (target) {
      setSelectedTarget(target);
      if (target.sector) setDispatchSector(target.sector);
    }
    setDispatchModalOpen(true);
  };

  const handleExecuteDispatch = (e) => {
    e.preventDefault();
    const drone = drones.find(d => d.id === dispatchDroneId) || { name: 'Probe Unit' };
    const timeStr = new Date().toTimeString().split(' ')[0];
    
    const newEvent = {
      id: `EV-${Math.floor(Math.random() * 9000) + 1000}`,
      time: timeStr,
      type: 'POLLUTION_DETECTED',
      title: `DISPATCH: ${drone.name} → ${dispatchSector}`,
      sector: `Sector ${dispatchSector}`,
      confidence: '100%',
      severity: 'CRITICAL',
      isUserDispatched: true
    };

    setCustomLiveEvents(prev => [newEvent, ...prev]);
    setDispatchModalOpen(false);
    setSelectedTarget(null);
    setToastMessage({
      type: 'success',
      title: `Emergency Submersible Dispatched: ${drone.name} (${dispatchDroneId})`,
      desc: `Target sector: ${dispatchSector} • Directive: ${dispatchMission}`
    });
  };

  const handleExportSituationReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      kpis,
      drones,
      topDetections,
      weather,
      customEvents: customLiveEvents
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mission-control-report-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setToastMessage({
      type: 'success',
      title: 'Telemetry Export Complete',
      desc: 'Mission Control situation brief saved to local workspace.'
    });
  };

  return (
    <div className="space-y-6 pb-12 relative">
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 max-w-md w-full glass-panel p-4 rounded-2xl border border-ocean-cyan/50 shadow-2xl animate-in slide-in-from-top duration-300 flex items-start gap-3 bg-ocean-darkest/95">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-ocean-cyan flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1 text-xs">
            <div className="font-bold font-heading text-white">{toastMessage.title}</div>
            <div className="text-slate-300 font-sans mt-0.5">{toastMessage.desc}</div>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Banner Header & Mission Control Interactive Command Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 glass-panel p-6 rounded-card border border-ocean-cyan/20">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-ocean-cyan" />
            <h1 className="text-2xl font-bold font-heading text-white">Mission Control Command Center</h1>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Real-time telemetry, interactive drone fleet dispatch, multispectral radar, and oceanographic auditing.
          </p>
        </div>

        {/* Interactive Action Buttons Bar */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
          <button
            onClick={handleRadarSweep}
            disabled={isRadarScanning}
            className={`px-3.5 py-2 rounded-xl border transition-all flex items-center gap-2 ${
              isRadarScanning
                ? 'bg-ocean-cyan/20 border-ocean-cyan text-ocean-cyan animate-pulse'
                : 'bg-ocean-midnight hover:bg-ocean-blue/30 border-ocean-cyan/30 text-slate-200 hover:text-white'
            }`}
            title="Perform live AI sonar sweep across sectors"
          >
            <Radio className={`w-4 h-4 ${isRadarScanning ? 'animate-spin text-ocean-cyan' : 'text-ocean-cyan'}`} />
            <span>{isRadarScanning ? 'Scanning Grid...' : 'Radar AI Sweep'}</span>
          </button>

          <button
            onClick={handleToggleThermal}
            className={`px-3.5 py-2 rounded-xl border transition-all flex items-center gap-2 ${
              isThermalMode
                ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold shadow-glow-coral'
                : 'bg-ocean-midnight hover:bg-ocean-blue/30 border-ocean-cyan/30 text-slate-200 hover:text-white'
            }`}
            title="Toggle Multispectral Infrared Thermal View"
          >
            <Flame className={`w-4 h-4 ${isThermalMode ? 'text-rose-400 animate-bounce' : 'text-amber-400'}`} />
            <span>{isThermalMode ? 'Thermal IR Mode [ON]' : 'Thermal IR View'}</span>
          </button>

          <button
            onClick={() => handleOpenDispatch()}
            className="px-4 py-2 rounded-xl bg-ocean-blue text-white font-medium hover:bg-blue-600 border border-ocean-cyan/40 shadow-glow-blue transition-all flex items-center gap-2 hover:-translate-y-0.5"
            title="Dispatch emergency submersible to target sector"
          >
            <Send className="w-4 h-4 text-ocean-cyan" />
            <span>Deploy Fleet Unit</span>
          </button>

          <button
            onClick={handleExportSituationReport}
            className="px-3.5 py-2 rounded-xl bg-ocean-midnight hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-2"
            title="Download full Mission Control situation brief"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Export Brief</span>
          </button>
        </div>
      </div>

      {/* KPI Hero Grid */}
      <KPIGrid kpis={kpis} />

      {/* Primary Map & Live Stream Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MapView
            drones={drones}
            detections={topDetections}
            coralReefs={coralSummary}
            isThermalMode={isThermalMode}
            isRadarScanning={isRadarScanning}
            onDispatchTarget={handleOpenDispatch}
          />
        </div>
        <div className="lg:col-span-1">
          <LiveEventFeed
            events={combinedFeed}
            onOpenDispatch={handleOpenDispatch}
          />
        </div>
      </div>

      {/* Oceanographic Weather Grid */}
      <WeatherPanel weather={weather} />

      {/* Emergency Fleet Dispatch Modal */}
      {dispatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-md w-full glass-panel p-6 rounded-panel border border-ocean-cyan/40 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-ocean-cyan" />
                <h2 className="text-lg font-heading font-bold text-white">Emergency Submersible Dispatch</h2>
              </div>
              <button
                onClick={() => setDispatchModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedTarget && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-300">
                <strong>Target Incident:</strong> {selectedTarget.type || selectedTarget.title || 'Marine Emergency'}
              </div>
            )}

            <form onSubmit={handleExecuteDispatch} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 mb-1.5 font-bold">Target Surveillance Sector</label>
                <select
                  value={dispatchSector}
                  onChange={(e) => setDispatchSector(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-ocean-midnight border border-ocean-cyan/30 text-white focus:outline-none focus:border-ocean-cyan"
                >
                  <option value="SEC-A2">SEC-A2 — North Barrier Coral Trench</option>
                  <option value="SEC-B4">SEC-B4 — Central Equatorial Ridge</option>
                  <option value="SEC-C1">SEC-C1 — Southern Abyssal Trench</option>
                  <option value="SEC-A3">SEC-A3 — Blue Whale Sanctuary</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1.5 font-bold">Select Submersible Unit</label>
                <select
                  value={dispatchDroneId}
                  onChange={(e) => setDispatchDroneId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-ocean-midnight border border-ocean-cyan/30 text-white focus:outline-none focus:border-ocean-cyan"
                >
                  {drones.map(drone => (
                    <option key={drone.id} value={drone.id}>
                      {drone.id} - {drone.name} ({drone.status} • Battery {drone.battery}%)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1.5 font-bold">Mission Directive</label>
                <input
                  type="text"
                  value={dispatchMission}
                  onChange={(e) => setDispatchMission(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-ocean-midnight border border-ocean-cyan/30 text-white focus:outline-none focus:border-ocean-cyan font-sans"
                  placeholder="Enter directive..."
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setDispatchModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-ocean-blue hover:bg-blue-600 text-white font-bold text-xs shadow-glow-blue transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Launch Probe Directive</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
