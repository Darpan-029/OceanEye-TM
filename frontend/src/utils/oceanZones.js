// Ocean Zone Configuration
// Based on ocean depth zones with specific themes, lighting, and marine life

export const OCEAN_ZONES = [
  {
    id: 'surface',
    name: 'Surface',
    minDepth: 0,
    maxDepth: 2000,
    theme: {
      mood: 'peaceful',
      time: 'morning',
      keywords: ['bright', 'hopeful', 'curious']
    },
    background: {
      gradient: 'linear-gradient(180deg, #0ea5e9 0%, #0284c7 35%, #0369a1 70%, #075985 100%)',
      skyColor: '#38bdf8',
      waterColor: '#0284c7',
      visibility: 1.0,
      fog: 0,
      lightIntensity: 1.0
    },
    lighting: {
      type: 'sunlight',
      color: '#FFD700',
      intensity: 1.0,
      godRays: true,
      reflections: true,
      bloom: 0.3
    },
    particles: {
      bubbles: { count: 8, opacity: 0.25, speed: 0.4 },
      dust: { count: 10, opacity: 0.1, speed: 0.2 },
      plankton: { count: 0, opacity: 0, speed: 0 }
    },
    creatures: {
      flyingFish: { count: 2, spawnRate: 0.01 },
      dolphins: { count: 1, spawnRate: 0.005 },
      seagulls: { count: 4, spawnRate: 0.02 },
      turtles: { count: 2, spawnRate: 0.01 },
      sardines: { count: 1, spawnRate: 0.02 }
    },
    ambient: {
      clouds: true,
      waves: true,
      vessel: true,
      island: true
    }
  },
  {
    id: 'sunlight',
    name: 'Sunlight Zone',
    minDepth: 2000,
    maxDepth: 8000,
    theme: {
      mood: 'vibrant',
      time: 'day',
      keywords: ['alive', 'relaxing', 'beautiful']
    },
    background: {
      gradient: 'linear-gradient(180deg, #075985 0%, #0c4a6e 40%, #0f172a 75%, #0b1329 100%)',
      skyColor: '#075985',
      waterColor: '#0c4a6e',
      visibility: 0.9,
      fog: 0.05,
      lightIntensity: 0.8
    },
    lighting: {
      type: 'sunlight',
      color: '#38bdf8',
      intensity: 0.8,
      godRays: true,
      reflections: true,
      bloom: 0.2
    },
    particles: {
      bubbles: { count: 15, opacity: 0.2, speed: 0.3 },
      dust: { count: 20, opacity: 0.15, speed: 0.15 },
      plankton: { count: 30, opacity: 0.1, speed: 0.1 }
    },
    creatures: {
      clownfish: { count: 8, spawnRate: 0.03 },
      butterflyfish: { count: 6, spawnRate: 0.025 },
      angelfish: { count: 5, spawnRate: 0.02 },
      surgeonfish: { count: 7, spawnRate: 0.025 },
      parrotfish: { count: 4, spawnRate: 0.02 },
      yellowTang: { count: 6, spawnRate: 0.025 },
      bannerfish: { count: 4, spawnRate: 0.02 },
      greenTurtle: { count: 2, spawnRate: 0.01 },
      hawksbillTurtle: { count: 1, spawnRate: 0.008 },
      reefShark: { count: 1, spawnRate: 0.005 },
      mantaRay: { count: 1, spawnRate: 0.005 },
      eagleRay: { count: 1, spawnRate: 0.005 },
      octopus: { count: 1, spawnRate: 0.008 },
      seahorse: { count: 2, spawnRate: 0.01 },
      starfish: { count: 3, spawnRate: 0.015 },
      anemone: { count: 4, spawnRate: 0.02 }
    },
    ambient: {
      coral: true,
      rocks: true,
      seagrass: true,
      sand: true
    }
  },
  {
    id: 'twilight',
    name: 'Twilight Zone',
    minDepth: 8000,
    maxDepth: 15000,
    theme: {
      mood: 'mysterious',
      time: 'evening',
      keywords: ['peaceful', 'mysterious']
    },
    background: {
      gradient: 'linear-gradient(180deg, #0b1329 0%, #091024 35%, #080d1e 70%, #050814 100%)',
      skyColor: '#0b1329',
      waterColor: '#050814',
      visibility: 0.6,
      fog: 0.15,
      lightIntensity: 0.3
    },
    lighting: {
      type: 'faint',
      color: '#6366f1',
      intensity: 0.3,
      godRays: false,
      reflections: false,
      bloom: 0.1
    },
    particles: {
      bubbles: { count: 8, opacity: 0.15, speed: 0.2 },
      dust: { count: 0, opacity: 0, speed: 0 },
      plankton: { count: 40, opacity: 0.2, speed: 0.08 },
      marineSnow: { count: 50, opacity: 0.15, speed: 0.06 }
    },
    creatures: {
      moonJellyfish: { count: 4, spawnRate: 0.02 },
      combJelly: { count: 3, spawnRate: 0.015 },
      glassSquid: { count: 3, spawnRate: 0.015 },
      hatchetfish: { count: 5, spawnRate: 0.025 },
      lanternfish: { count: 6, spawnRate: 0.03 },
      viperfish: { count: 2, spawnRate: 0.01 },
      siphonophore: { count: 2, spawnRate: 0.01 },
      dragonfish: { count: 2, spawnRate: 0.01 },
      smallSquid: { count: 4, spawnRate: 0.02 }
    },
    ambient: {
      rockWalls: true,
      floatingSnow: true
    }
  },
  {
    id: 'midnight',
    name: 'Midnight Zone',
    minDepth: 15000,
    maxDepth: 22000,
    theme: {
      mood: 'silent',
      time: 'night',
      keywords: ['massive', 'unknown']
    },
    background: {
      gradient: 'linear-gradient(180deg, #050814 0%, #03060f 40%, #02040a 70%, #010206 100%)',
      skyColor: '#050814',
      waterColor: '#010206',
      visibility: 0.3,
      fog: 0.35,
      lightIntensity: 0
    },
    lighting: {
      type: 'bioluminescent',
      color: '#00BFFF',
      intensity: 0.2,
      godRays: false,
      reflections: false,
      bloom: 0.15
    },
    particles: {
      bubbles: { count: 3, opacity: 0.1, speed: 0.1 },
      dust: { count: 0, opacity: 0, speed: 0 },
      plankton: { count: 60, opacity: 0.25, speed: 0.05 },
      marineSnow: { count: 80, opacity: 0.2, speed: 0.04 },
      glowingParticles: { count: 20, opacity: 0.3, speed: 0.03 }
    },
    creatures: {
      anglerfish: { count: 2, spawnRate: 0.01 },
      dragonfish: { count: 2, spawnRate: 0.01 },
      gulperEel: { count: 1, spawnRate: 0.008 },
      giantSquid: { count: 0, spawnRate: 0.002 },
      lanternfish: { count: 8, spawnRate: 0.04 },
      barreleye: { count: 2, spawnRate: 0.01 },
      deepSeaShrimp: { count: 4, spawnRate: 0.02 },
      deepSeaJellyfish: { count: 3, spawnRate: 0.015 },
      bioluminescentCopepods: { count: 30, spawnRate: 0.1 }
    },
    ambient: {
      heavyFog: true,
      blueHaze: true
    }
  },
  {
    id: 'abyssal',
    name: 'Abyssal Zone',
    minDepth: 22000,
    maxDepth: 28000,
    theme: {
      mood: 'alien',
      time: 'eternal',
      keywords: ['ancient', 'silent']
    },
    background: {
      gradient: 'linear-gradient(180deg, #010206 0%, #010204 40%, #000102 70%, #000000 100%)',
      skyColor: '#010206',
      waterColor: '#000000',
      visibility: 0.15,
      fog: 0.5,
      lightIntensity: 0
    },
    lighting: {
      type: 'thermal',
      color: '#FF6600',
      intensity: 0.15,
      godRays: false,
      reflections: false,
      bloom: 0.2
    },
    particles: {
      bubbles: { count: 0, opacity: 0, speed: 0 },
      dust: { count: 0, opacity: 0, speed: 0 },
      plankton: { count: 40, opacity: 0.2, speed: 0.03 },
      marineSnow: { count: 100, opacity: 0.25, speed: 0.02 },
      sediment: { count: 50, opacity: 0.15, speed: 0.015 }
    },
    creatures: {
      dumboOctopus: { count: 2, spawnRate: 0.01 },
      seaPig: { count: 3, spawnRate: 0.015 },
      tripodFish: { count: 2, spawnRate: 0.01 },
      giantIsopod: { count: 3, spawnRate: 0.015 },
      seaCucumber: { count: 4, spawnRate: 0.02 },
      brittleStar: { count: 3, spawnRate: 0.015 },
      tubeWorms: { count: 5, spawnRate: 0.025 },
      ventCrabs: { count: 3, spawnRate: 0.015 },
      grenadierFish: { count: 2, spawnRate: 0.01 }
    },
    ambient: {
      hydrothermalVents: true,
      steamPlumes: true,
      volcanicRock: true
    }
  },
  {
    id: 'hadal',
    name: 'Hadal Zone',
    minDepth: 28000,
    maxDepth: 36000,
    theme: {
      mood: 'discovery',
      time: 'eternal',
      keywords: ['exploration', 'achievement']
    },
    background: {
      gradient: 'linear-gradient(180deg, #000000 0%, #000000 100%)',
      skyColor: '#000000',
      waterColor: '#000000',
      visibility: 0.08,
      fog: 0.7,
      lightIntensity: 0
    },
    lighting: {
      type: 'artificial',
      color: '#FFFF00',
      intensity: 0.1,
      godRays: false,
      reflections: false,
      bloom: 0.25
    },
    particles: {
      bubbles: { count: 0, opacity: 0, speed: 0 },
      dust: { count: 0, opacity: 0, speed: 0 },
      plankton: { count: 20, opacity: 0.15, speed: 0.02 },
      marineSnow: { count: 150, opacity: 0.3, speed: 0.015 },
      sediment: { count: 50, opacity: 0.2, speed: 0.01 }
    },
    creatures: {
      amphipods: { count: 5, spawnRate: 0.025 },
      snailfish: { count: 2, spawnRate: 0.01 },
      seaCucumber: { count: 3, spawnRate: 0.015 },
      tinyShrimp: { count: 4, spawnRate: 0.02 },
      bacteriaColonies: { count: 8, spawnRate: 0.04 },
      giantSquid: { count: 0, spawnRate: 0.003 }
    },
    ambient: {
      oceanTrench: true,
      rockCliffs: true,
      denseFog: true
    },
    artificial: {
      researchDrone: true,
      autonomousROV: true,
      underwaterSensor: true,
      sonarPulse: true,
      researchBeacon: true
    }
  }
]

// Get zone by depth
export const getZoneByDepth = (depth) => {
  return OCEAN_ZONES.find(zone => depth >= zone.minDepth && depth <= zone.maxDepth) || OCEAN_ZONES[OCEAN_ZONES.length - 1]
}

// Get zone transition (for smooth transitions between zones)
export const getZoneTransition = (depth) => {
  const currentZone = getZoneByDepth(depth)
  const currentIndex = OCEAN_ZONES.findIndex(z => z.id === currentZone.id)
  const nextZone = OCEAN_ZONES[currentIndex + 1]
  
  if (!nextZone) return { currentZone, nextZone: null, progress: 0 }
  
  const zoneRange = currentZone.maxDepth - currentZone.minDepth
  const progress = Math.min(1, Math.max(0, (depth - currentZone.minDepth) / zoneRange))
  
  return {
    currentZone,
    nextZone,
    progress
  }
}
