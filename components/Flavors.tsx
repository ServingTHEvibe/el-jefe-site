'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import { InteractiveTravelCard } from '@/components/ui/3d-card'

const flavors = [
  {
    name: 'Mailo Tamarindo',
    short: 'TAMARINDO',
    num: '01',
    color: '#A0522D',
    colorRgb: '160,82,45',
    desc: 'Bold, tangy, unforgettable. The flavor that built the movement.',
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
    desc: 'Gold standard refreshment. Clean fuel only.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_phantom_lemonade.jpg',
    href: 'https://www.eljefe.com/collections/energy-drinks',
  },
  {
    name: 'Sinister Razz',
    short: 'RAZZ',
    num: '04',
    color: '#C71585',
    colorRgb: '199,21,133',
    desc: 'Dark berry. Dangerous edge. No apologies.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_SinisterRazz.jpg',
    href: 'https://www.eljefe.com/collections/energy-drinks',
  },
  {
    name: 'Diablo Punch',
    short: 'PUNCH',
    num: '05',
    color: '#E8001D',
    colorRgb: '232,0,29',
    desc: 'Pure aggression. Zero mercy. Maximum impact.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_DiabloPunch.jpg',
    href: 'https://www.eljefe.com/collections/energy-drinks',
  },
  {
    name: 'Zuma Watermelon',
    short: 'WATERMELON',
    num: '06',
    color: '#22C55E',
    colorRgb: '34,197,94',
    desc: 'Summer dominance. Refreshed and relentless.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_zuma_watermelon.jpg',
    href: 'https://www.eljefe.com/collections/energy-drinks',
  },
  {
    name: 'Baja Orange',
    short: 'ORANGE',
    num: '07',
    color: '#FF6B00',
    colorRgb: '255,107,0',
    desc: 'West coast. Sun-fueled supremacy. Born fearless.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_2048px_baja_orange.jpg',
    href: 'https://www.eljefe.com/collections/energy-drinks',
  },
  {
    name: 'Wild Mango',
    short: 'MANGO',
    num: '08',
    color: '#F59E0B',
    colorRgb: '245,158,11',
    desc: 'Tropical power. Exotic domination. Untamed.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_WildMango.jpg',
    href: 'https://www.eljefe.com/collections/energy-drinks',
  },
]

const STATS = [
  { val: '2000 MG', label: 'Taurine' },
  { val: '200 MG',  label: 'Panax Ginseng Extract' },
  { val: '200 MG',  label: 'L-Carnitine L-Tartrate' },
  { val: '150 MG',  label: 'Caffeine' },
]

// Intro phase gets its own 90vh before slides begin
const INTRO_VH = 90
const SLIDE_VH = 90
const TOTAL_VH = INTRO_VH + flavors.length * SLIDE_VH

export default function Flavors() {
  const desktopRef = useRef<HTMLDivElement>(null)
  const [winW, setWinW] = useState(1440)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const update = () => setWinW(window.innerWidth)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const { scrollYProgress } = useScroll({
    target: desktopRef,
    offset: ['start start', 'end end'],
  })

  // introEnd = the fraction of total scroll where slides begin
  const introEnd = INTRO_VH / TOTAL_VH

  // Slides only translate after the intro phase is done
  const rawX = useTransform(
    scrollYProgress,
    [0, introEnd, 1],
    [0, 0, -(flavors.length - 1) * winW],
  )
  const x = useSpring(rawX, { stiffness: 55, damping: 22, mass: 1.2 })

  // "Pick Your Weapon" header: visible during intro, fades as slides start
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, introEnd * 0.55, introEnd * 0.9],
    [1, 1, 0],
  )

  // Scroll hint fades immediately
  const scrollHintOpacity = useTransform(scrollYProgress, [0, introEnd * 0.3], [1, 0])

  // Track which flavor slide is active (only valid after intro ends)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v <= introEnd) {
      setActiveIdx(0)
      return
    }
    const slideProgress = (v - introEnd) / (1 - introEnd)
    const idx = Math.min(
      Math.max(Math.round(slideProgress * (flavors.length - 1)), 0),
      flavors.length - 1,
    )
    setActiveIdx(idx)
  })

  const current = flavors[activeIdx]

  return (
    <section id="flavors" className="relative" style={{ background: '#050507' }}>

      {/* ── MOBILE ───────────────────────────────────────────── */}
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

      {/* ── DESKTOP ──────────────────────────────────────────── */}
      <div
        ref={desktopRef}
        className="hidden md:block relative"
        style={{ height: `${TOTAL_VH}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Ambient glow — cross-fades per active flavor */}
          <motion.div
            key={current.color}
            className="absolute inset-0 z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            style={{
              background: `radial-gradient(ellipse 65% 55% at 30% 55%, rgba(${current.colorRgb},0.11) 0%, transparent 65%)`,
            }}
          />

          {/* ── PICK YOUR WEAPON — intro overlay ──────────────── */}
          <motion.div
            className="absolute inset-0 z-20 flex flex-col justify-center pointer-events-none"
            style={{ opacity: headerOpacity, padding: '0 64px' }}
          >
            <motion.span
              className="block font-bold tracking-widest uppercase mb-5"
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: '10px',
                letterSpacing: '0.22em',
                color: '#E8001D',
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              The Lineup
            </motion.span>

            <motion.h2
              className="font-black uppercase leading-none"
              style={{ fontSize: 'clamp(4rem, 9vw, 11rem)', letterSpacing: '-0.03em' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
              className="mt-8 max-w-sm"
              style={{
                fontFamily: "var(--font-dm, 'DM Sans', sans-serif)",
                fontSize: '15px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.35)',
                lineHeight: 1.75,
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              8 flavors. Zero sugar. 150mg caffeine.<br />
              Each one built to hit different.
            </motion.p>

            {/* Scroll hint */}
            <motion.div
              className="flex items-center gap-3 mt-14"
              style={{ opacity: scrollHintOpacity }}
            >
              <motion.span
                style={{ color: 'rgba(255,255,255,0.28)', fontSize: '18px' }}
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
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

          {/* ── HORIZONTAL SLIDE TRACK ────────────────────────── */}
          <motion.div
            className="flex h-full relative z-10"
            style={{ x, width: `${flavors.length * 100}vw` }}
          >
            {flavors.map((flavor, i) => (
              <FlavorSlide
                key={flavor.name}
                flavor={flavor}
                isActive={i === activeIdx}
              />
            ))}
          </motion.div>

          {/* Progress dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
            {flavors.map((f, i) => (
              <motion.div
                key={f.name}
                className="rounded-full"
                animate={{
                  width: i === activeIdx ? 28 : 6,
                  height: 6,
                  background: i === activeIdx ? f.color : 'rgba(255,255,255,0.2)',
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

type Flavor = typeof flavors[number]

function FlavorSlide({ flavor, isActive }: { flavor: Flavor; isActive: boolean }) {
  const dividerStyle = {
    height: '1px',
    background: `rgba(${flavor.colorRgb}, 0.22)`,
    marginBottom: '14px',
  } as const

  return (
    <div
      className="relative flex-shrink-0 flex flex-col"
      style={{ width: '100vw', height: '100vh', background: '#050507' }}
    >
      {/* TOP HEADER */}
      <div
        className="flex items-end justify-between flex-shrink-0"
        style={{ padding: '56px 64px 24px' }}
      >
        <motion.h2
          className="font-black uppercase text-white leading-none"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 6rem)', letterSpacing: '-0.03em' }}
          animate={{ opacity: isActive ? 1 : 0.1, x: isActive ? 0 : -28 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Fuel for the Fearless
        </motion.h2>

        <motion.span
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: '10px',
            letterSpacing: '0.22em',
            color: flavor.color,
            textTransform: 'uppercase',
            flexShrink: 0,
          }}
          animate={{ opacity: isActive ? 1 : 0.4 }}
          transition={{ duration: 0.5 }}
        >
          {flavor.num} / {String(flavors.length).padStart(2, '0')}
        </motion.span>
      </div>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden" style={{ paddingBottom: '56px' }}>

        {/* LEFT — can image */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: '52%', paddingLeft: '48px', paddingRight: '24px' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 75% 60% at 50% 50%, rgba(${flavor.colorRgb},0.15) 0%, transparent 68%)`,
            }}
          />
          <motion.div
            className="relative w-full"
            style={{ maxWidth: '520px', aspectRatio: '1.45 / 1' }}
            animate={{ opacity: isActive ? 1 : 0.18, scale: isActive ? 1 : 0.92 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={flavor.img}
              alt={flavor.name}
              fill
              className="object-contain"
              sizes="45vw"
              priority={flavor.num === '01'}
            />
          </motion.div>
        </div>

        {/* RIGHT — stats */}
        <div
          className="flex flex-col justify-center"
          style={{ width: '48%', paddingRight: '64px', paddingLeft: '16px' }}
        >
          <motion.div
            className="font-black uppercase leading-none"
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 3.6rem)',
              letterSpacing: '-0.02em',
              color: flavor.color,
              marginBottom: '20px',
            }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {flavor.name}
          </motion.div>

          <motion.div
            className="font-black uppercase"
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 2rem)',
              letterSpacing: '0.06em',
              color: '#ffffff',
              marginBottom: '16px',
            }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
            Zero Sugar
          </motion.div>

          {STATS.map((stat, i) => (
            <div key={stat.label}>
              <div style={dividerStyle} />
              <motion.div
                className="flex flex-col"
                style={{ marginBottom: '14px' }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 18 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              >
                <span
                  className="font-black"
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 3rem)',
                    color: flavor.color,
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {stat.val}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: '8px',
                    letterSpacing: '0.18em',
                    color: 'rgba(255,255,255,0.42)',
                    textTransform: 'uppercase',
                    marginTop: '3px',
                  }}
                >
                  {stat.label}
                </span>
              </motion.div>
            </div>
          ))}

          <div style={dividerStyle} />

          <motion.div
            className="flex items-center justify-between"
            style={{ marginTop: '4px' }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ duration: 0.5, delay: 0.38 }}
          >
            <Image
              src="https://www.eljefe.com/cdn/shop/files/El_Jefe_Energy_logo-white_transparent.png"
              alt="El Jefe Energy"
              width={90}
              height={32}
              style={{ objectFit: 'contain', objectPosition: 'left' }}
            />
            <motion.a
              href={flavor.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-7 py-3 font-bold tracking-widest uppercase text-black"
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: '9px',
                letterSpacing: '0.14em',
                background: flavor.color,
              }}
              whileHover={{ scale: 1.04, boxShadow: `0 0 30px rgba(${flavor.colorRgb},0.5)` }}
              whileTap={{ scale: 0.97 }}
            >
              Shop Now →
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Ghost watermark */}
      <div
        className="absolute bottom-4 right-6 select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-syne, 'Syne', sans-serif)",
          fontSize: 'clamp(4rem, 11vw, 13rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          color: 'transparent',
          WebkitTextStroke: `1px rgba(${flavor.colorRgb},0.07)`,
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {flavor.short}
      </div>
    </div>
  )
}
