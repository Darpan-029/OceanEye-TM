import React, { useState, useEffect } from 'react';
import { fetchVisionDetections } from '../services/api';
import { ScanEye, AlertTriangle, CheckCircle, ShieldAlert, Filter, Camera } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { ProgressRing } from '../components/common/ProgressRing';
import { Button } from '../components/common/Button';

export const VisionPage = () => {
  const [detections, setDetections] = useState([]);
  const [selectedDetection, setSelectedDetection] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  useEffect(() => {
    fetchVisionDetections().then(res => {
      setDetections(res);
      if (res.length > 0) setSelectedDetection(res[0]);
    });
  }, []);

  const filtered = detections.filter(d => filterSeverity === 'ALL' || d.severity === filterSeverity);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-card border border-ocean-cyan/20">
        <div>
          <div className="flex items-center gap-2">
            <ScanEye className="w-6 h-6 text-ocean-cyan" />
            <h1 className="text-2xl font-bold font-heading text-white">VisionAI Marine Pollution Detector</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Deep Neural Network object classification for plastic debris, ghost nets, and chemical slicks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'CRITICAL', 'HIGH'].map(sev => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                filterSeverity === sev
                  ? 'bg-ocean-cyan text-ocean-darkest font-bold'
                  : 'bg-ocean-midnight text-slate-400 hover:text-white'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Computer Vision Feed & Bounding Box Inspector */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-card border border-ocean-cyan/20 space-y-4">
          {selectedDetection ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-ocean-cyan">DETECTION IDENTIFIER: {selectedDetection.id}</div>
                  <h2 className="text-xl font-heading font-bold text-white mt-0.5">{selectedDetection.type}</h2>
                </div>
                <Badge status={selectedDetection.severity}>{selectedDetection.severity}</Badge>
              </div>

              {/* Simulated Optical Image with AI Bounding Box Overlay */}
              <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden bg-slate-900 border border-ocean-cyan/30">
                <img
                  src={selectedDetection.imageUrl}
                  alt={selectedDetection.type}
                  className="w-full h-full object-cover opacity-90"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/assets/detections/detection-placeholder.svg'; }}
                />
                
                {/* AI Bounding Box Box Overlay */}
                {selectedDetection.boundingBox && (
                  <div
                    className="absolute border-2 border-rose-500 bg-rose-500/20 rounded-md shadow-glow-coral transition-all duration-500"
                    style={{
                      left: `${selectedDetection.boundingBox.x}%`,
                      top: `${selectedDetection.boundingBox.y}%`,
                      width: `${selectedDetection.boundingBox.width}%`,
                      height: `${selectedDetection.boundingBox.height}%`
                    }}
                  >
                    <div className="absolute -top-6 left-0 px-2 py-0.5 bg-rose-600 text-white font-mono text-[9px] font-bold rounded shadow-md flex items-center gap-1">
                      <span>{selectedDetection.type}</span>
                      <span>({selectedDetection.confidence}%)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Detection Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-2">
                <div className="p-3 rounded-xl bg-ocean-midnight/80 border border-slate-800">
                  <div className="text-slate-400">Sector</div>
                  <div className="text-white font-bold">{selectedDetection.sector}</div>
                </div>
                <div className="p-3 rounded-xl bg-ocean-midnight/80 border border-slate-800">
                  <div className="text-slate-400">Captured By</div>
                  <div className="text-ocean-cyan font-bold">{selectedDetection.droneId}</div>
                </div>
                <div className="p-3 rounded-xl bg-ocean-midnight/80 border border-slate-800">
                  <div className="text-slate-400">Estimated Mass</div>
                  <div className="text-amber-400 font-bold">{selectedDetection.estimatedMassKg} kg</div>
                </div>
                <div className="p-3 rounded-xl bg-ocean-midnight/80 border border-slate-800">
                  <div className="text-slate-400">Status</div>
                  <div className="text-emerald-400 font-bold">{selectedDetection.status}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-ocean-midnight/90 border border-ocean-cyan/20 space-y-1 text-xs">
                <div className="font-mono text-ocean-cyan font-bold">AI Mitigation Recommendation:</div>
                <p className="text-slate-300 font-sans leading-relaxed">{selectedDetection.recommendation}</p>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-slate-400 font-mono text-xs">Select a detection target</div>
          )}
        </div>

        {/* Detections List */}
        <div className="lg:col-span-1 glass-panel p-5 rounded-card border border-ocean-cyan/20 space-y-3">
          <h3 className="font-heading font-bold text-white text-base border-b border-slate-800 pb-2">
            Target Detections ({filtered.length})
          </h3>

          <div className="space-y-2.5 max-h-[550px] overflow-y-auto pr-1">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedDetection(item)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                  selectedDetection?.id === item.id
                    ? 'bg-ocean-blue/30 border-ocean-cyan shadow-glow-cyan'
                    : 'bg-ocean-midnight/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="font-semibold text-white text-xs leading-tight">{item.type}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-1">{item.sector} • {item.droneId}</div>
                </div>
                <div className="text-right">
                  <Badge status={item.severity}>{item.severity}</Badge>
                  <span className="text-[10px] font-mono text-ocean-cyan block mt-1">{item.confidence}%</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
