'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { InteractiveTravelCard } from '@/components/ui/3d-card'

const flavors = [
  {
    name: 'Mailo Tamarindo',
    short: 'TAMARINDO',
    num: '01',
    color: '#A0522D',
    colorRgb: '160,82,45',
    desc: 'Bold, tangy, unforgettable.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_2048_Mailo_Tamarindo.jpg',
    href: 'https://www.eljefe.com/collections/energy-drinks',
  },
  {
    name: 'Killer Peach',
    short: 'PEACH',
    num: '02',
    color: '#FF6B35',
    colorRgb: '255,107,53',
    desc: 'Sweet heat. Assassin in fruit form.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_KillerPeach.jpg',
    href: 'https://www.eljefe.com/collections/energy-drinks',
  },
  {
    name: 'Phantom Lemon',
    short: 'LEMON',
    num: '03',
    color: '#D4AF37',
    colorRgb: '212,175,55',
    desc: 'Gold standard. Clean fuel only.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_phantom_lemonade.jpg',
    href: 'https://www.eljefe.com/collections/energy-drinks',
  },
  {
    name: 'Sinister Razz',
    short: 'RAZZ',
    num: '04',
    color: '#C71585',
    colorRgb: '199,21,133',
    desc: 'Dark berry. Dangerous edge.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_SinisterRazz.jpg',
    href: 'https://www.eljefe.com/collections/energy-drinks',
  },
  {
    name: 'Diablo Punch',
    short: 'PUNCH',
    num: '05',
    color: '#E8001D',
    colorRgb: '232,0,29',
    desc: 'Pure aggression. Zero mercy.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_DiabloPunch.jpg',
    href: 'https://www.eljefe.com/collections/energy-drinks',
  },
  {
    name: 'Zuma Watermelon',
    short: 'WATERMELON',
    num: '06',
    color: '#22C55E',
    colorRgb: '34,197,94',
    desc: 'Summer dominance. Relentless.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_zuma_watermelon.jpg',
    href: 'https://www.eljefe.com/collections/energy-drinks',
  },
  {
    name: 'Baja Orange',
    short: 'ORANGE',
    num: '07',
    color: '#FF6B00',
    colorRgb: '255,107,0',
    desc: 'West coast. Sun-fueled supremacy.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_2048px_baja_orange.jpg',
    href: 'https://www.eljefe.com/collections/energy-drinks',
  },
  {
    name: 'Wild Mango',
    short: 'MANGO',
    num: '08',
    color: '#F59E0B',
    colorRgb: '245,158,11',
    desc: 'Tropical power. Untamed.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_WildMango.jpg',
    href: 'https://www.eljefe.com/collections/energy-drinks',
  },
]

const STATS = ['Zero Sugar', '150mg Caffeine', '2000mg Taurine', '200mg Ginseng']

const INTRO_VH = 90
const SLIDE_VH = 90
const TOTAL_VH = INTRO_VH + flavors.length * SLIDE_VH

// Scale / opacity / y-drop per distance from active can
const SCALE_MAP  = [1, 0.74, 0.54, 0.38, 0.28]
const OPACITY_MAP = [1, 0.60, 0.32, 0.14, 0.05]
const Y_MAP       = [0, 30, 55, 72, 80]
const SLOT = 300 // px between can centers

export default function Flavors() {
  const desktopRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const { scrollYProgress } = useScroll({
    target: desktopRef,
    offset: ['start start', 'end end'],
  })

  const introEnd = INTRO_VH / TOTAL_VH

  // Header fades out as intro ends
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, introEnd * 0.5, introEnd * 0.9],
    [1, 1, 0],
  )
  // Carousel fades in as intro ends
  const carouselOpacity = useTransform(
    scrollYProgress,
    [introEnd * 0.6, introEnd],
    [0, 1],
  )
  const scrollHintOpacity = useTransform(scrollYProgress, [0, introEnd * 0.25], [1, 0])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v <= introEnd) { setActiveIdx(0); return }
    const p = (v - introEnd) / (1 - introEnd)
    const idx = Math.min(Math.max(Math.round(p * (flavors.length - 1)), 0), flavors.length - 1)
    setActiveIdx(idx)
  })

  const current = flavors[activeIdx]

  return (
    <section id="flavors" className="relative" style={{ background: '#050507' }}>

      {/* ── MOBILE ───────────────────────────────────────── */}
      <div className="block md:hidden py-24 px-8">
        <div className="mb-14 flex flex-col gap-5">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#E8001D' }}>
            The Lineup
          </span>
          <h2
            className="font-black uppercase leading-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', letterSpacing: '-0.02em' }}
          >
            <span className="text-white block">Pick Your</span>
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #E8001D, #D4AF37)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Weapon
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4" style={{ perspective: '1000px' }}>
          {flavors.map((flavor, i) => (
            <motion.div
              key={flavor.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <InteractiveTravelCard
                title={flavor.name}
                subtitle={flavor.short}
                imageUrl={flavor.img}
                actionText="Shop"
                href={flavor.href}
                accentColor={flavor.color}
                onActionClick={() => {}}
                className="w-full h-[20rem]"
              />
            </motion.div>
          ))}
        </div>
        <motion.a
          href="https://www.eljefe.com/collections/energy-drinks"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex mt-14 px-10 py-4 text-sm font-bold tracking-widest uppercase text-white border border-white/10"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Shop All Flavors →
        </motion.a>
      </div>

      {/* ── DESKTOP ──────────────────────────────────────── */}
      <div
        ref={desktopRef}
        className="hidden md:block"
        style={{ height: `${TOTAL_VH}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#050507' }}>

          {/* Ambient color glow — shifts per flavor */}
          <motion.div
            key={current.color}
            className="absolute inset-0 pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              background: `radial-gradient(ellipse 60% 50% at 50% 38%, rgba(${current.colorRgb},0.18) 0%, transparent 65%)`,
            }}
          />

          {/* ── PICK YOUR WEAPON intro ─────────────────── */}
          <motion.div
            className="absolute inset-0 z-20 flex flex-col justify-center pointer-events-none"
            style={{ opacity: headerOpacity, padding: '0 72px' }}
          >
            <motion.span
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: '10px',
                letterSpacing: '0.22em',
                color: '#E8001D',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '20px',
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              The Lineup
            </motion.span>
            <motion.h2
              className="font-black uppercase leading-none"
              style={{ fontSize: 'clamp(4.5rem, 9vw, 12rem)', letterSpacing: '-0.03em' }}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-white block">Pick Your</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #E8001D 0%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Weapon
              </span>
            </motion.h2>
            <motion.p
              style={{
                fontFamily: "var(--font-dm, 'DM Sans', sans-serif)",
                fontSize: '15px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.32)',
                lineHeight: 1.8,
                marginTop: '28px',
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              8 flavors. Zero sugar. Born fearless.
            </motion.p>
            <motion.div
              className="flex items-center gap-3 mt-12"
              style={{ opacity: scrollHintOpacity }}
            >
              <motion.span
                style={{ color: 'rgba(255,255,255,0.3)', fontSize: '18px' }}
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                ↓
              </motion.span>
              <span
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: '8px',
                  letterSpacing: '0.18em',
                  color: 'rgba(255,255,255,0.2)',
                  textTransform: 'uppercase',
                }}
              >
                Scroll to explore
              </span>
            </motion.div>
          </motion.div>

          {/* ── CAROUSEL ──────────────────────────────── */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-0"
            style={{ opacity: carouselOpacity }}
          >
            {/* Counter */}
            <div
              className="absolute top-14 right-16 z-30"
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: '10px',
                letterSpacing: '0.22em',
                color: current.color,
                textTransform: 'uppercase',
              }}
            >
              {current.num} / {String(flavors.length).padStart(2, '0')}
            </div>

            {/* Cans row */}
            <div
              className="relative flex items-end justify-center w-full overflow-hidden"
              style={{ height: '52vh', flexShrink: 0 }}
            >
              {flavors.map((flavor, i) => {
                const offset = i - activeIdx
                const dist = Math.abs(offset)
                const sc = SCALE_MAP[Math.min(dist, SCALE_MAP.length - 1)]
                const op = OPACITY_MAP[Math.min(dist, OPACITY_MAP.length - 1)]
                const yDrop = Y_MAP[Math.min(dist, Y_MAP.length - 1)]
                const isActive = dist === 0

                return (
                  <motion.div
                    key={flavor.name}
                    className="absolute"
                    style={{ width: `${SLOT}px`, height: '90%', bottom: 0, left: '50%', marginLeft: `-${SLOT / 2}px` }}
                    animate={{ x: offset * SLOT, scale: sc, opacity: op, y: yDrop }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Can image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={flavor.img}
                        alt={flavor.name}
                        fill
                        className="object-contain"
                        sizes="300px"
                        priority={flavor.num === '01'}
                      />
                    </div>

                    {/* Glow platform — only on active */}
                    {isActive && (
                      <motion.div
                        className="absolute pointer-events-none"
                        style={{
                          bottom: '-12px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '180%',
                          height: '48px',
                          background: `radial-gradient(ellipse at center, rgba(${flavor.colorRgb},0.7) 0%, transparent 68%)`,
                          filter: 'blur(10px)',
                        }}
                        initial={{ opacity: 0, scaleX: 0.4 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Active flavor info */}
            <div className="flex flex-col items-center text-center" style={{ marginTop: '36px', gap: '10px' }}>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={current.name}
                  className="font-black uppercase leading-none"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 4.5rem)',
                    letterSpacing: '-0.025em',
                    color: current.color,
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {current.name}
                </motion.h3>
              </AnimatePresence>

              <motion.p
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: '9px',
                  letterSpacing: '0.22em',
                  color: 'rgba(255,255,255,0.28)',
                  textTransform: 'uppercase',
                }}
              >
                Fuel for the Fearless
              </motion.p>

              {/* Stats chips */}
              <div className="flex items-center gap-5 mt-2">
                {STATS.map((s, i) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: '8px',
                      letterSpacing: '0.14em',
                      color: i === 0 ? current.color : 'rgba(255,255,255,0.35)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {i > 0 && <span style={{ marginRight: '20px', color: 'rgba(255,255,255,0.12)' }}>·</span>}
                    {s}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href={current.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mt-4 px-10 py-3.5 font-bold tracking-widest uppercase text-black"
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: '9px',
                  letterSpacing: '0.15em',
                  background: current.color,
                }}
                whileHover={{ scale: 1.05, boxShadow: `0 0 32px rgba(${current.colorRgb},0.55)` }}
                whileTap={{ scale: 0.97 }}
              >
                Shop Now →
              </motion.a>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-2.5 absolute bottom-9">
              {flavors.map((f, i) => (
                <motion.div
                  key={f.name}
                  className="rounded-full"
                  animate={{
                    width: i === activeIdx ? 28 : 6,
                    height: 6,
                    background: i === activeIdx ? f.color : 'rgba(255,255,255,0.18)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
