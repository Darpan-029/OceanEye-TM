import React from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../../contexts/AudioContext';

export const DepthIndicator = ({ depthFeet }) => {
  const { playSonarPing, playHoverSound } = useAudio();

  const depthMarks = [
    { feet: 0, label: 'Surface', zone: 'Epipelagic' },
    { feet: 650, label: 'Sunlight Zone', zone: 'Photic' },
    { feet: 3300, label: 'Twilight Zone', zone: 'Mesopelagic' },
    { feet: 13000, label: 'Midnight Zone', zone: 'Bathypelagic' },
    { feet: 20000, label: 'Abyssal Zone', zone: 'Abyssopelagic' },
    { feet: 35000, label: 'Hadal Trench', zone: 'Hadal' }
  ];

  const handleScrollToDepth = (targetFeet) => {
    playSonarPing();
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const targetY = (targetFeet / 35000) * maxScroll;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Vertical Interactive Ruler Scrubber */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center">
        <div className="w-1 h-96 bg-gradient-to-b from-sky-400 via-ocean-blue to-slate-900 relative rounded-full shadow-glow-blue">
          {/* Active Depth Marker Line */}
          <div
            className="absolute -left-2 w-5 h-1 bg-ocean-cyan shadow-glow-cyan transition-all duration-300 rounded"
            style={{ top: `${(depthFeet / 35000) * 100}%` }}
          />

          {depthMarks.map((mark) => {
            const isActive = Math.abs(depthFeet - mark.feet) < 1800;
            const isCompleted = depthFeet >= mark.feet;

            return (
              <button
                key={mark.feet}
                onClick={() => handleScrollToDepth(mark.feet)}
                onMouseEnter={playHoverSound}
                className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 transition-all duration-300 group cursor-pointer"
                style={{ top: `${(mark.feet / 35000) * 100}%` }}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full border border-ocean-cyan/40 transition-all duration-300 ${
                    isActive
                      ? 'bg-ocean-cyan shadow-glow-cyan scale-125 border-white'
                      : isCompleted
                      ? 'bg-ocean-blue'
                      : 'bg-slate-800'
                  }`}
                />
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-ocean-midnight/90 border border-ocean-cyan/30 px-2.5 py-1 rounded-md text-left shadow-lg">
                  <div className={`text-[10px] font-mono whitespace-nowrap ${isActive ? 'text-ocean-cyan font-bold' : 'text-slate-300'}`}>
                    {mark.label} ({mark.feet} ft)
                  </div>
                  <div className="text-[8px] font-mono text-slate-400">{mark.zone}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Interactive Badge on Mobile & Header */}
      <div className="fixed top-20 right-6 z-40 glass-panel px-4 py-2 rounded-full border border-ocean-cyan/30 text-xs font-mono text-ocean-cyan shadow-glow-cyan flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-ocean-cyan animate-pulse" />
        <div>
          <span>Depth: <strong className="text-white font-bold">{Math.round(depthFeet).toLocaleString()} ft</strong></span>
        </div>
      </div>
    </>
  );
};
