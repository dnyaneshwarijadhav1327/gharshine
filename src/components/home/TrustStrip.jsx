import React from 'react';
import { Sparkles, ShieldCheck, Clock, Home, Lock } from 'lucide-react';

export const TrustStrip = () => {
  const trustItems = [
    {
      icon: <Sparkles size={18} className="text-[#087F8C]" />,
      title: "Easy DIY Application",
      desc: "No special tools needed"
    },
    {
      icon: <ShieldCheck size={18} className="text-[#087F8C]" />,
      title: "Surface Protection",
      desc: "Up to 6-12 months shield"
    },
    {
      icon: <Home size={18} className="text-[#087F8C]" />,
      title: "Made for Indian Homes",
      desc: "Tackles hard water & spices"
    },
    {
      icon: <Clock size={18} className="text-[#087F8C]" />,
      title: "Long-Lasting Results",
      desc: "Cuts daily cleaning in half"
    },
    {
      icon: <Lock size={18} className="text-[#087F8C]" />,
      title: "Safe & Secure Checkout",
      desc: "COD & express shipping"
    }
  ];

  return (
    <div className="bg-[#F8FAFA] border-y border-slate-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2 rounded-xl bg-white/60 sm:bg-transparent border sm:border-0 border-slate-100"
            >
              <div className="w-9 h-9 rounded-xl bg-[#E8F8F8] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 truncate">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
