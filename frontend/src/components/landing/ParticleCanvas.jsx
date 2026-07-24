import React, { useEffect, useRef } from 'react';

export const ParticleCanvas = ({ depthFeet }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Multi-layered Parallax Particles (80 particles split across 3 layers)
    const layers = [
      { count: 25, speedMult: 0.3, sizeMin: 0.5, sizeMax: 1.5, opacity: 0.4 }, // Background layer (slow)
      { count: 35, speedMult: 0.7, sizeMin: 1.0, sizeMax: 2.5, opacity: 0.6 }, // Midground layer
      { count: 20, speedMult: 1.2, sizeMin: 2.0, sizeMax: 4.0, opacity: 0.8 }  // Foreground layer (fast)
    ];

    const particles = [];
    layers.forEach((layer, layerIdx) => {
      for (let i = 0; i < layer.count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * (layer.sizeMax - layer.sizeMin) + layer.sizeMin,
          layerIdx,
          speedY: (Math.random() * 0.6 + 0.2) * layer.speedMult,
          speedX: (Math.random() * 0.4 - 0.2) * layer.speedMult,
          baseOpacity: layer.opacity,
          isBioluminescent: Math.random() > 0.4
        });
      }
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDeep = depthFeet > 3300;

      particles.forEach((p) => {
        // Vertical movement direction changes depending on zone
        if (depthFeet < 1000) {
          p.y -= p.speedY; // Surface bubbles float up
        } else {
          p.y += p.speedY; // Marine snow / sediment drifts down
        }

        p.x += p.speedX;

        // Canvas Wrapping
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (isDeep && p.isBioluminescent) {
          // Bioluminescent Cyan/Seafoam Glow in dark ocean
          ctx.fillStyle = `rgba(71, 181, 255, ${p.baseOpacity})`;
          ctx.shadowBlur = p.layerIdx === 2 ? 12 : 6;
          ctx.shadowColor = p.layerIdx === 2 ? '#9FE2E6' : '#47B5FF';
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.baseOpacity * 0.5})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [depthFeet]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
};
