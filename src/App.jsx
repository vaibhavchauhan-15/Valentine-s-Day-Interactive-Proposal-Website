import { useState, useEffect, memo, useCallback, useMemo, lazy, Suspense } from 'react'
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import { useThrottledMouseMove } from './hooks/useOptimizedAnimation'
import { SCREEN_TRANSITIONS, DURATION, EASING, WILL_CHANGE } from './constants/animations'
import { useDeviceDetection } from './utils/deviceDetection'
import { preloadImagesWithPriority, CRITICAL_IMAGES, NORMAL_PRIORITY_IMAGES, LOW_PRIORITY_IMAGES } from './utils/imagePreloader'
import PreloaderScreen from './components/PreloaderScreen'
import GiftBoxScreen from './components/GiftBoxScreen'
import FloatingHearts from './components/FloatingHearts'

// Lazy load non-critical screens for better code splitting
const ValentineQuestion = lazy(() => import('./components/ValentineQuestion'))
const DateOptionsScreen = lazy(() => import('./components/DateOptionsScreen'))
const FinalScreen = lazy(() => import('./components/FinalScreen'))

// Fallback component for lazy-loaded screens
const ScreenFallback = memo(() => (
  <div className="fixed inset-0 flex items-center justify-center z-10">
    <motion.div
      className="text-4xl"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      💕
    </motion.div>
  </div>
))

function App() {
  const [loading, setLoading] = useState(true)
  const [screen, setScreen] = useState('gift') // gift, question, options, final
  const [selectedOption, setSelectedOption] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Device detection for performance optimization
  const { isMobile, isTablet, performanceTier } = useDeviceDetection()
  const shouldUseParallax = useMemo(() => !isMobile && !isTablet, [isMobile, isTablet])

  // Preloader effect with image preloading
  useEffect(() => {
    // Start preloading images
    preloadImagesWithPriority({
      critical: CRITICAL_IMAGES,
      normal: NORMAL_PRIORITY_IMAGES,
      low: isMobile ? [] : LOW_PRIORITY_IMAGES, // Skip GIF on mobile
    })
    
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1700)
    
    return () => clearTimeout(timer)
  }, [isMobile])

  // Throttled mouse move handler for better performance - disabled on mobile
  const handleMouseMove = useCallback((e) => {
    if (!shouldUseParallax) return
    const x = (e.clientX / window.innerWidth - 0.5) * 15
    const y = (e.clientY / window.innerHeight - 0.5) * 15
    setMousePosition({ x, y })
  }, [shouldUseParallax])

  const throttledMouseMove = useThrottledMouseMove(handleMouseMove, 50)
  
  // Track mouse position for parallax effect - only on desktop
  useEffect(() => {
    if (!shouldUseParallax) return
    window.addEventListener('mousemove', throttledMouseMove)
    return () => window.removeEventListener('mousemove', throttledMouseMove)
  }, [throttledMouseMove, shouldUseParallax])

  const handleGiftOpen = () => {
    setScreen('question')
  }

  const handleYes = () => {
    setScreen('options')
  }

  const handleDateSelection = (option) => {
    setSelectedOption(option)
    // Shorter delay for smoother transition
    setTimeout(() => {
      setScreen('final')
    }, 1200)
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
            {/* Animated mesh gradient background with parallax - Optimized for mobile */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-deep-rose/20 via-blush/30 to-elegant-maroon/20"
              style={{
                x: shouldUseParallax ? mousePosition.x : 0,
                y: shouldUseParallax ? mousePosition.y : 0,
                ...(shouldUseParallax && WILL_CHANGE.transform),
              }}
              transition={shouldUseParallax ? { type: 'spring', stiffness: 45, damping: 25 } : { duration: 0 }}
            />
            
            {/* Slow animated gradient overlay - Simplified on mobile */}
            {performanceTier !== 'low' && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-valentine-pink/20 via-transparent to-soft-gold/10"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: isMobile ? 20 : 14,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{ 
                  backgroundSize: '200% 200%',
                  ...WILL_CHANGE.opacity,
                }}
              />
            )}
            
            {/* Blurred depth layer - Disabled on mobile for performance */}
            {shouldUseParallax && (
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
            )}
      
            <FloatingHearts isMobile={isMobile} isTablet={isTablet} performanceTier={performanceTier} />
            
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
                <Suspense fallback={<ScreenFallback />}>
                  <motion.div
                    key="question"
                    {...SCREEN_TRANSITIONS.slideLeft}
                  >
                    <ValentineQuestion onYes={handleYes} />
                  </motion.div>
                </Suspense>
              )}
              
              {screen === 'options' && (
                <Suspense fallback={<ScreenFallback />}>
                  <motion.div
                    key="options"
                    {...SCREEN_TRANSITIONS.slideUp}
                  >
                    <DateOptionsScreen onSelect={handleDateSelection} />
                  </motion.div>
                </Suspense>
              )}
              
              {screen === 'final' && (
                <Suspense fallback={<ScreenFallback />}>
                  <motion.div
                    key="final"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: DURATION.slow, ease: EASING.smooth }}
                  >
                    <FinalScreen selectedOption={selectedOption} />
                  </motion.div>
                </Suspense>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </LazyMotion>
  )
}

export default App
