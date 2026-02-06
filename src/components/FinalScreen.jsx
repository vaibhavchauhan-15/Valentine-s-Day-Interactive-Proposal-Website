import { motion } from 'framer-motion'

const FinalScreen = ({ selectedOption }) => {
  const optionMessages = {
    movie: '🎬 Movie night under the stars with you',
    dinner: '🍽️ A romantic dinner by candlelight',
    drive: '🚗 A scenic drive with endless conversations',
    camping: '⛺ Camping under the stars together',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4"
      style={{ willChange: 'opacity, transform' }}
    >
      {/* Confetti Hearts - Enhanced */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl sm:text-3xl drop-shadow-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: -50,
              willChange: 'transform',
              transform: 'translate3d(0,0,0)',
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 900,
              rotate: Math.random() * 1080 - 540,
              x: [0, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 100],
              scale: [0.8, 1.15, 1, 0.8],
            }}
            transition={{
              duration: Math.random() * 2.5 + 3.5,
              repeat: Infinity,
              delay: Math.random() * 1.5,
              ease: 'linear',
            }}
          >
            {['❤️', '💕', '💖', '💗', '💝', '💘'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="glass-morphism rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl max-w-3xl w-full text-center relative z-10 mx-4 overflow-hidden"
        initial={{ scale: 0, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 15,
          delay: 0.2,
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
        
        {/* Pulsing heart */}
        <motion.div
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 sm:mb-6 drop-shadow-2xl relative z-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: 'transform' }}
        >
          💝
        </motion.div>

        {/* Main message */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-romantic text-valentine-red mb-4 sm:mb-6 text-shadow-romantic leading-tight px-2 relative z-10"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        >
          Can't wait to spend Valentine's Day with you! ❤️
        </motion.h1>

        {/* Selected option message */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-body text-valentine-red mb-6 sm:mb-8 px-2 font-semibold relative z-10"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
        >
          {optionMessages[selectedOption] || '💖 An amazing day together'}
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          className="flex justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 relative z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 150 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span 
              key={i}
              className="text-3xl sm:text-4xl drop-shadow-lg"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            >
              {i === 1 ? '💖' : '✨'}
            </motion.span>
          ))}
        </motion.div>

        {/* Final romantic message */}
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-body text-gray-700 italic px-4 relative z-10"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 100 }}
        >
          "Every moment with you is my favorite moment" 💕
        </motion.p>

        {/* Floating hearts around the card */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl sm:text-3xl md:text-4xl drop-shadow-lg"
            style={{
              left: `${(Math.cos((i * Math.PI * 2) / 8) + 1) * 50}%`,
              top: `${(Math.sin((i * Math.PI * 2) / 8) + 1) * 50}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 1.2, 1],
              opacity: [0, 1, 1, 1],
              y: [0, -25, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: 1.2 + i * 0.2,
              ease: "easeInOut",
            }}
          >
            💖
          </motion.div>
        ))}
      </motion.div>

      {/* Love meter at bottom */}
      <motion.div
        className="mt-6 sm:mt-8 w-full max-w-md px-4 relative z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 100 }}
      >
        <p className="text-center text-valentine-red font-bold mb-2 sm:mb-3 text-base sm:text-lg drop-shadow-md">
          Love Meter 💕
        </p>
        <div className="h-5 sm:h-6 bg-white/80 backdrop-blur-sm rounded-full overflow-hidden shadow-lg border-2 border-valentine-pink/50">
          <motion.div
            className="h-full bg-gradient-to-r from-valentine-pink via-valentine-red to-red-600 relative overflow-hidden"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, delay: 1.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {/* Shine effect on progress bar */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 0.5,
              }}
            />
            <motion.div
              className="h-full flex items-center justify-end pr-2 sm:pr-3 relative z-10"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-white font-extrabold text-xs sm:text-sm drop-shadow-md">100% ❤️</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FinalScreen
