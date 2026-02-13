import { motion, AnimatePresence } from 'framer-motion'
import { useState, memo } from 'react'

const DateOptionsScreen = memo(({ onSelect }) => {
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
      title: 'Romantic Movie Date',
      icon: '/icons/movie-icon.png',
      description: 'Cozy up with popcorn and your favorite films',
      gradient: 'from-purple-500 to-pink-500',
      message: "Let's find the perfect movie together! 🍿",
      isClickable: false,
    },
    {
      id: 'dinner',
      title: 'Romantic Dinner Date',
      icon: '/icons/dinner-icon.png',
      description: 'Candlelit dining with exquisite cuisine',
      gradient: 'from-deep-rose to-elegant-maroon',
      message: 'Table booked for two! 🕯️',
      isClickable: true,
    },
    {
      id: 'drive',
      title: 'Romantic Long Drive',
      icon: '/icons/drive-icon.png',
      description: 'Scenic routes with endless conversations',
      gradient: 'from-blue-500 to-cyan-500',
      message: 'Road trip with you sounds perfect! 🛣️',
      isClickable: false,
    },
    {
      id: 'camping',
      title: 'Romantic Camping Date',
      icon: '/icons/camping-icon.png',
      description: 'Stargazing under the moonlight',
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
          <motion.div 
            className="fixed inset-0 z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <img 
              src="/animation/Dinner Animation.gif" 
              alt="Romantic Dinner" 
              className="w-full h-full object-cover"
            />
          </motion.div>
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

      {/* Main Content - Enhanced with ornate romantic styling */}
      <motion.div
        className="glass-romantic rounded-[2rem] p-8 md:p-12 lg:p-14 shadow-2xl max-w-3xl w-full relative overflow-hidden border-2 border-white/50 paper-texture"
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ 
          type: 'spring', 
          stiffness: 100,
          delay: 0.2
        }}
      >
        {/* Lace pattern overlay */}
        <div className="absolute inset-0 lace-pattern opacity-25 pointer-events-none" />
        
        {/* Enhanced shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-15"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['-200% 0', '200% 0'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Ornate corner flourishes */}
        {[
          { corner: 'top-3 left-3', rotate: 0 },
          { corner: 'top-3 right-3', rotate: 90 },
          { corner: 'bottom-3 left-3', rotate: -90 },
          { corner: 'bottom-3 right-3', rotate: 180 },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
            className={`absolute ${item.corner} text-3xl text-romantic-400 pointer-events-none`}
            style={{ rotate: `${item.rotate}deg` }}
          >
            ❦
          </motion.div>
        ))}
        
        {/* Elegant decorative dividers */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-romantic-300 to-transparent"
        />
        
        <motion.h1
          className="text-2xl md:text-3xl lg:text-4xl font-romantic font-bold text-center text-deep-rose mb-8 md:mb-10 text-shadow-glow relative z-10 tracking-tight leading-tight italic px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
        >
          What would you like for Valentine's Day?
          <motion.span
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 150 }}
            className="inline-block ml-2 text-3xl md:text-4xl"
          >
            💖
          </motion.span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 relative min-h-[280px] overflow-visible">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
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
              whileHover={option.isClickable ? { 
                y: -12, 
                scale: 1.03,
                transition: { duration: 0.3, type: 'spring', stiffness: 300 }
              } : {}}
              whileTap={option.isClickable ? { scale: 0.97 } : {}}
              className="relative"
            >
              {/* Enhanced glow for dinner card */}
              {option.id === 'dinner' && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-soft-gold/50 via-deep-rose/50 to-elegant-maroon/50"
                    animate={{
                      scale: [1, 1.08, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    style={{ filter: 'blur(25px)', zIndex: -1 }}
                  />
                  
                  {/* Golden sparkles for dinner option */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-xl"
                      style={{
                        top: `${20 + i * 30}%`,
                        right: '-10px',
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        x: [0, 10],
                        rotate: [0, 180],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: "easeOut"
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </>
              )}
              
              <button
                onClick={() => handleOptionClick(option)}
                onMouseEnter={() => !option.isClickable && handleNonClickableHover(option.id)}
                onTouchStart={(e) => {
                  if (!option.isClickable) {
                    e.preventDefault()
                    handleNonClickableHover(option.id)
                  }
                }}
                disabled={selectedOption !== null && option.isClickable}
                className={`relative w-full glass-morphism p-4 md:p-5 lg:p-6 rounded-2xl text-white shadow-lg overflow-hidden group ${
                  selectedOption !== null && option.isClickable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                } ${!option.isClickable ? 'cursor-pointer' : ''}`}
                style={{
                  background: option.isClickable 
                    ? `linear-gradient(135deg, ${option.id === 'dinner' ? '#B83260, #7A1E3A' : '#FF4D6D, #FFC0CB'})` 
                    : `linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))`,
                  borderImage: option.id === 'dinner' ? 'linear-gradient(135deg, #C9A227, #B83260, #7A1E3A) 1' : 'none',
                  borderWidth: option.id === 'dinner' ? '2px' : '1px',
                  borderStyle: 'solid',
                  borderColor: option.id === 'dinner' ? 'transparent' : 'rgba(255, 255, 255, 0.3)',
                }}
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1), transparent)`,
                    padding: '2px',
                  }}
                />
                
                {/* Shine effect */}
                {option.isClickable && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1,
                    }}
                  />
                )}
                
                <div className="flex flex-col items-center gap-2 md:gap-3 relative z-10">
                  <img 
                    src={option.icon} 
                    alt={option.title}
                    className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 drop-shadow-2xl object-contain"
                  />
                  <span className="text-base md:text-lg lg:text-xl font-bold drop-shadow-lg text-center tracking-wide leading-tight">
                    {option.title}
                  </span>
                  <p className="text-xs md:text-sm opacity-90 text-center font-medium leading-relaxed px-1">
                    {option.description}
                  </p>
                  
                  {selectedOption === option.id && option.isClickable && (
                    <motion.p
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="text-sm md:text-base font-semibold mt-2 bg-white/20 px-4 py-2 rounded-full"
                    >
                      {option.message}
                    </motion.p>
                  )}
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
})

DateOptionsScreen.displayName = 'DateOptionsScreen'

export default DateOptionsScreen
