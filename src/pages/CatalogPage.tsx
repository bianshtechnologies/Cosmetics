import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import type { Product, ProductVariant } from '../context/StoreContext';
import { Heart, ShoppingBag, Eye, SlidersHorizontal, Search, Grid, List, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const CatalogPage: React.FC = () => {
  const { products, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const navigate = useNavigate();

  // Search & filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedConcern, setSelectedConcern] = useState<string>('All');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [sortOption, setSortOption] = useState<string>('featured');
  
  // Layout states
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(true);

  // Quick View states
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  // Run filters
  useEffect(() => {
    let result = products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchConcern = selectedConcern === 'All' || p.concern === selectedConcern;
      const matchSkinType = selectedSkinType === 'All' || p.skinType === selectedSkinType || p.skinType === 'All Types';
      const matchPrice = p.price <= maxPrice;

      return matchSearch && matchCategory && matchConcern && matchSkinType && matchPrice;
    });

    // Sorting
    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, selectedConcern, selectedSkinType, maxPrice, sortOption]);

  const handleOpenQuickView = (p: Product) => {
    setQuickViewProduct(p);
    setSelectedVariant(p.variants[0]);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
    setSelectedVariant(null);
  };

  const handleQuickAdd = (p: Product) => {
    addToCart(p, p.variants[0]);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedConcern('All');
    setSelectedSkinType('All');
    setMaxPrice(300);
    setSortOption('featured');
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="luxury-container">
        {/* Editorial Heading */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--accent-dark)', fontWeight: 600 }}>Pure Formula Catalog</span>
          <h1 style={{ fontSize: 'calc(2rem + 1.5vw)', fontFamily: 'var(--font-serif)', margin: '15px 0' }}>The Collections</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '14px' }}>
            Browse organic cosmetics formulated in small batches. Use the custom filters to match skin concerns or active botanical ingredients.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', background: 'rgba(255,255,255,0.4)', padding: '16px 24px', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--text)', background: filtersOpen ? 'var(--text)' : 'transparent', color: filtersOpen ? 'var(--secondary)' : 'var(--text)', padding: '10px 18px', borderRadius: '25px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'var(--transition-fast)' }}
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
            </button>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px' }} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ border: '1px solid var(--border)', borderRadius: '20px', padding: '10px 16px 10px 38px', outline: 'none', fontSize: '13px', background: 'rgba(255,255,255,0.7)', width: '220px', transition: 'width 0.3s' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sort by</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                style={{ border: '1px solid var(--border)', background: 'white', padding: '8px 12px', borderRadius: '10px', fontSize: '13px', outline: 'none' }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
              <button onClick={() => setViewMode('grid')} style={{ background: viewMode === 'grid' ? 'rgba(0,0,0,0.05)' : 'white', border: 'none', padding: '8px 12px', cursor: 'pointer', color: 'var(--text)' }}>
                <Grid size={16} />
              </button>
              <button onClick={() => setViewMode('list')} style={{ background: viewMode === 'list' ? 'rgba(0,0,0,0.05)' : 'white', border: 'none', padding: '8px 12px', cursor: 'pointer', color: 'var(--text)' }}>
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Body Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: filtersOpen ? '280px 1fr' : '1fr', gap: '40px', transition: 'grid-template-columns 0.3s' }}>
          {/* Sidebar Filters */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
              >
                {/* Category filter */}
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
                  <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '12px' }}>Categories</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {['All', 'Skincare', 'Makeup', 'Fragrance'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '13px', cursor: 'pointer', color: selectedCategory === cat ? 'var(--text)' : 'var(--text-muted)', fontWeight: selectedCategory === cat ? 600 : 400, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                      >
                        <span>{cat}</span>
                        {selectedCategory === cat && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skin Concern filter */}
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
                  <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '12px' }}>Skin Concern</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {['All', 'Hydration', 'Glow', 'Anti-aging', 'Sensitiveness'].map((con) => (
                      <button
                        key={con}
                        onClick={() => setSelectedConcern(con)}
                        style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '13px', cursor: 'pointer', color: selectedConcern === con ? 'var(--text)' : 'var(--text-muted)', fontWeight: selectedConcern === con ? 600 : 400, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                      >
                        <span>{con}</span>
                        {selectedConcern === con && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skin Type Filter */}
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
                  <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '12px' }}>Skin Type</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {['All', 'Dry', 'Oily', 'Sensitive', 'Normal'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedSkinType(type)}
                        style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '13px', cursor: 'pointer', color: selectedSkinType === type ? 'var(--text)' : 'var(--text-muted)', fontWeight: selectedSkinType === type ? 600 : 400, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                      >
                        <span>{type}</span>
                        {selectedSkinType === type && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Slider */}
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Max Price</h3>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>${maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="300"
                    step="5"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--primary)' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <span>$30</span>
                    <span>$300</span>
                  </div>
                </div>

                {/* Reset button */}
                <button onClick={resetFilters} className="btn-secondary-luxury" style={{ padding: '10px', fontSize: '11px' }}>
                  Clear Filters
                </button>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product Listing */}
          <div>
            {filteredProducts.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', gap: '15px' }}>
                <SlidersHorizontal size={40} color="var(--text-muted)" strokeWidth={1} />
                <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>No products match your active selection filters.</p>
                <button onClick={resetFilters} className="btn-luxury" style={{ padding: '10px 24px' }}>Reset Options</button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr',
                  gap: '30px',
                }}
              >
                {filteredProducts.map((p) => {
                  const inWishlist = isInWishlist(p.id);

                  if (viewMode === 'grid') {
                    return (
                      <div key={p.id} className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                        {/* Heart Wishlist overlay */}
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className={`wishlist-heart-btn ${inWishlist ? 'active' : ''}`}
                          style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 5, background: 'white', borderRadius: '50%', padding: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                        >
                          <Heart size={14} />
                        </button>

                        <div onClick={() => navigate(`/product/${p.id}`)} className="zoom-image-container" style={{ height: '300px', marginBottom: '16px', cursor: 'pointer' }}>
                          <img src={p.image} alt={p.name} className="zoom-image" />
                          {p.availability === 'Low Stock' && (
                            <span style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'var(--rose)', border: '1px solid var(--danger)', color: 'var(--danger)', fontSize: '8px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '10px', textTransform: 'uppercase' }}>
                              Low Stock
                            </span>
                          )}
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                              <h3 onClick={() => navigate(`/product/${p.id}`)} style={{ fontSize: '16px', margin: 0, fontFamily: 'var(--font-serif)', cursor: 'pointer' }}>{p.name}</h3>
                              <span style={{ fontSize: '14px', fontWeight: 600 }}>${p.price}</span>
                            </div>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>{p.tagline}</p>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                            <button onClick={() => handleOpenQuickView(p)} className="btn-secondary-luxury" style={{ flex: 1, padding: '10px', fontSize: '11px', borderRadius: '20px' }}>
                              <Eye size={12} style={{ marginRight: '4px' }} /> Quick View
                            </button>
                            <button onClick={() => handleQuickAdd(p)} className="btn-luxury" style={{ flex: 1, padding: '10px', fontSize: '11px', borderRadius: '20px' }}>
                              <ShoppingBag size={12} style={{ marginRight: '4px' }} /> Add
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    /* LIST VIEW */
                    return (
                      <div key={p.id} className="glass-card" style={{ padding: '20px', display: 'flex', gap: '24px', alignItems: 'center', position: 'relative' }}>
                        <img src={p.image} alt={p.name} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '12px', cursor: 'pointer' }} onClick={() => navigate(`/product/${p.id}`)} />
                        
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 onClick={() => navigate(`/product/${p.id}`)} style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: 0, cursor: 'pointer' }}>{p.name}</h3>
                            <span style={{ fontSize: '18px', fontWeight: 600 }}>${p.price}</span>
                          </div>
                          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 12px 0' }}>{p.tagline}</p>
                          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 15px 0' }}>Category: <strong>{p.category}</strong> | Concern: <strong>{p.concern}</strong> | Skin Type: <strong>{p.skinType}</strong></p>
                          
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <button onClick={() => handleQuickAdd(p)} className="btn-luxury" style={{ padding: '10px 24px', fontSize: '11px', borderRadius: '20px' }}>
                              Add To Bag
                            </button>
                            <button onClick={() => handleOpenQuickView(p)} className="btn-secondary-luxury" style={{ padding: '10px 24px', fontSize: '11px', borderRadius: '20px' }}>
                              Quick View
                            </button>
                            <button onClick={() => toggleWishlist(p.id)} className={`wishlist-heart-btn ${inWishlist ? 'active' : ''}`} style={{ border: '1px solid var(--border)', borderRadius: '50%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Heart size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {quickViewProduct && selectedVariant && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseQuickView}
              style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'black', zIndex: 3000 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card"
              style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '800px', zIndex: 3001, padding: '30px', background: 'var(--secondary)', overflow: 'hidden' }}
            >
              <button onClick={handleCloseQuickView} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}>
                <X size={20} />
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                <img src={quickViewProduct.image} alt={quickViewProduct.name} style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '16px' }} />
                
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-dark)', fontWeight: 600 }}>{quickViewProduct.category}</span>
                    <h2 style={{ fontSize: '26px', fontFamily: 'var(--font-serif)', margin: '5px 0' }}>{quickViewProduct.name}</h2>
                    <span style={{ fontSize: '20px', fontWeight: 600 }}>${quickViewProduct.price}</span>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px', lineHeight: '1.6' }}>{quickViewProduct.description}</p>
                    
                    {/* Variant Selector */}
                    {quickViewProduct.variants.length > 1 && (
                      <div style={{ marginTop: '20px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Select Volume/Color:</span>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                          {quickViewProduct.variants.map((v) => (
                            <button
                              key={v.id}
                              onClick={() => setSelectedVariant(v)}
                              style={{
                                border: selectedVariant.id === v.id ? '1px solid var(--text)' : '1px solid var(--border)',
                                background: selectedVariant.id === v.id ? 'var(--text)' : 'white',
                                color: selectedVariant.id === v.id ? 'var(--secondary)' : 'var(--text)',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                cursor: 'pointer'
                              }}
                            >
                              {v.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <button
                      onClick={() => {
                        addToCart(quickViewProduct, selectedVariant);
                        handleCloseQuickView();
                      }}
                      className="btn-luxury"
                      style={{ flex: 1 }}
                    >
                      Add To Shopping Bag
                    </button>
                    <button
                      onClick={() => {
                        handleCloseQuickView();
                        navigate(`/product/${quickViewProduct.id}`);
                      }}
                      className="btn-secondary-luxury"
                      style={{ flex: 1 }}
                    >
                      Detail Page
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
