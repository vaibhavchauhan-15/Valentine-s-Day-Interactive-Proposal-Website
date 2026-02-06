import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const DateOptionsScreen = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [showAnimation, setShowAnimation] = useState(false)
  const [animationType, setAnimationType] = useState(null)
  
  // State for tracking position and attempts for non-dinner options
  const [buttonPositions, setButtonPositions] = useState({
    movie: { x: 0, y: 0 },
    drive: { x: 0, y: 0 },
    camping: { x: 0, y: 0 }
  })
  const [buttonAttempts, setButtonAttempts] = useState({
    movie: 0,
    drive: 0,
    camping: 0
  })

  const options = [
    {
      id: 'movie',
      title: '🎬 Romantic Movie Date',
      gradient: 'from-purple-500 to-pink-500',
      message: "Let's find the perfect movie together! 🍿",
      isClickable: false,
    },
    {
      id: 'dinner',
      title: '🍽️ Romantic Dinner Date',
      gradient: 'from-red-500 to-rose-500',
      message: 'Table booked for two! 🕯️',
      isClickable: true,
    },
    {
      id: 'drive',
      title: '🚗 Romantic Long Drive',
      gradient: 'from-blue-500 to-cyan-500',
      message: 'Road trip with you sounds perfect! 🛣️',
      isClickable: false,
    },
    {
      id: 'camping',
      title: '⛺ Romantic Camping Date',
      gradient: 'from-green-500 to-teal-500',
      message: 'Under the stars, just us! ✨',
      isClickable: false,
    },
  ]

  const cuteMessages = [
    "Oops! Not that one! 🙈",
    "Hmm, try again! 🤔",
    "The dinner date is perfect! 💭",
    "Only the dinner is available! 😊",
    "Nice try, but no! 🌟",
    "Keep looking for the right one! 💫",
    "Almost, but not quite! 💕",
    "You know which one to pick! ✨",
    "The button escaped! 🏃",
    "So close, yet so far! 💝",
  ]

  const handleNonClickableHover = (optionId) => {
    // Increase movement range with each attempt to make it progressively harder
    const baseRange = 180
    const multiplier = 1 + (buttonAttempts[optionId] * 0.5)
    const range = baseRange * multiplier
    
    // Calculate random position, ensuring it moves significantly
    const angle = Math.random() * Math.PI * 2
    const distance = range * (0.5 + Math.random() * 0.5) // At least 50% of max range
    
    const randomX = Math.cos(angle) * distance
    const randomY = Math.sin(angle) * distance
    
    setButtonPositions(prev => ({
      ...prev,
      [optionId]: { x: randomX, y: randomY }
    }))
    
    setButtonAttempts(prev => ({
      ...prev,
      [optionId]: prev[optionId] + 1
    }))
  }

  const handleOptionClick = (option) => {
    if (!option.isClickable) {
      handleNonClickableHover(option.id)
      return
    }
    
    setSelectedOption(option.id)
    setAnimationType(option.id)
    setShowAnimation(true)
    
    setTimeout(() => {
      onSelect(option.id)
    }, 2500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4 py-8"
      style={{ willChange: 'opacity, transform' }}
    >
      {/* Animations for different options */}
      <AnimatePresence>
        {showAnimation && animationType === 'dinner' && (
          <div className="fixed inset-0 z-40 pointer-events-none">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl sm:text-3xl md:text-4xl drop-shadow-lg"
                style={{
                  left: '50%',
                  top: '50%',
                  willChange: 'transform, opacity',
                  transform: 'translate3d(0,0,0)',
                }}
                initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1.1, 0.8],
                  x: (Math.random() - 0.5) * (typeof window !== 'undefined' && window.innerWidth < 640 ? 500 : 900),
                  y: Math.random() * -500 - 150,
                  rotate: Math.random() * 720 - 360,
                  opacity: [0, 1, 0.8, 0],
                }}
                transition={{
                  duration: 2.2,
                  delay: i * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {['❤️', '💕', '💖', '💗'][i % 4]}
              </motion.div>
            ))}
            
            {/* Table booking tick with enhanced animation */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: [0, 1.4, 1], rotate: 0 }}
              transition={{ delay: 0.8, duration: 0.5, type: "spring", stiffness: 200 }}
              style={{ willChange: 'transform' }}
            >
              <div className="bg-white rounded-full p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-pink-200/50 to-valentine-red/20"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ willChange: 'transform, opacity' }}
                />
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10"
                >
                  <motion.path
                    d="M20 50 L40 70 L80 30"
                    stroke="#FF4D6D"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.3, duration: 0.5, ease: "easeOut" }}
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        )}

        {showAnimation && animationType === 'drive' && (
          <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-1/2 text-5xl sm:text-6xl md:text-8xl"
              initial={{ x: -200, y: 0 }}
              animate={{ x: typeof window !== 'undefined' ? window.innerWidth + 200 : 1200, y: 0 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            >
              🚗💨
            </motion.div>
            
            {/* Road lines */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 sm:h-2 bg-white"
                style={{
                  top: `${50 + i * 3}%`,
                  width: '100px',
                }}
                initial={{ x: typeof window !== 'undefined' ? window.innerWidth : 1200 }}
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
              <div className="text-6xl sm:text-7xl md:text-9xl">🎬</div>
            </motion.div>
            
            {/* Popcorn falling */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl sm:text-3xl md:text-4xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: -50,
                }}
                animate={{
                  y: typeof window !== 'undefined' ? window.innerHeight + 100 : 900,
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
        className="glass-morphism rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl max-w-2xl w-full relative overflow-hidden"
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ 
          type: 'spring', 
          stiffness: 100,
          delay: 0.2
        }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 shimmer opacity-20"
          animate={{
            backgroundPosition: ['-200% 0', '200% 0'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <motion.h1
          className="text-2xl md:text-4xl font-romantic text-center text-valentine-red mb-6 md:mb-8 text-shadow-romantic relative z-10"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          What would you like for Valentine's Day? 💖
        </motion.h1>

        {/* Cute message display for non-clickable options */}
        <AnimatePresence mode="wait">
          {(buttonAttempts.movie > 0 || buttonAttempts.drive > 0 || buttonAttempts.camping > 0) && (
            <motion.p
              key={Math.max(buttonAttempts.movie, buttonAttempts.drive, buttonAttempts.camping)}
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="text-center text-base md:text-lg text-valentine-red mb-4 md:mb-6 font-semibold px-4 relative z-10"
            >
              {cuteMessages[Math.min(
                Math.max(buttonAttempts.movie, buttonAttempts.drive, buttonAttempts.camping) - 1,
                cuteMessages.length - 1
              )]}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 relative min-h-[320px] overflow-visible">
          {options.map((option, index) => (
            <motion.button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => !option.isClickable && handleNonClickableHover(option.id)}
              onTouchStart={(e) => {
                if (!option.isClickable) {
                  e.preventDefault()
                  handleNonClickableHover(option.id)
                }
              }}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={
                !option.isClickable 
                  ? { 
                      opacity: 1,
                      scale: 1,
                      x: buttonPositions[option.id].x,
                      y: buttonPositions[option.id].y,
                      zIndex: 50
                    }
                  : { 
                      opacity: 1,
                      scale: 1,
                      x: 0,
                      y: 0,
                      zIndex: 10
                    }
              }
              transition={
                !option.isClickable 
                  ? { 
                      opacity: { delay: index * 0.15 },
                      scale: { delay: index * 0.15 },
                      x: { type: 'spring', stiffness: 250, damping: 15 },
                      y: { type: 'spring', stiffness: 250, damping: 15 }
                    }
                  : { 
                      delay: index * 0.15,
                      type: 'spring',
                      stiffness: 100
                    }
              }
              whileHover={option.isClickable ? { scale: 1.06, y: -8, rotate: [0, -1, 1, 0] } : {}}
              whileTap={option.isClickable ? { scale: 0.94 } : {}}
              disabled={selectedOption !== null && option.isClickable}
              className={`relative bg-gradient-to-br ${option.gradient} text-white p-4 md:p-6 rounded-xl md:rounded-2xl text-base md:text-lg font-bold shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
                selectedOption !== null && option.isClickable ? 'opacity-50 cursor-not-allowed' : ''
              } ${!option.isClickable ? 'cursor-pointer' : ''}`}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={option.isClickable ? {
                  x: ['-200%', '200%'],
                } : {}}
                transition={option.isClickable ? {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1,
                } : {}}
              />
              
              <div className="flex flex-col items-center gap-2 relative z-10">
                <span className="text-lg md:text-xl font-extrabold drop-shadow-lg">{option.title}</span>
                {selectedOption === option.id && option.isClickable && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="text-xs md:text-sm font-medium"
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
