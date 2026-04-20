'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, ContactShadows, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function CanMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const topRef = useRef<THREE.Mesh>(null)
  const bottomRef = useRef<THREE.Mesh>(null)

  const texture = useTexture('https://www.eljefe.com/cdn/shop/files/EJE_two_shot_2048_Mailo_Tamarindo.jpg')

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.007
    if (topRef.current) topRef.current.rotation.y = meshRef.current.rotation.y
    if (bottomRef.current) bottomRef.current.rotation.y = meshRef.current.rotation.y
  })

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
      {/* Main can body */}
      <mesh ref={meshRef} castShadow>
        <cylinderGeometry args={[0.68, 0.63, 2.5, 80, 1, false]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.98}
          roughness={0.04}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Label wrap — using real image as texture on a slightly larger cylinder */}
      <mesh rotation={[0, Math.PI, 0]}>
        <cylinderGeometry args={[0.692, 0.642, 2.0, 80, 1, true]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.1}
          roughness={0.5}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Top cap */}
      <mesh ref={topRef} position={[0, 1.27, 0]}>
        <cylinderGeometry args={[0.48, 0.68, 0.07, 64]} />
        <meshStandardMaterial color="#2a2a2a" metalness={1} roughness={0.08} />
      </mesh>

      {/* Pull tab ring */}
      <mesh position={[0, 1.32, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.04, 32]} />
        <meshStandardMaterial color="#444" metalness={1} roughness={0.05} />
      </mesh>

      {/* Bottom cap */}
      <mesh ref={bottomRef} position={[0, -1.27, 0]}>
        <cylinderGeometry args={[0.63, 0.62, 0.07, 64]} />
        <meshStandardMaterial color="#1a1a1a" metalness={1} roughness={0.1} />
      </mesh>

      {/* Animated red glow ring at base */}
      <GlowRing />
    </Float>
  )
}

function GlowRing() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z += 0.006
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.06
    ref.current.scale.set(s, s, s)
    // @ts-expect-error material emissiveIntensity
    ref.current.material.emissiveIntensity = 2 + Math.sin(state.clock.elapsedTime * 2) * 0.8
  })
  return (
    <mesh ref={ref} position={[0, -1.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.05, 0.012, 16, 100]} />
      <meshStandardMaterial color="#E8001D" emissive="#E8001D" emissiveIntensity={2.5} />
    </mesh>
  )
}

export default function Can3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0.3, 5.5], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <spotLight position={[4, 8, 4]} angle={0.25} penumbra={1} intensity={4} color="#ffffff" castShadow />
          <spotLight position={[-4, -1, 3]} intensity={2} color="#E8001D" />
          <pointLight position={[0, 3, 1]} intensity={1.5} color="#D4AF37" />
          <Environment preset="city" />
          <CanMesh />
          <ContactShadows
            position={[0, -1.65, 0]}
            opacity={0.6}
            scale={5}
            blur={2.5}
            far={2}
            color="#E8001D"
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
