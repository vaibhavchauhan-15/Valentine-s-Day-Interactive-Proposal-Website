import { motion } from 'framer-motion'
import { useEffect, memo, useMemo } from 'react'
import { EASING, DURATION, WILL_CHANGE } from '../constants/animations'

const PlatterTransitionScreen = memo(({ onComplete }) => {
  // Memoize random positions to prevent recalculation on each render
  // Reduced from 15 to 12 for better performance
  const floatingHearts = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 1.4,
      duration: 2.8 + Math.random() * 1.8,
      emoji: ['❤️', '💕', '💖', '💗'][i % 4]
    })), []
  )

  const sparkles = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i * Math.PI * 2) / 8,
      delay: 1.7 + i * 0.075
    })), []
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3300)
    
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION.normal, ease: "easeInOut" }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-peach-glow via-lavender-mist to-blush overflow-hidden romantic-vignette"
    >
      {/* Ornate lace pattern overlay */}
      <div className="absolute inset-0 lace-pattern opacity-40" />
      
      {/* Vintage paper texture */}
      <div className="absolute inset-0 paper-texture" />
      
      {/* Enhanced Animated Background Layer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-romantic-300/20 via-romantic-200/30 to-valentine-lavender/20"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Radial Glow Effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(255, 77, 109, 0.15) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(255, 192, 203, 0.2) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(255, 77, 109, 0.15) 0%, transparent 70%)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Decorative corner flourishes - Optimized */}
      {[
        { position: 'top-8 left-8', rotate: 0, delay: 0.4 },
        { position: 'top-8 right-8', rotate: 90, delay: 0.6 },
        { position: 'bottom-8 left-8', rotate: -90, delay: 0.8 },
        { position: 'bottom-8 right-8', rotate: 180, delay: 1.0 },
      ].map((corner, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ delay: corner.delay, duration: 0.7, ...EASING.softSpring }}
          className={`absolute ${corner.position} text-6xl text-romantic-400`}
          style={{ rotate: `${corner.rotate}deg`, filter: 'drop-shadow(0 2px 8px rgba(255, 77, 109, 0.3))', ...WILL_CHANGE.transform }}
        >
          ❦
        </motion.div>
      ))}
      
      {/* Floating hearts background - Optimized with better effects */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-2xl md:text-3xl filter drop-shadow-lg"
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            ...WILL_CHANGE.transformOpacity,
          }}
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{
            y: [-25, 0, -25],
            opacity: [0, 0.75, 0.6, 0.75, 0],
            scale: [0.8, 1.15, 0.9, 1.15, 0.8],
            rotate: [0, 10, -10, 10, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: [0.4, 0, 0.2, 1],
            repeatType: "loop",
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}

      {/* Main animation container */}
      <div className="relative will-change-transform">
        {/* Platter */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            type: "spring",
            stiffness: 100,
            damping: 12,
          }}
          className="relative will-change-transform"
        >
          {/* Platter base - Enhanced with better depth and shine */}
          <motion.div
            className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-gray-200 via-pearl-white to-gray-300 shadow-2xl relative overflow-hidden will-change-transform"
            animate={{
              boxShadow: [
                "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 30px rgba(255, 77, 109, 0.2)",
                "0 30px 60px -12px rgba(255, 77, 109, 0.4), 0 15px 40px rgba(255, 77, 109, 0.3)",
                "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 30px rgba(255, 77, 109, 0.2)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
              repeatType: "reverse",
            }}
          >
            {/* Enhanced metallic shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Plate details/rim */}
            <motion.div
              className="absolute inset-4 rounded-full border-4 border-white/40 shadow-inner"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                borderColor: ['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.4)'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse",
              }}
            />
            
            {/* Inner plate ring for depth */}
            <motion.div
              className="absolute inset-8 rounded-full border-2 border-gray-300/30"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse",
              }}
            />
            
            {/* Main food item with steam effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Steam particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`steam-${i}`}
                  className="absolute text-xl opacity-60"
                  initial={{ opacity: 0, y: 20, x: -10 + i * 10 }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    y: [20, -40],
                    x: [-10 + i * 10, -5 + i * 10],
                    scale: [0.8, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1.2 + i * 0.3,
                    ease: "easeOut",
                  }}
                >
                  💨
                </motion.div>
              ))}
              
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -180 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  rotate: 0,
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ 
                  delay: 0.9, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 120,
                  damping: 10,
                }}
                className="text-6xl md:text-8xl will-change-transform filter drop-shadow-xl cursor-pointer"
              >
                🍝
              </motion.div>
            </div>

            {/* Additional food decorations with hover effects */}
            {[
              { emoji: '🍷', delay: 1.1, position: 'top-8 left-12' },
              { emoji: '🥖', delay: 1.2, position: 'top-12 right-8' },
              { emoji: '🧀', delay: 1.3, position: 'bottom-16 left-8' },
              { emoji: '🥗', delay: 1.4, position: 'bottom-12 right-12' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0, y: -40 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  y: 0,
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
                transition={{
                  delay: item.delay,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 140,
                  damping: 10,
                }}
                className={`absolute ${item.position} text-3xl md:text-4xl will-change-transform filter drop-shadow-lg cursor-pointer`}
              >
                {item.emoji}
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced sparkles with glow effect */}
          {sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              className="absolute text-2xl md:text-3xl will-change-transform"
              style={{
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.4, 0],
                opacity: [0, 1, 0.9, 0],
                x: [0, Math.cos(sparkle.angle) * 180],
                y: [0, Math.sin(sparkle.angle) * 180],
                rotate: [0, 360, 720],
              }}
              transition={{
                duration: 1.5,
                delay: sparkle.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              ✨
            </motion.div>
          ))}
        </motion.div>

        {/* Spoon and Fork crossing animation - Enhanced with shine */}
        <motion.div
          className="absolute top-1/2 left-1/2 will-change-transform"
          style={{ x: '-50%', y: '-50%' }}
        >
          {/* Fork from left with shine effect */}
          <motion.div
            initial={{ x: -400, y: -100, rotate: -90, opacity: 0 }}
            animate={{ 
              x: -60, 
              y: -30, 
              rotate: -25, 
              opacity: 1 
            }}
            whileHover={{ 
              scale: 1.1, 
              rotate: -20,
              filter: 'drop-shadow(0 0 8px rgba(255, 77, 109, 0.6))' 
            }}
            transition={{
              delay: 1.7,
              duration: 0.7,
              type: "spring",
              stiffness: 90,
              damping: 12,
            }}
            className="absolute text-5xl md:text-6xl filter drop-shadow-2xl will-change-transform cursor-pointer"
          >
            🍴
          </motion.div>

          {/* Spoon from right with shine effect */}
          <motion.div
            initial={{ x: 400, y: -100, rotate: 90, opacity: 0 }}
            animate={{ 
              x: 40, 
              y: -30, 
              rotate: 25, 
              opacity: 1 
            }}
            whileHover={{ 
              scale: 1.1, 
              rotate: 20,
              filter: 'drop-shadow(0 0 8px rgba(255, 77, 109, 0.6))' 
            }}
            transition={{
              delay: 1.7,
              duration: 0.7,
              type: "spring",
              stiffness: 90,
              damping: 12,
            }}
            className="absolute text-5xl md:text-6xl filter drop-shadow-2xl will-change-transform cursor-pointer"
          >
            🥄
          </motion.div>
          
          {/* Crossing sparkle effect */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180],
            }}
            transition={{
              delay: 2.4,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="absolute text-3xl will-change-transform"
            style={{ 
              x: '-10px', 
              y: '-30px',
              filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.9))' 
            }}
          >
            ⭐
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Message with ornate typography */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          delay: 2.2, 
          duration: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 12,
        }}
        className="absolute bottom-20 md:bottom-32 text-center px-6 will-change-transform max-w-2xl"
      >
        {/* Ornate decorative frame */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-romantic-400 to-transparent"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-romantic-400 to-transparent"
        />
        
        <motion.div
          className="py-6"
          animate={{
            textShadow: [
              '2px 2px 12px rgba(184, 50, 96, 0.4), 0 0 30px rgba(248, 200, 220, 0.3)',
              '2px 2px 16px rgba(184, 50, 96, 0.6), 0 0 40px rgba(248, 200, 220, 0.5)',
              '2px 2px 12px rgba(184, 50, 96, 0.4), 0 0 30px rgba(248, 200, 220, 0.3)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Decorative quotation marks */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.4, x: 0 }}
            transition={{ delay: 2.8 }}
            className="absolute -left-2 top-4 text-6xl font-elegant text-romantic-400 leading-none"
          >
            "
          </motion.span>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-romantic font-bold text-valentine-red mb-2 italic tracking-wide relative">
            Preparing your romantic dinner
          </h2>
          
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.4, x: 0 }}
            transition={{ delay: 2.8 }}
            className="absolute -right-2 bottom-4 text-6xl font-elegant text-romantic-400 leading-none"
          >
            "
          </motion.span>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
            className="text-lg md:text-xl font-body text-deep-rose/90 mt-3 font-medium tracking-wider"
          >
            A magical evening awaits
          </motion.p>
        </motion.div>
        
        {/* Decorative candles with ornate holders */}
        <motion.div
          className="flex justify-center gap-6 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="relative"
            >
              {/* Candle flame */}
              <motion.span
                className="text-4xl block"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              >
                🕯️
              </motion.span>
              {/* Ornate candle holder base */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 2.8 + i * 0.1 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl text-soft-gold"
              >
                ❖
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
})

PlatterTransitionScreen.displayName = 'PlatterTransitionScreen'

export default PlatterTransitionScreen
