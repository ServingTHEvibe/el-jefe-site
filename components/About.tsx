'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const pillars = [
  {
    label: 'The Art',
    desc: 'Every can is a canvas — intricate, intentional, iconic. We treat our products as gallery pieces, not shelf fillers.',
    icon: '◈',
  },
  {
    label: 'The Culture',
    desc: 'Music, streetwear, sport. El Jefe is a lifestyle you wear, play, and live — not just a drink you consume.',
    icon: '◉',
  },
  {
    label: 'The Mission',
    desc: 'Fearless leadership built through action, not titles. No permission needed. No hesitation allowed.',
    icon: '◎',
  },
]

const canGallery = [
  {
    name: 'Diablo Punch',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_DiabloPunch.jpg',
  },
  {
    name: 'Phantom Lemon',
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_phantom_lemonade.jpg',
  },
  {
    name: 'Wild Mango',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_WildMango.jpg',
  },
  {
    name: 'Sinister Razz',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_SinisterRazz.jpg',
  },
]

const milestones = [
  { num: '2022', label: 'Founded' },
  { num: '6', label: 'Countries' },
  { num: '10K+', label: 'Locations' },
  { num: '∞', label: 'Fearless' },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ background: '#050507' }}
    >
      <div
        className="w-full"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.35), rgba(232,0,29,0.2), transparent)',
        }}
      />

      {/* Ghost headline */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden w-full text-center"
        style={{
          fontSize: 'clamp(6rem, 18vw, 20rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(232,0,29,0.04)',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        EL JEFE
      </div>

      <div className="relative z-10 px-10 md:px-20 py-32 md:py-52">
        <div className="max-w-screen-xl mx-auto">

          {/* Eyebrow */}
          <motion.div
            className="mb-16 md:mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: '10px',
                letterSpacing: '0.22em',
                color: '#E8001D',
                textTransform: 'uppercase',
              }}
            >
              The Movement
            </span>
          </motion.div>

          {/* Two-column: statement left, pillars right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start mb-24 md:mb-44">

            {/* Left — core statement */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                className="font-black uppercase leading-none"
                style={{ fontSize: 'clamp(2.6rem, 5vw, 6.5rem)', letterSpacing: '-0.02em' }}
              >
                <span className="text-white block">We didn&apos;t</span>
                <span className="text-white block">design cans.</span>
                <span
                  className="block mt-2"
                  style={{
                    background: 'linear-gradient(135deg, #E8001D 0%, #FF4500 45%, #D4AF37 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  We created art.
                </span>
              </h2>

              {/* Ryan's quote */}
              <motion.blockquote
                className="mt-14 md:mt-20 pl-8"
                style={{ borderLeft: '2px solid rgba(232,0,29,0.35)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.35 }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-dm, 'DM Sans', sans-serif)",
                    fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.9,
                    maxWidth: '400px',
                  }}
                >
                  &ldquo;This is not a warning. It is a statement.
                  Nothing about it is accidental.&rdquo;
                </p>
                <cite
                  className="block mt-5 not-italic"
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: '9px',
                    letterSpacing: '0.18em',
                    color: '#E8001D',
                    textTransform: 'uppercase',
                  }}
                >
                  — Ryan Marsh, CEO &amp; Co-Founder
                </cite>
              </motion.blockquote>
            </motion.div>

            {/* Right — three pillars */}
            <motion.div
              className="flex flex-col gap-4 lg:pt-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {pillars.map((p, i) => (
                <motion.div
                  key={p.label}
                  className="flex gap-7 items-start p-8 md:p-10 transition-colors duration-300"
                  style={{
                    border: '1px solid rgba(255,255,255,0.05)',
                    background: 'rgba(255,255,255,0.015)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  whileHover={{
                    borderColor: 'rgba(232,0,29,0.2)',
                    background: 'rgba(232,0,29,0.03)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '18px',
                      color: '#E8001D',
                      lineHeight: 1,
                      flexShrink: 0,
                      marginTop: '3px',
                    }}
                  >
                    {p.icon}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3
                      style={{
                        fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                        fontSize: '10px',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#fff',
                        fontWeight: 700,
                      }}
                    >
                      {p.label}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13.5px', lineHeight: 1.75 }}>
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Can gallery — Art Edition */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="mb-8"
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: '9px',
                letterSpacing: '0.22em',
                color: 'rgba(255,255,255,0.18)',
                textTransform: 'uppercase',
              }}
            >
              The Collection — Art Edition
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-2.5">
              {canGallery.map((can, i) => (
                <motion.div
                  key={can.name}
                  className="relative overflow-hidden group cursor-pointer"
                  style={{ aspectRatio: '3 / 4' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.09 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src={can.img}
                    alt={can.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(to top, rgba(5,5,7,0.85) 0%, rgba(5,5,7,0.1) 40%, transparent 100%)',
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p
                      className="text-white font-black uppercase"
                      style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                    >
                      {can.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Milestone stats strip */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-px mt-2.5"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {milestones.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-2 p-8 md:p-10"
                style={{ background: '#050507' }}
              >
                <span
                  className="font-black leading-none"
                  style={{
                    fontSize: 'clamp(1.8rem, 2.8vw, 3rem)',
                    background: 'linear-gradient(135deg, #E8001D, #D4AF37)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.num}
                </span>
                <span
                  className="text-xs font-black tracking-widest uppercase"
                  style={{ color: 'rgba(255,255,255,0.28)' }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
