import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Droplets,
  CheckCircle2,
  Star,
  Play,
  Layers,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { brandConfig } from '../../data/config';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const slides = [
    {
      id: 'bathroom',
      tag: 'BATHROOM & SHOWER GLASS',
      headline: 'India’s 1st Nano-Coating',
      highlight: 'For Surface Protection',
      description: 'Invisible hydrophobic nano-shield for glass shower partitions, taps, tiles & basins. Repels mineral limescale and soap scum for up to 180 days.',
      bgImage: 'https://www.invisel.in/cdn/shop/files/desktop_1440_x_580.jpg?v=1784298766&width=1600',
      badge: '180 Days Protection',
      icon: '🚿',
      productLink: '/product/bathroom-protector-kit'
    },
    {
      id: 'sofa',
      tag: 'SOFA & FABRIC UPHOLSTERY',
      headline: 'Liquid Spills Bead Up',
      highlight: '& Roll Off Instantly.',
      description: 'Breathable liquid repellent spray for sofas, dining chairs, rugs, and mattresses. Spilled tea, coffee, and water sit on top without absorbing.',
      bgImage: 'https://www.invisel.in/cdn/shop/files/Banner_03.jpg?v=1791117386&width=1600',
      badge: 'Zero Stain Absorption',
      icon: '🛋️',
      productLink: '/product/fabric-upholstery-nano-shield'
    },
    {
      id: 'marble',
      tag: 'MARBLE, WOOD & GRANITE',
      headline: 'Preserve Natural Beauty',
      highlight: 'Against Haldi, Oil & Stains.',
      description: 'Deep-penetrating oleophobic nano-barrier for Italian marble, kitchen countertops, and fine wooden furniture. Blocks stains while keeping natural texture.',
      bgImage: 'https://www.invisel.in/cdn/shop/files/02.jpg_1.jpg?v=1791440002&width=1600',
      badge: 'Food Safe & Non-Toxic',
      icon: '🍳',
      productLink: '/product/marble-granite-nano-guard'
    }
  ];

  // Auto-advance slides every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePosition({ x: x * 15, y: y * -15 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const active = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F9F9] via-[#F8FCFC] to-white py-6 sm:py-12 lg:py-16">
      {/* Background Ambience Glows */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#65D5D8]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-[30rem] h-[30rem] bg-[#087F8C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Surface Selector Tabs (Invisel Style) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 pb-6 sm:pb-8">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                currentSlide === idx
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/25 scale-105'
                  : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <span className="text-base">{s.icon}</span>
              <span>{s.tag.split('&')[0]}</span>
              {currentSlide === idx && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#65D5D8] animate-ping" />
              )}
            </button>
          ))}
        </div>

        {/* Main Grid: Content & 3D Interactive Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Dynamic Text Content with Smooth Transitions */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F8F8] border border-[#087F8C]/30 text-[#087F8C] text-xs font-black tracking-wider uppercase shadow-2xs">
              <Sparkles size={14} className="text-[#087F8C] animate-spin" style={{ animationDuration: '8s' }} />
              <span>{active.tag}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-[3.6rem] font-black tracking-tight text-slate-900 leading-[1.1] min-h-[110px] sm:min-h-[140px] flex flex-col justify-center">
                <span>{active.headline}</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#087F8C] via-[#0AA1B2] to-[#066670]">
                  {active.highlight}
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {active.description}
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <Link
                to={active.productLink}
                className="w-full sm:w-auto px-8 py-4 shimmer-btn text-white rounded-2xl text-sm sm:text-base font-bold shadow-xl shadow-[#087F8C]/25 hover:shadow-2xl hover:shadow-[#087F8C]/35 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Shop This Solution</span>
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full sm:w-auto px-6 py-4 bg-white/90 hover:bg-white text-slate-800 border border-slate-200/80 hover:border-slate-300 rounded-2xl text-sm sm:text-base font-bold transition-all duration-200 flex items-center justify-center gap-2.5 shadow-2xs hover:shadow-md cursor-pointer group"
              >
                <div className="w-6 h-6 rounded-full bg-[#E8F8F8] text-[#087F8C] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={11} className="fill-current ml-0.5" />
                </div>
                <span>Watch Hydrophobic Demo</span>
              </button>
            </div>

            {/* Social Proof Strip */}
            <div className="pt-4 border-t border-slate-200/60 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://images.unsplash.com/photo-${1534528741775 + i * 100}?auto=format&fit=crop&w=80&q=80`}
                      alt="Customer"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-2xs"
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
                  <span className="font-bold text-slate-900">4.9/5</span> (1,200+ Homes Protected)
                </div>
              </div>

              <div className="hidden sm:block h-5 w-px bg-slate-200" />

              <div className="flex items-center gap-1.5 font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>6 Months Shield Guarantee</span>
              </div>
            </div>

          </div>

          {/* RIGHT: 3D Transform Interactive Card Visual (Invisel Style) */}
          <div className="lg:col-span-6 relative perspective-1000">
            <div
              className="relative mx-auto max-w-md lg:max-w-none transition-transform duration-300 ease-out transform-style-3d"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg)`
              }}
            >
              
              {/* Main Showcase Glass Card with Exact Invisel Banner */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-teal-950/20 border-4 border-white bg-slate-900 aspect-[16/10] sm:aspect-[16/10] group">
                <img
                  src={active.bgImage}
                  alt={active.headline}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                />
                
                {/* High-Tech Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />

                {/* Hydrophobic Water Beading Simulation Overlay Indicator */}
                <div className="absolute top-4 left-4 glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-slate-800 shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping" />
                  <span>110° Water Repel Angle</span>
                </div>

                {/* Slide Controls (Previous / Next Arrows) */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                    aria-label="Previous Slide"
                    className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border border-white/20"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                    aria-label="Next Slide"
                    className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border border-white/20"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Bottom Card Specs */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs uppercase tracking-widest font-black text-[#65D5D8] flex items-center gap-1">
                      <Zap size={13} className="text-[#65D5D8]" />
                      <span>{active.badge}</span>
                    </span>
                    <span className="text-[11px] text-slate-300 font-medium">
                      0{currentSlide + 1} / 0{slides.length}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white/95 truncate">
                    Nano-Barrier Polymer Layer • Zero Scratches • Instant Bead-Off
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Top Right (Hydro-Shield) */}
              <div className="absolute -top-5 -right-3 sm:-right-5 glass-panel p-3.5 rounded-2xl shadow-xl border border-white/80 flex items-center gap-3 animate-float-slow z-20">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#087F8C] to-[#0AA1B2] text-white flex items-center justify-center shadow-md shadow-[#087F8C]/30 animate-water-bead">
                  <Droplets size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Hydrophobic Shield</h4>
                  <p className="text-[10px] font-semibold text-[#087F8C]">Liquid Repellent Barrier</p>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left (Nano Matrix) */}
              <div className="absolute -bottom-5 -left-3 sm:-left-5 glass-panel p-3.5 rounded-2xl shadow-xl border border-white/80 flex items-center gap-3 animate-float-reverse z-20">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">High TDS Tested</h4>
                  <p className="text-[10px] font-semibold text-emerald-700">Formulated for Indian Water</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Video Modal Demo */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#65D5D8]" />
                <h3 className="font-bold text-base">GharShine Hydrophobic Shield In Action</h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm font-bold bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="GharShine Hydro-Barrier Demonstration"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
