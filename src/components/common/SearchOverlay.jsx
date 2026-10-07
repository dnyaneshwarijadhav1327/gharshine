import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { products } from '../../data/products';
import { formatPrice } from '../../utils/formatters';
import { RatingStars } from './RatingStars';
import { useCart } from '../../context/CartContext';

const popularSearches = [
  'Hard Water Stains',
  'Glass & Shower',
  'Fabric Sofa Spills',
  'Italian Marble Sealant',
  'Kitchen Chimney Grease',
  'Bathroom Care Kit',
  'Wood Polish',
  'Tiles Grout'
];

export const SearchOverlay = () => {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery } = useSearch();
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  // Live matching
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const q = searchQuery.toLowerCase().trim();
    const matched = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.surface.some((s) => s.toLowerCase().includes(q)) ||
        p.concerns.some((c) => c.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
    );
    setResults(matched);
  }, [searchQuery]);

  if (!isSearchOpen) return null;

  const handleSelectSuggestion = (term) => {
    setSearchQuery(term);
  };

  const handleViewAllResults = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={closeSearch} />

      {/* Main Search Panel */}
      <div className="relative z-10 w-full max-w-4xl mx-auto mt-4 sm:mt-12 px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]">
          
          {/* Top Search Input Bar */}
          <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center gap-3">
            <Search size={22} className="text-[#087F8C] shrink-0" />
            
            <form onSubmit={handleViewAllResults} className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What surface or stain are you looking to solve? (e.g. hard water, sofa, glass...)"
                className="w-full text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
            </form>

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
              >
                <X size={16} />
              </button>
            )}

            <button
              type="button"
              onClick={closeSearch}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition text-xs font-semibold"
            >
              ESC
            </button>
          </div>

          {/* Body: Popular Searches OR Live Results */}
          <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
            {!searchQuery ? (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  <TrendingUp size={14} className="text-[#087F8C]" />
                  <span>Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSelectSuggestion(term)}
                      className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-[#F8FAFA] hover:bg-[#E8F8F8] text-slate-700 hover:text-[#087F8C] border border-slate-100 transition"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Found {results.length} Solutions
                  </span>
                  <button
                    onClick={handleViewAllResults}
                    className="text-xs font-semibold text-[#087F8C] hover:underline flex items-center gap-1"
                  >
                    <span>View all in shop</span>
                    <ArrowRight size={12} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.slice(0, 6).map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-slate-100 hover:border-[#65D5D8]/40 hover:bg-[#F8FAFA] transition group"
                    >
                      <Link
                        to={`/product/${p.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-3 min-w-0 flex-1"
                      >
                        <img
                          src={p.thumbnail}
                          alt={p.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-[#087F8C]">
                            {p.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-slate-900">
                              {formatPrice(p.price)}
                            </span>
                            <RatingStars rating={p.rating} size={12} showCount={false} />
                          </div>
                        </div>
                      </Link>

                      <button
                        onClick={() => {
                          addToCart(p, 1, false);
                        }}
                        className="px-3 py-1.5 bg-[#E8F8F8] hover:bg-[#087F8C] text-[#087F8C] hover:text-white rounded-xl text-xs font-semibold transition shrink-0"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <Sparkles size={24} />
                </div>
                <h4 className="text-base font-bold text-slate-800">No products found for "{searchQuery}"</h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  Try searching for surfaces like "glass", "sofa", "marble", or browse our complete collection.
                </p>
                <div className="mt-5">
                  <Link
                    to="/shop"
                    onClick={closeSearch}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#087F8C] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#066670] transition"
                  >
                    <span>Browse All Products</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-400">
            Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[11px]">Enter</kbd> to view full results page
          </div>

        </div>
      </div>
    </div>
  );
};
