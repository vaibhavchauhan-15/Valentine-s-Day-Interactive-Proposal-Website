import { motion } from 'framer-motion'
import { memo, useMemo } from 'react'
import { WILL_CHANGE } from '../constants/animations'

const FloatingHearts = memo(() => {
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  
  const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘']

  // Reduced heart count for better performance (12 -> 8)
  // Memoize heart configurations for consistent animations
  const heartConfigs = useMemo(() => {
    return Array.from({ length: 8 }, (_, index) => {
      const randomX = (index * (screenWidth / 8)) + (Math.random() * 50)
      const swayAmount = 80 + (index % 3) * 30
      const fontSize = 24 + (index % 2) * 6
      const duration = 16 + (index % 3) * 2 // Slightly faster
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
  }, [screenWidth])

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
            x: [
              config.randomX,
              config.randomX + config.swayAmount,
              config.randomX - config.swayAmount / 2,
              config.randomX + config.swayAmount / 3,
              config.randomX
            ],
            opacity: [0, 0.35, 0.4, 0.35, 0],
            rotate: [0, 180, 360, 540, 720],
            scale: [0.6, 0.8, 0.75, 0.7, 0.5]
          }}
          transition={{
            duration: config.duration,
            repeat: Infinity,
            delay: config.delay,
            ease: 'linear',
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
          style={{
            fontSize: `${config.fontSize}px`,
            ...WILL_CHANGE.transformOpacity,
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
