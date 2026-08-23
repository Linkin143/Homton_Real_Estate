import { gsap } from 'gsap'
import { useCallback, useEffect, useRef } from 'react'

/**
 * useMouseParallax — Tracks cursor position and applies 3D parallax offset.
 * Returns a ref to attach to the parallax container.
 * @param {number} strength — How strong the parallax effect is (default 20)
 * @param {number} ease — GSAP ease duration in seconds (default 0.8)
 */
export function useMouseParallax(strength = 20, ease = 0.8) {
  const containerRef = useRef(null)
  const rafRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e) => {
    const { innerWidth: W, innerHeight: H } = window
    mouseRef.current = {
      x: (e.clientX / W - 0.5) * 2,   // -1 to +1
      y: (e.clientY / H - 0.5) * 2,   // -1 to +1
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const layers = container.querySelectorAll('[data-parallax-speed]')

    const tick = () => {
      // Lerp toward target
      currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * (1 - ease + 0.05)
      currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * (1 - ease + 0.05)

      layers.forEach((layer) => {
        const speed = parseFloat(layer.dataset.parallaxSpeed) || 1
        const rotateX = -currentRef.current.y * strength * speed * 0.3
        const rotateY = currentRef.current.x * strength * speed * 0.3
        const translateX = currentRef.current.x * strength * speed
        const translateY = currentRef.current.y * strength * speed

        gsap.set(layer, {
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformPerspective: 1000,
          force3D: true,
        })
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [strength, ease, handleMouseMove])

  return containerRef
}

/**
 * useDeviceParallax — Gyroscope-based parallax for mobile devices.
 */
export function useDeviceParallax(ref, strength = 15) {
  useEffect(() => {
    if (!ref.current) return

    const handleOrientation = (e) => {
      const x = (e.gamma || 0) / 90  // -1 to +1 (left/right tilt)
      const y = (e.beta  || 0) / 180 // -1 to +1 (front/back tilt)

      gsap.to(ref.current, {
        x: x * strength,
        y: y * strength,
        duration: 0.6,
        ease: 'power2.out',
      })
    }

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true })
    }

    return () => window.removeEventListener('deviceorientation', handleOrientation)
  }, [strength])
}

export default useMouseParallax
