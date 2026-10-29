import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRAND } from '../config/constants';
import { useToast } from './ToastContext';

const CartContext = createContext();

const CART_STORAGE_KEY = 'aura_sublime_cart_v1';
const COUPONS = {
  'AURA10': { type: 'percent', value: 10, description: '10% Off Royal Privilege' },
  'ROYALTY': { type: 'fixed', value: 1000, description: 'Rs. 1,000 Off Exclusive Gift' },
  'WELCOME': { type: 'percent', value: 15, description: '15% Off First Fragrance' }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to sync cart to localStorage:', err);
    }
  }, [items]);

  const addToCart = (product, selectedSize = '100ml', quantity = 1) => {
    // Determine price for the selected size
    const sizeConfig = product.sizes?.find(s => s.size === selectedSize);
    const itemPrice = sizeConfig ? sizeConfig.price : (product.discountPrice || product.price);
    const itemImage = product.images?.[0] || '';

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => item.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            slug: product.slug,
            name: product.name,
            selectedSize,
            price: itemPrice,
            image: itemImage,
            collection: product.collection,
            quantity,
          }
        ];
      }
    });

    showToast(`Added ${quantity}x ${product.name} (${selectedSize}) to your bag.`, 'success');
  };

  const removeFromCart = (id, selectedSize) => {
    setItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === selectedSize)));
    showToast('Item removed from shopping bag.', 'info');
  };

  const updateQuantity = (id, selectedSize, delta) => {
    setItems(prev => {
      return prev.map(item => {
        if (item.id === id && item.selectedSize === selectedSize) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const applyCoupon = (code) => {
    setCouponError('');
    const clean = code.trim().toUpperCase();
    if (!clean) return false;

    if (COUPONS[clean]) {
      setAppliedCoupon({ code: clean, ...COUPONS[clean] });
      showToast(`Privilege code "${clean}" applied successfully!`, 'success');
      return true;
    } else {
      setCouponError('Invalid or expired privilege voucher.');
      showToast('Invalid or expired voucher code.', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
    showToast('Voucher code removed.', 'info');
  };

  // Calculations
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Free delivery threshold
  const shippingFee = subtotal >= BRAND.freeShippingThreshold || subtotal === 0 ? 0 : BRAND.defaultShippingFee;
  
  // Calculate discount
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'fixed') {
      discount = Math.min(appliedCoupon.value, subtotal);
    }
  }

  const total = Math.max(0, subtotal - discount + shippingFee);
  const amountNeededForFreeShipping = Math.max(0, BRAND.freeShippingThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemCount,
        subtotal,
        shippingFee,
        discount,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        couponError,
        amountNeededForFreeShipping,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
