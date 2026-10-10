import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';

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
      originalPrice: 3399,
      slug: 'bathroom-protector-kit',
      cardBg: 'bg-[#6fe2f5]',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      productId: 1
    },
    {
      id: 'living-room-kit',
      title: 'Living Room Kit',
      subtitle: 'Protect & Clean your Sofas & Wooden Furniture',
      saveText: 'Save 44% Vs Buying Separately',
      price: 1999,
      originalPrice: 4299,
      slug: 'living-room-complete-protection-kit',
      cardBg: 'bg-[#ffa380]',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
      productId: 8
    },
    {
      id: 'kitchen-kit',
      title: 'Kitchen Protector Kit',
      subtitle: 'Protect and Clean your Kitchen Counter Tops, Wall Tiles & Cabinets',
      saveText: 'Save 39% Vs Buying Separately',
      price: 1699,
      originalPrice: 3299,
      slug: 'biodegrease-kitchen-hob-chimney-cleaner',
      cardBg: 'bg-[#d5bcfc]',
      image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=600&q=80',
      productId: 6
    },
    {
      id: 'balcony-kit',
      title: 'Balcony Protection Kit',
      subtitle: 'Protect and Clean your Windows, Furniture & Fabric Furniture',
      saveText: 'Save 24% Vs Buying Separately',
      price: 2879,
      originalPrice: 4499,
      slug: 'groutbright-tile-joint-whitener-shield',
      cardBg: 'bg-[#cbf685]',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      productId: 11
    },
    {
      id: 'dining-kit',
      title: 'Dining Table Combo',
      subtitle: 'Protect and Clean your Fabrics & Wooden Table',
      saveText: 'Save 30% Vs Buying Separately',
      price: 1999,
      originalPrice: 2999,
      slug: 'lustrewood-carnauba-ceramic-polish-shield',
      cardBg: 'bg-[#fed768]',
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
      productId: 7
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
            // Try to find a matching product by slug, room keyword, tags or collection
            const match = res.data.find((p) => {
              if (!p) return false;
              if (p.slug === kit.slug) return true;
              const pName = (p.name || '').toLowerCase();
              const pSlug = (p.slug || '').toLowerCase();
              const pCols = (p.collectionTitles || []).join(' ').toLowerCase();
              const pTags = (p.tags || []).join(' ').toLowerCase();
              const pRooms = (p.rooms || []).join(' ').toLowerCase();

              if (kit.id === 'kitchen-kit') {
                return pName.includes('kitchen') || pSlug.includes('kitchen') || pCols.includes('kitchen') || pTags.includes('kitchen') || pRooms.includes('kitchen');
              }
              if (kit.id === 'bathroom-kit') {
                return pName.includes('bathroom') || pSlug.includes('bathroom') || pSlug.includes('glass-tile') || pName.includes('glass & ceramics') || pCols.includes('bathroom') || pTags.includes('bathroom') || pRooms.includes('bathroom');
              }
              if (kit.id === 'living-room-kit') {
                return pName.includes('living') || pName.includes('sofa') || pSlug.includes('sofa') || pCols.includes('living') || pTags.includes('living') || pRooms.includes('living');
              }
              if (kit.id === 'dining-kit') {
                return pName.includes('dining') || pName.includes('wood') || pCols.includes('dining') || pTags.includes('dining') || pRooms.includes('dining');
              }
              if (kit.id === 'balcony-kit') {
                return pName.includes('balcony') || pName.includes('grout') || pCols.includes('balcony') || pTags.includes('balcony') || pRooms.includes('balcony');
              }
              return false;
            });

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

          // Check if there are any extra products in Shopify added to a "Room By Room" collection or tagged "room"
          const extraRoomProducts = res.data.filter((p) => {
            if (!p || usedProductSlugs.has(p.slug)) return false;
            const pCols = (p.collectionTitles || []).join(' ').toLowerCase();
            const pTags = (p.tags || []).join(' ').toLowerCase();
            return (
              pCols.includes('room by room') ||
              pCols.includes('room-by-room') ||
              pCols.includes('protect your home') ||
              pTags.includes('room-by-room') ||
              pTags.includes('room')
            );
          });

          if (extraRoomProducts.length > 0) {
            const extraKits = extraRoomProducts.map((p, idx) => ({
              id: `custom-room-${p.id || idx}`,
              title: p.name,
              subtitle: p.shortDescription || 'Protect and Clean your home surfaces',
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
    <section className="py-10 sm:py-16 md:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Mobile Scroll Controls */}
        <div className="flex items-center justify-between mb-6 sm:mb-10">
          <div className="w-full text-center lg:text-center">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
              Protect Your Home, Room By Room
            </h2>
          </div>

          {/* Optional arrows on small screens */}
          <div className="hidden sm:flex lg:hidden items-center gap-2">
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

        {/* Responsive Layout: Smooth swipeable row on mobile/tablet, 5-col grid on desktop */}
        <div
          ref={scrollRef}
          className="flex lg:grid gap-4 sm:gap-5 overflow-x-auto lg:overflow-visible no-scrollbar pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid-cols-5 snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {kits.map((item) => (
            <div
              key={item.id}
              className={`w-[260px] sm:w-[280px] lg:w-auto shrink-0 snap-start rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 ${item.cardBg}`}
            >
              {/* Product Image Section */}
              <Link 
                to={`/product/${item.slug}`} 
                className="block overflow-hidden relative group aspect-[4/3] sm:aspect-square bg-white"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </Link>

              {/* Bottom Card Content */}
              <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                <div>
                  <Link to={`/product/${item.slug}`}>
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-tight hover:text-slate-800 transition-colors">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-[13px] text-slate-800 font-medium leading-snug mt-2 line-clamp-2">
                    {item.subtitle}
                  </p>

                  <div className="mt-3">
                    <span className="text-xs sm:text-[13px] font-bold text-[#c92a2a] block">
                      {item.saveText}
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl font-black text-slate-900">
                      ₹ {item.price.toLocaleString('en-IN')}.00
                    </span>
                    <span className="text-xs sm:text-sm text-slate-600 line-through font-normal">
                      ₹ {item.originalPrice.toLocaleString('en-IN')}.00
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(item, e)}
                    className="w-full mt-3.5 sm:mt-4 py-2.5 sm:py-3 bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm sm:text-base rounded-xl transition-all duration-150 shadow-xs border border-white/60 active:scale-[0.98] text-center cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
