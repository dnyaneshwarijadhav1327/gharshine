import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 5, reviewCount, size = 15, showCount = true, className = "" }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center text-amber-400">
        {[...Array(5)].map((_, i) => {
          const isFull = i < fullStars;
          const isHalf = !isFull && i === fullStars && hasHalf;
          return (
            <Star
              key={i}
              size={size}
              className={`${
                isFull
                  ? "fill-amber-400 text-amber-400"
                  : isHalf
                  ? "fill-amber-400/50 text-amber-400"
                  : "text-slate-200 fill-slate-100"
              }`}
            />
          );
        })}
      </div>
      {showCount && (
        <span className="text-xs font-semibold text-slate-700">
          {rating.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="text-slate-400 font-normal ml-1">({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
};
