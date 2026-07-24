import { motion, useScroll, useTransform } from 'framer-motion'
import { useMemo } from 'react'
import { getZoneByDepth, getZoneTransition } from '../utils/oceanZones'
import MarineCreatures from './MarineCreatures'
import { OCEAN_ZONES } from '../utils/oceanZones'

// Layer 1: Background Gradient - Continuous smooth cross-fading ocean depth colors
const BackgroundGradient = ({ depth }) => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#010610] pointer-events-none">
      {OCEAN_ZONES.map((oceanZone) => {
        // Calculate continuous opacity based on depth distance to zone boundaries
        const mid = (oceanZone.minDepth + oceanZone.maxDepth) / 2
        const halfSpan = (oceanZone.maxDepth - oceanZone.minDepth) / 2 + 1500
        const dist = Math.abs(depth - mid)
        const opacity = Math.min(1, Math.max(0, 1 - dist / halfSpan))
        
        return (
          <div
            key={oceanZone.id}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              background: oceanZone.background.gradient,
              opacity,
              transition: 'opacity 0.15s ease-out'
            }}
          />
        )
      })}
    </div>
  )
}

// Layer 2: Water Fog
const WaterFog = ({ depth }) => {
  const zone = getZoneByDepth(depth)
  
  if (zone.background.fog === 0) return null
  
  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        background: `radial-gradient(circle at center, transparent 0%, ${zone.background.waterColor}40 ${zone.background.visibility * 100}%)`,
        opacity: zone.background.fog,
        transition: 'opacity 0.5s ease-in-out'
      }}
    />
  )
}

// Layer 3: Rock Formations
const RockFormations = ({ depth }) => {
  const zone = getZoneByDepth(depth)
  
  if (!zone.ambient.rocks && !zone.ambient.rockWalls && !zone.ambient.volcanicRock && !zone.ambient.rockCliffs) {
    return null
  }
  
  const rockColor = zone.id === 'hadal' ? '#1a1a1a' : zone.id === 'abyssal' ? '#2d2d2d' : '#3d5a5c'
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Left rock wall */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-32"
        style={{
          background: `linear-gradient(90deg, ${rockColor} 0%, transparent 100%)`,
          opacity: 0.3
        }}
      />
      {/* Right rock wall */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-32"
        style={{
          background: `linear-gradient(-90deg, ${rockColor} 0%, transparent 100%)`,
          opacity: 0.3
        }}
      />
    </div>
  )
}

// Layer 3.5: Ambient Effects (zone-specific)
const AmbientEffects = ({ depth }) => {
  const zone = getZoneByDepth(depth)
  
  // Surface zone effects
  if (zone.id === 'surface') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Clouds - reduced count and fixed positions */}
        {zone.ambient.clouds && [0, 1, 2, 3].map((i) => {
          const seed = i * 11111
          return (
            <motion.div
              key={`cloud-${i}`}
              className="absolute bg-white/30 rounded-full blur-2xl"
              initial={{ x: -300 }}
              animate={{ x: window.innerWidth + 300 }}
              transition={{ duration: 50 + i * 10, repeat: Infinity, delay: i * 5, ease: 'linear' }}
              style={{
                width: 150 + (seed % 100),
                height: 80 + ((seed + 50) % 50),
                top: 50 + ((seed + 25) % 200)
              }}
            />
          )
        })}
        
        {/* Ocean waves */}
        {zone.ambient.waves && (
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-deep-ocean-navy to-transparent opacity-60" />
        )}
        
        {/* Research vessel */}
        {zone.ambient.vessel && (
          <motion.div
            className="absolute right-10 top-1/3 opacity-40"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <svg width="200" height="100" viewBox="0 0 200 100" fill="#1a3a52">
              <ellipse cx="100" cy="70" rx="80" ry="20" />
              <rect x="60" y="30" width="60" height="40" />
              <rect x="85" y="10" width="10" height="20" />
              <rect x="90" y="5" width="30" height="5" />
            </svg>
          </motion.div>
        )}
        
        {/* Flying seabirds - reduced count */}
        {zone.ambient.island && [0, 1, 2].map((i) => {
          const seed = i * 22222
          return (
            <motion.div
              key={`bird-${i}`}
              className="absolute opacity-50"
              initial={{ x: -100 }}
              animate={{ x: window.innerWidth + 100 }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, delay: i * 3, ease: 'linear' }}
              style={{ y: 100 + ((seed + 50) % 150) }}
            >
              <svg width="30" height="20" viewBox="0 0 30 20" fill="#2d4a5c">
                <path d="M0 10 Q15 0 30 10 Q15 20 0 10" />
              </svg>
            </motion.div>
          )
        })}
      </div>
    )
  }
  
  // Sunlight zone effects
  if (zone.id === 'sunlight') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Coral reef hints */}
        {zone.ambient.coral && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-coral-pink/20 to-transparent" />
        )}
        
        {/* Seagrass - reduced count */}
        {zone.ambient.seagrass && [0, 1, 2, 3, 4].map((i) => {
          const seed = i * 33333
          return (
            <motion.div
              key={`seagrass-${i}`}
              className="absolute bottom-0 w-2 bg-green-400/30 rounded-t-full"
              style={{
                left: `${10 + i * 18}%`,
                height: 40 + ((seed + 25) % 30)
              }}
              animate={{
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3
              }}
            />
          )
        })}
      </div>
    )
  }
  
  // Twilight zone effects
  if (zone.id === 'twilight') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating marine snow - reduced count */}
        {zone.ambient.floatingSnow && [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const seed = i * 44444
          return (
            <motion.div
              key={`snow-${i}`}
              className="absolute rounded-full bg-gray-400/20"
              style={{
                width: 1 + (seed % 100) / 100,
                height: 1 + ((seed + 50) % 100) / 100,
                left: `${seed % 100}%`,
                top: `${((seed + 25) % 100)}%`
              }}
              animate={{
                y: [0, 100],
                x: [0, ((seed % 20) - 10)]
              }}
              transition={{
                duration: 25 + i * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.5
              }}
            />
          )
        })}
      </div>
    )
  }
  
  // Midnight zone effects
  if (zone.id === 'midnight') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Heavy fog */}
        {zone.ambient.heavyFog && (
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, #00050880 70%)',
              opacity: 0.5
            }}
          />
        )}
        
        {/* Blue haze */}
        {zone.ambient.blueHaze && (
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, #00BFFF10 0%, transparent 50%)',
              opacity: 0.3
            }}
          />
        )}
      </div>
    )
  }
  
  // Abyssal zone effects
  if (zone.id === 'abyssal') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Hydrothermal vents glow */}
        {zone.ambient.hydrothermalVents && (
          <>
            <motion.div
              className="absolute bottom-0 left-1/4 w-32 h-64 bg-gradient-to-t from-orange-500/30 to-transparent rounded-full blur-xl"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-32 h-64 bg-gradient-to-t from-orange-500/30 to-transparent rounded-full blur-xl"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2
              }}
            />
          </>
        )}
        
        {/* Steam plumes - reduced count */}
        {zone.ambient.steamPlumes && [0, 1, 2].map((i) => {
          const seed = i * 55555
          return (
            <motion.div
              key={`steam-${i}`}
              className="absolute bottom-0 w-16 h-48 bg-gradient-to-t from-gray-400/20 to-transparent rounded-full blur-md"
              style={{
                left: `${20 + i * 25}%`
              }}
              animate={{
                y: [0, -50],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.7
              }}
            />
          )
        })}
      </div>
    )
  }
  
  // Hadal zone effects
  if (zone.id === 'hadal') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dense fog */}
        {zone.ambient.denseFog && (
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, #00000090 60%)',
              opacity: 0.7
            }}
          />
        )}
        
        {/* Rock cliffs */}
        {zone.ambient.rockCliffs && (
          <>
            <div 
              className="absolute left-0 top-0 bottom-0 w-48"
              style={{
                background: 'linear-gradient(90deg, #1a1a1a 0%, transparent 100%)',
                opacity: 0.4
              }}
            />
            <div 
              className="absolute right-0 top-0 bottom-0 w-48"
              style={{
                background: 'linear-gradient(-90deg, #1a1a1a 0%, transparent 100%)',
                opacity: 0.4
              }}
            />
          </>
        )}
      </div>
    )
  }
  
  return null
}

// Layer 4: Marine Creatures
const CreatureLayer = ({ depth }) => {
  return <MarineCreatures depth={depth} />
}

// Layer 5: Particles
const Particles = ({ depth }) => {
  const zone = getZoneByDepth(depth)
  
  // Generate stable random values to prevent flickering
  const particles = useMemo(() => {
    const result = []
    
    // Bubbles - reduced count for performance
    const bubbleCount = Math.min(zone.particles.bubbles.count, 8)
    if (bubbleCount > 0) {
      for (let i = 0; i < bubbleCount; i++) {
        const seed = i * 12345
        const width = 2 + (seed % 100) / 25
        const height = 2 + ((seed + 50) % 100) / 25
        const left = (seed % 100)
        const top = ((seed + 25) % 100)
        const delay = (seed % 50) / 10
        const xMove = ((seed % 20) - 10)
        
        result.push(
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width,
              height,
              left: `${left}%`,
              top: `${top}%`,
              opacity: zone.particles.bubbles.opacity
            }}
            animate={{
              y: [0, -100],
              x: [0, xMove]
            }}
            transition={{
              duration: 10 / zone.particles.bubbles.speed,
              repeat: Infinity,
              ease: 'linear',
              delay
            }}
          />
        )
      }
    }
    
    // Marine snow - reduced count for performance
    const snowCount = zone.particles.marineSnow ? Math.min(zone.particles.marineSnow.count, 15) : 0
    if (snowCount > 0) {
      for (let i = 0; i < snowCount; i++) {
        const seed = i * 54321
        const width = 1 + (seed % 100) / 50
        const height = 1 + ((seed + 50) % 100) / 50
        const left = (seed % 100)
        const top = ((seed + 25) % 100)
        const delay = (seed % 30) / 10
        const xMove = ((seed % 10) - 5)
        
        result.push(
          <motion.div
            key={`snow-${i}`}
            className="absolute rounded-full bg-gray-400"
            style={{
              width,
              height,
              left: `${left}%`,
              top: `${top}%`,
              opacity: zone.particles.marineSnow.opacity,
              filter: 'blur(1px)'
            }}
            animate={{
              y: [0, 50],
              x: [0, xMove]
            }}
            transition={{
              duration: 15 / zone.particles.marineSnow.speed,
              repeat: Infinity,
              ease: 'linear',
              delay
            }}
          />
        )
      }
    }
    
    return result
  }, [zone.id])
  
  return <div className="absolute inset-0 pointer-events-none overflow-hidden">{particles}</div>
}

// Layer 6: Light Rays
const LightRays = ({ depth }) => {
  const zone = getZoneByDepth(depth)
  
  if (!zone.lighting.godRays) return null
  
  const rayCount = zone.id === 'surface' ? 4 : zone.id === 'sunlight' ? 3 : 0
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: rayCount }).map((_, i) => {
        const seed = i * 66666
        return (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-b from-white/20 to-transparent"
            style={{
              left: `${(i / rayCount) * 100}%`,
              top: 0,
              width: 50 + (seed % 80),
              height: '100%',
              opacity: zone.lighting.intensity * 0.3,
              transform: `rotate(${45 + (seed % 20)}deg)`,
              transformOrigin: 'top center'
            }}
            animate={{
              x: [0, 30, 0],
              opacity: [zone.lighting.intensity * 0.3, zone.lighting.intensity * 0.4, zone.lighting.intensity * 0.3]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )
      })}
    </div>
  )
}

// Layer 7: Foreground Bubbles
const ForegroundBubbles = ({ depth }) => {
  const zone = getZoneByDepth(depth)
  
  if (zone.particles.bubbles.count === 0) return null
  
  const foregroundBubbles = Math.min(Math.floor(zone.particles.bubbles.count * 0.3), 3)
  
  const bubbles = useMemo(() => {
    const result = []
    for (let i = 0; i < foregroundBubbles; i++) {
      const seed = i * 77777
      const width = 4 + (seed % 60) / 10
      const height = 4 + ((seed + 50) % 60) / 10
      const left = seed % 100
      const top = (seed + 25) % 100
      const delay = (seed % 40) / 10
      const xMove = ((seed % 30) - 15)
      
      result.push(
        <motion.div
          key={`fg-bubble-${i}`}
          className="absolute rounded-full bg-white border border-white/30"
          style={{
            width,
            height,
            left: `${left}%`,
            top: `${top}%`,
            opacity: zone.particles.bubbles.opacity * 1.5,
            filter: 'blur(0.5px)'
          }}
          animate={{
            y: [0, -150],
            x: [0, xMove]
          }}
          transition={{
            duration: 12 / zone.particles.bubbles.speed,
            repeat: Infinity,
            ease: 'linear',
            delay
          }}
        />
      )
    }
    return result
  }, [zone.id, foregroundBubbles])
  
  return <div className="absolute inset-0 pointer-events-none overflow-hidden">{bubbles}</div>
}

// Layer 8: Floating Educational Cards (placeholder - will be implemented separately)
const FloatingCards = ({ depth }) => {
  return null // Will be implemented with card components
}

// Layer 9: UI Overlay (placeholder - will be implemented separately)
const UIOverlay = ({ depth }) => {
  return null // Will be implemented with UI components
}

// Main Ocean Layers Component
const OceanLayers = ({ depth }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Layer 1: Background Gradient */}
      <BackgroundGradient depth={depth} />
      
      {/* Layer 2: Water Fog */}
      <WaterFog depth={depth} />
      
      {/* Layer 3: Rock Formations */}
      <RockFormations depth={depth} />
      
      {/* Layer 3.5: Ambient Effects (zone-specific) */}
      <AmbientEffects depth={depth} />
      
      {/* Layer 4: Marine Creatures */}
      <CreatureLayer depth={depth} />
      
      {/* Layer 5: Particles */}
      <Particles depth={depth} />
      
      {/* Layer 6: Light Rays */}
      <LightRays depth={depth} />
      
      {/* Layer 7: Foreground Bubbles */}
      <ForegroundBubbles depth={depth} />
      
      {/* Layer 8: Floating Educational Cards */}
      <FloatingCards depth={depth} />
      
      {/* Layer 9: UI Overlay */}
      <UIOverlay depth={depth} />
    </div>
  )
}

export default OceanLayers
