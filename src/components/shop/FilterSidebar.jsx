import React from 'react';
import { surfaces, concerns } from '../../data/categories';
import { formatPrice } from '../../utils/formatters';
import { RotateCcw, X, Filter } from 'lucide-react';

export const FilterSidebar = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults = 0,
  isMobileDrawer = false,
  onCloseMobileDrawer
}) => {
  const categories = ['All', 'Combos', 'Protection', 'Cleaners'];
  const surfaceOptions = ['All', ...surfaces.map((s) => s.name.split('&')[0].trim())];
  const concernOptions = ['All', ...concerns.map((c) => c.title)];

  const content = (
    <div className="space-y-6 text-xs sm:text-sm">
      
      {/* Top Filter Header & Reset Button */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 font-black text-slate-900 uppercase tracking-wider text-xs">
          <Filter size={15} className="text-[#087F8C]" />
          <span>Filters ({totalResults} Results)</span>
        </div>

        <button
          onClick={onResetFilters}
          className="flex items-center gap-1 text-xs text-[#087F8C] hover:underline font-semibold"
        >
          <RotateCcw size={12} />
          <span>Reset All</span>
        </button>
      </div>

      {/* 1. Category Filter */}
      <div>
        <h4 className="font-bold text-slate-900 mb-2.5 uppercase tracking-wider text-[11px] text-slate-400">
          Collection
        </h4>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 cursor-pointer text-slate-700 hover:text-[#087F8C] transition"
            >
              <input
                type="radio"
                name="category"
                checked={filters.category === cat}
                onChange={() => onFilterChange('category', cat)}
                className="w-4 h-4 text-[#087F8C] focus:ring-[#087F8C]"
              />
              <span className={filters.category === cat ? 'font-bold text-[#087F8C]' : ''}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Surface Filter */}
      <div>
        <h4 className="font-bold text-slate-900 mb-2.5 uppercase tracking-wider text-[11px] text-slate-400">
          Target Surface
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {surfaceOptions.map((surf) => (
            <label
              key={surf}
              className="flex items-center gap-2.5 cursor-pointer text-slate-700 hover:text-[#087F8C] transition"
            >
              <input
                type="radio"
                name="surface"
                checked={filters.surface === surf}
                onChange={() => onFilterChange('surface', surf)}
                className="w-4 h-4 text-[#087F8C] focus:ring-[#087F8C]"
              />
              <span className={filters.surface === surf ? 'font-bold text-[#087F8C]' : ''}>
                {surf}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Concern / Problem Filter */}
      <div>
        <h4 className="font-bold text-slate-900 mb-2.5 uppercase tracking-wider text-[11px] text-slate-400">
          Stain / Problem
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {concernOptions.map((c) => (
            <label
              key={c}
              className="flex items-center gap-2.5 cursor-pointer text-slate-700 hover:text-[#087F8C] transition"
            >
              <input
                type="radio"
                name="concern"
                checked={filters.concern === c}
                onChange={() => onFilterChange('concern', c)}
                className="w-4 h-4 text-[#087F8C] focus:ring-[#087F8C]"
              />
              <span className={filters.concern === c ? 'font-bold text-[#087F8C]' : ''}>
                {c}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Price Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
            Max Price
          </h4>
          <span className="font-bold text-slate-900 text-xs">
            {formatPrice(filters.maxPrice || 3500)}
          </span>
        </div>
        <input
          type="range"
          min={350}
          max={3500}
          step={100}
          value={filters.maxPrice || 3500}
          onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
          className="w-full accent-[#087F8C] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>₹350</span>
          <span>₹3,500</span>
        </div>
      </div>

      {/* 5. Minimum Rating */}
      <div>
        <h4 className="font-bold text-slate-900 mb-2.5 uppercase tracking-wider text-[11px] text-slate-400">
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {[
            { val: 0, label: 'All Ratings' },
            { val: 4.8, label: '★ 4.8 & above' },
            { val: 4.5, label: '★ 4.5 & above' }
          ].map((r) => (
            <label
              key={r.val}
              className="flex items-center gap-2.5 cursor-pointer text-slate-700 hover:text-[#087F8C] transition"
            >
              <input
                type="radio"
                name="rating"
                checked={Number(filters.minRating || 0) === r.val}
                onChange={() => onFilterChange('minRating', r.val)}
                className="w-4 h-4 text-[#087F8C] focus:ring-[#087F8C]"
              />
              <span className={Number(filters.minRating) === r.val ? 'font-bold text-[#087F8C]' : ''}>
                {r.label}
              </span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );

  if (isMobileDrawer) {
    return (
      <div className="fixed inset-0 z-50 flex">
        <div className="fixed inset-0 bg-slate-900/50" onClick={onCloseMobileDrawer} />
        <div className="relative w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <span className="font-black text-slate-900">Filter Products</span>
              <button
                onClick={onCloseMobileDrawer}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            {content}
          </div>

          <div className="pt-6 border-t border-slate-100">
            <button
              onClick={onCloseMobileDrawer}
              className="w-full py-3 bg-[#087F8C] text-white font-bold rounded-xl text-sm"
            >
              Show {totalResults} Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFA] p-5 rounded-3xl border border-slate-100 sticky top-24">
      {content}
    </div>
  );
};
