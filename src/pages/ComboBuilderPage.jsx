import React, { useEffect } from 'react';
import { BuildYourOwnCombo } from '../components/home/BuildYourOwnCombo';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Sparkles, ShieldCheck, Gift, Truck } from 'lucide-react';

export const ComboBuilderPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Build Your Custom Home Care Kit | GharShine";
  }, []);

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: 'Build Your Own Kit' }]} />

        {/* Feature Header Banner */}
        <div className="py-8 border-b border-slate-100 mb-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} />
            <span>Multi-Surface Discount Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Design Your Personalized Surface Care Kit
          </h1>
          <p className="text-xs sm:text-base text-slate-600 mt-3 leading-relaxed">
            Choose the exact solutions your house needs. Save up to 20% on bundle totals plus get free express dispatch and complimentary high-GSM microfiber applicators.
          </p>
        </div>

        {/* Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-slate-100 flex items-center gap-3">
            <Gift size={22} className="text-[#087F8C] shrink-0" />
            <div className="text-xs">
              <strong className="text-slate-900 block font-bold">Tiered Savings</strong>
              <span className="text-slate-500">10% off 2 items, 15% off 3, 20% off 4+</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-slate-100 flex items-center gap-3">
            <Truck size={22} className="text-[#087F8C] shrink-0" />
            <div className="text-xs">
              <strong className="text-slate-900 block font-bold">Free Express Delivery</strong>
              <span className="text-slate-500">Fast 2-3 day shipping across India</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-slate-100 flex items-center gap-3">
            <ShieldCheck size={22} className="text-[#087F8C] shrink-0" />
            <div className="text-xs">
              <strong className="text-slate-900 block font-bold">100% Surface Safe</strong>
              <span className="text-slate-500">Formulated for Indian home conditions</span>
            </div>
          </div>
        </div>

        {/* Builder Component */}
        <BuildYourOwnCombo />

      </div>
    </div>
  );
};
