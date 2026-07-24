import React, { useState, useEffect } from 'react';
import { fetchSectors, fetchDrones } from '../services/api';
import { MapView } from '../components/dashboard/MapView';
import { Globe2, Download } from 'lucide-react';
import { Button } from '../components/common/Button';

export const AtlasPage = () => {
  const [sectors, setSectors] = useState([]);
  const [drones, setDrones] = useState([]);
  const [selectedSector, setSelectedSector] = useState(null);

  useEffect(() => {
    Promise.all([fetchSectors(), fetchDrones()]).then(([secRes, droneRes]) => {
      setSectors(secRes);
      setDrones(droneRes);
      if (secRes.length > 0) setSelectedSector(secRes[0]);
    });
  }, []);

  const handleExportGeoJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sectors, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `oceaneye-sectors-gis.geojson`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-card border border-ocean-cyan/20">
        <div>
          <div className="flex items-center gap-2">
            <Globe2 className="w-6 h-6 text-ocean-cyan" />
            <h1 className="text-2xl font-bold font-heading text-white">Ocean Atlas GIS Command</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Geographic Information System mapping ocean sectors, drone trajectories, and sanctuary polygons.
          </p>
        </div>

        <Button onClick={handleExportGeoJSON} variant="secondary" size="sm" icon={Download}>
          Export Sector Coordinates (GeoJSON)
        </Button>
      </div>

      {/* Main Full GIS Map */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        <div className="lg:col-span-3 min-h-[500px]">
          <MapView drones={drones} sectors={sectors} />
        </div>

        {/* Sector Details Panel */}
        <div className="lg:col-span-1 glass-panel p-5 rounded-card border border-ocean-cyan/20 space-y-4 overflow-y-auto max-h-[calc(100vh-250px)]">
          <h3 className="font-heading font-bold text-white text-base border-b border-slate-800 pb-2 sticky top-0 bg-ocean-midnight/95 backdrop-blur-sm z-10">
            Surveillance Sectors
          </h3>

          <div className="space-y-3">
            {sectors.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setSelectedSector(sec)}
                className={`w-full rounded-xl border text-left transition-all overflow-hidden ${
                  selectedSector?.id === sec.id
                    ? 'bg-ocean-blue/30 border-ocean-cyan shadow-glow-cyan'
                    : 'bg-ocean-midnight/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {sec.imageUrl && (
                  <div className="h-20 w-full bg-slate-900 overflow-hidden relative">
                    <img src={sec.imageUrl} alt={sec.name} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = '/assets/weather/weather-placeholder.svg'; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean-darkest via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-ocean-cyan border border-ocean-cyan/30">
                      Satellite Optics
                    </span>
                  </div>
                )}

                <div className="p-3.5">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-ocean-cyan">{sec.id}</span>
                    <span className="text-emerald-400 font-bold">{sec.riskLevel} Risk</span>
                  </div>
                  <div className="text-xs font-semibold text-white mt-1">{sec.name}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-2">
                    Drones Active: {sec.activeDronesCount} • Coral: {sec.coralCoveragePct}%
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
