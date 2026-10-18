import React from 'react';
import { Home, Atom, Flag, Star, ShieldCheck, Sparkles } from 'lucide-react';

export const TrustStrip = () => {
  const items = [
    { icon: <Home size={18} className="fill-current" />, text: "45,000+ Homes Protected" },
    { icon: <Atom size={18} />, text: "Nanotechnology Formula" },
    { icon: <Flag size={18} className="fill-current" />, text: "Made in India Products" },
    { icon: <Star size={18} className="fill-current" />, text: "4.7 Star Rating (1,200+ Reviews)" },
    { icon: <ShieldCheck size={18} />, text: "180 Days Invisible Shield" },
    { icon: <Sparkles size={18} />, text: "Zero Harsh Acid Fumes" }
  ];

  // Repeat items for seamless marquee loop
  const marqueeList = [...items, ...items, ...items];

  return (
    <div className="w-full bg-[#1B263B] text-white font-black py-3.5 overflow-hidden border-y border-white/10 shadow-inner select-none">
      <div className="flex w-max animate-marquee space-x-10 text-xs sm:text-sm tracking-wide uppercase">
        {marqueeList.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5 shrink-0">
            <span className="text-white">{item.icon}</span>
            <span className="font-black text-white">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
