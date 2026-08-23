import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * buildHeroTimeline — Creates the master GSAP entrance animation for the Hero section.
 * @param {object} refs - { badge, titleLines, subtitle, cta, scroll, canvas, stats }
 * @returns {gsap.core.Timeline}
 */
export function buildHeroTimeline(refs) {
  const { badge, titleLines, subtitle, cta, scrollCue, canvas, stats } = refs

  const tl = gsap.timeline({
    defaults: { ease: 'power4.out' },
    delay: 0.3,
  })

  // Canvas fade in
  if (canvas) {
    tl.fromTo(
      canvas,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' },
      0
    )
  }

  // Badge
  if (badge) {
    tl.fromTo(
      badge,
      { opacity: 0, y: -20, letterSpacing: '0.3em' },
      { opacity: 1, y: 0, letterSpacing: '0.15em', duration: 0.8 },
      0.2
    )
  }

  // Title lines (staggered word by word)
  if (titleLines?.length) {
    tl.fromTo(
      titleLines,
      { opacity: 0, y: 80, rotateX: -15 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.12,
        transformOrigin: 'top center',
        transformPerspective: 1200,
      },
      0.4
    )
  }

  // Subtitle
  if (subtitle) {
    tl.fromTo(
      subtitle,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9 },
      0.9
    )
  }

  // CTA buttons
  if (cta) {
    tl.fromTo(
      cta,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      1.1
    )
  }

  // Scroll cue
  if (scrollCue) {
    tl.fromTo(
      scrollCue,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6 },
      1.4
    )

    // Infinite bounce
    gsap.to(scrollCue, {
      y: 10,
      duration: 1.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2,
    })
  }

  // Stats bar
  if (stats) {
    tl.fromTo(
      stats,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      1.3
    )
  }

  return tl
}

/**
 * heroScrollEffect — Applies scroll-driven parallax/fade on the hero section.
 * @param {HTMLElement} heroEl - The hero section element
 * @param {HTMLElement} contentEl - The hero text content element
 */
export function heroScrollEffect(heroEl, contentEl) {
  if (!heroEl || !contentEl) return

  const ctx = gsap.context(() => {
    // Fade & scale hero content as user scrolls
    gsap.to(contentEl, {
      opacity: 0,
      y: -80,
      scale: 0.97,
      ease: 'none',
      scrollTrigger: {
        trigger: heroEl,
        start: 'top top',
        end: 'bottom 60%',
        scrub: 1,
      },
    })
  })

  return () => ctx.revert()
}
