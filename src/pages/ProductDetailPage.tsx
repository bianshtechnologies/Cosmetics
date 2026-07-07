import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import type { Product, ProductVariant } from '../context/StoreContext';
import { Heart, ArrowLeft, Star, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [product, setProduct] = useState<Product | null>(null);

  // Detail States
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'use' | 'ingredients' | 'reviews'>('benefits');
  const [rotateAngle, setRotateAngle] = useState(0); // 360 degrees viewer simulation
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [flying, setFlying] = useState(false);

  const mainBuyButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const found = products.find((p) => p.id === id);
    if (found) {
      setProduct(found);
      setSelectedVariant(found.variants[0]);
      setQuantity(1);
      setRotateAngle(0);
    } else {
      navigate('/catalog');
    }
  }, [id, products, navigate]);

  // Scroll logic for sticky buy bar
  useEffect(() => {
    const handleScroll = () => {
      if (!mainBuyButtonRef.current) return;
      const rect = mainBuyButtonRef.current.getBoundingClientRect();
      setShowStickyBar(rect.bottom < 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [product]);

  if (!product || !selectedVariant) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div className="skeleton" style={{ width: '300px', height: '400px' }} />
      </div>
    );
  }

  const handleAddToCart = () => {
    // Flying animation trigger
    setFlying(true);
    setTimeout(() => {
      setFlying(false);
      addToCart(product, selectedVariant, quantity);
    }, 800);
  };

  const handleRotateLeft = () => setRotateAngle((prev) => prev - 45);
  const handleRotateRight = () => setRotateAngle((prev) => prev + 45);

  const totalReviewsCount = product.reviewsCount;
  const isWishlisted = isInWishlist(product.id);

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', position: 'relative' }}>
      {/* Back button */}
      <div className="luxury-container" style={{ marginBottom: '30px' }}>
        <button
          onClick={() => navigate('/catalog')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Collections</span>
        </button>
      </div>

      <div className="luxury-container detail-grid" style={{ alignItems: 'start' }}>
        {/* Left Interactive Gallery & 360 viewer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Main 360 visual rotator canvas */}
          <div className="glass-card" style={{ padding: '30px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '480px', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RefreshCw size={12} />
              Interactive 360° View
            </span>

            {/* Product image with dynamic rotation transform */}
            <motion.div
              style={{
                width: '260px',
                height: '340px',
                transformStyle: 'preserve-3d',
                rotateY: rotateAngle,
                transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '24px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                  filter: 'contrast(1.02)'
                }}
              />
              {/* Glass Reflection sheen overlay */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)', borderRadius: '24px', pointerEvents: 'none' }} />
            </motion.div>

            {/* Rotator Controls */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px', zIndex: 10 }}>
              <button onClick={handleRotateLeft} style={{ background: 'white', border: '1px solid var(--border)', cursor: 'pointer', padding: '8px 16px', borderRadius: '20px', fontSize: '12px' }}>
                Rotate Left
              </button>
              <button onClick={handleRotateRight} style={{ background: 'white', border: '1px solid var(--border)', cursor: 'pointer', padding: '8px 16px', borderRadius: '20px', fontSize: '12px' }}>
                Rotate Right
              </button>
            </div>
          </div>

          {/* Verification Badge row */}
          <div style={{ display: 'flex', justifyContent: 'space-around', background: 'rgba(255,255,255,0.2)', padding: '15px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><Star size={12} fill="var(--accent-dark)" color="var(--accent-dark)" /> 4.9/5 Rating</span>
            <span style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><Sparkles size={12} color="var(--accent-dark)" /> Dermatology Tested</span>
            <span style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><Star size={12} fill="var(--accent-dark)" color="var(--accent-dark)" /> Cruelty Free</span>
          </div>
        </div>

        {/* Right Product Information */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-dark)', fontWeight: 600 }}>{product.category} Formulation</span>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`wishlist-heart-btn ${isWishlisted ? 'active' : ''}`}
                style={{ background: 'white', border: '1px solid var(--border)', padding: '8px', borderRadius: '50%' }}
              >
                <Heart size={16} />
              </button>
            </div>
            <h1 style={{ fontSize: '42px', fontFamily: 'var(--font-serif)', marginTop: '8px', marginBottom: '12px' }}>{product.name}</h1>
            <p style={{ fontSize: '16px', color: 'var(--accent-dark)', fontWeight: 500, margin: '0 0 16px 0' }}>{product.tagline}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ fontSize: '26px', fontWeight: 600, color: 'var(--text)' }}>${product.price}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'var(--accent-dark)' : 'none'} color="var(--accent-dark)" />
                ))}
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '6px' }}>({totalReviewsCount} Verified Reviews)</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
            {product.description}
          </p>

          {/* Dynamic Swatches / Variants */}
          <div>
            <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '10px' }}>Select Volume/Shade</h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              {product.variants.map((v) => {
                const isSelected = selectedVariant.id === v.id;
                
                // Color swatches (Makeup items)
                if (v.colorCode) {
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      title={v.name}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: v.colorCode,
                        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                        boxShadow: isSelected ? '0 0 10px rgba(0,0,0,0.1)' : 'none',
                        cursor: 'pointer',
                        transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                        transition: 'var(--transition-fast)'
                      }}
                    />
                  );
                }

                // Volume label options (Skincare items)
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    style={{
                      border: isSelected ? '1px solid var(--text)' : '1px solid var(--border)',
                      background: isSelected ? 'var(--text)' : 'white',
                      color: isSelected ? 'var(--secondary)' : 'var(--text)',
                      padding: '10px 20px',
                      borderRadius: '30px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    {v.name} ({v.stock} in stock)
                  </button>
                );
              })}
            </div>
          </div>

          {/* Qty & Add to Cart */}
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '30px', padding: '6px 14px', background: 'white' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '0 8px' }}>-</button>
              <span style={{ fontSize: '14px', width: '24px', textAlign: 'center', fontWeight: 500 }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '0 8px' }}>+</button>
            </div>

            <button
              ref={mainBuyButtonRef}
              onClick={handleAddToCart}
              className="btn-luxury"
              style={{ flex: 1, padding: '16px', borderRadius: '30px' }}
              disabled={selectedVariant.stock === 0}
            >
              {selectedVariant.stock === 0 ? 'Out of Stock' : 'Add to Shopping Bag'}
            </button>
          </div>

          {/* Tabs Section: Benefits, How to Use, Active Ingredients, FAQs */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', gap: '20px', paddingBottom: '10px', overflowX: 'auto' }}>
              {['benefits', 'use', 'ingredients'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    fontWeight: activeTab === tab ? 600 : 400,
                    color: activeTab === tab ? 'var(--text)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    paddingBottom: '6px',
                    position: 'relative'
                  }}
                >
                  {tab === 'use' ? 'How To Use' : tab === 'ingredients' ? 'Ingredients' : 'Benefits'}
                  {activeTab === tab && (
                    <motion.div layoutId="detailTabLine" style={{ position: 'absolute', bottom: '-11px', left: 0, right: 0, height: '2px', background: 'var(--accent-dark)' }} />
                  )}
                </button>
              ))}
            </div>

            <div style={{ paddingTop: '20px', minHeight: '120px' }}>
              {activeTab === 'benefits' && (
                <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {product.benefits?.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  )) || (
                    <>
                      <li>Dermatologically verified active cellular replenishment.</li>
                      <li>Imparts deep organic skin moisture barrier defense.</li>
                    </>
                  )}
                </ul>
              )}
              {activeTab === 'use' && (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.7', margin: 0 }}>
                  {product.howToUse || 'Dispense 2-3 pumps onto clean palms and press thoroughly over face and neck, avoiding the immediate eye contours. Best layered evening after hydrators.'}
                </p>
              )}
              {activeTab === 'ingredients' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.ingredients.map((ing, i) => (
                    <span key={i} style={{ border: '1px solid var(--border)', background: 'rgba(255,255,255,0.4)', padding: '6px 12px', borderRadius: '15px', fontSize: '11px', color: 'var(--text)' }}>
                      {ing}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FLYING CART ANIMATION CONTAINER */}
      <AnimatePresence>
        {flying && (
          <motion.div
            initial={{ scale: 1, x: 0, y: 0, opacity: 1, position: 'fixed' }}
            animate={{
              scale: 0.1,
              x: window.innerWidth > 768 ? window.innerWidth - 180 : window.innerWidth - 60,
              y: -window.innerHeight + 140,
              opacity: 0.2
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            style={{
              position: 'fixed',
              bottom: '50px',
              left: '50px',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundImage: `url(${product.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              zIndex: 9999,
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>

      {/* STICKY FLOATING BUY SECTION */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card"
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 900,
              padding: '16px 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: '0px',
              borderTop: '1px solid var(--border)',
              background: 'rgba(255, 255, 255, 0.85)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px' }} />
              <div>
                <h4 style={{ fontSize: '14px', margin: 0, fontWeight: 600 }}>{product.name}</h4>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{selectedVariant.name}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ fontSize: '18px', fontWeight: 600 }}>${product.price}</span>
              <button onClick={handleAddToCart} className="btn-luxury" style={{ padding: '10px 24px', fontSize: '11px', borderRadius: '20px' }}>
                Add to Bag
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
