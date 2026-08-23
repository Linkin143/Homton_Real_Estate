import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * revealBatch — Batch-reveals a NodeList of elements with stagger.
 * Great for grids and card lists.
 */
export function revealBatch(elements, options = {}) {
  if (!elements || !elements.length) return

  const {
    from = { opacity: 0, y: 60 },
    to = { opacity: 1, y: 0 },
    stagger = 0.12,
    duration = 0.9,
    ease = 'power3.out',
    start = 'top 85%',
    once = true,
  } = options

  return ScrollTrigger.batch(elements, {
    onEnter: (batch) => {
      gsap.fromTo(batch, from, {
        ...to,
        duration,
        ease,
        stagger,
      })
    },
    start,
    once,
  })
}

/**
 * revealSection — Reveals a single section element on scroll.
 */
export function revealSection(el, options = {}) {
  if (!el) return

  const {
    from = { opacity: 0, y: 50 },
    to = { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
    start = 'top 80%',
    toggleActions = 'play none none none',
  } = options

  return gsap.fromTo(el, from, {
    ...to,
    scrollTrigger: {
      trigger: el,
      start,
      toggleActions,
    },
  })
}

/**
 * revealHeading — Splits a heading into lines and reveals them.
 */
export function revealHeading(el, options = {}) {
  if (!el) return

  const {
    duration = 1.1,
    stagger = 0.08,
    ease = 'power4.out',
    start = 'top 80%',
  } = options

  // Split into words manually (no SplitText plugin needed)
  const text = el.textContent
  const words = text.split(' ')
  el.innerHTML = words
    .map((w) => `<span class="split-word"><span class="split-inner">${w}</span></span>`)
    .join(' ')

  const inners = el.querySelectorAll('.split-inner')

  return gsap.fromTo(
    inners,
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
    }
  )
}

/**
 * revealLine — Draws a horizontal rule from left to right.
 */
export function revealLine(el, options = {}) {
  if (!el) return

  return gsap.fromTo(
    el,
    { scaleX: 0, transformOrigin: 'left center' },
    {
      scaleX: 1,
      duration: 0.8,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: el,
        start: options.start || 'top 85%',
        once: true,
      },
    }
  )
}

/**
 * revealImage — Reveals an image with a sliding clip-path wipe.
 */
export function revealImage(el, options = {}) {
  if (!el) return

  const { duration = 1.2, ease = 'power4.inOut', start = 'top 80%' } = options

  return gsap.fromTo(
    el,
    { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
    }
  )
}

/**
 * counterUp — Counts up a numeric value in DOM.
 */
export function counterUp(el, endValue, options = {}) {
  if (!el) return

  const { duration = 2.5, prefix = '', suffix = '', ease = 'power2.out' } = options
  const obj = { val: 0 }

  return gsap.to(obj, {
    val: endValue,
    duration,
    ease,
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      once: true,
    },
    onUpdate: () => {
      el.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}${suffix}`
    },
  })
}
