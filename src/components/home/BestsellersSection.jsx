import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';

export const BestsellersSection = () => {
  const { addToCart } = useCart();

  const roomKits = [
    {
      id: 'bathroom-kit',
      title: 'Bathroom Protector Kit',
      subtitle: 'Protect & Clean your Glass Partitions, Taps & Fittings, Wall Tiles',
      saveText: 'Save 24% Vs Buying Separately',
      price: 1999,
      originalPrice: 3399,
      slug: 'bathroom-protector-kit',
      // Bright cyan / turquoise pastel
      cardBg: 'bg-[#6fe2f5]',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      productId: 1
    },
    {
      id: 'living-room-kit',
      title: 'Living Room Kit',
      subtitle: 'Protect & Clean your Sofas & Wooden Furniture',
      saveText: 'Save 44% Vs Buying Separately',
      price: 1999,
      originalPrice: 4299,
      slug: 'living-room-complete-protection-kit',
      // Bright coral / peach pastel
      cardBg: 'bg-[#ffa380]',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
      productId: 8
    },
    {
      id: 'kitchen-kit',
      title: 'Kitchen Protector Kit',
      subtitle: 'Protect and Clean your Kitchen Counter Tops, Wall Tiles & Cabinets',
      saveText: 'Save 39% Vs Buying Separately',
      price: 1699,
      originalPrice: 3299,
      slug: 'biodegrease-kitchen-hob-chimney-cleaner',
      // Bright lavender / purple pastel
      cardBg: 'bg-[#d5bcfc]',
      image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=600&q=80',
      productId: 6
    },
    {
      id: 'balcony-kit',
      title: 'Balcony Protection Kit',
      subtitle: 'Protect and Clean your Windows, Furniture & Fabric Furniture',
      saveText: 'Save 24% Vs Buying Separately',
      price: 2879,
      originalPrice: 4499,
      slug: 'groutbright-tile-joint-whitener-shield',
      // Bright lime / light green pastel
      cardBg: 'bg-[#cbf685]',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      productId: 11
    },
    {
      id: 'dining-kit',
      title: 'Dining Table Combo',
      subtitle: 'Protect and Clean your Fabrics & Wooden Table',
      saveText: 'Save 30% Vs Buying Separately',
      price: 1999,
      originalPrice: 2999,
      slug: 'lustrewood-carnauba-ceramic-polish-shield',
      // Bright warm yellow pastel
      cardBg: 'bg-[#fed768]',
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
      productId: 7
    }
  ];

  const handleAddToCart = (item, e) => {
    e.preventDefault();
    e.stopPropagation();

    const matchedProduct = products.find((p) => p.id === item.productId || p.slug === item.slug);
    if (matchedProduct) {
      addToCart({
        ...matchedProduct,
        name: item.title,
        price: item.price,
        originalPrice: item.originalPrice
      }, 1, true);
    } else {
      addToCart({
        id: item.productId || `kit-${item.id}`,
        name: item.title,
        slug: item.slug,
        price: item.price,
        originalPrice: item.originalPrice,
        thumbnail: item.image,
        category: 'Protection Kit',
        badge: 'BUNDLE'
      }, 1, true);
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Protect Your Home, Room By Room
          </h2>
        </div>

        {/* 5-Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {roomKits.map((item) => (
            <div
              key={item.id}
              className={`rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 ${item.cardBg}`}
            >
              {/* Product Image Section */}
              <Link 
                to={`/product/${item.slug}`} 
                className="block overflow-hidden relative group aspect-[4/3] sm:aspect-square bg-white"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </Link>

              {/* Bottom Card Content */}
              <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                <div>
                  <Link to={`/product/${item.slug}`}>
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-tight hover:text-slate-800 transition-colors">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-[13px] text-slate-800 font-medium leading-snug mt-2 line-clamp-2">
                    {item.subtitle}
                  </p>

                  <div className="mt-3">
                    <span className="text-xs sm:text-[13px] font-bold text-[#c92a2a] block">
                      {item.saveText}
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl font-black text-slate-900">
                      ₹ {item.price.toLocaleString('en-IN')}.00
                    </span>
                    <span className="text-xs sm:text-sm text-slate-600 line-through font-normal">
                      ₹ {item.originalPrice.toLocaleString('en-IN')}.00
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(item, e)}
                    className="w-full mt-4 py-2.5 sm:py-3 bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm sm:text-base rounded-xl transition-all duration-150 shadow-xs border border-white/60 active:scale-[0.98] text-center"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
