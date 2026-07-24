import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TerminalLoader = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  const [completed, setCompleted] = useState(false);

  const sequence = [
    "Initializing OceanEye Kernel v1.0...",
    "Connecting to Orbital Satellite Network.............✓",
    "Synchronizing Marine Hydrophone & Sensor Grid.......✓",
    "Connecting Autonomous Underwater Drone Fleet........✓",
    "Loading Computer Vision AI Detection Models.........✓",
    "Building Ocean Digital Twin Environment.............✓",
    "System Status: OPTIMAL",
    "Beginning Oceanic Descent Sequence..."
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < sequence.length) {
        setLogs(prev => [...prev, sequence[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCompleted(true);
          setTimeout(onComplete, 600);
        }, 500);
      }
    }, 280);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      animate={{ opacity: completed ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 bg-[#02131F] flex items-center justify-center p-6"
    >
      <div className="w-full max-w-xl glass-panel p-6 rounded-card border border-ocean-cyan/30 shadow-glow-cyan font-mono text-xs text-ocean-cyan space-y-2">
        <div className="flex items-center justify-between border-b border-ocean-cyan/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="text-white font-bold ml-2">OCEANEYE OS v1.0.0</span>
          </div>
          <span className="text-slate-400">STATUS: INITIALIZING</span>
        </div>

        <div className="space-y-1.5 min-h-48">
          {logs.map((log, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-slate-500">&gt;</span>
              <span className={i === logs.length - 1 ? 'text-white font-semibold animate-pulse' : 'text-slate-300'}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
