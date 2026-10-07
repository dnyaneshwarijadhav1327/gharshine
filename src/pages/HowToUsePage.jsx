import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { products } from '../data/products';
import { Sparkles, Check, X, Clock, Play, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowToUsePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "How To Use Surface Care Guide | GharShine";
  }, []);

  const categories = ['All', 'Glass', 'Bathroom', 'Fabric', 'Marble', 'Kitchen', 'Wood', 'Leather'];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.surface.some((s) => s.toLowerCase().includes(selectedCategory.toLowerCase()));
  });

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: 'How To Use Guide' }]} />

        {/* Page Header */}
        <div className="py-8 border-b border-slate-100 mb-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} />
            <span>Application Masterclass</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            How To Use GharShine Solutions
          </h1>
          <p className="text-xs sm:text-base text-slate-600 mt-2 leading-relaxed">
            Follow our chemist-approved steps for flawless, long-lasting surface protection with zero guesswork.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#087F8C] text-white shadow-md shadow-[#087F8C]/20'
                  : 'bg-[#F8FAFA] text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Guide Cards */}
        <div className="space-y-12">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-[#F8FAFA] rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6"
            >
              {/* Product Head */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/60">
                <div className="flex items-center gap-4">
                  <img
                    src={p.thumbnail}
                    alt={p.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <span className="text-[11px] font-bold text-[#087F8C] uppercase tracking-wider block">
                      {p.surface.join(' • ')}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {p.name}
                    </h3>
                  </div>
                </div>

                <Link
                  to={`/product/${p.slug}`}
                  className="px-4 py-2 bg-white hover:bg-slate-50 text-[#087F8C] border border-teal-100 rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-center shrink-0"
                >
                  <span>View Product</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Steps Grid */}
              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
                  Application Instructions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {p.howToUse?.map((stepItem, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs">
                      <span className="text-xs font-black text-[#087F8C] block mb-1">
                        {stepItem.step}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {stepItem.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Do's and Don'ts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                    <Check size={14} className="text-emerald-600" />
                    <span>Do's & Best Practices</span>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {p.suitableFor?.slice(0, 3).map((item, idx) => (
                      <li key={idx}>✓ Apply on dry, clean {item.toLowerCase()}</li>
                    ))}
                    <li>✓ Use clean microfiber cloth for final buff</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-2">
                  <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs uppercase tracking-wider">
                    <X size={14} className="text-rose-600" />
                    <span>Don'ts & Avoidances</span>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {p.notSuitableFor?.slice(0, 2).map((item, idx) => (
                      <li key={idx}>✗ Do not use on {item.toLowerCase()}</li>
                    ))}
                    <li>✗ Avoid water contact during 4-hour curing window</li>
                  </ul>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
