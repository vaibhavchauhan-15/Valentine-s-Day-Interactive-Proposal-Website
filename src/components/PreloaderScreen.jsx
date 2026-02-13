import { motion } from 'framer-motion'
import { memo, useMemo } from 'react'
import { VARIANTS, EASING, DURATION, WILL_CHANGE } from '../constants/animations'

const PreloaderScreen = memo(() => {
  // Memoize heart positions for consistent animation
  const heartPositions = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      left: `${50 + Math.cos((i * Math.PI * 2) / 8) * 35}%`,
      top: `${50 + Math.sin((i * Math.PI * 2) / 8) * 35}%`,
      delay: i * 0.15,
    })), [])

  return (
    <motion.div
      variants={VARIANTS.fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-gradient-to-br from-warm-cream via-blush to-valentine-lavender"
    >
      {/* Pulsing heart - Optimized */}
      <motion.div
        className="text-8xl md:text-9xl mb-8"
        style={WILL_CHANGE.transform}
        animate={{
          scale: [1, 1.25, 1],
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: EASING.smooth,
        }}
      >
        ❤️
      </motion.div>

      {/* Loading text */}
      <motion.h2
        className="text-2xl md:text-3xl font-romantic text-deep-rose text-shadow-romantic tracking-wide"
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Loading your love story...
      </motion.h2>

      {/* Floating hearts around - Optimized */}
      {heartPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          style={{ left: pos.left, top: pos.top, ...WILL_CHANGE.transformOpacity }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: pos.delay,
            ease: "easeInOut",
          }}
        >
          💕
        </motion.div>
      ))}

      {/* Progress bar - Optimized */}
      <motion.div
        className="mt-12 w-64 h-2 bg-white/30 rounded-full overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: DURATION.fast }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-deep-rose via-valentine-pink to-soft-gold"
          style={WILL_CHANGE.transform}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        />
      </motion.div>
    </motion.div>
  )
})

PreloaderScreen.displayName = 'PreloaderScreen'

export default PreloaderScreen
