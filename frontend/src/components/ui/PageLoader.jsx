import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * PageLoader — a cinematic full-screen intro wipe shown on first load.
 * Navy panels split apart to reveal the site, with the brand mark fading.
 */
export default function PageLoader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Top panel */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-h-navy"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Bottom panel */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1/2 bg-h-navy"
            initial={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Brand mark */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="w-12 h-12 flex items-center justify-center bg-white/90">
              <span className="font-display text-h-navy text-2xl font-semibold">H</span>
            </div>
            <div className="overflow-hidden">
              <motion.p
                className="font-body text-white/70 text-[11px] tracking-[0.35em] uppercase"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                Homton Real Estate
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
