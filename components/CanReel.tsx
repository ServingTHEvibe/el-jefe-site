'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function CanReel() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const rawY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y = useSpring(rawY, { stiffness: 40, damping: 18 })

  const rawRotate = useTransform(scrollYProgress, [0, 1], [-8, 8])
  const rotate = useSpring(rawRotate, { stiffness: 30, damping: 20 })

  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1.04, 0.92])
  const scale = useSpring(rawScale, { stiffness: 40, damping: 18 })

  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.3, 0.9, 0.9, 0.3])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: '#050507',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Radial red glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 70% at 50% 50%, rgba(232,0,29,0.22) 0%, transparent 65%)',
          opacity: glowOpacity,
        }}
      />

      {/* Ambient particles */}
      <Particles />

      {/* 3D perspective container */}
      <div
        style={{
          perspective: '900px',
          perspectiveOrigin: '50% 50%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <motion.div
          style={{
            y,
            rotate,
            scale,
            rotateX: 4,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Glow halo behind the can */}
          <div
            style={{
              position: 'absolute',
              inset: '-20%',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(232,0,29,0.35) 0%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
              zIndex: 0,
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
              width: 'clamp(280px, 38vw, 560px)',
              height: 'auto',
              display: 'block',
              position: 'relative',
              zIndex: 1,
              filter: 'drop-shadow(0 0 60px rgba(232,0,29,0.5)) drop-shadow(0 40px 80px rgba(0,0,0,0.8))',
            }}
          />
        </motion.div>
      </div>

      {/* Text overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none"
        style={{ paddingBottom: 'clamp(3rem, 8vh, 6rem)', zIndex: 3 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span
            style={{
              display: 'block',
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#E8001D',
              marginBottom: '1rem',
            }}
          >
            Fuel for the Fearless
          </span>
          <h2
            style={{
              fontFamily: "var(--font-syne, 'Syne', sans-serif)",
              fontSize: 'clamp(2.5rem, 7vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.15)',
              textTransform: 'uppercase',
              userSelect: 'none',
            }}
          >
            Zero Sugar
            <br />
            <span style={{ WebkitTextStroke: '1px rgba(232,0,29,0.3)' }}>
              All Power
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Scanline vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(5,5,7,0.7) 100%)',
          zIndex: 4,
        }}
      />
    </section>
  )
}

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? '#E8001D' : i % 3 === 1 ? '#D4AF37' : 'rgba(255,255,255,0.4)',
          }}
          animate={{
            y: [0, -(Math.random() * 80 + 40), 0],
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
