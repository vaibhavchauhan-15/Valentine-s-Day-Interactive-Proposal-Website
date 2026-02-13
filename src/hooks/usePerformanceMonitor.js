import { useEffect, useRef, useState } from 'react'

/**
 * Performance Monitoring Hook
 * Tracks FPS, long tasks, and overall performance metrics
 */

/**
 * Hook to monitor FPS (Frames Per Second)
 * @returns {number} Current FPS
 */
export const useFPS = () => {
  const [fps, setFps] = useState(60)
  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())
  const rafIdRef = useRef(null)

  useEffect(() => {
    const measureFPS = () => {
      frameCountRef.current++
      const currentTime = performance.now()
      
      if (currentTime >= lastTimeRef.current + 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / (currentTime - lastTimeRef.current)))
        frameCountRef.current = 0
        lastTimeRef.current = currentTime
      }
      
      rafIdRef.current = requestAnimationFrame(measureFPS)
    }

    rafIdRef.current = requestAnimationFrame(measureFPS)

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  return fps
}

/**
 * Hook to monitor memory usage (if available)
 * @returns {Object} Memory metrics
 */
export const useMemoryMonitor = () => {
  const [memory, setMemory] = useState(null)

  useEffect(() => {
    if (!performance.memory) return

    const interval = setInterval(() => {
      setMemory({
        usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
        totalJSHeapSize: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
        jsHeapSizeLimit: Math.round(performance.memory.jsHeapSizeLimit / 1048576), // MB
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return memory
}

/**
 * Hook to detect performance issues
 * @param {number} fpsThreshold - FPS threshold for warning (default: 30)
 * @returns {Object} Performance status
 */
export const usePerformanceMonitor = (fpsThreshold = 30) => {
  const fps = useFPS()
  const memory = useMemoryMonitor()
  const [performanceIssue, setPerformanceIssue] = useState(false)
  const [recommendation, setRecommendation] = useState('')

  useEffect(() => {
    if (fps < fpsThreshold) {
      setPerformanceIssue(true)
      setRecommendation('Performance issue detected. Consider reducing animations or visual effects.')
    } else {
      setPerformanceIssue(false)
      setRecommendation('')
    }
  }, [fps, fpsThreshold])

  return {
    fps,
    memory,
    performanceIssue,
    recommendation,
    isGoodPerformance: fps >= 50,
    isAcceptablePerformance: fps >= 30 && fps < 50,
    isPoorPerformance: fps < 30,
  }
}

/**
 * Hook to track long tasks (> 50ms)
 */
export const useLongTaskMonitor = () => {
  const [longTasks, setLongTasks] = useState([])

  useEffect(() => {
    if (!window.PerformanceObserver) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const tasks = entries.map(entry => ({
          duration: entry.duration,
          startTime: entry.startTime,
        }))
        setLongTasks(prev => [...prev, ...tasks].slice(-10)) // Keep last 10
      })

      observer.observe({ entryTypes: ['longtask'] })

      return () => observer.disconnect()
    } catch (e) {
      console.warn('Long task monitoring not supported')
    }
  }, [])

  return longTasks
}

/**
 * Hook to track page load performance
 */
export const usePageLoadMetrics = () => {
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    if (!window.performance || !window.performance.timing) return

    // Wait for page to fully load
    window.addEventListener('load', () => {
      setTimeout(() => {
        const timing = performance.timing
        const navigation = performance.getEntriesByType('navigation')[0]

        setMetrics({
          // Time to first byte
          ttfb: timing.responseStart - timing.requestStart,
          // DOM content loaded
          domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
          // Full page load
          loadComplete: timing.loadEventEnd - timing.navigationStart,
          // First paint (if available)
          firstPaint: navigation?.domContentLoadedEventEnd || 0,
        })
      }, 0)
    })
  }, [])

  return metrics
}

/**
 * Hook to log performance metrics (development only)
 */
export const usePerformanceLogger = (enabled = process.env.NODE_ENV === 'development') => {
  const { fps, memory, performanceIssue, recommendation } = usePerformanceMonitor()
  const longTasks = useLongTaskMonitor()
  const pageMetrics = usePageLoadMetrics()

  useEffect(() => {
    if (!enabled) return

    const logInterval = setInterval(() => {
      console.group('🎯 Performance Metrics')
      console.log('FPS:', fps)
      if (memory) {
        console.log('Memory:', `${memory.usedJSHeapSize}MB / ${memory.jsHeapSizeLimit}MB`)
      }
      if (performanceIssue) {
        console.warn('⚠️', recommendation)
      }
      if (longTasks.length > 0) {
        console.warn('Long tasks detected:', longTasks.length)
      }
      if (pageMetrics) {
        console.log('Page Load Metrics:', pageMetrics)
      }
      console.groupEnd()
    }, 5000) // Log every 5 seconds

    return () => clearInterval(logInterval)
  }, [enabled, fps, memory, performanceIssue, recommendation, longTasks, pageMetrics])

  return {
    fps,
    memory,
    performanceIssue,
    recommendation,
    longTasks,
    pageMetrics,
  }
}

export default {
  useFPS,
  useMemoryMonitor,
  usePerformanceMonitor,
  useLongTaskMonitor,
  usePageLoadMetrics,
  usePerformanceLogger,
}
