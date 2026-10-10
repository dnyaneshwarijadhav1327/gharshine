import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, SprayCan, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Clean",
      desc: "Remove existing mineral scaling, dirt, grease and stains with our targeted deep cleaners.",
      icon: <Sparkles size={24} className="text-[#087F8C]" />,
      bg: "bg-[#E8F8F8]"
    },
    {
      step: "02",
      title: "Apply",
      desc: "Spray or wipe the nano-barrier protectant evenly across the dry surface with the included applicator.",
      icon: <SprayCan size={24} className="text-[#087F8C]" />,
      bg: "bg-[#E8F8F8]"
    },
    {
      step: "03",
      title: "Let It Bond",
      desc: "Allow the active silane compounds to cure into microscopic pores to form an invisible liquid barrier.",
      icon: <Clock size={24} className="text-[#087F8C]" />,
      bg: "bg-[#E8F8F8]"
    },
    {
      step: "04",
      title: "Enjoy & Protect",
      desc: "Enjoy bead-forming hydrophobic surfaces that stay cleaner for months and wipe clean with plain water.",
      icon: <CheckCircle2 size={24} className="text-[#087F8C]" />,
      bg: "bg-[#E8F8F8]"
    }
  ];

  return (
    <section className="py-10 sm:py-20 bg-[#F8FAFA] border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-2.5 border border-teal-100 shadow-2xs">
            <Sparkles size={13} />
            <span>The GharShine Method</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Simple to Use. <span className="text-[#087F8C]">Powerful Results.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Professional-grade nano-barrier surface protection made effortless for every Indian homeowner.
          </p>
        </div>

        {/* 4 Steps: Horizontal swipeable on mobile, 4-col grid on desktop */}
        <div
          className="flex sm:grid gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible no-scrollbar pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid-cols-2 lg:grid-cols-4 snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="w-[260px] sm:w-auto shrink-0 snap-start relative bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Step Number Watermark */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${item.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <span className="text-2xl sm:text-3xl font-black text-slate-200 group-hover:text-teal-200 transition-colors">
                  {item.step}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 border-t border-slate-50 flex items-center gap-1 text-[11px] font-bold text-[#087F8C] uppercase tracking-wider">
                <span>Step {idx + 1} of 4</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-6 sm:mt-12">
          <Link
            to="/how-to-use"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#087F8C] hover:bg-[#066670] text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-[#087F8C]/20 transition group"
          >
            <span>Explore Complete How To Use Guide</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
