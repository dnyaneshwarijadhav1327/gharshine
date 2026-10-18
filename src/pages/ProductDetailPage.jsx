import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductTabs } from '../components/product/ProductTabs';
import { ProductVideoDemo } from '../components/product/ProductVideoDemo';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
  ShoppingCart,
  ShoppingBag,
  Heart,
  Sparkles,
  Plus,
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Gem,
  Sofa
} from 'lucide-react';

const SURFACE_TAG_ICONS = [Sparkles, Layers, Gem, Sofa];

const MINI_CARD_THEMES = [
  'linear-gradient(180deg, #E2F1FC 0%, #D2E8FA 100%)',
  'linear-gradient(180deg, #E3F3EC 0%, #CBE8DC 100%)',
  'linear-gradient(180deg, #EFE5FA 0%, #E2D2F7 100%)'
];

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const routineScrollRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { cartItems, addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);

    const fetchProductData = async () => {
      setLoading(true);
      const [prodRes, listRes] = await Promise.all([
        productService.getProductBySlug(slug),
        productService.getProducts()
      ]);

      if (prodRes.success && prodRes.data) {
        setProduct(prodRes.data);
        document.title = `${prodRes.data.name} | GharShine`;
      } else {
        navigate('/shop');
        return;
      }

      if (listRes.success && Array.isArray(listRes.data)) {
        setAllProducts(listRes.data);
      }
      setLoading(false);
    };

    fetchProductData();
  }, [slug, navigate]);

  if (loading || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#112239] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const originalPrice =
    product.originalPrice && product.originalPrice > product.price
      ? product.originalPrice
      : Math.round(product.price * 1.4);
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart(product, quantity, true);
  };

  const handleQuickAddItem = (item, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    addToCart(item, 1, true);
  };

  const isItemInCart = (itemId) => {
    return cartItems.some((ci) => ci.product.id === itemId || ci.product.slug === itemId);
  };

  // Filter other products (excluding current product)
  const otherProducts = allProducts.filter(
    (p) => p && p.id !== product.id && p.slug !== product.slug
  );

  // Top 3 companion cards shown under the Add to Cart button
  const threeCompanionCards = otherProducts.slice(0, 3);

  // Products for "Complete Your Cleaning Routine" horizontal bar
  const routineProducts = otherProducts.length > 0 ? otherProducts : allProducts;

  // Build surface pills row matching reference screenshot
  const rawSurfaces =
    Array.isArray(product.surface) && product.surface.length > 0
      ? product.surface
      : ['Multi-Surface', 'Glass', 'Stone', 'Fabric'];
  const surfacePills = rawSurfaces.slice(0, 4);

  const scrollRoutine = (dir) => {
    if (routineScrollRef.current) {
      routineScrollRef.current.scrollBy({
        left: dir === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFBF9] py-6 sm:py-9 pb-24 sm:pb-16">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Shop', url: '/shop' },
            {
              label: product.category || 'Combos',
              url: `/shop?category=${encodeURIComponent(product.category || 'Combos')}`
            },
            { label: product.name }
          ]}
        />

        {/* MAIN PRODUCT HERO SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-3 items-start">
          {/* LEFT: Vertical Thumbnails + Main Rounded Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images?.length > 0 ? product.images : [product.thumbnail]}
              productName={product.name}
            />
          </div>

          {/* RIGHT: Product Details, Actions & 3 Companion Mini Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            {/* Top Pill Tags Row */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#112239] text-white shadow-2xs">
                <Sparkles size={13} />
                <span>{product.isCombo ? 'Combo Set' : product.category || 'Premium Care'}</span>
              </span>

              {surfacePills.map((surf, idx) => {
                const TagIcon = SURFACE_TAG_ICONS[idx % SURFACE_TAG_ICONS.length];
                return (
                  <span
                    key={surf}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#EEF2F7] text-[#1E2D45]"
                  >
                    <TagIcon size={12} className="text-[#39557A]" />
                    <span>{surf}</span>
                  </span>
                );
              })}
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#111C30] leading-[1.18] tracking-tight">
              {product.name}
            </h1>

            {/* Price + Strikethrough MRP + Pink Discount Pill */}
            <div className="flex items-center gap-3.5">
              <span className="text-3xl sm:text-[36px] font-black text-[#111C30] tracking-tight">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </span>
              {originalPrice > product.price && (
                <span className="text-lg sm:text-xl text-slate-400 line-through font-semibold">
                  ₹{Number(originalPrice).toLocaleString('en-IN')}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="px-3 py-1 rounded-full bg-[#FDE8E9] text-[#C83745] text-xs sm:text-[13px] font-extrabold">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Divider line */}
            <div className="border-t border-slate-200/80" />

            {/* Quantity Selector + Dark Navy Add to Cart + Wishlist Heart Button */}
            <div className="flex items-center gap-3">
              {/* Quantity Box */}
              <div className="flex items-center justify-between border border-slate-200 rounded-2xl bg-white h-13 sm:h-14 px-2 w-32 sm:w-36 shadow-2xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-xl text-[#112239] hover:bg-slate-100 transition text-lg font-bold flex items-center justify-center cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="text-sm sm:text-base font-extrabold text-[#112239]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 rounded-xl text-[#112239] hover:bg-slate-100 transition text-lg font-bold flex items-center justify-center cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Primary Dark Navy Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 h-13 sm:h-14 bg-[#112239] hover:bg-[#1a3150] active:scale-[0.99] text-white font-bold rounded-2xl text-sm sm:text-base transition flex items-center justify-center gap-2.5 shadow-md cursor-pointer"
              >
                <ShoppingCart size={19} strokeWidth={2.2} />
                <span>Add to Cart</span>
              </button>

              {/* Wishlist Heart Button */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Toggle Wishlist"
                className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center transition shadow-2xs cursor-pointer shrink-0 ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-slate-200 text-[#112239] hover:bg-slate-50'
                }`}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* 3 Pastel Companion Product Cards with '+' Button */}
            {threeCompanionCards.length > 0 && (
              <div className="grid grid-cols-3 gap-3 sm:gap-3.5 pt-2">
                {threeCompanionCards.map((item, idx) => {
                  const added = isItemInCart(item.id);
                  const bgGradient = MINI_CARD_THEMES[idx % MINI_CARD_THEMES.length];

                  return (
                    <div
                      key={item.id}
                      style={{ background: bgGradient }}
                      className="relative aspect-[3/3.6] rounded-[22px] p-2.5 overflow-hidden flex items-center justify-center group shadow-2xs hover:shadow-md transition-all"
                    >
                      <Link
                        to={`/product/${item.slug}`}
                        className="w-full h-full flex items-center justify-center"
                        title={item.name}
                      >
                        <img
                          src={item.thumbnail || item.images?.[0]}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </Link>

                      {/* Floating Bottom-Right '+' Add Button */}
                      <button
                        onClick={(e) => handleQuickAddItem(item, e)}
                        title={`Add ${item.name} to cart`}
                        className={`absolute bottom-2.5 right-2.5 w-9 h-9 sm:w-10 sm:h-10 rounded-xl shadow-md flex items-center justify-center transition active:scale-95 cursor-pointer ${
                          added
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white hover:bg-slate-50 text-[#112239]'
                        }`}
                      >
                        {added ? <Check size={17} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* COMPLETE YOUR CLEANING ROUTINE BANNER SECTION */}
        {routineProducts.length > 0 && (
          <div className="mt-10 sm:mt-12 rounded-[32px] bg-[#FAF1E6] p-6 sm:p-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Heading + Circle Arrow CTA */}
              <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start justify-between gap-4">
                <h2 className="text-xl sm:text-2xl lg:text-[26px] font-black text-[#111C30] leading-[1.2] tracking-tight">
                  Complete
                  <br className="hidden sm:inline" /> Your Cleaning
                  <br className="hidden sm:inline" /> Routine
                </h2>

                <Link
                  to="/shop"
                  aria-label="Explore all routine products"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#112239] hover:bg-[#1d3557] text-white flex items-center justify-center shadow-md transition active:scale-95 shrink-0"
                >
                  <ArrowRight size={20} />
                </Link>
              </div>

              {/* Right Horizontal Carousel of 4 White Cards */}
              <div className="lg:col-span-9 relative">
                {/* Left Scroll Arrow */}
                <button
                  onClick={() => scrollRoutine('left')}
                  aria-label="Scroll routine left"
                  className="flex absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-slate-50 text-[#112239] shadow-md items-center justify-center transition active:scale-95 cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Right Scroll Arrow */}
                <button
                  onClick={() => scrollRoutine('right')}
                  aria-label="Scroll routine right"
                  className="flex absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-slate-50 text-[#112239] shadow-md items-center justify-center transition active:scale-95 cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>

                <div
                  ref={routineScrollRef}
                  className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto lg:overflow-visible scroll-smooth no-scrollbar py-1 px-1"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {routineProducts.slice(0, 4).map((rp) => {
                    const rpOriginal =
                      rp.originalPrice && rp.originalPrice > rp.price
                        ? rp.originalPrice
                        : Math.round(rp.price * 1.4);

                    return (
                      <div
                        key={rp.id}
                        className="w-[210px] sm:w-[230px] lg:w-auto shrink-0 lg:shrink bg-white rounded-[22px] p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                      >
                        <Link
                          to={`/product/${rp.slug}`}
                          className="h-32 sm:h-36 w-full flex items-center justify-center overflow-hidden rounded-xl bg-white mb-3"
                          title={rp.name}
                        >
                          <img
                            src={rp.thumbnail || rp.images?.[0]}
                            alt={rp.name}
                            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </Link>

                        <Link to={`/product/${rp.slug}`} className="mb-2 block">
                          <h4 className="text-xs font-bold text-[#111C30] line-clamp-1 hover:text-[#1D63B8] transition-colors">
                            {rp.name}
                          </h4>
                        </Link>

                        <div className="flex items-center justify-between gap-2 pt-1">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base sm:text-lg font-black text-[#111C30]">
                              ₹{Number(rp.price).toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs text-slate-400 line-through font-medium">
                              ₹{Number(rpOriginal).toLocaleString('en-IN')}
                            </span>
                          </div>

                          <button
                            onClick={(e) => handleQuickAddItem(rp, e)}
                            aria-label={`Add ${rp.name} to cart`}
                            className="w-9 h-9 rounded-xl bg-[#112239] hover:bg-[#1d3557] active:scale-95 text-white flex items-center justify-center shadow-xs transition cursor-pointer shrink-0"
                          >
                            <ShoppingCart size={15} strokeWidth={2.2} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Product Tabs & Specifications */}
        <div className="mt-10">
          <ProductTabs product={product} />
        </div>

        {/* Product In Action Video Section */}
        <ProductVideoDemo
          title="See GharShine In Action • Real Video Demonstration"
          subtitle="Watch how our nano-barrier technology prevents hard water scaling, oil stains, and turmeric marks."
        />
      </div>

      {/* Sticky Bottom Add-to-Cart Bar on Mobile */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden z-30 flex items-center justify-between gap-3 shadow-lg">
        <div className="min-w-0">
          <span className="text-xs font-bold text-slate-900 truncate block">
            {product.name}
          </span>
          <span className="text-xs font-extrabold text-[#112239]">
            ₹{Number(product.price).toLocaleString('en-IN')}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="px-5 py-2.5 bg-[#112239] text-white rounded-xl text-xs font-black shrink-0 shadow-md flex items-center gap-1.5 cursor-pointer"
        >
          <ShoppingBag size={15} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

