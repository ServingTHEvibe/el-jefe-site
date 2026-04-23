'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LETTERS = ['E', 'L', ' ', 'J', 'E', 'F', 'E']

export default function PageLoader() {
  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter')

  useEffect(() => {
    const seen = sessionStorage.getItem('ej-intro')
    if (seen) return
    sessionStorage.setItem('ej-intro', '1')
    setVisible(true)

    const t1 = setTimeout(() => setPhase('hold'), 1100)
    const t2 = setTimeout(() => setPhase('exit'), 2300)
    const t3 = setTimeout(() => setVisible(false), 3000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none"
          style={{ background: '#050507' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Atmospheric red glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'hold' ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{
              background:
                'radial-gradient(ellipse 65% 45% at 50% 50%, rgba(232,0,29,0.18) 0%, transparent 70%)',
            }}
          />

          {/* Gold hairline top */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === 'exit' ? 0 : 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)',
              transformOrigin: 'left',
            }}
          />

          {/* EL JEFE letters */}
          <div className="flex items-baseline">
            {LETTERS.map((char, i) => (
              <motion.span
                key={i}
                style={{
                  fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                  fontSize: 'clamp(4.5rem, 13vw, 13rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  color: '#fff',
                  display: 'inline-block',
                  width: char === ' ' ? '0.35em' : 'auto',
                }}
                initial={{ opacity: 0, y: 80, skewY: 6 }}
                animate={{
                  opacity: phase === 'exit' ? 0 : 1,
                  y: phase === 'exit' ? -50 : 0,
                  skewY: phase === 'exit' ? -4 : 0,
                }}
                transition={{
                  duration: phase === 'exit' ? 0.45 : 0.65,
                  delay: phase === 'exit'
                    ? (LETTERS.length - 1 - i) * 0.04
                    : i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char === ' ' ? ' ' : char}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            className="absolute bottom-14 left-0 right-0 text-center"
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: '9px',
              letterSpacing: '0.32em',
              color: 'rgba(255,255,255,0.28)',
              textTransform: 'uppercase',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'exit' ? 0 : 1 }}
            transition={{ duration: 0.7, delay: 0.75 }}
          >
            Fearless · Unapologetic · Refined
          </motion.p>

          {/* Red progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5"
            style={{ background: '#E8001D' }}
            initial={{ width: '0%' }}
            animate={{ width: phase === 'exit' ? '100%' : '60%' }}
            transition={{
              duration: phase === 'exit' ? 0.5 : 1.6,
              ease: phase === 'exit' ? 'easeIn' : [0.16, 1, 0.3, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
