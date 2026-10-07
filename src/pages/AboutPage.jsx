import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Sparkles, ShieldCheck, Heart, Award, CheckCircle2, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About Us • Our Science & Mission | GharShine";
  }, []);

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: 'About GharShine' }]} />

        {/* Hero Section */}
        <div className="py-12 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={13} />
            <span>Pioneering Indian Surface Care</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Elevating Home Care into an Art of Protection
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We are on a mission to free Indian homeowners from the endless cycle of harsh chemical scrubbing with intelligent, nano-barrier surface protection.
          </p>
        </div>

        {/* Big Visual Banner */}
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] bg-slate-100 mb-16 shadow-xl border-4 border-white">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
            alt="Modern Indian living interior"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Story Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-black text-[#087F8C] uppercase tracking-wider">
              The Genesis
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Why Indian Homes Needed Their Own Chemistry
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Most standard surface cleaners sold in India are either aggressive industrial acid dilutions (which ruin expensive chrome taps and dissolve marble sealant) or generic scented soap water that leaves water marks within hours.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Indian homes face extreme mineral hardness from borewell supply, high ambient humidity during monsoons, and spice-rich cooking with turmeric and hot mustard oils.
            </p>
          </div>

          <div className="lg:col-span-7 bg-[#F8FAFA] p-8 rounded-3xl border border-slate-100 space-y-6">
            <h3 className="text-lg font-bold text-slate-900">
              Our 3 Core Scientific Principles:
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#E8F8F8] text-[#087F8C] flex items-center justify-center shrink-0 mt-0.5">
                  <Droplets size={18} />
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold">1. Sub-Surface Nano-Bonding</strong>
                  <p className="text-slate-600 mt-0.5">Instead of sitting on top like sticky wax, our silane formulas penetrate microscopic pores to create a breathable, oleophobic shield.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#E8F8F8] text-[#087F8C] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold">2. Zero Harsh Corrosive Acids</strong>
                  <p className="text-slate-600 mt-0.5">We strictly prohibit hydrochloric acid and chlorine bleach. All formulas are pH-calibrated and non-fuming.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#E8F8F8] text-[#087F8C] flex items-center justify-center shrink-0 mt-0.5">
                  <Heart size={18} />
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold">3. Toddler & Pet Safe</strong>
                  <p className="text-slate-600 mt-0.5">Once cured, our treated surfaces are non-toxic, food-contact safe, and gentle on home environments.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team / Laboratory Trust Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#087F8C] to-[#0AA1B2] text-white text-center max-w-4xl mx-auto space-y-6">
          <Award size={36} className="text-[#65D5D8] mx-auto" />
          <h3 className="text-2xl sm:text-3xl font-black">
            Made with Pride in Bengaluru, India
          </h3>
          <p className="text-xs sm:text-sm text-teal-50 max-w-xl mx-auto leading-relaxed">
            Formulated, tested, bottled, and packaged locally to support domestic chemical innovation and maintain strict quality standards.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-slate-900 hover:bg-slate-50 font-bold rounded-2xl text-xs sm:text-sm shadow-md transition"
            >
              <span>Explore Our Product Range</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
