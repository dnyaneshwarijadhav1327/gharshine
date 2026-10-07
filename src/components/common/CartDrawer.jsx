import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Truck,
  Sparkles,
  Tag,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    subtotal,
    productSavings,
    shippingFee,
    isFreeShipping,
    amountNeededForFreeShipping,
    freeShippingProgress,
    coupon,
    couponDiscount,
    finalTotal,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setTimeout(() => {
      applyCoupon(couponInput);
      setCouponLoading(false);
      setCouponInput('');
    }, 200);
  };

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-[#F8FAFA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#087F8C] flex items-center justify-center text-white">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Your Shopping Cart
              </h3>
              <p className="text-[11px] text-slate-500">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>

          <button
            onClick={closeCart}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white transition"
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="p-3.5 sm:p-4 bg-[#E8F8F8]/60 border-b border-teal-100/60">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1.5">
            <div className="flex items-center gap-1.5">
              <Truck size={15} className="text-[#087F8C]" />
              {isFreeShipping ? (
                <span className="text-emerald-700 font-bold">
                  🎉 You've unlocked FREE Express Shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#087F8C]">{formatPrice(amountNeededForFreeShipping)}</strong> more for FREE Shipping!
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500">{freeShippingProgress}%</span>
          </div>
          
          <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-teal-100">
            <div
              className="h-full bg-gradient-to-r from-[#65D5D8] to-[#087F8C] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-3xl bg-[#F4F8F7] text-[#087F8C] flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={32} />
              </div>
              <h4 className="text-base font-bold text-slate-900">Your cart is empty</h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs mx-auto">
                Explore our best-selling surface care solutions and protect your home today.
              </p>
              <div className="mt-6">
                <Link
                  to="/shop"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl text-xs sm:text-sm font-semibold transition"
                >
                  <span>Explore Bestsellers</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ) : (
            cartItems.map((item) => {
              const p = item.product;
              return (
                <div
                  key={p.id}
                  className="flex gap-3.5 p-3 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition"
                >
                  <img
                    src={p.thumbnail}
                    alt={p.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-50"
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                          {p.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(p.id)}
                          className="text-slate-300 hover:text-rose-500 p-0.5 transition"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {p.size && (
                        <span className="text-[11px] text-slate-400 block truncate mt-0.5">
                          {p.size}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1">
                      {/* Qty Selector */}
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateQuantity(p.id, -1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200 transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(p.id, 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200 transition"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {formatPrice(p.price * item.quantity)}
                        </span>
                        {p.originalPrice && p.originalPrice > p.price && (
                          <span className="text-[11px] text-slate-400 line-through block">
                            {formatPrice(p.originalPrice * item.quantity)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer: Coupon & Totals (if items exist) */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-[#F8FAFA] space-y-3.5">
            {/* Coupon Code Section */}
            {coupon ? (
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <Tag size={14} className="text-emerald-600" />
                  <span>Coupon: {coupon.code} (-₹{couponDiscount})</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-rose-600 hover:text-rose-800 text-[11px] font-bold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. SHINE15)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs uppercase text-slate-800 placeholder:normal-case placeholder:text-slate-400 focus:outline-none focus:border-[#087F8C]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={couponLoading || !couponInput.trim()}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold disabled:opacity-50 transition"
                >
                  {couponLoading ? '...' : 'Apply'}
                </button>
              </form>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
              </div>

              {productSavings > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Product Savings</span>
                  <span>- {formatPrice(productSavings)}</span>
                </div>
              )}

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount</span>
                  <span>- {formatPrice(couponDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {isFreeShipping ? (
                    <span className="text-emerald-700 font-semibold uppercase">Free</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Estimated Total</span>
                <span className="text-base text-[#087F8C]">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout Action CTA */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#087F8C] hover:bg-[#066670] text-white rounded-2xl text-sm font-bold shadow-md shadow-[#087F8C]/20 transition flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={closeCart}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition text-center"
              >
                Continue Shopping
              </button>
            </div>

            {/* Micro Trust */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-600" /> 100% Safe Checkout
              </span>
              <span>•</span>
              <span>Cash on Delivery Available</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
