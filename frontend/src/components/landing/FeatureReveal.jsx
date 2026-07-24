import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScanEye, Activity, Fish, Globe2, Radio, ShieldAlert, Target, Play, Volume2 } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useAudio } from '../../contexts/AudioContext';

export const FeatureReveal = () => {
  const { playSonarPing, playHoverSound } = useAudio();
  const [lockedTarget, setLockedTarget] = useState(null);
  const [liveTimestamp, setLiveTimestamp] = useState(new Date().toLocaleTimeString());

  // Real-time ticking timestamp ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTimestamp(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTargetLock = (id, targetName) => {
    playSonarPing();
    setLockedTarget(id);
    setTimeout(() => setLockedTarget(null), 3000);
  };

  const features = [
    {
      id: 'feat-census',
      icon: Fish,
      title: 'Marine Census',
      subtitle: 'Biodiversity & Acoustic Tracking',
      description: 'Track endangered marine mammals, analyze migration pods, and monitor population growth using underwater hydrophone sensor arrays.',
      depth: '600 ft',
      badge: 'Epipelagic Zone',
      previewTitle: 'SPC-001 Blue Whale Telemetry',
      previewData: 'Frequency: 18 Hz Low-Pass Acoustic Hydrophone',
      hasAudioSnippet: true
    },
    {
      id: 'feat-vision',
      icon: ScanEye,
      title: 'VisionAI Scan',
      subtitle: 'Computer Vision Pollution Detection',
      description: 'Deep neural network models detect ghost nets, oil spills, chemical drums, and microplastics with bounding box coordinates and recovery plans.',
      depth: '1,500 ft',
      badge: 'Mesopelagic Zone',
      previewTitle: 'DET-2013 Ghost Net Detection',
      previewData: '96.4% Confidence • 14m Commercial Net',
      isTargetLockable: true
    },
    {
      id: 'feat-coral',
      icon: Activity,
      title: 'CoralScan',
      subtitle: 'Automated Bleaching & Thermal Audit',
      description: 'Real-time reef health scoring combining satellite sea-surface temperature with underwater drone multispectral imagery.',
      depth: '3,000 ft',
      badge: 'Twilight Zone',
      previewTitle: 'Triton Barrier Sanctuary Audit',
      previewData: '84.2% Coral Health Index • 4.2% Bleaching Risk'
    },
    {
      id: 'feat-atlas',
      icon: Globe2,
      title: 'Ocean Atlas GIS',
      subtitle: 'Interactive Multi-Layer Command Map',
      description: 'Interactive GIS command platform mapping protected sanctuaries, shipping lanes, drone paths, and environmental threat sectors.',
      depth: '7,000 ft',
      badge: 'Bathypelagic Zone',
      previewTitle: 'Sector SEC-B4 Surveillance Polygon',
      previewData: '3 Drones Active • Commercial Shipping Overlap'
    },
    {
      id: 'feat-fleet',
      icon: Radio,
      title: 'Fleet Monitor',
      subtitle: 'Autonomous Underwater Drone Telemetry',
      description: 'Coordinate AUV & ROV probes, monitor battery cycles, depth constraints, live camera optical streams, and waypoint missions.',
      depth: '12,000 ft',
      badge: 'Abyssal Zone',
      previewTitle: 'DR-001 Triton Sentinel Telemetry',
      previewData: 'Depth: 284m • Battery: 88% • Signal: EXCELLENT'
    },
    {
      id: 'feat-risk',
      icon: ShieldAlert,
      title: 'AI Risk Engine',
      subtitle: 'Predictive Threat Forecasting',
      description: 'Predict oil slick expansion routes, storm impact trajectories, and coral bleaching probability hours before ecological damage occurs.',
      depth: '25,000 ft',
      badge: 'Hadal Zone',
      previewTitle: 'Predictive Ecosystem Threat Score',
      previewData: 'Low-Moderate Overall Risk Score (32/100)'
    }
  ];

  return (
    <div className="relative z-20 max-w-5xl mx-auto px-6 py-24 space-y-48">
      {features.map((feat, idx) => {
        const Icon = feat.icon;
        const isLocked = lockedTarget === feat.id;

        return (
          <motion.div
            key={feat.id}
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="glass-panel p-8 rounded-panel border border-ocean-cyan/30 shadow-glow-cyan flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-2xl"
          >
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-ocean-blue/40 border border-ocean-cyan/40 flex items-center justify-center text-ocean-cyan shadow-glow-blue">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Badge status="cyan">{feat.badge}</Badge>
                    <span className="text-xs font-mono text-slate-400">@ {feat.depth}</span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white mt-1">{feat.title}</h3>
                </div>
              </div>

              <div className="text-sm font-mono text-ocean-cyan">{feat.subtitle}</div>

              <p className="text-slate-300 text-sm font-sans leading-relaxed">
                {feat.description}
              </p>
            </div>

            {/* Submersible Glass Viewport Teaser Box */}
            <div className="w-full lg:w-84 glass-card-hover bg-ocean-midnight/90 p-5 rounded-card border border-ocean-cyan/30 space-y-3 font-mono text-xs text-slate-300 backdrop-blur-xl relative overflow-hidden">
              {/* Blinking Live Ticker Line */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[10px] text-ocean-cyan">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>LIVE TELEMETRY</span>
                </div>
                <span>{liveTimestamp}</span>
              </div>

              <p className="text-white font-bold">{feat.previewTitle}</p>
              <p className="text-[11px] text-slate-400">{feat.previewData}</p>

              {/* Animated Live Waveform Chart SVG */}
              <div className="h-8 w-full pt-1">
                <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="#47B5FF"
                    strokeWidth="2"
                    points="0,10 15,4 30,16 45,2 60,18 75,8 90,12 100,10"
                    className="animate-pulse"
                  />
                </svg>
              </div>

              {/* Interactive Target Lock / Audio Snippet Button */}
              {feat.isTargetLockable && (
                <button
                  onClick={() => handleTargetLock(feat.id, feat.previewTitle)}
                  onMouseEnter={playHoverSound}
                  className={`w-full py-2 rounded-button text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                    isLocked
                      ? 'bg-rose-600 text-white shadow-glow-coral'
                      : 'bg-ocean-blue/30 border border-ocean-cyan/40 text-ocean-cyan hover:bg-ocean-cyan/20'
                  }`}
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>{isLocked ? 'TARGET LOCKED: GHOST NET' : 'Lock AI Bounding Target'}</span>
                </button>
              )}

              {feat.hasAudioSnippet && (
                <button
                  onClick={() => playSonarPing()}
                  onMouseEnter={playHoverSound}
                  className="w-full py-2 rounded-button bg-ocean-blue/30 border border-ocean-cyan/40 text-ocean-cyan hover:bg-ocean-cyan/20 text-xs font-mono font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Play Whale Acoustic Call</span>
                </button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
