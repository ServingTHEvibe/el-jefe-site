'use client'

import { motion } from 'framer-motion'
import { InteractiveProductCard } from '@/components/ui/card-7'

const EL_JEFE_LOGO = 'https://www.eljefe.com/cdn/shop/files/El_Jefe_Energy_logo-white_transparent.png'

const merch = [
  {
    name: 'El Jefe Trucker Hat',
    desc: 'Classic suede, silver badge',
    price: '$28',
    tag: 'BESTSELLER',
    img: 'https://www.eljefe.com/cdn/shop/files/El_Jefe_Black_suede_hat_Silver_stock.jpg',
  },
  {
    name: 'El Jefe Boxing Hoodie',
    desc: 'Premium heavyweight fleece',
    price: '$48',
    tag: 'LIMITED',
    img: 'https://www.eljefe.com/cdn/shop/files/ElJefemalefrontboxinghoodie.jpg',
  },
  {
    name: 'El Jefe Racing Hoodie',
    desc: 'Street-ready performance cut',
    price: '$48',
    tag: 'NEW DROP',
    img: 'https://www.eljefe.com/cdn/shop/files/IMG_7949.jpg',
  },
  {
    name: 'El Jefe Energy Beanie',
    desc: 'Maroon red, orange stitch',
    price: '$24',
    tag: 'ESSENTIAL',
    img: 'https://www.eljefe.com/cdn/shop/files/ElJefeBeaniemaroonredwithorangestitching.jpg',
  },
]

export default function Merch() {
  return (
    <section
      id="merch"
      className="relative py-24 md:py-52 overflow-hidden"
      style={{ background: '#050507' }}
    >
      {/* Gold top border */}
      <div className="w-full h-px mb-12 md:mb-24" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)' }} />

      <div className="px-10 md:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: '#D4AF37' }}>
              The Collection
            </span>
            <h2
              className="font-black uppercase leading-none"
              style={{ fontSize: 'clamp(3rem, 6vw, 8rem)', letterSpacing: '-0.02em' }}
            >
              <span className="text-white">Rep The </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, #E8001D, #D4AF37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Brand
              </span>
            </h2>
          </motion.div>

          <motion.a
            href="#"
            className="self-start md:self-auto px-8 py-4 text-xs font-bold tracking-widest uppercase border border-white/15 text-white hover:border-white/40 transition-colors"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            View All Merch →
          </motion.a>
        </div>

        {/* 3D product card grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {merch.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <InteractiveProductCard
                imageUrl={item.img}
                logoUrl={EL_JEFE_LOGO}
                title={item.name}
                description={item.desc}
                price={item.price}
                tag={item.tag}
                className="w-full"
              />
            </motion.div>
          ))}
        </div>

        {/* Boss pack callout */}
        <motion.div
          className="mt-24 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="relative flex flex-col md:flex-row items-center justify-between gap-12 p-14 md:p-20 border"
            style={{
              borderColor: 'rgba(232,0,29,0.2)',
              background: 'linear-gradient(135deg, rgba(232,0,29,0.05) 0%, rgba(0,0,0,0.8) 100%)',
            }}
          >
            <div
              className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(232,0,29,0.12) 0%, transparent 70%)' }}
            />

            <div className="relative z-10">
              <span className="text-xs font-bold tracking-widest uppercase text-red-600 block mb-4">
                Bundle &amp; Save
              </span>
              <h3
                className="font-black uppercase text-white"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 4rem)', letterSpacing: '-0.01em', lineHeight: 1.1 }}
              >
                The Boss 7+5<br />Power Pack
              </h3>
              <p className="mt-4 text-base max-w-md" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
                Try all 7 signature flavors + 5 bonus cans. One pack, total domination.
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0 text-center md:text-right">
              <div className="relative w-56 h-40 mx-auto md:mx-0">
                <img
                  src="https://www.eljefe.com/cdn/shop/files/El_Jefe_-_Variety_Pack_black_with_mango_can.jpg"
                  alt="El Jefe Variety Pack"
                  className="w-full h-full object-contain"
                />
              </div>
              <motion.a
                href="#"
                className="mt-6 inline-block px-10 py-4 text-sm font-bold tracking-widest uppercase text-white"
                style={{ background: '#E8001D' }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(232,0,29,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                Shop the Pack →
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
