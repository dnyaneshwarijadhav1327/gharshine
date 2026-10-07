import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

export const BestsellersSection = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Favorites' },
    { id: 'combos', label: 'Combos & Kits' },
    { id: 'protection', label: 'Surface Protectors' },
    { id: 'cleaners', label: 'Deep Cleaners' }
  ];

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'combos') return p.isCombo || p.category === 'Combos';
    if (activeTab === 'protection') return p.category === 'Protection';
    if (activeTab === 'cleaners') return p.category === 'Cleaners';
    return p.isFeatured || p.badge === 'BESTSELLER' || p.rating >= 4.8;
  });

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-2.5">
              <Sparkles size={13} />
              <span>Proven Performance</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Customer Favorites
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Top-rated solutions Indian homes keep coming back to.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-[#087F8C] text-white shadow-md shadow-[#087F8C]/20'
                    : 'bg-[#F8FAFA] text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid: 4 cols desktop, 3 tablet, 2 mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom View All Link */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#F8FAFA] hover:bg-[#E8F8F8] text-[#087F8C] border border-teal-100 rounded-2xl text-sm font-bold shadow-xs hover:shadow-md transition-all duration-200 group"
          >
            <span>Explore All {products.length} Products</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
