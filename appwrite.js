import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_REVIEWS } from './seedData';
import { BRAND } from './constants';

const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || '';
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'aura_sublime_db';
const PRODUCTS_COLLECTION = import.meta.env.VITE_APPWRITE_COLLECTION_PRODUCTS || 'products';
const ORDERS_COLLECTION = import.meta.env.VITE_APPWRITE_COLLECTION_ORDERS || 'orders';
const REVIEWS_COLLECTION = import.meta.env.VITE_APPWRITE_COLLECTION_REVIEWS || 'reviews';
const SUBSCRIBERS_COLLECTION = import.meta.env.VITE_APPWRITE_COLLECTION_SUBSCRIBERS || 'subscribers';
const SETTINGS_COLLECTION = import.meta.env.VITE_APPWRITE_COLLECTION_SETTINGS || 'store_settings';
const ASSETS_BUCKET = import.meta.env.VITE_APPWRITE_BUCKET_ASSETS || 'product_assets';

export const isAppwriteConfigured = Boolean(PROJECT_ID && PROJECT_ID !== 'your_appwrite_project_id');

let client = null;
let account = null;
let databases = null;
let storage = null;

if (isAppwriteConfigured) {
  try {
    client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
    account = new Account(client);
    databases = new Databases(client);
    storage = new Storage(client);
  } catch (err) {
    console.warn('Appwrite client initialization error, falling back to local store:', err);
  }
}

/* ==========================================================================
   LOCAL PERSISTENCE STORE (Seamless fallback when Appwrite env is not connected)
   ========================================================================== */

const LOCAL_STORAGE_KEYS = {
  PRODUCTS: 'aura_sublime_products_v1',
  ORDERS: 'aura_sublime_orders_v1',
  REVIEWS: 'aura_sublime_reviews_v1',
  SUBSCRIBERS: 'aura_sublime_subscribers_v1',
  SETTINGS: 'aura_sublime_settings_v1',
  USER: 'aura_sublime_session_user_v1',
};

function getLocalStore(key, defaultData) {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(item);
  } catch {
    return defaultData;
  }
}

function setLocalStore(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

/* ==========================================================================
   PRODUCTS SERVICE
   ========================================================================== */

export const productService = {
  async getAll() {
    if (isAppwriteConfigured && databases) {
      try {
        const response = await databases.listDocuments(DATABASE_ID, PRODUCTS_COLLECTION);
        if (response.documents && response.documents.length > 0) {
          return response.documents.map(doc => ({
            ...doc,
            id: doc.$id,
            sizes: typeof doc.sizes === 'string' ? JSON.parse(doc.sizes) : doc.sizes,
            topNotes: typeof doc.topNotes === 'string' ? JSON.parse(doc.topNotes) : doc.topNotes,
            heartNotes: typeof doc.heartNotes === 'string' ? JSON.parse(doc.heartNotes) : doc.heartNotes,
            baseNotes: typeof doc.baseNotes === 'string' ? JSON.parse(doc.baseNotes) : doc.baseNotes,
            images: typeof doc.images === 'string' ? JSON.parse(doc.images) : doc.images,
          }));
        }
      } catch (err) {
        console.warn('Failed to fetch from Appwrite products collection, using local seed:', err);
      }
    }
    return getLocalStore(LOCAL_STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  },

  async getBySlug(slug) {
    const all = await this.getAll();
    return all.find(p => p.slug === slug || p.id === slug) || null;
  },

  async create(productData) {
    const newProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
      slug: productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: 5.0,
      reviewCount: 0,
    };

    if (isAppwriteConfigured && databases) {
      try {
        const docPayload = {
          name: newProduct.name,
          slug: newProduct.slug,
          tagline: newProduct.tagline || '',
          description: newProduct.description,
          collection: newProduct.collection,
          category: newProduct.category || 'Unisex',
          fragranceFamily: newProduct.fragranceFamily || 'Woody Oriental',
          price: Number(newProduct.price),
          discountPrice: newProduct.discountPrice ? Number(newProduct.discountPrice) : null,
          sizes: JSON.stringify(newProduct.sizes || []),
          stock: Number(newProduct.stock || 0),
          isFeatured: Boolean(newProduct.isFeatured),
          isBestSeller: Boolean(newProduct.isBestSeller),
          isNewArrival: Boolean(newProduct.isNewArrival),
          topNotes: JSON.stringify(newProduct.topNotes || []),
          heartNotes: JSON.stringify(newProduct.heartNotes || []),
          baseNotes: JSON.stringify(newProduct.baseNotes || []),
          longevity: newProduct.longevity || '10-12 Hours',
          sillage: newProduct.sillage || 'Moderate',
          concentration: newProduct.concentration || 'Eau de Parfum',
          images: JSON.stringify(newProduct.images || []),
          rating: 5.0,
          reviewCount: 0,
        };
        const created = await databases.createDocument(DATABASE_ID, PRODUCTS_COLLECTION, ID.unique(), docPayload);
        newProduct.id = created.$id;
      } catch (err) {
        console.warn('Appwrite create error, saving locally:', err);
      }
    }

    const current = getLocalStore(LOCAL_STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    setLocalStore(LOCAL_STORAGE_KEYS.PRODUCTS, [newProduct, ...current]);
    return newProduct;
  },

  async update(id, updates) {
    if (isAppwriteConfigured && databases) {
      try {
        const cleanPayload = { ...updates };
        if (cleanPayload.sizes) cleanPayload.sizes = JSON.stringify(cleanPayload.sizes);
        if (cleanPayload.topNotes) cleanPayload.topNotes = JSON.stringify(cleanPayload.topNotes);
        if (cleanPayload.heartNotes) cleanPayload.heartNotes = JSON.stringify(cleanPayload.heartNotes);
        if (cleanPayload.baseNotes) cleanPayload.baseNotes = JSON.stringify(cleanPayload.baseNotes);
        if (cleanPayload.images) cleanPayload.images = JSON.stringify(cleanPayload.images);
        delete cleanPayload.id;
        delete cleanPayload.$id;
        delete cleanPayload.$databaseId;
        delete cleanPayload.$collectionId;
        await databases.updateDocument(DATABASE_ID, PRODUCTS_COLLECTION, id, cleanPayload);
      } catch (err) {
        console.warn('Appwrite update error:', err);
      }
    }

    const current = getLocalStore(LOCAL_STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const updated = current.map(p => (p.id === id ? { ...p, ...updates } : p));
    setLocalStore(LOCAL_STORAGE_KEYS.PRODUCTS, updated);
    return updated.find(p => p.id === id);
  },

  async delete(id) {
    if (isAppwriteConfigured && databases) {
      try {
        await databases.deleteDocument(DATABASE_ID, PRODUCTS_COLLECTION, id);
      } catch (err) {
        console.warn('Appwrite delete error:', err);
      }
    }
    const current = getLocalStore(LOCAL_STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const filtered = current.filter(p => p.id !== id);
    setLocalStore(LOCAL_STORAGE_KEYS.PRODUCTS, filtered);
    return true;
  }
};

/* ==========================================================================
   ORDERS SERVICE
   ========================================================================== */

export const orderService = {
  async getAll() {
    if (isAppwriteConfigured && databases) {
      try {
        const response = await databases.listDocuments(DATABASE_ID, ORDERS_COLLECTION);
        if (response.documents && response.documents.length > 0) {
          return response.documents.map(doc => ({
            ...doc,
            id: doc.$id,
            items: typeof doc.items === 'string' ? JSON.parse(doc.items) : doc.items,
          }));
        }
      } catch (err) {
        console.warn('Appwrite list orders error, falling back to local store:', err);
      }
    }
    return getLocalStore(LOCAL_STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  },

  async getByOrderNumber(orderNumber) {
    const all = await this.getAll();
    return all.find(o => o.orderNumber.toUpperCase() === orderNumber.toUpperCase()) || null;
  },

  async create(orderPayload) {
    const newOrder = {
      ...orderPayload,
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
      orderStatus: 'processing',
      trackingNumber: '',
    };

    if (isAppwriteConfigured && databases) {
      try {
        const docData = {
          orderNumber: newOrder.orderNumber,
          customerName: newOrder.customerName,
          customerEmail: newOrder.customerEmail,
          customerPhone: newOrder.customerPhone,
          city: newOrder.city,
          shippingAddress: newOrder.shippingAddress,
          orderNotes: newOrder.orderNotes || '',
          items: JSON.stringify(newOrder.items),
          subtotal: Number(newOrder.subtotal),
          shippingFee: Number(newOrder.shippingFee),
          discount: Number(newOrder.discount || 0),
          total: Number(newOrder.total),
          paymentMethod: newOrder.paymentMethod,
          paymentStatus: newOrder.paymentStatus || 'pending',
          orderStatus: newOrder.orderStatus,
          trackingNumber: '',
          createdAt: newOrder.createdAt,
        };
        const created = await databases.createDocument(DATABASE_ID, ORDERS_COLLECTION, ID.unique(), docData);
        newOrder.id = created.$id;
      } catch (err) {
        console.warn('Appwrite create order error, saving to local store:', err);
      }
    }

    const current = getLocalStore(LOCAL_STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    setLocalStore(LOCAL_STORAGE_KEYS.ORDERS, [newOrder, ...current]);
    return newOrder;
  },

  async updateStatus(id, newStatus, trackingNumber = null) {
    if (isAppwriteConfigured && databases) {
      try {
        const payload = { orderStatus: newStatus };
        if (trackingNumber !== null) payload.trackingNumber = trackingNumber;
        await databases.updateDocument(DATABASE_ID, ORDERS_COLLECTION, id, payload);
      } catch (err) {
        console.warn('Appwrite order status update error:', err);
      }
    }
    const current = getLocalStore(LOCAL_STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    const updated = current.map(o => {
      if (o.id === id || o.orderNumber === id) {
        return {
          ...o,
          orderStatus: newStatus,
          trackingNumber: trackingNumber !== null ? trackingNumber : o.trackingNumber,
        };
      }
      return o;
    });
    setLocalStore(LOCAL_STORAGE_KEYS.ORDERS, updated);
    return true;
  }
};

/* ==========================================================================
   REVIEWS SERVICE
   ========================================================================== */

export const reviewService = {
  async getAll() {
    return getLocalStore(LOCAL_STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
  },

  async getByProductId(productId) {
    const all = await this.getAll();
    return all.filter(r => (r.productId === productId || r.productSlug === productId) && r.status === 'approved');
  },

  async addReview(reviewData) {
    const newRev = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isVerified: true,
      status: 'approved',
    };
    const current = getLocalStore(LOCAL_STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    setLocalStore(LOCAL_STORAGE_KEYS.REVIEWS, [newRev, ...current]);
    return newRev;
  },

  async updateStatus(id, status) {
    const current = getLocalStore(LOCAL_STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    const updated = current.map(r => (r.id === id ? { ...r, status } : r));
    setLocalStore(LOCAL_STORAGE_KEYS.REVIEWS, updated);
    return true;
  },

  async delete(id) {
    const current = getLocalStore(LOCAL_STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    setLocalStore(LOCAL_STORAGE_KEYS.REVIEWS, current.filter(r => r.id !== id));
    return true;
  }
};

/* ==========================================================================
   NEWSLETTER SUBSCRIBERS SERVICE
   ========================================================================== */

export const subscriberService = {
  async getAll() {
    return getLocalStore(LOCAL_STORAGE_KEYS.SUBSCRIBERS, [
      { id: 'sub-1', email: 'vip.client@luxurymail.com', subscribedAt: '2026-10-15T10:00:00Z', source: 'footer' },
      { id: 'sub-2', email: 'parfum.collector@fragrantica.pk', subscribedAt: '2026-10-22T14:20:00Z', source: 'homepage' }
    ]);
  },

  async subscribe(email, source = 'homepage') {
    const current = await this.getAll();
    const exists = current.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: true, message: 'You are already subscribed to the Royal Circle.' };
    }
    const newSub = {
      id: `sub-${Date.now()}`,
      email: email.toLowerCase().trim(),
      subscribedAt: new Date().toISOString(),
      source,
    };
    setLocalStore(LOCAL_STORAGE_KEYS.SUBSCRIBERS, [newSub, ...current]);
    return { success: true, message: 'Welcome to the AURA SUBLIME Royal Circle.' };
  }
};

/* ==========================================================================
   SETTINGS SERVICE
   ========================================================================== */

export const settingsService = {
  async get() {
    return getLocalStore(LOCAL_STORAGE_KEYS.SETTINGS, {
      whatsappNumber: BRAND.whatsappNumber,
      deliveryFee: BRAND.defaultShippingFee,
      freeShippingThreshold: BRAND.freeShippingThreshold,
      announcementText: BRAND.announcement,
      isAnnouncementActive: true,
      supportEmail: BRAND.supportEmail,
      supportPhone: BRAND.supportPhone,
    });
  },

  async update(newSettings) {
    const current = await this.get();
    const updated = { ...current, ...newSettings };
    setLocalStore(LOCAL_STORAGE_KEYS.SETTINGS, updated);
    return updated;
  }
};

/* ==========================================================================
   AUTH SERVICE (Appwrite Auth + Fallback Demo Admin)
   ========================================================================== */

export const authService = {
  async getCurrentUser() {
    if (isAppwriteConfigured && account) {
      try {
        const user = await account.get();
        return {
          id: user.$id,
          name: user.name,
          email: user.email,
          role: user.labels?.includes('admin') ? 'admin' : 'customer',
        };
      } catch {
        return null;
      }
    }
    return getLocalStore(LOCAL_STORAGE_KEYS.USER, null);
  },

  async login(email, password) {
    if (isAppwriteConfigured && account) {
      try {
        await account.createEmailPasswordSession(email, password);
        return await this.getCurrentUser();
      } catch (err) {
        console.warn('Appwrite login failed, checking fallback credentials:', err.message);
      }
    }

    // Luxury Demo Admin & Customer Accounts
    if (email.toLowerCase() === 'admin@aurasublime.com' && password === 'AuraAdmin2026!') {
      const adminUser = {
        id: 'usr-admin-1',
        name: 'Haider Khan (Founder & Creative Director)',
        email: 'admin@aurasublime.com',
        role: 'admin',
      };
      setLocalStore(LOCAL_STORAGE_KEYS.USER, adminUser);
      return adminUser;
    }

    // Standard Customer fallback
    const customerUser = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role: 'customer',
    };
    setLocalStore(LOCAL_STORAGE_KEYS.USER, customerUser);
    return customerUser;
  },

  async register(name, email, password) {
    if (isAppwriteConfigured && account) {
      try {
        await account.create(ID.unique(), email, password, name);
        await account.createEmailPasswordSession(email, password);
        return await this.getCurrentUser();
      } catch (err) {
        console.warn('Appwrite registration failed, using local registration:', err);
      }
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'customer',
    };
    setLocalStore(LOCAL_STORAGE_KEYS.USER, newUser);
    return newUser;
  },

  async logout() {
    if (isAppwriteConfigured && account) {
      try {
        await account.deleteSession('current');
      } catch (err) {
        console.warn('Appwrite logout error:', err);
      }
    }
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    return true;
  }
};
