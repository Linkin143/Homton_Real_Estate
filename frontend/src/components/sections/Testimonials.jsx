import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { useState } from 'react'

const testimonials = [
  {
    id: 1,
    quote: "Homton's team found us the Côte d'Azur estate we'd been searching for privately for three years. Their discretion and market knowledge are unparalleled.",
    name: 'Sir Edward Langton',
    title: 'Private Equity Partner, London',
    initials: 'EL',
    color: '#1B4FD8',
    property: "Côte d'Azur Waterfront Estate",
    value: '$31M',
  },
  {
    id: 2,
    quote: 'From our first conversation to the closing of The Meridian Penthouse, every detail was handled with extraordinary care. Homton redefined what luxury service means.',
    name: 'Priya & Rajan Mehta',
    title: 'Technology Founders, New York',
    initials: 'PM',
    color: '#0A1628',
    property: 'The Meridian Penthouse, NYC',
    value: '$8.5M',
  },
  {
    id: 3,
    quote: "We needed complete confidentiality for our Malibu acquisition. Homton's off-market access delivered a property that never appeared on any listing. Simply exceptional.",
    name: 'Christina Voss',
    title: 'Award-Winning Filmmaker, Los Angeles',
    initials: 'CV',
    color: '#60A5FA',
    property: 'Malibu Beachfront Villa',
    value: '$15.2M',
  },
  {
    id: 4,
    quote: 'We instructed Homton to find us a London property worthy of our collection. The Kensington townhouse they sourced was everything we envisioned — and more.',
    name: 'The Harrington Family',
    title: 'Art Collectors, Geneva',
    initials: 'HF',
    color: '#1B4FD8',
    property: 'Kensington Garden Townhouse',
    value: '$9.8M',
  },
]

function StarRating() {
  return (
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-h-gold fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const dragX = useMotionValue(0)

  const goTo = (idx) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  const goNext = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -60) goNext()
    else if (info.offset.x > 60) goPrev()
  }

  const t = testimonials[current]

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
  }

  return (
    <section className="relative bg-white py-section overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-h-muted" />
      </div>

      <div className="container-luxury relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20 items-center">

          {/* ─── Left ─────────────────────────────────────────────────────────── */}
          <div>
            <span className="section-label">Client Voices</span>
            <h2 className="display-xl font-display text-h-navy mb-6">
              What Our Clients Say
            </h2>
            <p className="font-body text-h-slate leading-relaxed mb-10 max-w-sm">
              Trusted by the world&apos;s most discerning buyers and sellers for nearly two decades.
            </p>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={goPrev}
                className="w-12 h-12 border border-h-border flex items-center justify-center hover:bg-h-navy hover:border-h-navy group transition-all duration-200"
              >
                <svg className="w-5 h-5 text-h-navy group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="w-12 h-12 bg-h-navy flex items-center justify-center hover:bg-h-blue transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex gap-2 ml-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`transition-all duration-300 rounded-full ${i === current ? 'w-6 h-2 bg-h-blue' : 'w-2 h-2 bg-h-border hover:bg-h-slate'}`}
                  />
                ))}
              </div>
            </div>

            {/* Count */}
            <p className="font-body text-h-slate text-sm mt-6">
              <span className="font-semibold text-h-navy">{String(current + 1).padStart(2, '0')}</span>
              <span className="mx-2 text-h-border">/</span>
              {String(testimonials.length).padStart(2, '0')}
            </p>
          </div>

          {/* ─── Right: Testimonial card ──────────────────────────────────────── */}
          <div className="relative min-h-[460px] sm:min-h-[420px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                style={{ x: dragX }}
                className="absolute inset-0 bg-white p-5 sm:p-8 md:p-10 shadow-luxury flex flex-col cursor-grab active:cursor-grabbing select-none"
              >
                {/* Top accent */}
                <div className="w-12 h-1 mb-6" style={{ backgroundColor: t.color }} />

                <StarRating />

                <blockquote className="font-display text-h-navy text-base md:text-lg leading-relaxed italic mb-8 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center justify-between gap-4 pt-6 border-t border-h-border">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center text-white font-display font-semibold text-sm flex-shrink-0"
                      style={{ backgroundColor: t.color }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-display text-h-navy font-semibold text-sm">{t.name}</p>
                      <p className="font-body text-h-slate text-xs">{t.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-body text-xs text-h-slate">{t.property}</p>
                    <p className="font-display text-h-blue font-semibold">{t.value}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
