import React from 'react';
import { motion } from 'framer-motion';

export const MarineCreatures = ({ depthFeet }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* 0 - 1,000 ft: Humpback Whale Ambient Silhouette */}
      {depthFeet < 2000 && (
        <motion.div
          initial={{ x: '-20%', y: '20%' }}
          animate={{ x: '115%', y: '25%' }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[350px] left-0 opacity-20 filter blur-[1px]"
        >
          {/* Whale SVG Silhouette */}
          <svg className="w-[320px] h-[120px] text-cyan-300 fill-current" viewBox="0 0 500 200">
            <path d="M450,100 C400,60 300,40 200,60 C120,75 60,100 20,90 C10,85 0,70 10,60 C20,50 40,70 80,75 C140,80 220,60 300,70 C380,80 440,90 450,100 Z" />
            <ellipse cx="250" cy="110" rx="180" ry="40" />
            <path d="M50,120 L10,140 L30,110 Z" />
          </svg>
        </motion.div>
      )}

      {/* 1,000 - 4,000 ft: Pulsing Bioluminescent Jellyfish */}
      {depthFeet > 800 && depthFeet < 6000 && (
        <motion.div
          initial={{ x: '105%', y: '10%' }}
          animate={{ x: '-25%', y: '15%' }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[1700px] right-0 opacity-80"
        >
          <div className="w-32 h-32 rounded-t-full bg-cyan-400/20 border border-ocean-cyan/60 backdrop-blur-sm p-3 flex flex-col items-center justify-between shadow-glow-cyan animate-pulse">
            <div className="text-[10px] font-mono text-ocean-cyan font-bold">Deep Bioluminescent Jellyfish</div>
            <div className="flex gap-1.5 mt-2">
              <span className="w-0.5 h-12 bg-cyan-300/80 rounded-full animate-bounce" />
              <span className="w-0.5 h-14 bg-cyan-400/90 rounded-full animate-bounce delay-100" />
              <span className="w-0.5 h-10 bg-cyan-300/70 rounded-full animate-bounce delay-200" />
              <span className="w-0.5 h-12 bg-cyan-400/80 rounded-full animate-bounce delay-300" />
            </div>
          </div>
        </motion.div>
      )}

      {/* 4,000 - 15,000 ft: Bioluminescent Anglerfish with Glowing Lure */}
      {depthFeet > 3500 && depthFeet < 18000 && (
        <motion.div
          initial={{ x: '-15%', y: '30%' }}
          animate={{ x: '110%', y: '35%' }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[3200px] left-0 opacity-85"
        >
          <div className="relative flex items-center gap-2">
            {/* Glowing Esca / Antenna Lure */}
            <div className="w-4 h-4 rounded-full bg-ocean-mint shadow-glow-cyan animate-ping" />
            <div className="w-24 h-16 bg-slate-950/90 border border-cyan-400/30 rounded-r-full p-2 flex flex-col justify-between shadow-glow-cyan">
              <span className="text-[9px] font-mono text-ocean-mint font-bold">Abyssal Anglerfish</span>
              <span className="text-[8px] font-mono text-slate-400">Bioluminescent Esca Active</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* 15,000 ft+: Autonomous Trench Submersible AUV */}
      {depthFeet > 10000 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute top-[4900px] left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="relative">
            {/* Dual Volumetric Spotlight Beams */}
            <div className="absolute -bottom-36 -left-20 w-40 h-44 bg-gradient-to-b from-ocean-cyan/30 to-transparent transform -rotate-25 blur-xl pointer-events-none" />
            <div className="absolute -bottom-36 -right-20 w-40 h-44 bg-gradient-to-b from-ocean-cyan/30 to-transparent transform rotate-25 blur-xl pointer-events-none" />

            <div className="w-72 h-36 glass-panel rounded-card border border-ocean-cyan/40 p-5 shadow-glow-cyan space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-ocean-cyan font-bold">ROV TITAN TRENCH PROBE</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> SCANNING
                </span>
              </div>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                Dual high-intensity LED headlights illuminating benthic Hadal Trench topography at 35,000 ft depth.
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800 pt-2">
                <span>Sonar Pulse: 100%</span>
                <span>Hydrophone ACTIVE</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
