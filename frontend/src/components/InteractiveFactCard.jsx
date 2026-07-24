import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getFactsByZone } from '../utils/oceanFacts'
import { ChevronDown } from 'lucide-react'

const InteractiveFactCard = ({ zoneId, depth }) => {
  const [expandedIndex, setExpandedIndex] = useState(null)
  const facts = getFactsByZone(zoneId)

  if (!facts || facts.length === 0) return null

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 px-4">
      <h3 className="text-2xl font-bold text-white mb-6 text-center font-heading tracking-tight">
        Discover the <span className="text-cyan-400 capitalize">{zoneId}</span> Zone
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {facts.map((fact, index) => {
          const isExpanded = expandedIndex === index
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="h-full flex flex-col"
            >
              <div
                className={`bg-[#061527]/85 backdrop-blur-xl rounded-2xl border transition-all duration-300 p-5 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.35)] flex flex-col justify-between h-full min-h-[140px] ${
                  isExpanded
                    ? 'border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                    : 'border-cyan-500/20 hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                }`}
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-bold text-cyan-400 font-heading tracking-wide">
                      {fact.title}
                    </h4>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-cyan-400 flex-shrink-0 ml-2 mt-0.5"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </div>

                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading whitespace-nowrap">
                      {fact.stat}
                    </span>
                    <span className="text-xs text-slate-300 font-medium leading-tight max-w-[160px]">
                      {fact.label}
                    </span>
                  </div>
                </div>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-200 text-sm leading-relaxed pt-4 border-t border-cyan-500/20 mt-4">
                        {fact.fact}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default InteractiveFactCard
