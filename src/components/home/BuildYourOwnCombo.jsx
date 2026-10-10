import React, { useState, useEffect } from 'react';
import { Sparkles, Check, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { products as fallbackProducts } from '../../data/products';
import { surfaces } from '../../data/categories';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { productService } from '../../services/productService';

export const BuildYourOwnCombo = () => {
  const [selectedSurface, setSelectedSurface] = useState('All');
  const [catalogProducts, setCatalogProducts] = useState(fallbackProducts);
  const [selectedProductIds, setSelectedProductIds] = useState(() => fallbackProducts.slice(0, 2).map((p) => p.id));
  const { addCustomBundleToCart } = useCart();

  useEffect(() => {
    let isMounted = true;
    productService.getProducts().then((res) => {
      if (!isMounted) return;
      if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        setCatalogProducts(res.data);
        if (res.data.length >= 2) {
          setSelectedProductIds([res.data[0].id, res.data[1].id]);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleProduct = (product) => {
    setSelectedProductIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  };

  const selectedProducts = catalogProducts.filter((p) => selectedProductIds.includes(p.id));

  // Bundle pricing logic
  const rawSubtotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const totalOriginalPrice = selectedProducts.reduce((sum, p) => sum + (p.originalPrice || p.price), 0);

  let discountTierPercent = 0;
  if (selectedProducts.length === 2) discountTierPercent = 10;
  else if (selectedProducts.length === 3) discountTierPercent = 15;
  else if (selectedProducts.length >= 4) discountTierPercent = 20;

  const bundleTierSavings = Math.round((rawSubtotal * discountTierPercent) / 100);
  const finalBundlePrice = Math.max(0, rawSubtotal - bundleTierSavings);
  const totalSavings = totalOriginalPrice - finalBundlePrice;

  const handleAddBundle = () => {
    if (selectedProducts.length === 0) return;
    addCustomBundleToCart({
      name: `Custom ${selectedProducts.length}-Product Home Kit`,
      items: selectedProducts,
      finalPrice: finalBundlePrice,
      totalOriginalPrice,
      discountPercent: discountTierPercent,
      savings: totalSavings
    });
  };

  const filteredCatalog = catalogProducts.filter((p) => {
    if (selectedSurface === 'All') return true;
    if (!p.surface) return true;
    const surf = Array.isArray(p.surface) ? p.surface : [String(p.surface)];
    return surf.some((s) => s.toLowerCase().includes(selectedSurface.toLowerCase()));
  });

  return (
    <section className="py-16 sm:py-24 bg-white" id="combo-builder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles size={13} />
            <span>Interactive Kit Customizer</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Build Your Own <span className="text-[#087F8C]">Home Care Kit</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Select 2 or more products tailored to your house needs and unlock automatic tiered bundle discounts.
          </p>

          {/* Discount Tiers Pill Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border transition ${
              selectedProducts.length === 2 ? 'bg-[#087F8C] text-white border-[#087F8C]' : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}>
              2 Items: 10% Extra OFF
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border transition ${
              selectedProducts.length === 3 ? 'bg-[#087F8C] text-white border-[#087F8C]' : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}>
              3 Items: 15% Extra OFF
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border transition ${
              selectedProducts.length >= 4 ? 'bg-[#087F8C] text-white border-[#087F8C]' : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}>
              4+ Items: 20% Extra OFF + VIP Gift
            </span>
          </div>
        </div>

        {/* Builder Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Product Selection Catalog (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1: Surface Filter Pills */}
            <div className="bg-[#F8FAFA] p-4 rounded-2xl border border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                Step 1: Filter by Surface
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSurface('All')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedSurface === 'All'
                      ? 'bg-[#087F8C] text-white'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  All Surfaces
                </button>
                {surfaces.slice(0, 7).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSurface(s.name.split('&')[0].trim())}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      selectedSurface === s.name.split('&')[0].trim()
                        ? 'bg-[#087F8C] text-white'
                        : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Products */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Step 2: Choose Products ({selectedProducts.length} Selected)
                </span>
                <span className="text-xs text-slate-500">
                  Showing {filteredCatalog.length} solutions
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredCatalog.map((p) => {
                  const isSelected = selectedProductIds.includes(p.id);

                  return (
                    <div
                      key={p.id}
                      onClick={() => handleToggleProduct(p)}
                      className={`cursor-pointer p-3.5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#087F8C] bg-[#E8F8F8]/40 shadow-sm'
                          : 'border-slate-100 hover:border-slate-200 bg-white'
                      }`}
                    >
                      <img
                        src={p.thumbnail || p.images?.[0] || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'}
                        alt={p.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100"
                      />

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#087F8C] uppercase tracking-wider block truncate">
                          {Array.isArray(p.surface) ? p.surface.join(', ') : (p.category || 'Multi-Surface')}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {p.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-slate-900">
                            {formatPrice(p.price)}
                          </span>
                          {p.originalPrice && (
                            <span className="text-[11px] text-slate-400 line-through">
                              {formatPrice(p.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition ${
                          isSelected
                            ? 'bg-[#087F8C] text-white'
                            : 'border border-slate-300 text-slate-400 hover:border-[#087F8C]'
                        }`}
                      >
                        {isSelected ? <Check size={16} /> : <Plus size={16} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT: Live Bundle Calculation Card (4 Cols Sticky) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-gradient-to-b from-[#F8FAFA] to-white rounded-3xl p-6 border-2 border-teal-100 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Your Custom Kit</h3>
                  <p className="text-xs text-slate-500">{selectedProducts.length} items in bundle</p>
                </div>
                {discountTierPercent > 0 && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-[#E05A47] text-white">
                    {discountTierPercent}% EXTRA SAVED
                  </span>
                )}
              </div>

              {/* Selected List mini badges */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {selectedProducts.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">
                    No products selected yet. Click any solution on the left to start your bundle.
                  </p>
                ) : (
                  selectedProducts.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-slate-100 text-xs"
                    >
                      <span className="font-semibold text-slate-800 truncate flex-1">
                        {item.name}
                      </span>
                      <span className="font-bold text-slate-900 shrink-0">
                        {formatPrice(item.price)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleProduct(item);
                        }}
                        className="text-slate-300 hover:text-rose-500 p-0.5"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Live Calculations */}
              <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-200/60">
                <div className="flex justify-between">
                  <span>Products Retail Total</span>
                  <span className="font-semibold text-slate-900">{formatPrice(rawSubtotal)}</span>
                </div>

                {bundleTierSavings > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Bundle Multi-Pack Discount ({discountTierPercent}%)</span>
                    <span>- {formatPrice(bundleTierSavings)}</span>
                  </div>
                )}

                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Total Savings vs Individual MRP</span>
                  <span>{formatPrice(totalSavings)}</span>
                </div>

                <div className="flex justify-between text-sm sm:text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Final Bundle Price</span>
                  <span className="text-xl text-[#087F8C]">{formatPrice(finalBundlePrice)}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleAddBundle}
                disabled={selectedProducts.length === 0}
                className="w-full py-4 bg-[#087F8C] hover:bg-[#066670] disabled:opacity-50 text-white rounded-2xl text-sm font-bold shadow-lg shadow-[#087F8C]/20 transition flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                <span>Add Custom Kit to Cart</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Includes Free Microfiber Applicator Cloths</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
