import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { SmoothScroll } from './components/SmoothScroll';

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

  // Hide Navbar & Footer on Admin Panel & Checkout views to focus the user
  const isMinimalView = location.pathname.startsWith('/admin') || location.pathname.startsWith('/checkout');

  return (
    <div className="app-viewport">
      {!isMinimalView && <Navbar onCartOpen={() => setCartOpen(true)} />}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

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
