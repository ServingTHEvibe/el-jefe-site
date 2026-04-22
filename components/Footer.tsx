'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const links = {
  Products: [
    { label: 'Energy Drinks', href: 'https://www.eljefe.com/collections/energy-drinks' },
    { label: 'Variety Packs', href: 'https://www.eljefe.com/products/the-boss-7-5-power-pack' },
    { label: 'Merchandise', href: 'https://www.eljefe.com/collections/merchandise' },
    { label: 'New Arrivals', href: 'https://www.eljefe.com/collections/all' },
  ],
  Company: [
    { label: 'About El Jefe', href: '#about' },
    { label: 'Our Story', href: '#about' },
    { label: 'Careers', href: 'https://www.eljefe.com/pages/contact' },
    { label: 'Press', href: 'https://www.eljefe.com/pages/contact' },
  ],
  Support: [
    { label: 'Store Locator', href: '#find-us' },
    { label: 'Contact Us', href: 'https://www.eljefe.com/pages/contact' },
    { label: 'FAQ', href: 'https://www.eljefe.com/pages/faq' },
    { label: 'Shipping', href: 'https://www.eljefe.com/policies/shipping-policy' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: 'https://www.eljefe.com/policies/privacy-policy' },
    { label: 'Terms of Use', href: 'https://www.eljefe.com/policies/terms-of-service' },
    { label: 'Cookie Policy', href: 'https://www.eljefe.com/policies/privacy-policy' },
  ],
}

const socials = [
  { label: 'IG', href: 'https://www.instagram.com/eljefe_energy' },
  { label: 'TK', href: 'https://www.tiktok.com/@eljefeenergy' },
  { label: 'TW', href: 'https://twitter.com/eljefeenergy' },
  { label: 'YT', href: 'https://www.youtube.com/@eljefeenergy' },
]

export default function Footer() {
  return (
    <footer className="relative pt-20 md:pt-36 pb-10 overflow-hidden" style={{ background: '#050507' }}>
      {/* Top border */}
      <div
        className="w-full h-px mb-24"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(232,0,29,0.4), rgba(212,175,55,0.2), transparent)',
        }}
      />

      <div className="px-10 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20 mb-24">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="relative" style={{ width: 180, height: 64 }}>
              <Image
                src="https://www.eljefe.com/cdn/shop/files/El_Jefe_Energy_logo-white_transparent.png"
                alt="El Jefe Energy"
                fill
                className="object-contain object-left"
                sizes="180px"
              />
            </div>
            <p className="text-base max-w-xs" style={{ color: 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}>
              Fuel for the Fearless. Crafted for those who lead, dominate, and never ask permission.
            </p>
            <div className="flex gap-3 mt-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center text-xs font-bold"
                  style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                  whileHover={{ borderColor: '#E8001D', color: '#E8001D', scale: 1.08 }}
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items], i) => (
            <motion.div
              key={section}
              className="flex flex-col gap-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <h4 className="text-xs font-black tracking-widest uppercase text-white">{section}</h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm transition-colors"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © 2025 El Jefe Energy. All rights reserved. Fearless. Unapologetic. Refined.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
            Must be 18+ to purchase. Drink responsibly.
          </p>
        </div>
      </div>
    </footer>
  )
}
