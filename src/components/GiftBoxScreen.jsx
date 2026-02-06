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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Sparkles around gift */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl sm:text-3xl"
            style={{
              left: `${50 + Math.cos((i * Math.PI * 2) / 8) * 30}%`,
              top: `${50 + Math.sin((i * Math.PI * 2) / 8) * 30}%`,
              willChange: 'transform, opacity',
              transform: 'translate3d(0,0,0)',
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.15, 0.8],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
      
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        className="cursor-pointer touch-manipulation relative z-10"
        onClick={handleClick}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        style={{ willChange: 'transform' }}
      >
        <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 drop-shadow-2xl">
          {/* Gift Box */}
          <motion.div
            animate={isOpening ? { rotateX: -90, y: -100, opacity: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
            style={{ willChange: 'transform, opacity', transformStyle: 'preserve-3d' }}
          >
            <svg
              className="w-full h-full"
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
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl sm:text-5xl"
                  style={{
                    top: '50%',
                    left: '50%',
                    willChange: 'transform, opacity',
                    transform: 'translate3d(0,0,0)',
                  }}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.5, 1],
                    x: Math.cos((i * Math.PI * 2) / 16) * 180,
                    y: Math.sin((i * Math.PI * 2) / 16) * 180,
                    opacity: [1, 1, 0],
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {['❤️', '💕', '💖', '💗'][i % 4]}
                </motion.div>
              ))}
            </>
          )}
        </div>
      </motion.div>

      <motion.div 
        className="relative z-10"
        animate={{ 
          opacity: [0.6, 1, 0.6],
          y: [0, -5, 0]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'transform, opacity' }}
      >
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl font-romantic text-valentine-red mt-6 sm:mt-8 text-center text-shadow-romantic px-4"
        >
          Click to Open ✨
        </motion.p>
        
        {/* Pointer indicator */}
        <motion.div
          className="text-3xl sm:text-4xl text-center mt-2"
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: 'transform, opacity' }}
        >
          👇
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default GiftBoxScreen
