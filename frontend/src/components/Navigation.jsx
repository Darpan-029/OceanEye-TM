import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Menu, X, Waves, Anchor, Compass } from 'lucide-react'
import AudioToggle from './AudioToggle'
import { getZoneByDepth } from '../utils/oceanZones'

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentDepth, setCurrentDepth] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40)
          
          const scrollY = window.scrollY
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight
          const scrollPercentage = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0
          const depth = Math.floor(scrollPercentage * 36000)
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

  const zoneObj = getZoneByDepth(currentDepth)
  const currentZone = zoneObj ? zoneObj.name : 'Surface'

  const navItems = [
    { name: 'Surface', icon: <Waves size={15} />, id: 'surface' },
    { name: 'Sunlight', icon: <Compass size={15} />, id: 'sunlight' },
    { name: 'Twilight', icon: <Anchor size={15} />, id: 'twilight' },
    { name: 'Midnight', icon: <Waves size={15} />, id: 'midnight' },
    { name: 'Abyssal', icon: <Anchor size={15} />, id: 'abyssal' },
    { name: 'Hadal', icon: <Compass size={15} />, id: 'hadal' },
  ]

  const scrollToZone = (id) => {
    const el = document.getElementById(`zone-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#030c18]/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg' : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand - Links to Surface / top on Landing Page */}
          <motion.div
            className="flex-shrink-0 cursor-pointer flex items-center gap-2.5 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            title="OceanEye - Surface"
          >
            <img 
              src="/logo.png" 
              alt="OceanEye Logo" 
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" 
            />
            <span className="font-heading text-2xl font-bold text-white tracking-tight whitespace-nowrap">
              Ocean<span className="text-cyan-400">Eye</span>
            </span>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1.5 bg-slate-950/50 p-1.5 rounded-2xl border border-cyan-500/20 backdrop-blur-md flex-shrink-0">
            {navItems.map((item) => {
              const isActive = currentZone.toLowerCase() === item.name.toLowerCase()
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToZone(item.id)}
                  className={`px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              )
            })}
            <div className="w-px h-5 bg-slate-700/50 mx-1.5 flex-shrink-0" />
            <button
              onClick={() => navigate('/mission-control')}
              className="px-4 py-1.5 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-bold text-sm rounded-xl transition-all duration-300 shadow-[0_0_18px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:-translate-y-0.5 whitespace-nowrap flex-shrink-0"
            >
              Launch Mission
            </button>
          </div>

          {/* Right Header Controls (Sound + Depth Pill) */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <AudioToggle depth={currentDepth} />
            <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-500/30 shadow-[0_0_15px_rgba(0,0,0,0.4)] whitespace-nowrap flex-shrink-0 min-w-[140px] justify-center">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee] flex-shrink-0" />
              <span className="text-white text-xs font-mono font-bold whitespace-nowrap">
                {currentDepth.toLocaleString()} ft
              </span>
              <span className="text-cyan-400 text-xs font-bold font-mono whitespace-nowrap">
                {currentZone}
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2 flex-shrink-0">
            <AudioToggle depth={currentDepth} />
            <div className="bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-cyan-500/30 whitespace-nowrap">
              <span className="text-cyan-400 text-xs font-mono font-bold">
                {currentDepth.toLocaleString()} ft
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#030c18]/95 backdrop-blur-xl border-t border-cyan-500/20"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = currentZone.toLowerCase() === item.name.toLowerCase()
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      scrollToZone(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/40 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.icon}
                    <span className="font-semibold">{item.name}</span>
                    <span className="ml-auto text-xs text-slate-400 font-mono">
                      {item.depth?.toLocaleString()} ft
                    </span>
                  </button>
                )
              })}
              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    navigate('/mission-control')
                    setMobileMenuOpen(false)
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold rounded-xl shadow-lg"
                >
                  Launch Mission
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navigation
