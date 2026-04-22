'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const messages = [
  'FREE SHIPPING ON ALL ORDERS',
  'NOW LAUNCHING IN 6 COUNTRIES',
  'FEARLESS. UNAPOLOGETIC. REFINED.',
  'THE BOSS PACK — LIMITED RUN',
  'NO PERMISSION. NO HESITATION.',
]

export default function PromoBanner() {
  const [visible, setVisible] = useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="relative z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, #080003, #120005, #080003)',
            borderBottom: '1px solid rgba(232,0,29,0.12)',
            height: '36px',
          }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 36, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 flex items-center overflow-hidden">
            <motion.div
              className="flex gap-16 whitespace-nowrap shrink-0"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            >
              {[...messages, ...messages, ...messages, ...messages].map((msg, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: '9px',
                    letterSpacing: '0.2em',
                    color: i % 5 === 0 ? '#E8001D' : i % 3 === 0 ? '#D4AF37' : 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                  }}
                >
                  {msg}
                  <span style={{ color: 'rgba(255,255,255,0.15)', marginLeft: '2rem' }}>—</span>
                </span>
              ))}
            </motion.div>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="absolute right-5 top-1/2 -translate-y-1/2 opacity-25 hover:opacity-60 transition-opacity"
            style={{ color: '#fff', fontSize: '16px', lineHeight: 1 }}
            aria-label="Close banner"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
