'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const featured = [
  {
    name: 'Diablo Punch',
    tagline: 'Maximum Impact',
    desc: 'Pure aggression in a can. Our highest-caffeine formula designed for those who train harder, push further, and refuse to quit.',
    color: '#E8001D',
    colorRgb: '232,0,29',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_DiabloPunch.jpg',
    href: 'https://www.eljefe.com/products/diablo-punch',
    stats: [{ label: 'Caffeine', val: '200mg' }, { label: 'B-Vitamins', val: '6 types' }, { label: 'Calories', val: '10' }],
  },
  {
    name: 'Phantom Lemonade',
    tagline: 'Gold Standard',
    desc: 'Crisp lemon electrified with a gold-standard blend. The clean, refined choice for those who dominate with elegance.',
    color: '#D4AF37',
    colorRgb: '212,175,55',
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_phantom_lemonade.jpg',
    href: 'https://www.eljefe.com/products/phantom-lemonade',
    stats: [{ label: 'Caffeine', val: '160mg' }, { label: 'Electrolytes', val: '5 types' }, { label: 'Sugar', val: '0g' }],
  },
  {
    name: 'Mailo Tamarindo',
    tagline: 'The Original',
    desc: 'Where it all started. Bold, tangy tamarindo meets unstoppable energy. The flavor that built the movement.',
    color: '#A0522D',
    colorRgb: '160,82,45',
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_2048_Mailo_Tamarindo.jpg',
    href: 'https://www.eljefe.com/products/mailo-tamarindo',
    stats: [{ label: 'Caffeine', val: '180mg' }, { label: 'Taurine', val: '1000mg' }, { label: 'Calories', val: '15' }],
  },
]

export default function ProductSpotlight() {
  const [active, setActive] = useState(0)
  const current = featured[active]

  return (
    <section
      className="relative py-24 md:py-52 overflow-hidden"
      style={{ background: '#050507' }}
    >
      {/* Animated bg glow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.color}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: `radial-gradient(ellipse 60% 50% at 70% 50%, rgba(${current.colorRgb},0.12) 0%, transparent 70%)`,
          }}
        />
      </AnimatePresence>

      <div className="relative z-10 px-10 md:px-20">
        {/* Section label */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#E8001D' }}>
            Featured
          </span>
          <h2
            className="mt-5 font-black uppercase"
            style={{ fontSize: 'clamp(3rem, 6vw, 8rem)', letterSpacing: '-0.02em', lineHeight: 0.92 }}
          >
            <span className="text-white">Signature </span>
            <span
              style={{
                background: 'linear-gradient(135deg, #E8001D, #D4AF37)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Drops
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28 items-center">
          {/* Left — image with switcher tabs */}
          <div className="flex flex-col gap-8">
            <div className="flex gap-3">
              {featured.map((f, i) => (
                <motion.button
                  key={f.name}
                  onClick={() => setActive(i)}
                  className="px-5 py-2.5 text-xs font-black tracking-widest uppercase transition-all duration-300 border"
                  style={{
                    borderColor: active === i ? f.color : 'rgba(255,255,255,0.1)',
                    color: active === i ? f.color : 'rgba(255,255,255,0.35)',
                    background: active === i ? `rgba(${f.colorRgb},0.08)` : 'transparent',
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {f.name.split(' ')[0]}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: '4/3' }}
                initial={{ opacity: 0, x: -30, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={current.img}
                  alt={current.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name + 'info'}
              className="flex flex-col gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: current.color }}
              >
                {current.tagline}
              </span>

              <h3
                className="font-black uppercase leading-none"
                style={{ fontSize: 'clamp(2.5rem, 4.5vw, 6rem)', letterSpacing: '-0.02em', color: '#fff' }}
              >
                {current.name}
              </h3>

              <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '480px' }}>
                {current.desc}
              </p>

              {/* Stats */}
              <div
                className="grid grid-cols-3 gap-px"
                style={{ background: 'rgba(255,255,255,0.07)' }}
              >
                {current.stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col gap-2 p-6 md:p-8"
                    style={{ background: '#050507' }}
                  >
                    <span className="text-2xl font-black" style={{ color: current.color }}>
                      {s.val}
                    </span>
                    <span
                      className="text-xs tracking-wider uppercase"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex gap-4 mt-2">
                <motion.a
                  href={current.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-9 py-4 text-xs font-bold tracking-widest uppercase text-white"
                  style={{ background: current.color }}
                  whileHover={{ scale: 1.04, boxShadow: `0 0 30px rgba(${current.colorRgb},0.4)` }}
                  whileTap={{ scale: 0.97 }}
                >
                  Shop Now
                </motion.a>
                <motion.a
                  href="#flavors"
                  className="px-9 py-4 text-xs font-bold tracking-widest uppercase text-white border border-white/15 hover:border-white/40 transition-colors"
                  whileHover={{ scale: 1.03 }}
                >
                  All Flavors
                </motion.a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
