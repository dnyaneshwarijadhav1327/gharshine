import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { brandConfig } from '../data/config';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => cartService.getInitialCart());
  const [coupon, setCoupon] = useState(() => cartService.getInitialCoupon());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    cartService.saveCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    cartService.saveCoupon(coupon);
  }, [coupon]);

  // Recalculate or validate coupon if cart subtotal changes
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalOriginalPrice = cartItems.reduce(
    (sum, item) => sum + (item.product.originalPrice || item.product.price) * item.quantity,
    0
  );

  const productSavings = Math.max(0, totalOriginalPrice - subtotal);

  // Free shipping logic
  const freeShippingThreshold = brandConfig.freeShippingThreshold;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = cartItems.length === 0 ? 0 : isFreeShipping ? 0 : brandConfig.standardShippingFee;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // Coupon discount amount
  let couponDiscount = 0;
  if (coupon && subtotal > 0) {
    couponDiscount = Math.round((subtotal * (coupon.discountPercent || 0)) / 100);
  }

  const finalTotal = Math.max(0, subtotal - couponDiscount + shippingFee);
  const totalItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const addToCart = (product, quantity = 1, showDrawer = true) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [...prev, { product, quantity, addedAt: new Date().toISOString() }];
      }
    });

    addToast(`Added "${product.name}" to cart!`, 'success');

    if (showDrawer) {
      setIsCartOpen(true);
    }
  };

  const addCustomBundleToCart = (bundleData) => {
    const bundleProduct = {
      id: `bundle-${Date.now()}`,
      name: bundleData.name || "Custom Home Care Bundle",
      slug: "custom-bundle",
      price: bundleData.finalPrice,
      originalPrice: bundleData.totalOriginalPrice,
      discount: bundleData.discountPercent,
      thumbnail: bundleData.items[0]?.thumbnail || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80",
      shortDescription: `Custom kit containing: ${bundleData.items.map((i) => i.name).join(', ')}`,
      badge: "CUSTOM KIT",
      isCustomBundle: true,
      bundleItems: bundleData.items
    };

    setCartItems((prev) => [
      ...prev,
      { product: bundleProduct, quantity: 1, addedAt: new Date().toISOString() }
    ]);

    addToast(`Custom Bundle added to cart! (Saved ₹${bundleData.savings})`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    const itemToRemove = cartItems.find((i) => i.product.id === productId);
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    if (itemToRemove) {
      addToast(`Removed "${itemToRemove.product.name}" from cart.`, 'info');
    }
  };

  const updateQuantity = (productId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const applyCoupon = (code) => {
    const res = cartService.validateCoupon(code, subtotal);
    if (res.success) {
      setCoupon(res.data);
      addToast(`Coupon "${res.data.code}" applied! Saved ₹${res.data.discountAmount}`, 'success');
      return { success: true };
    } else {
      addToast(res.error, 'error');
      return { success: false, error: res.error };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    addToast('Coupon removed.', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemCount,
        subtotal,
        totalOriginalPrice,
        productSavings,
        shippingFee,
        isFreeShipping,
        amountNeededForFreeShipping,
        freeShippingProgress,
        coupon,
        couponDiscount,
        finalTotal,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        addCustomBundleToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
