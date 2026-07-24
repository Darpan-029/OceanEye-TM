import React, { useState, useEffect } from 'react';
import { fetchProfile } from '../services/api';
import { User, Award, Shield, CheckCircle, FileText } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile().then(res => setProfile(res));
  }, []);

  if (!profile) return <div className="p-8 text-center font-mono text-ocean-cyan">Loading Researcher Profile...</div>;

  return (
    <div className="space-y-6 pb-12">
      <div className="glass-panel p-8 rounded-panel border border-ocean-cyan/20 flex flex-col md:flex-row items-center gap-6">
        <img
          src={profile.avatarUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"}
          alt={profile.name}
          className="w-28 h-28 rounded-full border-2 border-ocean-cyan shadow-glow-cyan object-cover"
        />
        <div className="space-y-2 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h1 className="text-2xl font-bold font-heading text-white">{profile.name}</h1>
            <Badge status="cyan">Verified Commander</Badge>
          </div>
          <p className="text-sm font-mono text-ocean-cyan">{profile.role}</p>
          <div className="text-xs text-slate-300 font-sans">{profile.organization} • {profile.location}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-card border border-ocean-cyan/20 space-y-4">
          <h3 className="font-heading font-bold text-white text-base border-b border-slate-800 pb-2 flex items-center gap-2">
            <Award className="w-5 h-5 text-ocean-cyan" />
            <span>Certifications & Clearances</span>
          </h3>
          <div className="space-y-2 text-xs font-mono">
            {profile.certifications.map((cert, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-ocean-midnight/80 border border-slate-800 flex items-center gap-2 text-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-card border border-ocean-cyan/20 space-y-4">
          <h3 className="font-heading font-bold text-white text-base border-b border-slate-800 pb-2 flex items-center gap-2">
            <FileText className="w-5 h-5 text-ocean-cyan" />
            <span>Mission Statistics</span>
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-ocean-midnight/80 border border-slate-800 text-center">
              <div className="text-slate-400">Total Submersible Hours</div>
              <div className="text-3xl font-bold text-ocean-cyan mt-1">{profile.missionHours} hrs</div>
            </div>
            <div className="p-4 rounded-xl bg-ocean-midnight/80 border border-slate-800 text-center">
              <div className="text-slate-400">Reports Published</div>
              <div className="text-3xl font-bold text-emerald-400 mt-1">{profile.reportsGenerated}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
