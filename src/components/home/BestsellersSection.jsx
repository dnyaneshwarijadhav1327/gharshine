import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  ShowerHead,
  Sofa,
  CookingPot,
  Building2
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';

const ROOM_THEMES = {
  blue: {
    cardBg: 'linear-gradient(180deg, #DDEEFB 0%, #EEF6FD 100%)',
    waveColor: '#EEF6FD',
    accentColor: '#0C6599',
    Icon: ShowerHead
  },
  orange: {
    cardBg: 'linear-gradient(180deg, #FCE3C8 0%, #FDF2E6 100%)',
    waveColor: '#FDF2E6',
    accentColor: '#DA5B1C',
    Icon: Sofa
  },
  green: {
    cardBg: 'linear-gradient(180deg, #DCF0DD 0%, #EEF8EE 100%)',
    waveColor: '#EEF8EE',
    accentColor: '#2E6F3A',
    Icon: CookingPot
  },
  purple: {
    cardBg: 'linear-gradient(180deg, #E8DCFF 0%, #F4EEFF 100%)',
    waveColor: '#F4EEFF',
    accentColor: '#562B99',
    Icon: Building2
  }
};

const getRoomTheme = (item, idx) => {
  const text = `${item.id || ''} ${item.title || ''} ${item.slug || ''}`.toLowerCase();
  if (text.includes('bathroom')) return ROOM_THEMES.blue;
  if (text.includes('living') || text.includes('sofa')) return ROOM_THEMES.orange;
  if (text.includes('kitchen')) return ROOM_THEMES.green;
  if (text.includes('balcony') || text.includes('marble') || text.includes('floor')) return ROOM_THEMES.purple;
  const order = [ROOM_THEMES.blue, ROOM_THEMES.orange, ROOM_THEMES.green, ROOM_THEMES.purple];
  return order[idx % order.length];
};

export const BestsellersSection = () => {
  const { addToCart } = useCart();
  const scrollRef = useRef(null);

  const roomKits = [
    {
      id: 'bathroom-kit',
      title: 'Bathroom Protector Kit',
      subtitle: 'Protect & Clean your Glass Partitions, Taps & Fittings, Wall Tiles',
      saveText: 'Save 24% Vs Buying Separately',
      price: 1999,
      originalPrice: 3299,
      slug: 'bathroom-protector-kit-deep-clean-long-lasting-protection-for-glass-marble-fittings',
      cardBg: 'bg-[#6fe2f5]',
      image: 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineBathroomCleaningTrio.png?v=1791689722',
      productId: 1
    },
    {
      id: 'living-room-kit',
      title: 'Living Room Kit',
      subtitle: 'Protect & Clean your Sofas & Wooden Furniture',
      saveText: 'Save 44% Vs Buying Separately',
      price: 1999,
      originalPrice: 4299,
      slug: 'living-room-kit',
      cardBg: 'bg-[#ffa380]',
      image: 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineCleaningCollectionDisplay.png?v=1791707672',
      productId: 8
    },
    {
      id: 'kitchen-kit',
      title: 'Kitchen Protector Kit',
      subtitle: 'Protect and Clean your Kitchen Counter Tops, Wall Tiles & Cabinets',
      saveText: 'Save 39% Vs Buying Separately',
      price: 1699,
      originalPrice: 3299,
      slug: 'kitchen-protector-kit',
      cardBg: 'bg-[#d5bcfc]',
      image: 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/WhatsAppImage2026-10-10at23.37.19.jpg?v=1791655692',
      productId: 6
    }
  ];

  const [kits, setKits] = React.useState(roomKits);

  const pastelColors = ['bg-[#6fe2f5]', 'bg-[#ffa380]', 'bg-[#d5bcfc]', 'bg-[#cbf685]', 'bg-[#fed768]'];

  React.useEffect(() => {
    import('../../services/productService').then(({ productService }) => {
      productService.getProducts().then((res) => {
        if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
          const usedProductSlugs = new Set();

          const updatedKits = roomKits.map((kit) => {
            // Prioritize exact kit match first, checking 'protect your home room by room' collection
            let match = null;

            if (kit.id === 'kitchen-kit') {
              // 1. Look for product in 'protect your home room by room' collection
              match = res.data.find((p) => {
                if (!p) return false;
                const pName = (p.name || '').toLowerCase();
                const pSlug = (p.slug || '').toLowerCase();
                const inRoomColl =
                  (p.collectionTitles || []).some((c) => c.includes('room by room') || c.includes('protect your home')) ||
                  (p.collectionHandles || []).some((h) => h.includes('room-by-room') || h.includes('protect-your-home'));
                return inRoomColl && (pName.includes('kitchen') || pSlug.includes('kitchen'));
              });
              // 2. Check exact new slug
              if (!match) {
                match = res.data.find((p) => p && p.slug === 'kitchen-protector-kit-1');
              }
              // 3. Fallback
              if (!match) {
                match = res.data.find((p) => {
                  if (!p) return false;
                  const pName = (p.name || '').toLowerCase();
                  const pSlug = (p.slug || '').toLowerCase();
                  return pSlug.includes('kitchen-protector') || pName.includes('kitchen protector');
                });
              }
            } else if (kit.id === 'living-room-kit') {
              match = res.data.find((p) => {
                if (!p) return false;
                const pName = (p.name || '').toLowerCase();
                const pSlug = (p.slug || '').toLowerCase();
                const inRoomColl =
                  (p.collectionTitles || []).some((c) => c.includes('room by room') || c.includes('protect your home')) ||
                  (p.collectionHandles || []).some((h) => h.includes('room-by-room') || h.includes('protect-your-home'));
                return inRoomColl && (pName.includes('living') || pSlug.includes('living'));
              });
              if (!match) {
                match = res.data.find((p) => {
                  if (!p) return false;
                  const pName = (p.name || '').toLowerCase();
                  const pSlug = (p.slug || '').toLowerCase();
                  return pSlug === 'living-room-kit' || pSlug.includes('living-room') || pName.includes('living room');
                });
              }
            } else if (kit.id === 'bathroom-kit') {
              match = res.data.find((p) => {
                if (!p) return false;
                const pName = (p.name || '').toLowerCase();
                const pSlug = (p.slug || '').toLowerCase();
                const inRoomColl =
                  (p.collectionTitles || []).some((c) => c.includes('room by room') || c.includes('protect your home')) ||
                  (p.collectionHandles || []).some((h) => h.includes('room-by-room') || h.includes('protect-your-home'));
                return inRoomColl && (pName.includes('bathroom') || pSlug.includes('bathroom'));
              });
              if (!match) {
                match = res.data.find((p) => {
                  if (!p) return false;
                  const pName = (p.name || '').toLowerCase();
                  const pSlug = (p.slug || '').toLowerCase();
                  return pSlug.includes('bathroom-protector') || pName.includes('bathroom protector');
                });
              }
            }

            if (!match) {
              match = res.data.find((p) => p && p.slug === kit.slug);
            }

            if (match) {
              usedProductSlugs.add(match.slug);
              return {
                ...kit,
                title: match.name || kit.title,
                price: match.price || kit.price,
                originalPrice: match.originalPrice || kit.originalPrice,
                image: match.thumbnail || match.images?.[0] || kit.image,
                slug: match.slug || kit.slug,
                productId: match.id || kit.productId
              };
            }
            return kit;
          });

          // Also include any other products assigned to the 'protect your home room by room' collection in Shopify
          const extraRoomProducts = res.data.filter((p) => {
            if (!p || usedProductSlugs.has(p.slug)) return false;
            const colls = p.collectionTitles || [];
            const collHandles = p.collectionHandles || [];
            return (
              colls.some((c) => c.includes('protect your home') || c.includes('room by room')) ||
              collHandles.some((h) => h.includes('protect-your-home') || h.includes('room-by-room'))
            );
          });

          if (extraRoomProducts.length > 0) {
            const extraKits = extraRoomProducts.map((p, idx) => ({
              id: `room-${p.slug || idx}`,
              title: p.name,
              subtitle: p.shortDescription || 'Deep Clean & Long-Lasting Protection',
              saveText: p.originalPrice ? `Save ${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% Vs Buying Separately` : 'Best Value Kit',
              price: p.price,
              originalPrice: p.originalPrice || Math.round(p.price * 1.3),
              slug: p.slug,
              cardBg: pastelColors[(updatedKits.length + idx) % pastelColors.length],
              image: p.thumbnail || p.images?.[0],
              productId: p.id
            }));
            setKits([...updatedKits, ...extraKits]);
          } else {
            setKits(updatedKits);
          }
        }
      });
    });
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleAddToCart = (item, e) => {
    e.preventDefault();
    e.stopPropagation();

    const matchedProduct = products.find((p) => p.id === item.productId || p.slug === item.slug);
    if (matchedProduct) {
      addToCart({
        ...matchedProduct,
        name: item.title,
        price: item.price,
        originalPrice: item.originalPrice
      }, 1, true);
    } else {
      addToCart({
        id: item.productId || `kit-${item.id}`,
        name: item.title,
        slug: item.slug,
        price: item.price,
        originalPrice: item.originalPrice,
        thumbnail: item.image,
        category: 'Protection Kit',
        badge: 'BUNDLE'
      }, 1, true);
    }
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-[#FAF8F5] overflow-hidden">
      {/* Subtle decorative corner accents */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#DCEBF9]/60 blur-xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-[#E3D8FF]/50 blur-xl" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Mobile Scroll Controls */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 relative">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-[42px] font-black tracking-tight leading-tight">
              <span className="text-[#14172C]">Protect Your Home, </span>
              <span className="bg-gradient-to-r from-[#0C7BB3] via-[#DF8B14] to-[#E85B6C] bg-clip-text text-transparent">
                Room By Room
              </span>
            </h2>
            {/* Multi-color accent underline bar */}
            <div className="mt-3 mx-auto w-56 sm:w-72 h-[2.5px] rounded-full bg-gradient-to-r from-transparent via-[#D97724] to-transparent opacity-80" />
          </div>

          {/* Optional arrows on small screens */}
          <div className="hidden sm:flex lg:hidden items-center gap-2 absolute right-0 top-1">
            <button
              onClick={scrollLeft}
              className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center justify-center shadow-xs"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollRight}
              className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center justify-center shadow-xs"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className={`flex lg:grid gap-5 sm:gap-6 overflow-x-auto lg:overflow-visible no-scrollbar pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory ${
            kits.length <= 3
              ? 'lg:grid-cols-3 max-w-5xl mx-auto'
              : kits.length === 4
              ? 'lg:grid-cols-4 max-w-[1400px] mx-auto'
              : 'lg:grid-cols-4'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {kits.map((item, idx) => {
            const theme = getRoomTheme(item, idx);
            const IconComponent = theme.Icon;

            return (
              <div
                key={item.id}
                style={{ background: theme.cardBg }}
                className="w-[285px] sm:w-[310px] lg:w-auto shrink-0 snap-start rounded-[32px] p-2.5 sm:p-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Top Arched Product Image Area */}
                <div className="relative">
                  {/* Top-Left Room Category Icon Badge */}
                  <div
                    style={{ backgroundColor: theme.accentColor }}
                    className="absolute top-3.5 left-3.5 z-20 w-13 h-13 sm:w-14 sm:h-14 rounded-full border-[3.5px] border-white shadow-md flex items-center justify-center text-white"
                  >
                    <IconComponent size={24} strokeWidth={2} />
                  </div>

                  <Link
                    to={`/product/${item.slug}`}
                    className="relative h-72 sm:h-80 w-full rounded-t-[24px] rounded-tr-[115px] overflow-hidden block bg-white"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Smooth Curved Wave Cutout at Bottom of Image */}
                    <svg
                      className="absolute -bottom-[1px] left-0 w-full h-10 sm:h-12 pointer-events-none"
                      viewBox="0 0 500 60"
                      preserveAspectRatio="none"
                      style={{ color: theme.waveColor, fill: 'currentColor' }}
                    >
                      <path d="M0,30 C140,-10 340,70 500,25 L500,60 L0,60 Z" />
                    </svg>
                  </Link>
                </div>

                {/* Bottom Card Content */}
                <div className="px-3.5 sm:px-4 pt-3 pb-3 flex flex-col flex-1 justify-between">
                  <div>
                    <Link to={`/product/${item.slug}`}>
                      <h3 className="font-extrabold text-[#14172C] text-lg sm:text-[20px] leading-snug hover:opacity-80 transition-opacity line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>

                    {/* 5 Gold Stars Row */}
                    <div className="flex items-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={16}
                          fill="currentColor"
                          className="text-[#F59E0B]"
                        />
                      ))}
                    </div>

                    {/* Price + Strikethrough MRP */}
                    <div className="flex items-baseline gap-2.5 mt-3">
                      <span className="text-xl sm:text-[25px] font-black text-[#14172C] tracking-tight">
                        ₹{Number(item.price).toLocaleString('en-IN')}.00
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs sm:text-[15px] text-slate-400 line-through font-medium">
                          ₹{Number(item.originalPrice).toLocaleString('en-IN')}.00
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Matching Solid Pill Add to Cart Button */}
                  <button
                    onClick={(e) => handleAddToCart(item, e)}
                    style={{ backgroundColor: theme.accentColor }}
                    className="w-full mt-4 py-3 sm:py-3.5 px-5 rounded-full hover:opacity-95 active:scale-[0.98] text-white font-bold text-sm sm:text-[15px] tracking-wide flex items-center justify-center gap-2.5 transition-all duration-200 shadow-md cursor-pointer"
                  >
                    <ShoppingCart size={18} strokeWidth={2.2} />
                    <span>Add to Cart</span>
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
