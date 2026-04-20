'use client'

import { motion } from 'framer-motion'

const links = {
  Products: ['Energy Drinks', 'Variety Packs', 'Merchandise', 'New Arrivals'],
  Company: ['About El Jefe', 'Our Story', 'Careers', 'Press'],
  Support: ['Store Locator', 'Contact Us', 'FAQ', 'Shipping'],
  Legal: ['Privacy Policy', 'Terms of Use', 'Cookie Policy'],
}

export default function Footer() {
  return (
    <footer className="relative pt-36 pb-12 overflow-hidden" style={{ background: '#050507' }}>
      {/* Top border */}
      <div className="w-full h-px mb-24" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,0,29,0.4), rgba(212,175,55,0.2), transparent)' }} />

      <div className="px-10 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20 mb-24">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <span
                className="font-black tracking-wider uppercase"
                style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)', color: '#E8001D' }}
              >
                EL JEFE
              </span>
              <span className="block text-xs font-semibold tracking-widest uppercase mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                ENERGY
              </span>
            </div>
            <p className="text-base max-w-xs" style={{ color: 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}>
              Fuel for the Fearless. Crafted for those who lead, dominate, and never ask permission.
            </p>
            <div className="flex gap-3 mt-3">
              {['IG', 'TK', 'TW', 'YT'].map((s) => (
                <motion.a
                  key={s}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center text-xs font-bold"
                  style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                  whileHover={{ borderColor: '#E8001D', color: '#E8001D', scale: 1.08 }}
                >
                  {s}
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
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm transition-colors"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                    >
                      {item}
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
            © 2024 El Jefe Energy. All rights reserved. Fearless. Unapologetic. Refined.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
            Must be 18+ to purchase. Drink responsibly.
          </p>
        </div>
      </div>
    </footer>
  )
}
