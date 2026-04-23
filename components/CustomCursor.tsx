'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(true)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Dot — tight, precise
  const dotX = useSpring(mouseX, { stiffness: 350, damping: 28, mass: 0.3 })
  const dotY = useSpring(mouseY, { stiffness: 350, damping: 28, mass: 0.3 })

  // Orb — loose, dreamy trail
  const orbX = useSpring(mouseX, { stiffness: 55, damping: 20, mass: 1.1 })
  const orbY = useSpring(mouseY, { stiffness: 55, damping: 20, mass: 1.1 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (isHidden) setIsHidden(false)

      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (el) {
        const style = window.getComputedStyle(el).cursor
        setIsPointer(style === 'pointer')
      }
    }

    const onLeave = () => setIsHidden(true)
    const onEnter = () => setIsHidden(false)

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [isHidden, mouseX, mouseY])

  return (
    <>
      {/* Precision dot — mix-blend-difference inverts whatever it's over */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isPointer ? 14 : 5,
            height: isPointer ? 14 : 5,
          }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* Glow orb — lags behind, changes color on interactive elements */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none hidden md:block"
        style={{
          x: orbX,
          y: orbY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: isPointer ? 72 : 38,
            height: isPointer ? 72 : 38,
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: isPointer
              ? 'radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(232,0,29,0.08) 55%, transparent 100%)'
              : 'radial-gradient(circle, rgba(232,0,29,0.16) 0%, rgba(232,0,29,0.04) 55%, transparent 100%)',
            border: isPointer
              ? '1px solid rgba(212,175,55,0.3)'
              : '1px solid rgba(232,0,29,0.2)',
            transition: 'background 0.3s, border 0.3s',
          }}
        />
      </motion.div>
    </>
  )
}
