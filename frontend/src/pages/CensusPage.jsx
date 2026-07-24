import React, { useState, useEffect } from 'react';
import { fetchSpecies } from '../services/api';
import { Fish, Shield, Heart, MapPin, Eye } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const CensusPage = () => {
  const [speciesList, setSpeciesList] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  useEffect(() => {
    fetchSpecies().then(res => setSpeciesList(res));
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-card border border-ocean-cyan/20">
        <div>
          <div className="flex items-center gap-2">
            <Fish className="w-6 h-6 text-sky-400" />
            <h1 className="text-2xl font-bold font-heading text-white">Marine Biodiversity Census</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Acoustic hydrophone pod tracking, endangered species telemetry, and annual migration patterns.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-ocean-midnight border border-ocean-cyan/30 text-xs font-mono text-ocean-cyan">
          Tracked Species: <strong>1,420 Pods</strong>
        </div>
      </div>

      {/* Species Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speciesList.map((sp) => (
          <div
            key={sp.id}
            className="glass-panel rounded-card border border-ocean-cyan/15 hover:border-ocean-cyan/40 glass-card-hover overflow-hidden flex flex-col justify-between"
          >
            <div className="relative h-48 bg-slate-900 overflow-hidden">
              <img
                src={sp.imageUrl}
                alt={sp.commonName}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = '/assets/species/species-placeholder.svg'; }}
              />
              <div className="absolute top-3 right-3">
                <Badge status={sp.status.includes('ENDANGERED') ? 'critical' : 'info'}>
                  {sp.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-heading font-bold text-white">{sp.commonName}</h3>
                <div className="text-xs font-mono italic text-ocean-cyan">{sp.scientificName}</div>
                <p className="text-xs text-slate-300 font-sans mt-2 line-clamp-2">
                  {sp.description}
                </p>
              </div>

              <div className="border-t border-slate-800 pt-3 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                <div>Habitat: <strong className="text-white block">{sp.primaryHabitat}</strong></div>
                <div>Population: <strong className="text-emerald-400 block">{sp.populationEstimate.toLocaleString()}</strong></div>
              </div>

              <button
                onClick={() => setSelectedSpecies(sp)}
                className="w-full mt-2 py-2 rounded-button bg-ocean-midnight border border-ocean-cyan/30 text-ocean-cyan hover:bg-ocean-cyan/10 font-mono text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Migration Telemetry</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Species Detail Modal */}
      {selectedSpecies && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="max-w-xl w-full glass-panel p-6 rounded-panel border border-ocean-cyan/40 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">{selectedSpecies.commonName}</h2>
                <div className="text-xs font-mono text-ocean-cyan">{selectedSpecies.scientificName}</div>
              </div>
              <button onClick={() => setSelectedSpecies(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-sm text-slate-300 font-sans">{selectedSpecies.description}</p>

            <div className="p-4 rounded-xl bg-ocean-midnight/90 border border-slate-800 space-y-2 text-xs font-mono">
              <div>Migration Status: <strong className="text-emerald-400">{selectedSpecies.migrationStatus}</strong></div>
              <div>Sector Sighting: <strong className="text-ocean-cyan">{selectedSpecies.sector}</strong></div>
              <div>Tagged Individuals: <strong className="text-white">{selectedSpecies.taggedIndividuals}</strong></div>
            </div>

            <button
              onClick={() => setSelectedSpecies(null)}
              className="w-full py-2.5 rounded-button bg-ocean-blue text-white font-medium text-xs hover:bg-blue-600 transition-colors"
            >
              Close Telemetry Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
