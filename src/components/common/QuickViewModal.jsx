import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Check, ShoppingBag, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useQuickView } from '../../context/QuickViewContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { RatingStars } from './RatingStars';
import { PriceDisplay } from './PriceDisplay';

export const QuickViewModal = () => {
  const { quickViewProduct, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const p = quickViewProduct;
  const isWishlisted = isInWishlist(p.id);

  const handleAddToCart = () => {
    addToCart(p, quantity, true);
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={closeQuickView} />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 animate-in zoom-in-95 duration-200 border border-slate-100 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition z-10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          
          {/* Image & Badges */}
          <div className="relative">
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
              <img
                src={p.thumbnail || p.images?.[0]}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>

            {p.badge && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#087F8C] text-white shadow-sm">
                {p.badge}
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            
            {/* Category / Surfaces */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#087F8C] uppercase tracking-wider bg-[#E8F8F8] px-2 py-0.5 rounded-md">
                {p.category}
              </span>
              {p.size && (
                <span className="text-xs text-slate-400">
                  {p.size}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {p.name}
            </h3>

            {/* Ratings */}
            <RatingStars rating={p.rating} reviewCount={p.reviewCount} size={16} />

            {/* Price */}
            <PriceDisplay
              price={p.price}
              originalPrice={p.originalPrice}
              discount={p.discount}
              size="lg"
              showTaxNote={true}
            />

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {p.shortDescription}
            </p>

            {/* Key Features */}
            {p.features && p.features.length > 0 && (
              <div className="space-y-1.5 pt-1">
                {p.features.slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <Check size={14} className="text-[#087F8C] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-200 transition text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-200 transition text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-[#087F8C]/20 transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => toggleWishlist(p)}
                  className={`p-3 rounded-xl border transition ${
                    isWishlisted
                      ? 'border-rose-200 bg-rose-50 text-rose-500'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={18} className={isWishlisted ? 'fill-rose-500' : ''} />
                </button>
              </div>

              <Link
                to={`/product/${p.slug}`}
                onClick={closeQuickView}
                className="w-full py-2.5 text-xs font-semibold text-[#087F8C] hover:underline transition flex items-center justify-center gap-1.5"
              >
                <span>View Full Product Details & How To Use</span>
                <ArrowRight size={13} />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
