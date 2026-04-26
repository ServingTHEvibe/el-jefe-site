'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'

const MANGO_HEX = '#F59E0B'

function Particles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    dur: Math.random() * 5 + 3,
    delay: Math.random() * 6,
    color: i % 3 === 0 ? '#F59E0B' : i % 3 === 1 ? '#E8001D' : 'rgba(255,255,255,0.5)',
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color }}
          animate={{ y: [0, -(p.size * 20 + 40), 0], opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function CanShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [18, -18]), { stiffness: 80, damping: 22 })
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-22, 22]), { stiffness: 80, damping: 22 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: '100vh', background: '#050507', cursor: 'none' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 70% at 55% 50%, rgba(245,158,11,0.14) 0%, transparent 65%)',
          zIndex: 0,
        }}
      />

      {/* Particles */}
      <Particles />

      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 4px)',
          zIndex: 1,
        }}
      />

      {/* 3D can stage */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: '900px', zIndex: 2 }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            position: 'relative',
          }}
        >
          {/* Glow halo behind can */}
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              right: '10%',
              bottom: '10%',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.45) 0%, transparent 70%)',
              filter: 'blur(48px)',
              transform: 'translateZ(-60px)',
              pointerEvents: 'none',
            }}
          />

          <video
            ref={videoRef}
            src="/can-reel.webm"
            autoPlay
            loop
            muted
            playsInline
            style={{
              height: 'clamp(480px, 70vh, 820px)',
              width: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 0 50px rgba(245,158,11,0.45)) drop-shadow(0 60px 100px rgba(0,0,0,0.9))',
            }}
          />

          {/* Reflection */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%) scaleY(-1)',
              bottom: '-15%',
              height: '30%',
              width: '80%',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.25), transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.25), transparent)',
              pointerEvents: 'none',
              overflow: 'hidden',
            }}
          >
            <video
              src="/can-reel.webm"
              autoPlay
              loop
              muted
              playsInline
              style={{ height: '100%', width: 'auto', display: 'block', margin: '0 auto', opacity: 0.3 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Move hint */}
      <motion.div
        className="absolute top-10 right-12 z-10 flex items-center gap-3 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.span
          style={{ color: 'rgba(255,255,255,0.22)', fontSize: '16px' }}
          animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          ✦
        </motion.span>
        <span
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: '8px',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.2)',
            textTransform: 'uppercase',
          }}
        >
          Move to tilt
        </span>
      </motion.div>

      {/* Flavor label — top left */}
      <motion.div
        className="absolute top-10 left-12 z-10 pointer-events-none"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: MANGO_HEX }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: '9px',
              letterSpacing: '0.22em',
              color: MANGO_HEX,
              textTransform: 'uppercase',
            }}
          >
            08 / 08 — Wild Mango
          </span>
        </div>
      </motion.div>

      {/* Main info — bottom left */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between px-12 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="font-black uppercase leading-none text-white"
            style={{ fontSize: 'clamp(4.5rem, 10vw, 12rem)', letterSpacing: '-0.035em' }}
          >
            Wild<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #F59E0B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Mango
            </span>
          </h2>
          <p
            className="mt-4 max-w-xs"
            style={{
              fontFamily: "var(--font-dm, 'DM Sans', sans-serif)",
              fontSize: '14px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.38)',
              lineHeight: 1.8,
            }}
          >
            Tropical power. Exotic domination.<br />16 fl oz of pure untamed energy.
          </p>
          <motion.a
            href="https://www.eljefe.com/collections/energy-drinks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-7 px-10 py-4 font-bold tracking-widest uppercase text-black"
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: '10px',
              letterSpacing: '0.15em',
              background: MANGO_HEX,
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 45px rgba(245,158,11,0.55)' }}
            whileTap={{ scale: 0.97 }}
          >
            Shop Wild Mango →
          </motion.a>
        </motion.div>

        {/* Specs — bottom right */}
        <motion.div
          className="hidden md:flex flex-col gap-4 text-right"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          {[
            { val: '200mg', label: 'Caffeine' },
            { val: '0g', label: 'Sugar' },
            { val: '16oz', label: 'Volume' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-black text-xl" style={{ color: MANGO_HEX }}>{s.val}</p>
              <p
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: '8px',
                  letterSpacing: '0.18em',
                  color: 'rgba(255,255,255,0.25)',
                  textTransform: 'uppercase',
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050507)' }}
      />
    </section>
  )
}
