import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * ScrollProgress — a thin gradient bar pinned to the top of the viewport
 * that fills as the user scrolls the page. Smoothed with a spring.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[9998] h-[3px] origin-left bg-gradient-to-r from-h-blue via-h-sky to-h-blue"
    />
  )
}
