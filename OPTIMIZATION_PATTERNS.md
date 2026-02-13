# 🎯 Performance Optimization Quick Reference

## Component Optimization Patterns

### 1. Device Detection Pattern
```jsx
import { useDeviceDetection } from '../utils/deviceDetection'

const Component = () => {
  const { isMobile, isTablet, prefersReducedMotion } = useDeviceDetection()
  const shouldReduceAnimations = prefersReducedMotion || isMobile
  
  // Use these flags to conditionally render/animate
}
```

### 2. Conditional Animation Pattern
```jsx
// Disable expensive animations on mobile
{!shouldReduceAnimations && (
  <motion.div
    animate={{ shimmer: "effect" }}
  />
)}

// Simplify animations for mobile
animate={shouldReduceAnimations ? {} : {
  y: [0, -10, 0],
  rotate: [0, 360]
}}
```

### 3. Adaptive Element Count Pattern
```jsx
const elementCount = useMemo(() => {
  if (isMobile) return 5
  if (isTablet) return 7
  return 12
}, [isMobile, isTablet])

return [...Array(elementCount)].map(...)
```

### 4. Optimized Spring Animation Pattern
```jsx
transition={{ 
  type: 'spring', 
  stiffness: isMobile ? 100 : 120,  // Lower stiffness on mobile
  damping: 20  // Consistent damping
}}
```

### 5. RAF-Based Movement Pattern
```jsx
const handleMove = useCallback((e) => {
  requestAnimationFrame(() => {
    // Expensive calculation here
    setPosition({ x, y })
  })
}, [dependencies])
```

### 6. Memoized Event Handlers
```jsx
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies])

const computedValue = useMemo(() => {
  // Expensive computation
  return value
}, [dependencies])
```

### 7. Conditional Hover Effects
```jsx
whileHover={!isMobile ? {
  scale: 1.05,
  y: -4
} : {}}  // No hover effect on mobile
```

---

## CSS Optimization Patterns

### 1. Mobile Glassmorphism Override
```css
.glass-romantic {
  backdrop-filter: blur(40px) saturate(200%);
}

@media (max-width: 768px) {
  .glass-romantic {
    background: rgba(255, 192, 203, 0.85);  /* Solid background */
    backdrop-filter: none;  /* Remove expensive blur */
  }
}
```

### 2. Prefers-Reduced-Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3. Conditional Will-Change
```css
/* Only apply will-change when actively animating */
button:hover,
button:active {
  will-change: transform;
}

button:not(:hover):not(:active) {
  will-change: auto;
}
```

---

## Component-Specific Optimizations

### FloatingHearts
- ✅ Reduced count: 12 → 5 on mobile
- ✅ Simplified animation paths
- ✅ Memoized heart configurations

### ValentineQuestion
- ✅ Disabled shimmer on mobile
- ✅ Reduced heart decorations: 5 → 3
- ✅ Optimized button movement range
- ✅ Conditional hover effects

### DateOptionsScreen
- ✅ Reduced particles: 60% reduction
- ✅ Disabled shimmer on mobile
- ✅ Removed corner flourishes on mobile
- ✅ Optimized button springs

### FinalScreen
- ✅ Adaptive confetti: 22 → 8 on mobile
- ✅ Disabled shimmer on mobile
- ✅ Reduced decorative hearts
- ✅ Simplified animations

### GiftBoxScreen
- ✅ Reduced sparkles: 8 → 5 on mobile
- ✅ Reduced explosion hearts: 18 → 10
- ✅ Disabled glow on mobile

---

## App.jsx - Lazy Loading
```jsx
import { lazy, Suspense } from 'react'

const ValentineQuestion = lazy(() => import('./components/ValentineQuestion'))
const DateOptionsScreen = lazy(() => import('./components/DateOptionsScreen'))
const FinalScreen = lazy(() => import('./components/FinalScreen'))

// Wrap with Suspense
<Suspense fallback={<ScreenFallback />}>
  <Component />
</Suspense>
```

---

## Performance Metrics to Monitor

### Target Metrics:
- **FPS**: 50-60fps on mobile
- **Frame time**: <16ms (60fps) or <33ms (30fps minimum)
- **Memory**: Stable, no memory leaks
- **Bundle size**: <500KB initial (gzipped)

### How to Check:
1. Chrome DevTools → Performance tab
2. Record interaction
3. Check FPS graph
4. Check scripting time
5. Look for long tasks (>50ms)

### React DevTools Profiler:
1. Enable Profiler
2. Interact with app
3. Check render times
4. Identify unnecessary renders

---

## Common Performance Issues & Solutions

### Issue: Button movement is laggy
**Solution**: Use RAF pattern
```jsx
const handleMove = useCallback(() => {
  requestAnimationFrame(() => {
    // Movement calculation
  })
}, [])
```

### Issue: Too many re-renders
**Solution**: Memoize components and values
```jsx
const Component = memo(() => { ... })
const value = useMemo(() => { ... }, [deps])
const handler = useCallback(() => { ... }, [deps])
```

### Issue: Glassmorphism causing lag
**Solution**: Use solid backgrounds on mobile
```css
@media (max-width: 768px) {
  .glass-effect {
    backdrop-filter: none;
    background: solid color;
  }
}
```

### Issue: Animations stuttering
**Solution**: Optimize spring values
```jsx
stiffness: 120  // Lower = smoother but slower
damping: 20     // Higher = less bouncy
```

### Issue: High memory usage
**Solution**: 
- Reduce particle counts
- Memoize expensive calculations
- Clean up event listeners

---

## Testing Checklist

### Desktop Testing:
- [ ] All animations smooth (60fps)
- [ ] Hover effects work
- [ ] Parallax effect works
- [ ] All features intact

### Mobile Testing:
- [ ] All animations smooth (50-60fps)
- [ ] Touch interactions work
- [ ] No hover effects triggering
- [ ] Solid backgrounds render correctly
- [ ] Button movements smooth

### Accessibility Testing:
- [ ] Works with reduced motion enabled
- [ ] Touch targets ≥ 44px
- [ ] Keyboard navigation works
- [ ] Screen reader compatible

### Performance Testing:
- [ ] Lighthouse score > 90
- [ ] No layout shifts
- [ ] Fast initial load
- [ ] No memory leaks

---

## Build & Deploy

### Production Build:
```bash
npm run build
```

### Check Bundle Size:
```bash
npm run build
# Check dist/ folder size
```

### Analyze Bundle:
```bash
npm install --save-dev vite-plugin-bundle-analyzer
# Add to vite.config.js
```

### Performance Audit:
```bash
# Chrome DevTools → Lighthouse
# Run audit in incognito mode
# Target: Performance > 90
```

---

## Quick Wins for Further Optimization

1. **Image Optimization**:
   - Convert to WebP
   - Add lazy loading
   - Use responsive images

2. **Font Loading**:
   - Preload critical fonts
   - Use font-display: swap

3. **Caching**:
   - Add service worker
   - Cache static assets

4. **Code Splitting**:
   - Already implemented! ✅

5. **Tree Shaking**:
   - PurgeCSS for unused Tailwind
   - Remove unused dependencies

---

## Resources

- [Framer Motion Performance](https://www.framer.com/motion/guide-performance/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Web Vitals](https://web.dev/vitals/)
- [Mobile Performance](https://web.dev/fast/)

---

**Remember**: Performance is a feature! Users on slower devices deserve a great experience too. 💝
