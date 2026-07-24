import React, { useEffect, useState } from 'react';

export const ScannerCursor = ({ depthFeet }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isDeep = depthFeet > 2000;

  return (
    <>
      {/* Tactical Submersible Flashlight Spotlight Effect (Intensifies in darker ocean zones) */}
      <div
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 280px at ${position.x}px ${position.y}px, rgba(71, 181, 255, ${
            isDeep ? '0.12' : '0.04'
          }) 0%, transparent 80%)`
        }}
      />

      {/* Sonar Crosshair Pointer */}
      <div
        className="fixed pointer-events-none z-40 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      >
        <div className="w-8 h-8 rounded-full border border-ocean-cyan/60 flex items-center justify-center shadow-glow-cyan">
          <div className="w-1.5 h-1.5 rounded-full bg-ocean-cyan animate-pulse" />
          {/* Tactical Corner Crosshair Ticks */}
          <span className="absolute -top-1 w-0.5 h-1.5 bg-ocean-cyan" />
          <span className="absolute -bottom-1 w-0.5 h-1.5 bg-ocean-cyan" />
          <span className="absolute -left-1 w-1.5 h-0.5 bg-ocean-cyan" />
          <span className="absolute -right-1 w-1.5 h-0.5 bg-ocean-cyan" />
        </div>
      </div>
    </>
  );
};
