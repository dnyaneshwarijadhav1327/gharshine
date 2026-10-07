import React from 'react';
import {
  Sparkles,
  Home,
  Layers,
  Clock,
  FlaskConical,
  Headphones,
  ShieldCheck
} from 'lucide-react';

export const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: <Sparkles size={24} className="text-[#087F8C]" />,
      title: "Effortless DIY Application",
      desc: "Designed for busy homeowners. No special expertise or heavy mechanical buffing required."
    },
    {
      icon: <Home size={24} className="text-[#087F8C]" />,
      title: "Made for Indian Conditions",
      desc: "Engineered specifically to tackle high-TDS borewell water, tadka grease, and monsoon dampness."
    },
    {
      icon: <Layers size={24} className="text-[#087F8C]" />,
      title: "Surface-Specific Chemistry",
      desc: "Exact pH balancing for glass, Italian marble, teakwood, and delicate upholstery."
    },
    {
      icon: <Clock size={24} className="text-[#087F8C]" />,
      title: "Long-Lasting Protection",
      desc: "Nano-coatings create hydrophobic bonds that endure up to 6 to 12 months of daily use."
    },
    {
      icon: <FlaskConical size={24} className="text-[#087F8C]" />,
      title: "Zero Harsh Acid Fumes",
      desc: "Non-corrosive, skin-friendly, pet-safe formulations with pleasant botanical notes."
    },
    {
      icon: <Headphones size={24} className="text-[#087F8C]" />,
      title: "Dedicated WhatsApp Support",
      desc: "Get direct advice from surface care specialists via WhatsApp and email."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F4F8F7]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-2.5 border border-teal-100">
            <ShieldCheck size={13} />
            <span>The GharShine Standard</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Choose Our Products?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Engineered to elevate home maintenance into a luxurious, satisfying experience.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#E8F8F8] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {r.icon}
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {r.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
