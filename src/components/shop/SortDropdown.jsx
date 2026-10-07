import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export const SortDropdown = ({ value, onChange }) => {
  const options = [
    { id: 'featured', label: 'Featured & Popular' },
    { id: 'newest', label: 'Newest Arrivals' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'rating-desc', label: 'Highest Rated (★)' },
    { id: 'discount-desc', label: 'Biggest Discounts (%)' }
  ];

  return (
    <div className="flex items-center gap-2">
      <div className="relative inline-flex items-center">
        <ArrowUpDown size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Sort products"
          className="pl-8 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#087F8C] cursor-pointer appearance-none shadow-2xs"
        >
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              Sort: {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
