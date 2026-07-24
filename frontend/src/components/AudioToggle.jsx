import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

const AudioToggle = ({ depth }) => {
  const [isMuted, setIsMuted] = useState(true)
  const [currentZone, setCurrentZone] = useState('surface')
  
  const audioContextRef = useRef(null)
  const oceanSourceRef = useRef(null)
  const lfoRef = useRef(null)
  const subOscRef = useRef(null)
  
  const filterNodeRef = useRef(null)
  const subFilterRef = useRef(null)
  const gainNodeRef = useRef(null)
  const subGainRef = useRef(null)

  useEffect(() => {
    let zone = 'surface'
    if (depth >= 2000 && depth < 8000) zone = 'sunlight'
    else if (depth >= 8000 && depth < 15000) zone = 'twilight'
    else if (depth >= 15000 && depth < 22000) zone = 'midnight'
    else if (depth >= 22000 && depth < 28000) zone = 'abyssal'
    else if (depth >= 28000) zone = 'hadal'

    setCurrentZone(zone)
    
    if (audioContextRef.current && !isMuted) {
      updateAudioForDepth(depth, zone)
    }
  }, [depth, isMuted])

  const updateAudioForDepth = (depthVal, zone) => {
    if (!filterNodeRef.current || !gainNodeRef.current || !subGainRef.current) return
    const now = audioContextRef.current.currentTime

    // Map depth smoothly (0 to 36000 ft) to filter frequency and gains
    const depthRatio = Math.min(1, Math.max(0, depthVal / 36000))
    
    // Lowpass cutoff frequency drops as you go deeper (850Hz surface down to 60Hz hadal)
    const cutoffFreq = Math.max(60, 850 * Math.pow(1 - depthRatio, 1.8))
    
    // Master ocean surf gain
    const masterGain = 0.15 + (depthRatio * 0.15)
    
    // Sub-bass hydrophone hum gain increases as you descend into deep abyss
    const subGain = 0.02 + (depthRatio * 0.18)

    filterNodeRef.current.frequency.setTargetAtTime(cutoffFreq, now, 0.4)
    gainNodeRef.current.gain.setTargetAtTime(masterGain, now, 0.4)
    subGainRef.current.gain.setTargetAtTime(subGain, now, 0.4)
  }

  // Create Brown/Pink Noise Buffer for realistic ocean surf acoustics
  const createOceanBuffer = (ctx) => {
    const bufferSize = 4 * ctx.sampleRate
    const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate)
    const left = buffer.getChannelData(0)
    const right = buffer.getChannelData(1)
    
    let lastOutL = 0.0
    let lastOutR = 0.0
    
    for (let i = 0; i < bufferSize; i++) {
      const whiteL = Math.random() * 2 - 1
      const whiteR = Math.random() * 2 - 1
      
      // Brownian integration formula for realistic deep ocean wave acoustics
      lastOutL = (lastOutL + (0.02 * whiteL)) / 1.02
      lastOutR = (lastOutR + (0.02 * whiteR)) / 1.02
      
      left[i] = lastOutL * 3.2
      right[i] = lastOutR * 3.2
    }
    return buffer
  }

  const startAudio = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      audioContextRef.current = ctx

      // 1. Ocean Wave Brownian Noise Source
      const oceanBuffer = createOceanBuffer(ctx)
      const oceanSource = ctx.createBufferSource()
      oceanSource.buffer = oceanBuffer
      oceanSource.loop = true
      oceanSourceRef.current = oceanSource

      // 2. Lowpass Filter for Ocean Depth Muffling
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 800
      filter.Q.value = 1.2
      filterNodeRef.current = filter

      // 3. LFO (Low-Frequency Swell Modulation) for 8-second realistic wave swell
      const lfo = ctx.createOscillator()
      lfo.type = 'sine'
      lfo.frequency.value = 0.12 // 8 second wave cycle
      lfoRef.current = lfo

      const lfoGain = ctx.createGain()
      lfoGain.gain.value = 150 // Modulates filter cutoff frequency subtly

      lfo.connect(lfoGain)
      lfoGain.connect(filter.frequency)

      // 4. Sub-bass Hydrophone Drone Oscillator (Deep Sea Acoustic Resonance)
      const subOsc = ctx.createOscillator()
      subOsc.type = 'sine'
      subOsc.frequency.value = 55 // 55Hz deep hydrophone hum
      subOscRef.current = subOsc

      const subFilter = ctx.createBiquadFilter()
      subFilter.type = 'lowpass'
      subFilter.frequency.value = 90
      subFilterRef.current = subFilter

      const subGainNode = ctx.createGain()
      subGainNode.gain.value = 0.02
      subGainRef.current = subGainNode

      subOsc.connect(subFilter)
      subFilter.connect(subGainNode)

      // 5. Master Gain & Audio Graph Wiring
      const mainGain = ctx.createGain()
      mainGain.gain.value = 0.15
      gainNodeRef.current = mainGain

      oceanSource.connect(filter)
      filter.connect(mainGain)

      mainGain.connect(ctx.destination)
      subGainNode.connect(ctx.destination)

      // Start sources
      oceanSource.start(0)
      lfo.start(0)
      subOsc.start(0)

      updateAudioForDepth(depth, currentZone)
    } catch (error) {
      console.error('Error starting ocean audio:', error)
    }
  }

  const stopAudio = () => {
    try {
      if (oceanSourceRef.current) {
        oceanSourceRef.current.stop()
        oceanSourceRef.current = null
      }
      if (lfoRef.current) {
        lfoRef.current.stop()
        lfoRef.current = null
      }
      if (subOscRef.current) {
        subOscRef.current.stop()
        subOscRef.current = null
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
    } catch (e) {
      // Ignore cleanup errors
    }
    filterNodeRef.current = null
    gainNodeRef.current = null
    subGainRef.current = null
  }

  const toggleAudio = () => {
    if (isMuted) {
      startAudio()
    } else {
      stopAudio()
    }
    setIsMuted(!isMuted)
  }

  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [])

  return (
    <motion.button
      onClick={toggleAudio}
      className="relative p-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 shadow-md"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isMuted ? 'Enable Realistic Ocean Soundscape' : 'Mute Soundscape'}
    >
      {isMuted ? (
        <VolumeX size={18} className="text-slate-400" />
      ) : (
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Volume2 size={18} className="text-cyan-400" />
        </motion.div>
      )}
      {!isMuted && (
        <motion.div
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.button>
  )
}

export default AudioToggle
