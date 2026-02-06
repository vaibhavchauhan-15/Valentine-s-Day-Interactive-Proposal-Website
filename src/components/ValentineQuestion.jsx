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
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4"
    >
      {/* Heart Door Animation */}
      {showHeartDoor && (
        <>
          <motion.div
            className="fixed inset-0 bg-valentine-red z-50"
            initial={{ clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)' }}
            animate={{ clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
          <motion.div
            className="fixed inset-0 bg-valentine-red z-50"
            initial={{ clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)' }}
            animate={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
          
          {/* Heart shape overlay */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="text-9xl">❤️</div>
          </motion.div>
        </>
      )}

      {/* Main Content */}
      <motion.div
        className="glass-morphism rounded-3xl p-8 md:p-12 shadow-2xl max-w-2xl w-full"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-romantic text-center text-valentine-red mb-8 text-shadow-romantic"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Will you be my Valentine? 💝
        </motion.h1>

        {/* Cute message display */}
        {noAttempts > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-lg md:text-xl text-valentine-red mb-6 font-medium"
          >
            {cuteMessages[Math.min(noAttempts - 1, cuteMessages.length - 1)]}
          </motion.p>
        )}

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center relative min-h-[140px] w-full">
          {/* Yes Button */}
          <motion.button
            onClick={handleYesClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-valentine-red to-pink-600 text-white px-12 py-4 rounded-full text-xl md:text-2xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 z-10 relative"
          >
            Yes! ❤️
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
            style={{ position: 'relative' }}
            className="bg-gray-400 text-white px-12 py-4 rounded-full text-xl md:text-2xl font-bold shadow-lg cursor-pointer hover:bg-gray-500 transition-colors"
          >
            No 😢
          </motion.button>
        </div>

        {/* Heart decorations */}
        <div className="flex justify-center gap-4 mt-8">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="text-3xl"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
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
