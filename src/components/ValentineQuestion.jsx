import { motion } from 'framer-motion'
import { useState } from 'react'

const ValentineQuestion = ({ onYes }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [noAttempts, setNoAttempts] = useState(0)
  const [showHeartDoor, setShowHeartDoor] = useState(false)

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

  const handleNoHover = () => {
    // Increase movement range with each attempt to make it progressively harder
    const baseRange = 200
    const multiplier = 1 + (noAttempts * 0.3)
    const range = baseRange * multiplier
    
    const randomX = Math.random() * range - range / 2
    const randomY = Math.random() * range - range / 2
    setNoPosition({ x: randomX, y: randomY })
    setNoAttempts(prev => prev + 1)
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4"
      style={{ willChange: 'opacity' }}
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
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ 
          type: 'spring', 
          stiffness: 100,
          damping: 15,
          delay: 0.1
        }}
        style={{ willChange: 'transform, opacity' }}
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
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-romantic text-center text-valentine-red mb-6 sm:mb-8 text-shadow-romantic leading-tight relative z-10"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform' }}
        >
          Will you be my Valentine? 💝
        </motion.h1>

        {/* Cute message display */}
        {noAttempts > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-base sm:text-lg md:text-xl text-valentine-red mb-4 sm:mb-6 font-semibold px-2 relative z-10"
          >
            {cuteMessages[Math.min(noAttempts - 1, cuteMessages.length - 1)]}
          </motion.p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center relative min-h-[120px] sm:min-h-[140px] w-full px-2">
          {/* Yes Button */}
          <motion.button
            onClick={handleYesClick}
            whileHover={{ scale: 1.08, y: -3, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.92, transition: { duration: 0.1 } }}
            className="relative bg-gradient-to-r from-valentine-red via-pink-500 to-pink-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl md:text-2xl font-bold shadow-2xl hover:shadow-valentine-red/50 transition-all duration-300 z-10 touch-manipulation min-w-[140px] overflow-hidden group"
            style={{ willChange: 'transform' }}
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

          {/* No Button - Moves away */}
          <motion.button
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            onClick={handleNoClick}
            animate={{
              x: noPosition.x,
              y: noPosition.y,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ position: 'relative', willChange: 'transform' }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl md:text-2xl font-bold shadow-lg cursor-pointer hover:from-gray-500 hover:to-gray-600 transition-all touch-manipulation min-w-[140px]"
          >
            No 😢
          </motion.button>
        </div>

        {/* Heart decorations */}
        <div className="flex justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 relative z-10">
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
              style={{ willChange: 'transform' }}
            >
              💕
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ValentineQuestion
