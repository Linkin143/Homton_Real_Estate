import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const NAV_LINKS = {
  'Properties': [
    { label: 'Penthouses', href: '#properties' },
    { label: 'Villas', href: '#properties' },
    { label: 'Apartments', href: '#properties' },
    { label: 'Estates', href: '#properties' },
    { label: 'Townhouses', href: '#properties' },
  ],
  'Services': [
    { label: 'Virtual Tours', href: '#tour' },
    { label: 'Property Valuation', href: '#contact' },
    { label: 'Investment Advisory', href: '#contact' },
    { label: 'Interior Design', href: '#contact' },
    { label: 'Legal Assistance', href: '#contact' },
  ],
  'Company': [
    { label: 'About Homton', href: '#brand' },
    { label: 'Our Agents', href: '#contact' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Press & Media', href: '#contact' },
    { label: 'Careers', href: '#contact' },
  ],
};

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58a2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo subtle entrance on scroll into view
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );

      // Divider line draw
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 95%',
            once: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const colVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <footer ref={footerRef} className="bg-h-navy text-white relative overflow-hidden">
      {/* Subtle decorative gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-h-blue/40 to-transparent" />

      {/* Top glow orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(27,79,216,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="container-luxury pt-20 pb-0 relative z-10">
        {/* Top section: brand + nav columns */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Brand column — spans 2 cols on large */}
          <motion.div className="lg:col-span-2" variants={colVariants}>
            <div ref={logoRef}>
              {/* Logo mark */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-h-blue flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
                    <rect x="8" y="18" width="6" height="14" rx="1" fill="white" />
                    <rect x="17" y="10" width="6" height="22" rx="1" fill="white" />
                    <rect x="26" y="14" width="6" height="18" rx="1" fill="white" opacity="0.6" />
                  </svg>
                </div>
                <div>
                  <span className="font-playfair text-xl font-bold tracking-wide">Homton</span>
                  <span className="block text-[10px] tracking-[0.25em] uppercase text-white/40 font-inter">
                    Real Estate
                  </span>
                </div>
              </div>

              <p className="text-white/55 text-sm leading-relaxed font-inter max-w-xs mb-8">
                Curating the world's most extraordinary residential properties for discerning buyers
                who demand nothing less than perfection.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-h-blue/60 hover:bg-h-blue/10 transition-all duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Nav columns */}
          {Object.entries(NAV_LINKS).map(([title, links]) => (
            <motion.div key={title} variants={colVariants}>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 font-inter mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/55 hover:text-white font-inter transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter strip */}
        <motion.div
          className="rounded-2xl border border-white/8 bg-white/4 p-8 mb-16 flex flex-col md:flex-row items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex-1 text-center md:text-left">
            <p className="font-playfair text-lg font-semibold mb-1">
              Stay Ahead of the Market
            </p>
            <p className="text-sm text-white/45 font-inter">
              Exclusive listings, market insights and investment opportunities — delivered privately.
            </p>
          </div>
          <form
            className="flex w-full md:w-auto gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-64 px-4 py-2.5 rounded-lg bg-white/8 border border-white/12 text-sm text-white placeholder-white/30 font-inter focus:outline-none focus:border-h-blue/60 focus:bg-white/10 transition-all duration-200"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-h-blue hover:bg-blue-600 text-white text-sm font-semibold font-inter transition-colors duration-200 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </motion.div>

        {/* Divider */}
        <div ref={dividerRef} className="h-px bg-white/8 mb-8" />

        {/* Bottom bar */}
        <div className="pb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 font-inter text-center md:text-left">
            © {new Date().getFullYear()} Homton Real Estate. All rights reserved.&nbsp;
            <span className="text-white/20">Luxury Real Estate Advisory &amp; Brokerage</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-white/30 hover:text-white/70 font-inter transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Large watermark text */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden w-full flex justify-center"
          aria-hidden="true"
        >
          <span
            className="font-playfair font-bold text-white/[0.025] whitespace-nowrap"
            style={{ fontSize: 'clamp(80px, 14vw, 180px)', lineHeight: 1 }}
          >
            HOMTON
          </span>
        </div>
      </div>
    </footer>
  );
}
