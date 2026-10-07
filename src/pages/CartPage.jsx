import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  CheckCircle2,
  Lock,
  CreditCard,
  Smartphone
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { orderService } from '../services/orderService';
import { useToast } from '../context/ToastContext';

export const CartPage = () => {
  const {
    cartItems,
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
    removeCoupon,
    clearCart
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'cod'
  const [addressData, setAddressData] = useState({
    name: 'Amit Sharma',
    phone: '9876543210',
    email: 'amit.sharma@example.com',
    street: 'Flat 402, Shanti Vihar Apartments, 100ft Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038'
  });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Shopping Cart & Checkout | GharShine";
  }, []);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsPlacingOrder(true);
    const res = await orderService.createOrder({
      items: cartItems,
      total: finalTotal,
      address: addressData,
      paymentMethod
    });

    setIsPlacingOrder(false);
    if (res.success) {
      setOrderSuccess(res);
      clearCart();
      addToast('Order placed successfully (Frontend Mock)!', 'success');
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-[70vh] bg-white py-12 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-md animate-in zoom-in">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Order Confirmed!
          </h2>
          <p className="text-sm text-slate-600">
            Thank you for choosing GharShine. Your order ID is{' '}
            <strong className="text-[#087F8C]">{orderSuccess.orderId}</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-slate-100 text-xs text-slate-500 text-left space-y-1.5">
            <p><strong>Fulfillment:</strong> Express Dispatch in 24 hours</p>
            <p><strong>Tracking:</strong> SMS & WhatsApp updates will be sent to {addressData.phone}</p>
            <p className="text-[#087F8C] font-semibold pt-1">
              {orderSuccess.message}
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Link
              to={`/track-order?orderId=${orderSuccess.orderId}`}
              className="w-full py-3.5 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl text-sm font-bold shadow-md transition text-center"
            >
              Track This Order
            </Link>

            <Link
              to="/"
              className="w-full py-3 text-xs font-semibold text-slate-500 hover:text-slate-800 transition text-center"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: 'Cart & Checkout' }]} />

        <div className="py-6 border-b border-slate-100 mb-8">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-[#F8FAFA] rounded-3xl border border-slate-100 p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-white shadow-xs text-slate-400 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Your shopping cart is empty</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore our best-selling surface protection solutions and room kits.
            </p>
            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl text-xs sm:text-sm font-semibold transition"
              >
                <span>Browse Products</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: Cart Items + Delivery Address (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Free Shipping Meter */}
              <div className="p-4 bg-[#E8F8F8]/70 rounded-2xl border border-teal-100">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Truck size={15} className="text-[#087F8C]" />
                    {isFreeShipping ? (
                      <strong className="text-emerald-700">🎉 FREE Express Shipping Unlocked!</strong>
                    ) : (
                      <span>Add <strong>{formatPrice(amountNeededForFreeShipping)}</strong> more for Free Delivery!</span>
                    )}
                  </span>
                  <span>{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#087F8C] transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {cartItems.map((item) => {
                  const p = item.product;
                  return (
                    <div
                      key={p.id}
                      className="flex gap-4 p-4 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition"
                    >
                      <img
                        src={p.thumbnail}
                        alt={p.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 border border-slate-50"
                      />

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                              {p.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(p.id)}
                              className="text-slate-300 hover:text-rose-500 p-0.5 transition"
                              title="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          {p.size && (
                            <span className="text-[11px] text-slate-400 block mt-0.5">
                              {p.size}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-50">
                          {/* Qty */}
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                            <button
                              onClick={() => updateQuantity(p.id, -1)}
                              className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-3 text-xs font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(p.id, 1)}
                              className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Line total */}
                          <div className="text-right">
                            <span className="text-sm font-bold text-slate-900">
                              {formatPrice(p.price * item.quantity)}
                            </span>
                            {p.originalPrice && (
                              <span className="text-xs text-slate-400 line-through block">
                                {formatPrice(p.originalPrice * item.quantity)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Address Form UI (Mock) */}
              <div className="p-6 rounded-3xl bg-[#F8FAFA] border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    1. Shipping & Delivery Address
                  </h3>
                  <span className="text-[11px] text-[#087F8C] font-semibold">
                    (Frontend State Only)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      value={addressData.name}
                      onChange={(e) => setAddressData({ ...addressData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">Mobile Number</label>
                    <input
                      type="text"
                      value={addressData.phone}
                      onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-500 font-semibold mb-1">Street / House Address</label>
                    <input
                      type="text"
                      value={addressData.street}
                      onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">City</label>
                    <input
                      type="text"
                      value={addressData.city}
                      onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">Pincode</label>
                    <input
                      type="text"
                      value={addressData.pincode}
                      onChange={(e) => setAddressData({ ...addressData, pincode: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector UI */}
              <div className="p-6 rounded-3xl bg-[#F8FAFA] border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    2. Payment Method
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <Lock size={12} /> 256-Bit SSL Encrypted
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3.5 rounded-2xl border text-left transition ${
                      paymentMethod === 'upi'
                        ? 'border-[#087F8C] bg-[#E8F8F8] font-bold text-[#087F8C]'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <Smartphone size={18} className="mb-1 text-[#087F8C]" />
                    <span className="text-xs block">UPI / QR Code</span>
                    <span className="text-[10px] text-slate-400 font-normal">GPay, PhonePe, Paytm</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-2xl border text-left transition ${
                      paymentMethod === 'card'
                        ? 'border-[#087F8C] bg-[#E8F8F8] font-bold text-[#087F8C]'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <CreditCard size={18} className="mb-1 text-[#087F8C]" />
                    <span className="text-xs block">Cards / NetBanking</span>
                    <span className="text-[10px] text-slate-400 font-normal">Debit, Credit, All Banks</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-2xl border text-left transition ${
                      paymentMethod === 'cod'
                        ? 'border-[#087F8C] bg-[#E8F8F8] font-bold text-[#087F8C]'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <Truck size={18} className="mb-1 text-[#087F8C]" />
                    <span className="text-xs block">Cash on Delivery</span>
                    <span className="text-[10px] text-slate-400 font-normal">Pay at your doorstep</span>
                  </button>
                </div>
              </div>

            </div>

            {/* RIGHT: Order Summary (5 cols Sticky) */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-lg space-y-4">
                <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                  Order Summary
                </h3>

                {/* Coupon Input */}
                {coupon ? (
                  <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                      <Tag size={15} className="text-emerald-600" />
                      <span>{coupon.code} (-₹{couponDiscount})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-rose-600 hover:text-rose-800 font-bold text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Coupon Code (e.g. SHINE15)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase focus:outline-none focus:border-[#087F8C]"
                    />
                    <button
                      type="submit"
                      disabled={!couponInput.trim()}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-50 transition"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {/* Line Item Totals */}
                <div className="space-y-2 text-xs sm:text-sm text-slate-600 pt-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
                  </div>

                  {productSavings > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Total Product Savings</span>
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
                        <span className="text-emerald-700 font-bold uppercase text-xs">Free</span>
                      ) : (
                        formatPrice(shippingFee)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base sm:text-lg font-black text-slate-900 pt-3 border-t border-slate-100">
                    <span>Grand Total</span>
                    <span className="text-[#087F8C]">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                  className="w-full py-4 bg-[#087F8C] hover:bg-[#066670] disabled:opacity-50 text-white rounded-2xl text-sm font-bold shadow-lg shadow-[#087F8C]/20 transition flex items-center justify-center gap-2"
                >
                  {isPlacingOrder ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>Place Order ({formatPrice(finalTotal)})</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-400 text-center leading-tight pt-1">
                  By placing order, you agree to GharShine's terms and refund policies.
                </p>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
