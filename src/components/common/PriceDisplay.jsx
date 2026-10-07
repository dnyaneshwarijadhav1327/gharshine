import React from 'react';
import { formatPrice } from '../../utils/formatters';

export const PriceDisplay = ({
  price,
  originalPrice,
  discount,
  size = "md",
  showTaxNote = false,
  className = ""
}) => {
  const sizeClasses = {
    sm: {
      price: "text-base font-bold text-slate-900",
      original: "text-xs text-slate-400 line-through",
      badge: "text-[10px] px-1.5 py-0.5"
    },
    md: {
      price: "text-lg md:text-xl font-extrabold text-slate-900",
      original: "text-sm text-slate-400 line-through",
      badge: "text-xs px-2 py-0.5"
    },
    lg: {
      price: "text-2xl md:text-3xl font-extrabold text-slate-900",
      original: "text-base md:text-lg text-slate-400 line-through",
      badge: "text-xs md:text-sm px-2.5 py-1"
    }
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const calcDiscount = discount || (originalPrice && originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0);

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-baseline flex-wrap gap-2">
        <span className={currentSize.price}>{formatPrice(price)}</span>

        {originalPrice && originalPrice > price && (
          <span className={currentSize.original}>{formatPrice(originalPrice)}</span>
        )}

        {calcDiscount > 0 && (
          <span
            className={`font-bold rounded-full bg-[#E05A47]/10 text-[#E05A47] ${currentSize.badge}`}
          >
            {calcDiscount}% OFF
          </span>
        )}
      </div>

      {showTaxNote && (
        <span className="text-[11px] text-slate-400 font-medium mt-0.5">
          MRP (Inclusive of all Indian taxes)
        </span>
      )}
    </div>
  );
};
