import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { concerns } from '../../data/categories';

export const ConcernSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} />
            <span>Problem-Based Surface Care</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Everyday Problems.{' '}
            <span className="text-[#087F8C]">Smarter Solutions.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
            From stubborn borewell hard-water marks to turmeric spills on marble, protect the surfaces that matter most.
          </p>
        </div>

        {/* Concern Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {concerns.map((c) => (
            <Link
              key={c.id}
              to={`/shop?concern=${c.slug}`}
              className="group relative h-80 sm:h-96 rounded-[20px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 border border-slate-100"
            >
              {/* Background Image with Zoom */}
              <img
                src={c.image}
                alt={c.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Overlay for Crisp Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              {/* Top Badge */}
              {c.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-900 shadow-sm">
                    {c.badge}
                  </span>
                </div>
              )}

              {/* Bottom Content */}
              <div className="relative z-10 space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#65D5D8] transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed">
                  {c.subtitle}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-bold text-[#65D5D8] group-hover:translate-x-1 transition-transform">
                  <span>Explore Solution</span>
                  <ArrowRight size={15} />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
