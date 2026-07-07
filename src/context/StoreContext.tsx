import React, { createContext, useContext, useState, useEffect } from 'react';

// Product Type definition
export interface ProductVariant {
  id: string;
  name: string;
  colorCode?: string; // for color swatches
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: 'Skincare' | 'Makeup' | 'Fragrance' | 'Body';
  image: string;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  ingredients: string[];
  concern: 'Anti-aging' | 'Hydration' | 'Blemishes' | 'Glow' | 'Sensitiveness';
  skinType: 'All Types' | 'Dry' | 'Oily' | 'Sensitive' | 'Normal';
  availability: 'In Stock' | 'Out of Stock' | 'Low Stock';
  variants: ProductVariant[];
  howToUse?: string;
  benefits?: string[];
}

export interface CartItem {
  id: string; // combination of product ID and variant ID
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productId: string;
    productName: string;
    variantName: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Returned' | 'Refunded';
  address: {
    fullName: string;
    email: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
}

export interface CMSConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroCTA: string;
  storyTitle: string;
  storyContent: string;
  promoBanner: string;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[]; // array of product IDs
  orders: Order[];
  cms: CMSConfig;
  activeUser: any | null;
  blogs: BlogArticle[];
  currencySymbol: string;
  theme: 'light' | 'dark';
  
  // Actions
  addToCart: (product: Product, variant: ProductVariant, qty?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQty: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  placeOrder: (shippingAddress: Order['address'], shippingMethod: string) => Order;
  
  // Admin Operations
  adminAddProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => void;
  adminUpdateProduct: (product: Product) => void;
  adminDeleteProduct: (productId: string) => void;
  adminUpdateCMS: (config: CMSConfig) => void;
  adminUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // Auth Operations
  login: (email: string) => boolean;
  logout: () => void;
  toggleTheme: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Initial luxury skincare product suite
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Luminous Hydration Serum',
    tagline: 'Infused with Damask Rose oil & multi-weight Hyaluronic Acid.',
    description: 'A luxurious fluid serum that melts instantly into the skin. Hand-extracted Damask rose petals provide deep restorative benefits, while a proprietary triple-molecular hyaluronic compound locks moisture for a plump, radiant, dewy finish.',
    price: 125,
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 142,
    isNew: true,
    isBestSeller: true,
    concern: 'Hydration',
    skinType: 'All Types',
    availability: 'In Stock',
    ingredients: ['Damask Rose Hydrosol', 'Triple Hyaluronic Acid', 'Niacinamide (5%)', 'Provitamin B5', 'White Tea Extract'],
    variants: [
      { id: 'v1_1', name: '30ml Essential', stock: 50 },
      { id: 'v1_2', name: '50ml Deluxe', stock: 25 }
    ],
    howToUse: 'After cleansing, apply 3–4 drops onto the face and neck. Gently press with warm palms until fully absorbed. Use morning and night.',
    benefits: ['Plumps fine lines immediately', 'Locks moisture for 72 hours', 'Revitalizes tired and dull complexion', 'Soothes redness and irritation']
  },
  {
    id: 'p2',
    name: 'Restorative Botanical Cleanser',
    tagline: 'Mandarin rind, Rosemary leaf, and organic Cedarwood infusion.',
    description: 'A mild gel-to-foam botanical cleanser designed for daily purification. Gently washes away surface impurities, sunscreen, and light makeup without stripping vital lipids or altering the skin\'s natural protective barrier.',
    price: 68,
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 98,
    isBestSeller: true,
    concern: 'Glow',
    skinType: 'Normal',
    availability: 'In Stock',
    ingredients: ['Rosemary Leaf Extract', 'Mandarin Rind Oil', 'Cedarwood Bark Oil', 'Chamomile Extract', 'Coconut-derived Surfactants'],
    variants: [
      { id: 'v2_1', name: '100ml Glass Jar', stock: 40 },
      { id: 'v2_2', name: '200ml Refill Bottle', stock: 15 }
    ],
    howToUse: 'Dispense half a teaspoon onto damp hands and massage over face and neck. Rinse thoroughly with lukewarm water.',
    benefits: ['Deeply purifies without dryness', 'Provides botanical antioxidant support', 'Refreshing citrus-herbal sensory profile', 'Soothes inflamed or dry patches']
  },
  {
    id: 'p3',
    name: 'Or Blanc Anti-Aging Elixir',
    tagline: 'Pure 24k gold flakes suspended in rich Kalahari Melon seed oil.',
    description: 'The pinnacle of cellular longevity. This dry facial treatment oil contains micro-suspended 24k gold leaf particles and highly active plant squalane. Deeply penetrates to rebuild elasticity, combat hyperpigmentation, and impart a subtle gilded glow.',
    price: 240,
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop',
    rating: 5.0,
    reviewsCount: 76,
    isNew: true,
    concern: 'Anti-aging',
    skinType: 'Dry',
    availability: 'Low Stock',
    ingredients: ['24k Colloidal Gold Leaf', 'Kalahari Melon Seed Oil', 'Olive Squalane', 'Rosehip Fruit Seed Oil', 'Vitamin E (Tocopherol)'],
    variants: [
      { id: 'v3_1', name: '15ml Collector Vial', stock: 8 },
      { id: 'v3_2', name: '30ml Signature Bottle', stock: 5 }
    ],
    howToUse: 'Massage 2–3 drops onto face as the final step of your evening ritual, or mix directly into your moisturizer for a luminous boost.',
    benefits: ['Boosts collagen synthesis', 'Drastically improves skin elasticity', 'Reduces dark spots and fine lines', 'Delivers rich Omega-6 fatty acids']
  },
  {
    id: 'p4',
    name: 'Ceramide Milky Barrier Cream',
    tagline: 'High-concentration Ceramide NP with organic Oat Kernel lipids.',
    description: 'An ultra-soothing, rich moisturizing barrier cream designed for compromised or sensitive skin. Mimics natural epidermal lipids to shield the skin from urban pollution, cold weather dryness, and acidic treatments.',
    price: 95,
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    reviewsCount: 215,
    isBestSeller: true,
    concern: 'Sensitiveness',
    skinType: 'Sensitive',
    availability: 'In Stock',
    ingredients: ['Ceramide NP', 'Ceramide AP', 'Oat Kernel Lipids', 'Centella Asiatica (Cica) extract', 'Shea Butter', 'Squalane'],
    variants: [
      { id: 'v4_1', name: '50ml Glass Pot', stock: 65 }
    ],
    howToUse: 'Apply a dime-sized amount onto clean, dry skin. Press and smooth evenly. Best used morning and evening after hydrating serums.',
    benefits: ['Repairs skin moisture barrier in 24 hours', 'Calms itchiness and flakiness', 'Deeply nourishing yet non-comedogenic', 'Protects against environmental aggressors']
  },
  {
    id: 'p5',
    name: 'Aura Velvet Lip Soufflé',
    tagline: 'Air-whipped matte pigment with whipped Shea butter.',
    description: 'A revolutionary matte liquid lipstick with a weightless, soufflé-like texture. Glides on smoothly to deliver high-intensity French rose pigments that hold for up to 12 hours without drying the lips.',
    price: 42,
    category: 'Makeup',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 310,
    isBestSeller: true,
    concern: 'Glow',
    skinType: 'All Types',
    availability: 'In Stock',
    ingredients: ['Shea Butter Extract', 'Wild Mango Kernel Butter', 'Camellia Seed Oil', 'Vitamin E', 'Organic Lip Pigments'],
    variants: [
      { id: 'v5_1', name: 'Nude Rose', colorCode: '#E4A3A5', stock: 45 },
      { id: 'v5_2', name: 'Pomegranate Dior', colorCode: '#B23A48', stock: 30 },
      { id: 'v5_3', name: 'Satin Peach', colorCode: '#E59F89', stock: 20 }
    ],
    howToUse: 'Apply directly onto the lips from the center outwards. Layer twice for intense editorial pigment payoff.',
    benefits: ['Weightless air-whipped formula', 'Velvety matte finish with zero cracking', 'Hydrates with organic mango seed lipids', 'Long-wear smudge-resistant color']
  },
  {
    id: 'p6',
    name: 'Elysian Meadow Eau de Parfum',
    tagline: 'Wild jasmine, Bergamot, and warm Cedarwood notes.',
    description: 'A beautiful botanical perfume that evokes a sun-drenched walk through wildflowers. Top notes of Italian bergamot melt into a heart of absolute wild jasmine and fresh grass, grounded by organic Himalayan cedarwood.',
    price: 185,
    category: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 54,
    isNew: true,
    concern: 'Glow',
    skinType: 'All Types',
    availability: 'In Stock',
    ingredients: ['Organic Alcohol Denat.', 'Bergamot Fruit Oil', 'Jasmine Flower Extract', 'Cedarwood Bark Oil', 'Patchouli Oil'],
    variants: [
      { id: 'v6_1', name: '50ml Flacon', stock: 12 }
    ],
    howToUse: 'Mist onto clean skin at pulse points—neck, wrists, and behind ears. Do not rub, allow the fragrance to dry naturally.',
    benefits: ['Exquisite long-lasting scent profile', 'Formulated without synthetic phthalates', 'Housed in custom hand-blown glass', 'Elegant, gender-neutral editorial fragrance']
  }
];

const DEFAULT_BLOGS: BlogArticle[] = [
  {
    id: 'b1',
    title: 'The Art of Layering Skincare for Maximum Active Delivery',
    excerpt: 'Understanding viscosity, pH thresholds, and active combinations to build an efficient daily beauty ritual.',
    content: 'Building an effective skincare routine is less about the number of products you own and more about how they interact. As a rule of thumb, always apply products from thinnest to thickest consistency. Water-based serums (such as hyaluronic acids or vitamin C) should touch clean skin first, followed by heavier botanical oils, and finally, rich barrier creams. Mixing active ingredients like retinol and AHAs can lead to barrier damage, so we recommend dedicating Vitamin C to morning defense and Retinoids to nighttime cell restoration...',
    category: 'Rituals',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
    date: 'July 2, 2026',
    readTime: '5 min read',
    author: 'Aura Beauty Labs'
  },
  {
    id: 'b2',
    title: 'Why Botanical Lipids Outperform Synthetic Silicone Barriers',
    excerpt: 'An investigation into Kalahari Melon seed oil, Olive Squalane, and Ceramide lipid integration.',
    content: 'While dimethicones and petroleum bases offer immediate cosmetic smoothing, they sit passively on top of the skin, forming an artificial occlusion. Organic botanical oils like Kalahari Melon Seed oil and Squalane contain natural fatty acids and phytosterols that actually integrate with the epidermal lipid matrix. This not only traps moisture but actively repairs lipid deficiencies, calming inflammation and enhancing cellular bounce over time...',
    category: 'Ingredients',
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600&auto=format&fit=crop',
    date: 'June 28, 2026',
    readTime: '8 min read',
    author: 'Dr. Helen Vance'
  }
];

const DEFAULT_CMS: CMSConfig = {
  heroTitle: 'Luminous Beauty, Restructured.',
  heroSubtitle: 'Discover high-fidelity organic skincare formulas designed with Apple-level precision, Dior sophistication, and active botanical ingredients.',
  heroCTA: 'Explore the Collection',
  storyTitle: 'Crafting Modern Longevity',
  storyContent: 'We believe cosmetics should be clean, luxury statements. Each AURA formula is engineered in small batches in France, combining clinically-proven ceramides and colloidal gold with wild-harvested botanicals. Our bottles are hand-blown from recycled glass, bringing sustainable elegance directly to your vanity.',
  promoBanner: 'Complimentary 24k Gold Elixir sample with all orders over $150.'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load data from localStorage or fallback
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('aura_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('aura_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('aura_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('aura_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [cms, setCms] = useState<CMSConfig>(() => {
    const saved = localStorage.getItem('aura_cms');
    return saved ? JSON.parse(saved) : DEFAULT_CMS;
  });

  const [activeUser, setActiveUser] = useState<any>(() => {
    const saved = localStorage.getItem('aura_user');
    return saved ? JSON.parse(saved) : { email: 'guest@aurabeauty.com', name: 'Valerie de Dior', balance: 500 };
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('aura_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const blogs = DEFAULT_BLOGS;
  const currencySymbol = '$';

  // Persist states
  useEffect(() => {
    localStorage.setItem('aura_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aura_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('aura_cms', JSON.stringify(cms));
  }, [cms]);

  useEffect(() => {
    if (activeUser) {
      localStorage.setItem('aura_user', JSON.stringify(activeUser));
    } else {
      localStorage.removeItem('aura_user');
    }
  }, [activeUser]);

  useEffect(() => {
    localStorage.setItem('aura_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Actions
  const addToCart = (product: Product, variant: ProductVariant, qty: number = 1) => {
    setCart((prev) => {
      const cartItemId = `${product.id}_${variant.id}`;
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { id: cartItemId, product, selectedVariant: variant, quantity: qty }];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQty = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const placeOrder = (shippingAddress: Order['address'], shippingMethod: string) => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = shippingMethod === 'Express' ? 25 : subtotal > 150 ? 0 : 15;
    const total = subtotal + shipping;

    const newOrder: Order = {
      id: `AUR-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        variantName: item.selectedVariant.name,
        price: item.product.price,
        quantity: item.quantity
      })),
      subtotal,
      shipping,
      total,
      status: 'Pending',
      address: shippingAddress
    };

    setOrders((prev) => [newOrder, ...prev]);
    
    // Deduct stock
    setProducts((prevProducts) => {
      return prevProducts.map((p) => {
        const orderItemsForP = cart.filter((item) => item.product.id === p.id);
        if (orderItemsForP.length === 0) return p;

        const updatedVariants = p.variants.map((v) => {
          const ordered = orderItemsForP.find((item) => item.selectedVariant.id === v.id);
          if (ordered) {
            const nextStock = Math.max(0, v.stock - ordered.quantity);
            return { ...v, stock: nextStock };
          }
          return v;
        });

        // Determine stock label
        const totalStock = updatedVariants.reduce((sum, v) => sum + v.stock, 0);
        let availability: Product['availability'] = 'Out of Stock';
        if (totalStock > 10) availability = 'In Stock';
        else if (totalStock > 0) availability = 'Low Stock';

        return { ...p, variants: updatedVariants, availability };
      });
    });

    clearCart();
    return newOrder;
  };

  // Admin Methods
  const adminAddProduct = (newP: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => {
    const newProduct: Product = {
      ...newP,
      id: `p${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const adminUpdateProduct = (updatedP: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedP.id ? updatedP : p)));
  };

  const adminDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const adminUpdateCMS = (newCMS: CMSConfig) => {
    setCms(newCMS);
  };

  const adminUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const login = (email: string) => {
    if (!email) return false;
    setActiveUser({
      email,
      name: email.split('@')[0].toUpperCase(),
      balance: 1000
    });
    return true;
  };

  const logout = () => {
    setActiveUser(null);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        cms,
        activeUser,
        blogs,
        currencySymbol,
        theme,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        adminAddProduct,
        adminUpdateProduct,
        adminDeleteProduct,
        adminUpdateCMS,
        adminUpdateOrderStatus,
        login,
        logout,
        toggleTheme
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
