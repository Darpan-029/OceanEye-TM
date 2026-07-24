import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const DepthScrollbar = () => {
  const [currentDepth, setCurrentDepth] = useState(0)
  const maxDepth = 36000

  const oceanZones = [
    { name: 'Surface', id: 'surface', depth: 0, color: '#38bdf8' },
    { name: 'Sunlight', id: 'sunlight', depth: 2000, color: '#0284c7' },
    { name: 'Twilight', id: 'twilight', depth: 8000, color: '#6366f1' },
    { name: 'Midnight', id: 'midnight', depth: 15000, color: '#1e1b4b' },
    { name: 'Abyss', id: 'abyssal', depth: 22000, color: '#090d16' },
    { name: 'Hadal', id: 'hadal', depth: 28000, color: '#000000' }
  ]

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight
          const scrollPercentage = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0
          const depth = Math.floor(scrollPercentage * maxDepth)
          setCurrentDepth(depth)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToZone = (id) => {
    const el = document.getElementById(`zone-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const depthPercentage = Math.min(100, Math.max(0, (currentDepth / maxDepth) * 100))

  return (
    <div className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-50">
      <div className="bg-[#030d1a]/85 backdrop-blur-xl rounded-2xl p-4 border border-cyan-500/30 shadow-[0_0_25px_rgba(0,0,0,0.6)] flex flex-col items-center">
        <div className="text-cyan-400 text-[11px] font-mono tracking-widest font-bold mb-3">
          DEPTH
        </div>
        
        {/* Depth ruler track */}
        <div className="relative w-10 h-80 bg-slate-950/90 rounded-full border border-cyan-500/25 overflow-hidden shadow-inner">
          {/* Gradient fill bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-sky-300 via-cyan-400 to-blue-600 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
            style={{ height: `${depthPercentage}%` }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
          />
          
          {/* Zone markers */}
          {oceanZones.map((zone) => {
            const zonePercentage = (zone.depth / maxDepth) * 100
            return (
              <div
                key={zone.name}
                className="absolute left-0 right-0 flex items-center justify-center cursor-pointer group z-10"
                style={{ top: `${zonePercentage}%` }}
                onClick={() => scrollToZone(zone.id)}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full border border-white/60 group-hover:border-cyan-400 group-hover:scale-125 transition-all duration-200 shadow-sm"
                  style={{ backgroundColor: zone.color }}
                />
                {/* Tooltip */}
                <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900/95 border border-cyan-500/30 rounded-lg text-white text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
                  <span className="text-cyan-400 font-semibold">{zone.name}</span> - {zone.depth.toLocaleString()} ft
                </div>
              </div>
            )
          })}
          
          {/* Current depth indicator node */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
            style={{ top: `${depthPercentage}%` }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-4 h-4 bg-amber-400 border-2 border-white rounded-full shadow-[0_0_12px_#f59e0b]" />
          </motion.div>
        </div>
        
        {/* Current depth display footer */}
        <div className="mt-3 text-center">
          <div className="text-white font-mono text-lg font-extrabold tracking-tight">
            {currentDepth.toLocaleString()}
          </div>
          <div className="text-cyan-400 text-xs font-mono font-semibold">
            feet
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepthScrollbar
