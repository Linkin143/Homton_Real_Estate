import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * TiltCard — 3D perspective tilt + cursor-following glare on hover.
 * Wrap any content; it stays fully accessible and degrades gracefully.
 *
 * Props:
 *  - max: max tilt in degrees (default 10)
 *  - glare: show the moving light glare (default true)
 *  - className: passthrough classes
 */
export default function TiltCard({ children, max = 10, glare = true, className = '', ...rest }) {
  const ref = useRef(null)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 200, damping: 20 })

  const glareX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(my, [0, 1], ['0%', '100%'])

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }

  const handleLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className={`relative ${className}`}
      {...rest}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.28), transparent 45%)`
            ),
          }}
        />
      )}
    </motion.div>
  )
}
