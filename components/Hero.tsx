'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col"
      style={{ background: '#050507' }}
    >
      {/* Full-bleed hero video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.45 }}
      >
        <source src="/hf_20260420_004249_b9ee5039-6bcf-47c8-a74a-56a5158936f7 (1).mp4" type="video/mp4" />
      </video>

      {/* Dark vignette over video so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(5,5,7,0.35) 0%, rgba(5,5,7,0.15) 40%, rgba(5,5,7,0.75) 100%)',
        }}
      />

      {/* Top eyebrow — mono */}
      <motion.div
        className="relative z-10 flex items-center justify-between px-12 pt-28"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: '10px', letterSpacing: '0.2em',
            color: '#e63030', textTransform: 'uppercase',
          }}>
            Energy — Est. 2022
          </span>
        </div>
        <span style={{
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: '10px', letterSpacing: '0.15em',
          color: '#3a3a4a', textTransform: 'uppercase',
        }}>
          Fuel for the Fearless
        </span>
      </motion.div>

      {/* CENTER — all content centered */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-8 pb-32 text-center">

        {/* Large logo */}
        <motion.div
          className="relative mb-10"
          style={{ width: 'clamp(260px, 42vw, 600px)', aspectRatio: '2.6 / 1' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 blur-3xl opacity-20 scale-110" style={{
            background: 'radial-gradient(circle, rgba(230,48,48,0.8) 0%, transparent 65%)',
          }} />
          <Image
            src="https://www.eljefe.com/cdn/shop/files/El_Jefe_Energy_logo-white_transparent.png"
            alt="El Jefe Energy"
            fill
            className="object-contain object-center"
            sizes="600px"
            priority
          />
        </motion.div>

        {/* Supporting taglines */}
        <div className="overflow-hidden mb-1">
          <motion.p
            style={{
              fontFamily: "var(--font-syne, 'Syne', sans-serif)",
              fontSize: 'clamp(18px, 2.2vw, 34px)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              color: '#ffffff',
            }}
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            A Drink. A Movement.
          </motion.p>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.p
            style={{
              fontFamily: "var(--font-syne, 'Syne', sans-serif)",
              fontSize: 'clamp(18px, 2.2vw, 34px)',
              fontWeight: 600,
              fontStyle: 'italic',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              color: '#7a7a8c',
            }}
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            A Declaration.
          </motion.p>
        </div>

        {/* Sub + CTAs */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{
            fontFamily: "var(--font-dm, 'DM Sans', sans-serif)",
            fontSize: '14px', fontWeight: 300,
            color: '#7a7a8c', lineHeight: 1.7, maxWidth: '360px',
          }}>
            Fearless. Unapologetic. Refined. For those who lead,
            dominate, and never ask permission.
          </p>

          <div className="flex items-center gap-5">
            <motion.a
              href="#flavors"
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: '9px', letterSpacing: '0.15em',
                textTransform: 'uppercase', padding: '12px 24px',
                background: '#ffffff', color: '#000000',
              }}
              whileHover={{ background: '#e8e8ec', translateY: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              Shop Now →
            </motion.a>
            <motion.a
              href="#find-us"
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: '9px', letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#7a7a8c',
              }}
              whileHover={{ color: '#e8e8ec' }}
            >
              Find a Store →
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll line — right side */}
      <motion.div
        className="absolute bottom-10 right-12 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <motion.div
          style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)' }}
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span style={{
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: '9px', letterSpacing: '0.15em',
          color: '#3a3a4a', textTransform: 'uppercase',
          writingMode: 'vertical-rl',
        }}>Scroll</span>
      </motion.div>
    </section>
  )
}
