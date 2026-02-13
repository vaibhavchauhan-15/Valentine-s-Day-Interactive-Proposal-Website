import { useEffect, useRef, useCallback, useMemo, useState } from 'react'

// Hook for throttling mouse move events
export const useThrottledMouseMove = (callback, delay = 50) => {
  const lastRun = useRef(Date.now())
  const timeoutRef = useRef(null)

  const throttledCallback = useCallback(
    (e) => {
      const now = Date.now()
      const timeSinceLastRun = now - lastRun.current

      if (timeSinceLastRun >= delay) {
        callback(e)
        lastRun.current = now
      } else {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
          callback(e)
          lastRun.current = Date.now()
        }, delay - timeSinceLastRun)
      }
    },
    [callback, delay]
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return throttledCallback
}

// Hook for getting window dimensions with memoization
export const useWindowSize = () => {
  const getSize = useCallback(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  }), [])

  const [size, setSize] = useState(getSize())

  useEffect(() => {
    if (typeof window === 'undefined') return

    let timeoutId = null
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setSize(getSize())
      }, 150) // Debounce resize
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [getSize])

  return size
}

// Hook for optimized random values (memoized)
export const useRandomValues = (count, seed = 0) => {
  return useMemo(() => {
    const random = (i) => {
      const x = Math.sin(seed + i) * 10000
      return x - Math.floor(x)
    }

    return Array.from({ length: count }, (_, i) => ({
      x: random(i),
      y: random(i + count),
      scale: 0.7 + random(i + count * 2) * 0.5,
      delay: random(i + count * 3) * 2,
      duration: 3 + random(i + count * 4) * 3,
    }))
  }, [count, seed])
}

// Hook for reduced motion preference
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// Hook for intersection observer (lazy animation trigger)
export const useInView = (options = {}) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          // Once in view, stop observing for better performance
          observer.disconnect()
        }
      },
      { threshold: 0.1, ...options }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [options])

  return [ref, inView]
}

// Hook for RAF-based custom animations
export const useAnimationFrame = (callback, running = true) => {
  const requestRef = useRef()
  const previousTimeRef = useRef()

  useEffect(() => {
    if (!running) return

    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current
        callback(deltaTime)
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [callback, running])
}
