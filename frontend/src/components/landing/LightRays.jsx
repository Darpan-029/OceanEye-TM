import React from 'react';

export const LightRays = ({ depthFeet }) => {
  // Light rays completely fade out by 1,200 ft depth
  const opacity = Math.max(0, 1 - depthFeet / 1200);

  if (opacity <= 0.01) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden transition-opacity duration-700"
      style={{ opacity }}
    >
      {/* Volumetric Animated Light Shafts */}
      <div className="absolute -top-40 left-1/4 w-96 h-[800px] bg-gradient-to-b from-sky-300/25 via-sky-400/10 to-transparent transform -rotate-12 blur-2xl animate-pulse" />
      <div className="absolute -top-40 left-1/2 w-80 h-[900px] bg-gradient-to-b from-cyan-300/20 via-blue-400/10 to-transparent transform rotate-6 blur-2xl animate-pulse delay-300" />
      <div className="absolute -top-40 right-1/4 w-[500px] h-[750px] bg-gradient-to-b from-sky-200/20 via-cyan-400/5 to-transparent transform -rotate-6 blur-3xl animate-pulse delay-700" />
    </div>
  );
};
