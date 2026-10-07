import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { RatingStars } from '../components/common/RatingStars';

export const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Your Saved Wishlist | GharShine";
  }, []);

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: 'Saved Wishlist' }]} />

        {/* Page Header */}
        <div className="py-6 border-b border-slate-100 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-2">
            <Heart size={13} className="fill-[#087F8C]" />
            <span>Saved Favorites</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            My Wishlist ({wishlistItems.length})
          </h1>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 bg-[#F8FAFA] rounded-3xl border border-slate-100 p-8 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-white shadow-xs text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Heart size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Your wishlist is empty</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Save your favorite cleaning and nano-barrier products by clicking the heart icon.
            </p>
            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl text-xs sm:text-sm font-semibold transition"
              >
                <span>Browse Products</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-3">
                    <img
                      src={p.thumbnail}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeFromWishlist(p.id)}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 text-rose-500 hover:bg-rose-50 transition shadow-xs"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <span className="text-[10px] font-bold text-[#087F8C] uppercase tracking-wider block mb-1">
                    {p.surface ? p.surface.join(' • ') : p.category}
                  </span>

                  <Link
                    to={`/product/${p.slug}`}
                    className="text-sm font-bold text-slate-900 hover:text-[#087F8C] line-clamp-1 mb-1 block"
                  >
                    {p.name}
                  </Link>

                  <RatingStars rating={p.rating} reviewCount={p.reviewCount} size={12} />

                  <div className="mt-2 text-sm font-bold text-slate-900">
                    {formatPrice(p.price)}
                    {p.originalPrice && (
                      <span className="text-xs text-slate-400 line-through ml-2 font-normal">
                        {formatPrice(p.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-50">
                  <button
                    onClick={() => {
                      addToCart(p, 1, true);
                      removeFromWishlist(p.id);
                    }}
                    className="w-full py-2.5 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={14} />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
