import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { Check, Plus, Minus } from 'lucide-react';

const upsellItems = [
  {
    id: 201,
    name: 'Kitchen Foam Cleaner | 500ml x2',
    slug: 'biodegrease-kitchen-hob-chimney-cleaner',
    price: 749,
    originalPrice: 1499,
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 202,
    name: 'Fabric Foam Cleaner | 500ml x2',
    slug: 'hydrobarrier-sofa-fabric-stain-repellent',
    price: 749,
    originalPrice: 1499,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 203,
    name: 'Glass & Scale Shield | 500ml',
    slug: 'bathroom-protector-kit',
    price: 749,
    originalPrice: 1499,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 204,
    name: 'Wood & Stone Polish | 350ml',
    slug: 'lustrewood-carnauba-ceramic-polish-shield',
    price: 649,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=400&q=80'
  }
];

export const BundleUpsellBox = ({ onAddUpsell }) => {
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

  // Determine if item is in cart and its quantity
  const getItemInCart = (itemId) => {
    return cartItems.find((ci) => ci.product.id === itemId);
  };

  const handleAdd = (item, e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(
      {
        id: item.id,
        name: item.name,
        slug: item.slug,
        price: item.price,
        originalPrice: item.originalPrice,
        thumbnail: item.image,
        category: 'Protection Add-on',
        shortDescription: 'Add-on bundle savings'
      },
      1,
      true
    );

    if (onAddUpsell) onAddUpsell(item);
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#EEF9FB] border border-[#D5EEF3] space-y-3">
      <div>
        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
          Add more to your bundle
        </h4>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Every add takes you closer to the next saving
        </p>
      </div>

      {/* Horizontal Upsell Cards */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
        {upsellItems.map((item) => {
          const cartEntry = getItemInCart(item.id);
          const isAdded = Boolean(cartEntry);

          return (
            <div
              key={item.id}
              className="w-[220px] sm:w-[240px] shrink-0 bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all flex items-center gap-3 group"
            >
              {/* Product Thumbnail (Clickable link to product) */}
              <Link
                to={`/product/${item.slug}`}
                className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden shrink-0 relative block cursor-pointer"
                title={`View ${item.name}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </Link>

              {/* Title, Price & Add Button */}
              <div className="flex-1 min-w-0">
                <Link
                  to={`/product/${item.slug}`}
                  className="block hover:text-[#087F8C] transition-colors"
                >
                  <h5 className="text-[12px] font-bold text-slate-900 truncate leading-snug">
                    {item.name}
                  </h5>
                </Link>

                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xs font-black text-slate-900">
                    {formatPrice(item.price)}
                  </span>
                  <span className="text-[10px] text-slate-400 line-through">
                    {formatPrice(item.originalPrice)}
                  </span>
                </div>

                <div className="mt-1.5 flex items-center">
                  {isAdded ? (
                    <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md text-[11px] font-bold">
                      <Check size={12} className="text-emerald-600" />
                      <span>Added ({cartEntry.quantity})</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="ml-1 text-emerald-900 hover:text-emerald-950 font-black cursor-pointer"
                        title="Add one more"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => handleAdd(item, e)}
                      className="px-3 py-1 bg-[#F5C344] hover:bg-[#ebb734] active:scale-95 text-slate-950 font-extrabold text-[11px] rounded-md transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                    >
                      <Plus size={11} className="stroke-[3]" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
