import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { Check } from 'lucide-react';

const upsellItems = [
  {
    id: 201,
    name: 'Kitchen Foam Cleaner | 500ml x2',
    slug: 'biodegrease-kitchen-hob-chimney-cleaner',
    price: 749,
    originalPrice: 1499,
    image: '/images/concern-kitchen-tiles.jpg'
  },
  {
    id: 202,
    name: 'Fabric Foam Cleaner | 500ml x2',
    slug: 'hydrobarrier-sofa-fabric-stain-repellent',
    price: 749,
    originalPrice: 1499,
    image: '/images/concern-sofa-spills.jpg'
  },
  {
    id: 203,
    name: 'Glass Foam Cleaner | 500ml x2',
    slug: 'bathroom-protector-kit',
    price: 749,
    originalPrice: 1499,
    image: '/images/concern-shower-glass.jpg'
  },
  {
    id: 204,
    name: 'Wood & Stone Polish | 500ml',
    slug: 'lustrewood-carnauba-ceramic-polish-shield',
    price: 649,
    originalPrice: 1299,
    image: '/images/surface-wood.jpg'
  }
];

export const BundleUpsellBox = ({ onAddUpsell }) => {
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState([]);

  const handleAdd = (item) => {
    addToCart(
      {
        id: item.id,
        name: item.name,
        slug: item.slug,
        price: item.price,
        originalPrice: item.originalPrice,
        thumbnail: item.image,
        shortDescription: 'Add-on bundle savings'
      },
      1,
      false
    );

    setAddedIds((prev) => [...prev, item.id]);
    if (onAddUpsell) onAddUpsell(item);
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#EEF9FB] border border-[#D5EEF3] space-y-3">
      <div>
        <h4 className="text-sm font-black text-slate-900 tracking-tight">
          Add more to your bundle
        </h4>
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
          Every add takes you closer to the next saving
        </p>
      </div>

      {/* Horizontal Upsell Cards */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
        {upsellItems.map((item) => {
          const isAdded = addedIds.includes(item.id);

          return (
            <div
              key={item.id}
              className="w-[210px] sm:w-[230px] shrink-0 bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-2xs flex items-center gap-2.5"
            >
              {/* Product Thumbnail */}
              <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden shrink-0 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Title, Price & Add Button */}
              <div className="flex-1 min-w-0">
                <h5 className="text-[11px] font-bold text-slate-900 truncate leading-snug">
                  {item.name}
                </h5>

                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xs font-black text-slate-900">
                    {formatPrice(item.price)}
                  </span>
                  <span className="text-[10px] text-slate-400 line-through">
                    {formatPrice(item.originalPrice)}
                  </span>
                </div>

                <div className="mt-1.5">
                  {isAdded ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <Check size={12} /> Added
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAdd(item)}
                      className="px-3 py-1 bg-[#F5C344] hover:bg-[#ebb734] active:scale-95 text-slate-950 font-black text-[11px] rounded-md transition shadow-2xs cursor-pointer"
                    >
                      + Add
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
