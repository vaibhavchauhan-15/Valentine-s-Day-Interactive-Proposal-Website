import { motion } from 'framer-motion'

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 })

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {hearts.map((_, index) => (
        <motion.div
          key={index}
          className="absolute text-valentine-red opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: -100,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
          style={{
            fontSize: `${Math.random() * 20 + 20}px`,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingHearts
