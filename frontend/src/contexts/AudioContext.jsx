import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const filterNodeRef = useRef(null);
  const subBassRef = useRef(null);
  const depthFeetRef = useRef(0);

  // Initialize Web Audio API spatial engine
  useEffect(() => {
    if (!audioEnabled) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.05;
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Ambient Noise (Water Current / Waves)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const lowpassFilter = ctx.createBiquadFilter();
      lowpassFilter.type = 'lowpass';
      lowpassFilter.frequency.value = 400; // Shallow water cutoff
      filterNodeRef.current = lowpassFilter;

      noiseSource.connect(lowpassFilter);
      lowpassFilter.connect(masterGain);
      noiseSource.start();

      // Deep Sub-Bass Drone Oscillator (20-50 Hz)
      const subOsc = ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.value = 35; // Sub-bass hum
      const subGain = ctx.createGain();
      subGain.gain.value = 0.02;

      subOsc.connect(subGain);
      subGain.connect(masterGain);
      subOsc.start();
      subBassRef.current = { osc: subOsc, gain: subGain };

    } catch (e) {
      console.warn("Web Audio API not supported in environment", e);
    }

    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, [audioEnabled]);

  // Dynamically update audio parameters based on scroll depth
  const updateDepthAudio = (depthFeet) => {
    depthFeetRef.current = depthFeet;
    if (!audioCtxRef.current || !filterNodeRef.current) return;

    const ctx = audioCtxRef.current;
    const isDeep = depthFeet > 3300;

    // Filter frequency lowers as depth increases (400 Hz near surface down to 100 Hz in trench)
    const targetFreq = Math.max(80, 450 - (depthFeet / 35000) * 350);
    filterNodeRef.current.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.2);

    // Deep sub-bass hum swells in Hadal Zone
    if (subBassRef.current) {
      const subVol = depthFeet > 10000 ? 0.06 : 0.01;
      subBassRef.current.gain.gain.setTargetAtTime(subVol, ctx.currentTime, 0.5);
    }
  };

  // Sonar Ping Sound Effect (Frequency sweep sine ping)
  const playSonarPing = () => {
    if (!audioEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const pingGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // High A note
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.6);

      pingGain.gain.setValueAtTime(0.08, ctx.currentTime);
      pingGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(pingGain);
      pingGain.connect(gainNodeRef.current);

      osc.start();
      osc.stop(ctx.currentTime + 0.65);
    } catch (e) {}
  };

  // Hover Chime Sound Effect
  const playHoverSound = () => {
    if (!audioEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const chimeGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.1);

      chimeGain.gain.setValueAtTime(0.03, ctx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(chimeGain);
      chimeGain.connect(gainNodeRef.current);

      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch (e) {}
  };

  const toggleAudio = () => {
    setAudioEnabled(prev => !prev);
  };

  return (
    <AudioContext.Provider value={{
      audioEnabled,
      toggleAudio,
      updateDepthAudio,
      playSonarPing,
      playHoverSound
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
