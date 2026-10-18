import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { productService } from '../../services/productService';
import { Check, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const fallbackUpsellItems = [
  {
    id: 'shopify-kitchen-cleaner',
    name: 'Kitchen Foam Cleaner',
    slug: 'kitchen-foam-cleaner',
    price: 749,
    originalPrice: 1499,
    image: 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/WhatsAppImage2026-10-10at23.23.25_1.jpg?v=1791654877'
  },
  {
    id: 'shopify-sofa-combo',
    name: 'Sofa & Fabric Stain Repellent Combo',
    slug: 'sofa-fabric-stain-repellent-combo',
    price: 1999,
    originalPrice: 2999,
    image: 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharshineSofaProtectorCombo.png?v=1791652689'
  },
  {
    id: 'shopify-living-room-kit',
    name: 'Living Room Kit',
    slug: 'living-room-kit',
    price: 1999,
    originalPrice: 4299,
    image: 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineCleaningCollectionDisplay.png?v=1791707672'
  },
  {
    id: 'shopify-kitchen-kit',
    name: 'Kitchen Protector Kit',
    slug: 'kitchen-protector-kit',
    price: 1699,
    originalPrice: 2499,
    image: 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/WhatsAppImage2026-10-10at23.37.19.jpg?v=1791655692'
  },
  {
    id: 'shopify-bathroom-kit',
    name: 'Bathroom Protector Kit',
    slug: 'bathroom-protector-kit-deep-clean-long-lasting-protection-for-glass-marble-fittings',
    price: 1599,
    originalPrice: 2299,
    image: 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineBathroomCleaningTrio.png?v=1791689722'
  },
  {
    id: 'shopify-glass-tile',
    name: 'Glass & Tile Hard Water Stain Repellent',
    slug: 'glass-tile-hard-water-stain-repellent',
    price: 749,
    originalPrice: 1299,
    image: 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineGlassProtectionSprayAd.png?v=1791650202'
  }
];

export const BundleUpsellBox = ({ currentProduct, onAddUpsell }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [items, setItems] = useState(fallbackUpsellItems);
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let isMounted = true;
    productService
      .getProducts()
      .then((res) => {
        if (!isMounted) return;
        if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
          // Format live products
          const dynamicItems = res.data.map((p) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: Number(p.price) || 749,
            originalPrice: p.originalPrice ? Number(p.originalPrice) : Math.round((Number(p.price) || 749) * 1.5),
            image: p.thumbnail || p.images?.[0] || 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineBathroomCleaningTrio.png?v=1791689722',
            category: p.category || 'Protection Add-on',
            shortDescription: p.shortDescription || 'Add-on bundle savings'
          }));

          // Filter out current product if provided
          const currentSlug = (currentProduct?.slug || '').toLowerCase();
          const currentName = (currentProduct?.name || '').toLowerCase();
          const filtered = dynamicItems.filter((p) => {
            const pSlug = (p.slug || '').toLowerCase();
            const pName = (p.name || '').toLowerCase();
            if (p.id === currentProduct?.id) return false;
            if (currentSlug && (pSlug === currentSlug || pSlug.includes(currentSlug) || currentSlug.includes(pSlug))) return false;
            if (currentName && pName === currentName) return false;
            return true;
          });

          if (filtered.length > 0) {
            setItems(filtered.slice(0, 5));
          }
        }
      })
      .catch((err) => {
        console.warn('Could not load dynamic bundle upsell items:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [currentProduct?.id, currentProduct?.slug]);

  // Determine if item is in cart and its quantity
  const getItemInCart = (itemId) => {
    return cartItems.find((ci) => ci.product.id === itemId || ci.product.slug === itemId);
  };

  const handleAdd = (item, e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(
      {
        id: item.id,
        name: item.name,
        slug: item.slug,
        price: item.price,
        originalPrice: item.originalPrice,
        thumbnail: item.image,
        category: item.category || 'Protection Add-on',
        shortDescription: item.shortDescription || 'Add-on bundle savings'
      },
      1,
      true
    );

    if (onAddUpsell) onAddUpsell(item);
  };

  // Filter items again in case fallback items contain current product
  const currentSlug = (currentProduct?.slug || '').toLowerCase();
  const displayItems = items.filter((item) => {
    const itemSlug = (item.slug || '').toLowerCase();
    if (item.id === currentProduct?.id) return false;
    if (currentSlug && (itemSlug === currentSlug || itemSlug.includes(currentSlug) || currentSlug.includes(itemSlug))) return false;
    return true;
  });

  if (displayItems.length === 0) return null;

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-[#FCEBF2] border border-[#F8D8E6] space-y-3.5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h4 className="text-base sm:text-[17px] font-extrabold text-[#111C30] tracking-tight">
            Add more to your bundle
          </h4>
          <p className="text-xs text-[#4A5568] font-medium mt-0.5">
            Every add takes you closer to the next saving
          </p>
        </div>

        {displayItems.length > 2 && (
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => handleScroll('left')}
              className="w-7 h-7 rounded-lg bg-white hover:bg-slate-50 text-[#111C30] flex items-center justify-center transition shadow-2xs cursor-pointer"
              aria-label="Previous upsell items"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-7 h-7 rounded-lg bg-white hover:bg-slate-50 text-[#111C30] flex items-center justify-center transition shadow-2xs cursor-pointer"
              aria-label="Next upsell items"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>

      {/* Horizontal Upsell Cards */}
      <div
        ref={scrollContainerRef}
        className="flex items-stretch gap-3 overflow-x-auto no-scrollbar pb-1"
      >
        {displayItems.map((item) => {
          const cartEntry = getItemInCart(item.id) || getItemInCart(item.slug);
          const isAdded = Boolean(cartEntry);

          return (
            <div
              key={item.id}
              className="w-[225px] sm:w-[245px] shrink-0 bg-white rounded-2xl p-3 border border-white shadow-2xs hover:shadow-xs transition-all flex items-center gap-3 group"
            >
              {/* Product Thumbnail */}
              <Link
                to={`/product/${item.slug}`}
                className="w-15 h-15 rounded-xl bg-[#F4F7FA] overflow-hidden shrink-0 relative flex items-center justify-center cursor-pointer"
                title={`View ${item.name}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </Link>

              {/* Title, Price & Pink + Add Button */}
              <div className="flex-1 min-w-0">
                <Link
                  to={`/product/${item.slug}`}
                  className="block hover:opacity-80 transition-opacity"
                >
                  <h5 className="text-xs font-extrabold text-[#111C30] truncate leading-snug">
                    {item.name}
                  </h5>
                </Link>

                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xs sm:text-[13px] font-black text-[#111C30]">
                    {formatPrice(item.price)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-[11px] text-slate-400 line-through font-medium">
                      {formatPrice(item.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="mt-2 flex items-center">
                  {isAdded ? (
                    <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg text-[11px] font-bold">
                      <Check size={12} className="text-emerald-600" />
                      <span>Added ({cartEntry.quantity})</span>
                      <button
                        onClick={() => updateQuantity(cartEntry.product.id, 1)}
                        className="ml-1 text-emerald-900 hover:text-emerald-950 font-black cursor-pointer"
                        title="Add one more"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => handleAdd(item, e)}
                      className="px-4 py-1 bg-[#F59EC2] hover:bg-[#ef87b3] active:scale-95 text-[#111C30] font-extrabold text-xs rounded-lg transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                    >
                      <Plus size={12} strokeWidth={2.8} />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
