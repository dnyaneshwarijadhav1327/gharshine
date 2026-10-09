import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductTabs } from '../components/product/ProductTabs';
import { PincodeChecker } from '../components/product/PincodeChecker';
import { BundleUpsellBox } from '../components/product/BundleUpsellBox';
import { TieredSavingsBar } from '../components/product/TieredSavingsBar';
import { ProductVideoDemo } from '../components/product/ProductVideoDemo';
import { ProductsYouMayLike } from '../components/product/ProductsYouMayLike';
import { RatingStars } from '../components/common/RatingStars';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatters';
import {
  ShoppingBag,
  Zap,
  Heart,
  ShieldCheck,
  Truck,
  Droplets,
  Share2,
  Check,
  Gift,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isCopied, setIsCopied] = useState(false);
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      setLoading(true);
      const res = await productService.getProductBySlug(slug);
      if (res.success) {
        setProduct(res.data);
        document.title = `${res.data.name} | GharShine`;
        
        // Fetch related products for "Products You May Like"
        const rel = await productService.getRelatedProducts(res.data.relatedProducts);
        if (rel.success) {
          setRelatedProducts(rel.data);
        }
      } else {
        navigate('/shop');
      }
      setLoading(false);
    };

    fetchProduct();
  }, [slug, navigate]);

  if (loading || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#087F8C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const savings = Math.max(0, (product.originalPrice || product.price) - product.price);
  const rewardPoints = Math.round(product.price * 0.1);

  const handleAddToCart = () => {
    addToCart(product, quantity, true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, false);
    navigate('/cart');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      addToast('Product link copied to clipboard!', 'info');
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10 pb-24 sm:pb-10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Shop', url: '/shop' },
            { label: product.category, url: `/shop?category=${product.category}` },
            { label: product.name }
          ]}
        />

        {/* Top Product Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4 items-start">
          
          {/* Left Column: Interactive Image Gallery (7 cols) */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images || [product.thumbnail]}
              productName={product.name}
            />
          </div>

          {/* Right Column: Buying Options & Details (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Badges & Surface tags */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                {product.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#087F8C] text-white shadow-xs">
                    {product.badge}
                  </span>
                )}
                <span className="text-xs font-bold text-[#087F8C] uppercase tracking-wider bg-[#E8F8F8] px-2.5 py-0.5 rounded-md">
                  {product.surface ? product.surface.join(' • ') : product.category}
                </span>
                <span className="text-[11px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                  🔥 14 viewing now
                </span>
              </div>

              <button
                onClick={handleShare}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                title="Share product"
                aria-label="Share product"
              >
                {isCopied ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
              </button>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-3">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} size={15} />
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                Verified Formula
              </span>
            </div>

            {/* Short Problem & Solution Description */}
            <div className="text-xs sm:text-[13px] text-slate-600 leading-relaxed space-y-1">
              <p>
                Hard water stains on shower glass. White rings on chrome taps. Tiles that stay dull no matter how much you scrub.
              </p>
              <p className="font-semibold text-slate-800">
                Stop scrubbing. Start sealing....
              </p>
              
              {isReadMoreOpen && (
                <p className="pt-1 text-slate-600 animate-in fade-in">
                  {product.description || product.shortDescription}
                </p>
              )}

              <button
                onClick={() => setIsReadMoreOpen(!isReadMoreOpen)}
                className="text-xs font-bold text-slate-900 underline hover:text-[#087F8C] cursor-pointer pt-0.5 inline-flex items-center gap-1"
              >
                <span>{isReadMoreOpen ? 'Show less' : 'Read more'}</span>
                {isReadMoreOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>
            </div>

            {/* "Add more to your bundle" Widget */}
            <BundleUpsellBox />

            {/* Price Display with Save badge */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base sm:text-lg text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {savings > 0 && (
                <span className="px-2.5 py-1 rounded-md bg-[#1D8354] text-white text-xs font-bold shadow-2xs">
                  Save {formatPrice(savings)}
                </span>
              )}
            </div>

            {/* Quantity Selector + Add to Cart */}
            <div className="flex items-center gap-3 pt-1">
              {/* Quantity Counter */}
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50 h-12">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 h-full text-slate-600 hover:bg-slate-200 transition text-sm font-bold cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 h-full text-slate-600 hover:bg-slate-200 transition text-sm font-bold cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add To Cart Primary Button (Deep Teal) */}
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-[#107082] hover:bg-[#0c5c6b] active:scale-[0.98] text-white font-extrabold rounded-xl text-sm sm:text-base transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Add To Cart</span>
              </button>
            </div>

            {/* Buy It Now (Solid Black Button) */}
            <button
              onClick={handleBuyNow}
              className="w-full h-12 bg-black hover:bg-slate-800 active:scale-[0.98] text-white rounded-xl text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Buy It Now</span>
            </button>

            {/* Tiered Milestone Savings Progress Bar */}
            <TieredSavingsBar currentProductPrice={product.price} />

            {/* Trust Strip */}
            <div className="text-center py-1">
              <span className="text-xs font-bold text-slate-700 tracking-wide">
                COD Available • Free Shipping • 3-5 Day Delivery
              </span>
            </div>

            {/* Rewards points alert */}
            <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/70 text-xs font-bold text-emerald-800 flex items-center gap-2">
              <Gift size={16} className="text-emerald-600 shrink-0" />
              <span>Earn {rewardPoints} points on purchase of this product.</span>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="pt-1">
              <PincodeChecker />
            </div>

          </div>

        </div>

        {/* Product In Action / Advertising Video Section */}
        <ProductVideoDemo
          title="See GharShine In Action • Real Video Demonstration"
          subtitle="Watch how our nano-barrier technology prevents hard water scaling, oil stains, and turmeric marks."
        />

        {/* Detailed Tabs & Specifications */}
        <ProductTabs product={product} />

        {/* "Products You May Like" Section */}
        <ProductsYouMayLike products={relatedProducts} />

      </div>

      {/* Sticky Bottom Add-to-Cart Bar on Mobile */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden z-30 flex items-center justify-between gap-3 shadow-lg">
        <div className="min-w-0">
          <span className="text-xs font-bold text-slate-900 truncate block">
            {product.name}
          </span>
          <span className="text-xs font-extrabold text-[#107082]">
            {formatPrice(product.price)}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="px-5 py-2.5 bg-[#107082] text-white rounded-xl text-xs font-black shrink-0 shadow-md flex items-center gap-1.5 cursor-pointer"
        >
          <ShoppingBag size={15} />
          <span>Add to Cart</span>
        </button>
      </div>

    </div>
  );
};

