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
    slug: 'abc',
    subtitle: 'Covers upto 3 bathrooms | Spotless glass for upto 3 months',
    image: 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineBathroomCareDuo.png?v=1791650202',
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
    slug: 'sofa-fabric-stain-repellent-combo',
    subtitle: 'Covers 3 seater Sofa | Stain-free sofa for upto 6 months',
    image: 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharshineSofaProtectorCombo.png?v=1791652689',
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
    id: 6,
    name: 'Kitchen Foam Cleaner & Degreaser',
    slug: 'kitchen-foam-cleaner',
    subtitle: 'Dissolves heavy oil, grease & burnt residue in 60 seconds',
    image: 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/WhatsAppImage2026-10-10at23.23.25_1.jpg?v=1791654877',
    topBanner: 'Fast Acting Foam',
    accentCorner: 'top-right',
    accentColor: '#52D1DC',
    rating: 5,
    reviews: 215,
    price: 749,
    originalPrice: 1499,
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
          const dynamicCombos = res.data.filter((p) => {
            if (!p) return false;
            const name = (p.name || '').toLowerCase();
            const slug = (p.slug || '').toLowerCase();
            if (
              slug.includes('lustrewood') ||
              name.includes('wood & furniture') ||
              slug.includes('sacred-shringar') ||
              slug.includes('complete-bathroom-care') ||
              slug.includes('stonearmor') ||
              name.includes('invisel')
            ) {
              return false;
            }

            // Exclude products assigned to 'protect your home room by room' collection (they belong in the Room By Room section)
            const isRoomCollection =
              (p.collectionTitles || []).some((c) => c.includes('protect your home') || c.includes('room by room')) ||
              (p.collectionHandles || []).some((h) => h.includes('protect-your-home') || h.includes('room-by-room'));

            const isBestSellerCollection =
              (p.collectionTitles || []).some((c) => c.includes('best seller') || c.includes('bestseller')) ||
              (p.collectionHandles || []).some((h) => h.includes('best-seller') || h.includes('bestseller'));

            // If it belongs to Room By Room collection and NOT explicitly to Best Seller collection, exclude from Combos
            if (isRoomCollection && !isBestSellerCollection) {
              return false;
            }

            return (
              isBestSellerCollection ||
              p.isCombo ||
              name.includes('combo') ||
              p.category?.toLowerCase() === 'combos' ||
              p.tags?.includes('combo') ||
              (p.collectionTitles && p.collectionTitles.some((c) => c.includes('combo')))
            );
          });

          if (dynamicCombos.length > 0) {
            const formatted = dynamicCombos.map((p, idx) => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              subtitle: p.shortDescription || p.category || '',
              image: p.thumbnail || p.images?.[0] || 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineBathroomCareDuo.png?v=1791650202',
              accentCorner: idx % 2 === 0 ? 'top-right' : 'bottom-left',
              accentColor: idx % 2 === 0 ? '#52D1DC' : '#D3F49A',
              rating: Math.round(Number(p.rating) || 5),
              reviews: p.reviewCount || 150,
              price: Number(p.price) || 999,
              originalPrice: p.originalPrice ? Number(p.originalPrice) : Math.round((Number(p.price) || 999) * 1.4),
              isCombo: true
            }));

            // Only use genuine live products; fallbackCombos only if formatted is short
            const seenSlugs = new Set(formatted.map((f) => f.slug));
            const seenNames = new Set(formatted.map((f) => f.name?.toLowerCase()));
            const remainingFallbacks = fallbackCombos.filter(
              (fb) => !seenSlugs.has(fb.slug) && !seenNames.has(fb.name?.toLowerCase())
            );
            setItems([...formatted, ...remainingFallbacks]);
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
          {items.map((item) => {
            const starCount = Math.max(1, Math.min(5, Math.round(Number(item.rating) || 5)));

            return (
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
                    className="w-full h-full object-cover"
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

                    {/* Star Rating (Safe 5-star loop) */}
                    <div className="flex items-center gap-1.5 mt-3">
                      <div className="flex text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={15}
                            fill={s <= starCount ? 'currentColor' : 'none'}
                            className={s <= starCount ? 'text-amber-400' : 'text-slate-300'}
                          />
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
            );
          })}
        </div>

      </div>
    </section>
  );
};
