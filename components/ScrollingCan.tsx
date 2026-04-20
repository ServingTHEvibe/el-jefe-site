'use client'

import { useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'

/*
  The Wild Mango can follows the cursor with spring lag.
  Offset (+140px right, +60px below) keeps the cursor fully clear of the can.
  An elliptical mask fades the white edges of the video so only the can shows.
  Scale / rotate / opacity are scroll-driven.
*/

export default function ScrollingCan() {
  const { scrollYProgress } = useScroll()

  const mouseX = useMotionValue(-999)
  const mouseY = useMotionValue(-999)

  useEffect(() => {
    // Place the can in a sensible hero position before first mousemove
    mouseX.set(window.innerWidth * 0.70)
    mouseY.set(window.innerHeight * 0.35)

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX + 140)
      mouseY.set(e.clientY + 60)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  // Loose spring for that dreamy trailing feel
  const followCfg = { stiffness: 35, damping: 18, mass: 1.1 }
  const x = useSpring(mouseX, followCfg)
  const y = useSpring(mouseY, followCfg)

  const rawScale = useTransform(
    scrollYProgress,
    [0,   0.12, 0.28, 0.44, 0.60, 0.75, 0.90, 1.00],
    [1.0, 0.82, 0.78, 0.72, 0.65, 0.50, 0.40, 0.30]
  )
  const rawRotate = useTransform(
    scrollYProgress,
    [0,   0.12, 0.28, 0.44, 0.60, 0.75, 0.90],
    [-6,  -4,   8,   -5,   -3,    2,    0]
  )
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.75, 0.90, 1.00],
    [1, 1,    0.4,  0]
  )

  const scrollCfg = { stiffness: 60, damping: 22, mass: 0.8 }
  const scale   = useSpring(rawScale,   scrollCfg)
  const rotate  = useSpring(rawRotate,  scrollCfg)
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 25 })

  const CAN_W = 340
  const CAN_H = 560

  return (
    <motion.div
      className="fixed z-40 pointer-events-none"
      style={{
        left: x,
        top: y,
        scale,
        rotate,
        opacity,
        originX: 0.5,
        originY: 0.5,
        width: CAN_W,
        height: CAN_H,
        marginLeft: -(CAN_W / 2),
        marginTop: -(CAN_H / 2),
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-contain"
        style={{ display: 'block' }}
      >
        <source src="/hf_20260419_224605_96d47be0-0693-4afe-830a-b390793fdc7e-Picsart-BackgroundRemover (1).webm" type="video/webm" />
      </video>
    </motion.div>
  )
}
