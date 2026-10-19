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
  Sofa
} from 'lucide-react';

const BUNDLE_THEMES = [
  {
    cardBg: '#E4F0FB',
    archBg: 'linear-gradient(145deg, #7B9DC4 0%, #587BA6 100%)',
    arcBorder: 'rgba(88, 123, 166, 0.35)',
    buttonBg: 'linear-gradient(90deg, #1E3E66 0%, #0D1E36 100%)',
    priceColor: '#124682',
    Icon: Sparkles
  },
  {
    cardBg: '#FDF4EB',
    archBg: 'linear-gradient(145deg, #EAD8C5 0%, #DBC1A6 100%)',
    arcBorder: 'rgba(180, 148, 115, 0.45)',
    buttonBg: 'linear-gradient(90deg, #3A5C80 0%, #243F5C 100%)',
    priceColor: '#13213C',
    Icon: CookingPot
  },
  {
    cardBg: '#E6EFFA',
    archBg: 'linear-gradient(145deg, #274469 0%, #13253E 100%)',
    arcBorder: 'rgba(39, 68, 105, 0.45)',
    buttonBg: 'linear-gradient(90deg, #1A2F4B 0%, #0E1B2D 100%)',
    priceColor: '#132747',
    Icon: Sofa
  }
];

const initialValueBundles = [
  {
    id: 'gid://shopify/Product/10384996728889',
    key: 'ultimate-invisel-combo',
    name: 'Ultimate Invisel Combo- All Protector and All Cleaners Combo for the Complete House',
    slug: 'ultimate-invisel-combo-all-protector-and-all-cleaners-combo-for-the-complete-house',
    price: 6499,
    originalPrice: 8449,
    image: 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineCleaningCollectionDisplay_1.png?v=1792382351',
    cardBg: '#E4F0FB',
    archBg: 'linear-gradient(145deg, #7B9DC4 0%, #587BA6 100%)',
    arcBorder: 'rgba(88, 123, 166, 0.35)',
    buttonBg: 'linear-gradient(90deg, #1E3E66 0%, #0D1E36 100%)',
    priceColor: '#124682',
    Icon: Sparkles
  }
];

export const ShopPage = () => {
  const { addToCart } = useCart();
  const bundleScrollRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsList, setProductsList] = useState([]);
  const [bundlesList, setBundlesList] = useState(initialValueBundles);
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

        // Sync Best Value Bundles strictly with products in 'Best Value Bundles' collection in Shopify
        if (Array.isArray(res.data) && res.data.length > 0) {
          const bundleCollectionProducts = res.data.filter((p) => {
            if (!p) return false;
            const colls = p.collectionTitles || [];
            const handles = p.collectionHandles || [];
            return (
              colls.some((c) => c.includes('best value bundle') || c.includes('value bundle')) ||
              handles.some((h) => h.includes('best-value-bundle') || h.includes('value-bundle'))
            );
          });

          if (bundleCollectionProducts.length > 0) {
            const formattedBundles = bundleCollectionProducts.map((p, idx) => {
              const themeTemplate = BUNDLE_THEMES[idx % BUNDLE_THEMES.length];
              const priceNum = Number(p.price) || 999;
              return {
                ...themeTemplate,
                id: p.id,
                key: `bundle-${p.slug || idx}`,
                name: p.name,
                slug: p.slug,
                price: priceNum,
                originalPrice: p.originalPrice
                  ? Number(p.originalPrice)
                  : Math.round(priceNum * 1.3),
                image: p.thumbnail || p.images?.[0] || 'https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineCleaningCollectionDisplay_1.png?v=1792382351'
              };
            });

            setBundlesList(formattedBundles);
          }
        }
      }
      setLoading(false);
    };

    fetchFiltered();
  }, [filters, sortBy]);

  const scrollBundlesLeft = () => {
    if (bundleScrollRef.current) {
      bundleScrollRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollBundlesRight = () => {
    if (bundleScrollRef.current) {
      bundleScrollRef.current.scrollBy({ left: 380, behavior: 'smooth' });
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

        {/* BEST VALUE BUNDLES SECTION (EXACT 3 CARDS AT TOP) */}
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

          <div className="relative">
            {/* Mobile Scroll Arrows */}
            <button
              onClick={scrollBundlesLeft}
              aria-label="Previous Bundles"
              className="flex lg:hidden absolute left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md items-center justify-center transition active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={scrollBundlesRight}
              aria-label="Next Bundles"
              className="flex lg:hidden absolute right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md items-center justify-center transition active:scale-95 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>

            {/* Cards Row: Horizontal Swipe on Mobile, 3-Column Grid on Laptop/Desktop */}
            <div
              ref={bundleScrollRef}
              className="flex lg:grid lg:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto lg:overflow-visible scroll-smooth no-scrollbar pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {bundlesList.map((bundle) => {
                const IconComponent = bundle.Icon;

                return (
                  <div
                    key={bundle.id}
                    style={{ backgroundColor: bundle.cardBg }}
                    className="w-[335px] sm:w-[400px] lg:w-auto min-h-[265px] sm:min-h-[285px] shrink-0 lg:shrink snap-start rounded-[28px] overflow-hidden flex flex-row items-stretch shadow-[0_10px_28px_rgba(15,23,42,0.07)] hover:shadow-[0_16px_36px_rgba(15,23,42,0.12)] transition-all duration-300 relative group"
                  >
                    {/* Left Text & Button Column */}
                    <div className="w-[53%] sm:w-[54%] p-5 sm:p-6 flex flex-col justify-between z-10">
                      <div>
                        {/* Circular Dark Navy Category Icon Badge */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#13223B] text-white flex items-center justify-center shadow-md mb-3.5">
                          <IconComponent size={23} strokeWidth={1.8} />
                        </div>

                        {/* Product Title */}
                        <Link to={`/product/${bundle.slug}`}>
                          <h3 className="text-base sm:text-[20px] font-extrabold text-[#121D33] leading-[1.22] hover:opacity-80 transition-opacity line-clamp-3">
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
                            style={{ color: bundle.priceColor }}
                            className="text-xl sm:text-[26px] font-black tracking-tight"
                          >
                            ₹{Number(bundle.price).toLocaleString('en-IN')}
                          </span>
                        </div>

                        <button
                          onClick={() => handleAddBundleToCart(bundle)}
                          style={{ background: bundle.buttonBg }}
                          className="w-full sm:w-auto min-w-[145px] sm:min-w-[165px] px-5 py-2.5 sm:py-3 rounded-full hover:opacity-95 active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                        >
                          <ShoppingCart size={16} strokeWidth={2.2} />
                          <span>Add to cart</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Curved Arch Image Container */}
                    <div className="w-[47%] sm:w-[46%] relative flex items-stretch">
                      {/* Decorative thin outer arc line */}
                      <div
                        style={{ borderColor: bundle.arcBorder }}
                        className="pointer-events-none absolute -left-2.5 top-2 bottom-2 w-full rounded-l-[140px] border-l-[1.5px] z-10"
                      />

                      <Link
                        to={`/product/${bundle.slug}`}
                        style={{ background: bundle.archBg }}
                        className="w-full h-full relative rounded-l-[135px] overflow-hidden flex items-center justify-center block"
                      >
                        <img
                          src={bundle.image}
                          alt={bundle.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div className="py-6 sm:py-8 border-t border-b border-slate-100 mb-8">
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
