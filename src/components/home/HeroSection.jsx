import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'festive-coating',
      headlineTop: 'Iss baar ghar ki',
      headlineMid: 'cleaning ke sath,',
      headlineBot: 'coating bhi karo',
      badgeDiscount: '20% OFF',
      tagline: 'Clean Every Surface. Protect What Matters.',
      tiers: [
        { cart: 'Cart ₹2,000', save: 'Save ₹200' },
        { cart: 'Cart ₹2,500', save: 'Save ₹500' },
        { cart: 'Cart ₹4,000', save: 'Save ₹800' }
      ],
      ctaLink: '/shop',
      ctaText: 'Shop Coating Combos'
    },
    {
      id: 'bathroom-shield',
      headlineTop: 'Borewell Hard Water',
      headlineMid: 'stains se chutkara,',
      headlineBot: '6 mahine tak chamak',
      badgeDiscount: '30% OFF',
      tagline: 'Formulated for High-TDS Indian Water',
      tiers: [
        { cart: 'Bathroom Kit', save: 'Save ₹700' },
        { cart: '2x Shield Pack', save: 'Save ₹1,200' },
        { cart: 'Full Home Set', save: 'Save ₹1,800' }
      ],
      ctaLink: '/product/bathroom-protector-kit',
      ctaText: 'Get Bathroom Shield'
    },
    {
      id: 'sofa-fabric',
      headlineTop: 'Chai, Coffee & Spills',
      headlineMid: 'ab daag nahi banenge,',
      headlineBot: 'liquid beads up & rolls off',
      badgeDiscount: '15% OFF',
      tagline: 'Invisible Hydrophobic Shield for Sofas & Upholstery',
      tiers: [
        { cart: '1 Sofa Spray', save: 'Save ₹150' },
        { cart: 'Living Room Set', save: 'Save ₹450' },
        { cart: 'Mega Protector', save: 'Save ₹850' }
      ],
      ctaLink: '/product/fabric-upholstery-nano-shield',
      ctaText: 'Protect Your Sofa'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#F7EFE8] via-[#FAF6F0] to-[#F3ECE4] select-none border-b border-amber-100">
      
      {/* Background Lighting & Festive Indian Decor Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.35),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(8,127,140,0.15),transparent_40%)]" />

      {/* Side Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        aria-label="Previous Banner"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-lg bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/20"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        aria-label="Next Banner"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-lg bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/20"
      >
        <ChevronRight size={22} />
      </button>

      {/* Main Banner Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        
        {/* Top Floating Catchy Slogan */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <p className="text-base sm:text-2xl md:text-3xl font-medium text-slate-800 tracking-wide">
            {slide.headlineTop}
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#8B261D] tracking-tight leading-none mt-1">
            <span className="italic font-serif font-bold text-amber-900">{slide.headlineMid}</span>{' '}
            <span className="italic font-serif font-black text-[#A82218]">{slide.headlineBot}</span>
          </h1>
        </div>

        {/* 3-Column Banner Composition (Exact Invisel Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* LEFT: Discount Badge & Cart Tiers */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start justify-center order-2 lg:order-1 space-y-4">
            
            {/* Starburst GET 20% OFF Badge */}
            <div className="relative inline-flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#A82218] to-[#78140D] text-white flex flex-col items-center justify-center p-2 shadow-2xl border-4 border-dashed border-amber-300 transform -rotate-6 animate-pulse-subtle">
                <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-amber-200">GET</span>
                <span className="text-xl sm:text-2xl font-black leading-none text-white">{slide.badgeDiscount}</span>
                <span className="text-xs sm:text-sm font-extrabold text-amber-200">OFF</span>
              </div>
            </div>

            {/* Cart Tier Save Pills */}
            <div className="space-y-2.5 w-full max-w-xs">
              {slide.tiers.map((tier, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-amber-200/80 shadow-xs"
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

          {/* CENTER: The 3 GharShine 3D Aerosol Cans with Real Custom Labels */}
          <div className="lg:col-span-6 flex items-center justify-center order-1 lg:order-2 py-4">
            <div className="relative flex items-end justify-center gap-2 sm:gap-4 max-w-md mx-auto">
              
              {/* Bottle 1: Cyan/Teal Hard Water Stain Remover */}
              <div className="flex flex-col items-center group card-3d-hover transform transition-all duration-300 hover:scale-105">
                <div className="relative w-24 sm:w-32 md:w-36 h-64 sm:h-80 md:h-92 rounded-3xl bg-gradient-to-b from-slate-200 via-white to-slate-200 shadow-2xl border-2 border-slate-300/80 overflow-hidden flex flex-col justify-between p-2 sm:p-3 text-center">
                  {/* Can Top Nozzle */}
                  <div className="w-6 sm:w-8 h-3 sm:h-4 bg-red-600 rounded-t-sm mx-auto shadow-inner" />
                  
                  {/* Bottle Label */}
                  <div className="my-auto space-y-1.5">
                    <span className="text-xs sm:text-sm font-black text-[#087F8C] tracking-tight block">
                      GharShine
                    </span>
                    <span className="text-[7px] sm:text-[9px] uppercase font-bold tracking-widest text-slate-500 block">
                      THE MAGIC OF NANO-SHIELD
                    </span>
                    
                    <div className="bg-[#087F8C] text-white py-1 sm:py-1.5 px-1 rounded-md">
                      <h3 className="text-[9px] sm:text-xs font-black uppercase leading-tight">
                        HARD WATER
                      </h3>
                      <p className="text-[7px] sm:text-[9px] font-bold text-teal-100">
                        STAIN REMOVER
                      </p>
                    </div>

                    <span className="text-[7px] sm:text-[8px] font-bold text-slate-600 uppercase block">
                      Active Foam Formulation
                    </span>
                  </div>

                  {/* Bottle Bottom Features */}
                  <div className="text-[7px] sm:text-[8px] text-slate-500 border-t border-slate-200 pt-1">
                    <span>500ml • Borewell TDS Safe</span>
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-700 mt-2">Hard Water Remover</span>
              </div>

              {/* Bottle 2: Blue Glass & Tile Stain Repellent (Center Hero) */}
              <div className="flex flex-col items-center group card-3d-hover transform transition-all duration-300 hover:scale-110 z-10 -translate-y-2">
                <div className="relative w-26 sm:w-34 md:w-40 h-72 sm:h-88 md:h-96 rounded-3xl bg-gradient-to-b from-slate-100 via-white to-slate-200 shadow-2xl border-2 border-teal-400 overflow-hidden flex flex-col justify-between p-2 sm:p-3 text-center ring-4 ring-[#087F8C]/10">
                  {/* Can Top Nozzle */}
                  <div className="w-6 sm:w-8 h-3 sm:h-4 bg-red-600 rounded-t-sm mx-auto shadow-inner" />
                  
                  {/* Bottle Label */}
                  <div className="my-auto space-y-1.5">
                    <span className="text-sm sm:text-base font-black text-[#087F8C] tracking-tight block">
                      GharShine
                    </span>
                    <span className="text-[7px] sm:text-[9px] uppercase font-bold tracking-widest text-slate-500 block">
                      THE MAGIC OF NANO-SHIELD
                    </span>
                    
                    <div className="bg-gradient-to-r from-[#087F8C] to-[#0AA1B2] text-white py-1.5 px-1 rounded-md shadow-xs">
                      <h3 className="text-[9px] sm:text-xs font-black uppercase leading-tight">
                        Glass & Tile
                      </h3>
                      <p className="text-[7px] sm:text-[9px] font-bold text-teal-100">
                        Stain Repellent (PROTECTS)
                      </p>
                    </div>

                    <span className="text-[7px] sm:text-[8px] font-black text-emerald-600 uppercase block">
                      180 Days Hydro-Barrier
                    </span>
                  </div>

                  {/* Bottle Bottom Features */}
                  <div className="text-[7px] sm:text-[8px] text-slate-500 border-t border-slate-200 pt-1">
                    <span>250ml • 110° Water Beading</span>
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs font-black text-[#087F8C] mt-2">Glass & Tile Nano-Shield</span>
              </div>

              {/* Bottle 3: Purple Marble & Granite Stain Repellent */}
              <div className="flex flex-col items-center group card-3d-hover transform transition-all duration-300 hover:scale-105">
                <div className="relative w-24 sm:w-32 md:w-36 h-64 sm:h-80 md:h-92 rounded-3xl bg-gradient-to-b from-slate-200 via-white to-slate-200 shadow-2xl border-2 border-purple-300/80 overflow-hidden flex flex-col justify-between p-2 sm:p-3 text-center">
                  {/* Can Top Nozzle */}
                  <div className="w-6 sm:w-8 h-3 sm:h-4 bg-red-600 rounded-t-sm mx-auto shadow-inner" />
                  
                  {/* Bottle Label */}
                  <div className="my-auto space-y-1.5">
                    <span className="text-xs sm:text-sm font-black text-purple-900 tracking-tight block">
                      GharShine
                    </span>
                    <span className="text-[7px] sm:text-[9px] uppercase font-bold tracking-widest text-slate-500 block">
                      THE MAGIC OF NANO-SHIELD
                    </span>
                    
                    <div className="bg-purple-900 text-white py-1 sm:py-1.5 px-1 rounded-md">
                      <h3 className="text-[9px] sm:text-xs font-black uppercase leading-tight">
                        Marble & Granite
                      </h3>
                      <p className="text-[7px] sm:text-[9px] font-bold text-purple-200">
                        Stain Repellent (PROTECTS)
                      </p>
                    </div>

                    <span className="text-[7px] sm:text-[8px] font-bold text-slate-600 uppercase block">
                      Haldi & Oil Defense
                    </span>
                  </div>

                  {/* Bottle Bottom Features */}
                  <div className="text-[7px] sm:text-[8px] text-slate-500 border-t border-slate-200 pt-1">
                    <span>250ml • Food Contact Safe</span>
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-700 mt-2">Marble & Granite Guard</span>
              </div>

            </div>
          </div>

          {/* RIGHT: Big SAVE UP TO ₹800 Graphic & Festive Diyas */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center order-3 text-center lg:text-right space-y-4">
            
            {/* 3D SAVE UP TO ₹800 Block */}
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
                ⚡ Ready to Dispatch • Free Delivery Above ₹999
              </span>
            </div>

          </div>

        </div>

        {/* Carousel Slide Dots Indicator */}
        <div className="flex items-center justify-center gap-2 pt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === i ? 'w-8 bg-slate-900' : 'w-2.5 bg-slate-400/60 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
