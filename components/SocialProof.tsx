'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const socialStats = [
  { platform: 'TikTok', stat: 'Trending', color: '#E8001D' },
  { platform: 'Instagram', stat: '47K+', color: '#D4AF37' },
  { platform: 'Worldwide', stat: '6 Countries', color: '#E8001D' },
]

const feedItems = [
  {
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_DiabloPunch.jpg',
    caption: 'Diablo Punch — Maximum Impact',
    tag: 'BESTSELLER',
  },
  {
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_phantom_lemonade.jpg',
    caption: 'Phantom Lemon — Gold Standard',
    tag: 'FAN FAVORITE',
  },
  {
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_KillerPeach.jpg',
    caption: 'Killer Peach — Sweet Heat',
    tag: 'NEW DROP',
  },
  {
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_WildMango.jpg',
    caption: 'Wild Mango — Tropical Power',
    tag: 'TRENDING',
  },
  {
    img: 'https://www.eljefe.com/cdn/shop/files/El_Jefe_Black_suede_hat_Silver_stock.jpg',
    caption: 'Rep The Brand',
    tag: 'MERCH',
  },
  {
    img: 'https://www.eljefe.com/cdn/shop/files/El_Jefe_-_Variety_Pack_black_with_mango_can.jpg',
    caption: 'Boss 7+5 — Total Domination',
    tag: 'LIMITED',
  },
]

export default function SocialProof() {
  return (
    <section
      className="relative py-24 md:py-52 overflow-hidden"
      style={{ background: '#050507' }}
    >
      <div
        className="w-full"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(232,0,29,0.3), transparent)',
        }}
      />

      <div className="relative z-10 px-10 md:px-20 pt-24 md:pt-52">

        {/* Header + social stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
              The Movement is Real
            </span>
            <h2
              className="mt-5 font-black uppercase leading-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 7rem)', letterSpacing: '-0.02em' }}
            >
              <span className="text-white block">Trending</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #E8001D, #D4AF37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Everywhere.
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="flex gap-10 md:gap-14"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {socialStats.map((s) => (
              <div key={s.platform} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                    style={{ background: s.color }}
                  />
                  <span className="font-black text-xl md:text-2xl text-white">{s.stat}</span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: '8px',
                    letterSpacing: '0.15em',
                    color: 'rgba(255,255,255,0.28)',
                    textTransform: 'uppercase',
                  }}
                >
                  {s.platform}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gallery grid — uneven masonry-style */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-2.5">
          {feedItems.map((item, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden group cursor-pointer"
              style={{ aspectRatio: i === 0 ? '4 / 5' : i === 3 ? '4 / 3' : '1 / 1' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.07 }}
              whileHover={{ scale: 1.02, zIndex: 10 }}
            >
              <Image
                src={item.img}
                alt={item.caption}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Base overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'rgba(5,5,7,0.22)' }}
              />

              {/* Hover gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(5,5,7,0.88) 0%, transparent 55%)' }}
              />

              {/* Tag badge */}
              <div
                className="absolute top-3 left-3 px-2.5 py-1"
                style={{
                  background: 'rgba(5,5,7,0.75)',
                  border: '1px solid rgba(232,0,29,0.3)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: '7px',
                    letterSpacing: '0.15em',
                    color: '#E8001D',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.tag}
                </span>
              </div>

              {/* Caption on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p
                  className="text-white font-black uppercase"
                  style={{ fontSize: '11px', letterSpacing: '0.09em' }}
                >
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: '9px',
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.18)',
              textTransform: 'uppercase',
            }}
          >
            Follow the movement — @ElJefeEnergy everywhere
          </p>
          <div className="flex gap-3">
            {[
              { label: 'Instagram', href: 'https://www.instagram.com/eljefe_energy' },
              { label: 'TikTok', href: 'https://www.tiktok.com/@eljefeenergy' },
              { label: 'YouTube', href: 'https://www.youtube.com/@eljefeenergy' },
            ].map(({ label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-white border border-white/10 hover:border-red-600 transition-colors"
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: '8px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
