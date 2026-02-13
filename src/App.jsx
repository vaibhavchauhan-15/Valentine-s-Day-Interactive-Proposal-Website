import { useState, useEffect, memo, useCallback } from 'react'
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import { useThrottledMouseMove } from './hooks/useOptimizedAnimation'
import { SCREEN_TRANSITIONS, DURATION, EASING, WILL_CHANGE } from './constants/animations'
import PreloaderScreen from './components/PreloaderScreen'
import GiftBoxScreen from './components/GiftBoxScreen'
import ValentineQuestion from './components/ValentineQuestion'
import DateOptionsScreen from './components/DateOptionsScreen'
import FinalScreen from './components/FinalScreen'
import FloatingHearts from './components/FloatingHearts'

function App() {
  const [loading, setLoading] = useState(true)
  const [screen, setScreen] = useState('gift') // gift, question, options, final
  const [selectedOption, setSelectedOption] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Preloader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1700)
    
    return () => clearTimeout(timer)
  }, [])

  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15
    const y = (e.clientY / window.innerHeight - 0.5) * 15
    setMousePosition({ x, y })
  }, [])

  const throttledMouseMove = useThrottledMouseMove(handleMouseMove, 50)
  
  // Track mouse position for parallax effect
  useEffect(() => {
    window.addEventListener('mousemove', throttledMouseMove)
    return () => window.removeEventListener('mousemove', throttledMouseMove)
  }, [throttledMouseMove])

  const handleGiftOpen = () => {
    setScreen('question')
  }

  const handleYes = () => {
    setScreen('options')
  }

  const handleDateSelection = (option) => {
    setSelectedOption(option)
    setTimeout(() => {
      setScreen('final')
    }, 2300)
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
            {/* Animated mesh gradient background with parallax - Optimized */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-deep-rose/20 via-blush/30 to-elegant-maroon/20"
              style={{
                x: mousePosition.x,
                y: mousePosition.y,
                ...WILL_CHANGE.transform,
              }}
              transition={{ type: 'spring', stiffness: 45, damping: 25 }}
            />
            
            {/* Slow animated gradient overlay - Optimized */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-valentine-pink/20 via-transparent to-soft-gold/10"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{ 
                backgroundSize: '200% 200%',
                ...WILL_CHANGE.opacity,
              }}
            />
            
            {/* Blurred depth layer - Optimized */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-bl from-elegant-maroon/10 via-transparent to-deep-rose/10"
              style={{
                x: mousePosition.x * -0.4,
                y: mousePosition.y * -0.4,
                filter: 'blur(55px)',
                ...WILL_CHANGE.transform,
              }}
              transition={{ type: 'spring', stiffness: 25, damping: 25 }}
            />
      
            <FloatingHearts />
            
            <AnimatePresence mode="wait">
              {screen === 'gift' && (
                <motion.div
                  key="gift"
                  {...SCREEN_TRANSITIONS.fadeScale}
                >
                  <GiftBoxScreen onOpen={handleGiftOpen} />
                </motion.div>
              )}
              
              {screen === 'question' && (
                <motion.div
                  key="question"
                  {...SCREEN_TRANSITIONS.slideLeft}
                >
                  <ValentineQuestion onYes={handleYes} />
                </motion.div>
              )}
              
              {screen === 'options' && (
                <motion.div
                  key="options"
                  {...SCREEN_TRANSITIONS.slideUp}
                >
                  <DateOptionsScreen onSelect={handleDateSelection} />
                </motion.div>
              )}
              
              {screen === 'final' && (
                <motion.div
                  key="final"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: DURATION.slow, ease: EASING.smooth }}
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
