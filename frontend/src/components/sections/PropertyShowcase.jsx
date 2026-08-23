import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { propertiesApi } from '../../utils/api'

gsap.registerPlugin(ScrollTrigger)

const FILTERS = ['all', 'penthouse', 'villa', 'apartment', 'estate', 'townhouse']

const allProperties = [
  { _id: 'p1', title: 'The Meridian Penthouse', type: 'penthouse', price: 8500000, status: 'for-sale', location: { city: 'New York', neighborhood: 'Midtown' }, specs: { beds: 5, baths: 6, sqft: 7200 }, images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=700'] },
  { _id: 'p2', title: 'Cantera Hills Villa', type: 'villa', price: 6750000, status: 'for-sale', location: { city: 'Beverly Hills', neighborhood: 'Beverly Hills Flats' }, specs: { beds: 7, baths: 9, sqft: 11500 }, images: ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=700'] },
  { _id: 'p3', title: 'Azure Sky Penthouse', type: 'penthouse', price: 12400000, status: 'for-sale', location: { city: 'Miami', neighborhood: 'Brickell Key' }, specs: { beds: 6, baths: 7, sqft: 9100 }, images: ['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=700'] },
  { _id: 'p4', title: 'Fairhaven Manor', type: 'estate', price: 22000000, status: 'for-sale', location: { city: 'Los Angeles', neighborhood: 'Bel Air' }, specs: { beds: 10, baths: 13, sqft: 22000 }, images: ['https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=700'] },
  { _id: 'p5', title: 'Malibu Beachfront Villa', type: 'villa', price: 15200000, status: 'for-sale', location: { city: 'Malibu', neighborhood: 'Carbon Beach' }, specs: { beds: 6, baths: 7, sqft: 8200 }, images: ['https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=700'] },
  { _id: 'p6', title: "Côte d'Azur Estate", type: 'estate', price: 31000000, status: 'for-sale', location: { city: 'Nice', neighborhood: "Cap d'Antibes" }, specs: { beds: 9, baths: 11, sqft: 18500 }, images: ['https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&w=700'] },
  { _id: 'p7', title: 'Hudson Yards Residence', type: 'apartment', price: 3850000, status: 'for-sale', location: { city: 'New York', neighborhood: 'Hudson Yards' }, specs: { beds: 3, baths: 3.5, sqft: 2950 }, images: ['https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=700'] },
  { _id: 'p8', title: 'Kensington Townhouse', type: 'townhouse', price: 9800000, status: 'for-sale', location: { city: 'London', neighborhood: 'Kensington' }, specs: { beds: 6, baths: 5, sqft: 6800 }, images: ['https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=700'] },
  { _id: 'p9', title: 'Chicago Lakefront Sky', type: 'apartment', price: 2200000, status: 'for-sale', location: { city: 'Chicago', neighborhood: 'Streeterville' }, specs: { beds: 3, baths: 2.5, sqft: 2400 }, images: ['https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=700'] },
]

function formatPrice(price) {
  if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`
  return `$${(price / 1000).toFixed(0)}K`
}

function TiltCard({ property, index }) {
  const cardRef = useRef(null)
  const [imgLoaded, setImgLoaded] = useState(false)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(card, { rotateY: x * 12, rotateX: -y * 12, scale: 1.02, duration: 0.4, ease: 'power2.out', transformPerspective: 1000 })
    // cursor-following glare
    card.style.setProperty('--glare-x', `${(x + 0.5) * 100}%`)
    card.style.setProperty('--glare-y', `${(y + 0.5) * 100}%`)
  }


  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.6, ease: 'power2.out' })
  }

  return (
    <motion.article
      ref={cardRef}
      className="group cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}

      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      layout
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-h-muted">
        {!imgLoaded && <div className="absolute inset-0 skeleton" />}
        <img
          src={property.images[0]}
          alt={property.title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-h-navy/70 to-transparent" />

        {/* Cursor-following glare */}
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at var(--glare-x,50%) var(--glare-y,50%), rgba(96,165,250,0.30), transparent 45%)',
          }}
        />

        {/* Type tag */}

        <span className="absolute top-4 left-4 label-sm text-white bg-h-blue px-3 py-1.5 capitalize">
          {property.type}
        </span>
        {property.status === 'for-sale' && (
          <span className="absolute top-4 right-4 label-sm text-white bg-green-600/80 px-3 py-1.5">
            For Sale
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5 border border-t-0 border-h-border group-hover:border-h-sky transition-colors duration-300">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-h-navy font-semibold text-base leading-tight">{property.title}</h3>
          <span className="font-display text-h-blue font-semibold text-base flex-shrink-0">{formatPrice(property.price)}</span>
        </div>
        <p className="font-body text-h-slate text-xs mb-4">{property.location.neighborhood}, {property.location.city}</p>

        <div className="flex items-center gap-4 text-h-slate text-xs font-body border-t border-h-border pt-4">
          <span>{property.specs.beds} Beds</span>
          <span className="w-px h-3 bg-h-border" />
          <span>{property.specs.baths} Baths</span>
          <span className="w-px h-3 bg-h-border" />
          <span>{property.specs.sqft.toLocaleString()} ft²</span>
        </div>
      </div>
    </motion.article>
  )
}

export default function PropertyShowcase() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [properties, setProperties] = useState(allProperties)

  const filtered = activeFilter === 'all'
    ? properties
    : properties.filter((p) => p.type === activeFilter)

  // Fetch from API
  useEffect(() => {
    propertiesApi.getAll({ limit: 12 })
      .then((res) => { if (res?.data?.length) setProperties(res.data) })
      .catch(() => {})
  }, [])

  // Header reveal
  useEffect(() => {
    if (!headerRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true } }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="showcase" ref={sectionRef} className="relative bg-white py-section">
      <div className="container-luxury">
        {/* ─── Header ──────────────────────────────────────────────────────────── */}
        <div ref={headerRef} className="mb-14">
          <span className="section-label">Property Collection</span>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <h2 className="display-xl font-display text-h-navy">
              All Properties
            </h2>
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2.5 font-body text-xs tracking-widest uppercase transition-all duration-200 ${
                    activeFilter === f
                      ? 'bg-h-navy text-white'
                      : 'border border-h-border text-h-slate hover:border-h-navy hover:text-h-navy'
                  }`}
                >
                  {f === 'all' ? 'All Types' : f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Grid ────────────────────────────────────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((property, i) => (
              <TiltCard key={property._id} property={property} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ─── Load More ───────────────────────────────────────────────────────── */}
        <motion.div
          className="flex justify-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <button className="btn-outline">
            <span>Load More Properties</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
