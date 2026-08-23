import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

const tourFeatures = [
  { label: '360° Panoramic View', icon: '◎' },
  { label: 'Room-by-Room Navigation', icon: '◈' },
  { label: 'Real-Scale Measurements', icon: '◻' },
  { label: 'VR Headset Compatible', icon: '◆' },
]

const tourProperties = [
  {
    id: 1,
    name: 'The Meridian Penthouse',
    city: 'New York',
    type: 'penthouse',
    gallery: [
      { src: '/images/tours/tour-meridian-living.jpg', label: 'Living Room' },
      { src: '/images/tours/tour-meridian-bedroom.jpg', label: 'Master Bedroom' },
      { src: '/images/tours/tour-meridian-bath.jpg', label: 'Spa Bath' },
    ],

  },
  {
    id: 2,
    name: 'Cantera Hills Villa',
    city: 'Beverly Hills',
    type: 'villa',
    gallery: [
      { src: '/images/tours/tour-cantera-living.jpg', label: 'Great Room' },
      { src: '/images/tours/tour-cantera-kitchen.jpg', label: 'Chef’s Kitchen' },
      { src: '/images/tours/tour-cantera-dining.jpg', label: 'Dining Room' },
    ],

  },
  {
    id: 3,
    name: 'Azure Sky Penthouse',
    city: 'Miami',
    type: 'penthouse',
    gallery: [
      { src: '/images/tours/tour-azure-living.jpg', label: 'Living Room' },
      { src: '/images/tours/tour-azure-bath.jpg', label: 'Marble Bath' },
    ],

  },
]

export default function VirtualTour() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [activeTour, setActiveTour] = useState(0)
  const [activeImg, setActiveImg] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const active = tourProperties[activeTour]
  const current = active.gallery[activeImg] ?? active.gallery[0]

  // Reset to first image whenever the property changes
  const selectProperty = (idx) => {
    setActiveTour(idx)
    setActiveImg(0)
  }

  useEffect(() => {
    if (!contentRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 75%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setLightbox(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="tour" ref={sectionRef} className="relative bg-h-navy py-section overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #60A5FA 1px, transparent 0)', backgroundSize: '40px 40px' }}
      />

      <div className="container-luxury relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ─── Left: Content ───────────────────────────────────────────────── */}
          <div ref={contentRef}>
            <span className="section-label text-h-sky">Immersive Experience</span>
            <h2 className="display-xl font-display text-white mb-6 mt-2">
              Step Inside.<br />
              <span className="text-h-sky">Before You Arrive.</span>
            </h2>
            <p className="font-body text-slate-400 text-base leading-relaxed mb-10 max-w-md">
              Explore every room in photorealistic detail from anywhere in the world.
              Our virtual tours capture every finish — from the marble baths to the
              view from the penthouse terrace.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {tourFeatures.map((f) => (
                <div key={f.label} className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3">
                  <span className="text-h-sky text-lg">{f.icon}</span>
                  <span className="font-body text-white/80 text-xs">{f.label}</span>
                </div>
              ))}
            </div>

            {/* Tour selector */}
            <div className="space-y-2 mb-8">
              <p className="label-sm text-slate-500 mb-3">Select Property</p>
              {tourProperties.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => selectProperty(i)}
                  className={`w-full text-left flex items-center justify-between px-5 py-4 border transition-all duration-200 group ${
                    activeTour === i
                      ? 'border-h-blue bg-h-blue/15'
                      : 'border-white/10 hover:border-h-blue hover:bg-h-blue/10'
                  }`}
                >
                  <div>
                    <p className="font-display text-white font-medium text-sm">{t.name}</p>
                    <p className="font-body text-slate-500 text-xs">{t.city} · {t.type}</p>
                  </div>
                  <svg className="w-4 h-4 text-h-sky opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              ))}
            </div>

            <a href="#contact" className="inline-flex btn-primary bg-h-blue border-h-blue">
              <span>Schedule Private Tour</span>
              <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* ─── Right: Photo Gallery ─────────────────────────────────────────── */}
          <motion.div
            className="relative h-[500px] lg:h-[600px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Decorative border */}
            <div className="absolute -inset-4 border border-h-blue/20 pointer-events-none" />

            {/* Main image */}
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="group relative block w-full h-full overflow-hidden bg-h-navy focus:outline-none cursor-zoom-in"
              aria-label={`View ${current.label} of ${active.name} full screen`}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${active.id}-${activeImg}`}
                  src={current.src}
                  alt={`${active.name} — ${current.label}, ${active.city}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </AnimatePresence>

              {/* Gradient for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-h-navy/90 via-transparent to-h-navy/30 pointer-events-none" />

              {/* Room label */}
              <span className="absolute top-6 left-6 inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-h-sky" />
                <span className="font-body text-white/80 text-[10px] tracking-widest uppercase">{current.label}</span>
              </span>

              {/* Expand hint */}
              <span className="absolute top-6 right-6 inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span className="font-body text-white text-[10px] tracking-widest uppercase">Expand</span>
              </span>
            </button>

            {/* Thumbnails */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
              {active.gallery.map((img, i) => (
                <button
                  key={img.src}
                  onClick={() => setActiveImg(i)}
                  className={`relative flex-1 h-16 overflow-hidden border-2 transition-all duration-200 ${
                    activeImg === i ? 'border-h-blue' : 'border-white/20 hover:border-white/50'
                  }`}
                  aria-label={`Show ${img.label}`}
                >
                  <img src={img.src} alt={img.label} loading="lazy" className="w-full h-full object-cover" />
                  {activeImg === i && <span className="absolute inset-0 ring-2 ring-inset ring-h-blue" />}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Lightbox ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-6 right-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <span className="font-body text-xs tracking-widest uppercase">Close</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.div
              className="relative w-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={current.src}
                alt={`${active.name} — ${current.label}`}
                className="w-full max-h-[80vh] object-contain shadow-2xl"
              />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-display text-white text-base">{active.name}</p>
                  <p className="font-body text-slate-400 text-xs">{current.label} · {active.city}</p>
                </div>
                <div className="flex items-center gap-2">
                  {active.gallery.map((img, i) => (
                    <button
                      key={img.src}
                      onClick={() => setActiveImg(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${activeImg === i ? 'bg-h-blue' : 'bg-white/30 hover:bg-white/60'}`}
                      aria-label={`Show ${img.label}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
