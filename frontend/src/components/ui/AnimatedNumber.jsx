import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/**
 * AnimatedNumber — counts up from 0 to a target when scrolled into view.
 * Preserves any non-numeric prefix/suffix in the label (e.g. "$48B", "2,400+").
 *
 * Props:
 *  - value: the display string (e.g. "2,400+", "$48B", "32", "18yr")
 *  - duration: count duration in seconds (default 1.8)
 */
export default function AnimatedNumber({ value, duration = 1.8, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(value)

  // Parse the numeric portion + surrounding prefix/suffix
  const match = String(value).match(/^([^\d]*)([\d,.]+)(.*)$/)

  useEffect(() => {
    if (!inView || !match) {
      if (!match) setDisplay(value)
      return
    }

    const prefix = match[1]
    const numStr = match[2]
    const suffix = match[3]
    const hasComma = numStr.includes(',')
    const target = parseFloat(numStr.replace(/,/g, ''))
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0

    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      const current = target * eased
      let out = decimals ? current.toFixed(decimals) : Math.round(current).toString()
      if (hasComma) out = Number(out).toLocaleString()
      setDisplay(`${prefix}${out}${suffix}`)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration, match])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
