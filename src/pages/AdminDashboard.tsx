import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import type { Product } from '../context/StoreContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldAlert, Trash2, Edit2, Sliders, Settings, DollarSign, Users, Award, ShoppingBag, Moon, Sun, Upload } from 'lucide-react';

// Mock chart analytics data matching premium aesthetic
const ANALYTICS_DATA = [
  { month: 'Jan', sales: 4000, conversion: 2.1 },
  { month: 'Feb', sales: 7500, conversion: 2.8 },
  { month: 'Mar', sales: 6200, conversion: 2.5 },
  { month: 'Apr', sales: 12000, conversion: 3.6 },
  { month: 'May', sales: 15400, conversion: 4.1 },
  { month: 'Jun', sales: 18900, conversion: 4.5 },
  { month: 'Jul', sales: 24500, conversion: 4.9 },
];

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    cms,
    theme,
    toggleTheme,
    adminAddProduct,
    adminUpdateProduct,
    adminDeleteProduct,
    adminUpdateCMS,
    adminUpdateOrderStatus
  } = useStore();

  // Active section state: 'analytics' | 'products' | 'orders' | 'crm' | 'cms' | 'settings'
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'crm' | 'cms' | 'settings'>('analytics');

  // Product CRUD Form States
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Omit<Product, 'id' | 'rating' | 'reviewsCount'>>({
    name: 'Gilded Clay Exfoliant',
    tagline: 'Gently polishes and cleanses with micro rose extracts',
    description: 'A gentle polishing skincare cream infused with active rose petals and mineral pink clay designed to remove dry skin flakiness.',
    price: 65,
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop',
    concern: 'Glow',
    skinType: 'All Types',
    availability: 'In Stock',
    ingredients: ['Pink Mineral Clay', 'Rose Petal Extracts', 'Shea Butter', 'Squalane'],
    variants: [
      { id: 'v_e1', name: '50ml Signature Pot', stock: 35 }
    ]
  });

  // CMS builder state
  const [cmsForm, setCmsForm] = useState({ ...cms });

  // Mock settings keys
  const [apiKeys, setApiKeys] = useState({
    smtpServer: 'smtp.sendgrid.net',
    apiKey: 'SG.AURA_BEAUTE_KEY_PRODUCTION_2026',
    shippingBase: '15.00'
  });

  // Calculate totals
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 78500; // base revenue + new orders
  const activeOrdersCount = orders.length;
  const lowStockCount = products.filter((p) => p.variants.some((v) => v.stock < 10)).length;

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      adminUpdateProduct({
        ...editingProduct,
        ...productForm,
        price: Number(productForm.price)
      });
      setEditingProduct(null);
    } else {
      adminAddProduct({
        ...productForm,
        price: Number(productForm.price)
      });
    }
    // Reset fields
    setProductForm({
      name: '',
      tagline: '',
      description: '',
      price: 0,
      category: 'Skincare',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
      concern: 'Glow',
      skinType: 'All Types',
      availability: 'In Stock',
      ingredients: [],
      variants: [{ id: `v_${Date.now()}`, name: 'Standard Size', stock: 50 }]
    });
  };

  const handleEditProductClick = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      price: p.price,
      category: p.category,
      image: p.image,
      concern: p.concern,
      skinType: p.skinType,
      availability: p.availability,
      ingredients: p.ingredients,
      variants: p.variants
    });
  };

  const handleCmsSave = (e: React.FormEvent) => {
    e.preventDefault();
    adminUpdateCMS(cmsForm);
    alert('Homepage CMS details synchronized successfully!');
  };

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Global settings stored in security cache.');
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '50px' }}>
      <div className="luxury-container responsive-sidebar-layout">
        {/* Sidebar Nav */}
        <aside className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent-dark)', fontWeight: 600 }}>SaaS Operations</span>
            <h2 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: '4px 0 0 0' }}>AURA Controls</h2>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => setActiveTab('analytics')} style={{ border: 'none', textAlign: 'left', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: activeTab === 'analytics' ? 'var(--text)' : 'var(--text-muted)', background: activeTab === 'analytics' ? 'rgba(0,0,0,0.03)' : 'transparent', fontWeight: activeTab === 'analytics' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sliders size={16} /> Analytics Hub
            </button>
            <button onClick={() => setActiveTab('products')} style={{ border: 'none', textAlign: 'left', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: activeTab === 'products' ? 'var(--text)' : 'var(--text-muted)', background: activeTab === 'products' ? 'rgba(0,0,0,0.03)' : 'transparent', fontWeight: activeTab === 'products' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShoppingBag size={16} /> Product Inventory
            </button>
            <button onClick={() => setActiveTab('orders')} style={{ border: 'none', textAlign: 'left', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: activeTab === 'orders' ? 'var(--text)' : 'var(--text-muted)', background: activeTab === 'orders' ? 'rgba(0,0,0,0.03)' : 'transparent', fontWeight: activeTab === 'orders' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sliders size={16} /> Customer Orders
            </button>
            <button onClick={() => setActiveTab('crm')} style={{ border: 'none', textAlign: 'left', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: activeTab === 'crm' ? 'var(--text)' : 'var(--text-muted)', background: activeTab === 'crm' ? 'rgba(0,0,0,0.03)' : 'transparent', fontWeight: activeTab === 'crm' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Users size={16} /> Customer CRM
            </button>
            <button onClick={() => setActiveTab('cms')} style={{ border: 'none', textAlign: 'left', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: activeTab === 'cms' ? 'var(--text)' : 'var(--text-muted)', background: activeTab === 'cms' ? 'rgba(0,0,0,0.03)' : 'transparent', fontWeight: activeTab === 'cms' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={16} /> CMS Builder
            </button>
            <button onClick={() => setActiveTab('settings')} style={{ border: 'none', textAlign: 'left', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: activeTab === 'settings' ? 'var(--text)' : 'var(--text-muted)', background: activeTab === 'settings' ? 'rgba(0,0,0,0.03)' : 'transparent', fontWeight: activeTab === 'settings' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Settings size={16} /> Configuration
            </button>
          </nav>

          <button onClick={toggleTheme} style={{ background: 'none', border: '1px solid var(--border)', padding: '10px', borderRadius: '8px', fontSize: '12px', textTransform: 'uppercase', cursor: 'pointer', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            Toggle Dark
          </button>
        </aside>

        {/* Dashboard Main Area */}
        <main className="glass-card" style={{ padding: '30px' }}>
          {activeTab === 'analytics' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: 0 }}>Analytics Summary</h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Realtime metrics update</span>
              </div>

              {/* Grid Widgets */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div style={{ border: '1px solid var(--border)', padding: '20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Gross Revenue</span>
                    <h4 style={{ fontSize: '28px', margin: '4px 0 0 0', fontWeight: 600 }}>${totalRevenue}</h4>
                  </div>
                  <DollarSign size={24} color="var(--accent-dark)" />
                </div>
                <div style={{ border: '1px solid var(--border)', padding: '20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Orders</span>
                    <h4 style={{ fontSize: '28px', margin: '4px 0 0 0', fontWeight: 600 }}>{activeOrdersCount}</h4>
                  </div>
                  <ShoppingBag size={24} color="var(--accent-dark)" />
                </div>
                <div style={{ border: '1px solid var(--border)', padding: '20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Low Stock Skus</span>
                    <h4 style={{ fontSize: '28px', margin: '4px 0 0 0', fontWeight: 600 }}>{lowStockCount}</h4>
                  </div>
                  <ShieldAlert size={24} color={lowStockCount > 0 ? 'var(--danger)' : 'var(--accent-dark)'} />
                </div>
              </div>

              {/* Area Sales chart */}
              <div style={{ height: '350px', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', background: 'rgba(255,255,255,0.2)' }}>
                <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '15px' }}>Monthly Sales Growth Curve</h4>
                <ResponsiveContainer width="100%" height="90%">
                  <AreaChart data={ANALYTICS_DATA}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent-dark)" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="var(--accent-dark)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} />
                    <YAxis stroke="var(--text-muted)" fontSize={11} />
                    <Tooltip contentStyle={{ background: 'white', borderRadius: '10px', border: '1px solid var(--border)' }} />
                    <Area type="monotone" dataKey="sales" stroke="var(--accent-dark)" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: 0 }}>Product Inventory Manager</h3>
                {editingProduct && (
                  <button onClick={() => setEditingProduct(null)} style={{ fontSize: '11px', textTransform: 'uppercase', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--danger)' }}>Cancel Edit</button>
                )}
              </div>

              {/* CRUD FORM */}
              <form onSubmit={handleProductSubmit} className="glass-card" style={{ padding: '24px', border: '1px dashed var(--accent)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h4 style={{ fontSize: '14px', fontFamily: 'var(--font-serif)', margin: 0 }}>{editingProduct ? 'Edit Formula Product' : 'Add New Cosmetic Formula'}</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                  <div>
                    <label style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Product Name</label>
                    <input type="text" required value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} className="input-luxury" style={{ marginTop: '4px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Tagline / Ingredient Highlight</label>
                    <input type="text" required value={productForm.tagline} onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })} className="input-luxury" style={{ marginTop: '4px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Base Price ($)</label>
                    <input type="number" required value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })} className="input-luxury" style={{ marginTop: '4px' }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Formula Description</label>
                  <textarea required value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} className="input-luxury" style={{ marginTop: '4px', height: '80px', resize: 'none' }} />
                </div>

                {/* Mock Drag-and-drop Image Upload */}
                <div style={{ border: '1px dashed var(--border)', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.2)' }}>
                  <Upload size={24} color="var(--accent-dark)" style={{ margin: '0 auto 8px auto' }} />
                  <p style={{ margin: 0, fontSize: '12px', fontWeight: 500 }}>Drag and Drop Formula Mockup Photo</p>
                  <p style={{ margin: 0, fontSize: '10px', color: 'var(--text-muted)' }}>Supports PNG, JPEG up to 10MB</p>
                </div>

                <button type="submit" className="btn-luxury" style={{ alignSelf: 'flex-end', padding: '12px 24px', fontSize: '11px' }}>
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </form>

              {/* PRODUCTS LIST */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '12px' }}>Formula</th>
                      <th style={{ padding: '12px' }}>Category</th>
                      <th style={{ padding: '12px' }}>Price</th>
                      <th style={{ padding: '12px' }}>Stock status</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={p.image} alt={p.name} style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '6px' }} />
                          <div>
                            <span style={{ fontWeight: 600 }}>{p.name}</span>
                            <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)' }}>{p.tagline}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px' }}>{p.category}</td>
                        <td style={{ padding: '12px' }}>${p.price}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ fontSize: '11px', color: p.availability === 'In Stock' ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>{p.availability}</span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>
                          <button onClick={() => handleEditProductClick(p)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)', marginRight: '10px' }}><Edit2 size={14} /></button>
                          <button onClick={() => adminDeleteProduct(p.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--danger)' }}><Trash2 size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: 0 }}>Customer Orders Summary</h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Click statuses to alter flow</span>
              </div>

              {orders.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No orders placed yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {orders.map((o) => (
                    <div key={o.id} style={{ border: '1px solid var(--border)', padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Order ID & Date:</span>
                          <h4 style={{ fontSize: '14px', margin: 0, fontFamily: 'monospace' }}>{o.id} ({o.date})</h4>
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginRight: '10px' }}>Status Override:</label>
                          <select
                            value={o.status}
                            onChange={(e) => adminUpdateOrderStatus(o.id, e.target.value as any)}
                            style={{ border: '1px solid var(--border)', padding: '6px', borderRadius: '8px', fontSize: '12px' }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Returned">Returned</option>
                            <option value="Refunded">Refunded</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        <strong>Customer:</strong> {o.address.fullName} ({o.address.email}) <br />
                        <strong>Destination:</strong> {o.address.street}, {o.address.city}, {o.address.postalCode} <br />
                        <strong>Formulas:</strong>
                        {o.items.map((item, idx) => (
                          <div key={idx} style={{ paddingLeft: '10px' }}>• {item.productName} ({item.variantName}) x {item.quantity}</div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '15px' }}>
                        <span style={{ fontWeight: 600 }}>Invoice Subtotal: ${o.total}</span>
                        <button onClick={() => alert(`Generated PDF Invoice for ${o.id}. Sent to print depot.`)} className="btn-secondary-luxury" style={{ padding: '6px 14px', fontSize: '11px', borderRadius: '20px' }}>
                          Print Invoice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'crm' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: 0 }}>Customer Profiles CRM</h3>

              <div style={{ border: '1px solid var(--border)', padding: '20px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '15px', marginBottom: '15px' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '15px' }}>Valerie de Dior</h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>valerie@diorlabs.com</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-dark)', border: '1px solid var(--accent)', padding: '4px 10px', borderRadius: '15px' }}>VIP Status</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <div><strong>LTV Revenue:</strong> $1,420.00</div>
                  <div><strong>Purchases Count:</strong> 6 formulas</div>
                  <div><strong>Active Coupons:</strong> GOLD, AURA20</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button onClick={() => alert('Custom 30% VIP promo code issued.')} className="btn-luxury" style={{ padding: '8px 16px', fontSize: '11px', borderRadius: '20px' }}>
                    Distribute Promo Code
                  </button>
                  <button onClick={() => alert('Opened chat window with customer support queue.')} className="btn-secondary-luxury" style={{ padding: '8px 16px', fontSize: '11px', borderRadius: '20px' }}>
                    Open Support Channel
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cms' && (
            <form onSubmit={handleCmsSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: 0 }}>CMS Landing Page Builder</h3>

              <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Hero Page Title</label>
                <input type="text" value={cmsForm.heroTitle} onChange={(e) => setCmsForm({ ...cmsForm, heroTitle: e.target.value })} className="input-luxury" style={{ marginTop: '5px' }} />
              </div>

              <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Hero Subtitle</label>
                <textarea value={cmsForm.heroSubtitle} onChange={(e) => setCmsForm({ ...cmsForm, heroSubtitle: e.target.value })} className="input-luxury" style={{ marginTop: '5px', height: '60px', resize: 'none' }} />
              </div>

              <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Brand Story Title</label>
                <input type="text" value={cmsForm.storyTitle} onChange={(e) => setCmsForm({ ...cmsForm, storyTitle: e.target.value })} className="input-luxury" style={{ marginTop: '5px' }} />
              </div>

              <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Brand Story Content</label>
                <textarea value={cmsForm.storyContent} onChange={(e) => setCmsForm({ ...cmsForm, storyContent: e.target.value })} className="input-luxury" style={{ marginTop: '5px', height: '100px', resize: 'none' }} />
              </div>

              <button type="submit" className="btn-luxury" style={{ alignSelf: 'flex-end', padding: '12px 30px' }}>
                Synchronize CMS Layout
              </button>
            </form>
          )}

          {activeTab === 'settings' && (
            <form onSubmit={handleSettingsSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: 0 }}>API & SMTP Configuration</h3>

              <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>SMTP Mail Host</label>
                <input type="text" value={apiKeys.smtpServer} onChange={(e) => setApiKeys({ ...apiKeys, smtpServer: e.target.value })} className="input-luxury" style={{ marginTop: '5px' }} />
              </div>

              <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>SMTP Client API Key</label>
                <input type="password" value={apiKeys.apiKey} onChange={(e) => setApiKeys({ ...apiKeys, apiKey: e.target.value })} className="input-luxury" style={{ marginTop: '5px' }} />
              </div>

              <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Base Shipping Rate ($)</label>
                <input type="text" value={apiKeys.shippingBase} onChange={(e) => setApiKeys({ ...apiKeys, shippingBase: e.target.value })} className="input-luxury" style={{ marginTop: '5px' }} />
              </div>

              <button type="submit" className="btn-luxury" style={{ alignSelf: 'flex-end', padding: '12px 30px' }}>
                Save Configuration
              </button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
};
