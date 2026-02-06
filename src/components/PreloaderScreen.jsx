import { motion } from 'framer-motion'

const PreloaderScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-gradient-to-br from-warm-cream via-blush to-valentine-lavender"
    >
      {/* Pulsing heart */}
      <motion.div
        className="text-8xl md:text-9xl mb-8"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        ❤️
      </motion.div>

      {/* Loading text */}
      <motion.h2
        className="text-2xl md:text-3xl font-romantic text-deep-rose text-shadow-romantic tracking-wide"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Loading your love story...
      </motion.h2>

      {/* Floating hearts around */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          style={{
            left: `${50 + Math.cos((i * Math.PI * 2) / 8) * 35}%`,
            top: `${50 + Math.sin((i * Math.PI * 2) / 8) * 35}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        >
          💕
        </motion.div>
      ))}

      {/* Progress bar */}
      <motion.div
        className="mt-12 w-64 h-2 bg-white/30 rounded-full overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-deep-rose via-valentine-pink to-soft-gold"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default PreloaderScreen
