import { motion } from 'framer-motion'
import { useState, useEffect, memo, useRef, useMemo } from 'react'
import { EASING, DURATION, getWillChange } from '../constants/animations'
import { useDeviceDetection } from '../utils/deviceDetection'

const FinalScreen = memo(({ selectedOption }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [musicEnabled, setMusicEnabled] = useState(true)
  const audioRef = useRef(null)
  const fullText = "Can't wait to spend Valentine's Day with you! ❤️"
  
  // Device detection for performance optimization
  const { isMobile, isTablet, performanceTier } = useDeviceDetection()
  
  // Adaptive confetti count based on device
  const confettiCount = useMemo(() => {
    if (isMobile) return 8 // Mobile: 8 hearts
    if (isTablet) return 12 // Tablet: 12 hearts
    if (performanceTier === 'low') return 10 // Low-end: 10 hearts
    return 22 // Desktop: 22 hearts
  }, [isMobile, isTablet, performanceTier])
  
  // Simplify animations on mobile
  const simplifyAnimations = useMemo(() => isMobile || performanceTier === 'low', [isMobile, performanceTier])
  
  // Smart will-change
  const willChangeStyle = useMemo(() => 
    getWillChange('transformOpacity', isMobile, performanceTier), 
    [isMobile, performanceTier]
  )

  // Typewriter effect - Optimized
  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 45)
    
    return () => clearInterval(interval)
  }, [])

  // Music control
  useEffect(() => {
    if (audioRef.current) {
      if (musicEnabled) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err))
      } else {
        audioRef.current.pause()
      }
    }
  }, [musicEnabled])

  // Auto-play music on mount - Not on mobile to save battery
  useEffect(() => {
    if (audioRef.current && !isMobile) {
      audioRef.current.volume = 0.5
      audioRef.current.play().catch(err => {
        console.log('Auto-play failed:', err)
        setMusicEnabled(false)
      })
    }
  }, [isMobile])

  const optionMessages = {
    movie: '🎬 Movie night under the stars with you',
    dinner: '🍽️ A romantic dinner by candlelight',
    drive: '🚗 A scenic drive with endless conversations',
    camping: '⛺ Camping under the stars together',
  }

  // Memoize confetti configuration for better performance - Adaptive count
  const confettiHearts = useMemo(() => 
    Array.from({ length: confettiCount }, (_, i) => ({
      delay: (i * 0.14) % 2.8,
      duration: simplifyAnimations ? 5 + (i % 2) * 0.5 : 4.5 + (i % 3) * 0.5,
      xOffset: (i % 5) * 20,
      emoji: ['❤️', '💕', '💖', '💗', '💝', '💘'][i % 6]
    })), [confettiCount, simplifyAnimations])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: [0.95, 1, 1.01, 1],
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2.5, ease: EASING.smooth }}
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4"
    >
      {/* Audio element - Lazy preload on desktop only */}
      <audio 
        ref={audioRef} 
        src="/song/song1.mp3" 
        loop 
        preload={isMobile ? "none" : "auto"}
      />

      {/* Enhanced Music control button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, ...EASING.bouncySpring }}
        onClick={() => setMusicEnabled(!musicEnabled)}
        className="fixed top-8 right-8 z-50 bg-gradient-to-r from-deep-rose to-valentine-red backdrop-blur-md text-white p-4 rounded-full shadow-2xl border-2 border-white/30"
        whileHover={{ 
          scale: 1.12, 
          rotate: 12,
          boxShadow: "0 10px 30px rgba(184, 50, 96, 0.5)"
        }}
        whileTap={{ scale: 0.9 }}
        title={musicEnabled ? 'Music On' : 'Music Off'}
        style={willChangeStyle}
      >
        <span className="text-2xl drop-shadow-lg">{musicEnabled ? '🔊' : '🔇'}</span>
      </motion.button>

      {/* Smooth Confetti Hearts - Adaptive count and simplified on mobile */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {confettiHearts.map((heart, i) => (
          <motion.div
            key={i}
            className={`absolute drop-shadow-lg ${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'}`}
            style={{
              left: `${(i * (100 / confettiCount)) % 100}%`,
              top: -50,
              ...willChangeStyle,
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 900,
              x: simplifyAnimations ? [
                0,
                Math.sin(i) * 80 + heart.xOffset / 2,
                0
              ] : [
                0,
                Math.sin(i) * 140 + heart.xOffset,
                Math.cos(i) * 90 - heart.xOffset,
                0
              ],
              rotate: simplifyAnimations ? [0, 360] : [0, 180, 360, 540],
              scale: simplifyAnimations ? [0.7, 1, 0.8] : [0.7, 1, 0.9, 0.8],
              opacity: [0, 0.85, 0.85, 0],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: 'linear',
              times: simplifyAnimations ? [0, 0.5, 1] : [0, 0.3, 0.7, 1],
            }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </div>

      {/* Main Content - Enhanced with ornate romantic styling */}
      <motion.div
        className="glass-romantic rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl max-w-3xl w-full text-center relative z-10 mx-4 overflow-hidden border-2 border-white/50 paper-texture"
        initial={{ scale: 0, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 15,
          delay: 0.2,
        }}
      >
        {/* Lace pattern overlay */}
        <div className="absolute inset-0 lace-pattern opacity-20 pointer-events-none" />
        
        {/* Enhanced shimmer effect - Disabled on mobile */}
        {!shouldReduceAnimations && (
          <motion.div
            className="absolute inset-0 opacity-15"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent)',
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
        
        {/* Ornate corner flourishes - Reduced on mobile */}
        {!isMobile && [
          { corner: 'top-4 left-4', rotate: 0 },
          { corner: 'top-4 right-4', rotate: 90 },
          { corner: 'bottom-4 left-4', rotate: -90 },
          { corner: 'bottom-4 right-4', rotate: 180 },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
            className={`absolute ${item.corner} text-4xl text-romantic-400 pointer-events-none`}
            style={{ rotate: `${item.rotate}deg` }}
          >
            ❦
          </motion.div>
        ))}
        
        {/* Decorative divider lines */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-romantic-300 to-transparent"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-romantic-300 to-transparent"
        />
        
        {/* Floating hearts decoration inside card - Reduced on mobile */}
        {!shouldReduceAnimations && [...Array(isMobile ? 3 : 6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl sm:text-3xl opacity-15 pointer-events-none"
            style={{
              left: `${15 + (i % 3) * 35}%`,
              top: `${20 + Math.floor(i / 3) * 60}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          >
            💕
          </motion.div>
        ))}
        
        {/* Pulsing heart - Enhanced with ornamental frame */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
          className="relative inline-block mb-4 sm:mb-6"
        >
          {/* Ornamental circle around heart */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' }}
          >
            <svg width="180" height="180" className="absolute">
              <circle
                cx="90"
                cy="90"
                r="70"
                fill="none"
                stroke="url(#heartGradient)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF4D6D" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#B83260" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          
          <motion.div
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl relative z-10"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(255, 77, 109, 0.5))',
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            💝
          </motion.div>
        </motion.div>

        {/* Main message with typewriter effect - Enhanced with ornate typography */}
        <motion.div
          className="relative mb-4 sm:mb-6 px-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        >
          {/* Decorative quotation marks */}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: 1.5, type: 'spring' }}
            className="absolute -left-4 sm:-left-8 top-0 text-5xl sm:text-6xl font-elegant text-romantic-400 leading-none hidden sm:block"
          >
            "
          </motion.span>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-romantic font-bold text-deep-rose text-shadow-glow leading-tight tracking-tight relative z-10 min-h-[80px] sm:min-h-[100px] flex items-center justify-center italic">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-valentine-red ml-1"
            >
              |
            </motion.span>
          </h1>
          
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: 1.5, type: 'spring' }}
            className="absolute -right-4 sm:-right-8 bottom-0 text-5xl sm:text-6xl font-elegant text-romantic-400 leading-none hidden sm:block"
          >
            "
          </motion.span>
        </motion.div>

        {/* Selected option message - Enhanced with elegant divider */}
        <motion.div
          className="relative mb-6 sm:mb-8 px-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3, type: "spring", stiffness: 100 }}
        >
          {/* Decorative divider above */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 3.2, duration: 0.5 }}
            className="flex items-center justify-center mb-4 gap-3"
          >
            <span className="text-sm text-romantic-400">❦</span>
            <div className="flex-1 max-w-[100px] h-[1px] bg-gradient-to-r from-transparent via-romantic-300 to-transparent" />
            <span className="text-xs text-romantic-400">✦</span>
            <div className="flex-1 max-w-[100px] h-[1px] bg-gradient-to-r from-transparent via-romantic-300 to-transparent" />
            <span className="text-sm text-romantic-400">❦</span>
          </motion.div>
          
          <p
            className="text-lg sm:text-xl md:text-2xl font-body text-deep-rose font-semibold relative z-10 leading-relaxed tracking-wide"
            style={{
              textShadow: '0 2px 8px rgba(184, 50, 96, 0.2)',
            }}
          >
            {optionMessages[selectedOption] || '💖 An amazing day together'}
          </p>
          
          {/* Decorative divider below */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 3.4, duration: 0.5 }}
            className="flex items-center justify-center mt-4 gap-3"
          >
            <span className="text-sm text-romantic-400">❦</span>
            <div className="flex-1 max-w-[100px] h-[1px] bg-gradient-to-r from-transparent via-romantic-300 to-transparent" />
            <span className="text-xs text-romantic-400">✦</span>
            <div className="flex-1 max-w-[100px] h-[1px] bg-gradient-to-r from-transparent via-romantic-300 to-transparent" />
            <span className="text-sm text-romantic-400">❦</span>
          </motion.div>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          className="flex justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 relative z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 3.5, type: "spring", stiffness: 150 }}
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
          className="text-base sm:text-lg md:text-xl font-body text-gray-700 italic px-4 relative z-10 leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 4, type: "spring", stiffness: 100 }}
        >
          "Every moment with you is my favorite moment" 💕
        </motion.p>

        {/* Floating hearts around the card - Reduced on mobile */}
        {!shouldReduceAnimations && [...Array(isMobile ? 4 : 8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-lg"
            style={{
              left: `${(Math.cos((i * Math.PI * 2) / (isMobile ? 4 : 8)) + 1) * 50}%`,
              top: `${(Math.sin((i * Math.PI * 2) / (isMobile ? 4 : 8)) + 1) * 50}%`,
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
})

FinalScreen.displayName = 'FinalScreen'

export default FinalScreen
