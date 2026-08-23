import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { counterUp, revealHeading } from '../../animations/scrollReveal'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 2400, prefix: '', suffix: '+', label: 'Properties Sold', desc: 'Across 32 global cities' },
  { value: 48, prefix: '$', suffix: 'B', label: 'Portfolio Value', desc: 'Under active management' },
  { value: 98, prefix: '', suffix: '%', label: 'Client Satisfaction', desc: 'Across all transactions' },
  { value: 18, prefix: '', suffix: 'yr', label: 'Market Excellence', desc: 'Trusted since 2006' },
]

const pillars = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Discretion & Trust',
    desc: 'Absolute confidentiality for high-net-worth clients and their most sensitive transactions.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: 'Global Network',
    desc: 'Access to off-market listings and exclusive properties across 32 world-class cities.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'White Glove Service',
    desc: 'A dedicated advisor for every step — from first viewing to keys in hand.',
  },
]

export default function BrandStatement() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const statRefs = useRef([])
  const lineRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) revealHeading(headingRef.current, { start: 'top 75%' })

      // Line reveal
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1, ease: 'power3.inOut', scrollTrigger: { trigger: lineRef.current, start: 'top 80%', once: true } }
        )
      }

      // Counter animations
      statRefs.current.forEach((el, i) => {
        if (!el) return
        const stat = stats[i]
        counterUp(el, stat.value, { prefix: stat.prefix, suffix: stat.suffix, duration: 2.5 })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative bg-h-muted overflow-hidden py-section">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white" />
        <div className="absolute top-20 left-0 w-96 h-96 rounded-full bg-blue-50/50 -translate-x-1/2" />
      </div>

      <div className="container-luxury relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ─── Left: Statement ─────────────────────────────────────────────── */}
          <div>
            <span className="section-label">Our Philosophy</span>
            <span ref={lineRef} className="section-divider" />

            <h2
              ref={headingRef}
              className="display-lg font-display text-h-navy mb-8 leading-tight"
            >
              We Don&apos;t Simply List Properties — We Curate Legacies
            </h2>

            <p className="font-body text-h-slate text-base leading-relaxed mb-8 max-w-md">
              For 18 years, Homton has been the trusted partner of the world&apos;s most
              discerning buyers and sellers. We combine deep market intelligence with
              an unmatched global network to deliver extraordinary outcomes.
            </p>

            {/* Pillars */}
            <div className="flex flex-col gap-6 mt-10">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  className="flex items-start gap-5"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="flex-shrink-0 w-11 h-11 bg-h-navy text-white flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <div>
                    <h4 className="font-display text-h-navy font-semibold text-base mb-1">{pillar.title}</h4>
                    <p className="font-body text-h-slate text-sm leading-relaxed">{pillar.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ─── Right: Stats ─────────────────────────────────────────────────── */}
          <div className="bg-white p-10 shadow-luxury">
            <div className="grid grid-cols-2 gap-px bg-h-border">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-white p-8 flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                >
                  <span
                    ref={(el) => (statRefs.current[i] = el)}
                    className="font-display text-h-navy font-semibold text-4xl xl:text-5xl mb-2"
                  >
                    {stat.prefix}0{stat.suffix}
                  </span>
                  <span className="font-display text-h-navy font-medium text-sm mb-1">{stat.label}</span>
                  <span className="font-body text-h-slate text-xs">{stat.desc}</span>
                </motion.div>
              ))}
            </div>

            {/* Signature quote */}
            <div className="mt-8 pt-8 border-t border-h-border">
              <p className="font-display text-h-navy text-base italic leading-relaxed mb-4">
                &ldquo;The finest properties find their finest owners through Homton.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-h-navy rounded-full" />
                <div>
                  <p className="font-body font-medium text-h-navy text-sm">James Homton</p>
                  <p className="font-body text-h-slate text-xs">Founder & Principal Broker</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
