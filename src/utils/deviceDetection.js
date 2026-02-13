/**
 * Device Detection Utility
 * Detects mobile, tablet, and desktop devices with performance optimizations
 */

// Check if running in browser environment
const isBrowser = typeof window !== 'undefined'

/**
 * Detect if the device is mobile (phone)
 */
export const isMobile = () => {
  if (!isBrowser) return false
  
  // Check screen size first (most reliable)
  const isMobileScreen = window.innerWidth <= 768
  
  // Check for touch support
  const hasTouchScreen = (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  )
  
  // Check user agent as fallback
  const mobileRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i
  const isMobileUA = mobileRegex.test(navigator.userAgent)
  
  return isMobileScreen || (hasTouchScreen && isMobileUA)
}

/**
 * Detect if the device is tablet
 */
export const isTablet = () => {
  if (!isBrowser) return false
  
  const isTabletScreen = window.innerWidth > 768 && window.innerWidth <= 1024
  const tabletRegex = /iPad|Android|Tablet/i
  const isTabletUA = tabletRegex.test(navigator.userAgent)
  
  const hasTouchScreen = (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  )
  
  return isTabletScreen && (hasTouchScreen || isTabletUA)
}

/**
 * Detect if the device is desktop
 */
export const isDesktop = () => {
  if (!isBrowser) return true
  return !isMobile() && !isTablet()
}

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (!isBrowser) return false
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  return mediaQuery.matches
}

/**
 * Check if device has touch support
 */
export const isTouchDevice = () => {
  if (!isBrowser) return false
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  )
}

/**
 * Get device type as string
 */
export const getDeviceType = () => {
  if (isMobile()) return 'mobile'
  if (isTablet()) return 'tablet'
  return 'desktop'
}

/**
 * Check if device is low-end (for performance optimization)
 */
export const isLowEndDevice = () => {
  if (!isBrowser) return false
  
  // Check for hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4
  const isLowCore = cores <= 4
  
  // Check for device memory (if available)
  const memory = navigator.deviceMemory || 4
  const isLowMemory = memory <= 4
  
  // Check if mobile
  const mobile = isMobile()
  
  return mobile || (isLowCore && isLowMemory)
}

/**
 * Get performance tier for adaptive optimizations
 * Returns: 'high', 'medium', or 'low'
 */
export const getPerformanceTier = () => {
  if (!isBrowser) return 'high'
  
  if (isLowEndDevice()) return 'low'
  
  const cores = navigator.hardwareConcurrency || 4
  const memory = navigator.deviceMemory || 4
  
  if (cores >= 8 && memory >= 8) return 'high'
  return 'medium'
}

/**
 * React hook for device detection with state updates
 */
export const useDeviceDetection = () => {
  if (!isBrowser) {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isTouchDevice: false,
      deviceType: 'desktop',
      performanceTier: 'high',
      prefersReducedMotion: false,
    }
  }
  
  return {
    isMobile: isMobile(),
    isTablet: isTablet(),
    isDesktop: isDesktop(),
    isTouchDevice: isTouchDevice(),
    deviceType: getDeviceType(),
    performanceTier: getPerformanceTier(),
    prefersReducedMotion: prefersReducedMotion(),
  }
}

export default {
  isMobile,
  isTablet,
  isDesktop,
  isTouchDevice,
  getDeviceType,
  prefersReducedMotion,
  isLowEndDevice,
  getPerformanceTier,
  useDeviceDetection,
}
