import React, { useState } from 'react';
import { Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={{ background: '#0F172A', color: '#F8F6F4', paddingTop: '80px', paddingBottom: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 10 }}>
      <div className="luxury-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '50px', marginBottom: '60px' }}>
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', letterSpacing: '0.2em', fontWeight: 400 }}>AURA</span>
              <p style={{ fontSize: '7px', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--accent)', marginTop: '2px' }}>BEAUTÉ LABS</p>
            </div>
            <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: '1.8' }}>
              Organic skincare formulas crafted with Apple-level precision, Dior sophistication, and active botanical ingredients. Housed in hand-blown recyclable glass.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="#" className="social-icon" style={{ color: '#F8F6F4' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="social-icon" style={{ color: '#F8F6F4' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: '24px', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Collectives</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#9CA3AF' }}>
              <li><a href="/catalog" style={{ transition: 'color 0.2s' }}>All Skincare</a></li>
              <li><a href="/catalog?category=Makeup">Luminous Lip Soufflés</a></li>
              <li><a href="/catalog?category=Fragrance">Botanical Perfumes</a></li>
              <li><a href="/catalog?concern=Anti-aging">Age Restoration</a></li>
            </ul>
          </div>

          {/* Information Column */}
          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: '24px', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Philosophy</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#9CA3AF' }}>
              <li><a href="/about">Founder\'s Story</a></li>
              <li><a href="/about#ingredients">Active Ingredients</a></li>
              <li><a href="/blog">Scientific Magazine</a></li>
              <li><a href="/admin">Developer SaaS Panel</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: '4px', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>The Aura Letter</h4>
            <p style={{ fontSize: '13px', color: '#9CA3AF' }}>Subscribe to receive early releases, skincare science essays, and private collection invites.</p>
            {subscribed ? (
              <p style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500 }}>Thank you. You have been added to the AURA directory.</p>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', paddingBottom: '6px' }}>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: '#F8F6F4',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                  }}
                />
                <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}>
                  <Mail size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px', fontSize: '12px', color: '#6B7280', gap: '15px' }}>
          <p>© {new Date().getFullYear()} AURA BEAUTÉ LABS. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Crafted for premium luxury e-commerce experience <Heart size={12} fill="var(--accent)" color="var(--accent)" />
          </p>
        </div>
      </div>
    </footer>
  );
};
