import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CreditCard, Truck, MapPin, CheckCircle2, ChevronRight, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const CheckoutPage: React.FC = () => {
  const { cart, placeOrder, currencySymbol } = useStore();
  const navigate = useNavigate();

  // Progress Step: 'address' | 'shipping' | 'payment' | 'success'
  const [step, setStep] = useState<'address' | 'shipping' | 'payment' | 'success'>('address');
  const [placedOrder, setPlacedOrder] = useState<any | null>(null);

  // Address inputs
  const [address, setAddress] = useState({
    fullName: 'Valerie de Dior',
    email: 'valerie@diorlabs.com',
    street: '15 Avenue Montaigne',
    city: 'Paris',
    postalCode: '75008',
    country: 'France'
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'Standard' | 'Express'>('Standard');

  // Payment inputs
  const [payment, setPayment] = useState({
    cardName: 'VALERIE DE DIOR',
    cardNumber: '4111 2222 3333 4444',
    expiry: '12/29',
    cvv: '983'
  });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountVal = 0; // calculations passed down, or default to 0
  const shippingCost = shippingMethod === 'Express' ? 25 : subtotal > 150 ? 0 : 15;
  const total = subtotal - discountVal + shippingCost;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'address') setStep('shipping');
    else if (step === 'shipping') setStep('payment');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder = placeOrder(address, shippingMethod);
    setPlacedOrder(newOrder);
    setStep('success');
    
    // Launch Confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', gap: '20px' }}>
        <CheckCircle2 size={48} strokeWidth={1} color="var(--accent-dark)" />
        <h2 style={{ fontFamily: 'var(--font-serif)' }}>No items in checkout</h2>
        <button onClick={() => navigate('/catalog')} className="btn-luxury">Go to Catalog</button>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="luxury-container">
        {/* Progress Bar */}
        {step !== 'success' && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '50px' }}>
            <span style={{ fontSize: '13px', fontWeight: step === 'address' ? 600 : 400, color: step === 'address' ? 'var(--text)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} /> Address
            </span>
            <ChevronRight size={14} color="var(--text-muted)" />
            <span style={{ fontSize: '13px', fontWeight: step === 'shipping' ? 600 : 400, color: step === 'shipping' ? 'var(--text)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Truck size={14} /> Shipping
            </span>
            <ChevronRight size={14} color="var(--text-muted)" />
            <span style={{ fontSize: '13px', fontWeight: step === 'payment' ? 600 : 400, color: step === 'payment' ? 'var(--text)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CreditCard size={14} /> Payment
            </span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: step === 'success' ? '1fr' : '1.5fr 1fr', gap: '50px', alignItems: 'start' }}>
          {/* LEFT: Flow forms */}
          {step !== 'success' && (
            <div className="glass-card" style={{ padding: '30px' }}>
              <AnimatePresence mode="wait">
                {step === 'address' && (
                  <motion.form
                    key="address-step"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onSubmit={handleNextStep}
                    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                  >
                    <h2 style={{ fontSize: '22px', fontFamily: 'var(--font-serif)', margin: 0 }}>Shipping Address</h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <div>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Full Name</label>
                        <input type="text" required value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} className="input-luxury" style={{ marginTop: '5px' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Email Address</label>
                        <input type="email" required value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })} className="input-luxury" style={{ marginTop: '5px' }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Street Address</label>
                      <input type="text" required value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} className="input-luxury" style={{ marginTop: '5px' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                      <div>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>City</label>
                        <input type="text" required value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="input-luxury" style={{ marginTop: '5px' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Postal Code</label>
                        <input type="text" required value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} className="input-luxury" style={{ marginTop: '5px' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Country</label>
                        <input type="text" required value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} className="input-luxury" style={{ marginTop: '5px' }} />
                      </div>
                    </div>

                    <button type="submit" className="btn-luxury" style={{ alignSelf: 'flex-end', marginTop: '20px', gap: '8px' }}>
                      <span>Continue to Shipping</span>
                      <ArrowRight size={14} />
                    </button>
                  </motion.form>
                )}

                {step === 'shipping' && (
                  <motion.form
                    key="shipping-step"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onSubmit={handleNextStep}
                    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                  >
                    <h2 style={{ fontSize: '22px', fontFamily: 'var(--font-serif)', margin: 0 }}>Shipping Options</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div
                        onClick={() => setShippingMethod('Standard')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '20px',
                          border: shippingMethod === 'Standard' ? '1px solid var(--text)' : '1px solid var(--border)',
                          borderRadius: '16px',
                          cursor: 'pointer',
                          background: shippingMethod === 'Standard' ? 'rgba(0,0,0,0.02)' : 'white'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <input type="radio" checked={shippingMethod === 'Standard'} readOnly />
                          <div>
                            <p style={{ margin: 0, fontWeight: 500 }}>Standard Botanical Delivery</p>
                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Arrives in 4-6 business days</p>
                          </div>
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>{subtotal > 150 ? 'Complimentary' : '$15'}</span>
                      </div>

                      <div
                        onClick={() => setShippingMethod('Express')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '20px',
                          border: shippingMethod === 'Express' ? '1px solid var(--text)' : '1px solid var(--border)',
                          borderRadius: '16px',
                          cursor: 'pointer',
                          background: shippingMethod === 'Express' ? 'rgba(0,0,0,0.02)' : 'white'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <input type="radio" checked={shippingMethod === 'Express'} readOnly />
                          <div>
                            <p style={{ margin: 0, fontWeight: 500 }}>Aura Express Priority</p>
                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Arrives in 1-2 business days with Gold Seal wrap</p>
                          </div>
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>$25</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                      <button type="button" onClick={() => setStep('address')} className="btn-secondary-luxury" style={{ fontSize: '11px', padding: '10px 24px' }}>
                        Back
                      </button>
                      <button type="submit" className="btn-luxury" style={{ gap: '8px' }}>
                        <span>Continue to Payment</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.form>
                )}

                {step === 'payment' && (
                  <motion.form
                    key="payment-step"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onSubmit={handlePlaceOrder}
                    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                  >
                    <h2 style={{ fontSize: '22px', fontFamily: 'var(--font-serif)', margin: 0 }}>Payment Information</h2>

                    {/* Gilded Glass Credit Card Display */}
                    <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(231, 201, 169, 0.4) 0%, rgba(246, 215, 221, 0.4) 100%)', border: '1px solid rgba(255,255,255,0.6)', padding: '24px', borderRadius: '20px', color: 'var(--primary)', position: 'relative', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 15px 30px rgba(0,0,0,0.05)', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <span style={{ fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Aura Gold Select</span>
                          <h4 style={{ fontSize: '16px', fontFamily: 'var(--font-serif)', margin: '2px 0 0 0' }}>Infinite Card</h4>
                        </div>
                        <ShieldCheck size={24} color="var(--accent-dark)" />
                      </div>
                      
                      <div style={{ fontSize: '20px', letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 'bold' }}>
                        {payment.cardNumber || '•••• •••• •••• ••••'}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                          <span style={{ fontSize: '8px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Cardholder</span>
                          <p style={{ margin: 0, fontSize: '12px', fontWeight: 600 }}>{payment.cardName.toUpperCase() || 'VALERIE DE DIOR'}</p>
                        </div>
                        <div>
                          <span style={{ fontSize: '8px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Expires</span>
                          <p style={{ margin: 0, fontSize: '12px', fontWeight: 600 }}>{payment.expiry || 'MM/YY'}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Name on Card</label>
                      <input type="text" required value={payment.cardName} onChange={(e) => setPayment({ ...payment, cardName: e.target.value })} className="input-luxury" style={{ marginTop: '5px' }} />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Card Number</label>
                      <input type="text" required value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} className="input-luxury" style={{ marginTop: '5px' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <div>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Expiration Date</label>
                        <input type="text" required placeholder="MM/YY" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} className="input-luxury" style={{ marginTop: '5px' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Security Code (CVV)</label>
                        <input type="password" maxLength={3} required value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} className="input-luxury" style={{ marginTop: '5px' }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                      <button type="button" onClick={() => setStep('shipping')} className="btn-secondary-luxury" style={{ fontSize: '11px', padding: '10px 24px' }}>
                        Back
                      </button>
                      <button type="submit" className="btn-luxury" style={{ gap: '8px' }}>
                        <span>Pay & Complete Order</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* RIGHT: Order Summary Panel */}
          {step !== 'success' && (
            <div className="glass-card" style={{ padding: '30px', position: 'sticky', top: '120px' }}>
              <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', borderBottom: '1px solid var(--border)', paddingBottom: '15px', marginBottom: '20px', margin: 0 }}>Order Summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '250px', overflowY: 'auto', marginBottom: '20px' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img src={item.product.image} alt={item.product.name} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '8px' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '13px', margin: 0, fontWeight: 500 }}>{item.product.name}</h4>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Qty: {item.quantity} | {item.selectedVariant.name}</span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>${item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border)', paddingTop: '15px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal</span>
                  <span>{currencySymbol}{subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Complimentary' : `${currencySymbol}${shippingCost}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold', color: 'var(--text)', borderTop: '1px solid var(--border)', paddingTop: '10px', marginTop: '5px' }}>
                  <span>Total</span>
                  <span>{currencySymbol}{total}</span>
                </div>
              </div>
            </div>
          )}

          {/* SUCCESS SCREEN */}
          {step === 'success' && placedOrder && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card"
              style={{ padding: '60px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', maxWidth: '600px', margin: '0 auto' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(22, 163, 74, 0.1)', color: 'var(--success)', borderRadius: '50%' }}>
                <CheckCircle2 size={48} />
              </div>

              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-dark)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={12} />
                  Ritual Complete
                </span>
                <h1 style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', margin: '8px 0' }}>Thank You For Your Order</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
                  We are preparing your package with botanical care. Your invoice is sent to <strong>{placedOrder.address.email}</strong>.
                </p>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.02)', padding: '20px', borderRadius: '16px', width: '100%', border: '1px solid var(--border)', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
                  <strong style={{ fontFamily: 'monospace' }}>{placedOrder.id}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Shipment Address:</span>
                  <strong>{placedOrder.address.street}, {placedOrder.address.city}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Total Amount:</span>
                  <strong>${placedOrder.total}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', width: '100%', marginTop: '10px' }}>
                <button onClick={() => navigate('/catalog')} className="btn-secondary-luxury" style={{ flex: 1, padding: '12px' }}>
                  Continue Shopping
                </button>
                <button onClick={() => navigate('/profile')} className="btn-luxury" style={{ flex: 1, padding: '12px' }}>
                  Track Order
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
