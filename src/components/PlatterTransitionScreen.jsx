import { motion } from 'framer-motion'
import { useEffect, memo, useMemo } from 'react'

const PlatterTransitionScreen = memo(({ onComplete }) => {
  // Memoize random positions to prevent recalculation on each render
  const floatingHearts = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 3 + Math.random() * 2,
      emoji: ['❤️', '💕', '💖', '💗'][i % 4]
    })), []
  )

  const sparkles = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i * Math.PI * 2) / 8,
      delay: 1.8 + i * 0.08
    })), []
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3500)
    
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-pink-200 via-valentine-lavender to-valentine-pink"
    >
      {/* Floating hearts background - Optimized */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-2xl md:text-3xl will-change-transform"
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            y: [-30, 0, -30],
            opacity: [0, 0.7, 0.5, 0.7, 0],
            scale: [0.8, 1.1, 0.9, 1.1, 0.8],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut",
            repeatType: "loop",
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}

      {/* Main animation container */}
      <div className="relative will-change-transform">
        {/* Platter */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            type: "spring",
            stiffness: 100,
            damping: 12,
          }}
          className="relative will-change-transform"
        >
          {/* Platter base */}
          <motion.div
            className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 shadow-2xl relative overflow-hidden will-change-transform"
            animate={{
              boxShadow: [
                "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                "0 25px 50px -12px rgba(255, 77, 109, 0.35)",
                "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
              repeatType: "reverse",
            }}
          >
            {/* Plate details/shine */}
            <motion.div
              className="absolute inset-4 rounded-full border-4 border-white/30"
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse",
              }}
            />
            
            {/* Food items on platter */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.9, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 120,
                  damping: 10,
                }}
                className="text-6xl md:text-8xl will-change-transform"
              >
                🍝
              </motion.div>
            </div>

            {/* Additional food decorations */}
            {[
              { emoji: '🍷', delay: 1.1, position: 'top-8 left-12' },
              { emoji: '🥖', delay: 1.2, position: 'top-12 right-8' },
              { emoji: '🧀', delay: 1.3, position: 'bottom-16 left-8' },
              { emoji: '🥗', delay: 1.4, position: 'bottom-12 right-12' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0, y: -30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                  delay: item.delay,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 140,
                  damping: 10,
                }}
                className={`absolute ${item.position} text-3xl md:text-4xl will-change-transform`}
              >
                {item.emoji}
              </motion.div>
            ))}
          </motion.div>

          {/* Sparkles around platter - Optimized */}
          {sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              className="absolute text-2xl md:text-3xl will-change-transform"
              style={{
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 1, 0.9, 0],
                x: [0, Math.cos(sparkle.angle) * 180],
                y: [0, Math.sin(sparkle.angle) * 180],
                rotate: [0, 180],
              }}
              transition={{
                duration: 1.5,
                delay: sparkle.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              ✨
            </motion.div>
          ))}
        </motion.div>

        {/* Spoon and Fork crossing animation - Optimized */}
        <motion.div
          className="absolute top-1/2 left-1/2 will-change-transform"
          style={{ x: '-50%', y: '-50%' }}
        >
          {/* Fork from left */}
          <motion.div
            initial={{ x: -400, y: -100, rotate: -90, opacity: 0 }}
            animate={{ 
              x: -60, 
              y: -30, 
              rotate: -25, 
              opacity: 1 
            }}
            transition={{
              delay: 1.7,
              duration: 0.7,
              type: "spring",
              stiffness: 90,
              damping: 12,
            }}
            className="absolute text-5xl md:text-6xl filter drop-shadow-lg will-change-transform"
          >
            🍴
          </motion.div>

          {/* Spoon from right */}
          <motion.div
            initial={{ x: 400, y: -100, rotate: 90, opacity: 0 }}
            animate={{ 
              x: 40, 
              y: -30, 
              rotate: 25, 
              opacity: 1 
            }}
            transition={{
              delay: 1.7,
              duration: 0.7,
              type: "spring",
              stiffness: 90,
              damping: 12,
            }}
            className="absolute text-5xl md:text-6xl filter drop-shadow-lg will-change-transform"
          >
            🥄
          </motion.div>
        </motion.div>
      </div>

      {/* Message - Optimized */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          delay: 2.2, 
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 12,
        }}
        className="absolute bottom-20 md:bottom-32 text-center px-4 will-change-transform"
      >
        <h2 className="text-2xl md:text-4xl font-romantic text-valentine-red text-shadow-romantic">
          Preparing your romantic dinner... 🕯️
        </h2>
      </motion.div>
    </motion.div>
  )
})

PlatterTransitionScreen.displayName = 'PlatterTransitionScreen'

export default PlatterTransitionScreen
