import { useState, useEffect, useRef, memo } from 'react'
import { motion } from 'framer-motion'

/**
 * LazyImage Component
 * Lazy loads images using Intersection Observer with blur-up effect
 */
const LazyImage = memo(({ 
  src, 
  alt = '', 
  className = '', 
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
  onLoad,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!imgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before element is visible
        threshold: 0.01,
      }
    )

    observer.observe(imgRef.current)

    return () => {
      if (observer) observer.disconnect()
    }
  }, [])

  // Load image when in view
  useEffect(() => {
    if (!isInView || !src) return

    const img = new Image()
    img.src = src
    
    img.onload = () => {
      setImageSrc(src)
      setIsLoaded(true)
      if (onLoad) onLoad()
    }

    img.onerror = () => {
      console.error(`Failed to load image: ${src}`)
      setIsLoaded(true) // Still mark as loaded to hide placeholder
    }
  }, [isInView, src, onLoad])

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        initial={{ filter: 'blur(20px)', opacity: 0 }}
        animate={{
          filter: isLoaded ? 'blur(0px)' : 'blur(20px)',
          opacity: isLoaded ? 1 : 0.5,
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        loading="lazy"
        {...props}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blush/20 to-valentine-pink/20 animate-pulse" />
      )}
    </div>
  )
})

LazyImage.displayName = 'LazyImage'

export default LazyImage
