import { motion } from 'framer-motion'
import { memo, useMemo } from 'react'
import { WILL_CHANGE, getWillChange } from '../constants/animations'

const FloatingHearts = memo(({ isMobile = false, isTablet = false, performanceTier = 'high' }) => {
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  
  const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘']

  // Adaptive heart count based on device - Optimized for performance
  const heartCount = useMemo(() => {
    if (isMobile) return 4 // Mobile: 4 hearts
    if (isTablet) return 6 // Tablet: 6 hearts
    if (performanceTier === 'low') return 5 // Low-end: 5 hearts
    return 8 // Desktop: 8 hearts
  }, [isMobile, isTablet, performanceTier])

  // Simplified animations for mobile devices
  const simplifyAnimations = useMemo(() => isMobile || performanceTier === 'low', [isMobile, performanceTier])
  
  // Smart will-change application
  const willChangeStyle = useMemo(() => 
    getWillChange('transformOpacity', isMobile, performanceTier), 
    [isMobile, performanceTier]
  )

  // Memoize heart configurations for consistent animations
  const heartConfigs = useMemo(() => {
    return Array.from({ length: heartCount }, (_, index) => {
      const randomX = (index * (screenWidth / heartCount)) + (Math.random() * 50)
      const swayAmount = simplifyAnimations ? 50 : 80 + (index % 3) * 30
      const fontSize = isMobile ? 20 + (index % 2) * 4 : 24 + (index % 2) * 6
      const duration = simplifyAnimations ? 18 + (index % 2) * 2 : 16 + (index % 3) * 2
      const delay = (index * 1.8) % 7
      
      return {
        randomX,
        swayAmount,
        fontSize,
        duration,
        delay,
        emoji: heartEmojis[index % heartEmojis.length]
      }
    })
  }, [screenWidth, heartCount, simplifyAnimations, isMobile])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {heartConfigs.map((config, index) => (
        <motion.div
          key={index}
          className="absolute text-deep-rose"
          initial={{
            x: config.randomX,
            y: screenHeight + 50,
            scale: 0.6,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: -120,
            x: simplifyAnimations ? [
              config.randomX,
              config.randomX + config.swayAmount,
              config.randomX
            ] : [
              config.randomX,
              config.randomX + config.swayAmount,
              config.randomX - config.swayAmount / 2,
              config.randomX + config.swayAmount / 3,
              config.randomX
            ],
            opacity: [0, 0.35, 0.4, 0.35, 0],
            rotate: simplifyAnimations ? [0, 360, 720] : [0, 180, 360, 540, 720],
            scale: simplifyAnimations ? [0.6, 0.8, 0.5] : [0.6, 0.8, 0.75, 0.7, 0.5]
          }}
          transition={{
            duration: config.duration,
            repeat: Infinity,
            delay: config.delay,
            ease: 'linear',
            times: simplifyAnimations ? [0, 0.5, 1] : [0, 0.25, 0.5, 0.75, 1],
          }}
          style={{
            fontSize: `${config.fontSize}px`,
            ...willChangeStyle,
          }}
        >
          {config.emoji}
        </motion.div>
      ))}
    </div>
  )
})

FloatingHearts.displayName = 'FloatingHearts'

export default FloatingHearts
