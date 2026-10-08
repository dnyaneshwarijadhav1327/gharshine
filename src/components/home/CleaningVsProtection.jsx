import React from 'react';
import { Sparkles, ShieldCheck, Check, X, ArrowRight, Zap, Droplets, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CleaningVsProtection = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#F4F8F7]/80 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-black uppercase tracking-wider mb-3 border border-[#087F8C]/20 shadow-2xs">
            <Sparkles size={14} className="animate-spin text-[#087F8C]" style={{ animationDuration: '6s' }} />
            <span>THE SCIENCE OF SURFACE DEFENSE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Stop Cleaning Every Weekend.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#087F8C] to-[#0AA1B2]">
              Start Protecting For Months.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto">
            Traditional cleaners only remove dirt after damage is done. GharShine’s invisible nano-barrier blocks stains before they can bond.
          </p>
        </div>

        {/* 2-Column High-Tech Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Card 1: Traditional Cleaners */}
          <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-sm flex flex-col justify-between card-3d-hover relative group">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-4">
                <span>Traditional Cleaners (Old Way)</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 flex items-center gap-2">
                <span>Temporary Cleanup</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-rose-100 text-rose-700">Repeats Weekly</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Removes top stains temporarily, but leaves pores open to absorb new water marks, grease, and hard water minerals the very next day.
              </p>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <Check size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <span>Cleans visible dirt on the surface</span>
                </div>
                <div className="flex items-start gap-2.5 text-rose-500 font-medium">
                  <X size={16} className="text-rose-500 shrink-0 mt-0.5" />
                  <span>Leaves surface pores exposed and unprotected</span>
                </div>
                <div className="flex items-start gap-2.5 text-rose-500 font-medium">
                  <X size={16} className="text-rose-500 shrink-0 mt-0.5" />
                  <span>Requires harsh scrubbing every 3 to 7 days</span>
                </div>
                <div className="flex items-start gap-2.5 text-rose-500 font-medium">
                  <X size={16} className="text-rose-500 shrink-0 mt-0.5" />
                  <span>Acidic chemicals gradually erode shine & marble seals</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-bold text-slate-700">
                <Clock size={15} /> Effort Required:
              </span>
              <span className="font-bold text-rose-600">3-4 Hours Every Week</span>
            </div>
          </div>

          {/* Card 2: GharShine Nano-Shield */}
          <div className="bg-gradient-to-b from-[#E8F8F8]/90 via-white to-white rounded-3xl p-6 sm:p-9 border-2 border-[#087F8C] shadow-xl shadow-teal-900/10 flex flex-col justify-between card-3d-hover relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#65D5D8]/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#087F8C] to-[#0AA1B2] text-white text-xs font-black uppercase tracking-wider mb-4 shadow-xs">
                <ShieldCheck size={15} />
                <span>GharShine Nano-Protection (The Smart Way)</span>
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 mb-3 flex items-center gap-2">
                <span>Hydrophobic Invisible Defense</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">180 Days</span>
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Fills microscopic pores with an invisible repellent matrix. Water, chai, oil, and mineral limescale bead up on contact without soaking in.
              </p>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-900 font-semibold">
                <div className="flex items-start gap-2.5">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Repels hard-water scaling & soap scum for up to 6 months</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Liquids bead off instantly with 110° contact angle</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>100% surface-safe: Zero corrosive acid fumes</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Cuts weekly cleaning effort by over 90%</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-teal-100 relative z-10 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <Zap size={15} className="text-[#087F8C]" /> Effort Required:
              </span>
              <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                1 Quick Water Wipe in Seconds
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Banner CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2.5 px-8 py-4 shimmer-btn text-white rounded-2xl font-black text-sm sm:text-base shadow-xl shadow-[#087F8C]/25 hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer"
          >
            <span>Protect Your Home Surfaces Today</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
