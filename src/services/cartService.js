import { brandConfig } from '../data/config';

/**
 * Cart Service (Frontend LocalStorage + Mock Sync Layer)
 * 
 * TODO: Replace with real Cart API (POST /api/cart, PUT /api/cart/items, etc.)
 * when backend is integrated.
 */

const CART_STORAGE_KEY = 'gharshine_cart_items';
const COUPON_STORAGE_KEY = 'gharshine_applied_coupon';

export const cartService = {
  getInitialCart() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveCart(items) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('LocalStorage unavailable for cart', e);
    }
  },

  getInitialCoupon() {
    try {
      const stored = localStorage.getItem(COUPON_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  saveCoupon(coupon) {
    try {
      if (coupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('LocalStorage unavailable for coupon', e);
    }
  },

  // Validate and calculate coupon discount
  validateCoupon(code, subtotal) {
    const upper = code.trim().toUpperCase();
    const configCoupon = brandConfig.coupons[upper];

    if (!configCoupon) {
      return { success: false, error: 'Invalid coupon code.' };
    }

    if (subtotal < configCoupon.minOrder) {
      return {
        success: false,
        error: `Coupon valid on minimum orders of ₹${configCoupon.minOrder}.`
      };
    }

    const discountAmount = Math.round((subtotal * configCoupon.discountPercent) / 100);
    return {
      success: true,
      data: {
        code: upper,
        discountPercent: configCoupon.discountPercent,
        discountAmount,
        desc: configCoupon.desc
      }
    };
  }
};
