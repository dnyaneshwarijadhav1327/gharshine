import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { productService } from '../../services/productService';

const fallbackCombos = [
  {
    id: 1,
    name: 'Glass & Ceramics Cleaning and Protection Combo',
    slug: 'bathroom-protector-kit',
    subtitle: 'Covers upto 3 bathrooms | Spotless glass for upto 3 months',
    image: '/images/concern-shower-glass.jpg',
    bottomOverlay: 'Stain Free Glass For Months',
    accentCorner: 'top-right',
    accentColor: '#52D1DC',
    rating: 5,
    reviews: 384,
    price: 1599,
    originalPrice: 2299,
    isCombo: true
  },
  {
    id: 2,
    name: 'Sofa & Fabric Stain Repellent Combo',
    slug: 'hydrobarrier-sofa-fabric-stain-repellent',
    subtitle: 'Covers 3 seater Sofa | Stain-free sofa for upto 6 months',
    image: '/images/concern-sofa-spills.jpg',
    topBanner: '3 Sofa Seater Protector Combo',
    accentCorner: 'bottom-left',
    accentColor: '#D3F49A',
    rating: 5,
    reviews: 291,
    price: 1999,
    originalPrice: 2999,
    isCombo: true
  },
  {
    id: 3,
    name: 'Bathroom Protector Kit',
    slug: 'complete-bathroom-care-shield-kit',
    subtitle: 'Covers upto 3 bathrooms Protects glass, ceramics & marbles for upto 3 months',
    image: '/images/concern-kitchen-tiles.jpg',
    accentCorner: 'top-right',
    accentColor: '#52D1DC',
    rating: 5,
    reviews: 306,
    price: 1999,
    originalPrice: 3399,
    isCombo: true
  },
  {
    id: 8,
    name: 'Ultimate Whole Home Protection Combo',
    slug: 'living-room-complete-protection-kit',
    subtitle: 'Pack of 5 Complete protection for your entire house',
    image: '/images/concern-marble-counter.jpg',
    topBanner: 'Full Home Armor Pack',
    accentCorner: 'top-left',
    accentColor: '#52D1DC',
    rating: 5,
    reviews: 480,
    price: 4999,
    originalPrice: 7499,
    isCombo: true
  },
  {
    id: 4,
    name: 'Marble, Granite & Kitchen Protection Kit',
    slug: 'stonearmor-marble-granite-sealant',
    subtitle: 'Covers kitchen countertops, dining & pooja room marble for 12 months',
    image: '/images/surface-marble.png',
    bottomOverlay: 'Zero Haldi & Oil Etching',
    accentCorner: 'top-right',
    accentColor: '#D3F49A',
    rating: 5,
    reviews: 215,
    price: 2499,
    originalPrice: 3699,
    isCombo: true
  },
  {
    id: 7,
    name: 'Wood & Furniture Polish + Moisture Shield Combo',
    slug: 'lustrewood-carnauba-ceramic-polish-shield',
    subtitle: 'Covers dining table, wooden consoles & wardrobes for 6 months',
    image: '/images/surface-wood.jpg',
    topBanner: 'Carnauba Wax + Ceramic Shield',
    accentCorner: 'bottom-right',
    accentColor: '#52D1DC',
    rating: 5,
    reviews: 178,
    price: 1299,
    originalPrice: 1799,
    isCombo: true
  }
];

export const CombosCarouselSection = () => {
  const { addToCart } = useCart();
  const scrollContainerRef = useRef(null);
  const [items, setItems] = useState(fallbackCombos);

  useEffect(() => {
    let isMounted = true;
    productService
      .getProducts()
      .then((res) => {
        if (!isMounted) return;
        if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
          const dynamicCombos = res.data.filter(
            (p) =>
              p.isCombo ||
              p.category?.toLowerCase() === 'combos' ||
              p.badge === 'BESTSELLER' ||
              p.tags?.includes('combo') ||
              p.tags?.includes('featured')
          );

          if (dynamicCombos.length > 0) {
            const formatted = dynamicCombos.map((p, idx) => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              subtitle: p.shortDescription || p.category,
              image: p.thumbnail || p.images?.[0] || '/images/concern-shower-glass.jpg',
              accentCorner: idx % 2 === 0 ? 'top-right' : 'bottom-left',
              accentColor: idx % 2 === 0 ? '#52D1DC' : '#D3F49A',
              rating: p.rating || 5,
              reviews: p.reviewCount || 150,
              price: p.price,
              originalPrice: p.originalPrice || Math.round(p.price * 1.4),
              isCombo: true
            }));
            setItems(formatted);
          }
        }
      })
      .catch((err) => {
        console.warn('Could not load dynamic combos, using fallback catalog:', err);
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

  const handleAddToCart = (item) => {
    const productData = {
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      originalPrice: item.originalPrice,
      thumbnail: item.image,
      shortDescription: item.subtitle,
      isCombo: true
    };
    addToCart(productData, 1, true);
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-100 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* Header with Navigation arrows */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
              Best Seller Combos & Protection Kits
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Curated surface-care bundles tested for Indian homes
            </p>
          </div>

          {/* Left / Right Scroll Buttons (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={scrollLeft}
              aria-label="Scroll Left"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 flex items-center justify-center transition shadow-xs cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll Right"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 flex items-center justify-center transition shadow-xs cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel (Swipeable, Manual Right-to-Left Scroll, NO Auto-Scrolling) */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-5 overflow-x-auto scroll-smooth pb-4 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-[285px] sm:w-[320px] md:w-[340px] shrink-0 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Product Image Area Wrapped in Clickable Link */}
              <Link
                to={`/product/${item.slug}`}
                className="relative h-60 sm:h-64 w-full bg-[#f6f8fa] overflow-hidden flex items-center justify-center cursor-pointer block"
              >
                {/* Organic decorative wave curve */}
                {item.accentCorner === 'top-right' && (
                  <div
                    className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-80 pointer-events-none"
                    style={{ backgroundColor: item.accentColor }}
                  />
                )}
                {item.accentCorner === 'bottom-left' && (
                  <div
                    className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-80 pointer-events-none"
                    style={{ backgroundColor: item.accentColor }}
                  />
                )}

                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Top Banner overlay if present */}
                {item.topBanner && (
                  <div className="absolute top-3 left-3 right-3 text-center z-10">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-black text-slate-900 bg-white/90 backdrop-blur-sm shadow-xs">
                      {item.topBanner}
                    </span>
                  </div>
                )}

                {/* Bottom Overlay text if present */}
                {item.bottomOverlay && (
                  <div className="absolute bottom-3 right-3 z-10 text-right">
                    <span className="inline-block px-3 py-1 rounded-lg text-xs font-black text-slate-900 bg-white/90 backdrop-blur-sm shadow-xs leading-tight">
                      {item.bottomOverlay}
                    </span>
                  </div>
                )}
              </Link>

              {/* Bottom Card Details */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-white">
                <div>
                  {/* Title */}
                  <Link
                    to={`/product/${item.slug}`}
                    className="block font-bold text-slate-900 text-base sm:text-lg leading-snug hover:text-[#087F8C] transition-colors line-clamp-2 min-h-[44px]"
                  >
                    {item.name}
                  </Link>

                  {/* Subtitle / Coverage */}
                  <p className="text-xs sm:text-[13px] text-slate-500 line-clamp-2 mt-2 leading-relaxed min-h-[36px]">
                    {item.subtitle}
                  </p>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1.5 mt-3">
                    <div className="flex text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-800">
                      {item.reviews} reviews
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mt-2.5">
                    <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {formatPrice(item.price)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs sm:text-sm text-slate-400 line-through">
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button (Aqua Cyan #52D1DC) */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-4 w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#52D1DC] hover:bg-[#3ec4d0] active:scale-[0.98] text-slate-950 font-bold text-sm tracking-wide text-center transition-all duration-200 shadow-xs cursor-pointer block"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
