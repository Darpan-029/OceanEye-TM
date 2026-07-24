import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getZoneByDepth } from '../utils/oceanZones'

const CREATURES = {
  surface: [
    { id: 'turtle', name: 'Sea Turtle', icon: '🐢' },
    { id: 'dolphin', name: 'Dolphin', icon: '🐬' },
    { id: 'seagull', name: 'Seagull', icon: '🐦' },
    { id: 'fish', name: 'Tropical Fish', icon: '🐠' }
  ],
  sunlight: [
    { id: 'clownfish', name: 'Clownfish', icon: '🐠' },
    { id: 'seahorse', name: 'Seahorse', icon: '🦀' },
    { id: 'starfish', name: 'Starfish', icon: '⭐' },
    { id: 'octopus', name: 'Octopus', icon: '🐙' }
  ],
  twilight: [
    { id: 'jellyfish', name: 'Jellyfish', icon: '🪼' },
    { id: 'squid', name: 'Squid', icon: '🦑' },
    { id: 'lanternfish', name: 'Lanternfish', icon: '🐟' },
    { id: 'hatchetfish', name: 'Hatchetfish', icon: '🐡' }
  ],
  midnight: [
    { id: 'anglerfish', name: 'Anglerfish', icon: '🐡' },
    { id: 'viperfish', name: 'Viperfish', icon: '🐟' },
    { id: 'gulper_eel', name: 'Gulper Eel', icon: '🐍' },
    { id: 'giant_squid', name: 'Giant Squid', icon: '🦑' }
  ],
  abyssal: [
    { id: 'dumbo_octopus', name: 'Dumbo Octopus', icon: '🐙' },
    { id: 'sea_pig', name: 'Sea Pig', icon: '🐖' },
    { id: 'isopod', name: 'Giant Isopod', icon: '🦐' },
    { id: 'tube_worm', name: 'Tube Worm', icon: '🪱' }
  ],
  hadal: [
    { id: 'snailfish', name: 'Hadal Snailfish', icon: '🐟' },
    { id: 'amphipod', name: 'Amphipod', icon: '🦐' },
    { id: 'drone', name: 'Research Drone', icon: '🤖' },
    { id: 'bacteria', name: 'Deep Bacteria', icon: '🦠' }
  ]
}

const CreatureDiscovery = ({ depth }) => {
  const [discoveredCreatures, setDiscoveredCreatures] = useState(() => {
    const saved = localStorage.getItem('oceanEye_discovered')
    const initial = saved ? JSON.parse(saved) : { turtle: true, dolphin: true, clownfish: true, jellyfish: true, squid: true, anglerfish: true, dumbo_octopus: true, snailfish: true }
    return initial
  })
  const [showNotification, setShowNotification] = useState(null)
  const zone = getZoneByDepth(depth)

  useEffect(() => {
    localStorage.setItem('oceanEye_discovered', JSON.stringify(discoveredCreatures))
  }, [discoveredCreatures])

  const discoverCreature = (creatureId) => {
    if (!discoveredCreatures[creatureId]) {
      setDiscoveredCreatures(prev => ({ ...prev, [creatureId]: true }))
      setShowNotification(creatureId)
      setTimeout(() => setShowNotification(null), 3000)
    }
  }

  const zoneCreatures = CREATURES[zone.id] || []
  const discoveredCount = Object.values(discoveredCreatures).filter(Boolean).length
  const totalCreatures = Object.values(CREATURES).flat().length

  return (
    <>
      {/* Discovery Panel - Right Sidebar */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="bg-[#040e1b]/85 backdrop-blur-xl rounded-2xl p-4 border border-cyan-500/30 shadow-[0_0_25px_rgba(0,0,0,0.6)] w-48">
          <div className="text-cyan-400 text-xs font-mono mb-1 text-center font-bold tracking-widest">
            CREATURES
          </div>
          
          <div className="text-slate-300 text-xs font-mono mb-3 text-center">
            {discoveredCount}/{totalCreatures} Discovered
          </div>

          <div className="grid grid-cols-2 gap-2">
            {zoneCreatures.map((creature) => {
              const isDiscovered = !!discoveredCreatures[creature.id]
              return (
                <motion.button
                  key={creature.id}
                  className={`p-3 rounded-xl text-2xl flex items-center justify-center transition-all duration-200 ${
                    isDiscovered
                      ? 'bg-cyan-500/20 border border-cyan-400/60 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                      : 'bg-slate-900/60 border border-slate-800 text-slate-500 hover:border-cyan-500/40 hover:text-slate-300'
                  }`}
                  onClick={() => discoverCreature(creature.id)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  title={creature.name}
                >
                  {isDiscovered ? creature.icon : '❓'}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Discovery Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 100 }}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 font-semibold"
          >
            <span className="text-2xl">🎉</span>
            <div>
              <div className="font-bold text-sm">New Discovery!</div>
              <div className="text-xs font-medium text-slate-900">
                {zoneCreatures.find(c => c.id === showNotification)?.name}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CreatureDiscovery
