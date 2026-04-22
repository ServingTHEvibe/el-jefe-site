'use client'

import { motion } from 'framer-motion'
import { InteractiveTravelCard } from '@/components/ui/3d-card'

const flavors = [
  {
    name: 'Mailo Tamarindo',
    short: 'TAMARINDO',
    color: '#A0522D',
    desc: 'Bold, tangy, unforgettable.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_2048_Mailo_Tamarindo.jpg',
    href: 'https://www.eljefe.com/products/mailo-tamarindo',
  },
  {
    name: 'Killer Peach',
    short: 'PEACH',
    color: '#FF6B35',
    desc: 'Sweet heat. Assassin in fruit form.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_KillerPeach.jpg',
    href: 'https://www.eljefe.com/products/killer-peach',
  },
  {
    name: 'Phantom Lemon',
    short: 'LEMON',
    color: '#D4AF37',
    desc: 'Gold standard refreshment.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_phantom_lemonade.jpg',
    href: 'https://www.eljefe.com/products/phantom-lemonade',
  },
  {
    name: 'Sinister Razz',
    short: 'RAZZ',
    color: '#C71585',
    desc: 'Dark berry. Dangerous edge.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_SinisterRazz.jpg',
    href: 'https://www.eljefe.com/products/sinister-razz',
  },
  {
    name: 'Diablo Punch',
    short: 'PUNCH',
    color: '#E8001D',
    desc: 'Pure aggression. Zero mercy.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_DiabloPunch.jpg',
    href: 'https://www.eljefe.com/products/diablo-punch',
  },
  {
    name: 'Zuma Watermelon',
    short: 'WATER',
    color: '#22C55E',
    desc: 'Summer dominance in every sip.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_zuma_watermelon.jpg',
    href: 'https://www.eljefe.com/products/zuma-watermelon',
  },
  {
    name: 'Baja Orange',
    short: 'ORANGE',
    color: '#FF6B00',
    desc: 'West coast. Sun-fueled supremacy.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_2048px_baja_orange.jpg',
    href: 'https://www.eljefe.com/products/baja-orange',
  },
  {
    name: 'Wild Mango',
    short: 'MANGO',
    color: '#F59E0B',
    desc: 'Tropical power. Exotic domination.',
    img: 'https://www.eljefe.com/cdn/shop/files/EJEtwoshot_WildMango.jpg',
    href: 'https://www.eljefe.com/products/wild-mango',
  },
]

export default function Flavors() {
  return (
    <section
      id="flavors"
      className="relative py-24 md:py-52 overflow-hidden"
      style={{ background: '#050507' }}
    >
      {/* Section header */}
      <div className="px-10 md:px-20 mb-14 md:mb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#E8001D' }}>
            The Lineup
          </span>
          <h2
            className="font-black uppercase"
            style={{ fontSize: 'clamp(3rem, 7vw, 9rem)', letterSpacing: '-0.02em', lineHeight: 0.9 }}
          >
            <span className="text-white block">Pick Your</span>
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #E8001D, #D4AF37)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Weapon
            </span>
          </h2>
          <p className="text-xl max-w-lg mt-3" style={{ color: 'rgba(255,255,255,0.3)', lineHeight: 1.8 }}>
            Eight flavors. Eight ways to dominate.
          </p>
        </motion.div>
      </div>

      {/* 3D card grid */}
      <div className="px-10 md:px-20">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7"
          style={{ perspective: '1200px' }}
        >
          {flavors.map((flavor, i) => (
            <motion.div
              key={flavor.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <InteractiveTravelCard
                title={flavor.name}
                subtitle={flavor.short}
                imageUrl={flavor.img}
                actionText="Shop This Flavor"
                href={flavor.href}
                accentColor={flavor.color}
                onActionClick={() => {}}
                className="w-full h-[22rem] md:h-[26rem]"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        className="px-10 md:px-20 mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <motion.a
          href="https://www.eljefe.com/collections/energy-drinks"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex px-12 py-5 text-sm font-bold tracking-widest uppercase text-white border border-white/10 hover:border-red-600 transition-colors"
          whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(232,0,29,0.15)' }}
          whileTap={{ scale: 0.97 }}
        >
          Shop All Flavors →
        </motion.a>
      </motion.div>
    </section>
  )
}
