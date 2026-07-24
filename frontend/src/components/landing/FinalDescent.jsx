import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const FinalDescent = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 z-20">
      {/* Sonar Pulse Wave Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full border border-ocean-cyan/20 animate-sonar" />
        <div className="w-[600px] h-[600px] rounded-full border border-ocean-cyan/10 animate-sonar delay-75" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-20 max-w-3xl space-y-6 glass-panel p-10 rounded-panel border border-ocean-cyan/40 shadow-glow-cyan"
      >
        <div className="w-16 h-16 rounded-2xl bg-ocean-blue mx-auto flex items-center justify-center text-ocean-cyan shadow-glow-blue">
          <Shield className="w-8 h-8" />
        </div>

        <div className="text-xs font-mono text-ocean-cyan uppercase tracking-widest">
          Hadal Trench Reached (35,000 ft)
        </div>

        <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
          "The deeper we explore, the more we understand."
        </h2>

        <p className="text-base text-slate-300 font-sans leading-relaxed max-w-xl mx-auto">
          OceanEye transforms raw oceanic data into actionable intelligence. Enter the Mission Control command suite to monitor live drones, AI vision detections, coral reefs, and species.
        </p>

        <div className="pt-4">
          <Link to="/dashboard">
            <Button size="lg" variant="cyan" icon={ArrowRight}>
              Launch Mission Control Command
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-6 left-0 right-0 text-center text-xs font-mono text-slate-500">
        OceanEye Marine Intelligence Platform © 2026. Designed for NOAA, ISRO & Global Marine Agencies.
      </footer>
    </section>
  );
};
