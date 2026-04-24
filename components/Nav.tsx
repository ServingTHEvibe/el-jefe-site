'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

const links = ['Drinks', 'Flavors', 'Merch', 'Find Us', 'About']

export default function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (val) => {
    setScrolled(val > 60)
  })

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[55] flex items-center justify-between"
        style={{ padding: '20px 48px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        animate={{
          backgroundColor: scrolled ? 'rgba(5,5,7,0.96)' : 'rgba(5,5,7,0.88)',
          backdropFilter: 'blur(20px)',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <motion.a
          href="/"
          className="relative select-none flex-shrink-0"
          style={{ width: 110, height: 40 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image
            src="https://www.eljefe.com/cdn/shop/files/El_Jefe_Energy_logo-white_transparent.png"
            alt="El Jefe Energy"
            fill
            className="object-contain object-left"
            sizes="110px"
            priority
          />
        </motion.a>

        <motion.ul
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {links.map((link) => (
            <li key={link}>
              <motion.a
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: '10px', letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: '#7a7a8c',
                  textDecoration: 'none',
                }}
                whileHover={{ color: '#e8e8ec' }}
                transition={{ duration: 0.2 }}
              >
                {link}
              </motion.a>
            </li>
          ))}
        </motion.ul>

        <motion.a
          href="#flavors"
          className="hidden md:inline-flex items-center"
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase',
            padding: '10px 20px', background: '#ffffff', color: '#000000',
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ background: '#e8e8ec', translateY: -1 }}
        >
          Shop Now
        </motion.a>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.span className="block h-0.5 w-6 bg-white"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} />
          <motion.span className="block h-0.5 w-6 bg-white"
            animate={{ opacity: menuOpen ? 0 : 1 }} />
          <motion.span className="block h-0.5 w-6 bg-white"
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} />
        </button>
      </motion.nav>

      <motion.div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
        style={{ background: 'rgba(5,5,7,0.97)' }}
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? '0%' : '-100%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <ul className="flex flex-col items-center gap-10">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                style={{
                  fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                  fontSize: '2.5rem', fontWeight: 800,
                  letterSpacing: '-0.02em', textTransform: 'uppercase',
                  color: '#e8e8ec',
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  )
}
