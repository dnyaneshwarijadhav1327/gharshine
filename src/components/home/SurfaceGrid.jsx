import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Droplets, Shield } from 'lucide-react';
import { surfaces } from '../../data/categories';

export const SurfaceGrid = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#F4F8F7]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#087F8C] text-xs font-black uppercase tracking-wider mb-2.5 border border-[#087F8C]/20 shadow-2xs">
              <Sparkles size={13} className="text-[#087F8C]" />
              <span>CUSTOM NANO-FORMULATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Protection For Every Surface
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              Engineered specifically for each porous and non-porous material in modern Indian homes.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-900 hover:text-white text-slate-800 rounded-2xl text-xs sm:text-sm font-black border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-300 group shrink-0 cursor-pointer"
          >
            <span>View All Surfaces</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3D Responsive Grid / Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {surfaces.map((s) => (
            <Link
              key={s.id}
              to={`/shop?surface=${s.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-2xs hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col relative card-3d-hover"
            >
              {/* Image with Water Droplet Overlay */}
              <div className="w-full aspect-[4/3] sm:aspect-square overflow-hidden bg-slate-900 relative">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-95"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* Surface Tag Badge */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg glass-panel text-[10px] font-bold text-slate-900 shadow-xs flex items-center gap-1">
                  <Droplets size={10} className="text-[#087F8C]" />
                  <span>Nano Guard</span>
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <span className="text-[10px] uppercase font-bold text-[#65D5D8] tracking-wider block">
                    Starting from
                  </span>
                  <span className="text-sm font-black">
                    ₹{s.startingPrice}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-[#087F8C] transition-colors line-clamp-1">
                    {s.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {s.description || 'Stain & liquid repellent formula'}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-black text-[#087F8C]">
                  <span>Explore Kit</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
