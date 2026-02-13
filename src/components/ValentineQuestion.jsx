import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, memo, useMemo, useCallback } from 'react'
import { VARIANTS, EASING, DURATION, WILL_CHANGE, BUTTON_ANIMATIONS } from '../constants/animations'
import { useDeviceDetection } from '../utils/deviceDetection'

const ValentineQuestion = memo(({ onYes }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [noAttempts, setNoAttempts] = useState(0)
  const [showHeartDoor, setShowHeartDoor] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const noButtonRef = useRef(null)
  
  // Device detection for mobile optimization
  const { isMobile, isTablet, prefersReducedMotion } = useDeviceDetection()
  const shouldReduceAnimations = prefersReducedMotion || isMobile

  const cuteMessages = [
    "Aresure? 🥺",
    "Think again! 💭",
    "Don't break my heart... 💔",
    "Please? 🙏",
    "Pretty please? 🥹",
    "Come on... 😊",
    "One more chance? 💕",
    "I promise it'll be fun! 🎉",
  ]

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08
      }
    },
    exit: { opacity: 0, scale: 0.9 }
  }), [])

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: EASING.softSpring
    }
  }), [])

  const handleNoHover = useCallback((e) => {
    // Intelligent cursor-aware movement with RAF optimization
    const button = noButtonRef.current
    if (!button) return

    // Use RAF for smoother, optimized updates
    requestAnimationFrame(() => {
      const rect = button.getBoundingClientRect()
      const buttonCenterX = rect.left + rect.width / 2
      const buttonCenterY = rect.top + rect.height / 2
      
      // Calculate direction away from cursor
      const angle = Math.atan2(
        buttonCenterY - e.clientY,
        buttonCenterX - e.clientX
      )
      
      // Increase distance with each attempt (reduced on mobile)
      const baseRange = isMobile ? 120 : 170
      const multiplier = 1 + (noAttempts * (isMobile ? 0.25 : 0.35))
      const distance = baseRange * multiplier
      
      const randomX = Math.cos(angle) * distance + (Math.random() - 0.5) * 35
      const randomY = Math.sin(angle) * distance + (Math.random() - 0.5) * 35
      
      setNoPosition({ x: randomX, y: randomY })
      setNoAttempts(prev => prev + 1)
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 1800)
    })
  }, [noAttempts, isMobile])

  const handleNoClick = (e) => {
    e.preventDefault()
    handleNoHover()
  }

  const handleYesClick = useCallback(() => {
    setShowHeartDoor(true)
    setTimeout(() => {
      onYes()
    }, 1900)
  }, [onYes])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: DURATION.normal, ease: EASING.smooth }}
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4"
    >
      {/* Heart Door Animation - Optimized */}
      {showHeartDoor && (
        <>
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-valentine-red via-pink-500 to-valentine-pink z-50"
            initial={{ clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)' }}
            animate={{ clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)' }}
            transition={{ duration: 0.75, ease: EASING.smooth }}
            style={WILL_CHANGE.auto}
          />
          <motion.div
            className="fixed inset-0 bg-gradient-to-bl from-valentine-red via-pink-500 to-valentine-pink z-50"
            initial={{ clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)' }}
            animate={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}
            transition={{ duration: 0.75, ease: EASING.smooth }}
            style={WILL_CHANGE.auto}
          />
          
          {/* Heart shape overlay - Optimized */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ...EASING.bouncySpring }}
            style={WILL_CHANGE.transform}
          >
            <motion.div 
              className="text-9xl drop-shadow-2xl"
              animate={{
                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: EASING.smooth,
              }}
              style={WILL_CHANGE.transform}
            >
              ❤️
            </motion.div>
          </motion.div>
        </>
      )}

      {/* Main Content - Enhanced with ornate romantic styling */}
      <motion.div
        className="glass-romantic rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 md:p-12 shadow-2xl max-w-2xl w-full mx-4 relative overflow-hidden border-2 border-white/50 paper-texture"
        variants={itemVariants}
      >
        {/* Lace pattern overlay */}
        <div className="absolute inset-0 lace-pattern opacity-30 pointer-events-none" />
        
        {/* Enhanced shimmer effect - Disabled on mobile for performance */}
        {!isMobile && !shouldReduceAnimations && (
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
              backgroundSize: '200% 100%',
            }}
            animate={{
              backgroundPosition: ['-200% 0', '200% 0'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
        
        {/* Ornate corner flourishes */}
        {[
          { corner: 'top-3 left-3', rotate: 0 },
          { corner: 'top-3 right-3', rotate: 90 },
          { corner: 'bottom-3 left-3', rotate: -90 },
          { corner: 'bottom-3 right-3', rotate: 180 },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
            className={`absolute ${item.corner} text-3xl text-romantic-400 pointer-events-none`}
            style={{ rotate: `${item.rotate}deg` }}
          >
            ❦
          </motion.div>
        ))}
        
        {/* Decorative divider lines */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-romantic-300 to-transparent"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-romantic-300 to-transparent"
        />
        {/* Title - Enhanced with ornate typography */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 mb-6 sm:mb-8"
        >
          {/* Decorative quotation marks */}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' }}
            className="absolute -left-8 -top-4 text-6xl font-elegant text-romantic-400 leading-none hidden sm:block"
          >
            "
          </motion.span>
          
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-romantic font-bold text-center text-deep-rose text-shadow-glow leading-tight tracking-tight italic">
            Will you be my Valentine?
          </h1>
          
          {/* Ornamental heart */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            className="flex justify-center mt-2"
          >
            <span className="text-4xl filter drop-shadow-lg">💝</span>
          </motion.div>
          
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' }}
            className="absolute -right-8 -bottom-4 text-6xl font-elegant text-romantic-400 leading-none hidden sm:block"
          >
            "
          </motion.span>
        </motion.div>

        {/* Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center relative min-h-[120px] sm:min-h-[140px] w-full px-2"
        >
          {/* Yes Button - Enhanced with better effects */}
          <motion.button
            onClick={handleYesClick}
            whileHover={!isMobile ? { 
              ...BUTTON_ANIMATIONS.hover,
              boxShadow: "0 20px 50px rgba(184, 50, 96, 0.5), 0 0 30px rgba(255, 77, 109, 0.4)",
            } : {}}
            whileTap={BUTTON_ANIMATIONS.tap}
            className="relative bg-gradient-to-r from-deep-rose via-valentine-red to-coral-pink text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl md:text-2xl font-bold shadow-2xl transition-all duration-300 z-10 touch-manipulation min-w-[140px] sm:min-w-[160px] overflow-hidden group border-2 border-white/30"
            style={WILL_CHANGE.transform}
          >
            {/* Animated gradient overlay - Desktop only */}
            {!isMobile && !shouldReduceAnimations && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/50 to-white/30"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
            
            {/* Glow effect - Simplified on mobile */}
            {!shouldReduceAnimations && (
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: isMobile ? [
                    '0 0 15px rgba(255, 77, 109, 0.3) inset',
                    '0 0 20px rgba(255, 77, 109, 0.5) inset',
                    '0 0 15px rgba(255, 77, 109, 0.3) inset',
                  ] : [
                    '0 0 20px rgba(255, 77, 109, 0.3) inset',
                    '0 0 30px rgba(255, 77, 109, 0.6) inset',
                    '0 0 20px rgba(255, 77, 109, 0.3) inset',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
            
            <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-lg">
              Yes! ❤️
            </span>
          </motion.button>

          {/* No Button - Enhanced with better styling and optimized springs */}
          <div className="relative">
            <motion.button
              ref={noButtonRef}
              onMouseEnter={!isMobile ? handleNoHover : undefined}
              onTouchStart={(e) => {
                const touch = e.touches[0]
                handleNoHover({ clientX: touch.clientX, clientY: touch.clientY })
              }}
              onClick={handleNoClick}
              animate={{
                x: noPosition.x,
                y: noPosition.y,
                rotate: noPosition.x * 0.15,
              }}
              transition={{ 
                type: 'spring', 
                stiffness: isMobile ? 100 : 120, // Optimized spring for mobile
                damping: 20,
                rotate: { duration: 0.3 }
              }}
              style={{ position: 'relative' }}
              whileHover={!isMobile ? { 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(156, 163, 175, 0.4)",
                transition: { duration: 0.2 }
              } : {}}
              className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl md:text-2xl font-bold shadow-lg cursor-pointer transition-all touch-manipulation min-w-[140px] sm:min-w-[160px] border-2 border-white/20 relative overflow-hidden"
            >
              {!shouldReduceAnimations && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
              <span className="relative z-10">No 😢</span>
            </motion.button>
            
            {/* Enhanced Tooltip */}
            <AnimatePresence>
              {showTooltip && noAttempts > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-deep-rose to-valentine-red text-white px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap shadow-2xl border-2 border-white/30"
                  style={{
                    filter: 'drop-shadow(0 4px 12px rgba(184, 50, 96, 0.4))',
                  }}
                >
                  <span className="relative z-10">{cuteMessages[Math.min(noAttempts - 1, cuteMessages.length - 1)]}</span>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-valentine-red border-r-2 border-b-2 border-white/30" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Heart decorations - Simplified on mobile */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 relative z-10"
        >
          {[...Array(isMobile ? 3 : 5)].map((_, i) => (
            <motion.span
              key={i}
              className="text-2xl sm:text-3xl drop-shadow-lg"
              animate={shouldReduceAnimations ? {} : {
                y: [0, -10, 0],
                rotate: [0, 12, -12, 0],
                scale: [1, 1.08, 1],
              }}
              transition={shouldReduceAnimations ? {} : {
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              💕
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
})

ValentineQuestion.displayName = 'ValentineQuestion'

export default ValentineQuestion
