'use client'

import { useRef, Suspense, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Float,
  Environment,
  ContactShadows,
  useTexture,
  PresentationControls,
} from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Real dimensions: 6.2" tall × 2.6" diameter (radius 1.3")
// Three.js scale 1:1 in inches → R=1.3, H=6.2
// Scaled down ×0.52 to fit nicely in camera: R≈0.68, H≈3.22
// Final: R=0.68, H=3.0 for perfect proportions
const R = 0.68
const H = 3.0
const SEG = 128

const MANGO_HEX = '#F59E0B'
const MANGO_VEC = new THREE.Color('#F59E0B')

// ─── Floating ambient particles ───────────────────────────────────────────────
function Particles() {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const COUNT = 90

  const { positions, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const speeds = new Float32Array(COUNT)
    const phases = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const r = 1.8 + Math.random() * 3.2
      positions[i * 3]     = Math.cos(theta) * r
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7
      positions[i * 3 + 2] = Math.sin(theta) * r - 0.5
      speeds[i]  = 0.15 + Math.random() * 0.5
      phases[i]  = Math.random() * Math.PI * 2
    }
    return { positions, speeds, phases }
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.elapsedTime
    for (let i = 0; i < COUNT; i++) {
      const x = positions[i * 3]
      const y = ((positions[i * 3 + 1] + t * speeds[i] * 0.25 + 3.5) % 7) - 3.5
      const z = positions[i * 3 + 2]
      const s = 0.018 + Math.sin(t * speeds[i] + phases[i]) * 0.009
      dummy.position.set(x, y, z)
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color={MANGO_HEX}
        emissive={MANGO_HEX}
        emissiveIntensity={2}
        transparent
        opacity={0.65}
      />
    </instancedMesh>
  )
}

// ─── Pulsing base glow ring ────────────────────────────────────────────────────
function GlowRing() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const mat = ref.current.material as THREE.MeshStandardMaterial
    mat.emissiveIntensity = 2.2 + Math.sin(clock.elapsedTime * 1.8) * 0.9
    ref.current.rotation.z += 0.004
  })
  return (
    <mesh ref={ref} position={[0, -H * 0.5 - 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[R * 1.25, 0.016, 16, 128]} />
      <meshStandardMaterial
        color={MANGO_HEX}
        emissive={MANGO_HEX}
        emissiveIntensity={2.5}
        toneMapped={false}
      />
    </mesh>
  )
}

// ─── Secondary inner ring ──────────────────────────────────────────────────────
function InnerRing() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.z -= 0.007
    const mat = ref.current.material as THREE.MeshStandardMaterial
    mat.emissiveIntensity = 1.2 + Math.sin(clock.elapsedTime * 2.4 + 1) * 0.5
  })
  return (
    <mesh ref={ref} position={[0, -H * 0.5 - 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[R * 0.88, 0.009, 16, 128]} />
      <meshStandardMaterial
        color="#E8001D"
        emissive="#E8001D"
        emissiveIntensity={1.5}
        toneMapped={false}
      />
    </mesh>
  )
}

// ─── The can mesh ──────────────────────────────────────────────────────────────
function WildMangoCan() {
  const texture = useTexture(
    'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_WildMango.jpg',
  )

  // Crop the two-can product shot to show a single can's label face
  // The left can occupies roughly the left 48% of the image
  // Label height occupies the middle ~70% vertically
  useMemo(() => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
    texture.repeat.set(0.47, 0.72)
    texture.offset.set(0.02, 0.14)
    texture.needsUpdate = true
  }, [texture])

  return (
    <group>
      {/* ── Main aluminum body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[R, R * 0.93, H, SEG, 1, false]} />
        <meshStandardMaterial
          color="#0c0802"
          metalness={0.98}
          roughness={0.04}
          envMapIntensity={4}
        />
      </mesh>

      {/* ── Label cylinder — sits just outside body */}
      <mesh rotation={[0, Math.PI * 0.6, 0]}>
        <cylinderGeometry
          args={[R + 0.003, R * 0.93 + 0.003, H * 0.77, SEG, 1, true]}
        />
        <meshStandardMaterial
          map={texture}
          metalness={0.12}
          roughness={0.42}
          side={THREE.DoubleSide}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* ── Neck taper */}
      <mesh position={[0, H * 0.5 - 0.1, 0]} castShadow>
        <cylinderGeometry args={[R * 0.67, R, 0.26, SEG]} />
        <meshStandardMaterial color="#0c0802" metalness={1} roughness={0.05} />
      </mesh>

      {/* ── Top lid */}
      <mesh position={[0, H * 0.5 + 0.03, 0]}>
        <cylinderGeometry args={[R * 0.65, R * 0.65, 0.07, SEG]} />
        <meshStandardMaterial color="#1a1206" metalness={1} roughness={0.03} />
      </mesh>

      {/* ── Pull tab ring */}
      <mesh position={[0, H * 0.5 + 0.09, 0]}>
        <torusGeometry args={[R * 0.22, 0.022, 16, 64]} />
        <meshStandardMaterial color="#2a1e08" metalness={1} roughness={0.04} />
      </mesh>

      {/* ── Pull tab lever */}
      <mesh
        position={[R * 0.22, H * 0.5 + 0.12, 0]}
        rotation={[0.35, 0, Math.PI * 0.1]}
      >
        <boxGeometry args={[0.28, 0.04, 0.1]} />
        <meshStandardMaterial color="#2a1e08" metalness={1} roughness={0.04} />
      </mesh>

      {/* ── Bottom taper */}
      <mesh position={[0, -H * 0.5 + 0.07, 0]}>
        <cylinderGeometry args={[R * 0.91, R * 0.93, 0.1, SEG]} />
        <meshStandardMaterial color="#0c0802" metalness={1} roughness={0.06} />
      </mesh>

      {/* ── Bottom dome */}
      <mesh position={[0, -H * 0.5 - 0.01, 0]}>
        <cylinderGeometry args={[R * 0.6, R * 0.91, 0.06, SEG]} />
        <meshStandardMaterial color="#0c0802" metalness={1} roughness={0.07} />
      </mesh>

      {/* ── Glow rings */}
      <GlowRing />
      <InnerRing />
    </group>
  )
}

// ─── Full Three.js scene ───────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      {/* Drag-to-rotate wrapper — spring snaps back to neutral */}
      <PresentationControls
        global
        rotation={[0.04, 0.3, 0]}
        polar={[-0.25, 0.25]}
        azimuth={[-Infinity, Infinity]}
        config={{ mass: 2, tension: 280 }}
        snap={{ mass: 4, tension: 180 }}
      >
        <Float speed={1.6} rotationIntensity={0.06} floatIntensity={0.35}>
          <WildMangoCan />
        </Float>
      </PresentationControls>

      <Particles />

      {/* ── Lighting rig ── */}
      {/* Key: bright white strobe from top-right */}
      <spotLight
        position={[4, 8, 4]}
        angle={0.22}
        penumbra={0.7}
        intensity={12}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Fill: warm amber from lower-left */}
      <spotLight
        position={[-3.5, 1, 2.5]}
        intensity={5}
        color={MANGO_HEX}
        angle={0.5}
        penumbra={1}
      />
      {/* Rim: cold white from behind */}
      <spotLight
        position={[0, 4, -6]}
        intensity={4}
        color="#d0e8ff"
        angle={0.35}
        penumbra={0.8}
      />
      {/* Accent: red glow from below-front */}
      <pointLight position={[0, -2, 3]} intensity={3} color="#E8001D" />
      {/* Ambient — very low */}
      <ambientLight intensity={0.12} />

      <Environment preset="city" />

      {/* Floor shadow — amber tint matching mango */}
      <ContactShadows
        position={[0, -H * 0.5 - 0.2, 0]}
        opacity={0.75}
        scale={8}
        blur={3.5}
        far={3}
        color={MANGO_HEX}
      />
    </>
  )
}

// ─── Public component ──────────────────────────────────────────────────────────
export default function CanShowcase() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: '100vh', background: '#050507' }}
    >
      {/* WebGL canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0.6, 6.8], fov: 28 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          shadows
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Drag hint */}
      <motion.div
        className="absolute top-10 right-12 z-10 flex items-center gap-3 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.span
          style={{ color: 'rgba(255,255,255,0.22)', fontSize: '16px' }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          ↻
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
          Drag to rotate
        </span>
      </motion.div>

      {/* Flavor eyebrow — top left */}
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

      {/* Main info overlay — bottom left */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between px-12 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="font-black uppercase leading-none text-white"
            style={{
              fontSize: 'clamp(4.5rem, 10vw, 12rem)',
              letterSpacing: '-0.035em',
            }}
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
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 45px rgba(245,158,11,0.55)',
            }}
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
              <p
                className="font-black text-xl"
                style={{ color: MANGO_HEX }}
              >
                {s.val}
              </p>
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

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #050507)',
        }}
      />

      {/* Subtle horizontal scan lines — holographic feel */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)',
        }}
      />
    </section>
  )
}
