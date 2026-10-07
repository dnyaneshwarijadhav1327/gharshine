import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductTabs } from '../components/product/ProductTabs';
import { PincodeChecker } from '../components/product/PincodeChecker';
import { ProductCard } from '../components/product/ProductCard';
import { RatingStars } from '../components/common/RatingStars';
import { PriceDisplay } from '../components/common/PriceDisplay';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
  ShoppingBag,
  Zap,
  Heart,
  ShieldCheck,
  Truck,
  RefreshCw,
  Droplets,
  Share2,
  Check
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
        
        // Fetch related
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
    <div className="min-h-screen bg-white py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Shop', url: '/shop' },
            { label: product.category, url: `/shop?category=${product.category}` },
            { label: product.name }
          ]}
        />

        {/* Top Product Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-4">
          
          {/* Left Column: Interactive Image Gallery (7 cols) */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images || [product.thumbnail]}
              productName={product.name}
            />
          </div>

          {/* Right Column: Buying Options & Details (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Badges & Surface tags */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {product.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#087F8C] text-white">
                    {product.badge}
                  </span>
                )}
                <span className="text-xs font-bold text-[#087F8C] uppercase tracking-wider bg-[#E8F8F8] px-2 py-0.5 rounded-md">
                  {product.surface ? product.surface.join(' • ') : product.category}
                </span>
              </div>

              <button
                onClick={handleShare}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-50 transition"
                title="Share product"
                aria-label="Share product"
              >
                {isCopied ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
              </button>
            </div>

            {/* Product Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-3">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} size={16} />
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                Verified Formula
              </span>
            </div>

            {/* Price Display */}
            <div className="p-4 bg-[#F8FAFA] rounded-2xl border border-slate-100">
              <PriceDisplay
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                size="lg"
                showTaxNote={true}
              />
              {product.size && (
                <span className="text-xs text-slate-500 font-medium block mt-1.5">
                  Pack Size: <strong>{product.size}</strong>
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Quantity Selector + Add to Cart + Buy Now */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-3 text-slate-600 hover:bg-slate-200 transition text-sm font-bold"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 py-3 text-slate-600 hover:bg-slate-200 transition text-sm font-bold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-white hover:bg-[#F8FAFA] text-[#087F8C] border-2 border-[#087F8C] rounded-2xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <ShoppingBag size={18} />
                  <span>Add to Cart</span>
                </button>

                {/* Wishlist Heart */}
                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label="Wishlist"
                  className={`p-3.5 rounded-2xl border transition ${
                    isWishlisted
                      ? 'border-rose-200 bg-rose-50 text-rose-500'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? 'fill-rose-500' : ''} />
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-[#087F8C] hover:bg-[#066670] text-white rounded-2xl text-sm font-bold shadow-lg shadow-[#087F8C]/20 transition flex items-center justify-center gap-2"
              >
                <Zap size={18} className="fill-white" />
                <span>Buy Now • Instant Checkout</span>
              </button>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="pt-2">
              <PincodeChecker />
            </div>

          </div>

        </div>

        {/* Detailed Tabs & Specifications */}
        <ProductTabs product={product} />

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Complementary Surface Solutions
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Pair this product for complete whole-house protection.
                </p>
              </div>

              <Link
                to="/shop"
                className="text-xs sm:text-sm font-bold text-[#087F8C] hover:underline"
              >
                View Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Bottom Add-to-Cart Bar on Mobile */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden z-30 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-xs font-bold text-slate-900 truncate block">
            {product.name}
          </span>
          <span className="text-xs font-extrabold text-[#087F8C]">
            ₹{product.price}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="px-5 py-2.5 bg-[#087F8C] text-white rounded-xl text-xs font-bold shrink-0 shadow-md flex items-center gap-1.5"
        >
          <ShoppingBag size={15} />
          <span>Add to Cart</span>
        </button>
      </div>

    </div>
  );
};
