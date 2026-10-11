import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { productService } from '../../services/productService';

const defaultConcerns = [
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
  const scrollContainerRef = useRef(null);
  const [concerns, setConcerns] = useState(defaultConcerns);

  useEffect(() => {
    let isMounted = true;
    productService.getProducts().then((res) => {
      if (!isMounted) return;
      if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        // Link cards to live Shopify products if matched
        const updated = defaultConcerns.map((c) => {
          const match = res.data.find((p) => {
            const pName = (p.name || '').toLowerCase();
            const pSlug = (p.slug || '').toLowerCase();
            if (c.id === 'hard-water-stains') return pSlug.includes('glass-tile') || pName.includes('hard water');
            if (c.id === 'sofa-spills-stains') return pSlug.includes('sofa') || pName.includes('sofa');
            if (c.id === 'oil-moisture-damage') return pSlug.includes('kitchen') || pName.includes('kitchen');
            return false;
          });
          if (match) {
            return {
              ...c,
              link: `/product/${match.slug}`
            };
          }
          return c;
        });

        // Add any extra products from Shopify added to a "Concerns" collection or tagged "concern"
        const extraConcernProducts = res.data.filter((p) => {
          const cols = (p.collectionTitles || []).join(' ').toLowerCase();
          const tags = (p.tags || []).join(' ').toLowerCase();
          return cols.includes('concern') || tags.includes('concern');
        });

        if (extraConcernProducts.length > 0) {
          const extraCards = extraConcernProducts.map((p, idx) => ({
            id: `custom-concern-${p.id || idx}`,
            title: p.name,
            subtitle: p.shortDescription || 'Deep clean + long-lasting protection for glass, marble & bathroom fittings.',
            image: p.thumbnail || p.images?.[0] || '/images/concern-shower-glass.jpg',
            link: `/product/${p.slug}`
          }));
          // Place live Shopify concern products at the FRONT so they are immediately visible!
          setConcerns([...extraCards, ...updated]);
        } else {
          setConcerns(updated);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Section Header with Left / Right arrows */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
              What Indian Homes Go Through Every Day
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Common household stains & permanent surface damage solved
            </p>
          </div>

          {/* Left / Right Scroll Buttons (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={scrollLeft}
              aria-label="Scroll Left"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 flex items-center justify-center transition shadow-xs"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll Right"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 flex items-center justify-center transition shadow-xs"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel (Manual Right-to-Left Scroll, NO Auto-Scrolling) */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-5 overflow-x-auto scroll-smooth pb-4 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {concerns.map((item) => (
            <div
              key={item.id}
              className="w-[285px] sm:w-[320px] md:w-[340px] shrink-0 flex flex-col group"
            >
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
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-normal line-clamp-2">
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


