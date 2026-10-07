import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { rooms } from '../../data/categories';
import { formatPrice } from '../../utils/formatters';

export const RoomWiseSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles size={13} />
            <span>Complete House Coverage</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Protect Your Home, Room by Room
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Targeted surface bundles curated for the unique cleaning and wear demands of every living space.
          </p>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Link
              key={room.id}
              to={`/shop?room=${room.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Room Image */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold">{room.title}</h3>
                  <span className="text-xs text-slate-200 line-clamp-1">{room.subtitle}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-slate-800">{room.kitName}</span>
                    <span className="font-bold text-[#087F8C]">From {formatPrice(room.startingPrice)}</span>
                  </div>

                  {/* Included Surface Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {room.includedSurfaces.map((surf, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#F4F8F7] text-slate-600 text-[11px] font-medium"
                      >
                        {surf}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#087F8C]">
                  <span>Shop {room.title} Solutions</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
