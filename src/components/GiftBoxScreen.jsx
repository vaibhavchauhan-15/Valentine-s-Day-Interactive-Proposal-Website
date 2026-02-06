import { motion } from 'framer-motion'
import { useState } from 'react'

const GiftBoxScreen = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false)

  const handleClick = () => {
    setIsOpening(true)
    setTimeout(() => {
      onOpen()
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="cursor-pointer"
        onClick={handleClick}
      >
        <div className="relative">
          {/* Gift Box */}
          <motion.div
            animate={isOpening ? { rotateX: -90, y: -100, opacity: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Box Base */}
              <rect x="30" y="70" width="140" height="110" fill="#FF4D6D" rx="5" />
              <rect x="30" y="60" width="140" height="20" fill="#FF1744" rx="5" />
              
              {/* Ribbon Vertical */}
              <rect x="90" y="60" width="20" height="120" fill="#FFC0CB" />
              
              {/* Ribbon Horizontal */}
              <rect x="30" y="110" width="140" height="15" fill="#FFC0CB" />
              
              {/* Bow */}
              <ellipse cx="80" cy="50" rx="20" ry="15" fill="#FFB6C1" />
              <ellipse cx="120" cy="50" rx="20" ry="15" fill="#FFB6C1" />
              <circle cx="100" cy="50" r="12" fill="#FF69B4" />
            </svg>
          </motion.div>

          {/* Hearts explosion when opening */}
          {isOpening && (
            <>
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1.5, 1],
                    x: Math.cos((i * Math.PI * 2) / 12) * 150,
                    y: Math.sin((i * Math.PI * 2) / 12) * 150,
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                >
                  ❤️
                </motion.div>
              ))}
            </>
          )}
        </div>
      </motion.div>

      <motion.p
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-2xl md:text-3xl font-romantic text-valentine-red mt-8 text-center text-shadow-romantic"
      >
        Tap here ✨
      </motion.p>
    </motion.div>
  )
}

export default GiftBoxScreen
