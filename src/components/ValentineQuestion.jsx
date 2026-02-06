import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, memo } from 'react'

const ValentineQuestion = memo(({ onYes }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [noAttempts, setNoAttempts] = useState(0)
  const [showHeartDoor, setShowHeartDoor] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const noButtonRef = useRef(null)

  const cuteMessages = [
    "Are you sure? 🥺",
    "Think again! 💭",
    "Don't break my heart... 💔",
    "Please? 🙏",
    "Pretty please? 🥹",
    "Come on... 😊",
    "One more chance? 💕",
    "I promise it'll be fun! 🎉",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    },
    exit: { opacity: 0, scale: 0.9 }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  }

  const handleNoHover = (e) => {
    // Intelligent cursor-aware movement
    const button = noButtonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const buttonCenterX = rect.left + rect.width / 2
    const buttonCenterY = rect.top + rect.height / 2
    
    // Calculate direction away from cursor
    const angle = Math.atan2(
      buttonCenterY - e.clientY,
      buttonCenterX - e.clientX
    )
    
    // Increase distance with each attempt
    const baseRange = 180
    const multiplier = 1 + (noAttempts * 0.4)
    const distance = baseRange * multiplier
    
    const randomX = Math.cos(angle) * distance + (Math.random() - 0.5) * 40
    const randomY = Math.sin(angle) * distance + (Math.random() - 0.5) * 40
    
    setNoPosition({ x: randomX, y: randomY })
    setNoAttempts(prev => prev + 1)
    setShowTooltip(true)
    setTimeout(() => setShowTooltip(false), 2000)
  }

  const handleNoClick = (e) => {
    e.preventDefault()
    handleNoHover()
  }

  const handleYesClick = () => {
    setShowHeartDoor(true)
    setTimeout(() => {
      onYes()
    }, 2000)
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4"
    >
      {/* Heart Door Animation */}
      {showHeartDoor && (
        <>
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-valentine-red via-pink-500 to-valentine-pink z-50"
            initial={{ clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)' }}
            animate={{ clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'clip-path' }}
          />
          <motion.div
            className="fixed inset-0 bg-gradient-to-bl from-valentine-red via-pink-500 to-valentine-pink z-50"
            initial={{ clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)' }}
            animate={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'clip-path' }}
          />
          
          {/* Heart shape overlay */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
            style={{ willChange: 'transform' }}
          >
            <motion.div 
              className="text-9xl drop-shadow-2xl"
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ willChange: 'transform' }}
            >
              ❤️
            </motion.div>
          </motion.div>
        </>
      )}

      {/* Main Content */}
      <motion.div
        className="glass-morphism rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl max-w-2xl w-full mx-4 relative overflow-hidden"
        variants={itemVariants}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 shimmer opacity-30"
          animate={{
            backgroundPosition: ['-200% 0', '200% 0'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-romantic text-center text-deep-rose mb-6 sm:mb-8 text-shadow-romantic leading-tight tracking-tight"
        >
          Will you be my Valentine? 💝
        </motion.h1>

        {/* Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center relative min-h-[120px] sm:min-h-[140px] w-full px-2"
        >
          {/* Yes Button */}
          <motion.button
            onClick={handleYesClick}
            whileHover={{ 
              scale: 1.08, 
              y: -5,
              boxShadow: "0 15px 40px rgba(184, 50, 96, 0.4)",
              transition: { duration: 0.2, type: 'spring', stiffness: 300 } 
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            className="relative bg-gradient-to-r from-deep-rose via-valentine-red to-elegant-maroon text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl md:text-2xl font-bold shadow-2xl transition-all duration-300 z-10 touch-manipulation min-w-[140px] overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Yes! ❤️
            </span>
          </motion.button>

          {/* No Button - Moves away with rotation and tooltip */}
          <div className="relative">
            <motion.button
              ref={noButtonRef}
              onMouseEnter={handleNoHover}
              onTouchStart={(e) => {
                const touch = e.touches[0]
                handleNoHover({ clientX: touch.clientX, clientY: touch.clientY })
              }}
              onClick={handleNoClick}
              animate={{
                x: noPosition.x,
                y: noPosition.y,
                rotate: noPosition.x * 0.1, // Subtle rotation based on x movement
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 20,
                rotate: { duration: 0.3 }
              }}
              style={{ position: 'relative' }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl md:text-2xl font-bold shadow-lg cursor-pointer hover:from-gray-500 hover:to-gray-600 transition-all touch-manipulation min-w-[140px]"
            >
              No 😢
            </motion.button>
            
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && noAttempts > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-deep-rose text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shadow-lg"
                >
                  {cuteMessages[Math.min(noAttempts - 1, cuteMessages.length - 1)]}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-deep-rose" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Heart decorations */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 relative z-10"
        >
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="text-2xl sm:text-3xl drop-shadow-lg"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 12, -12, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              💕
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
})

ValentineQuestion.displayName = 'ValentineQuestion'

export default ValentineQuestion
