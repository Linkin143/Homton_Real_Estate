import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

// ─── Hero Stats ────────────────────────────────────────────────────────────────
const stats = [
  { value: '2,400+', label: 'Luxury Properties' },
  { value: '$48B',   label: 'Portfolio Value' },
  { value: '32',     label: 'Global Cities' },
  { value: '18yr',   label: 'Market Excellence' },
]

export default function Hero() {
  const sectionRef  = useRef(null)
  const badgeRef    = useRef(null)
  const titleRef    = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef      = useRef(null)
  const statsRef    = useRef(null)
  const scrollCueRef = useRef(null)
  const imgRef      = useRef(null)
  const layersRef   = useRef(null)
  // Shared mouse position (-1..1) fed to the shader + parallax layers
  const mouse       = useRef({ x: 0, y: 0 })

  // Track the pointer for the WebGL shader + subtle content parallax
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      mouse.current.x = x
      mouse.current.y = y
      if (layersRef.current) {
        gsap.to(layersRef.current, {
          x: x * 14,
          y: y * 10,
          duration: 1,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // GSAP entrance — elements animate FROM invisible, so they're visible if GSAP fails
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Ensure image fades in beautifully
      tl.from(imgRef.current, { scale: 1.06, duration: 2.0, ease: 'power2.out' }, 0)

      // Badge
      tl.from(badgeRef.current, { opacity: 0, y: 20, duration: 0.7 }, 0.3)

      // Title lines stagger
      const lines = titleRef.current?.querySelectorAll('.hero-line')
      if (lines?.length) {
        tl.from(lines, {
          opacity: 0,
          y: 60,
          rotateX: -15,
          stagger: 0.12,
          duration: 0.9,
        }, 0.5)
      }

      // Subtitle
      tl.from(subtitleRef.current, { opacity: 0, y: 30, duration: 0.7 }, 1.1)

      // CTAs
      tl.from(ctaRef.current, { opacity: 0, y: 20, duration: 0.6 }, 1.4)

      // Stats
      tl.from(statsRef.current, { opacity: 0, y: 20, duration: 0.6 }, 1.6)

      // Scroll cue
      tl.from(scrollCueRef.current, { opacity: 0, duration: 0.5 }, 2.0)
      gsap.to(scrollCueRef.current?.querySelector('.scroll-line'), {
        scaleY: 0.4,
        transformOrigin: 'top',
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'power1.inOut',
        delay: 2.2,
      })

      // ── Parallax: background image drifts down as the hero scrolls out ────
      // Image is 240px taller than the section (top:-120px, height:calc(100%+240px))
      // so it can travel 120px without ever exposing an empty edge.
      gsap.fromTo(
        imgRef.current,
        { y: -120 },
        {
          y: 120,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )

      // Subtle zoom-out as you scroll for extra depth
      gsap.to(imgRef.current, {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // Scroll-driven fade out
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '40% top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(sectionRef.current, { opacity: 1 - self.progress * 0.4 })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '100vh' }}
    >
      {/* ── Full-screen background image (extends 120px top/bottom for parallax) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imgRef}
          src="/images/hero-luxury-building.jpg"
          alt="Luxury skyline"
          className="absolute left-0 w-full object-cover object-center"
          style={{ top: '-120px', height: 'calc(100% + 240px)', willChange: 'transform', opacity: 0.88 }}
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-[#0A1628]/45 to-[#0A1628]/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/65 via-transparent to-transparent" />
      </div>

      {/* ── Floating: price card bottom-right (hidden on small screens) ───────── */}
      <motion.div
        className="hidden xl:block absolute bottom-16 right-6 lg:right-12 z-20 bg-[#0A1628]/80 backdrop-blur-md border border-white/15 px-6 py-5 max-w-[260px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.1, duration: 0.7 }}
      >
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[#60A5FA] mb-2">
          Featured Listing
        </p>
        <p className="font-display text-white font-semibold text-2xl mb-1">$31,000,000</p>
        <p className="font-body text-white/50 text-[11px] mb-3">Côte d&apos;Azur Waterfront Estate</p>
        <div className="flex items-center gap-3 text-white/35 text-[10px] font-body tracking-wide">
          <span>6 Beds</span>
          <span className="w-1 h-1 rounded-full bg-white/25" />
          <span>7 Baths</span>
          <span className="w-1 h-1 rounded-full bg-white/25" />
          <span>12,400 sq ft</span>
        </div>
      </motion.div>

      {/* ── Main content — vertically centred, compact so it always fits ─────── */}
      <div ref={layersRef} className="relative z-10 h-full flex flex-col justify-center container-luxury pt-24 pb-12">

        {/* Badge */}
        <div ref={badgeRef} className="flex items-center gap-3 mb-4">
          <span className="w-10 h-px bg-[#60A5FA]" />
          <span className="font-body text-[11px] md:text-xs text-[#8Fc0FF] tracking-[0.2em] uppercase">
            Est. 2006 — World&apos;s Premier Luxury Residences
          </span>
        </div>

        {/* Headline — clamped so 2 lines always fit above the fold */}
        <h1 ref={titleRef} className="mb-5 max-w-3xl" style={{ perspective: '800px' }}>
          <span
            className="hero-line block font-display font-semibold text-white leading-[1.02]"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
          >
            Where Luxury
          </span>
          <span
            className="hero-line block font-display font-semibold leading-[1.02]"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
              letterSpacing: '-0.03em',
              WebkitTextStroke: '1.5px rgba(255,255,255,0.6)',
              color: 'transparent',
            }}
          >
            Finds Home<span className="text-[#60A5FA]" style={{ WebkitTextStroke: '0', color: '#60A5FA' }}>.</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-white/70 text-sm md:text-base lg:text-lg leading-relaxed max-w-lg mb-7"
        >
          Curating the world&apos;s most exceptional addresses — from Manhattan
          penthouses to Côte d&apos;Azur estates. Every property a masterwork.
        </p>

        {/* CTA Buttons — the primary focus for first-visit conversion */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 mb-8">
          <a
            href="#properties"
            className="inline-flex items-center gap-3 px-7 py-4 bg-white text-[#0A1628] font-body font-semibold text-sm tracking-[0.12em] uppercase transition-all duration-300 hover:bg-[#1B4FD8] hover:text-white shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
          >
            <span>Explore Collection</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#tour"
            className="inline-flex items-center gap-3 px-7 py-4 border border-white/40 text-white font-body font-semibold text-sm tracking-[0.12em] uppercase backdrop-blur-sm bg-white/5 transition-all duration-300 hover:bg-white/15 hover:border-white"
          >
            <span>Virtual Tour</span>
          </a>
        </div>

        {/* Stats — compact single row with count-up on view */}
        <div
          ref={statsRef}
          className="flex flex-wrap gap-x-8 gap-y-4 lg:gap-x-12 pt-6 border-t border-white/15 max-w-2xl"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span className="font-display font-semibold text-xl md:text-2xl text-white">
                {stat.value}
              </span>
              <span className="font-body text-[11px] text-white/50 tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll Cue ───────────────────────────────────────────────────────── */}
      <div
        ref={scrollCueRef}
        className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] text-white/40 tracking-[0.2em] uppercase">Scroll</span>
        <div className="scroll-line w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}
