import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

const navLinks = [
  { label: 'Properties', href: '#properties' },
  { label: 'Collections', href: '#showcase' },
  { label: 'Virtual Tour', href: '#tour' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.1 }
      )
    })
    return () => ctx.revert()
  }, [])

  // Scroll-driven glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/70 backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(10,22,40,0.12)] border-b border-white/40'
            : 'bg-white/5 backdrop-blur-md backdrop-saturate-150 border-b border-white/10'
        }`}
        style={{ WebkitBackdropFilter: 'blur(16px) saturate(150%)' }}
      >
        {/* Liquid-glass highlight sheen */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 to-transparent opacity-60" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="container-luxury">
          <nav className="flex items-center justify-between h-20 md:h-20">

            {/* ─── Logo ──────────────────────────────────────────────────────── */}
            <a href="/" className="flex items-center gap-3 group">
              <div
                className={`w-9 h-9 flex items-center justify-center transition-all duration-300 group-hover:bg-h-blue ${
                  scrolled ? 'bg-h-navy' : 'bg-white/90 backdrop-blur-sm'
                }`}
              >
                <span
                  className={`font-display font-bold text-base leading-none transition-colors duration-300 ${
                    scrolled ? 'text-white' : 'text-h-navy'
                  }`}
                >
                  H
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-display font-semibold text-lg leading-none tracking-tight transition-colors duration-300 ${
                    scrolled ? 'text-h-navy' : 'text-white'
                  }`}
                >
                  Homton
                </span>
                <span
                  className={`font-body text-[9px] tracking-[0.18em] uppercase font-medium transition-colors duration-300 ${
                    scrolled ? 'text-h-blue' : 'text-[#8FC0FF]'
                  }`}
                >
                  Real Estate
                </span>
              </div>
            </a>

            {/* ─── Desktop Nav Links ─────────────────────────────────────────── */}
            <ul className="hidden md:flex items-center gap-6 lg:gap-10">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className={`font-body text-sm font-medium tracking-wide relative group transition-colors duration-300 ${
                      scrolled ? 'text-h-slate hover:text-h-navy' : 'text-white/85 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-h-blue transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* ─── CTA + Hamburger ──────────────────────────────────────────── */}
            <div className="flex items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => handleNav(e, '#contact')}
                className="hidden md:inline-flex btn-primary text-xs py-3 px-6"
              >
                <span>Book Viewing</span>
              </a>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col gap-1.5 p-2 group"
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-6 h-px transition-all duration-300 ${scrolled || menuOpen ? 'bg-h-navy' : 'bg-white'} ${
                    menuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block w-4 h-px transition-all duration-300 ${scrolled || menuOpen ? 'bg-h-navy' : 'bg-white'} ${
                    menuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block w-6 h-px transition-all duration-300 ${scrolled || menuOpen ? 'bg-h-navy' : 'bg-white'} ${
                    menuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </button>
            </div>

          </nav>
        </div>

        {/* ─── Progress Line ──────────────────────────────────────────────────── */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-h-border" />
        )}
      </header>

      {/* ─── Mobile Menu ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-x-0 top-20 z-40 bg-white/95 backdrop-blur-md shadow-luxury border-b border-h-border md:hidden"
          >
            <div className="container-luxury py-8">
              <ul className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNav(e, link.href)}
                      className="font-display text-2xl text-h-navy hover:text-h-blue transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-h-border">
                <a
                  href="#contact"
                  onClick={(e) => handleNav(e, '#contact')}
                  className="btn-primary w-full justify-center"
                >
                  <span>Book a Private Viewing</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
