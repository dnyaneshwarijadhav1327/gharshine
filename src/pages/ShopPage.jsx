import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SortDropdown } from '../components/shop/SortDropdown';
import { ProductCard } from '../components/product/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGridSkeleton } from '../components/common/LoadingSkeleton';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import { Sparkles, PackageOpen, ChevronLeft, ChevronRight } from 'lucide-react';

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
      bundleScrollRef.current.scrollBy({ left: -520, behavior: 'smooth' });
    }
  };

  const scrollBundlesRight = () => {
    if (bundleScrollRef.current) {
      bundleScrollRef.current.scrollBy({ left: 520, behavior: 'smooth' });
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
            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-slate-950 text-center tracking-tight mb-7">
              Best Value Bundles
            </h2>

            <div className="relative group/bundles">
              {/* Left Floating Arrow */}
              <button
                onClick={scrollBundlesLeft}
                aria-label="Previous Bundles"
                className="flex absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md items-center justify-center transition active:scale-95 cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Right Floating Arrow */}
              <button
                onClick={scrollBundlesRight}
                aria-label="Next Bundles"
                className="flex absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md items-center justify-center transition active:scale-95 cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>

              {/* Horizontal Scrollable Cards */}
              <div
                ref={bundleScrollRef}
                className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {bundlesList.map((bundle) => (
                  <div
                    key={bundle.id}
                    className="w-[330px] sm:w-[480px] md:w-[540px] min-h-[230px] sm:min-h-[250px] shrink-0 snap-start rounded-2xl sm:rounded-3xl bg-[#FDE07D] overflow-hidden flex flex-row items-stretch shadow-xs hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Left Content Area (Yellow Panel) */}
                    <div className="w-[60%] sm:w-[62%] p-5 sm:p-7 flex flex-col justify-between">
                      <div>
                        <Link to={`/product/${bundle.slug}`}>
                          <h3 className="text-lg sm:text-2xl font-extrabold text-slate-950 leading-snug hover:opacity-80 transition-opacity line-clamp-2">
                            {bundle.name}
                          </h3>
                        </Link>
                        <p className="text-xs sm:text-[13px] text-slate-800 mt-2 leading-relaxed line-clamp-2">
                          {bundle.subtitle}
                        </p>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-baseline gap-2.5 mb-3.5">
                          {bundle.originalPrice && (
                            <span className="text-sm sm:text-lg text-slate-600 line-through font-medium">
                              ₹{Number(bundle.originalPrice).toLocaleString('en-IN')}
                            </span>
                          )}
                          <span className="text-lg sm:text-2xl font-black text-slate-950">
                            ₹{Number(bundle.price).toLocaleString('en-IN')}
                          </span>
                        </div>

                        <button
                          onClick={() => handleAddBundleToCart(bundle)}
                          className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-950 font-bold text-xs sm:text-sm shadow-xs transition cursor-pointer"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>

                    {/* Right Image Area */}
                    <Link
                      to={`/product/${bundle.slug}`}
                      className="w-[40%] sm:w-[38%] relative overflow-hidden bg-white block"
                    >
                      <img
                        src={bundle.image}
                        alt={bundle.name}
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                ))}
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
