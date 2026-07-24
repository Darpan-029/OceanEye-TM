import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { getZoneByDepth } from '../utils/oceanZones'

// Sea Turtle
const SeaTurtle = ({ seed = 0 }) => {
  const startY = 100 + (seed % 300)
  const endY = 100 + ((seed + 50) % 300)
  const duration = 35 + (seed % 15)
  const delay = 0
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ x: window.innerWidth * 0.2, y: startY }}
      animate={{
        x: [window.innerWidth * 0.2, window.innerWidth + 200, -200, window.innerWidth * 0.2],
        y: [startY, endY, startY, endY]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear"
      }}
    >
      <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
        <ellipse cx="40" cy="35" rx="30" ry="20" fill="#2D5A3D" opacity="0.8" />
        <ellipse cx="40" cy="35" rx="25" ry="15" fill="#3D7A4D" opacity="0.6" />
        <ellipse cx="70" cy="35" rx="12" ry="8" fill="#4A8A5A" />
        <motion.ellipse
          cx="20" cy="25" rx="15" ry="6" fill="#3D7A4D"
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.ellipse
          cx="20" cy="45" rx="15" ry="6" fill="#3D7A4D"
          animate={{ rotate: [10, -10, 10] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.ellipse
          cx="60" cy="25" rx="12" ry="5" fill="#3D7A4D"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.ellipse
          cx="60" cy="45" rx="12" ry="5" fill="#3D7A4D"
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  )
}

// Fish School
const FishSchool = ({ seed = 0, count = 6, color = '#FFB347' }) => {
  const fishPositions = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const fishSeed = seed + i * 100
      return {
        x: (fishSeed % 100) * 8,
        y: 100 + ((fishSeed + 25) % 300),
        scale: 0.3 + ((fishSeed % 40) / 100),
        delay: i * 0.15
      }
    })
  }, [seed, count])

  const duration = 25 + (seed % 10)
  const delay = 0

  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ x: window.innerWidth * 0.1 }}
      animate={{ x: [window.innerWidth * 0.1, window.innerWidth + 200, -200, window.innerWidth * 0.1] }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear"
      }}
    >
      {fishPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: pos.x,
            top: pos.y,
            transform: `scale(${pos.scale})`
          }}
          animate={{
            y: [pos.y, pos.y + 15, pos.y]
          }}
          transition={{
            duration: 2.5 + i * 0.2,
            repeat: Infinity,
            delay: pos.delay
          }}
        >
          <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
            <ellipse cx="15" cy="10" rx="12" ry="6" fill={color} opacity="0.8" />
            <polygon points="25,10 30,5 30,15" fill={color} opacity="0.9" />
            <circle cx="8" cy="9" r="2" fill="#1a1a2e" />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Jellyfish
const Jellyfish = ({ seed = 0, color = '#E6E6FA' }) => {
  const startX = (seed % 100) * 10
  const endX = ((seed + 50) % 100) * 10
  const duration = 30 + (seed % 10)
  const delay = 0

  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ x: startX, y: window.innerHeight * 0.3 }}
      animate={{
        y: [window.innerHeight * 0.3, window.innerHeight + 100, -100, window.innerHeight * 0.3],
        x: [startX, endX, startX, endX]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear"
      }}
    >
      <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
        <motion.path
          d="M10 30 Q30 0 50 30"
          fill={color}
          opacity="0.6"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M12 30 Q30 5 48 30"
          fill={color}
          opacity="0.4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
        />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const tentacleSeed = seed + i * 10
          return (
            <motion.path
              key={i}
              d={`M${15 + i * 6} 30 Q${15 + i * 6} 55 ${15 + i * 6} 80`}
              stroke={color}
              strokeWidth="2"
              fill="none"
              opacity="0.5"
              animate={{
                d: [
                  `M${15 + i * 6} 30 Q${15 + i * 6} 55 ${15 + i * 6} 80`,
                  `M${15 + i * 6} 30 Q${15 + i * 6 + (tentacleSeed % 10) - 5} 55 ${15 + i * 6 - (tentacleSeed % 10) + 5} 80`,
                  `M${15 + i * 6} 30 Q${15 + i * 6} 55 ${15 + i * 6} 80`
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            />
          )
        })}
      </svg>
    </motion.div>
  )
}

// Bioluminescent Fish
const BioluminescentFish = ({ seed = 0 }) => {
  const startY = 200 + (seed % 400)
  const endY = 200 + ((seed + 50) % 400)
  const duration = 22 + (seed % 8)
  const delay = 0

  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ x: window.innerWidth * 0.15, y: startY }}
      animate={{
        x: [window.innerWidth * 0.15, window.innerWidth + 100, -100, window.innerWidth * 0.15],
        y: [startY, endY, startY, endY]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear"
      }}
    >
      <svg width="40" height="25" viewBox="0 0 40 25" fill="none">
        <ellipse cx="20" cy="12" rx="15" ry="8" fill="#1a1a2e" opacity="0.9" />
        <polygon points="32,12 40,7 40,17" fill="#1a1a2e" />
        <motion.circle
          cx="25" cy="10" r="2" fill="#00FFFF"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.circle
          cx="28" cy="14" r="1.5" fill="#00FFFF"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />
        <circle cx="10" cy="11" r="1.5" fill="#1a1a2e" />
      </svg>
    </motion.div>
  )
}

// Anglerfish
const Anglerfish = ({ seed = 0 }) => {
  const startY = 250 + (seed % 300)
  const endY = 250 + ((seed + 50) % 300)
  const duration = 40 + (seed % 10)
  const delay = 0

  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ x: window.innerWidth * 0.2, y: startY }}
      animate={{
        x: [window.innerWidth * 0.2, window.innerWidth + 150, -150, window.innerWidth * 0.2],
        y: [startY, endY, startY, endY]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear"
      }}
    >
      <svg width="70" height="50" viewBox="0 0 70 50" fill="none">
        <ellipse cx="35" cy="25" rx="25" ry="18" fill="#1a1a2e" opacity="0.95" />
        <ellipse cx="55" cy="25" rx="12" ry="8" fill="#1a1a2e" />
        <circle cx="50" cy="22" r="3" fill="#1a1a2e" />
        {/* Bioluminescent lure */}
        <motion.line
          x1="55" y1="25"
          x2="65" y2="15"
          stroke="#1a1a2e"
          strokeWidth="2"
        />
        <motion.circle
          cx="65" cy="15" r="4" fill="#00FFFF"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle cx="45" cy="28" r="2" fill="#00FFFF" opacity="0.8" />
      </svg>
    </motion.div>
  )
}

// Dumbo Octopus
const DumboOctopus = ({ seed = 0 }) => {
  const startX = (seed % 100) * 10
  const endX = ((seed + 50) % 100) * 10
  const duration = 45 + (seed % 15)
  const delay = 0

  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ x: startX, y: window.innerHeight * 0.4 }}
      animate={{
        y: [window.innerHeight * 0.4, window.innerHeight + 100, -100, window.innerHeight * 0.4],
        x: [startX, endX, startX, endX]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear"
      }}
    >
      <svg width="50" height="60" viewBox="0 0 50 60" fill="none">
        <ellipse cx="25" cy="25" rx="18" ry="15" fill="#E8D5B7" opacity="0.8" />
        <circle cx="20" cy="22" r="4" fill="#1a1a2e" />
        <circle cx="30" cy="22" r="4" fill="#1a1a2e" />
        {/* Ear-like fins */}
        <motion.ellipse
          cx="15" cy="15" rx="8" ry="12" fill="#D4C4A8"
          animate={{ rotate: [-15, 15, -15] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.ellipse
          cx="35" cy="15" rx="8" ry="12" fill="#D4C4A8"
          animate={{ rotate: [15, -15, 15] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Tentacles */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const tentacleSeed = seed + i * 5
          return (
            <motion.path
              key={i}
              d={`M${10 + i * 5} 35 Q${10 + i * 5} 50 ${10 + i * 5} 60`}
              stroke="#E8D5B7"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
              animate={{
                d: [
                  `M${10 + i * 5} 35 Q${10 + i * 5} 50 ${10 + i * 5} 60`,
                  `M${10 + i * 5} 35 Q${10 + i * 5 + (tentacleSeed % 8) - 4} 50 ${10 + i * 5 - (tentacleSeed % 8) + 4} 60`,
                  `M${10 + i * 5} 35 Q${10 + i * 5} 50 ${10 + i * 5} 60`
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.15 }}
            />
          )
        })}
      </svg>
    </motion.div>
  )
}

// Research Drone (for Hadal zone)
const ResearchDrone = ({ seed = 0 }) => {
  const startY = 200 + (seed % 300)
  const endY = 200 + ((seed + 50) % 300)
  const duration = 30 + (seed % 10)
  const delay = 0

  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ x: window.innerWidth * 0.25, y: startY }}
      animate={{
        x: [window.innerWidth * 0.25, window.innerWidth + 120, -120, window.innerWidth * 0.25],
        y: [startY, endY, startY, endY]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear"
      }}
    >
      <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
        {/* Drone body */}
        <rect x="25" y="20" width="30" height="20" rx="5" fill="#4A5568" />
        {/* Headlights */}
        <motion.ellipse
          cx="55" cy="30" rx="5" ry="8" fill="#FFFF00"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.ellipse
          cx="55" cy="30" rx="8" ry="15" fill="#FFFF00" opacity="0.2"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        {/* Propellers */}
        <motion.ellipse
          cx="20" cy="15" rx="15" ry="3" fill="#718096"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.ellipse
          cx="60" cy="15" rx="15" ry="3" fill="#718096"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.ellipse
          cx="20" cy="45" rx="15" ry="3" fill="#718096"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.ellipse
          cx="60" cy="45" rx="15" ry="3" fill="#718096"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </motion.div>
  )
}

// Sonar Pulse
const SonarPulse = ({ seed = 0 }) => {
  const x = 50 + (seed % 50)
  const y = 50 + (seed % 50)
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        scale: [0, 2],
        opacity: [0.8, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: 0
      }}
    >
      <div className="w-32 h-32 rounded-full border-2 border-cyan-accent/50" />
    </motion.div>
  )
}

// Main Marine Creatures Component
const MarineCreatures = ({ depth }) => {
  const zone = getZoneByDepth(depth)
  
  const creatures = useMemo(() => {
    const result = []
    
    if (zone.id === 'surface') {
      // Sea turtles
      result.push(<SeaTurtle key="turtle1" seed={11111} />)
      result.push(<SeaTurtle key="turtle2" seed={22222} />)
      // Fish schools
      result.push(<FishSchool key="fish1" seed={33333} count={6} color="#FFB347" />)
      result.push(<FishSchool key="fish2" seed={44444} count={5} color="#FFD700" />)
    } else if (zone.id === 'sunlight') {
      // More diverse fish schools
      result.push(<FishSchool key="fish3" seed={55555} count={5} color="#FF6B6B" />)
      result.push(<FishSchool key="fish4" seed={66666} count={6} color="#4ECDC4" />)
      result.push(<FishSchool key="fish5" seed={77777} count={4} color="#FFE66D" />)
      // Sea turtles
      result.push(<SeaTurtle key="turtle3" seed={88888} />)
    } else if (zone.id === 'twilight') {
      // Jellyfish
      result.push(<Jellyfish key="jelly1" seed={99999} color="#E6E6FA" />)
      result.push(<Jellyfish key="jelly2" seed={101010} color="#D8BFD8" />)
      result.push(<Jellyfish key="jelly3" seed={111111} color="#E6E6FA" />)
      // Small fish schools
      result.push(<FishSchool key="fish6" seed={121212} count={4} color="#87CEEB" />)
    } else if (zone.id === 'midnight') {
      // Bioluminescent fish
      result.push(<BioluminescentFish key="bio1" seed={131313} />)
      result.push(<BioluminescentFish key="bio2" seed={141414} />)
      result.push(<BioluminescentFish key="bio3" seed={151515} />)
      // Anglerfish
      result.push(<Anglerfish key="angler1" seed={161616} />)
      // Deep jellyfish
      result.push(<Jellyfish key="jelly4" seed={171717} color="#9370DB" />)
    } else if (zone.id === 'abyssal') {
      // Dumbo octopus
      result.push(<DumboOctopus key="octo1" seed={181818} />)
      result.push(<DumboOctopus key="octo2" seed={191919} />)
      // Bioluminescent fish
      result.push(<BioluminescentFish key="bio4" seed={202020} />)
      result.push(<BioluminescentFish key="bio5" seed={212121} />)
    } else if (zone.id === 'hadal') {
      // Research drones
      result.push(<ResearchDrone key="drone1" seed={222222} />)
      result.push(<ResearchDrone key="drone2" seed={232323} />)
      // Sonar pulses
      result.push(<SonarPulse key="sonar1" seed={242424} />)
      result.push(<SonarPulse key="sonar2" seed={252525} />)
      // Sparse bioluminescent creatures
      result.push(<BioluminescentFish key="bio6" seed={262626} />)
    }
    
    return result
  }, [zone.id])
  
  return <div className="absolute inset-0 pointer-events-none overflow-hidden">{creatures}</div>
}

export default MarineCreatures
