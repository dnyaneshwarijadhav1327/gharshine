import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Check, ShieldCheck, Zap } from 'lucide-react';
import { RatingStars } from '../common/RatingStars';
import { PriceDisplay } from '../common/PriceDisplay';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useQuickView } from '../../context/QuickViewContext';

export const ProductCard = ({ product, className = "" }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openQuickView } = useQuickView();
  const [isAdding, setIsAdding] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1, true);
    setTimeout(() => setIsAdding(false), 900);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className={`group relative bg-white rounded-3xl border border-slate-100 p-3 sm:p-4.5 transition-all duration-300 hover:border-[#087F8C]/30 hover:shadow-2xl hover:shadow-[#087F8C]/10 flex flex-col justify-between card-3d-hover ${className}`}
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-[#F8FCFC] to-[#F1F7F7] mb-3.5 flex items-center justify-center">
        
        {/* Main Product Image with Zoom */}
        <Link to={`/product/${product.slug}`} className="w-full h-full block">
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white shadow-md flex items-center gap-1">
              <Zap size={10} className="text-[#65D5D8] fill-current" />
              <span>{product.badge}</span>
            </span>
          )}
          {product.isCombo && (
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-[#087F8C] to-[#0AA1B2] text-white shadow-xs">
              Complete Kit
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          aria-label="Add to wishlist"
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 z-10 cursor-pointer ${
            isWishlisted
              ? 'bg-white text-rose-500 shadow-md scale-110'
              : 'bg-white/90 backdrop-blur-md text-slate-500 hover:text-rose-500 hover:bg-white shadow-xs'
          }`}
          title="Save to wishlist"
        >
          <Heart size={16} className={isWishlisted ? 'fill-rose-500 text-rose-500' : ''} />
        </button>

        {/* Hover Quick Actions on Desktop */}
        <div className="absolute inset-x-2.5 bottom-2.5 hidden sm:flex items-center gap-1.5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            onClick={handleQuickViewClick}
            className="flex-1 py-2.5 bg-white/95 backdrop-blur-md hover:bg-white text-slate-800 rounded-xl text-xs font-black shadow-md transition-all flex items-center justify-center gap-1.5 border border-slate-100 cursor-pointer hover:scale-102"
          >
            <Eye size={14} />
            <span>Quick View</span>
          </button>
          
          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            className={`flex-1 py-2.5 text-white rounded-xl text-xs font-black shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-102 ${
              isAdding ? 'bg-emerald-600' : 'bg-[#087F8C] hover:bg-[#066670]'
            }`}
          >
            {isAdding ? <Check size={14} /> : <ShoppingBag size={14} />}
            <span>{isAdding ? 'Added!' : 'Quick Add'}</span>
          </button>
        </div>

      </div>

      {/* Product Content & Meta */}
      <div className="flex-1 flex flex-col">
        
        {/* Surface / Category Tag */}
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-[10px] sm:text-[11px] font-black text-[#087F8C] uppercase tracking-wider truncate flex items-center gap-1">
            <ShieldCheck size={12} className="text-[#087F8C]" />
            <span>{product.surface ? product.surface.slice(0, 2).join(' • ') : product.category}</span>
          </span>
          
          {product.size && (
            <span className="text-[10px] text-slate-400 shrink-0 hidden sm:inline font-medium">
              {product.size.split('+')[0].trim()}
            </span>
          )}
        </div>

        {/* Product Title */}
        <Link
          to={`/product/${product.slug}`}
          className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-[#087F8C] transition-colors line-clamp-2 leading-snug mb-1.5"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Star Ratings */}
        <div className="mb-2 flex items-center justify-between">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} size={13} />
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
            In Stock
          </span>
        </div>

        {/* Short description */}
        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3 hidden sm:block">
          {product.shortDescription}
        </p>

        {/* Price & Mobile Add to Cart */}
        <div className="mt-auto pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            size="sm"
          />

          {/* Direct Add button */}
          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            aria-label="Add to Cart"
            className={`p-2.5 rounded-xl font-bold shadow-xs transition-all duration-200 shrink-0 cursor-pointer sm:hidden ${
              isAdding ? 'bg-emerald-600 text-white' : 'bg-[#087F8C] active:bg-[#066670] text-white'
            }`}
          >
            {isAdding ? <Check size={16} /> : <ShoppingBag size={16} />}
          </button>
        </div>

      </div>

    </div>
  );
};
