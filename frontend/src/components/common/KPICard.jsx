import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const KPICard = ({
  title,
  value,
  delta,
  isPositive = true,
  icon: Icon,
  sparkline = [30, 45, 40, 60, 55, 75, 84],
  subtitle,
  className = ''
}) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`glass-panel p-5 rounded-card border border-ocean-cyan/15 hover:border-ocean-cyan/35 transition-all duration-300 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono tracking-wider uppercase text-slate-400 font-medium">
          {title}
        </span>
        {Icon && (
          <div className="w-9 h-9 rounded-xl bg-ocean-cyan/10 border border-ocean-cyan/20 flex items-center justify-center text-ocean-cyan">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between mb-2">
        <div className="text-2xl lg:text-3xl font-bold font-heading text-white tracking-tight">
          {value}
        </div>
        {delta && (
          <div className={`flex items-center text-xs font-mono font-medium px-2 py-0.5 rounded-full ${
            isPositive ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
          }`}>
            {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {delta}
          </div>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-slate-400 mb-3">{subtitle}</p>
      )}

      {/* Mini SVG Sparkline */}
      {sparkline && sparkline.length > 0 && (
        <div className="h-8 w-full pt-1">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="#47B5FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={sparkline.map((val, idx) => {
                const x = (idx / (sparkline.length - 1)) * 100;
                const max = Math.max(...sparkline, 1);
                const min = Math.min(...sparkline, 0);
                const y = 30 - ((val - min) / (max - min || 1)) * 24 - 3;
                return `${x},${y}`;
              }).join(' ')}
            />
          </svg>
        </div>
      )}
    </motion.div>
  );
};
