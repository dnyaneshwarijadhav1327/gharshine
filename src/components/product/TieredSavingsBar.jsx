import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

export const TieredSavingsBar = ({ currentProductPrice = 1599 }) => {
  const { subtotal, totalItemCount, openCart } = useCart();

  const totalCartValue = (subtotal > 0 ? subtotal : currentProductPrice);

  const tiers = [
    { target: 2000, discount: 200, label: '₹ 2,000', sublabel: '₹200 off' },
    { target: 2500, discount: 500, label: '₹ 2,500', sublabel: '₹500 off' },
    { target: 4000, discount: 800, label: '₹ 4,000', sublabel: '₹800 off' }
  ];

  let nextTier = tiers.find((t) => totalCartValue < t.target);
  let currentTierDiscount = 0;

  for (let i = tiers.length - 1; i >= 0; i--) {
    if (totalCartValue >= tiers[i].target) {
      currentTierDiscount = tiers[i].discount;
      break;
    }
  }

  const remainingForNext = nextTier ? nextTier.target - totalCartValue : 0;
  const progressPercent = Math.min(100, Math.round((totalCartValue / 4000) * 100));

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
      
      {/* Top Unlock Info Text */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {nextTier ? (
          <p className="text-xs sm:text-sm text-slate-800 font-medium">
            Add <strong className="text-[#087F8C] font-black">{formatPrice(remainingForNext)}</strong> more to unlock{' '}
            <strong className="text-emerald-700 font-black">₹{nextTier.discount} off</strong>
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-emerald-700 font-black">
            🎉 You have unlocked the maximum ₹800 savings!
          </p>
        )}

        {/* Right side You Save + Order Summary button */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              YOU SAVE
            </span>
            <span className="text-sm font-black text-slate-900">
              ₹ {currentTierDiscount}
            </span>
          </div>

          <button
            onClick={openCart}
            className="px-4 py-2 bg-[#FBD778] hover:bg-[#f7cc59] active:scale-95 text-slate-950 font-black text-xs rounded-xl shadow-2xs transition cursor-pointer"
          >
            Order summary ({totalItemCount})
          </button>
        </div>
      </div>

      {/* Progress Track with Milestone Pins */}
      <div className="relative pt-2 pb-5">
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#087F8C] to-[#52D1DC] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Milestone Node Points */}
        <div className="flex justify-between items-start text-center mt-2.5 px-2">
          {tiers.map((t, idx) => {
            const isReached = totalCartValue >= t.target;

            return (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all -mt-3.5 mb-1 ${
                    isReached
                      ? 'bg-[#087F8C] border-white shadow-xs'
                      : 'bg-white border-slate-300'
                  }`}
                />
                <span className="text-[11px] font-bold text-slate-800">
                  {t.label}
                </span>
                <span className="text-[10px] font-medium text-slate-500">
                  {t.sublabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
