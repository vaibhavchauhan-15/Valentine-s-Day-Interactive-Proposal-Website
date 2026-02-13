import { motion } from 'framer-motion'
import { useState, memo, useMemo } from 'react'
import { VARIANTS, EASING, DURATION, STAGGER, WILL_CHANGE } from '../constants/animations'

const GiftBoxScreen = memo(({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  // Memoize sparkle positions for consistent rendering
  const sparklePositions = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      left: `${50 + Math.cos((i * Math.PI * 2) / 8) * 30}%`,
      top: `${50 + Math.sin((i * Math.PI * 2) / 8) * 30}%`,
      delay: i * 0.12,
    })), [])

  const handleClick = () => {
    setIsShaking(true)
    setTimeout(() => {
      setIsShaking(false)
      setIsOpening(true)
      setTimeout(() => {
        onOpen()
      }, 1400)
    }, 450)
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: DURATION.normal,
        ease: EASING.smooth,
        ...STAGGER.normal
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.85,
      transition: { duration: DURATION.fast }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: EASING.softSpring
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
      {/* Sparkles around gift with stagger - Optimized */}
      <div className="absolute inset-0 pointer-events-none">
        {sparklePositions.map((pos, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="absolute text-2xl sm:text-3xl"
            style={{ left: pos.left, top: pos.top, ...WILL_CHANGE.transformOpacity }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.12, 0.8],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2.3,
              repeat: Infinity,
              delay: pos.delay,
              ease: EASING.smooth,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
      
      <motion.div
        variants={itemVariants}
        animate={{ 
          y: isShaking ? [-4, 4, -4, 4, 0] : [0, -12, 0],
          rotateZ: isShaking ? [-2.5, 2.5, -2.5, 2.5, 0] : 0
        }}
        transition={{ 
          y: isShaking ? { duration: 0.45 } : { duration: 2.3, repeat: Infinity, ease: EASING.smooth },
          rotateZ: isShaking ? { duration: 0.45 } : {}
        }}
        className="cursor-pointer touch-manipulation relative z-10"
        onClick={handleClick}
        whileHover={{ 
          scale: 1.05,
          rotateY: 5,
          rotateX: -5,
          transition: { duration: 0.25, ...EASING.fastSpring }
        }}
        whileTap={{ 
          scale: 0.97,
          transition: { duration: 0.1 }
        }}
        style={{ 
          transformStyle: 'preserve-3d',
          ...WILL_CHANGE.transform,
        }}
      >
        <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 drop-shadow-2xl">
          {/* Enhanced glow effect */}
          {!isOpening && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-deep-rose/35 via-valentine-pink/35 to-soft-gold/35"
              style={WILL_CHANGE.transformOpacity}
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{ filter: 'blur(28px)', ...WILL_CHANGE.transformOpacity }}
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
            transition={{ duration: 0.65, ease: EASING.smooth }}
            className="relative w-full h-full"
            style={{ transformStyle: 'preserve-3d', ...WILL_CHANGE.transformOpacity }}
          >
            <img
              src="/icons/gift-box.png"
              alt="Gift Box"
              className="w-full h-full object-contain drop-shadow-2xl"
              loading="eager"
            />
          </motion.div>

          {/* Hearts explosion when opening - Optimized burst */}
          {isOpening && (
            <>
              {Array.from({ length: 18 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl sm:text-5xl"
                  style={{
                    top: '50%',
                    left: '50%',
                    ...WILL_CHANGE.transformOpacity,
                  }}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1, rotate: 0 }}
                  animate={{
                    scale: [0, 1.4, 1],
                    x: Math.cos((i * Math.PI * 2) / 18) * 180,
                    y: Math.sin((i * Math.PI * 2) / 18) * 180,
                    opacity: [1, 1, 0],
                    rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
                  }}
                  transition={{ 
                    duration: 1.3, 
                    ease: EASING.smooth,
                    delay: i * 0.015
                  }}
                >
                  {['❤️', '💕', '💖', '💗', '💝'][i % 5]}
                </motion.div>
              ))}
              
              {/* Light burst effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-soft-gold via-valentine-pink to-deep-rose"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2.8, opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                style={{ filter: 'blur(35px)', ...WILL_CHANGE.transformOpacity }}
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
          y: [0, -4, 0]
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: EASING.smooth }}
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
