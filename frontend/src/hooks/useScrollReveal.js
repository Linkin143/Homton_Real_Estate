import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollReveal — attach to a container ref; every direct child (or elements
 * matching `selector`) fades + slides up in a stagger when scrolled into view.
 *
 * @param {object} opts
 *   - selector: CSS selector for the targets (default: direct children)
 *   - y: start offset in px (default 40)
 *   - stagger: seconds between items (default 0.12)
 *   - start: ScrollTrigger start (default 'top 80%')
 */
export function useScrollReveal({ selector, y = 40, stagger = 0.12, start = 'top 80%' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = selector ? el.querySelectorAll(selector) : el.children
    if (!targets || targets.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start, once: true },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [selector, y, stagger, start])

  return ref
}

export default useScrollReveal
