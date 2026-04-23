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
    href: 'https://www.eljefe.com/products/mailo-tamarindo',
  },
  {
    name: 'Killer Peach',
    short: 'PEACH',
    num: '02',
    color: '#FF6B35',
    colorRgb: '255,107,53',
    desc: 'Sweet heat. Assassin in fruit form.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_KillerPeach.jpg',
    href: 'https://www.eljefe.com/products/killer-peach',
  },
  {
    name: 'Phantom Lemon',
    short: 'LEMON',
    num: '03',
    color: '#D4AF37',
    colorRgb: '212,175,55',
    desc: 'Gold standard refreshment. Clean fuel only.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_phantom_lemonade.jpg',
    href: 'https://www.eljefe.com/products/phantom-lemonade',
  },
  {
    name: 'Sinister Razz',
    short: 'RAZZ',
    num: '04',
    color: '#C71585',
    colorRgb: '199,21,133',
    desc: 'Dark berry. Dangerous edge. No apologies.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_SinisterRazz.jpg',
    href: 'https://www.eljefe.com/products/sinister-razz',
  },
  {
    name: 'Diablo Punch',
    short: 'PUNCH',
    num: '05',
    color: '#E8001D',
    colorRgb: '232,0,29',
    desc: 'Pure aggression. Zero mercy. Maximum impact.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_DiabloPunch.jpg',
    href: 'https://www.eljefe.com/products/diablo-punch',
  },
  {
    name: 'Zuma Watermelon',
    short: 'WATERMELON',
    num: '06',
    color: '#22C55E',
    colorRgb: '34,197,94',
    desc: 'Summer dominance. Refreshed and relentless.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_zuma_watermelon.jpg',
    href: 'https://www.eljefe.com/products/zuma-watermelon',
  },
  {
    name: 'Baja Orange',
    short: 'ORANGE',
    num: '07',
    color: '#FF6B00',
    colorRgb: '255,107,0',
    desc: 'West coast. Sun-fueled supremacy. Born fearless.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_2048px_baja_orange.jpg',
    href: 'https://www.eljefe.com/products/baja-orange',
  },
  {
    name: 'Wild Mango',
    short: 'MANGO',
    num: '08',
    color: '#F59E0B',
    colorRgb: '245,158,11',
    desc: 'Tropical power. Exotic domination. Untamed.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_WildMango.jpg',
    href: 'https://www.eljefe.com/products/wild-mango',
  },
]

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

  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(flavors.length - 1) * winW],
  )
  const x = useSpring(rawX, { stiffness: 55, damping: 22, mass: 1.2 })

  const headerOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0])
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(
      Math.max(Math.round(v * (flavors.length - 1)), 0),
      flavors.length - 1,
    )
    setActiveIdx(idx)
  })

  const current = flavors[activeIdx]

  return (
    <section id="flavors" className="relative" style={{ background: '#050507' }}>

      {/* ── MOBILE: card grid ─────────────────────────────── */}
      <div className="block md:hidden py-24 px-8">
        {/* Header */}
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

        {/* Grid */}
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

      {/* ── DESKTOP: horizontal scroll ────────────────────── */}
      <div
        ref={desktopRef}
        className="hidden md:block relative"
        style={{ height: `${flavors.length * 90}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Ambient color — cross-fades per flavor */}
          <motion.div
            key={current.color}
            className="absolute inset-0 z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            style={{
              background: `radial-gradient(ellipse 75% 65% at 65% 50%, rgba(${current.colorRgb},0.13) 0%, transparent 68%)`,
            }}
          />

          {/* Section header — fades as scroll begins */}
          <motion.div
            className="absolute top-14 left-16 z-30"
            style={{ opacity: headerOpacity }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: '10px',
                letterSpacing: '0.2em',
                color: '#E8001D',
                textTransform: 'uppercase',
              }}
            >
              The Lineup
            </span>
            <h2
              className="mt-4 font-black uppercase leading-none text-white"
              style={{ fontSize: 'clamp(3rem, 7vw, 8rem)', letterSpacing: '-0.02em' }}
            >
              Pick Your<br />
              <span
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
          </motion.div>

          {/* Horizontal track */}
          <motion.div
            className="flex h-full"
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
          <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
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

          {/* Scroll hint — fades immediately */}
          <motion.div
            className="absolute bottom-9 right-14 z-30 flex items-center gap-3"
            style={{ opacity: scrollHintOpacity }}
          >
            <motion.span
              style={{ color: 'rgba(255,255,255,0.3)', fontSize: '18px' }}
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
                color: 'rgba(255,255,255,0.22)',
                textTransform: 'uppercase',
              }}
            >
              Scroll to explore
            </span>
          </motion.div>

          {/* CTA — visible on last flavor */}
          <motion.a
            href="https://www.eljefe.com/collections/energy-drinks"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-9 left-16 z-30 flex items-center gap-3 px-7 py-3 text-white border border-white/10 hover:border-red-600 transition-colors"
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: '9px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
            animate={{
              opacity: activeIdx === flavors.length - 1 ? 1 : 0,
              y: activeIdx === flavors.length - 1 ? 0 : 8,
            }}
            transition={{ duration: 0.4 }}
          >
            Shop All Flavors →
          </motion.a>
        </div>
      </div>
    </section>
  )
}

type Flavor = typeof flavors[number]

function FlavorSlide({ flavor, isActive }: { flavor: Flavor; isActive: boolean }) {
  return (
    <div
      className="relative flex-shrink-0 flex items-center"
      style={{ width: '100vw', height: '100vh', background: '#050507' }}
    >
      {/* Left: info */}
      <div className="relative z-10 flex flex-col gap-8 pl-16 pr-8 max-w-[48vw]">
        {/* Counter */}
        <motion.span
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: '10px',
            letterSpacing: '0.22em',
            color: flavor.color,
            textTransform: 'uppercase',
          }}
          animate={{ opacity: isActive ? 1 : 0.4 }}
          transition={{ duration: 0.5 }}
        >
          {flavor.num} / {String(flavors.length).padStart(2, '0')}
        </motion.span>

        {/* Name — massive */}
        <motion.h2
          className="font-black uppercase leading-none text-white"
          style={{
            fontSize: 'clamp(4rem, 8.5vw, 10rem)',
            letterSpacing: '-0.03em',
          }}
          animate={{ opacity: isActive ? 1 : 0.3, x: isActive ? 0 : -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {flavor.name.split(' ').map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </motion.h2>

        {/* Desc */}
        <motion.p
          style={{
            fontFamily: "var(--font-dm, 'DM Sans', sans-serif)",
            fontSize: '16px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.75,
            maxWidth: '340px',
          }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {flavor.desc}
        </motion.p>

        {/* CTA */}
        <motion.a
          href={flavor.href}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start px-9 py-4 text-sm font-bold tracking-widest uppercase text-white"
          style={{ background: flavor.color }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          whileHover={{ scale: 1.04, boxShadow: `0 0 32px rgba(${flavor.colorRgb},0.4)` }}
          whileTap={{ scale: 0.97 }}
        >
          Shop Now →
        </motion.a>
      </div>

      {/* Right: can image */}
      <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center" style={{ width: '55%' }}>
        {/* Glow behind can */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 70% at 50% 50%, rgba(${flavor.colorRgb},0.18) 0%, transparent 65%)`,
          }}
        />

        <motion.div
          className="relative"
          style={{ width: '52%', aspectRatio: '1 / 1.35' }}
          animate={{
            opacity: isActive ? 1 : 0.2,
            scale: isActive ? 1 : 0.92,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={flavor.img}
            alt={flavor.name}
            fill
            className="object-contain"
            sizes="35vw"
            priority={flavor.num === '01'}
          />
        </motion.div>
      </div>

      {/* Flavor short name — giant ghost text */}
      <div
        className="absolute right-8 bottom-12 select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-syne, 'Syne', sans-serif)",
          fontSize: 'clamp(5rem, 12vw, 14rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          color: 'transparent',
          WebkitTextStroke: `1px rgba(${flavor.colorRgb},0.1)`,
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {flavor.short}
      </div>
    </div>
  )
}
