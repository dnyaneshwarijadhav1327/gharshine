import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Check, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { products } from '../../data/products';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { RatingStars } from '../common/RatingStars';

export const FeaturedComboSection = () => {
  const { addToCart } = useCart();
  const combos = products.filter((p) => p.isCombo).slice(0, 2);

  return (
    <section className="py-16 sm:py-24 bg-[#F8FAFA] border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles size={13} />
            <span>Value Bundles</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Better Together. <span className="text-[#087F8C]">Maximum Savings.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Multi-surface kits curated by surface chemists to provide end-to-end cleaning and protection.
          </p>
        </div>

        {/* Big Feature Combo Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {combos.map((combo) => {
            const savings = combo.originalPrice - combo.price;

            return (
              <div
                key={combo.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Savings Pill */}
                <div className="absolute top-6 right-6 z-10">
                  <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-[#E05A47] text-white shadow-xs">
                    SAVE {formatPrice(savings)}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-[#087F8C] uppercase tracking-wider bg-[#E8F8F8] px-2.5 py-1 rounded-lg">
                      {combo.category}
                    </span>
                    <RatingStars rating={combo.rating} reviewCount={combo.reviewCount} size={14} />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-2 group-hover:text-[#087F8C] transition-colors">
                    {combo.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {combo.shortDescription}
                  </p>

                  {/* Visual Preview */}
                  <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 mb-6 border border-slate-100 relative">
                    <img
                      src={combo.thumbnail}
                      alt={combo.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg text-[11px] text-white font-medium">
                      Includes: {combo.surface.join(' + ')}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    {combo.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <Check size={16} className="text-[#087F8C] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900">
                        {formatPrice(combo.price)}
                      </span>
                      <span className="text-sm text-slate-400 line-through">
                        {formatPrice(combo.originalPrice)}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-semibold block">
                      ✓ Free Express Delivery + Free Microfiber Towels
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/product/${combo.slug}`}
                      className="px-4 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition text-center"
                    >
                      Details
                    </Link>

                    <button
                      onClick={() => addToCart(combo, 1, true)}
                      className="flex-1 sm:flex-none px-6 py-3 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-[#087F8C]/20 transition flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={16} />
                      <span>Add Kit</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
