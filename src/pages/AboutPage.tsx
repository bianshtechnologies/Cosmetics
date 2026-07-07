import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Award, Compass, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface Ingredient {
  name: string;
  source: string;
  benefit: string;
  details: string;
}

export const AboutPage: React.FC = () => {
  const [activeIngredient, setActiveIngredient] = useState<number | null>(null);

  const ingredientsList: Ingredient[] = [
    {
      name: 'Kalahari Melon Seed Oil',
      source: 'Namib Desert, Africa',
      benefit: 'Intense lipid replenishment',
      details: 'Naturally rich in Omega-6 fatty acids and Vitamin E, Kalahari melon seeds are harvested and cold-pressed to release an incredibly light, dry oil that absorbs instantly to restore skin bounce and moisture barriers.'
    },
    {
      name: '24k Colloidal Gold Leaf',
      source: 'Val d\'Aoste, Italy',
      benefit: 'Micro-circulation & radiance',
      details: 'Pure gold particles suspended in organic squalane oils act as cell catalysts. They promote blood flow, neutralize free radicals, reduce chronic inflammation, and leave a luminous, micro-reflective aesthetic finish.'
    },
    {
      name: 'Damask Rose Hydrosol',
      source: 'Grasse, France',
      benefit: 'Calming skin redness',
      details: 'Hand-harvested at sunrise when the aromatic oils are most dense, these rose petals undergo gentle steam distillation, yielding a pure floral water that balances skin pH, reduces redness, and provides deep sensory calm.'
    },
    {
      name: 'Olive Squalane',
      source: 'Andalusia, Spain',
      benefit: 'Barrier mimicking hydration',
      details: 'A clean, plant-based lipid that mimics human sebum identically. It locks moisture without blocking pores, boosting skin elasticity and cellular regeneration while softening dry flakes.'
    }
  ];

  const timelineMilestones = [
    { year: '2022', title: 'The Grasse Incubator', desc: 'Aura was born in a small clean beauty laboratory in Grasse, France, combining organic crop botany with modern dermatological science.' },
    { year: '2023', title: 'Pure Oil Patent', desc: 'Patented our extraction process for Kalahari Melon oil, ensuring zero thermal decay of essential Omega-6 lipids.' },
    { year: '2024', title: 'Clean Cosmetics Award', desc: 'Named "Best Luxury Organic Brand" by Paris Beauty Forum, and certified 100% vegan by ECOCERT.' },
    { year: '2026', title: 'Global Vanity Expansion', desc: 'Launched worldwide shipping in custom hand-blown glass, introducing Aesop minimalism and Dior sophistication to global customers.' }
  ];

  return (
    <div style={{ paddingBottom: '100px', paddingTop: '120px' }}>
      {/* Editorial Header */}
      <section className="luxury-container" style={{ marginBottom: '80px', textAlign: 'center' }}>
        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--accent-dark)', fontWeight: 600 }}>Philosophical Roots</span>
        <h1 style={{ fontSize: 'calc(2rem + 2.5vw)', fontFamily: 'var(--font-serif)', margin: '15px 0' }}>Crafting Clean Elegance</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.8' }}>
          We design skincare rituals that combine botanical extraction with molecular science, establishing a premium, luxury vanity aesthetic that respects the biosphere.
        </p>
      </section>

      {/* Founder Profile Section */}
      <section className="luxury-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px', alignItems: 'center', marginBottom: '100px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-dark)', fontWeight: 600 }}>FOUNDER PORTRAIT</span>
          <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-serif)' }}>Valerie de Dior</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
            "Luxury shouldn't compromise botanical purity, nor should organic products lack sophisticated design. AURA was created to bridge this gap. We wanted formulas that look expensive on your vanity, feel incredible on your skin, and deliver clinical outcomes using raw active molecules."
          </p>
          <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--text-muted)' }}>
            — Valerie de Dior, Creative Director & Chief Chemist
          </p>
        </div>
        <div className="zoom-image-container" style={{ height: '480px', border: '1px solid var(--border-glass)' }}>
          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" alt="Valerie de Dior portrait" className="zoom-image" />
        </div>
      </section>

      {/* Mission Vision Values (Bento Cards) */}
      <section style={{ background: 'rgba(15, 23, 42, 0.02)', padding: '80px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: '100px' }}>
        <div className="luxury-container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-dark)' }}>Brand Pillars</span>
            <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', marginTop: '8px' }}>Principles of Aura</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <Compass size={24} color="var(--accent-dark)" />
              <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)' }}>Conscious Botany</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                We source wild-harvested ingredients directly from native cooperatives, ensuring ethical fair-wage distribution and crop sustainability.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <Sparkles size={24} color="var(--accent-dark)" />
              <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)' }}>Apple-level Precision</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Each batch is trace-analyzed in molecular chambers to guarantee active concentration stability before bottling.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <ShieldCheck size={24} color="var(--accent-dark)" />
              <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)' }}>Dior Elegance</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Sleek editorial layouts and minimalist hand-polished aesthetics because high-end cosmetics should feel visually beautiful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Ingredient Showcase */}
      <section id="ingredients" className="luxury-container" style={{ marginBottom: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-dark)', fontWeight: 600 }}>INGREDIENT DICTIONARY</span>
          <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', marginTop: '8px' }}>Active Molecular Compounds</h2>
        </div>
        <div className="responsive-double-grid" style={{ alignItems: 'flex-start', gap: '40px' }}>
          {/* List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {ingredientsList.map((ing, idx) => (
              <div
                key={idx}
                onClick={() => setActiveIngredient(idx)}
                style={{
                  padding: '20px',
                  background: activeIngredient === idx ? 'rgba(231, 201, 169, 0.1)' : 'rgba(255,255,255,0.3)',
                  border: activeIngredient === idx ? '1px solid var(--accent)' : '1px solid var(--border)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '16px', fontFamily: 'var(--font-serif)', margin: 0 }}>{ing.name}</h4>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-dark)', fontWeight: 600 }}>{ing.source}</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', margin: 0 }}>{ing.benefit}</p>
              </div>
            ))}
          </div>

          {/* Tooltip Content Detail Panel */}
          <div className="glass-card" style={{ padding: '40px', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
            {activeIngredient !== null ? (
              <motion.div
                key={activeIngredient}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
              >
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-dark)' }}>Origin: {ingredientsList[activeIngredient].source}</span>
                <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', margin: 0 }}>{ingredientsList[activeIngredient].name}</h3>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', margin: 0 }}>Core Benefit: {ingredientsList[activeIngredient].benefit}</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.8', margin: 0 }}>
                  {ingredientsList[activeIngredient].details}
                </p>
              </motion.div>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <Eye size={32} strokeWidth={1} style={{ marginBottom: '10px' }} />
                <p style={{ fontSize: '14px', margin: 0 }}>Click an active ingredient to view details and scientific origin.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="luxury-container" style={{ marginBottom: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-dark)', fontWeight: 600 }}>CHRONOLOGY</span>
          <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', marginTop: '8px' }}>Milestones of AURA</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {timelineMilestones.map((t, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '24px', position: 'relative' }}>
              <div style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', color: 'var(--accent-dark)', fontWeight: 'bold' }}>{t.year}</div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, margin: '8px 0' }}>{t.title}</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications and Awards */}
      <section className="luxury-container" style={{ borderTop: '1px solid var(--border)', paddingTop: '60px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: '30px' }}>Verified Credentials & Awards</h3>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '50px', alignItems: 'center', opacity: 0.7 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 500 }}><Award size={18} /> ECOCERT Certified Organic</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 500 }}><Heart size={18} /> Cruelty Free International</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 500 }}><Award size={18} /> Paris Beauty Forum Nominee</div>
        </div>
      </section>
    </div>
  );
};
