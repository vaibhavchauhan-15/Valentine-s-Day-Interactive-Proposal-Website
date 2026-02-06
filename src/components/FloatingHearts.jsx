import { motion } from 'framer-motion'

const FloatingHearts = () => {
  const hearts = Array.from({ length: 12 })
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  
  const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘']

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ willChange: 'transform' }}>
      {hearts.map((_, index) => {
        const randomX = Math.random() * screenWidth
        const targetX = randomX + (Math.random() - 0.5) * 200
        const fontSize = Math.random() * 12 + 18
        const randomHeart = heartEmojis[Math.floor(Math.random() * heartEmojis.length)]
        const duration = Math.random() * 8 + 12
        
        return (
          <motion.div
            key={index}
            className="absolute text-valentine-red"
            initial={{
              x: randomX,
              y: screenHeight + 50,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: -100,
              x: targetX,
              opacity: [0, 0.4, 0.3, 0],
              rotate: Math.random() * 720 - 360,
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'linear',
            }}
            style={{
              fontSize: `${fontSize}px`,
              willChange: 'transform, opacity',
              transform: 'translate3d(0,0,0)',
            }}
          >
            {randomHeart}
          </motion.div>
        )
      })}
    </div>
  )
}

export default FloatingHearts
