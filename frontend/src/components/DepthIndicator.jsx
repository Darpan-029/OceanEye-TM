import { motion, useScroll, useTransform } from 'framer-motion'

const DepthIndicator = () => {
  const { scrollY } = useScroll()
  
  const depthMarkers = [
    { depth: 11000, label: '11,000' },
    { depth: 9000, label: '9,000' },
    { depth: 6000, label: '6,000' },
    { depth: 4000, label: '4,000' },
    { depth: 2000, label: '2,000' },
    { depth: 1000, label: '1,000' },
    { depth: 500, label: '500' },
    { depth: 200, label: '200' },
    { depth: 0, label: '0' },
  ]

  const currentDepth = useTransform(scrollY, [0, 5000], [0, 11000])
  const zoneName = useTransform(
    scrollY,
    [0, 1000, 2000, 3000, 4000, 5000],
    ['Surface', 'Sunlight Zone', 'Twilight Zone', 'Midnight Zone', 'Abyss', 'Mission Control']
  )

  return (
    <>
      {/* Desktop Depth Ruler */}
      <motion.div
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="bg-deep-ocean-navy/80 backdrop-blur-sm rounded-card p-5 border border-cyan-accent/20">
          <div className="text-cyan-accent font-heading text-xs mb-2 tracking-wider">
            DEPTH
          </div>
          <motion.div className="text-4xl font-bold text-white mb-1 font-heading">
            {useTransform(currentDepth, (v) => Math.round(v).toLocaleString())} ft
          </motion.div>
          <motion.div className="text-seafoam text-sm mb-4 font-body">
            {zoneName}
          </motion.div>
          
          <div className="relative h-64 w-12 bg-gradient-to-b from-cyan-accent/20 to-deep-ocean-navy rounded-full overflow-hidden">
            {/* Depth markers */}
            <div className="absolute inset-0 flex flex-col justify-between py-2">
              {depthMarkers.map((marker, index) => (
                <motion.div
                  key={marker.depth}
                  className="relative"
                  initial={{ opacity: 0.3 }}
                  animate={{
                    opacity: useTransform(
                      scrollY,
                      [(index - 1) * 625, index * 625, (index + 1) * 625],
                      [0.3, 1, 0.3]
                    ),
                    scale: useTransform(
                      scrollY,
                      [(index - 0.5) * 625, index * 625, (index + 0.5) * 625],
                      [1, 1.2, 1]
                    )
                  }}
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-cyan-accent rounded-full shadow-glow" />
                  <div className="absolute left-6 text-xs text-white/60 font-body">
                    {marker.label}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Current depth indicator line */}
            <motion.div
              className="absolute left-0 right-0 h-0.5 bg-cyan-accent shadow-glow"
              style={{
                top: useTransform(
                  scrollY,
                  [0, 5000],
                  ['95%', '5%']
                )
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Mobile Depth Pill */}
      <motion.div
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 lg:hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="bg-deep-ocean-navy/90 backdrop-blur-sm rounded-full px-5 py-3 border border-cyan-accent/30 shadow-glow">
          <div className="flex items-center gap-3">
            <div className="text-cyan-accent font-heading text-xs tracking-wider">
              DEPTH
            </div>
            <div className="h-4 w-px bg-cyan-accent/30" />
            <motion.div className="text-white font-heading font-bold">
              {useTransform(currentDepth, (v) => Math.round(v).toLocaleString())} ft
            </motion.div>
            <div className="h-4 w-px bg-cyan-accent/30" />
            <motion.div className="text-seafoam text-xs font-body">
              {zoneName}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default DepthIndicator
