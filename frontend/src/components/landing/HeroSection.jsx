import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Compass, Shield } from 'lucide-react';
import { Button } from '../common/Button';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
      {/* Background Sunrise Sky & Water Reflections */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c2a4a] via-[#082038] to-[#041C32] pointer-events-none" />

      {/* Sun glow effect behind horizon */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-t from-sky-400/20 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Floating Animated Horizon Waves SVG */}
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-40 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#041C32"
            d="M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,160C672,160,768,192,864,197.3C960,203,1056,181,1152,165.3C1248,150,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,0,320Z"
          />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 max-w-4xl space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-ocean-cyan/30 text-xs font-mono text-ocean-cyan shadow-glow-cyan">
          <Shield className="w-3.5 h-3.5 text-ocean-cyan" />
          <span>GLOBAL OCEANIC INTELLIGENCE SUITE v1.0</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-heading text-white tracking-tight leading-none">
          OceanEye
        </h1>

        <div className="text-xl sm:text-2xl font-heading text-ocean-cyan tracking-wide font-medium">
          Eyes Beneath the Waves
        </div>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans font-light">
          An AI-powered marine intelligence command center for researchers, environmental agencies, and oceanic authorities to monitor, analyze, and protect marine ecosystems in real time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/dashboard">
            <Button size="lg" variant="primary" icon={Shield}>
              Launch Mission Control
            </Button>
          </Link>
          <a href="#ocean-dive">
            <Button size="lg" variant="secondary" icon={Compass}>
              Explore the Ocean
            </Button>
          </a>
        </div>
      </motion.div>

      {/* Downward Scroll Cue */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-slate-400 flex flex-col items-center gap-1 cursor-pointer"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-ocean-cyan">Scroll to Dive</span>
        <ChevronDown className="w-5 h-5 text-ocean-cyan" />
      </motion.div>
    </section>
  );
};
