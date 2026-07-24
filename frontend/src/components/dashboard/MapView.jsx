import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { Badge } from '../common/Badge';
import { Layers, Send, Radio, Camera, ShieldAlert } from 'lucide-react';

// Custom SVG Map Markers
const createCustomIcon = (color = '#47B5FF', label = '🛸') => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: rgba(4, 28, 50, 0.95);
        border: 2px solid ${color};
        box-shadow: 0 0 15px ${color};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: 'JetBrains Mono', monospace;
        font-weight: bold;
        font-size: 12px;
      ">
        ${label}
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });
};

const droneIcon = createCustomIcon('#47B5FF', '🛸');
const pollutionIcon = createCustomIcon('#EF4444', '⚠️');
const coralIcon = createCustomIcon('#22C55E', '🪸');

export const MapView = ({
  drones = [],
  detections = [],
  coralReefs = [],
  sectors = [],
  isThermalMode = false,
  isRadarScanning = false,
  onDispatchTarget
}) => {
  const [activeLayers, setActiveLayers] = useState({
    drones: true,
    pollution: true,
    coral: true
  });

  const toggleLayer = (layerKey) => {
    setActiveLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const centerPosition = [13.2, 73.0];

  // Tile layer URL depending on thermal mode
  const tileUrl = isThermalMode
    ? "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
    : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  return (
    <div className={`relative w-full h-[500px] lg:h-[580px] rounded-card overflow-hidden border transition-all ${
      isThermalMode ? 'border-rose-500/40 shadow-glow-coral' : 'border-ocean-cyan/20 glass-panel shadow-ambient'
    }`}>
      {/* Radar AI Scanning Animation Overlay */}
      {isRadarScanning && (
        <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="w-[600px] h-[600px] rounded-full border-2 border-ocean-cyan/60 animate-ping opacity-75 bg-ocean-cyan/10" />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-ocean-cyan/90 animate-pulse bg-ocean-cyan/20" />
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-ocean-cyan text-ocean-darkest font-mono text-xs font-bold animate-pulse flex items-center gap-2">
            <Radio className="w-4 h-4 animate-spin" />
            <span>AI SONAR RADAR SWEEP ACTIVE</span>
          </div>
        </div>
      )}

      {/* Map Control Layers Header Bar */}
      <div className="absolute top-4 right-4 z-20 glass-panel px-3 py-2 rounded-xl border border-ocean-cyan/30 flex items-center gap-2 text-xs font-mono text-slate-300">
        <Layers className="w-4 h-4 text-ocean-cyan" />
        <span className="hidden sm:inline text-white font-bold">Layers:</span>
        <button
          onClick={() => toggleLayer('drones')}
          className={`px-2.5 py-1 rounded-md text-[10px] transition-colors ${activeLayers.drones ? 'bg-ocean-cyan text-ocean-darkest font-bold' : 'bg-slate-800 text-slate-400'}`}
        >
          Drones ({drones.length})
        </button>
        <button
          onClick={() => toggleLayer('pollution')}
          className={`px-2.5 py-1 rounded-md text-[10px] transition-colors ${activeLayers.pollution ? 'bg-rose-500 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}
        >
          Targets ({detections.length})
        </button>
        <button
          onClick={() => toggleLayer('coral')}
          className={`px-2.5 py-1 rounded-md text-[10px] transition-colors ${activeLayers.coral ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}
        >
          Coral ({coralReefs.length})
        </button>
      </div>

      <MapContainer
        center={centerPosition}
        zoom={7}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url={tileUrl}
        />

        {/* Sonar Pulse Radar Circles */}
        {isRadarScanning && (
          <Circle
            center={centerPosition}
            radius={80000}
            pathOptions={{ color: '#47B5FF', fillColor: '#47B5FF', fillOpacity: 0.15 }}
          />
        )}

        {/* Drone Probes */}
        {activeLayers.drones && drones.map((drone) => (
          <Marker
            key={drone.id}
            position={[drone.latitude, drone.longitude]}
            icon={droneIcon}
          >
            <Popup>
              <div className="p-2 space-y-2 font-mono text-xs text-white max-w-xs">
                <div className="flex items-center justify-between border-b border-slate-700 pb-1">
                  <span className="font-bold text-ocean-cyan">{drone.name} ({drone.id})</span>
                  <Badge status={drone.status === 'ACTIVE' ? 'active' : 'warning'}>{drone.status}</Badge>
                </div>
                {drone.streamUrl && (
                  <div className="h-24 rounded-lg overflow-hidden my-1 bg-slate-900 border border-ocean-cyan/30">
                    <img src={drone.streamUrl} alt={drone.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <p className="text-[11px] text-slate-300 font-sans">{drone.mission}</p>
                <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-400 bg-slate-900/80 p-2 rounded-lg">
                  <div>Depth: <strong className="text-white">{drone.depth}m</strong></div>
                  <div>Battery: <strong className="text-white">{drone.battery}%</strong></div>
                  <div>Speed: <strong className="text-white">{drone.speed} kn</strong></div>
                  <div>Sector: <strong className="text-white">{drone.sector}</strong></div>
                </div>
                <button
                  onClick={() => onDispatchTarget && onDispatchTarget(drone)}
                  className="w-full py-1 rounded bg-ocean-blue hover:bg-blue-600 text-white font-bold text-[10px] transition-colors flex items-center justify-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Assign Directive</span>
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Pollution Targets */}
        {activeLayers.pollution && detections.map((det) => (
          <Marker
            key={det.id}
            position={[det.latitude, det.longitude]}
            icon={pollutionIcon}
          >
            <Popup>
              <div className="p-2 space-y-2 font-mono text-xs max-w-xs">
                <div className="flex items-center justify-between border-b border-slate-700 pb-1">
                  <span className="font-bold text-rose-400">{det.type}</span>
                  <Badge status="critical">{det.severity}</Badge>
                </div>
                {det.imageUrl && (
                  <div className="h-24 rounded-lg overflow-hidden my-1 bg-slate-900 border border-rose-500/30">
                    <img src={det.imageUrl} alt={det.type} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="text-[11px] text-slate-300">AI Confidence: <strong className="text-ocean-cyan">{det.confidence}%</strong></div>
                <p className="text-[10px] text-slate-400 font-sans">{det.recommendation}</p>
                <button
                  onClick={() => onDispatchTarget && onDispatchTarget(det)}
                  className="w-full py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] transition-colors flex items-center justify-center gap-1 shadow-glow-coral"
                >
                  <ShieldAlert className="w-3 h-3" />
                  <span>Dispatch Recovery Unit</span>
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Coral Reef Sanctuaries */}
        {activeLayers.coral && coralReefs.map((coral) => (
          <Marker
            key={coral.id}
            position={[coral.latitude, coral.longitude]}
            icon={coralIcon}
          >
            <Popup>
              <div className="p-2 space-y-2 font-mono text-xs max-w-xs">
                <div className="font-bold text-emerald-400">{coral.name}</div>
                {coral.imageUrl && (
                  <div className="h-24 rounded-lg overflow-hidden my-1 bg-slate-900 border border-emerald-500/30">
                    <img src={coral.imageUrl} alt={coral.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="text-[11px] text-slate-300">Health Index: <strong className="text-emerald-300">{coral.healthScore}%</strong></div>
                <div className="text-[10px] text-slate-400">Bleaching Risk: {coral.bleachingRisk} ({coral.bleachingPercent}%)</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
