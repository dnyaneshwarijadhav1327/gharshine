import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Sparkles,
  CookingPot,
  Sofa,
  ShowerHead
} from 'lucide-react';
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

const CARD_THEMES = {
  blue: {
    cardBg: 'linear-gradient(180deg, #E8F4FE 0%, #EFF7FE 100%)',
    waveColor: '#EFF7FE',
    accentColor: '#0061A8',
    accentHover: '#004E87',
    Icon: Sparkles,
    insetImage: '/images/concern-shower-glass.jpg'
  },
  orange: {
    cardBg: 'linear-gradient(180deg, #FFF1DF 0%, #FFF6EC 100%)',
    waveColor: '#FFF6EC',
    accentColor: '#EA6B00',
    accentHover: '#CC5D00',
    Icon: CookingPot,
    insetImage: '/images/concern-kitchen-tiles.jpg'
  },
  green: {
    cardBg: 'linear-gradient(180deg, #E7F5EC 0%, #EFF9F2 100%)',
    waveColor: '#EFF9F2',
    accentColor: '#0E5A31',
    accentHover: '#094223',
    Icon: Sofa,
    insetImage: '/images/concern-sofa-spills.jpg'
  },
  purple: {
    cardBg: 'linear-gradient(180deg, #F1EAFF 0%, #F6F2FF 100%)',
    waveColor: '#F6F2FF',
    accentColor: '#5E2B97',
    accentHover: '#4A2078',
    Icon: ShowerHead,
    insetImage: '/images/concern-marble-counter.jpg'
  }
};

const getCardTheme = (item, idx) => {
  const text = `${item.name || ''} ${item.slug || ''}`.toLowerCase();
  if (text.includes('kitchen') || text.includes('hob') || text.includes('degreas')) {
    return CARD_THEMES.orange;
  }
  if (text.includes('sofa') || text.includes('fabric') || text.includes('living')) {
    return CARD_THEMES.green;
  }
  if (text.includes('bathroom protector') || text.includes('marble') || text.includes('deep clean')) {
    return CARD_THEMES.purple;
  }
  if (text.includes('glass') || text.includes('ceramic')) {
    return CARD_THEMES.blue;
  }
  const order = [CARD_THEMES.blue, CARD_THEMES.orange, CARD_THEMES.green, CARD_THEMES.purple];
  return order[idx % order.length];
};

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
              slug === 'kitchen-protector-kit'
            ) {
              return false;
            }

            // Exclude products assigned to 'protect your home room by room' collection (they belong in the Room By Room section)
            const isRoomCollection =
              (p.collectionTitles || []).some((c) => c.includes('protect your home') || c.includes('room by room')) ||
              (p.collectionHandles || []).some((h) => h.includes('protect-your-home') || h.includes('room-by-room'));

            const isBestSellerCollection =
              (p.collectionTitles || []).some(
                (c) => c.includes('best seller') || c.includes('bestseller') || c.includes('best value bundle')
              ) ||
              (p.collectionHandles || []).some(
                (h) => h.includes('best-seller') || h.includes('bestseller') || h.includes('best-value-bundle')
              );

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
              (p.collectionTitles && p.collectionTitles.some((c) => c.includes('combo') || c.includes('bundle')))
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
              reviews: p.reviewCount || 142,
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
    <section className="py-12 sm:py-16 bg-white border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Header with Navigation arrows */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
              Best Seller Combos &amp; Protection Kits
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Curated surface-care bundles tested for Indian homes
            </p>
          </div>

          {/* Left / Right Scroll Buttons (Desktop & Tablet) */}
          <div className={`hidden sm:flex ${items.length <= 4 ? 'lg:hidden' : ''} items-center gap-2`}>
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

        {/* Responsive Grid on Laptop/Desktop, Swipeable Carousel on Mobile */}
        <div
          ref={scrollContainerRef}
          className={`flex lg:grid gap-5 sm:gap-6 overflow-x-auto lg:overflow-visible scroll-smooth pb-4 pt-3 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 ${
            items.length <= 3
              ? 'lg:grid-cols-3 max-w-5xl mx-auto'
              : items.length === 4
              ? 'lg:grid-cols-4 max-w-[1400px] mx-auto'
              : 'lg:grid-cols-4'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {items.map((item, idx) => {
            const starCount = Math.max(1, Math.min(5, Math.round(Number(item.rating) || 5)));
            const theme = getCardTheme(item, idx);
            const IconComponent = theme.Icon;

            return (
              <div
                key={item.id}
                style={{ background: theme.cardBg }}
                className="relative w-[290px] sm:w-[320px] md:w-[340px] lg:w-auto shrink-0 lg:shrink rounded-t-[130px] rounded-b-[32px] p-2.5 sm:p-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Top Arched Image Container */}
                <div className="relative">
                  {/* Top-Left Category Icon Circle */}
                  <div
                    style={{ backgroundColor: theme.accentColor }}
                    className="absolute top-3 left-3 z-20 w-12 h-12 sm:w-13 sm:h-13 rounded-full border-[3px] border-white shadow-md flex items-center justify-center text-white"
                  >
                    <IconComponent size={22} strokeWidth={2} />
                  </div>

                  {/* Product Image Link */}
                  <Link
                    to={`/product/${item.slug}`}
                    className="relative h-72 sm:h-80 w-full rounded-t-[118px] overflow-hidden block bg-white"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Curved Wave Cutout at Bottom of Image */}
                    <svg
                      className="absolute -bottom-[1px] left-0 w-full h-10 sm:h-12 pointer-events-none"
                      viewBox="0 0 500 60"
                      preserveAspectRatio="none"
                      style={{ color: theme.waveColor, fill: 'currentColor' }}
                    >
                      <path d="M0,15 C160,65 340,65 500,15 L500,60 L0,60 Z" />
                    </svg>
                  </Link>

                  {/* Circular Before/After Split Inset on Bottom-Right */}
                  <Link
                    to={`/product/${item.slug}`}
                    className="absolute -bottom-3 right-2 z-20 w-24 h-24 sm:w-26 sm:h-26 rounded-full border-[3px] border-white shadow-lg overflow-hidden block bg-slate-200"
                  >
                    <img
                      src={theme.insetImage}
                      alt={`${item.name} comparison`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Split vertical line + tiny center arrow badge */}
                    <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-white/90" />
                    <div
                      style={{ backgroundColor: theme.accentColor }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full text-white flex items-center justify-center shadow-xs"
                    >
                      <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
                        <path d="M1 1L7 5L1 9V1Z" />
                      </svg>
                    </div>
                  </Link>
                </div>

                {/* Card Body Content */}
                <div className="px-3 sm:px-4 pt-4 pb-3 flex flex-col justify-between flex-1">
                  <div>
                    {/* Product Title */}
                    <Link
                      to={`/product/${item.slug}`}
                      className="block font-extrabold text-[#1B1446] text-base sm:text-[18px] leading-snug hover:opacity-80 transition-opacity line-clamp-3 min-h-[50px]"
                    >
                      {item.name}
                    </Link>

                    {/* 5 Star Rating + Reviews */}
                    <div className="flex items-center gap-1.5 mt-3">
                      <div className="flex text-[#F59E0B]">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={16}
                            fill={s <= starCount ? 'currentColor' : 'none'}
                            className={s <= starCount ? 'text-[#F59E0B]' : 'text-slate-300'}
                          />
                        ))}
                      </div>
                      <span className="text-xs sm:text-[13px] font-semibold text-[#2E2559]">
                        {item.reviews} reviews
                      </span>
                    </div>

                    {/* Price + Strikethrough MRP */}
                    <div className="flex items-baseline gap-2.5 mt-3">
                      <span className="text-2xl sm:text-[26px] font-black text-[#1B1446] tracking-tight">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm sm:text-base font-semibold text-slate-400 line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Matching Solid Pill Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    style={{ backgroundColor: theme.accentColor }}
                    className="mt-4 w-full py-3 sm:py-3.5 px-5 rounded-full hover:opacity-95 active:scale-[0.98] text-white font-bold text-sm sm:text-[15px] tracking-wide flex items-center justify-center gap-2.5 transition-all duration-200 shadow-md cursor-pointer"
                  >
                    <ShoppingCart size={18} strokeWidth={2.2} />
                    <span>Add to cart</span>
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
