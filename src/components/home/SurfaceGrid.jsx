import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { surfaces } from '../../data/categories';

export const SurfaceGrid = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#F4F8F7]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-2.5 border border-teal-100 shadow-2xs">
              <Sparkles size={13} />
              <span>Targeted Formulations</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Care for Every Surface
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Find the scientifically calibrated solution for every material in your home.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#087F8C] hover:text-[#066670] transition group shrink-0"
          >
            <span>View All Surfaces</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Horizontal Carousel on Mobile / Grid on Desktop */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto no-scrollbar pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {surfaces.map((s) => (
            <Link
              key={s.id}
              to={`/shop?surface=${s.slug}`}
              className="group min-w-[200px] sm:min-w-0 bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] overflow-hidden bg-slate-100 relative">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
              </div>

              {/* Details */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#087F8C] transition-colors truncate">
                    {s.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    From ₹{s.startingPrice}
                  </span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-[#087F8C]">
                  <span>Explore</span>
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
