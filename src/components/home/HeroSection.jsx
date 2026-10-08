import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Droplets,
  Star,
  CheckCircle2,
  Zap,
  Gift
} from 'lucide-react';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'festive-coating-save800',
      type: 'festive',
      headlineTop: 'Iss baar Diwali',
      headlineMid: 'cleaning ke sath,',
      headlineBot: 'coating bhi karo',
      badgeDiscount: '20% OFF',
      tiers: [
        { cart: 'Cart ₹2,000', save: 'Save ₹200' },
        { cart: 'Cart ₹2,500', save: 'Save ₹500' },
        { cart: 'Cart ₹4,000', save: 'Save ₹800' }
      ],
      ctaLink: '/shop',
      ctaText: 'Shop Coating Combos'
    },
    {
      id: 'stop-cleaning-protect',
      type: 'modern-living',
      headlineTop: 'Stop Cleaning Your Home.',
      headlineMid: 'Start Protecting It.',
      description: 'Engineered nano-coatings for spotless, protected home surfaces across India.',
      ctaLink: '/shop',
      ctaText: 'Explore Combo'
    },
    {
      id: 'diwali-gift-box',
      type: 'puja-brass',
      headlineTop: 'ये दिवाली GharShine वाली !',
      headlineMid: 'Aabse har Diwali cleaning me,',
      headlineBot: 'GharShine ka coating!',
      subtitle: '*Order before October 28 for delivery before Dhanteras',
      ctaLink: '/shop',
      ctaText: 'Get Yours Now'
    },
    {
      id: 'bundle-flat-1999',
      type: 'trolley-bundle',
      badge: 'Choose any 6 products',
      price: '₹1,999/-',
      flatText: 'FLAT',
      headline: 'Build your own Bundle.',
      subtitle: 'Pick any 2 protectors, cleaners, accessories + FREE GIFTS inside',
      ctaLink: '/combo-builder',
      ctaText: 'Build Your Bundle'
    }
  ];

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden select-none border-b border-amber-100">
      
      {/* Side Arrow Navigation Buttons */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        aria-label="Previous Banner"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-lg bg-black/40 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/20 shadow-lg"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        aria-label="Next Banner"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-lg bg-black/40 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/20 shadow-lg"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide 1: Exact Festive Diwali Coating Banner */}
      {currentSlide === 0 && (
        <div className="relative w-full bg-gradient-to-r from-[#F7EFE8] via-[#FAF6F0] to-[#F3ECE4] py-8 sm:py-14 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Top Slogan */}
            <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
              <p className="text-lg sm:text-2xl md:text-3xl font-serif text-slate-800 tracking-wide font-medium">
                {slide.headlineTop}
              </p>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#8B261D] tracking-tight leading-none mt-1">
                <span className="italic font-serif font-bold text-amber-900">{slide.headlineMid}</span>{' '}
                <span className="italic font-serif font-black text-[#A82218]">{slide.headlineBot}</span>
              </h1>
            </div>

            {/* 3-Column Banner Composition */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* LEFT: GET 20% OFF & Cart Tiers */}
              <div className="lg:col-span-3 flex flex-col items-center lg:items-start justify-center space-y-4">
                
                {/* Starburst GET 20% OFF Badge */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#A82218] to-[#78140D] text-white flex flex-col items-center justify-center p-2 shadow-2xl border-4 border-dashed border-amber-300 transform -rotate-6 animate-pulse-subtle">
                  <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-amber-200">GET</span>
                  <span className="text-xl sm:text-2xl font-black leading-none text-white">{slide.badgeDiscount}</span>
                  <span className="text-xs sm:text-sm font-extrabold text-amber-200">OFF</span>
                </div>

                {/* Cart Tier Save Pills */}
                <div className="space-y-2.5 w-full max-w-xs">
                  {slide.tiers.map((tier, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-amber-200/80 shadow-xs"
                    >
                      <span className="text-xs sm:text-sm font-bold text-slate-800">{tier.cart}</span>
                      <span className="px-3 py-1 rounded-md bg-[#A82218] text-white text-xs sm:text-sm font-black shadow-xs">
                        {tier.save}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to={slide.ctaLink}
                  className="mt-2 w-full max-w-xs py-3.5 px-6 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl font-black text-xs sm:text-sm shadow-lg shadow-[#087F8C]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShoppingBag size={16} />
                  <span>{slide.ctaText}</span>
                </Link>
              </div>

              {/* CENTER: 3 3D GharShine Cans (Branded GharShine) */}
              <div className="lg:col-span-6 flex items-center justify-center py-4">
                <div className="relative flex items-end justify-center gap-2 sm:gap-4 max-w-md mx-auto">
                  
                  {/* Bottle 1: Cyan Hard Water Stain Remover */}
                  <div className="flex flex-col items-center group card-3d-hover transform transition-all duration-300 hover:scale-105">
                    <div className="relative w-24 sm:w-32 md:w-36 h-64 sm:h-80 md:h-92 rounded-3xl bg-gradient-to-b from-slate-200 via-white to-slate-200 shadow-2xl border-2 border-slate-300 overflow-hidden flex flex-col justify-between p-2 sm:p-3 text-center">
                      <div className="w-6 sm:w-8 h-3.5 bg-red-600 rounded-t-sm mx-auto shadow-inner" />
                      
                      <div className="my-auto space-y-1">
                        <span className="text-sm sm:text-base font-black text-[#087F8C] tracking-tight block">
                          Ghar<span className="text-slate-900">Shine</span>
                        </span>
                        <span className="text-[7px] sm:text-[8px] uppercase font-bold tracking-widest text-slate-500 block">
                          THE MAGIC OF NANO-COATINGS
                        </span>
                        
                        <div className="bg-[#087F8C] text-white py-1 sm:py-1.5 px-1 rounded-md shadow-xs">
                          <h3 className="text-[8px] sm:text-[11px] font-black uppercase leading-tight">
                            HARD WATER
                          </h3>
                          <p className="text-[7px] sm:text-[9px] font-bold text-teal-100">
                            STAIN REMOVER
                          </p>
                        </div>

                        <span className="text-[7px] sm:text-[8px] font-bold text-slate-600 uppercase block">
                          ACTIVE FOAM FORMULATION
                        </span>
                      </div>

                      <div className="text-[7px] sm:text-[8px] text-slate-500 border-t border-slate-200 pt-1 font-semibold">
                        <span>Net Vol: 500ml</span>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-700 mt-2">Hard Water Remover</span>
                  </div>

                  {/* Bottle 2: Blue Glass & Tile Stain Repellent (Center Hero) */}
                  <div className="flex flex-col items-center group card-3d-hover transform transition-all duration-300 hover:scale-110 z-10 -translate-y-2">
                    <div className="relative w-26 sm:w-34 md:w-40 h-72 sm:h-88 md:h-96 rounded-3xl bg-gradient-to-b from-slate-100 via-white to-slate-200 shadow-2xl border-2 border-[#087F8C] overflow-hidden flex flex-col justify-between p-2 sm:p-3 text-center ring-4 ring-[#087F8C]/15">
                      <div className="w-6 sm:w-8 h-3.5 bg-red-600 rounded-t-sm mx-auto shadow-inner" />
                      
                      <div className="my-auto space-y-1">
                        <span className="text-base sm:text-lg font-black text-[#087F8C] tracking-tight block">
                          Ghar<span className="text-slate-900">Shine</span>
                        </span>
                        <span className="text-[7px] sm:text-[8px] uppercase font-bold tracking-widest text-slate-500 block">
                          THE MAGIC OF NANO-COATINGS
                        </span>
                        
                        <div className="bg-gradient-to-r from-[#087F8C] to-[#0AA1B2] text-white py-1.5 px-1 rounded-md shadow-xs">
                          <h3 className="text-[9px] sm:text-xs font-black uppercase leading-tight">
                            Glass & Tile
                          </h3>
                          <p className="text-[7px] sm:text-[9px] font-bold text-teal-100">
                            Stain Repellent
                          </p>
                        </div>

                        <span className="text-[7px] sm:text-[8px] font-black text-emerald-600 uppercase block">
                          PROTECTS • 180 DAYS
                        </span>
                      </div>

                      <div className="text-[7px] sm:text-[8px] text-slate-500 border-t border-slate-200 pt-1 font-semibold">
                        <span>250ml • Hydrophobic Shield</span>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-black text-[#087F8C] mt-2">Glass & Tile Nano-Shield</span>
                  </div>

                  {/* Bottle 3: Purple Marble & Granite Stain Repellent */}
                  <div className="flex flex-col items-center group card-3d-hover transform transition-all duration-300 hover:scale-105">
                    <div className="relative w-24 sm:w-32 md:w-36 h-64 sm:h-80 md:h-92 rounded-3xl bg-gradient-to-b from-slate-200 via-white to-slate-200 shadow-2xl border-2 border-purple-300 overflow-hidden flex flex-col justify-between p-2 sm:p-3 text-center">
                      <div className="w-6 sm:w-8 h-3.5 bg-red-600 rounded-t-sm mx-auto shadow-inner" />
                      
                      <div className="my-auto space-y-1">
                        <span className="text-sm sm:text-base font-black text-purple-900 tracking-tight block">
                          Ghar<span className="text-slate-900">Shine</span>
                        </span>
                        <span className="text-[7px] sm:text-[8px] uppercase font-bold tracking-widest text-slate-500 block">
                          THE MAGIC OF NANO-COATINGS
                        </span>
                        
                        <div className="bg-purple-900 text-white py-1 sm:py-1.5 px-1 rounded-md shadow-xs">
                          <h3 className="text-[8px] sm:text-[11px] font-black uppercase leading-tight">
                            Marble & Granite
                          </h3>
                          <p className="text-[7px] sm:text-[9px] font-bold text-purple-200">
                            Stain Repellent
                          </p>
                        </div>

                        <span className="text-[7px] sm:text-[8px] font-bold text-slate-600 uppercase block">
                          PROTECTS • OIL & HALDI
                        </span>
                      </div>

                      <div className="text-[7px] sm:text-[8px] text-slate-500 border-t border-slate-200 pt-1 font-semibold">
                        <span>250ml • Natural Stone Safe</span>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-700 mt-2">Marble & Granite Guard</span>
                  </div>

                </div>
              </div>

              {/* RIGHT: SAVE UP TO ₹800 Block */}
              <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center text-center lg:text-right space-y-4">
                <div className="space-y-0.5">
                  <span className="text-lg sm:text-2xl font-black uppercase tracking-wider text-[#A82218] block drop-shadow-xs">
                    SAVE UP TO
                  </span>
                  <span className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#A82218] tracking-tighter leading-none block drop-shadow-md">
                    ₹800
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-700 max-w-xs">
                  Combo packs with free microfiber application kit included.
                </p>

                <div className="pt-2 flex items-center justify-center lg:justify-end gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-extrabold text-emerald-800">
                    ⚡ Fast Dispatch Across India
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Slide 2: Modern Living Room Hero */}
      {currentSlide === 1 && (
        <div className="relative w-full bg-gradient-to-r from-[#F4F8F7] via-white to-[#F0F7F7] py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-black uppercase tracking-wider shadow-2xs">
                  <Sparkles size={14} className="text-[#087F8C]" />
                  <span>100% NANO-COATING TECHNOLOGY</span>
                </div>
                
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                  Stop Cleaning Your Home.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#087F8C] to-[#0AA1B2] block mt-1">
                    Start Protecting It.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
                  {slide.description}
                </p>

                <div className="pt-2">
                  <Link
                    to={slide.ctaLink}
                    className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#F2C94C] hover:bg-[#E5BD3B] text-slate-950 rounded-2xl font-black text-base shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Bottles Display */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md shadow-2xl border border-white flex items-center justify-center gap-3">
                  <div className="w-24 sm:w-28 h-60 rounded-2xl bg-teal-50 border-2 border-teal-200 p-2 flex flex-col justify-between text-center">
                    <span className="text-[10px] font-black text-[#087F8C]">GharShine</span>
                    <span className="text-xs font-bold text-teal-900">Glass & Tile</span>
                    <span className="text-[8px] text-teal-600 font-bold">180 Days</span>
                  </div>
                  <div className="w-28 sm:w-32 h-68 rounded-2xl bg-[#087F8C] text-white p-2.5 flex flex-col justify-between text-center shadow-lg -translate-y-2">
                    <span className="text-xs font-black">GharShine</span>
                    <span className="text-xs sm:text-sm font-black">Hard Water Remover</span>
                    <span className="text-[9px] text-teal-200 font-bold">Active Foam</span>
                  </div>
                  <div className="w-24 sm:w-28 h-60 rounded-2xl bg-purple-50 border-2 border-purple-200 p-2 flex flex-col justify-between text-center">
                    <span className="text-[10px] font-black text-purple-900">GharShine</span>
                    <span className="text-xs font-bold text-purple-900">Marble & Granite</span>
                    <span className="text-[8px] text-purple-600 font-bold">Haldi Guard</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Slide 3: Ye Diwali GharShine Wali */}
      {currentSlide === 2 && (
        <div className="relative w-full bg-gradient-to-r from-[#F7EAE3] via-[#FAF2EC] to-[#F3E3D9] py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h1 className="text-4xl sm:text-6xl font-black text-[#8B261D] tracking-tight">
                ये दिवाली <span className="text-[#087F8C]">GharShine</span> वाली !
              </h1>
              <p className="text-lg sm:text-2xl font-serif text-slate-800 font-medium">
                {slide.headlineMid}{' '}
                <span className="font-bold text-[#087F8C]">{slide.headlineBot}</span>
              </p>
              
              <div className="pt-3">
                <Link
                  to={slide.ctaLink}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#A82218] hover:bg-[#8B1A12] text-white rounded-2xl font-black text-base shadow-xl transition-all cursor-pointer"
                >
                  <Gift size={18} />
                  <span>{slide.ctaText}</span>
                </Link>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-500 pt-2">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Slide 4: Choose any 6 products @just ₹1,999 FLAT */}
      {currentSlide === 3 && (
        <div className="relative w-full bg-gradient-to-r from-[#0E83D8] via-[#1090E6] to-[#0A70BE] text-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
                <span className="text-xl sm:text-3xl font-bold text-white block">
                  {slide.badge}
                </span>

                <div className="flex items-baseline justify-center lg:justify-start gap-3">
                  <span className="text-xs sm:text-sm font-bold text-white/80">@just</span>
                  <span className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#F4ED22] tracking-tight drop-shadow-md">
                    {slide.price}
                  </span>
                  <span className="text-2xl sm:text-4xl font-black text-white">
                    {slide.flatText}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {slide.headline}
                </h2>
                <p className="text-sm sm:text-base text-white/90 max-w-lg">
                  {slide.subtitle}
                </p>

                <div className="pt-3">
                  <Link
                    to={slide.ctaLink}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0E83D8] hover:bg-slate-100 rounded-2xl font-black text-base shadow-2xl transition-all cursor-pointer"
                  >
                    <ShoppingBag size={18} />
                    <span>{slide.ctaText}</span>
                  </Link>
                </div>
              </div>

              {/* Right Visual Graphic */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#F4ED22] text-slate-900 flex items-center justify-center mx-auto shadow-xl">
                    <Gift size={32} />
                  </div>
                  <h3 className="text-xl font-black text-white">GharShine Mega Combo</h3>
                  <p className="text-xs text-white/80">6 Protectors + Microfiber Applicator Cloths + Free Shipping</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Carousel Indicator Dots */}
      <div className="absolute bottom-3 sm:bottom-4 inset-x-0 z-20 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-sm ${
              currentSlide === i ? 'w-8 bg-slate-900 ring-2 ring-white' : 'w-2.5 bg-slate-800/40 hover:bg-slate-800/70'
            }`}
          />
        ))}
      </div>

    </section>
  );
};
