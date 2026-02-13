/**
 * Image Preloading Utility
 * Preload critical images for better performance
 */

/**
 * Preload a single image
 * @param {string} src - Image source URL
 * @returns {Promise} Resolves when image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/**
 * Preload multiple images
 * @param {string[]} imageUrls - Array of image URLs to preload
 * @returns {Promise<Array>} Resolves when all images are loaded
 */
export const preloadImages = (imageUrls) => {
  return Promise.all(imageUrls.map(preloadImage))
}

/**
 * Preload images with priority
 * @param {Object} options - Configuration object
 * @param {string[]} options.critical - Critical images to load immediately
 * @param {string[]} options.normal - Normal priority images
 * @param {string[]} options.low - Low priority images (load after critical)
 */
export const preloadImagesWithPriority = async ({ critical = [], normal = [], low = [] }) => {
  try {
    // Load critical images first
    await preloadImages(critical)
    
    // Load normal priority images
    if (normal.length > 0) {
      preloadImages(normal).catch(err => 
        console.warn('Normal priority images failed to preload:', err)
      )
    }
    
    // Load low priority images after a delay
    if (low.length > 0) {
      setTimeout(() => {
        preloadImages(low).catch(err => 
          console.warn('Low priority images failed to preload:', err)
        )
      }, 1000)
    }
  } catch (error) {
    console.error('Critical images failed to preload:', error)
  }
}

/**
 * React hook for preloading images
 * @param {string[]} imageUrls - Array of image URLs to preload
 * @returns {Object} { loading, error, loaded }
 */
export const useImagePreloader = (imageUrls = []) => {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    if (imageUrls.length === 0) {
      setLoading(false)
      setLoaded(true)
      return
    }

    preloadImages(imageUrls)
      .then(() => {
        setLoaded(true)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [imageUrls])

  return { loading, error, loaded }
}

/**
 * Prefetch resource using link tag
 * @param {string} href - Resource URL
 * @param {string} as - Resource type (image, font, script, etc.)
 */
export const prefetchResource = (href, as = 'image') => {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  link.as = as
  document.head.appendChild(link)
}

/**
 * Preconnect to external domains
 * @param {string[]} domains - Array of domain URLs
 */
export const preconnectDomains = (domains = []) => {
  if (typeof document === 'undefined') return

  domains.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = domain
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

// Critical images for Valentine's website
export const CRITICAL_IMAGES = [
  '/icons/dinner-icon.png',
]

export const NORMAL_PRIORITY_IMAGES = [
  '/icons/movie-icon.png',
  '/icons/drive-icon.png',
  '/icons/camping-icon.png',
]

export const LOW_PRIORITY_IMAGES = [
  '/animation/Dinner Animation.gif',
]

export default {
  preloadImage,
  preloadImages,
  preloadImagesWithPriority,
  prefetchResource,
  preconnectDomains,
  CRITICAL_IMAGES,
  NORMAL_PRIORITY_IMAGES,
  LOW_PRIORITY_IMAGES,
}
