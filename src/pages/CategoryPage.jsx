import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { surfaces, concerns, rooms } from '../data/categories';
import { products } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Sparkles, ArrowRight } from 'lucide-react';

export const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [matchedProducts, setMatchedProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Find in surfaces, concerns or rooms
    const foundSurface = surfaces.find((s) => s.slug === categorySlug);
    const foundConcern = concerns.find((c) => c.slug === categorySlug);
    const foundRoom = rooms.find((r) => r.slug === categorySlug);

    if (foundSurface) {
      setCategoryData({ ...foundSurface, type: 'surface' });
      document.title = `${foundSurface.name} Care Solutions | GharShine`;
      const filtered = products.filter((p) =>
        p.surface.some((s) => s.toLowerCase().includes(foundSurface.slug.toLowerCase()))
      );
      setMatchedProducts(filtered.length > 0 ? filtered : products.slice(0, 4));
    } else if (foundConcern) {
      setCategoryData({ ...foundConcern, type: 'concern', name: foundConcern.title, shortDesc: foundConcern.subtitle });
      document.title = `${foundConcern.title} Solutions | GharShine`;
      const filtered = products.filter((p) =>
        p.concerns.some((c) => c.toLowerCase().includes(foundConcern.title.toLowerCase()))
      );
      setMatchedProducts(filtered.length > 0 ? filtered : products.slice(0, 4));
    } else if (foundRoom) {
      setCategoryData({ ...foundRoom, type: 'room', name: `${foundRoom.title} Care`, shortDesc: foundRoom.subtitle });
      document.title = `${foundRoom.title} Care Kits | GharShine`;
      const filtered = products.filter((p) =>
        p.rooms?.some((r) => r.toLowerCase().includes(foundRoom.title.toLowerCase()))
      );
      setMatchedProducts(filtered.length > 0 ? filtered : products.slice(0, 4));
    } else {
      // Fallback
      setCategoryData({
        name: categorySlug ? categorySlug.toUpperCase() : "Category",
        shortDesc: "Specialized surface care and nano-barrier protection.",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
      });
      setMatchedProducts(products.slice(0, 6));
    }
  }, [categorySlug]);

  if (!categoryData) return null;

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: 'Shop', url: '/shop' },
            { label: categoryData.name }
          ]}
        />

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 my-6 shadow-xl aspect-[21/9] sm:aspect-[21/7] flex items-center p-6 sm:p-12 text-white">
          <img
            src={categoryData.image}
            alt={categoryData.name}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />

          <div className="relative z-10 max-w-xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-[#65D5D8] uppercase tracking-wider">
              <Sparkles size={13} />
              <span>Targeted Formulation Range</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              {categoryData.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {categoryData.shortDesc}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Recommended Solutions ({matchedProducts.length})
            </h2>
            <Link
              to="/shop"
              className="text-xs sm:text-sm font-bold text-[#087F8C] hover:underline flex items-center gap-1"
            >
              <span>View All Solutions</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {matchedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Related Surfaces Strip */}
        <div className="mt-14 pt-10 border-t border-slate-100">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6">
            Explore Other Surface Types
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {surfaces.slice(0, 4).map((s) => (
              <Link
                key={s.id}
                to={`/shop/${s.slug}`}
                className="p-4 rounded-2xl bg-[#F8FAFA] hover:bg-[#E8F8F8] border border-slate-100 transition flex items-center gap-3 group"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-12 h-12 rounded-xl object-cover group-hover:scale-105 transition"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#087F8C] truncate">
                    {s.name}
                  </h4>
                  <span className="text-[11px] text-slate-400">From ₹{s.startingPrice}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
