import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import DepthScrollbar from '../components/DepthScrollbar'
import OceanLayers from '../components/OceanLayers'
import { MarineCensusCard, VisionAICard, CoralScanCard, OceanAtlasCard } from '../components/FeatureCard'
import { OCEAN_ZONES } from '../utils/oceanZones'
import InteractiveFactCard from '../components/InteractiveFactCard'
import CreatureDiscovery from '../components/CreatureDiscovery'
import DepthQuiz from '../components/DepthQuiz'
import Footer from '../components/common/Footer'

const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Light reflections */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-b from-yellow-200/20 to-transparent blur-xl"
            style={{
              width: 100 + Math.random() * 150,
              height: 300,
              left: 20 + Math.random() * 60,
              top: -100
            }}
            animate={{
              y: [-100, 400],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8 flex flex-col items-center"
        >
          <img 
            src="/logo.png" 
            alt="OceanEye Logo" 
            className="w-32 h-32 md:w-40 md:h-40 object-contain mb-6" 
          />
          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4 tracking-tight">
            Ocean<span className="text-cyan-400">Eye</span>
          </h1>
          <p className="font-body text-xl md:text-2xl lg:text-3xl text-white font-light mb-3 tracking-wide">
            Eyes Beneath the Waves
          </p>
          <p className="font-body text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            AI-powered marine intelligence for monitoring pollution, coral reefs, biodiversity, and environmental risks
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            onClick={() => navigate('/mission-control')}
            className="px-8 py-4 bg-gradient-to-r from-ocean-cyan to-ocean-blue hover:from-ocean-mint hover:to-ocean-cyan text-ocean-darkest font-semibold rounded-button transition-all duration-300 shadow-glow-cyan"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Launch Mission
          </motion.button>
          <motion.button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="px-8 py-4 bg-transparent border-2 border-ocean-cyan/60 text-ocean-cyan font-semibold rounded-button transition-all duration-300 hover:bg-ocean-cyan/10 hover:border-ocean-cyan"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore the Ocean
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/70"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

const LoadingSequence = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 1
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 flex flex-col items-center"
        >
          <img 
            src="/logo.png" 
            alt="OceanEye Logo" 
            className="w-24 h-24 object-contain mb-4" 
          />
          <h1 className="font-heading text-5xl md:text-6xl font-semibold text-white tracking-tight mb-3">
            Ocean<span className="text-cyan-400">Eye</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/50 text-sm font-light tracking-wide"
          >
            Eyes Beneath the Waves
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-48 mx-auto mb-4">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/50 text-sm font-light tracking-wide"
        >
          Loading
        </motion.p>
      </div>
    </div>
  )
}

const LandingPage = () => {
  const [loading, setLoading] = useState(true)
  const [currentDepth, setCurrentDepth] = useState(0)
  const [activeTab, setActiveTab] = useState('facts')
  const navigate = useNavigate()

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const windowHeight = window.innerHeight
          
          // Calculate depth based on scroll position
          const maxScroll = document.body.scrollHeight - windowHeight
          const scrollPercentage = maxScroll > 0 ? scrollY / maxScroll : 0
          const depth = Math.floor(scrollPercentage * 36000)
          setCurrentDepth(depth)
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getZoneId = () => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    const sectionIndex = Math.round(scrollY / windowHeight)
    
    const zones = ['surface', 'sunlight', 'twilight', 'midnight', 'abyssal', 'hadal']
    return zones[Math.min(sectionIndex, zones.length - 1)]
  }

  const currentZone = getZoneId()

  const zoneFeatures = {
    sunlight: [
      { name: 'Marine Species Tracking', icon: '🐟', description: 'Monitor biodiversity in real-time' },
      { name: 'Coral Health Index', icon: '🪸', description: 'Assess reef ecosystem health' }
    ],
    twilight: [
      { name: 'Pollution Detection', icon: '💧', description: 'Identify contamination hotspots' },
      { name: 'Environmental Risk Analysis', icon: '⚠️', description: 'Predict ecological threats' }
    ],
    midnight: [
      { name: 'Deep Sea Drones', icon: '🤖', description: 'Autonomous underwater exploration' },
      { name: 'Environmental Monitoring', icon: '📊', description: 'Track deep ocean conditions' }
    ],
    abyssal: [
      { name: 'Active Drone Fleet', icon: '🚁', description: 'Coordinate deep exploration' },
      { name: 'Water Quality Analysis', icon: '🧪', description: 'Measure chemical composition' }
    ],
    hadal: [
      { name: 'Extreme Environment Monitoring', icon: '🌡️', description: 'Track pressure and temperature' },
      { name: 'Autonomous Operations', icon: '⚙️', description: 'Self-sustaining research systems' }
    ]
  }

  const FeatureCard = ({ feature, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-cyan-accent/20 hover:border-cyan-accent/50 transition-all duration-300 cursor-pointer group"
      onClick={() => navigate('/mission-control')}
    >
      <div className="text-4xl mb-4">{feature.icon}</div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-accent transition-colors">
        {feature.name}
      </h3>
      <p className="text-white/70 text-sm mb-4">{feature.description}</p>
      <div className="flex items-center text-cyan-accent text-sm font-semibold">
        <span>Explore in Mission Control</span>
        <motion.span
          className="ml-2"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          →
        </motion.span>
      </div>
    </motion.div>
  )

  return (
    <AnimatePresence>
      {loading && (
        <LoadingSequence key="loading" onComplete={() => setLoading(false)} />
      )}
      {!loading && (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <Navigation />
          <DepthScrollbar />
          <CreatureDiscovery depth={currentDepth} />
          
          {/* Continuous Ocean Background - Fixed */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <OceanLayers depth={currentDepth} />
          </div>
          
          {/* Surface Zone (0-30ft) */}
          <div id="zone-surface" className="min-h-screen relative z-10">
            <HeroSection />
          </div>
          
          {/* Sunlight Zone (30-650ft) */}
          <div id="zone-sunlight" className="min-h-screen relative z-10 flex items-center justify-center">
            <div className="w-full px-4">
              <div className="text-center mb-8">
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Sunlight Zone
                </h2>
                <p className="text-lg md:text-xl text-cyan-accent">30 - 650 ft</p>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="bg-black/40 backdrop-blur-md rounded-full p-1 border border-cyan-accent/20">
                  {['facts', 'quiz', 'features'].map((tab) => (
                    <motion.button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                        activeTab === tab
                          ? 'bg-cyan-accent text-deep-ocean-navy'
                          : 'text-white/70 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tab === 'facts' ? '📚 Facts' : tab === 'quiz' ? '🧠 Quiz' : '⚡ Features'}
                    </motion.button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'facts' && (
                  <motion.div
                    key="facts"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <InteractiveFactCard zoneId="sunlight" depth={currentDepth} />
                  </motion.div>
                )}
                {activeTab === 'quiz' && (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <DepthQuiz depth={currentDepth} />
                  </motion.div>
                )}
                {activeTab === 'features' && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {zoneFeatures.sunlight.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Twilight Zone (650-3300ft) */}
          <div id="zone-twilight" className="min-h-screen relative z-10 flex items-center justify-center">
            <div className="w-full px-4">
              <div className="text-center mb-8">
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Twilight Zone
                </h2>
                <p className="text-lg md:text-xl text-cyan-accent">650 - 3,300 ft</p>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="bg-black/40 backdrop-blur-md rounded-full p-1 border border-cyan-accent/20">
                  {['facts', 'quiz', 'features'].map((tab) => (
                    <motion.button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                        activeTab === tab
                          ? 'bg-cyan-accent text-deep-ocean-navy'
                          : 'text-white/70 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tab === 'facts' ? '📚 Facts' : tab === 'quiz' ? '🧠 Quiz' : '⚡ Features'}
                    </motion.button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'facts' && (
                  <motion.div
                    key="facts"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <InteractiveFactCard zoneId="twilight" depth={currentDepth} />
                  </motion.div>
                )}
                {activeTab === 'quiz' && (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <DepthQuiz depth={currentDepth} />
                  </motion.div>
                )}
                {activeTab === 'features' && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {zoneFeatures.twilight.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Midnight Zone (3300-13000ft) */}
          <div id="zone-midnight" className="min-h-screen relative z-10 flex items-center justify-center">
            <div className="w-full px-4">
              <div className="text-center mb-8">
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Midnight Zone
                </h2>
                <p className="text-lg md:text-xl text-cyan-accent">3,300 - 13,000 ft</p>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="bg-black/40 backdrop-blur-md rounded-full p-1 border border-cyan-accent/20">
                  {['facts', 'quiz', 'features'].map((tab) => (
                    <motion.button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                        activeTab === tab
                          ? 'bg-cyan-accent text-deep-ocean-navy'
                          : 'text-white/70 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tab === 'facts' ? '📚 Facts' : tab === 'quiz' ? '🧠 Quiz' : '⚡ Features'}
                    </motion.button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'facts' && (
                  <motion.div
                    key="facts"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <InteractiveFactCard zoneId="midnight" depth={currentDepth} />
                  </motion.div>
                )}
                {activeTab === 'quiz' && (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <DepthQuiz depth={currentDepth} />
                  </motion.div>
                )}
                {activeTab === 'features' && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {zoneFeatures.midnight.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Abyssal Zone (13000-20000ft) */}
          <div id="zone-abyssal" className="min-h-screen relative z-10 flex items-center justify-center">
            <div className="w-full px-4">
              <div className="text-center mb-8">
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Abyssal Zone
                </h2>
                <p className="text-lg md:text-xl text-cyan-accent">13,000 - 20,000 ft</p>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="bg-black/40 backdrop-blur-md rounded-full p-1 border border-cyan-accent/20">
                  {['facts', 'quiz', 'features'].map((tab) => (
                    <motion.button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                        activeTab === tab
                          ? 'bg-cyan-accent text-deep-ocean-navy'
                          : 'text-white/70 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tab === 'facts' ? '📚 Facts' : tab === 'quiz' ? '🧠 Quiz' : '⚡ Features'}
                    </motion.button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'facts' && (
                  <motion.div
                    key="facts"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <InteractiveFactCard zoneId="abyssal" depth={currentDepth} />
                  </motion.div>
                )}
                {activeTab === 'quiz' && (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <DepthQuiz depth={currentDepth} />
                  </motion.div>
                )}
                {activeTab === 'features' && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {zoneFeatures.abyssal.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Hadal Zone (20000-36000ft) */}
          <div id="zone-hadal" className="min-h-screen relative z-10 flex items-center justify-center">
            <div className="w-full px-4">
              <div className="text-center mb-8">
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Hadal Zone
                </h2>
                <p className="text-lg md:text-xl text-cyan-accent">20,000 - 36,000 ft</p>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="bg-black/40 backdrop-blur-md rounded-full p-1 border border-cyan-accent/20">
                  {['facts', 'quiz', 'features'].map((tab) => (
                    <motion.button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                        activeTab === tab
                          ? 'bg-cyan-accent text-deep-ocean-navy'
                          : 'text-white/70 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tab === 'facts' ? '📚 Facts' : tab === 'quiz' ? '🧠 Quiz' : '⚡ Features'}
                    </motion.button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'facts' && (
                  <motion.div
                    key="facts"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <InteractiveFactCard zoneId="hadal" depth={currentDepth} />
                  </motion.div>
                )}
                {activeTab === 'quiz' && (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <DepthQuiz depth={currentDepth} />
                  </motion.div>
                )}
                {activeTab === 'features' && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {zoneFeatures.hadal.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Mission Control Reveal */}
          <div className="min-h-screen relative z-10 bg-black flex items-center justify-center py-20 px-6">
            <div className="text-center max-w-2xl lg:max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                The deeper we explore, the more we understand.
              </h2>
              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-8 font-medium">
                Begin your mission with OceanEye's advanced marine intelligence platform.
              </p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => navigate('/mission-control')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Launch Mission Control
              </motion.button>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10">
            <Footer />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { LandingPage }
export default LandingPage
