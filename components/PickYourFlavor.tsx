'use client'

import { useState } from 'react'

const SHOP = 'https://www.eljefe.com/collections/energy-drinks'

const flavors = [
  {
    id: 'mailo-tamarindo',
    name: 'Mailo Tamarindo',
    image: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_2048_Mailo_Tamarindo.jpg',
    accent: '#A0522D',
    bgGlow: 'rgba(160,82,45,0.4)',
    caffeine: '150mg',
    sugar: '0g',
    calories: '10',
    vibe: 'Bold, tangy, unforgettable',
    notes: ['Tamarind', 'Tangy citrus', 'Smooth finish'],
  },
  {
    id: 'killer-peach',
    name: 'Killer Peach',
    image: '/flavor-killer-peach.png',
    accent: '#FF6B35',
    bgGlow: 'rgba(255,107,53,0.38)',
    caffeine: '150mg',
    sugar: '0g',
    calories: '10',
    vibe: 'Smooth. Sharp. Deadly good.',
    notes: ['Peach', 'Soft fruit', 'Crisp finish'],
  },
  {
    id: 'phantom-lemonade',
    name: 'Phantom Lemon',
    image: 'https://www.eljefe.com/cdn/shop/files/EJE_two_shot_phantom_lemonade.jpg',
    accent: '#D4AF37',
    bgGlow: 'rgba(212,175,55,0.38)',
    caffeine: '150mg',
    sugar: '0g',
    calories: '10',
    vibe: 'Gold standard refreshment',
    notes: ['Lemon', 'Tart snap', 'Clean fuel'],
  },
  {
    id: 'sinister-razz',
    name: 'Sinister Razz',
    image: '/flavor-sinister-razz.png',
    accent: '#C71585',
    bgGlow: 'rgba(199,21,133,0.38)',
    caffeine: '150mg',
    sugar: '0g',
    calories: '10',
    vibe: 'Rule the night.',
    notes: ['Blue razz', 'Dark berry', 'Night mode'],
  },
  {
    id: 'diablo-punch',
    name: 'Diablo Punch',
    image: '/flavor-diablo-punch.png',
    accent: '#E8001D',
    bgGlow: 'rgba(232,0,29,0.4)',
    caffeine: '150mg',
    sugar: '0g',
    calories: '10',
    vibe: 'Hit hard. Stay cold.',
    notes: ['Punch', 'Red fruit', 'Boss energy'],
  },
  {
    id: 'zuma-watermelon',
    name: 'Zuma Watermelon',
    image: '/flavor-zuma-watermelon.png',
    accent: '#22C55E',
    bgGlow: 'rgba(34,197,94,0.38)',
    caffeine: '150mg',
    sugar: '0g',
    calories: '10',
    vibe: 'Stay juicy. Stay bold.',
    notes: ['Watermelon', 'Fresh bite', 'Clean energy'],
  },
  {
    id: 'baja-orange',
    name: 'Baja Orange',
    image: '/flavor-baja-orange.png',
    accent: '#FF6B00',
    bgGlow: 'rgba(255,107,0,0.38)',
    caffeine: '150mg',
    sugar: '0g',
    calories: '10',
    vibe: 'Sun-fueled. Boss-driven.',
    notes: ['Orange', 'Bright zest', 'Clean power'],
  },
  {
    id: 'wild-mango',
    name: 'Wild Mango',
    image: '/flavor-wild-mango.png',
    accent: '#F59E0B',
    bgGlow: 'rgba(245,158,11,0.38)',
    caffeine: '150mg',
    sugar: '0g',
    calories: '10',
    vibe: 'Own the heat.',
    notes: ['Mango', 'Tropical fire', 'Fearless finish'],
  },
]

export default function PickYourFlavor() {
  const [selected, setSelected] = useState(flavors[0])

  return (
    <section id="flavors" className="pf-section">
      <div className="pf-wrap">
        <div className="pf-header">
          <p className="pf-eyebrow">EL JEFE ENERGY</p>
          <h2 className="pf-h2">PICK YOUR WEAPON</h2>
          <p className="pf-sub">Choose your flavor. Zero sugar. Fuel for the fearless.</p>
        </div>

        <div className="pf-main">
          {/* Thumbnail rail */}
          <div className="pf-rail">
            {flavors.map((f) => (
              <button
                key={f.id}
                className={`pf-thumb${selected.id === f.id ? ' active' : ''}`}
                onClick={() => setSelected(f)}
                style={{ '--accent': f.accent, '--glow': f.bgGlow } as React.CSSProperties}
              >
                <img src={f.image} alt={f.name} />
                <span>{f.name}</span>
              </button>
            ))}
          </div>

          {/* Hero stage */}
          <div className="pf-stage">
            <div
              className="pf-glow"
              style={{ background: `radial-gradient(circle, ${selected.bgGlow} 0%, transparent 70%)` }}
            />
            <img className="pf-can" src={selected.image} alt={selected.name} key={selected.id} />
          </div>

          {/* Stats card */}
          <div className="pf-card" style={{ '--accent': selected.accent } as React.CSSProperties}>
            <p className="pf-card-eye">CHOOSE YOUR POWER</p>
            <h3 className="pf-card-name">{selected.name}</h3>
            <p className="pf-card-vibe">{selected.vibe}</p>

            <div className="pf-grid">
              {[
                { label: 'Caffeine', val: selected.caffeine },
                { label: 'Sugar', val: selected.sugar },
                { label: 'Calories', val: selected.calories },
                { label: 'Finish', val: 'Fearless' },
              ].map((s) => (
                <div key={s.label} className="pf-stat">
                  <span className="pf-stat-label">{s.label}</span>
                  <strong className="pf-stat-val">{s.val}</strong>
                </div>
              ))}
            </div>

            <div className="pf-notes">
              <span className="pf-notes-label">Flavor Notes</span>
              <ul>
                {selected.notes.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </div>

            <a className="pf-cta" href={SHOP} target="_blank" rel="noopener noreferrer">
              Shop {selected.name} →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .pf-section {
          background: #050507;
          color: #fff;
          padding: 100px 24px;
          overflow: hidden;
          font-family: var(--font-dm, 'DM Sans', sans-serif);
        }
        .pf-wrap { max-width: 1400px; margin: 0 auto; }
        .pf-header { text-align: center; margin-bottom: 52px; }
        .pf-eyebrow {
          color: #E8001D;
          letter-spacing: 0.22em;
          font-size: 10px;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .pf-h2 {
          font-size: clamp(3rem, 8vw, 8rem);
          line-height: 0.9;
          margin: 0;
          font-weight: 900;
          letter-spacing: -0.04em;
          font-family: var(--font-display, 'Syne', sans-serif);
        }
        .pf-sub {
          color: rgba(255,255,255,0.38);
          max-width: 480px;
          margin: 16px auto 0;
          font-size: 15px;
          font-weight: 300;
          line-height: 1.7;
        }
        .pf-main {
          display: grid;
          grid-template-columns: 130px 1fr 360px;
          gap: 24px;
          align-items: center;
        }
        .pf-rail {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pf-thumb {
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          border-radius: 16px;
          padding: 10px 8px 8px;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.55);
          font-size: 10px;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          line-height: 1.2;
          text-align: center;
        }
        .pf-thumb:hover, .pf-thumb.active {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent), 0 0 36px var(--glow);
          color: #fff;
          background: rgba(255,255,255,0.04);
        }
        .pf-thumb img {
          width: 64px;
          height: 44px;
          object-fit: cover;
          border-radius: 8px;
        }
        .pf-stage {
          position: relative;
          min-height: 680px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 32px;
          overflow: hidden;
          background: radial-gradient(circle at center, rgba(255,255,255,0.03), transparent 65%);
          border: 1px solid rgba(255,255,255,0.05);
        }
        .pf-glow {
          position: absolute;
          inset: 5%;
          filter: blur(70px);
          pointer-events: none;
          transition: background 0.6s ease;
        }
        .pf-can {
          position: relative;
          width: min(100%, 580px);
          max-height: 640px;
          object-fit: contain;
          z-index: 2;
          filter: drop-shadow(0 24px 60px rgba(0,0,0,0.6));
          animation: pfFadeIn 0.4s ease;
        }
        @keyframes pfFadeIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .pf-card {
          border: 1px solid rgba(255,255,255,0.07);
          background: linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          border-radius: 28px;
          padding: 32px 28px;
          position: relative;
          overflow: hidden;
        }
        .pf-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 28px;
          padding: 1px;
          background: linear-gradient(160deg, var(--accent), rgba(255,255,255,0.04));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .pf-card-eye {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          color: var(--accent);
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .pf-card-name {
          font-size: clamp(1.8rem, 3vw, 3rem);
          line-height: 0.95;
          margin: 0;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.025em;
          font-family: var(--font-display, 'Syne', sans-serif);
        }
        .pf-card-vibe {
          color: rgba(255,255,255,0.45);
          margin: 10px 0 24px;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.6;
        }
        .pf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 20px;
        }
        .pf-stat {
          padding: 14px;
          border-radius: 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .pf-stat-label {
          display: block;
          color: rgba(255,255,255,0.4);
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 8px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .pf-stat-val {
          font-size: 1.6rem;
          font-weight: 900;
          color: var(--accent);
          font-family: var(--font-display, 'Syne', sans-serif);
        }
        .pf-notes {
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.07);
          margin-bottom: 24px;
        }
        .pf-notes-label {
          display: block;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          color: rgba(255,255,255,0.38);
          font-size: 8px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .pf-notes ul {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .pf-notes li {
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 12px;
          color: rgba(255,255,255,0.65);
        }
        .pf-cta {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 15px;
          border-radius: 14px;
          background: var(--accent);
          color: #050507;
          font-weight: 900;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 11px;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          transition: all 0.2s ease;
        }
        .pf-cta:hover {
          filter: brightness(1.08);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px var(--glow, rgba(255,255,255,0.2));
        }
        @media (max-width: 1100px) {
          .pf-main { grid-template-columns: 1fr; }
          .pf-rail { flex-direction: row; overflow-x: auto; padding-bottom: 8px; order: 2; }
          .pf-thumb { min-width: 90px; }
          .pf-stage { min-height: 480px; order: 1; }
          .pf-card { order: 3; }
        }
        @media (max-width: 640px) {
          .pf-stage { min-height: 360px; }
          .pf-can { width: 90%; }
        }
      `}</style>
    </section>
  )
}
