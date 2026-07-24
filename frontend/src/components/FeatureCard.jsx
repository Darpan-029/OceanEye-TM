import { motion } from 'framer-motion'
import { Eye, Scan, Map, Plane, AlertTriangle, BarChart3 } from 'lucide-react'

const FeatureCard = ({ icon: Icon, title, description, delay = 0, depth = 0 }) => {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-card p-8 max-w-lg mx-auto border border-cyan-accent/20 shadow-soft"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(71, 181, 255, 0.2)" }}
    >
      <motion.div
        className="mb-6"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
      >
        <div className="w-16 h-16 bg-cyan-accent/20 rounded-2xl flex items-center justify-center">
          <Icon size={32} className="text-cyan-accent" />
        </div>
      </motion.div>
      
      <motion.h3
        className="font-heading text-2xl text-cyan-accent mb-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3 }}
      >
        {title}
      </motion.h3>
      
      <motion.p
        className="text-seafoam font-body leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.4 }}
      >
        {description}
      </motion.p>

      <motion.div
        className="mt-6 pt-6 border-t border-cyan-accent/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.5 }}
      >
        <div className="text-xs text-cyan-accent/60 font-heading tracking-wider">
          DEPTH: {depth.toLocaleString()} FT
        </div>
      </motion.div>
    </motion.div>
  )
}

const MarineCensusCard = () => (
  <FeatureCard
    icon={Eye}
    title="Marine Census"
    description="Monitor biodiversity and track marine species populations using AI-powered identification and real-time tracking systems."
    delay={0.2}
    depth={300}
  />
)

const VisionAICard = () => (
  <FeatureCard
    icon={Scan}
    title="VisionAI"
    description="Detect and track marine pollution in real-time using advanced computer vision and satellite imagery analysis."
    delay={0.2}
    depth={1200}
  />
)

const CoralScanCard = () => (
  <FeatureCard
    icon={Scan}
    title="CoralScan"
    description="Monitor coral reef health and bleaching events with high-resolution imaging and predictive health analytics."
    delay={0.2}
    depth={2500}
  />
)

const OceanAtlasCard = () => (
  <FeatureCard
    icon={Map}
    title="Ocean Atlas"
    description="Interactive intelligence mapping with real-time GIS visualization of ocean data, shipping routes, and protected zones."
    delay={0.2}
    depth={4500}
  />
)

const FleetMonitorCard = () => (
  <FeatureCard
    icon={Plane}
    title="Fleet Monitor"
    description="Coordinate autonomous underwater drones with real-time telemetry, mission planning, and fleet management systems."
    delay={0.2}
    depth={7000}
  />
)

const RiskEngineCard = () => (
  <FeatureCard
    icon={AlertTriangle}
    title="Risk Engine"
    description="Predict environmental threats before they occur using AI models trained on historical data and real-time sensor networks."
    delay={0.2}
    depth={10000}
  />
)

export {
  FeatureCard,
  MarineCensusCard,
  VisionAICard,
  CoralScanCard,
  OceanAtlasCard,
  FleetMonitorCard,
  RiskEngineCard
}
