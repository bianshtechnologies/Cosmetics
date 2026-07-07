import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Search, Heart, ShoppingBag, User, Sun, Moon, Sparkles, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onCartOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCartOpen }) => {
  const { cart, wishlist, products, theme, toggleTheme } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Scroll logic for navbar opacity/blur adjustment
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update suggestions live
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, products]);

  const handleSuggestionClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setSearchQuery('');
    setSearchOpen(false);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className={`navbar-header`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '15px 0' : '25px 0',
        transition: 'var(--transition-smooth)',
        background: scrolled ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="luxury-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left Links */}
        <nav className="responsive-navbar-nav">
          <Link to="/catalog" className="nav-link" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500, color: 'var(--text)' }}>
            Shop
          </Link>
          <Link to="/about" className="nav-link" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500, color: 'var(--text)' }}>
            Our Story
          </Link>
          <Link to="/blog" className="nav-link" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500, color: 'var(--text)' }}>
            Magazine
          </Link>
        </nav>

        {/* Brand Center */}
        <Link to="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: scrolled ? '28px' : '34px', fontWeight: 400, letterSpacing: '0.25em', transition: 'var(--transition-smooth)', color: 'var(--text)' }}>
            AURA
          </span>
          <span style={{ fontSize: '7px', letterSpacing: '0.6em', textTransform: 'uppercase', color: 'var(--accent-dark)', paddingLeft: '5px' }}>
            BEAUTÉ LABS
          </span>
        </Link>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Admin Dashboard */}
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-dark)', fontWeight: 600, border: '1px solid var(--accent)', padding: '6px 14px', borderRadius: '20px', background: 'rgba(231, 201, 169, 0.05)' }}>
            <Sparkles size={12} />
            Admin Panel
          </Link>

          {/* Search Trigger */}
          <button onClick={() => setSearchOpen(true)} className="icon-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', position: 'relative' }}>
            <Search size={20} />
          </button>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="icon-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Wishlist */}
          <Link to="/profile" className="icon-btn" style={{ color: 'var(--text)', position: 'relative', display: 'block' }}>
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="badge" style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--danger)', color: 'white', fontSize: '9px', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* User Account */}
          <Link to="/profile" className="icon-btn" style={{ color: 'var(--text)' }}>
            <User size={20} />
          </Link>

          {/* Cart Bag */}
          <button onClick={onCartOpen} className="icon-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', position: 'relative' }}>
            <ShoppingBag size={20} />
            {totalCartItems > 0 && (
              <span className="badge" style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--primary)', color: 'var(--secondary)', fontSize: '9px', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="search-overlay"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              zIndex: 2000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: '8vh',
            }}
          >
            <div style={{ width: '90%', maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: 0,
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                <X size={24} />
              </button>

              <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px' }}>
                <Search size={24} color="white" style={{ marginRight: '15px' }} />
                <input
                  type="text"
                  placeholder="Search organic cleansers, oils, lip pigment shades..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    fontSize: '20px',
                    color: 'white',
                    fontFamily: 'var(--font-sans)',
                  }}
                />
              </div>

              {/* Live suggestions */}
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="glass-card"
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      padding: '24px',
                      borderRadius: '16px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    }}
                  >
                    <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '15px' }}>Live Suggestions</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      {suggestions.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => handleSuggestionClick(p.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '8px',
                            transition: 'var(--transition-fast)',
                          }}
                          className="search-item-hover"
                        >
                          <img src={p.image} alt={p.name} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} />
                          <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: '14px', margin: 0, color: 'var(--primary)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>{p.name}</h4>
                            <p style={{ fontSize: '12px', margin: 0, color: 'var(--text-muted)' }}>{p.tagline}</p>
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>${p.price}</span>
                          <ChevronRight size={16} color="var(--text-muted)" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
