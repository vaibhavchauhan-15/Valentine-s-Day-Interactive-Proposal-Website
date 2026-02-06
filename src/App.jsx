import { useState, useEffect, memo } from 'react'
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import PreloaderScreen from './components/PreloaderScreen'
import GiftBoxScreen from './components/GiftBoxScreen'
import ValentineQuestion from './components/ValentineQuestion'
import DateOptionsScreen from './components/DateOptionsScreen'
import PlatterTransitionScreen from './components/PlatterTransitionScreen'
import FinalScreen from './components/FinalScreen'
import FloatingHearts from './components/FloatingHearts'

function App() {
  const [loading, setLoading] = useState(true)
  const [screen, setScreen] = useState('gift') // gift, question, options, platterTransition, final
  const [selectedOption, setSelectedOption] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Preloader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1800)
    
    return () => clearTimeout(timer)
  }, [])
  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleGiftOpen = () => {
    setScreen('question')
  }

  const handleYes = () => {
    setScreen('options')
  }

  const handleDateSelection = (option) => {
    setSelectedOption(option)
    if (option === 'dinner') {
      setScreen('platterTransition')
    } else {
      setTimeout(() => {
        setScreen('final')
      }, 2500)
    }
  }

  const handlePlatterComplete = () => {
    setScreen('final')
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen h-screen w-full overflow-hidden relative bg-gradient-to-br from-warm-cream via-blush to-valentine-lavender">
        {/* Show preloader */}
        <AnimatePresence mode="wait">
          {loading && <PreloaderScreen key="preloader" />}
        </AnimatePresence>
        
        {/* Main content - only show after loading */}
        {!loading && (
          <>
            {/* Animated mesh gradient background with parallax */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-deep-rose/20 via-blush/30 to-elegant-maroon/20"
              style={{
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              transition={{ type: 'spring', stiffness: 50, damping: 30 }}
            />
            
            {/* Slow animated gradient overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-valentine-pink/20 via-transparent to-soft-gold/10"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{ 
                backgroundSize: '200% 200%',
              }}
            />
            
            {/* Blurred depth layer */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-bl from-elegant-maroon/10 via-transparent to-deep-rose/10"
              style={{
                x: mousePosition.x * -0.5,
                y: mousePosition.y * -0.5,
                filter: 'blur(60px)',
              }}
              transition={{ type: 'spring', stiffness: 30, damping: 30 }}
            />
      
            <FloatingHearts />
            
            <AnimatePresence mode="wait">
              {screen === 'gift' && (
                <motion.div
                  key="gift"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <GiftBoxScreen onOpen={handleGiftOpen} />
                </motion.div>
              )}
              
              {screen === 'question' && (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ValentineQuestion onYes={handleYes} />
                </motion.div>
              )}
              
              {screen === 'options' && (
                <motion.div
                  key="options"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <DateOptionsScreen onSelect={handleDateSelection} />
                </motion.div>
              )}
              
              {screen === 'platterTransition' && (
                <motion.div
                  key="platter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PlatterTransitionScreen onComplete={handlePlatterComplete} />
                </motion.div>
              )}
              
              {screen === 'final' && (
                <motion.div
                  key="final"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <FinalScreen selectedOption={selectedOption} />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </LazyMotion>
  )
}

export default App
