import React from 'react';
import { Sparkles, ShieldCheck, Check, X } from 'lucide-react';

export const CleaningVsProtection = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#F4F8F7]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-2.5 border border-teal-100">
            <Sparkles size={13} />
            <span>The Science of Surface Care</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Clean Today. <span className="text-[#087F8C]">Protect Tomorrow.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Why ordinary cleaning is only half the battle. Discover the dual-action philosophy that saves hours of weekly housework.
          </p>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: Ordinary Cleaning */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-4">
                <span>Phase 1: Remediation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                Deep Cleaning Action
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Breaks chemical bonds of existing limescale, stubborn cooking grease, and entrenched dirt deposits.
              </p>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#087F8C] shrink-0 mt-0.5" />
                  <span>Dissolves thick borewell hard-water crust</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#087F8C] shrink-0 mt-0.5" />
                  <span>Emulsifies burnt ghee & tadka grease films</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#087F8C] shrink-0 mt-0.5" />
                  <span>Cleans deep into tile grout pores</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-400">
                  <X size={16} className="text-rose-400 shrink-0 mt-0.5" />
                  <span>Does NOT stop new water drops from staining tomorrow</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-3.5 rounded-2xl bg-slate-50 text-xs text-slate-500 font-medium">
              💡 <strong>Frequency:</strong> Use as needed when heavy scaling or grease occurs.
            </div>
          </div>

          {/* Card 2: Nano-Shield Protection */}
          <div className="bg-gradient-to-b from-[#E8F8F8] to-white rounded-3xl p-6 sm:p-8 border-2 border-[#087F8C]/40 shadow-lg shadow-teal-900/5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#65D5D8]/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#087F8C] text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
                <ShieldCheck size={14} />
                <span>Phase 2: Prevention (The Gamechanger)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                Hydro-Barrier Nano-Protection
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Anchors a microscopic, water-repellent silane shield onto glass, stone, and fabric so liquids bead off before penetrating.
              </p>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-800 font-medium">
                <div className="flex items-start gap-2.5">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Repels hard-water scaling & mineral deposits for 6 months</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Spilled chai & curry bead up on fabric without absorbing</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Protects Italian marble & granite from turmeric haldi stains</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Reduces weekly wiping time by up to 70%</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-3.5 rounded-2xl bg-white/80 border border-teal-100 text-xs text-[#087F8C] font-semibold">
              ✨ <strong>Benefit:</strong> Surfaces stay showroom clean with just a plain water rinse.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
