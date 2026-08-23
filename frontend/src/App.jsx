import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import BrandStatement from './components/sections/BrandStatement'
import ContactCTA from './components/sections/ContactCTA'
import FeaturedProperties from './components/sections/FeaturedProperties'
import Hero from './components/sections/Hero'
import PropertyShowcase from './components/sections/PropertyShowcase'
import Testimonials from './components/sections/Testimonials'
import VirtualTour from './components/sections/VirtualTour'
import PageLoader from './components/ui/PageLoader'
import ScrollProgress from './components/ui/ScrollProgress'
import { useLenis } from './hooks/useLenis'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  // Initialize Lenis smooth scroll (synced with GSAP ScrollTrigger)
  useLenis()

  useEffect(() => {
    // Configure GSAP defaults globally
    gsap.config({ nullTargetWarn: false })
    ScrollTrigger.config({ limitCallbacks: true })

    // Refresh ScrollTrigger after fonts load
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <div className="relative bg-white overflow-x-hidden">
      {/* Cinematic intro loader (self-dismisses) */}
      <PageLoader />

      {/* Top scroll-progress indicator */}
      <ScrollProgress />

      <Navbar />
      <main>
        <Hero />
        <FeaturedProperties />
        <BrandStatement />
        <PropertyShowcase />
        <VirtualTour />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  )
}
