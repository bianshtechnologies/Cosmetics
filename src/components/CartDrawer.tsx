import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, Gift, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, updateCartQty, removeFromCart, currencySymbol, products } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const navigate = useNavigate();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'GOLD' || couponCode.toUpperCase() === 'AURA20') {
      setDiscountPercent(20);
      setCouponApplied(true);
    } else {
      alert('Invalid Promo Code');
    }
  };

  const handleRemoveCoupon = () => {
    setDiscountPercent(0);
    setCouponApplied(false);
    setCouponCode('');
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountVal = (subtotal * discountPercent) / 100;
  const giftWrapVal = giftWrap ? 10 : 0;
  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = freeShippingThreshold - subtotal;
  const shippingVal = subtotal === 0 ? 0 : subtotal >= freeShippingThreshold ? 0 : 15;
  const total = subtotal - discountVal + giftWrapVal + shippingVal;

  const checkoutRedirect = () => {
    onClose();
    navigate('/checkout', { state: { discountPercent, giftWrap } });
  };

  // Recommends products that are not currently in the cart
  const recommendations = products
    .filter((p) => !cart.some((item) => item.product.id === p.id))
    .slice(0, 2);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'black',
              zIndex: 2000,
            }}
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              maxWidth: '480px',
              height: '100vh',
              background: 'var(--secondary)',
              boxShadow: 'var(--glass-shadow)',
              zIndex: 2001,
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '1px solid var(--border)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag size={18} />
                <h2 style={{ fontSize: '18px', fontWeight: 500, fontFamily: 'var(--font-serif)', margin: 0 }}>Shopping Bag ({cart.length})</h2>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}>
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Shipping Progress */}
              {subtotal > 0 && (
                <div style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid var(--border)', padding: '16px', borderRadius: '16px' }}>
                  <p style={{ fontSize: '12px', margin: '0 0 8px 0', color: 'var(--text-muted)' }}>
                    {remainingForFreeShipping > 0 ? (
                      <>Add <strong>{currencySymbol}{remainingForFreeShipping}</strong> more for free worldwide shipping</>
                    ) : (
                      <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>🎉 You qualify for complimentary shipping</span>
                    )}
                  </p>
                  <div style={{ background: '#E2E8F0', height: '4px', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ background: 'var(--primary)', width: `${progressToFreeShipping}%`, height: '100%', transition: 'width 0.4s ease' }} />
                  </div>
                </div>
              )}

              {/* Cart List */}
              {cart.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '40vh', gap: '15px' }}>
                  <ShoppingBag size={48} strokeWidth={1} color="var(--text-muted)" />
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '16px' }}>Your bag is empty.</p>
                  <button onClick={onClose} className="btn-luxury" style={{ padding: '12px 28px' }}>Start Shopping</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}
                      >
                        <img src={item.product.image} alt={item.product.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px' }} />
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <h4 style={{ fontSize: '14px', margin: 0, fontWeight: 500, fontFamily: 'var(--font-sans)' }}>{item.product.name}</h4>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.selectedVariant.name}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '20px', padding: '2px' }}>
                              <button onClick={() => updateCartQty(item.id, item.quantity - 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }}>
                                <Minus size={12} />
                              </button>
                              <span style={{ fontSize: '13px', padding: '0 8px', fontWeight: 500 }}>{item.quantity}</span>
                              <button onClick={() => updateCartQty(item.id, item.quantity + 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }}>
                                <Plus size={12} />
                              </button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '14px', fontWeight: 600 }}>{currencySymbol}{item.product.price * item.quantity}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Gift Wrap & Coupon Box */}
              {cart.length > 0 && (
                <>
                  {/* Gift Wrap */}
                  <div
                    onClick={() => setGiftWrap(!giftWrap)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      background: giftWrap ? 'rgba(231, 201, 169, 0.1)' : 'rgba(255,255,255,0.3)',
                      border: giftWrap ? '1px solid var(--accent)' : '1px solid var(--border)',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <Gift size={18} color="var(--accent-dark)" />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '13px', margin: 0, fontWeight: 500 }}>Add Signature Gift Wrapping</p>
                      <p style={{ fontSize: '11px', margin: 0, color: 'var(--text-muted)' }}>Premium box with handwritten card (+{currencySymbol}10)</p>
                    </div>
                    <input type="checkbox" checked={giftWrap} readOnly style={{ accentColor: 'var(--primary)', cursor: 'pointer' }} />
                  </div>

                  {/* Promo Code Form */}
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Promo Code (GOLD / AURA20)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied}
                      className="input-luxury"
                      style={{ padding: '12px 16px', borderRadius: '30px', fontSize: '13px' }}
                    />
                    {couponApplied ? (
                      <button type="button" onClick={handleRemoveCoupon} style={{ background: 'none', border: '1px solid var(--danger)', color: 'var(--danger)', borderRadius: '30px', padding: '0 20px', fontSize: '12px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Remove
                      </button>
                    ) : (
                      <button type="submit" className="btn-luxury" style={{ padding: '12px 24px', fontSize: '11px', borderRadius: '30px' }}>
                        Apply
                      </button>
                    )}
                  </form>
                  {couponApplied && (
                    <p style={{ fontSize: '12px', margin: '-12px 0 0 10px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={12} /> 20% discount coupon applied successfully!
                    </p>
                  )}

                  {/* Upsell Recommendations */}
                  <div style={{ marginTop: '10px' }}>
                    <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '12px' }}>Complete Your Ritual</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {recommendations.map((p) => (
                        <div key={p.id} style={{ display: 'flex', gap: '12px', background: 'rgba(255,255,255,0.3)', border: '1px solid var(--border)', borderRadius: '12px', padding: '10px' }}>
                          <img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ fontSize: '12px', fontWeight: 500 }}>{p.name}</span>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{currencySymbol}{p.price}</span>
                          </div>
                          <button
                            onClick={() => navigate(`/product/${p.id}`)}
                            style={{ alignSelf: 'center', border: 'none', background: 'none', color: 'var(--accent-dark)', fontSize: '11px', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                          >
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer Summary & CTA */}
            {cart.length > 0 && (
              <div style={{ padding: '24px', borderTop: '1px solid var(--border)', background: 'rgba(255, 255, 255, 0.4)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-muted)' }}>
                    <span>Subtotal</span>
                    <span>{currencySymbol}{subtotal}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--success)' }}>
                      <span>Discount (20%)</span>
                      <span>-{currencySymbol}{discountVal}</span>
                    </div>
                  )}
                  {giftWrap && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-muted)' }}>
                      <span>Signature Gift Wrap</span>
                      <span>+{currencySymbol}{giftWrapVal}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-muted)' }}>
                    <span>Shipping</span>
                    <span>{shippingVal === 0 ? 'Complimentary' : `${currencySymbol}${shippingVal}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '17px', fontWeight: 600, borderTop: '1px solid var(--border)', paddingTop: '10px', marginTop: '5px' }}>
                    <span>Total</span>
                    <span>{currencySymbol}{total}</span>
                  </div>
                </div>

                <button onClick={checkoutRedirect} className="btn-luxury" style={{ width: '100%', gap: '10px' }}>
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
