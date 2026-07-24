import React from 'react';

export const Badge = ({ children, status = 'default', className = '' }) => {
  const styles = {
    critical: 'bg-rose-500/15 border-rose-500/30 text-rose-400',
    danger: 'bg-rose-500/15 border-rose-500/30 text-rose-400',
    warning: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
    high: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
    success: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
    active: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
    info: 'bg-sky-500/15 border-sky-500/30 text-sky-300',
    cyan: 'bg-ocean-cyan/15 border-ocean-cyan/30 text-ocean-cyan',
    default: 'bg-slate-800 border-slate-700 text-slate-300'
  };

  const key = status.toLowerCase();
  const appliedStyle = styles[key] || styles.default;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${appliedStyle} ${className}`}>
      {children}
    </span>
  );
};
