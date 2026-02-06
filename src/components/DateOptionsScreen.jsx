import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const DateOptionsScreen = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [showAnimation, setShowAnimation] = useState(false)
  const [animationType, setAnimationType] = useState(null)

  const options = [
    {
      id: 'movie',
      title: '🎬 Romantic Movie Date',
      gradient: 'from-purple-500 to-pink-500',
      message: "Let's find the perfect movie together! 🍿",
    },
    {
      id: 'dinner',
      title: '🍽️ Romantic Dinner Date',
      gradient: 'from-red-500 to-rose-500',
      message: 'Table booked for two! 🕯️',
    },
    {
      id: 'drive',
      title: '🚗 Romantic Long Drive',
      gradient: 'from-blue-500 to-cyan-500',
      message: 'Road trip with you sounds perfect! 🛣️',
    },
    {
      id: 'camping',
      title: '⛺ Romantic Camping Date',
      gradient: 'from-green-500 to-teal-500',
      message: 'Under the stars, just us! ✨',
    },
  ]

  const handleOptionClick = (option) => {
    setSelectedOption(option.id)
    setAnimationType(option.id)
    setShowAnimation(true)
    
    setTimeout(() => {
      onSelect(option.id)
    }, 2500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4 py-8"
    >
      {/* Animations for different options */}
      <AnimatePresence>
        {showAnimation && animationType === 'dinner' && (
          <div className="fixed inset-0 z-40 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0.8],
                  x: (Math.random() - 0.5) * 800,
                  y: Math.random() * -600 - 100,
                  rotate: Math.random() * 360,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.05,
                  ease: 'easeOut',
                }}
              >
                ❤️
              </motion.div>
            ))}
            
            {/* Table booking tick */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="bg-white rounded-full p-8 shadow-2xl">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M20 50 L40 70 L80 30"
                    stroke="#FF4D6D"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        )}

        {showAnimation && animationType === 'drive' && (
          <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-1/2 text-8xl"
              initial={{ x: -200, y: 0 }}
              animate={{ x: window.innerWidth + 200, y: 0 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            >
              🚗💨
            </motion.div>
            
            {/* Road lines */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 bg-white"
                style={{
                  top: `${50 + i * 3}%`,
                  width: '150px',
                }}
                initial={{ x: window.innerWidth }}
                animate={{ x: -200 }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  repeat: 2,
                  ease: 'linear',
                }}
              />
            ))}
          </div>
        )}

        {showAnimation && animationType === 'camping' && (
          <div className="fixed inset-0 z-40 pointer-events-none">
            {/* Tent animation */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50 L150 150 L50 150 Z"
                  fill="#8B4513"
                  stroke="#654321"
                  strokeWidth="3"
                />
                <path
                  d="M100 50 L100 150"
                  stroke="#654321"
                  strokeWidth="2"
                />
              </svg>
            </motion.div>

            {/* Twinkling stars */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              >
                ⭐
              </motion.div>
            ))}
          </div>
        )}

        {showAnimation && animationType === 'movie' && (
          <div className="fixed inset-0 z-40 pointer-events-none">
            {/* Movie reel animation */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 1.2, 1], rotate: 360 }}
              transition={{ duration: 1.5 }}
            >
              <div className="text-9xl">🎬</div>
            </motion.div>
            
            {/* Popcorn falling */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: -50,
                }}
                animate={{
                  y: window.innerHeight + 100,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: 'easeIn',
                }}
              >
                🍿
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        className="glass-morphism rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl w-full"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <motion.h1
          className="text-3xl md:text-5xl font-romantic text-center text-valentine-red mb-8 text-shadow-romantic"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          What would you like for Valentine's Day? 💖
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {options.map((option, index) => (
            <motion.button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              disabled={selectedOption !== null}
              className={`bg-gradient-to-r ${option.gradient} text-white p-6 rounded-2xl text-lg md:text-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="flex flex-col items-center gap-3">
                <span className="text-2xl md:text-3xl">{option.title}</span>
                {selectedOption === option.id && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm md:text-base"
                  >
                    {option.message}
                  </motion.p>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DateOptionsScreen
