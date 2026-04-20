'use client'

import { motion } from 'framer-motion'

const words = ['FEARLESS', 'UNAPOLOGETIC', 'REFINED', 'DOMINANT', 'RELENTLESS', 'FEARLESS', 'UNAPOLOGETIC', 'REFINED', 'DOMINANT', 'RELENTLESS']

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="overflow-hidden py-3 select-none">
      <motion.div
        className="flex gap-14 whitespace-nowrap"
        animate={{ x: reverse ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        {[...words, ...words].map((w, i) => (
          <span
            key={i}
            className="text-7xl md:text-9xl font-black uppercase shrink-0"
            style={{
              color: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.04)',
              WebkitTextStroke: i % 2 === 0 ? '1px rgba(232,0,29,0.18)' : 'none',
              letterSpacing: '-0.02em',
            }}
          >
            {w}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

const stats = [
  { num: '200MG', label: 'Caffeine', desc: 'Max energy, no crash' },
  { num: '0G', label: 'Sugar options', desc: 'Clean fuel only' },
  { num: '8+', label: 'Bold flavors', desc: 'A weapon for every boss' },
  { num: '10K+', label: 'Locations', desc: 'Nationwide reach' },
]

export default function Manifesto() {
  return (
    <section className="relative overflow-hidden py-56" style={{ background: '#050507' }}>
      {/* Marquee — full bleed */}
      <div className="mb-40 -mx-4">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>

      {/* Core statement */}
      <div className="px-10 md:px-20 mb-36">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-black uppercase leading-none"
            style={{ fontSize: 'clamp(3rem, 6vw, 7rem)', letterSpacing: '-0.02em' }}
          >
            <span className="text-white">El Jefe isn&apos;t<br />just a drink —</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #E8001D 0%, #FF4500 50%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              it&apos;s a movement.
            </span>
          </p>

          <motion.p
            className="mt-10 text-xl font-light max-w-xl"
            style={{ color: 'rgba(255,255,255,0.35)', lineHeight: 1.9 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            For those who lead, dominate, and never ask permission.
            We don&apos;t follow trends — we set them.
          </motion.p>
        </motion.div>
      </div>

      {/* Stats — full width grid */}
      <div className="px-10 md:px-20">
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col gap-4 p-12 md:p-16"
              style={{ background: '#050507' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ background: 'rgba(232,0,29,0.04)' }}
            >
              <div
                className="font-black leading-none"
                style={{
                  fontSize: 'clamp(2.5rem, 4.5vw, 5rem)',
                  background: 'linear-gradient(135deg, #E8001D, #FF4500)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {s.num}
              </div>
              <div className="text-sm font-black tracking-widest uppercase text-white">{s.label}</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
