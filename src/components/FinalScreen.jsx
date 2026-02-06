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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4"
    >
      {/* Confetti Hearts */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: -50,
            }}
            animate={{
              y: window.innerHeight + 100,
              rotate: Math.random() * 720 - 360,
              x: Math.random() * 200 - 100,
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
          >
            {['❤️', '💕', '💖', '💗', '💝', '💘'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="glass-morphism rounded-3xl p-8 md:p-16 shadow-2xl max-w-3xl w-full text-center relative z-10"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
        }}
      >
        {/* Pulsing heart */}
        <motion.div
          className="text-8xl md:text-9xl mb-6"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          💝
        </motion.div>

        {/* Main message */}
        <motion.h1
          className="text-4xl md:text-6xl font-romantic text-valentine-red mb-6 text-shadow-romantic"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Can't wait to spend Valentine's Day with you! ❤️
        </motion.h1>

        {/* Selected option message */}
        <motion.p
          className="text-xl md:text-3xl font-body text-valentine-red mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {optionMessages[selectedOption] || '💖 An amazing day together'}
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          className="flex justify-center gap-4 mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.9 }}
        >
          <span className="text-3xl">✨</span>
          <span className="text-3xl">💖</span>
          <span className="text-3xl">✨</span>
        </motion.div>

        {/* Final romantic message */}
        <motion.p
          className="text-lg md:text-2xl font-body text-gray-700 italic"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          "Every moment with you is my favorite moment" 💕
        </motion.p>

        {/* Floating hearts around the card */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${(Math.cos((i * Math.PI * 2) / 8) + 1) * 50}%`,
              top: `${(Math.sin((i * Math.PI * 2) / 8) + 1) * 50}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            💖
          </motion.div>
        ))}
      </motion.div>

      {/* Love meter at bottom */}
      <motion.div
        className="mt-8 w-full max-w-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p className="text-center text-valentine-red font-semibold mb-3 text-lg">
          Love Meter 💕
        </p>
        <div className="h-6 bg-white rounded-full overflow-hidden shadow-lg">
          <motion.div
            className="h-full bg-gradient-to-r from-valentine-pink via-valentine-red to-red-600"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, delay: 1.7 }}
          >
            <motion.div
              className="h-full flex items-center justify-end pr-3"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="text-white font-bold text-sm">100% ❤️</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FinalScreen
