import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { SmoothScroll } from './components/SmoothScroll';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { BlogPage } from './pages/BlogPage';
import { AdminDashboard } from './pages/AdminDashboard';

import './App.css';

// Scroll to top helper on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Inner App layout to access router hooks
const AppContent = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Hide Navbar & Footer on Admin Panel & Checkout views to focus the user
  const isMinimalView = location.pathname.startsWith('/admin') || location.pathname.startsWith('/checkout');
  const showBackButton = location.pathname !== '/';

  return (
    <div className="app-viewport">
      {!isMinimalView && <Navbar onCartOpen={() => setCartOpen(true)} />}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <AnimatePresence>
        {showBackButton && (
          <motion.button
            key="back-button"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={() => navigate(-1)}
            className="floating-back-button"
            aria-label="Go Back"
          >
            <ArrowLeft size={13} strokeWidth={2.5} />
            <span>Back</span>
          </motion.button>
        )}
      </AnimatePresence>

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {!isMinimalView && <Footer />}
    </div>
  );
};

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <SmoothScroll>
          <AppContent />
        </SmoothScroll>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
