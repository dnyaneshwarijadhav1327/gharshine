import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterSidebar } from '../components/shop/FilterSidebar';
import { SortDropdown } from '../components/shop/SortDropdown';
import { ProductCard } from '../components/product/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGridSkeleton } from '../components/common/LoadingSkeleton';
import { productService } from '../services/productService';
import { Filter, Sparkles, PackageOpen } from 'lucide-react';

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filters State synced from URL params
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'All',
    surface: searchParams.get('surface') || 'All',
    concern: searchParams.get('concern') || 'All',
    room: searchParams.get('room') || 'All',
    search: searchParams.get('search') || '',
    maxPrice: 3500,
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

  // Fetch products via productService mock layer
  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);
      const res = await productService.getProducts({
        ...filters,
        sortBy
      });
      if (res.success) {
        setProductsList(res.data);
      }
      setLoading(false);
    };

    fetchFiltered();
  }, [filters, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value };
      return updated;
    });

    // Update query params
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'All') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'All',
      surface: 'All',
      concern: 'All',
      room: 'All',
      search: '',
      maxPrice: 3500,
      minRating: 0
    });
    setSearchParams({});
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Shop All Products' }]} />

        {/* Page Header */}
        <div className="py-6 sm:py-8 border-b border-slate-100 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={13} />
            <span>Complete Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            All Home Care & Surface Solutions
          </h1>
          <p className="text-xs sm:text-base text-slate-600 mt-2 max-w-2xl">
            Explore scientifically calibrated formulas for glass, ceramic, fabric, Italian marble, teakwood, and heavy kitchen grease.
          </p>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalResults={productsList.length}
            />
          </div>

          {/* Right Product Grid Area (9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar: Mobile Filter Button & Sort Dropdown */}
            <div className="flex items-center justify-between gap-4 p-4 bg-[#F8FAFA] rounded-2xl border border-slate-100">
              {/* Mobile Filter Trigger */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-2xs"
              >
                <Filter size={14} className="text-[#087F8C]" />
                <span>Filter Solutions</span>
              </button>

              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                Showing {Math.min(visibleCount, productsList.length)} of {productsList.length} products
              </span>

              {/* Sort Dropdown */}
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            {/* Active search or filter tags */}
            {filters.search && (
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-[#E8F8F8] p-3 rounded-xl">
                <span>Showing search results for: <strong>"{filters.search}"</strong></span>
                <button
                  onClick={() => handleFilterChange('search', '')}
                  className="font-bold text-[#087F8C] underline ml-auto"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* Product Grid / Loading / Empty */}
            {loading ? (
              <ProductGridSkeleton count={8} />
            ) : productsList.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
                  {productsList.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {visibleCount < productsList.length && (
                  <div className="text-center pt-8">
                    <button
                      onClick={handleLoadMore}
                      className="px-8 py-3.5 bg-[#F8FAFA] hover:bg-[#E8F8F8] text-[#087F8C] border border-teal-200 rounded-2xl text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition"
                    >
                      Load More Products ({productsList.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-[#F8FAFA] rounded-3xl border border-slate-100 p-8">
                <div className="w-16 h-16 rounded-3xl bg-white shadow-xs text-slate-400 flex items-center justify-center mx-auto mb-4">
                  <PackageOpen size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No products match your filters</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your price range, selected surface, or clearing your active filters.
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl text-xs sm:text-sm font-bold transition"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Drawer Filter Modal */}
      {isMobileFilterOpen && (
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalResults={productsList.length}
          isMobileDrawer={true}
          onCloseMobileDrawer={() => setIsMobileFilterOpen(false)}
        />
      )}
    </div>
  );
};
