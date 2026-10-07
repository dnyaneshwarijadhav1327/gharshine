import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Droplets,
  CheckCircle2,
  Star
} from 'lucide-react';
import { brandConfig } from '../../data/config';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F4F8F7]/60 via-white to-white py-12 md:py-20 lg:py-24">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#65D5D8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#087F8C]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Content & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F8F8] border border-teal-200/50 text-[#087F8C] text-xs sm:text-sm font-bold tracking-wide shadow-xs animate-in fade-in duration-300">
              <Sparkles size={15} className="text-[#087F8C]" />
              <span>SMART SURFACE CARE FOR MODERN HOMES</span>
            </div>

            {/* Large Bold Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
              Clean Every Surface.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#087F8C] to-[#0AA1B2]">
                Protect What Matters.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Powerful cleaning and nano-barrier protection solutions designed specifically for the high-mineral water, dust, and daily wear of Indian households.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-[#087F8C] hover:bg-[#066670] text-white rounded-2xl text-sm sm:text-base font-bold shadow-lg shadow-[#087F8C]/25 hover:shadow-xl hover:shadow-[#087F8C]/30 transition-all duration-200 flex items-center justify-center gap-2.5 group"
              >
                <span>Shop Products</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/combo-builder"
                className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-[#F8FAFA] text-[#087F8C] border-2 border-[#087F8C] rounded-2xl text-sm sm:text-base font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-xs"
              >
                <Droplets size={18} />
                <span>Build Custom Kit</span>
              </Link>
            </div>

            {/* Social Proof Mini Stats */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://images.unsplash.com/photo-${1534528741775 + i * 100}?auto=format&fit=crop&w=80&q=80`}
                      alt="Customer"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-slate-800">4.9 / 5</span> (500+ Verified Homes)
                </div>
              </div>

              <div className="hidden sm:block h-5 w-px bg-slate-200" />

              <div className="flex items-center gap-1.5 font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                <CheckCircle2 size={15} className="text-emerald-600" />
                <span>Zero Harsh Fumes</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Visual Arrangement & Floating Badges */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Lifestyle Hero Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-teal-900/10 border-4 border-white bg-slate-100 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern clean Indian home interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] uppercase tracking-widest font-bold text-[#65D5D8]">
                    Showroom Cleanliness • Invisible Defense
                  </span>
                  <p className="text-sm font-semibold truncate">
                    Hard Water • Spills • Grease • Natural Stone Etching
                  </p>
                </div>
              </div>

              {/* Floating Pill Badge 1: Top Right */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2.5 animate-pulse-subtle z-20">
                <div className="w-8 h-8 rounded-xl bg-[#E8F8F8] text-[#087F8C] flex items-center justify-center">
                  <Droplets size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Hydro-Barrier Shield</h4>
                  <p className="text-[10px] text-slate-500">Repels liquids & mineral scaling</p>
                </div>
              </div>

              {/* Floating Pill Badge 2: Bottom Left */}
              <div className="absolute -bottom-5 -left-2 sm:-left-5 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3 z-20">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Made for Indian Homes</h4>
                  <p className="text-[10px] text-slate-500">Borewell & high TDS resistant</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
