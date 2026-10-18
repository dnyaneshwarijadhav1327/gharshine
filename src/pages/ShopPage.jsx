import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SortDropdown } from '../components/shop/SortDropdown';
import { ProductCard } from '../components/product/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGridSkeleton } from '../components/common/LoadingSkeleton';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import {
  Sparkles,
  PackageOpen,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  CookingPot,
  Sofa,
  ShowerHead
} from 'lucide-react';

const BUNDLE_THEMES = {
  blue: {
    cardBg: '#E7F1FC',
    imagePanelBg: 'linear-gradient(135deg, #6E91BA 0%, #5278A6 100%)',
    buttonBg: 'linear-gradient(90deg, #1E3E66 0%, #0E1F38 100%)',
    priceColor: '#124682',
    Icon: Sparkles
  },
  cream: {
    cardBg: '#FCF4EC',
    imagePanelBg: 'linear-gradient(135deg, #EAD7C3 0%, #DEC3A7 100%)',
    buttonBg: 'linear-gradient(90deg, #355679 0%, #24405E 100%)',
    priceColor: '#13213C',
    Icon: CookingPot
  },
  slate: {
    cardBg: '#E7F0FA',
    imagePanelBg: 'linear-gradient(135deg, #274469 0%, #152842 100%)',
    buttonBg: 'linear-gradient(90deg, #1B304D 0%, #0F1C2E 100%)',
    priceColor: '#132747',
    Icon: Sofa
  }
};

const getBundleTheme = (bundle, idx) => {
  const text = `${bundle.name || ''} ${bundle.slug || ''}`.toLowerCase();
  if (text.includes('kitchen') || text.includes('foam') || text.includes('degreas')) {
    return BUNDLE_THEMES.cream;
  }
  if (text.includes('sofa') || text.includes('fabric') || text.includes('living')) {
    return BUNDLE_THEMES.slate;
  }
  if (text.includes('glass') || text.includes('ceramic') || text.includes('bathroom')) {
    return BUNDLE_THEMES.blue;
  }
  const order = [BUNDLE_THEMES.blue, BUNDLE_THEMES.cream, BUNDLE_THEMES.slate];
  return order[idx % order.length];
};

const defaultValueBundles = [
  {
    id: 'bundle-bathroom-protector',
    name: 'Bathroom Protector Kit',
    slug: 'bathroom-protector-kit',
    subtitle: 'Complete Protection For Your Glass Partitions, Taps, Fittings & Tiles.',
    price: 1999,
    originalPrice: 3299,
    image: 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineBathroomCleaningTrio.png?v=1791689722'
  },
  {
    id: 'bundle-living-room',
    name: 'Living Room Kit',
    slug: 'living-room-kit',
    subtitle: 'Complete Surface Protection For Sofas, Fabrics, Wood & Glass Tables.',
    price: 1999,
    originalPrice: 4299,
    image: 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineCleaningCollectionDisplay.png?v=1791707672'
  },
  {
    id: 'bundle-kitchen-protector',
    name: 'Kitchen Protector Kit',
    slug: 'kitchen-protector-kit',
    subtitle: 'Complete Degreaser & Shield For Kitchen Countertops, Chimneys & Tiles.',
    price: 1699,
    originalPrice: 3299,
    image: 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/WhatsAppImage2026-10-10at23.23.25_1.jpg?v=1791654877'
  }
];

export const ShopPage = () => {
  const { addToCart } = useCart();
  const bundleScrollRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsList, setProductsList] = useState([]);
  const [bundlesList, setBundlesList] = useState(defaultValueBundles);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'All',
    surface: searchParams.get('surface') || 'All',
    concern: searchParams.get('concern') || 'All',
    room: searchParams.get('room') || 'All',
    search: searchParams.get('search') || '',
    maxPrice: 10000,
    minRating: 0
  });

  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Shop All Products | GharShine Premium Surface Care";
  }, []);

  // Sync state if URL searchParams changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: searchParams.get('category') || 'All',
      surface: searchParams.get('surface') || 'All',
      concern: searchParams.get('concern') || 'All',
      room: searchParams.get('room') || 'All',
      search: searchParams.get('search') || ''
    }));
  }, [searchParams]);

  // Fetch products via productService
  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);
      const res = await productService.getProducts({
        ...filters,
        sortBy
      });
      if (res.success) {
        setProductsList(res.data);

        // Populate Best Value Bundles dynamically from live Shopify bundles/combos/kits if available
        if (Array.isArray(res.data) && res.data.length > 0) {
          const matchedBundles = res.data.filter((p) => {
            if (!p) return false;
            const name = (p.name || '').toLowerCase();
            const slug = (p.slug || '').toLowerCase();
            const colls = (p.collectionTitles || []).join(' ').toLowerCase();
            const handles = (p.collectionHandles || []).join(' ').toLowerCase();
            const tags = (p.tags || []).join(' ').toLowerCase();

            return (
              colls.includes('bundle') ||
              colls.includes('best value') ||
              handles.includes('bundle') ||
              handles.includes('best-value') ||
              tags.includes('bundle') ||
              p.isCombo ||
              name.includes('combo') ||
              name.includes('kit') ||
              slug.includes('combo') ||
              slug.includes('kit')
            );
          });

          if (matchedBundles.length > 0) {
            setBundlesList(
              matchedBundles.map((b) => ({
                id: b.id,
                name: b.name,
                slug: b.slug,
                subtitle:
                  b.shortDescription ||
                  'Complete Surface Care & Long-Lasting Nano Protection For Your Entire Home.',
                price: Number(b.price) || 1699,
                originalPrice: b.originalPrice
                  ? Number(b.originalPrice)
                  : Math.round((Number(b.price) || 1699) * 1.4),
                image:
                  b.thumbnail ||
                  b.images?.[0] ||
                  'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineBathroomCleaningTrio.png?v=1791689722'
              }))
            );
          }
        }
      }
      setLoading(false);
    };

    fetchFiltered();
  }, [filters, sortBy]);

  const scrollBundlesLeft = () => {
    if (bundleScrollRef.current) {
      bundleScrollRef.current.scrollBy({ left: -440, behavior: 'smooth' });
    }
  };

  const scrollBundlesRight = () => {
    if (bundleScrollRef.current) {
      bundleScrollRef.current.scrollBy({ left: 440, behavior: 'smooth' });
    }
  };

  const handleAddBundleToCart = (bundle) => {
    addToCart(
      {
        id: bundle.id,
        name: bundle.name,
        slug: bundle.slug,
        price: bundle.price,
        originalPrice: bundle.originalPrice,
        thumbnail: bundle.image,
        shortDescription: bundle.subtitle,
        isCombo: true
      },
      1,
      true
    );
  };

  const handleClearSearch = () => {
    setFilters((prev) => ({ ...prev, search: '' }));
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'All',
      surface: 'All',
      concern: 'All',
      room: 'All',
      search: '',
      maxPrice: 10000,
      minRating: 0
    });
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Shop All Products' }]} />

        {/* BEST VALUE BUNDLES SECTION AT TOP */}
        {bundlesList.length > 0 && (
          <div className="mt-4 mb-12 relative">
            {/* Heading + Two-Tone Underline */}
            <div className="flex flex-col items-center justify-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-[38px] font-black tracking-tight text-center leading-tight">
                <span className="text-[#121D33]">Best Value </span>
                <span className="text-[#235893]">Bundles</span>
              </h2>
              <div className="mt-2.5 flex items-center justify-center">
                <span className="w-14 sm:w-16 h-[3px] bg-[#121D33] rounded-l-full" />
                <span className="w-14 sm:w-16 h-[3px] bg-[#3E7BBE] rounded-r-full" />
              </div>
            </div>

            <div className="relative group/bundles">
              {/* Left Floating Arrow */}
              <button
                onClick={scrollBundlesLeft}
                aria-label="Previous Bundles"
                className="flex lg:hidden absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md items-center justify-center transition active:scale-95 cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Right Floating Arrow */}
              <button
                onClick={scrollBundlesRight}
                aria-label="Next Bundles"
                className="flex lg:hidden absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md items-center justify-center transition active:scale-95 cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>

              {/* Horizontal Scrollable on Mobile/Tablet, 3-Column Grid on Desktop */}
              <div
                ref={bundleScrollRef}
                className={`flex lg:grid gap-5 sm:gap-6 overflow-x-auto lg:overflow-visible scroll-smooth no-scrollbar pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory ${
                  bundlesList.length <= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-3'
                }`}
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {bundlesList.map((bundle, idx) => {
                  const theme = getBundleTheme(bundle, idx);
                  const IconComponent = theme.Icon;

                  return (
                    <div
                      key={bundle.id}
                      style={{ backgroundColor: theme.cardBg }}
                      className="w-[340px] sm:w-[420px] lg:w-auto min-h-[260px] sm:min-h-[280px] shrink-0 lg:shrink snap-start rounded-[28px] overflow-hidden flex flex-row items-stretch shadow-[0_10px_28px_rgba(15,23,42,0.07)] hover:shadow-[0_16px_36px_rgba(15,23,42,0.12)] transition-all duration-300 relative group"
                    >
                      {/* Left Content Area */}
                      <div className="w-[54%] sm:w-[55%] p-5 sm:p-6 flex flex-col justify-between z-10">
                        <div>
                          {/* Circular Dark Navy Category Icon Badge */}
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#13223B] text-white flex items-center justify-center shadow-md mb-3.5">
                            <IconComponent size={23} strokeWidth={1.8} />
                          </div>

                          {/* Product Title */}
                          <Link to={`/product/${bundle.slug}`}>
                            <h3 className="text-base sm:text-[21px] font-extrabold text-[#121D33] leading-[1.22] hover:opacity-80 transition-opacity line-clamp-3">
                              {bundle.name}
                            </h3>
                          </Link>
                        </div>

                        {/* Price + Pill Add to Cart Button */}
                        <div className="mt-4">
                          <div className="flex items-baseline gap-2.5 mb-3">
                            {bundle.originalPrice && (
                              <span className="text-xs sm:text-[15px] text-slate-500 line-through font-semibold">
                                ₹{Number(bundle.originalPrice).toLocaleString('en-IN')}
                              </span>
                            )}
                            <span
                              style={{ color: theme.priceColor }}
                              className="text-xl sm:text-[26px] font-black tracking-tight"
                            >
                              ₹{Number(bundle.price).toLocaleString('en-IN')}
                            </span>
                          </div>

                          <button
                            onClick={() => handleAddBundleToCart(bundle)}
                            style={{ background: theme.buttonBg }}
                            className="w-full sm:w-auto min-w-[145px] sm:min-w-[165px] px-5 py-2.5 sm:py-3 rounded-full hover:opacity-95 active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                          >
                            <ShoppingCart size={16} strokeWidth={2.2} />
                            <span>Add to cart</span>
                          </button>
                        </div>
                      </div>

                      {/* Right Arched Image Panel */}
                      <Link
                        to={`/product/${bundle.slug}`}
                        style={{ background: theme.imagePanelBg }}
                        className="w-[46%] sm:w-[45%] relative rounded-l-[120px] overflow-hidden flex items-center justify-center p-2 sm:p-3 block"
                      >
                        {/* Subtle outer decorative arc line */}
                        <div className="pointer-events-none absolute -left-3 inset-y-2 w-12 rounded-l-[130px] border-l border-slate-900/15" />

                        <img
                          src={bundle.image}
                          alt={bundle.name}
                          className="w-full h-full object-cover rounded-l-[110px] group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="py-6 sm:py-8 border-y border-slate-100 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={13} />
            <span>Complete Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            All Home Care &amp; Surface Solutions
          </h1>
          <p className="text-xs sm:text-base text-slate-600 mt-2 max-w-2xl">
            Explore scientifically calibrated formulas for glass, ceramic, fabric, Italian marble, teakwood, and heavy kitchen grease.
          </p>
        </div>

        {/* Top Toolbar: Product Count & Sort Dropdown */}
        <div className="flex items-center justify-between gap-4 p-4 bg-[#F8FAFA] rounded-2xl border border-slate-100 mb-8">
          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            Showing {productsList.length} of {productsList.length} products
          </span>

          {/* Sort Dropdown */}
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        {/* Active search tag */}
        {filters.search && (
          <div className="flex items-center gap-2 text-xs text-slate-600 bg-[#E8F8F8] p-3 rounded-xl mb-6">
            <span>Showing search results for: <strong>"{filters.search}"</strong></span>
            <button
              onClick={handleClearSearch}
              className="font-bold text-[#087F8C] underline ml-auto"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Full-width Product Grid */}
        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : productsList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {productsList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#F8FAFA] rounded-3xl border border-slate-100 p-8">
            <div className="w-16 h-16 rounded-3xl bg-white shadow-xs text-slate-400 flex items-center justify-center mx-auto mb-4">
              <PackageOpen size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No products found</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Please check back later or explore our featured products.
            </p>
            <div className="mt-6">
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl text-xs sm:text-sm font-bold transition"
              >
                Reset Catalog
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
