import { motion } from 'framer-motion'
import { useState, memo } from 'react'

const GiftBoxScreen = memo(({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  const handleClick = () => {
    setIsShaking(true)
    setTimeout(() => {
      setIsShaking(false)
      setIsOpening(true)
      setTimeout(() => {
        onOpen()
      }, 1500)
    }, 500)
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.5 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4"
      style={{ perspective: '1000px' }}
    >
      {/* Sparkles around gift with stagger */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="absolute text-2xl sm:text-3xl"
            style={{
              left: `${50 + Math.cos((i * Math.PI * 2) / 8) * 30}%`,
              top: `${50 + Math.sin((i * Math.PI * 2) / 8) * 30}%`,
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
        variants={itemVariants}
        animate={{ 
          y: isShaking ? [-5, 5, -5, 5, 0] : [0, -15, 0],
          rotateZ: isShaking ? [-3, 3, -3, 3, 0] : 0
        }}
        transition={{ 
          y: isShaking ? { duration: 0.5 } : { duration: 2.5, repeat: Infinity, ease: [0.22, 1, 0.36, 1] },
          rotateZ: isShaking ? { duration: 0.5 } : {}
        }}
        className="cursor-pointer touch-manipulation relative z-10"
        onClick={handleClick}
        whileHover={{ 
          scale: 1.05,
          rotateY: 5,
          rotateX: -5,
          transition: { duration: 0.3, type: 'spring', stiffness: 300 }
        }}
        whileTap={{ 
          scale: 0.97,
          transition: { duration: 0.1 }
        }}
        style={{ 
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 drop-shadow-2xl">
          {/* Enhanced glow effect */}
          {!isOpening && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-deep-rose/40 via-valentine-pink/40 to-soft-gold/40"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{ filter: 'blur(30px)' }}
            />
          )}
          {/* Gift Box */}
          <motion.div
            animate={isOpening ? { 
              rotateX: -90, 
              y: -100, 
              opacity: 0,
              scale: 0.8
            } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
            style={{ transformStyle: 'preserve-3d' }}
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

          {/* Hearts explosion when opening - enhanced burst */}
          {isOpening && (
            <>
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl sm:text-5xl"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1, rotate: 0 }}
                  animate={{
                    scale: [0, 1.5, 1],
                    x: Math.cos((i * Math.PI * 2) / 20) * 200,
                    y: Math.sin((i * Math.PI * 2) / 20) * 200,
                    opacity: [1, 1, 0],
                    rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
                  }}
                  transition={{ 
                    duration: 1.4, 
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.02
                  }}
                >
                  {['❤️', '💕', '💖', '💗', '💝'][i % 5]}
                </motion.div>
              ))}
              
              {/* Light burst effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-soft-gold via-valentine-pink to-deep-rose"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ filter: 'blur(40px)' }}
              />
            </>
          )}
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="relative z-10"
        animate={{ 
          opacity: [0.6, 1, 0.6],
          y: [0, -5, 0]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl font-romantic text-deep-rose mt-6 sm:mt-8 text-center text-shadow-romantic px-4 tracking-wide"
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
        >
          👇
        </motion.div>
      </motion.div>
    </motion.div>
  )
})

GiftBoxScreen.displayName = 'GiftBoxScreen'

export default GiftBoxScreen
