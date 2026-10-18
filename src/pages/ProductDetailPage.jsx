import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductTabs } from '../components/product/ProductTabs';
import { BundleUpsellBox } from '../components/product/BundleUpsellBox';
import { ProductVideoDemo } from '../components/product/ProductVideoDemo';
import { ProductsYouMayLike } from '../components/product/ProductsYouMayLike';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
  ShoppingBag,
  Heart,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setQuantity(1);
    setIsReadMoreOpen(false);

    const fetchProductData = async () => {
      setLoading(true);
      const res = await productService.getProductBySlug(slug);
      if (res.success && res.data) {
        setProduct(res.data);
        document.title = `${res.data.name} | GharShine`;

        const rel = await productService.getRelatedProducts(res.data.relatedProducts);
        if (rel.success) {
          setRelatedProducts(rel.data);
        }
      } else {
        navigate('/shop');
      }
      setLoading(false);
    };

    fetchProductData();
  }, [slug, navigate]);

  // Ensure mobile and desktop always start at the top once product content mounts
  useEffect(() => {
    if (!loading && product) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [loading, product?.id]);

  if (loading || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#EC1668] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const ratingValue = Number(product.rating) || 4.9;
  const reviewCount = product.reviewCount || 142;

  const handleAddToCart = () => {
    addToCart(product, quantity, true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, false);
    navigate('/cart');
  };

  const surfaceText =
    Array.isArray(product.surface) && product.surface.length > 0
      ? product.surface.join(' • ').toUpperCase()
      : 'MULTI-SURFACE • GLASS • STONE • FABRIC';

  const shortText =
    product.shortDescription ||
    (product.description
      ? product.description.slice(0, 145)
      : 'Three products. One complete kit. Removes years of stubborn stains and seals every surface against future damage.');

  return (
    <div className="min-h-screen bg-[#FFFCF7] pb-24 sm:pb-12">
      {/* Top Hero Section with Pink & Warm Yellow Decorative Waves at Bottom */}
      <div className="relative overflow-hidden pt-5 sm:pt-8 pb-16 sm:pb-24">
        {/* Decorative Bottom Waves matching screenshot */}
        <svg
          className="pointer-events-none absolute bottom-0 left-0 w-full h-36 sm:h-52 z-0"
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
        >
          {/* Soft cream/yellow wave */}
          <path
            d="M0,160 C360,240 840,40 1440,120 L1440,240 L0,240 Z"
            fill="#FDE8B8"
            opacity="0.7"
          />
          {/* Golden yellow wave */}
          <path
            d="M420,240 C680,140 1050,150 1440,220 L1440,240 Z"
            fill="#FCD371"
          />
          {/* Pink wave on bottom-left */}
          <path
            d="M0,60 C220,110 380,190 660,240 L0,240 Z"
            fill="#F992BB"
          />
          <path
            d="M0,120 C180,150 320,200 520,240 L0,240 Z"
            fill="#F45D99"
          />
        </svg>

        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Main Product Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-3 items-start">
            {/* LEFT COLUMN: Gallery */}
            <div className="lg:col-span-6 xl:col-span-7">
              <ProductGallery
                images={product.images?.length > 0 ? product.images : [product.thumbnail]}
                productName={product.name}
              />
            </div>

            {/* RIGHT COLUMN: Product Details & Actions */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-3.5">
              {/* Row 1: COMBO SET pill + Surface Pill */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#E91E63] text-white shadow-2xs">
                  {product.isCombo ? 'COMBO SET' : product.badge || 'BESTSELLER'}
                </span>
                <span className="px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#FBF0D9] text-[#33281E]">
                  {surfaceText}
                </span>
              </div>

              {/* Row 2: 14 viewing now pill */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#FDE4EE] text-[#C81E62]">
                  <span>🔥</span>
                  <span>14 viewing now</span>
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#111C30] leading-[1.2] tracking-tight pt-0.5">
                {product.name}
              </h1>

              {/* Star Rating + Verified Formula pill */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-[#F59E0B]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={16}
                        fill="currentColor"
                        className="text-[#F59E0B]"
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-[#111C30]">
                    {ratingValue}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">
                    ({reviewCount})
                  </span>
                </div>

                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#E1F6EC] text-[#0F764A]">
                  Verified Formula
                </span>
              </div>

              {/* Short Description + Read more toggle */}
              <div className="text-xs sm:text-[13.5px] text-[#334155] leading-relaxed">
                <p className="inline">{shortText}</p>
                {product.description && product.description.length > 145 && isReadMoreOpen && (
                  <p className="mt-2 text-[#334155]">{product.description}</p>
                )}
                <div className="mt-1">
                  <button
                    onClick={() => setIsReadMoreOpen(!isReadMoreOpen)}
                    className="text-xs font-extrabold text-[#111C30] underline hover:text-[#E91E63] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isReadMoreOpen ? 'Show less' : 'Read more'}</span>
                    {isReadMoreOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                </div>
              </div>

              {/* Pink "Add more to your bundle" Box */}
              <div className="pt-1">
                <BundleUpsellBox currentProduct={product} />
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl sm:text-[34px] font-black text-[#111C30] tracking-tight">
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-base sm:text-lg text-slate-400 line-through font-semibold">
                    ₹{Number(product.originalPrice).toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Quantity Selector + Pink Add To Cart + Wishlist Heart */}
              <div className="flex items-center gap-3 pt-1">
                {/* Quantity Box */}
                <div className="flex items-center justify-between border border-slate-200/90 rounded-2xl bg-white h-13 sm:h-14 px-2 w-32 sm:w-36 shadow-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-xl text-[#111C30] hover:bg-slate-100 transition text-lg font-bold flex items-center justify-center cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="text-sm sm:text-base font-extrabold text-[#111C30]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 rounded-xl text-[#111C30] hover:bg-slate-100 transition text-lg font-bold flex items-center justify-center cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Hot Pink Add To Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-13 sm:h-14 bg-[#EC1668] hover:bg-[#d4115b] active:scale-[0.99] text-white font-extrabold rounded-2xl text-sm sm:text-base transition flex items-center justify-center shadow-md cursor-pointer"
                >
                  <span>Add To Cart</span>
                </button>

                {/* Wishlist Heart Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label="Toggle Wishlist"
                  className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center transition shadow-xs cursor-pointer shrink-0 ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-200 text-[#EC1668]'
                      : 'bg-white border-slate-200/90 text-[#111C30] hover:bg-slate-50'
                  }`}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* White Buy It Now Button (aligned under Quantity + Add To Cart) */}
              <div className="pr-0 sm:pr-[68px]">
                <button
                  onClick={handleBuyNow}
                  className="w-full h-12 sm:h-13 bg-white hover:bg-slate-50 active:scale-[0.99] text-[#111C30] font-extrabold rounded-2xl text-sm sm:text-base border border-slate-200/80 shadow-xs transition flex items-center justify-center cursor-pointer"
                >
                  <span>Buy It Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Below-the-Fold Sections */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Detailed Product Tabs & Specifications */}
        <ProductTabs product={product} />

        {/* Product In Action Video Section */}
        <ProductVideoDemo
          title="See GharShine In Action • Real Video Demonstration"
          subtitle="Watch how our nano-barrier technology prevents hard water scaling, oil stains, and turmeric marks."
        />

        {/* Products You May Like */}
        <ProductsYouMayLike products={relatedProducts} />
      </div>

      {/* Sticky Bottom Add-to-Cart Bar on Mobile */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden z-30 flex items-center justify-between gap-3 shadow-lg">
        <div className="min-w-0">
          <span className="text-xs font-bold text-slate-900 truncate block">
            {product.name}
          </span>
          <span className="text-xs font-extrabold text-[#EC1668]">
            ₹{Number(product.price).toLocaleString('en-IN')}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="px-5 py-2.5 bg-[#EC1668] text-white rounded-xl text-xs font-black shrink-0 shadow-md flex items-center gap-1.5 cursor-pointer"
        >
          <ShoppingBag size={15} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

