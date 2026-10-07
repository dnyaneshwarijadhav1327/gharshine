import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, HeartHandshake, Award, ShieldCheck } from 'lucide-react';

export const BrandStorySection = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image Mosaic */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-100 border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern clean Indian home kitchen"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Small Image */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-44 sm:w-56 aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80"
                  alt="Glass surface water repellent"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-slate-100 flex items-center gap-2">
                <Award size={18} className="text-[#087F8C]" />
                <span className="text-xs font-bold text-slate-800">100% Indian Innovation</span>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider">
              <Sparkles size={13} />
              <span>Our Brand Philosophy</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Made for the Way <span className="text-[#087F8C]">Indian Homes Live</span>
            </h2>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                Indian households are full of warmth, vibrant celebrations, and bustling everyday life. But they also face unique challenges: mineral-heavy borewell water that scales bathroom glass, daily tadka splatters in the kitchen, and frequent family gatherings where chai or curry can spill on cherished sofas.
              </p>
              <p>
                Standard imported chemical cleaners often contain caustic hydrochloric acid or bleaches that erode delicate Italian marble and discolor fabrics over time.
              </p>
              <p className="font-semibold text-slate-800">
                GharShine was born with a single mission: to replace harsh reactive cleaning with proactive, scientific surface protection.
              </p>
            </div>

            {/* Values Mini Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-slate-100">
                <ShieldCheck size={20} className="text-[#087F8C] mb-1.5" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Non-Corrosive</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Gentle on delicate chrome, stone & fabrics</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-slate-100">
                <HeartHandshake size={20} className="text-[#087F8C] mb-1.5" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Family & Pet Safe</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Zero toxic residue or pungent odors</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#087F8C] hover:text-[#066670] transition group"
              >
                <span>Read Our Full Story & Science</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
