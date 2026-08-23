import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { inquiriesApi } from '../../utils/api'

gsap.registerPlugin(ScrollTrigger)

const propertyTypes = ['Penthouse', 'Villa', 'Estate', 'Apartment', 'Townhouse', 'Other']
const budgetRanges = ['$1M – $5M', '$5M – $15M', '$15M – $30M', '$30M+', 'Flexible']

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Private Line',
    value: '+1 212 555 0100',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Private Email',
    value: 'private@homton.com',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Headquarters',
    value: '375 Park Avenue, New York',
  },
]

export default function ContactCTA() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', type: '', budget: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!formRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current.querySelectorAll('.form-field'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: formRef.current, start: 'top 80%', once: true } }
      )
    })
    return () => ctx.revert()
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      await inquiriesApi.create({ ...form, source: 'contact-form' })
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '', type: '', budget: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  const inputClass = 'w-full bg-transparent border-b border-h-border py-3 font-body text-h-navy text-sm placeholder:text-h-slate/60 focus:outline-none focus:border-h-blue transition-colors duration-200'
  const selectClass = `${inputClass} cursor-pointer appearance-none`

  return (
    <section id="contact" ref={sectionRef} className="relative bg-h-muted py-section overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-h-border" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-blue-50/60 blur-3xl" />
      </div>

      <div className="container-luxury relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 xl:gap-24 items-start">

          {/* ─── Left: Info ──────────────────────────────────────────────────── */}
          <div>
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <span className="section-label">Private Consultation</span>
              <h2 className="display-xl font-display text-h-navy mb-6 mt-2">
                Begin Your<br />
                <span className="text-h-blue">Property Journey</span>
              </h2>
              <p className="font-body text-h-slate text-base leading-relaxed mb-12 max-w-sm">
                Speak directly with a senior Homton advisor. Every inquiry is handled
                with absolute discretion and responded to within 24 hours.
              </p>
            </motion.div>

            {/* Contact info */}
            <div className="flex flex-col gap-6">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                >
                  <div className="w-11 h-11 bg-h-navy text-white flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-body text-xs text-h-slate tracking-wide mb-0.5">{item.label}</p>
                    <p className="font-body text-h-navy font-medium text-sm">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Office hours */}
            <div className="mt-10 pt-10 border-t border-h-border">
              <p className="label-sm text-h-slate mb-3">Office Hours</p>
              <div className="space-y-1">
                <p className="font-body text-h-navy text-sm">Monday – Friday: 9:00 AM – 7:00 PM EST</p>
                <p className="font-body text-h-slate text-sm">Weekend: By appointment only</p>
              </div>
            </div>
          </div>

          {/* ─── Right: Form ─────────────────────────────────────────────────── */}
          <div className="bg-white p-10 shadow-luxury">
            {status === 'success' ? (
              <motion.div
                className="flex flex-col items-center justify-center py-16 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 bg-h-navy flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-h-navy text-2xl font-semibold mb-3">Inquiry Received</h3>
                <p className="font-body text-h-slate text-base max-w-xs">
                  A senior Homton advisor will contact you within 24 hours. We look forward to speaking with you.
                </p>
                <button onClick={() => setStatus('idle')} className="mt-8 btn-outline text-sm py-2 px-6"><span>Send Another</span></button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-7">
                <div>
                  <p className="font-display text-h-navy font-semibold text-xl mb-1">Private Inquiry</p>
                  <p className="font-body text-h-slate text-xs">All fields marked * are required</p>
                </div>

                <div className="form-field grid sm:grid-cols-2 gap-7">
                  <div>
                    <label className="label-sm text-h-slate block mb-2">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className={inputClass} />
                  </div>
                  <div>
                    <label className="label-sm text-h-slate block mb-2">Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className={inputClass} />
                  </div>
                </div>

                <div className="form-field grid sm:grid-cols-2 gap-7">
                  <div>
                    <label className="label-sm text-h-slate block mb-2">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 000 000 0000" className={inputClass} />
                  </div>
                  <div>
                    <label className="label-sm text-h-slate block mb-2">Property Type</label>
                    <select name="type" value={form.type} onChange={handleChange} className={selectClass}>
                      <option value="">Select type...</option>
                      {propertyTypes.map((t) => <option key={t} value={t.toLowerCase()}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label className="label-sm text-h-slate block mb-2">Budget Range</label>
                  <div className="flex flex-wrap gap-2">
                    {budgetRanges.map((b) => (
                      <button
                        key={b} type="button"
                        onClick={() => setForm({ ...form, budget: b })}
                        className={`px-4 py-2 font-body text-xs tracking-wide transition-all duration-200 ${form.budget === b ? 'bg-h-navy text-white' : 'border border-h-border text-h-slate hover:border-h-navy'}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-field">
                  <label className="label-sm text-h-slate block mb-2">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Tell us about your ideal property and any specific requirements..." className={`${inputClass} resize-none`} />
                </div>

                {status === 'error' && (
                  <p className="font-body text-red-600 text-sm">{errorMsg}</p>
                )}

                <div className="form-field">
                  <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center disabled:opacity-70">
                    {status === 'loading'
                      ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Sending...</span></span>
                      : <span>Submit Private Inquiry</span>
                    }
                  </button>
                  <p className="font-body text-h-slate text-xs mt-3 text-center">Your information is kept strictly confidential</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
