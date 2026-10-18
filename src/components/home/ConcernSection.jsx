import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { productService } from '../../services/productService';

const defaultConcerns = [
  {
    id: 'hard-water-stains',
    num: '01',
    title: 'Hard Water Stains',
    subtitle: 'Your shower glass turns white within weeks. No matter how hard you scrub.',
    image: '/images/concern-shower-glass.jpg',
    link: '/shop?concern=hard-water-stains'
  },
  {
    id: 'sofa-spills-stains',
    num: '02',
    title: 'Sofa Spills & Stains',
    subtitle: "One food spill on a light sofa. Now it's a permanent reminder.",
    image: '/images/concern-sofa-spills.jpg',
    link: '/shop?concern=sofa-fabric-stains'
  },
  {
    id: 'oil-moisture-damage',
    num: '03',
    title: 'Oil & Moisture Damage',
    subtitle: 'Backsplash tiles, countertops & wood go dull from daily cooking.',
    image: '/images/concern-kitchen-tiles.jpg',
    link: '/shop?concern=wood-water-rings'
  },
  {
    id: 'permanent-surface-damage',
    num: '04',
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
        // Link each of the 4 problem cards directly to its respective live Shopify product
        const updated = defaultConcerns.map((c) => {
          // Priority 1: Match by explicit Shopify Collection or Tag
          let match = res.data.find((p) => {
            const cols = (p.collectionTitles || []).join(' ').toLowerCase();
            const tags = (p.tags || []).join(' ').toLowerCase();

            // 1. Shower Glass Card -> Collection or Tag: "hard water" or "glass"
            if (c.id === 'hard-water-stains') {
              return (
                cols.includes('hard water') ||
                cols.includes('hard-water') ||
                cols.includes('glass') ||
                tags.includes('hard-water') ||
                tags.includes('hard water') ||
                tags.includes('glass')
              );
            }

            // 2. Sofa Card -> Collection or Tag: "sofa" or "fabric"
            if (c.id === 'sofa-spills-stains') {
              return (
                cols.includes('sofa') ||
                cols.includes('fabric') ||
                tags.includes('sofa') ||
                tags.includes('fabric')
              );
            }

            // 3. Kitchen Tiles Card -> Collection or Tag: "kitchen" or "tiles"
            if (c.id === 'oil-moisture-damage') {
              return (
                cols.includes('kitchen') ||
                cols.includes('tile') ||
                tags.includes('kitchen') ||
                tags.includes('tile')
              );
            }

            // 4. Marble Surface Damage Card -> Collection or Tag: "marble" or "stone"
            if (c.id === 'permanent-surface-damage') {
              return (
                cols.includes('marble') ||
                cols.includes('stone') ||
                tags.includes('marble') ||
                tags.includes('stone')
              );
            }

            return false;
          });

          // Priority 2: Fallback to title/slug keyword matching if no explicit collection set
          if (!match) {
            match = res.data.find((p) => {
              const pName = (p.name || '').toLowerCase();
              const pSlug = (p.slug || '').toLowerCase();

              if (c.id === 'hard-water-stains') {
                return (
                  pSlug.includes('bathroom-protector') ||
                  pName.includes('bathroom protector') ||
                  pSlug.includes('glass-tile') ||
                  pName.includes('hard water')
                );
              }

              if (c.id === 'sofa-spills-stains') {
                return pSlug.includes('sofa') || pName.includes('sofa');
              }

              if (c.id === 'oil-moisture-damage') {
                return pSlug.includes('kitchen') || pName.includes('kitchen');
              }

              if (c.id === 'permanent-surface-damage') {
                return pName.includes('marble') || pSlug.includes('marble');
              }

              return false;
            });
          }

          if (match) {
            return {
              ...c,
              link: `/product/${match.slug}`
            };
          }
          return c;
        });

        // Keep the exact 4 problem cards on the front page, now linked to their respective products
        setConcerns(updated);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -310, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 310, behavior: 'smooth' });
    }
  };

  const primaryConcern = concerns[0];
  const secondaryConcerns = concerns.slice(1);

  return (
    <section className="relative py-12 sm:py-20 bg-gradient-to-br from-[#F5F1FF] via-[#F2EDFF] to-[#EDE6FF] overflow-hidden">
      {/* Subtle decorative botanical / geometric background accents */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#E3D8FF]/50 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#E3D8FF]/50 blur-2xl" />
      <svg
        className="pointer-events-none absolute bottom-0 left-0 w-44 h-44 text-[#DED2FF] opacity-60"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M20,180 Q60,100 140,120 Q90,160 20,180 Z" />
        <path d="M10,140 Q40,60 110,70 Q70,120 10,140 Z" />
      </svg>

      <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* MOBILE & TABLET VIEW (< lg): Header + Horizontal Swipeable Carousel */}
        <div className="lg:hidden">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#DED3FF] text-[#3B2177] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-3">
                Everyday Homecare Challenges
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1B1446] leading-[1.15] tracking-tight">
                What Indian Homes
                <br />
                Go Through Every Day
              </h2>
              <p className="text-xs sm:text-sm text-[#3D316A] font-medium mt-2">
                Common household stains &amp; permanent surface damage solved
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={scrollLeft}
                aria-label="Scroll Left"
                className="w-9 h-9 rounded-full border border-[#DED3FF] bg-white text-[#1B1446] flex items-center justify-center shadow-xs"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={scrollRight}
                aria-label="Scroll Right"
                className="w-9 h-9 rounded-full border border-[#DED3FF] bg-white text-[#1B1446] flex items-center justify-center shadow-xs"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Horizontal Scroll Container on Mobile/Tablet */}
          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto scroll-smooth pb-4 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {concerns.map((item, idx) => (
              <div
                key={item.id}
                className="w-[280px] sm:w-[310px] shrink-0 snap-start bg-[#FAF8FF] rounded-[26px] overflow-hidden shadow-[0_8px_30px_rgb(75,44,153,0.06)] border border-white/90 flex flex-col justify-between group"
              >
                <Link
                  to={item.link}
                  className="relative h-56 sm:h-60 w-full overflow-hidden block bg-slate-200"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3.5 left-3.5 w-10 h-10 rounded-2xl bg-[#E5DCFF]/95 backdrop-blur-xs text-[#1B1446] font-extrabold text-sm flex items-center justify-center shadow-sm">
                    {item.num || `0${idx + 1}`}
                  </div>
                  <svg
                    className="absolute -bottom-[1px] left-0 w-full h-9 text-[#FAF8FF] fill-current"
                    viewBox="0 0 500 60"
                    preserveAspectRatio="none"
                  >
                    <path d="M0,35 C160,75 340,-15 500,30 L500,60 L0,60 Z" />
                  </svg>
                </Link>

                <div className="px-5 pb-6 pt-1.5 flex flex-col justify-between flex-1">
                  <div>
                    <Link to={item.link}>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#1B1446] leading-snug">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-[#3D316A] mt-1.5 leading-relaxed line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="mt-4">
                    <Link
                      to={item.link}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4B2C99] hover:bg-[#3B207D] active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-sm transition-all duration-200"
                    >
                      <span>Explore solution</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LAPTOP & DESKTOP VIEW (lg+): Asymmetric 2-Column Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT COLUMN: Header + Featured Card 01 */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {/* Section Header Block */}
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#DED3FF] text-[#3B2177] text-xs font-extrabold uppercase tracking-wider mb-4">
                Everyday Homecare Challenges
              </span>
              <h2 className="text-[42px] font-black text-[#1B1446] leading-[1.12] tracking-tight">
                What Indian Homes
                <br />
                Go Through Every Day
              </h2>
              <p className="text-base text-[#3D316A] font-medium mt-3">
                Common household stains &amp; permanent surface damage solved
              </p>
            </div>

            {/* Featured Card 01 */}
            {primaryConcern && (
              <div className="bg-[#FAF8FF] rounded-[28px] overflow-hidden shadow-[0_8px_30px_rgb(75,44,153,0.06)] border border-white/90 flex flex-col flex-1 group">
                {/* Image Container with Wave Cutout */}
                <Link
                  to={primaryConcern.link}
                  className="relative h-[310px] w-full overflow-hidden block bg-slate-200"
                >
                  <img
                    src={primaryConcern.image}
                    alt={primaryConcern.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Number Badge 01 */}
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-2xl bg-[#E5DCFF]/95 backdrop-blur-xs text-[#1B1446] font-extrabold text-base flex items-center justify-center shadow-sm">
                    {primaryConcern.num || '01'}
                  </div>

                  {/* Smooth Curved Wave Divider at Bottom of Image */}
                  <svg
                    className="absolute -bottom-[1px] left-0 w-full h-12 text-[#FAF8FF] fill-current"
                    viewBox="0 0 500 60"
                    preserveAspectRatio="none"
                  >
                    <path d="M0,35 C160,75 340,-15 500,30 L500,60 L0,60 Z" />
                  </svg>
                </Link>

                {/* Card 01 Content */}
                <div className="px-8 pb-7 pt-2 flex flex-col justify-between flex-1">
                  <div>
                    <Link to={primaryConcern.link}>
                      <h3 className="text-2xl font-extrabold text-[#1B1446] group-hover:text-[#4B2C99] transition-colors">
                        {primaryConcern.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-[#3D316A] mt-2 leading-relaxed max-w-md">
                      {primaryConcern.subtitle}
                    </p>
                  </div>

                  <div className="mt-5">
                    <Link
                      to={primaryConcern.link}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4B2C99] hover:bg-[#3B207D] active:scale-[0.98] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <span>Explore solution</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: 3 Stacked Horizontal Cards (02, 03, 04) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            {secondaryConcerns.map((item, idx) => (
              <div
                key={item.id}
                className="bg-[#FAF8FF] rounded-[28px] p-4 shadow-[0_8px_30px_rgb(75,44,153,0.06)] border border-white/90 flex flex-row items-stretch gap-6 flex-1 group"
              >
                {/* Left Image */}
                <Link
                  to={item.link}
                  className="w-[46%] min-h-[190px] shrink-0 rounded-[20px] overflow-hidden relative block bg-slate-200"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>

                {/* Right Text & CTA */}
                <div className="flex-1 flex flex-col justify-center py-2 px-1 pr-4">
                  <div className="w-10 h-10 rounded-full bg-[#DED3FF] text-[#1B1446] font-extrabold text-sm flex items-center justify-center mb-3">
                    {item.num || `0${idx + 2}`}
                  </div>

                  <Link to={item.link}>
                    <h3 className="text-xl font-extrabold text-[#1B1446] group-hover:text-[#4B2C99] transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-[#3D316A] mt-1.5 leading-relaxed">
                    {item.subtitle}
                  </p>

                  <div className="mt-4">
                    <Link
                      to={item.link}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4B2C99] hover:bg-[#3B207D] active:scale-[0.98] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all duration-200 w-fit"
                    >
                      <span>Explore solution</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


