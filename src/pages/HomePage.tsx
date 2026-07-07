import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles, Heart, ShoppingBag, Award, Eye, Leaf, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const HomePage: React.FC = () => {
  const { products, cms, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Mouse parallax positioning
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      const x = (e.clientX / clientWidth - 0.5) * 40; // max shift 20px
      const y = (e.clientY / clientHeight - 0.5) * 40;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 3);

  // Animation constants
  const titleWords = cms.heroTitle.split(' ');

  return (
    <div ref={containerRef} style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Aurora Ambient Lighting */}
      <div className="aurora-bg">
        <div className="aurora-glow-1"></div>
        <div className="aurora-glow-2"></div>
      </div>

      {/* Floating Noise Overlay */}
      <div className="noise-overlay" />

      {/* HERO SECTION */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px', paddingBottom: '50px' }}>
        <div className="luxury-container" style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '40px' }}>
          {/* Left Hero Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid var(--accent)', padding: '6px 14px', borderRadius: '30px', width: 'fit-content', background: 'rgba(231, 201, 169, 0.1)' }}>
              <Sparkles size={12} color="var(--accent-dark)" />
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'var(--text)' }}>
                Organic Cellular Science
              </span>
            </div>

            <h1 style={{ fontSize: 'calc(2.5rem + 2vw)', lineHeight: '1.1', fontWeight: 300, fontFamily: 'var(--font-serif)' }}>
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                  style={{ display: 'inline-block', marginRight: '16px' }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.8', maxWidth: '480px' }}
            >
              {cms.heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ display: 'flex', gap: '20px', alignItems: 'center' }}
            >
              <Link to="/catalog" className="btn-luxury" style={{ display: 'flex', gap: '10px' }}>
                <span>{cms.heroCTA}</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-secondary-luxury">
                Philosophy
              </Link>
            </motion.div>
          </div>

          {/* Right Parallax Media */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px' }}>
            {/* Background luxury soft shadow circle */}
            <div style={{ position: 'absolute', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(246, 215, 221, 0.4) 0%, rgba(255, 255, 255, 0) 70%)', zIndex: -1 }} />

            {/* Skincare Bottle (Primary Element) */}
            <motion.div
              style={{
                width: '320px',
                height: '460px',
                borderRadius: '160px',
                overflow: 'hidden',
                boxShadow: '0 30px 70px rgba(0,0,0,0.12)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                x: mousePosition.x * 0.4,
                y: mousePosition.y * 0.4,
                transition: 'transform 0.1s ease-out',
                position: 'relative',
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop"
                alt="AURA Gold Elixir"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>

            {/* Floating Organic Ingredient Petal (Parallax Element) */}
            <motion.div
              style={{
                position: 'absolute',
                top: '60px',
                right: '40px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: 'var(--glass-shadow)',
                border: '1px solid rgba(255,255,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                x: mousePosition.x * -0.6,
                y: mousePosition.y * -0.6,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <Leaf size={20} color="var(--accent-dark)" style={{ marginBottom: '4px' }} />
                <p style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>100% Raw</p>
                <p style={{ fontSize: '8px', color: 'var(--text-muted)', margin: 0 }}>Botanicals</p>
              </div>
            </motion.div>

            {/* Floating Gold particle bubble */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '100px',
                left: '20px',
                width: '110px',
                height: '110px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: 'var(--glass-shadow)',
                border: '1px solid rgba(255,255,255,0.4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                x: mousePosition.x * 0.8,
                y: mousePosition.y * -0.8,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <Award size={18} color="var(--accent-dark)" />
              <span style={{ fontSize: '10px', fontWeight: 'bold', marginTop: '4px' }}>AWWWARDS</span>
              <span style={{ fontSize: '8px', color: 'var(--text-muted)' }}>Winner 2026</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* METRIC STATISTICS */}
      <section style={{ background: 'rgba(255,255,255,0.3)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '50px 0' }}>
        <div className="luxury-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', textAlign: 'center' }}>
          <div>
            <h3 style={{ fontSize: '36px', fontFamily: 'var(--font-serif)', color: 'var(--text)' }}>99.8%</h3>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginTop: '5px' }}>Bio-Active Lipids</p>
          </div>
          <div>
            <h3 style={{ fontSize: '36px', fontFamily: 'var(--font-serif)', color: 'var(--text)' }}>14k+</h3>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginTop: '5px' }}>Luminous Reviews</p>
          </div>
          <div>
            <h3 style={{ fontSize: '36px', fontFamily: 'var(--font-serif)', color: 'var(--text)' }}>100%</h3>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginTop: '5px' }}>Recyclable Glass</p>
          </div>
          <div>
            <h3 style={{ fontSize: '36px', fontFamily: 'var(--font-serif)', color: 'var(--text)' }}>Zero</h3>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginTop: '5px' }}>Synthetic Toxins</p>
          </div>
        </div>
      </section>

      {/* BEST SELLERS GRID */}
      <section style={{ padding: '100px 0' }}>
        <div className="luxury-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-dark)', fontWeight: 600 }}>The Core Routine</span>
              <h2 style={{ fontSize: '36px', fontFamily: 'var(--font-serif)', marginTop: '6px' }}>Curated Best Sellers</h2>
            </div>
            <Link to="/catalog" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <span>Shop All</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {bestSellers.map((product) => {
              const inWishlist = isInWishlist(product.id);
              const mainVariant = product.variants[0];

              return (
                <div key={product.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`wishlist-heart-btn ${inWishlist ? 'active' : ''}`}
                    style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 5, background: 'rgba(255,255,255,0.7)', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
                  >
                    <Heart size={16} />
                  </button>

                  {/* Image Frame */}
                  <div className="zoom-image-container" style={{ height: '380px', marginBottom: '20px' }}>
                    <img src={product.image} alt={product.name} className="zoom-image" />
                    {product.isNew && (
                      <span style={{ position: 'absolute', bottom: '15px', left: '15px', background: 'var(--cream)', border: '1px solid var(--accent)', color: 'var(--text)', fontSize: '9px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        New Release
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ fontSize: '18px', margin: 0, fontFamily: 'var(--font-serif)' }}>{product.name}</h3>
                        <span style={{ fontSize: '15px', fontWeight: 600 }}>${product.price}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '1.5' }}>{product.tagline}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                      <button onClick={() => navigate(`/product/${product.id}`)} className="btn-secondary-luxury" style={{ flex: 1, padding: '12px', fontSize: '11px' }}>
                        <Eye size={14} style={{ marginRight: '6px' }} /> View
                      </button>
                      <button onClick={() => addToCart(product, mainVariant)} className="btn-luxury" style={{ flex: 1, padding: '12px', fontSize: '11px' }}>
                        <ShoppingBag size={14} style={{ marginRight: '6px' }} /> Quick Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BRAND STORY & CMS METRICS */}
      <section style={{ padding: '100px 0', background: 'rgba(15, 23, 42, 0.03)', borderTop: '1px solid var(--border)' }}>
        <div className="luxury-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div className="zoom-image-container" style={{ height: '550px', boxShadow: 'var(--glass-shadow)', border: '1px solid var(--border-glass)' }}>
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop"
              alt="Luxury formulation laboratory"
              className="zoom-image"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-dark)', fontWeight: 600 }}>Craftsmanship Philosophy</span>
            <h2 style={{ fontSize: '42px', fontFamily: 'var(--font-serif)', lineHeight: '1.2' }}>{cms.storyTitle}</h2>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.9' }}>
              {cms.storyContent}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Leaf size={20} color="var(--accent-dark)" />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 600 }}>Pure Vegan</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Certified organic components.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Shield size={20} color="var(--accent-dark)" />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 600 }}>Eco-Packaging</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Recycled hand-blown glass.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT ARTICLES (BEAUTY MAGAZINE) */}
      <section style={{ padding: '100px 0' }}>
        <div className="luxury-container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-dark)', fontWeight: 600 }}>AURA MAGAZINE</span>
            <h2 style={{ fontSize: '38px', fontFamily: 'var(--font-serif)', marginTop: '8px' }}>Skincare Science Essays</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-dark)' }}>RITUALS</span>
              <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)' }}>The Art of Layering Skincare for Maximum Active Delivery</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Understanding viscosity, pH thresholds, and active combinations to build an efficient daily beauty ritual.
              </p>
              <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text)', fontWeight: 600 }}>
                <span>Read Essay</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-dark)' }}>INGREDIENTS</span>
              <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)' }}>Why Botanical Lipids Outperform Synthetic Silicone Barriers</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                An investigation into Kalahari Melon seed oil, Olive Squalane, and Ceramide lipid integration.
              </p>
              <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text)', fontWeight: 600 }}>
                <span>Read Essay</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
