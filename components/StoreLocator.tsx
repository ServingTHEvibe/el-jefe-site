'use client'

import { motion } from 'framer-motion'

const retailers = [
  { name: 'Walmart' },
  { name: 'Target' },
  { name: '7-Eleven' },
  { name: 'Circle K' },
  { name: 'Kroger' },
  { name: 'Walgreens' },
]

export default function StoreLocator() {
  return (
    <section
      id="find-us"
      className="relative py-52 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #000 0%, #0a0000 50%, #000 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(232,0,29,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 px-10 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">

          {/* Left content */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#E8001D' }}>
              Find Your Fuel
            </span>

            <h2
              className="font-black uppercase leading-none"
              style={{ fontSize: 'clamp(3rem, 6vw, 8rem)', letterSpacing: '-0.02em' }}
            >
              <span className="text-white">Near </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, #E8001D, #D4AF37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                You
              </span>
            </h2>

            <p className="text-lg max-w-md" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
              El Jefe Energy is available at 10,000+ locations across the US.
              Find your nearest store and join the movement today.
            </p>

            {/* Search bar */}
            <div className="flex gap-0 mt-2">
              <input
                type="text"
                placeholder="Enter your zip code..."
                className="flex-1 px-6 py-5 text-sm text-white outline-none"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRight: 'none',
                }}
              />
              <motion.button
                className="px-8 py-5 text-sm font-bold tracking-wider uppercase text-white shrink-0"
                style={{ background: '#E8001D' }}
                whileHover={{ scale: 1.03, backgroundColor: '#FF1A1A' }}
                whileTap={{ scale: 0.97 }}
              >
                Find →
              </motion.button>
            </div>

            {/* Retailer badges */}
            <div className="mt-4">
              <p className="text-xs tracking-widest uppercase mb-5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Available at
              </p>
              <div className="flex flex-wrap gap-3">
                {retailers.map((r, i) => (
                  <motion.div
                    key={r.name}
                    className="px-4 py-2.5 text-xs font-bold tracking-widest uppercase"
                    style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.45)',
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    whileHover={{ borderColor: 'rgba(232,0,29,0.4)', color: '#fff' }}
                  >
                    {r.name}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — real map */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Red glow border frame */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: '1 / 1',
                border: '1px solid rgba(232,0,29,0.25)',
                boxShadow: '0 0 60px rgba(232,0,29,0.08)',
              }}
            >
              {/* Dark overlay on top of map to match brand tone */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.35) 100%)',
                }}
              />

              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-130.0%2C24.0%2C-66.0%2C50.0&layer=mapnik"
                width="100%"
                height="100%"
                style={{
                  border: 'none',
                  display: 'block',
                  filter: 'invert(0.92) hue-rotate(180deg) saturate(0.4) brightness(0.75)',
                }}
                title="El Jefe Energy store locations"
                loading="lazy"
              />

              {/* Location count badge */}
              <div
                className="absolute bottom-5 left-5 z-20 px-4 py-3"
                style={{
                  background: 'rgba(5,5,7,0.9)',
                  border: '1px solid rgba(232,0,29,0.3)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <p className="text-xs font-black tracking-widest uppercase text-white">10,000+ Locations</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Nationwide</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
