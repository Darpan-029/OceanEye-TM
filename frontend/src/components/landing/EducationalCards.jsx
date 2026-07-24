import React from 'react';
import { motion } from 'framer-motion';

export const EducationalCards = () => {
  const cards = [
    {
      depth: 300,
      icon: '🌊',
      title: 'Ocean Exploration Gap',
      fact: 'Less than 10% of the world\'s oceans have been mapped using modern sonar and AI technologies.',
      position: 'right'
    },
    {
      depth: 1200,
      icon: '🐢',
      title: 'Marine Debris Threat',
      fact: 'Every minute, approximately one garbage truck of plastic enters the ocean, threatening over 50% of sea turtle species.',
      position: 'left'
    },
    {
      depth: 2500,
      icon: '🪸',
      title: 'Coral Ecosystem Vitality',
      fact: 'Coral reefs support roughly 25% of all known marine life despite occupying less than 1% of the ocean floor.',
      position: 'right'
    },
    {
      depth: 6000,
      icon: '🐋',
      title: 'Bioluminescent Mastery',
      fact: 'Over 75% of deep-sea marine organisms produce their own cold light through bioluminescence for defense and hunting.',
      position: 'left'
    }
  ];

  return (
    <div className="relative z-20 max-w-5xl mx-auto px-6 space-y-96 py-32 pointer-events-auto">
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className={`flex ${card.position === 'right' ? 'justify-end' : 'justify-start'}`}
        >
          <div className="max-w-md glass-panel p-6 rounded-card border border-ocean-cyan/25 shadow-glow-cyan">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{card.icon}</span>
              <div>
                <span className="text-[10px] font-mono text-ocean-cyan uppercase tracking-widest block">
                  Depth Fact #{idx + 1}
                </span>
                <h3 className="font-heading font-bold text-white text-lg">{card.title}</h3>
              </div>
            </div>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              {card.fact}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
