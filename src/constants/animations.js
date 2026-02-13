// Animation Constants and Configurations
// Centralized animation settings for consistent, optimized animations

// Easing functions - Using standard cubic-bezier values
export const EASING = {
  smooth: [0.22, 1, 0.36, 1], // Smooth ease-out-expo
  elastic: [0.68, -0.55, 0.265, 1.55], // Elastic bounce
  softSpring: { type: 'spring', stiffness: 100, damping: 15 },
  fastSpring: { type: 'spring', stiffness: 300, damping: 20 },
  bouncySpring: { type: 'spring', stiffness: 200, damping: 10 },
  easeInOut: 'easeInOut',
  linear: 'linear',
}

// Transition durations (in seconds)
export const DURATION = {
  instant: 0.1,
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2,
  extraSlow: 2,
}

// Common transition configs
export const TRANSITIONS = {
  fade: {
    duration: DURATION.normal,
    ease: EASING.smooth,
  },
  fadefast: {
    duration: DURATION.fast,
    ease: EASING.smooth,
  },
  spring: EASING.softSpring,
  fastSpring: EASING.fastSpring,
  bouncySpring: EASING.bouncySpring,
  smooth: {
    duration: DURATION.normal,
    ease: EASING.smooth,
  },
}

// Animation variants for framer-motion
export const VARIANTS = {
  // Container variants with stagger
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: DURATION.fast },
    },
  },

  // Item variants
  item: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: EASING.softSpring,
    },
  },

  // Fade variants
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: TRANSITIONS.fade },
    exit: { opacity: 0, transition: TRANSITIONS.fadefast },
  },

  // Scale variants
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: TRANSITIONS.spring },
    exit: { opacity: 0, scale: 0.9, transition: TRANSITIONS.fadefast },
  },

  // Slide variants
  slideInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: TRANSITIONS.smooth },
    exit: { opacity: 0, y: -30, transition: TRANSITIONS.fadefast },
  },

  slideInDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: TRANSITIONS.smooth },
    exit: { opacity: 0, y: 30, transition: TRANSITIONS.fadefast },
  },

  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: TRANSITIONS.smooth },
    exit: { opacity: 0, x: 50, transition: TRANSITIONS.fadefast },
  },

  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: TRANSITIONS.smooth },
    exit: { opacity: 0, x: -50, transition: TRANSITIONS.fadefast },
  },
}

// Heart animation configs
export const HEART_ANIMATIONS = {
  float: {
    y: [-30, 0, -30],
    opacity: [0, 0.8, 0.6, 0.8, 0],
    scale: [0.8, 1.2, 0.9, 1.2, 0.8],
    rotate: [0, 10, -10, 10, 0],
  },
  pulse: {
    scale: [1, 1.2, 1],
    rotate: [0, 10, -10, 0],
  },
  twinkle: {
    opacity: [0.3, 1, 0.3],
    scale: [0.8, 1.2, 0.8],
  },
}

// Button animation configs
export const BUTTON_ANIMATIONS = {
  hover: {
    scale: 1.05,
    y: -4,
    transition: { duration: 0.2, ...EASING.fastSpring },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
  glow: {
    boxShadow: [
      '0 10px 30px rgba(184, 50, 96, 0.3)',
      '0 15px 40px rgba(184, 50, 96, 0.5)',
      '0 10px 30px rgba(184, 50, 96, 0.3)',
    ],
  },
}

// Shimmer effect config
export const SHIMMER_ANIMATION = {
  backgroundPosition: ['-200% 0', '200% 0'],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'linear',
  },
}

// Confetti/particle configs
export const PARTICLE_CONFIG = {
  count: {
    light: 8,
    medium: 15,
    heavy: 25,
  },
  duration: {
    min: 3,
    max: 6,
  },
}

// Screen transition configs
export const SCREEN_TRANSITIONS = {
  fadeScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: DURATION.normal, ease: EASING.smooth },
  },
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: DURATION.normal, ease: EASING.smooth },
  },
  slideLeft: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: DURATION.normal, ease: EASING.smooth },
  },
}

// Performance optimizations
export const WILL_CHANGE = {
  transform: { willChange: 'transform' },
  opacity: { willChange: 'opacity' },
  transformOpacity: { willChange: 'transform, opacity' },
  auto: { willChange: 'auto' },
  none: {}, // Use when will-change is not needed
}

/**
 * Smart will-change utility - only applies on desktop or high-performance devices
 * @param {string} property - 'transform', 'opacity', 'transformOpacity', or 'auto'
 * @param {boolean} isMobile - whether device is mobile
 * @param {string} performanceTier - 'low', 'medium', or 'high'
 * @returns {object} style object with will-change or empty object
 */
export const getWillChange = (property = 'transform', isMobile = false, performanceTier = 'high') => {
  // Skip will-change on mobile or low-end devices to save memory
  if (isMobile || performanceTier === 'low') {
    return WILL_CHANGE.none
  }
  return WILL_CHANGE[property] || WILL_CHANGE.none
}

/**
 * Temporarily apply will-change before animation, remove after
 * Use with useEffect in components
 */
export const useAnimationWillChange = (ref, property = 'transform', duration = 1000) => {
  if (typeof window === 'undefined' || !ref.current) return
  
  const element = ref.current
  element.style.willChange = property
  
  const timeoutId = setTimeout(() => {
    if (element) {
      element.style.willChange = 'auto'
    }
  }, duration)
  
  return () => {
    clearTimeout(timeoutId)
    if (element) {
      element.style.willChange = 'auto'
    }
  }
}

// Stagger configurations
export const STAGGER = {
  fast: {
    staggerChildren: 0.05,
    delayChildren: 0.1,
  },
  normal: {
    staggerChildren: 0.1,
    delayChildren: 0.15,
  },
  slow: {
    staggerChildren: 0.2,
    delayChildren: 0.2,
  },
}
