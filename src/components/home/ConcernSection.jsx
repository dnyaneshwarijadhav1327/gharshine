import React from 'react';
import { Link } from 'react-router-dom';

const homeConcerns = [
  {
    id: 'hard-water-stains',
    title: 'Hard Water Stains',
    subtitle: 'Your shower glass turns white within weeks. No matter how hard you scrub.',
    image: '/images/concern-shower-glass.jpg',
    link: '/shop?concern=hard-water-stains'
  },
  {
    id: 'sofa-spills-stains',
    title: 'Sofa Spills & Stains',
    subtitle: "One food spill on a light sofa. Now it's a permanent reminder.",
    image: '/images/concern-sofa-spills.jpg',
    link: '/shop?concern=sofa-fabric-stains'
  },
  {
    id: 'oil-moisture-damage',
    title: 'Oil & Moisture Damage',
    subtitle: 'Backsplash tiles, countertops & wood go dull from daily cooking.',
    image: '/images/concern-kitchen-tiles.jpg',
    link: '/shop?concern=wood-water-rings'
  },
  {
    id: 'permanent-surface-damage',
    title: 'Permanent Surface Damage',
    subtitle: "Marble stains don't go away. Once the damage is done, it's done.",
    image: '/images/concern-marble-counter.jpg',
    link: '/shop?concern=marble-etching'
  }
];

export const ConcernSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
            What Indian Homes Go Through Every Day
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {homeConcerns.map((item) => (
            <div key={item.id} className="flex flex-col group">
              {/* Image Card */}
              <Link
                to={item.link}
                className="relative aspect-[3/4] sm:aspect-[9/13] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-5 sm:p-6 bg-slate-100"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Subtle gradient at bottom for clear text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Card Text Content */}
                <div className="relative z-10 text-center space-y-1.5 sm:space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-normal">
                    {item.subtitle}
                  </p>
                </div>
              </Link>

              {/* Shop Now Button Below Card */}
              <Link
                to={item.link}
                className="mt-3.5 w-full py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl bg-[#EEF9D8] hover:bg-[#E2F5C4] active:scale-[0.98] text-[#087F8C] font-black text-sm sm:text-[15px] tracking-wide text-center transition-all duration-200 shadow-xs block"
              >
                Shop Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

