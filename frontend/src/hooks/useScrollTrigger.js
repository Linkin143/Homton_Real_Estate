import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollReveal — Attaches a GSAP fade-up reveal to a ref element.
 * @param {object} options — ScrollTrigger + gsap.fromTo options
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const el = ref.current
    const {
      from = { opacity: 0, y: 60 },
      to = { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      trigger = el,
      start = 'top 85%',
      end = 'bottom 20%',
      toggleActions = 'play none none none',
      ...rest
    } = options

    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, {
        ...to,
        scrollTrigger: {
          trigger,
          start,
          end,
          toggleActions,
          ...rest,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return ref
}

/**
 * useScrollPinHorizontal — Pins a container and scrolls children horizontally.
 * @param {object} options
 */
export function useScrollPinHorizontal(containerRef, innerRef, options = {}) {
  useEffect(() => {
    if (!containerRef.current || !innerRef.current) return

    const container = containerRef.current
    const inner = innerRef.current

    // Only enable the pinned horizontal scroll on desktop (≥1024px).
    // On smaller screens the gallery falls back to native touch scroll-snap,
    // so pinning must be skipped to avoid breaking vertical scrolling.
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const totalWidth = inner.scrollWidth - container.clientWidth

        gsap.to(inner, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            ...options,
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])
}

/**
 * useParallax — Vertical parallax translation on scroll.
 */
export function useParallax(ref, speed = 0.3) {
  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [speed])
}

/**
 * useCountUp — Animates a number from 0 to target when element enters viewport.
 */
export function useCountUp(ref, target, options = {}) {
  useEffect(() => {
    if (!ref.current) return

    const { duration = 2, ease = 'power2.out', prefix = '', suffix = '' } = options
    const obj = { val: 0 }

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          once: true,
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}${suffix}`
          }
        },
      })
    })

    return () => ctx.revert()
  }, [target])
}
