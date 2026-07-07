import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, MapPin, Ticket, LogOut, Truck, Package, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const ProfilePage: React.FC = () => {
  const { wishlist, products, orders, activeUser, logout, toggleWishlist, addToCart } = useStore();
  const navigate = useNavigate();

  // Active Menu: 'dashboard' | 'orders' | 'wishlist' | 'addresses' | 'coupons'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'wishlist' | 'addresses' | 'coupons'>('dashboard');

  const [selectedOrderTracking, setSelectedOrderTracking] = useState<any | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMoveToCart = (p: any) => {
    addToCart(p, p.variants[0]);
    toggleWishlist(p.id); // remove from wishlist
  };

  // Filter wishlisted items
  const wishlistItems = products.filter((p) => wishlist.includes(p.id));

  // Default address listings
  const savedAddresses = [
    { type: 'Primary Residence', street: '15 Avenue Montaigne', city: 'Paris', zip: '75008', country: 'France' },
    { type: 'Summer Retreat', street: 'Villa L\'Orangerie, Route des Plages', city: 'Saint-Tropez', zip: '83990', country: 'France' }
  ];

  // Default active promo codes
  const promoCoupons = [
    { code: 'GOLD', value: '20% off', desc: 'Valid on 24k Gold anti-aging line', expiry: 'Dec 31, 2026' },
    { code: 'AURA20', value: '20% off', desc: 'Welcome coupon for first-time orders', expiry: 'Ongoing' }
  ];

  // Tracking Timeline helper
  const renderTrackingTimeline = (order: any) => {
    const stages = [
      { key: 'Pending', label: 'Order Received', icon: Clock, desc: 'Aura Beautelabs is assembling your active botanical jar' },
      { key: 'Shipped', label: 'Shipped from Grasse', icon: Package, desc: 'Handed over to French priority carrier' },
      { key: 'Delivered', label: 'Out for Delivery', icon: Truck, desc: 'Arrived at destination customs depot' },
    ];

    const currentStageIdx = stages.findIndex((s) => s.key === order.status) || 0;

    return (
      <div style={{ marginTop: '20px', padding: '24px', background: 'rgba(255,255,255,0.4)', borderRadius: '16px', border: '1px solid var(--border)' }}>
        <h4 style={{ fontSize: '15px', fontFamily: 'var(--font-serif)', margin: '0 0 16px 0' }}>Shipment Dispatch Trail ({order.id})</h4>
        
        {/* Timeline Line Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isCompleted = idx <= currentStageIdx;
            
            return (
              <div key={idx} style={{ display: 'flex', gap: '15px', position: 'relative' }}>
                {idx < stages.length - 1 && (
                  <div style={{ position: 'absolute', left: '15px', top: '30px', bottom: '-20px', width: '2px', background: idx < currentStageIdx ? 'var(--accent-dark)' : 'var(--border)' }} />
                )}
                
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isCompleted ? 'var(--accent-dark)' : 'white', color: isCompleted ? 'white' : 'var(--text-muted)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                  <Icon size={14} />
                </div>

                <div>
                  <h5 style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: isCompleted ? 'var(--text)' : 'var(--text-muted)' }}>{stage.label}</h5>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tracking Map Representation */}
        <div style={{ marginTop: '24px', height: '140px', background: 'linear-gradient(135deg, #FFFDF8 0%, #EDE8FF 100%)', borderRadius: '12px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Mock delivery path line */}
          <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <path d="M 50 100 Q 200 40 350 100 T 600 60" fill="none" stroke="var(--accent-dark)" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
          
          {/* Animated vehicle dot marker */}
          <motion.div
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              background: 'var(--primary)',
              borderRadius: '50%',
              boxShadow: '0 0 10px var(--accent-dark)',
            }}
          />
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'var(--text-muted)', zIndex: 5, padding: '6px 14px', borderRadius: '20px', background: 'rgba(255,255,255,0.7)', border: '1px solid var(--border)' }}>
            Real-time Carrier Route Trail
          </span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="luxury-container" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '50px', alignItems: 'start' }}>
        {/* Sidebar Nav */}
        <aside className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', margin: 0 }}>{activeUser?.name || 'Customer Profile'}</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{activeUser?.email}</span>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => { setActiveTab('dashboard'); setSelectedOrderTracking(null); }} style={{ border: 'none', textAlign: 'left', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: activeTab === 'dashboard' ? 'var(--text)' : 'var(--text-muted)', background: activeTab === 'dashboard' ? 'rgba(0,0,0,0.03)' : 'transparent', fontWeight: activeTab === 'dashboard' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={16} /> Overview
            </button>
            <button onClick={() => { setActiveTab('orders'); setSelectedOrderTracking(null); }} style={{ border: 'none', textAlign: 'left', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: activeTab === 'orders' ? 'var(--text)' : 'var(--text-muted)', background: activeTab === 'orders' ? 'rgba(0,0,0,0.03)' : 'transparent', fontWeight: activeTab === 'orders' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShoppingBag size={16} /> Order History
            </button>
            <button onClick={() => { setActiveTab('wishlist'); setSelectedOrderTracking(null); }} style={{ border: 'none', textAlign: 'left', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: activeTab === 'wishlist' ? 'var(--text)' : 'var(--text-muted)', background: activeTab === 'wishlist' ? 'rgba(0,0,0,0.03)' : 'transparent', fontWeight: activeTab === 'wishlist' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Heart size={16} /> Saved Items ({wishlist.length})
            </button>
            <button onClick={() => { setActiveTab('addresses'); setSelectedOrderTracking(null); }} style={{ border: 'none', textAlign: 'left', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: activeTab === 'addresses' ? 'var(--text)' : 'var(--text-muted)', background: activeTab === 'addresses' ? 'rgba(0,0,0,0.03)' : 'transparent', fontWeight: activeTab === 'addresses' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={16} /> Addresses
            </button>
            <button onClick={() => { setActiveTab('coupons'); setSelectedOrderTracking(null); }} style={{ border: 'none', textAlign: 'left', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: activeTab === 'coupons' ? 'var(--text)' : 'var(--text-muted)', background: activeTab === 'coupons' ? 'rgba(0,0,0,0.03)' : 'transparent', fontWeight: activeTab === 'coupons' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Ticket size={16} /> Coupons
            </button>
          </nav>

          <button onClick={handleLogout} style={{ background: 'none', border: '1px solid var(--border)', padding: '10px', borderRadius: '8px', fontSize: '12px', textTransform: 'uppercase', cursor: 'pointer', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
            <LogOut size={14} /> Log Out
          </button>
        </aside>

        {/* Content Area */}
        <main className="glass-card" style={{ padding: '40px' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 style={{ fontSize: '22px', fontFamily: 'var(--font-serif)', margin: '0 0 20px 0' }}>Welcome, {activeUser?.name || 'AURA Patron'}</h2>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  From your luxury customer portal, you can view your past formulations, manage shipping destinations, track active postal codes, and apply coupons.
                </p>

                {/* Profile Overview Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '30px' }}>
                  <div style={{ border: '1px solid var(--border)', padding: '16px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Orders Placed</span>
                    <h4 style={{ fontSize: '24px', margin: '4px 0 0 0' }}>{orders.length}</h4>
                  </div>
                  <div style={{ border: '1px solid var(--border)', padding: '16px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Saved Items</span>
                    <h4 style={{ fontSize: '24px', margin: '4px 0 0 0' }}>{wishlist.length}</h4>
                  </div>
                  <div style={{ border: '1px solid var(--border)', padding: '16px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Store Credit Balance</span>
                    <h4 style={{ fontSize: '24px', margin: '4px 0 0 0' }}>${activeUser?.balance || 0}</h4>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div key="orders" initial={{ opacity: 0 }}>
                <h2 style={{ fontSize: '22px', fontFamily: 'var(--font-serif)', margin: '0 0 20px 0' }}>Order History</h2>
                
                {orders.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No orders found.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {orders.map((o) => (
                      <div key={o.id} style={{ border: '1px solid var(--border)', padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Order ID:</span>
                            <h4 style={{ fontSize: '14px', margin: 0, fontFamily: 'monospace' }}>{o.id}</h4>
                          </div>
                          <div>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Status:</span>
                            <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: o.status === 'Delivered' ? 'var(--success)' : 'var(--accent-dark)' }}>{o.status}</span>
                          </div>
                        </div>

                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                          {o.items.map((item: any, idx: number) => (
                            <div key={idx}>{item.productName} ({item.variantName}) x {item.quantity}</div>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '15px' }}>
                          <span style={{ fontWeight: 600 }}>Total: ${o.total}</span>
                          <button onClick={() => setSelectedOrderTracking(o)} className="btn-luxury" style={{ padding: '8px 16px', fontSize: '11px', borderRadius: '20px' }}>
                            Track Details
                          </button>
                        </div>

                        {selectedOrderTracking?.id === o.id && renderTrackingTimeline(o)}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'wishlist' && (
              <motion.div key="wishlist" initial={{ opacity: 0 }}>
                <h2 style={{ fontSize: '22px', fontFamily: 'var(--font-serif)', margin: '0 0 20px 0' }}>Saved Items</h2>
                
                {wishlistItems.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Your saved collections folder is empty.</p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                    {wishlistItems.map((p) => (
                      <div key={p.id} style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '12px', position: 'relative' }}>
                        <img src={p.image} alt={p.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
                        <h4 style={{ fontSize: '14px', fontFamily: 'var(--font-serif)', margin: '8px 0 4px 0' }}>{p.name}</h4>
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>${p.price}</span>
                        
                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                          <button onClick={() => handleMoveToCart(p)} className="btn-luxury" style={{ flex: 1, padding: '8px', fontSize: '10px', borderRadius: '15px' }}>
                            Move to Bag
                          </button>
                          <button onClick={() => toggleWishlist(p.id)} className="btn-secondary-luxury" style={{ padding: '8px', borderRadius: '15px' }}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div key="addresses" initial={{ opacity: 0 }}>
                <h2 style={{ fontSize: '22px', fontFamily: 'var(--font-serif)', margin: '0 0 20px 0' }}>Delivery Destinations</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {savedAddresses.map((addr, idx) => (
                    <div key={idx} style={{ border: '1px solid var(--border)', padding: '16px', borderRadius: '12px' }}>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-dark)', fontWeight: 600 }}>{addr.type}</span>
                      <p style={{ margin: '8px 0 0 0', fontSize: '13px' }}>{addr.street}</p>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>{addr.city}, {addr.zip}, {addr.country}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'coupons' && (
              <motion.div key="coupons" initial={{ opacity: 0 }}>
                <h2 style={{ fontSize: '22px', fontFamily: 'var(--font-serif)', margin: '0 0 20px 0' }}>Active Coupons</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  {promoCoupons.map((coupon, idx) => (
                    <div key={idx} style={{ border: '1px dashed var(--accent)', padding: '20px', borderRadius: '12px', background: 'rgba(231, 201, 169, 0.05)' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '18px', fontWeight: 'bold', color: 'var(--accent-dark)' }}>{coupon.code}</span>
                      <h4 style={{ fontSize: '14px', margin: '8px 0 4px 0' }}>{coupon.value}</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 10px 0' }}>{coupon.desc}</p>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Expires: {coupon.expiry}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
