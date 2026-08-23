import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { useScrollPinHorizontal } from '../../hooks/useScrollTrigger'
import { propertiesApi } from '../../utils/api'

gsap.registerPlugin(ScrollTrigger)

// ─── Fallback property data ────────────────────────────────────────────────────
const fallbackProperties = [
  {
    _id: '1', title: 'The Meridian Penthouse', type: 'penthouse',
    price: 8500000, location: { city: 'New York', neighborhood: 'Midtown' },
    specs: { beds: 5, baths: 6, sqft: 7200 },
    images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'],
  },
  {
    _id: '2', title: 'Cantera Hills Estate Villa', type: 'villa',
    price: 6750000, location: { city: 'Beverly Hills', neighborhood: 'Beverly Hills Flats' },
    specs: { beds: 7, baths: 9, sqft: 11500 },
    images: ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800'],
  },
  {
    _id: '3', title: 'Azure Sky Penthouse', type: 'penthouse',
    price: 12400000, location: { city: 'Miami', neighborhood: 'Brickell Key' },
    specs: { beds: 6, baths: 7, sqft: 9100 },
    images: ['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800'],
  },
  {
    _id: '4', title: 'Fairhaven Manor Estate', type: 'estate',
    price: 22000000, location: { city: 'Los Angeles', neighborhood: 'Bel Air' },
    specs: { beds: 10, baths: 13, sqft: 22000 },
    images: ['https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=800'],
  },
  {
    _id: '5', title: 'Malibu Beachfront Villa', type: 'villa',
    price: 15200000, location: { city: 'Malibu', neighborhood: 'Carbon Beach' },
    specs: { beds: 6, baths: 7, sqft: 8200 },
    images: ['https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=800'],
  },
  {
    _id: '6', title: "Côte d'Azur Waterfront Estate", type: 'estate',
    price: 31000000, location: { city: 'Nice', neighborhood: "Cap d'Antibes" },
    specs: { beds: 9, baths: 11, sqft: 18500 },
    images: ['https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&w=800'],
  },
]

function formatPrice(price) {
  if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`
  return `$${(price / 1000).toFixed(0)}K`
}

function PropertyCard({ property, index }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)

  // Cursor-following glare on the card
  const handleMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    el.style.setProperty('--glare-x', `${x}%`)
    el.style.setProperty('--glare-y', `${y}%`)
  }

  return (
    <motion.article
      ref={cardRef}
      className="flex-shrink-0 snap-start w-[280px] sm:w-[340px] md:w-[400px] xl:w-[480px] relative group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Image container */}
      <div className="relative h-[420px] md:h-[500px] overflow-hidden bg-h-muted">
        {!imgLoaded && <div className="absolute inset-0 skeleton" />}
        <img
          src={property.images[0]}
          alt={property.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            hovered ? 'scale-110' : 'scale-100'
          } ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-h-navy/80 via-h-navy/20 to-transparent" />

        {/* Cursor-following glare (only visible on hover) */}
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at var(--glare-x,50%) var(--glare-y,50%), rgba(96,165,250,0.28), transparent 45%)',
          }}
        />


        {/* Type badge */}
        <div className="absolute top-5 left-5 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5">
          <span className="label-sm text-white capitalize">{property.type}</span>
        </div>

        {/* Price */}
        <div className="absolute top-5 right-5">
          <span className="font-display text-white font-semibold text-xl">{formatPrice(property.price)}</span>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-display text-white font-semibold text-xl mb-1 leading-tight">{property.title}</h3>
          <p className="font-body text-slate-300 text-sm mb-4">
            {property.location.neighborhood}, {property.location.city}
          </p>
          <div className="flex items-center gap-5 text-slate-300">
            <span className="font-body text-xs flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {property.specs.beds} Beds
            </span>
            <span className="font-body text-xs flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {property.specs.baths} Baths
            </span>
            <span className="font-body text-xs">
              {property.specs.sqft.toLocaleString()} sq ft
            </span>
          </div>

          {/* CTA reveal on hover */}
          <motion.div
            className="mt-4 overflow-hidden"
            animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="w-full bg-h-blue text-white font-body text-xs tracking-widest uppercase py-3 hover:bg-white hover:text-h-navy transition-colors duration-200">
              View Property
            </button>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

export default function FeaturedProperties() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const containerRef = useRef(null)
  const innerRef = useRef(null)
  const [properties, setProperties] = useState(fallbackProperties)

  // Fetch from API
  useEffect(() => {
    propertiesApi.getFeatured()
      .then((res) => { if (res?.data?.length) setProperties(res.data) })
      .catch(() => {}) // silently use fallback
  }, [])

  // Section header reveal
  useEffect(() => {
    if (!headerRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  // Horizontal scroll pin
  useScrollPinHorizontal(containerRef, innerRef)

  return (
    <section id="properties" ref={sectionRef} className="relative bg-white">
      {/* ─── Header ────────────────────────────────────────────────────────── */}
      <div className="container-luxury pt-section pb-16" ref={headerRef}>
        <span className="section-label">Featured Collection</span>
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <h2 className="display-xl font-display text-h-navy max-w-xl">
            Exceptional Properties,<br />
            <em className="not-italic text-h-blue">Curated for You</em>
          </h2>
          <p className="font-body text-h-slate text-base max-w-sm leading-relaxed">
            Scroll to explore our handpicked selection of the world&apos;s finest luxury
            residences, each a testament to architectural excellence.
          </p>
        </div>
      </div>

      {/* ─── Horizontal Scroll Gallery ───────────────────────────────────────── */}
      {/* Desktop (≥1024px): GSAP-pinned scrub scroll (width:max-content).          */}
      {/* Mobile/Tablet: native touch scroll with snap points.                     */}
      <div
        ref={containerRef}
        className="overflow-x-auto lg:overflow-hidden snap-x snap-mandatory lg:snap-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          ref={innerRef}
          className="flex gap-4 sm:gap-6 px-6 md:px-12 lg:px-20 pb-section w-max lg:w-max"
        >
          {properties.map((property, i) => (
            <PropertyCard key={property._id || i} property={property} index={i} />
          ))}

          {/* End card */}
          <div className="flex-shrink-0 w-[240px] flex flex-col items-center justify-center gap-6 text-center px-8">
            <div className="w-16 h-16 rounded-full border border-h-border flex items-center justify-center">
              <svg className="w-6 h-6 text-h-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <p className="font-display text-h-navy text-lg">View All Properties</p>
            <a href="#showcase" className="btn-outline text-xs py-2 px-5">
              <span>Browse All</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
