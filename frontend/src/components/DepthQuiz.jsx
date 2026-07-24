import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getZoneByDepth } from '../utils/oceanZones'

const QUIZZES = {
  surface: [
    {
      question: "What percentage of Earth's surface is covered by oceans?",
      options: ["50%", "71%", "85%", "95%"],
      correct: 1,
      explanation: "Oceans cover 71% of Earth's surface and contain 97% of all water on our planet."
    },
    {
      question: "How many known species live in the ocean?",
      options: ["50,000", "100,000", "230,000", "500,000"],
      correct: 2,
      explanation: "Over 230,000 known species live in the ocean, with millions more yet to be discovered."
    }
  ],
  sunlight: [
    {
      question: "What percentage of marine species live in coral reefs?",
      options: ["10%", "25%", "50%", "75%"],
      correct: 1,
      explanation: "Coral reefs cover less than 1% of the ocean floor but support 25% of all marine species."
    },
    {
      question: "How many people depend on seafood as their primary protein source?",
      options: ["1 billion", "2 billion", "3 billion", "4 billion"],
      correct: 2,
      explanation: "Over 3 billion people depend on seafood as their primary source of protein."
    }
  ],
  twilight: [
    {
      question: "What percentage of deep-sea creatures are bioluminescent?",
      options: ["25%", "50%", "75%", "95%"],
      correct: 2,
      explanation: "Over 75% of deep-sea creatures are bioluminescent, using light for communication and hunting."
    },
    {
      question: "How long can marine snow take to fall to the abyssal zone?",
      options: ["10 years", "50 years", "100+ years", "500 years"],
      correct: 2,
      explanation: "Marine snow particles can take over 100 years to fall from surface waters to the deep ocean."
    }
  ],
  midnight: [
    {
      question: "How much greater is the pressure in the midnight zone compared to surface?",
      options: ["50x", "100x", "200x", "500x"],
      correct: 2,
      explanation: "Pressure in the midnight zone can be 200 times greater than at the surface."
    },
    {
      question: "What percentage of ocean species are yet to be discovered?",
      options: ["50%", "70%", "91%", "99%"],
      correct: 2,
      explanation: "Scientists estimate that 91% of ocean species have yet to be discovered."
    }
  ],
  abyssal: [
    {
      question: "What is the temperature of water from hydrothermal vents?",
      options: ["100°F", "300°F", "500°F", "750°F"],
      correct: 3,
      explanation: "Hydrothermal vents spew mineral-rich water at temperatures up to 750°F."
    },
    {
      question: "What is the estimated value of minerals on the abyssal plain?",
      options: ["$1 billion", "$100 billion", "$1 trillion", "$16 trillion"],
      correct: 3,
      explanation: "The abyssal plain contains valuable minerals potentially worth trillions of dollars."
    }
  ],
  hadal: [
    {
      question: "How deep is the Mariana Trench?",
      options: ["20,000 ft", "26,000 ft", "36,000 ft", "40,000 ft"],
      correct: 2,
      explanation: "The Mariana Trench reaches depths of 36,000 feet, deeper than Mount Everest is tall."
    },
    {
      question: "What percentage of the world's oceans have been explored?",
      options: ["5%", "15%", "25%", "50%"],
      correct: 0,
      explanation: "Less than 5% of the world's oceans have been explored, making it Earth's last frontier."
    }
  ]
}

const DepthQuiz = ({ depth }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('oceanEye_quizScore')
    return saved ? parseInt(saved) : 0
  })
  const [completed, setCompleted] = useState(false)
  const zone = getZoneByDepth(depth)
  const quizzes = QUIZZES[zone.id] || []

  useEffect(() => {
    localStorage.setItem('oceanEye_quizScore', score.toString())
  }, [score])

  const handleAnswer = (index) => {
    setSelectedAnswer(index)
    setShowExplanation(true)
    
    if (index === quizzes[currentQuestion].correct) {
      setScore(prev => prev + 10)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < quizzes.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setCompleted(false)
  }

  if (quizzes.length === 0) return null

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-cyan-accent/20 max-w-md mx-auto"
      >
        <h3 className="text-2xl font-bold text-cyan-accent mb-4 text-center">Quiz Complete!</h3>
        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-white mb-2">{score}</div>
          <div className="text-white/70">Total Points</div>
        </div>
        <motion.button
          onClick={resetQuiz}
          className="w-full px-6 py-3 bg-cyan-accent hover:bg-cyan-accent/90 text-deep-ocean-navy font-semibold rounded-button transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      </motion.div>
    )
  }

  const quiz = quizzes[currentQuestion]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-cyan-accent/20 max-w-md mx-auto"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-cyan-accent">Ocean Quiz</h3>
        <div className="text-white/70 text-sm">
          {currentQuestion + 1}/{quizzes.length}
        </div>
      </div>

      <div className="text-white mb-4">
        {quiz.question}
      </div>

      <div className="space-y-2 mb-4">
        {quiz.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => !showExplanation && handleAnswer(index)}
            disabled={showExplanation}
            className={`w-full p-3 rounded-lg text-left transition-all ${
              selectedAnswer === null
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : index === quiz.correct
                ? 'bg-green-500/30 border border-green-500 text-white'
                : selectedAnswer === index
                ? 'bg-red-500/30 border border-red-500 text-white'
                : 'bg-white/5 text-white/50'
            }`}
            whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
            whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
          >
            {option}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 bg-cyan-accent/10 rounded-lg mb-4">
              <p className="text-cyan-accent text-sm">{quiz.explanation}</p>
            </div>
            <motion.button
              onClick={nextQuestion}
              className="w-full px-6 py-3 bg-cyan-accent hover:bg-cyan-accent/90 text-deep-ocean-navy font-semibold rounded-button transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentQuestion < quizzes.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default DepthQuiz
