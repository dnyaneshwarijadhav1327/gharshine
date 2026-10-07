import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export const ProductGallery = ({ images = [], productName = "Product" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  const galleryImages = images.length > 0 ? images : [
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
  ];

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      
      {/* Thumbnail Strip (Vertical desktop / Horizontal mobile) */}
      <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-20 shrink-0">
        {galleryImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-slate-50 ${
              activeIndex === idx
                ? 'border-[#087F8C] shadow-md ring-2 ring-[#087F8C]/20'
                : 'border-slate-100 hover:border-slate-300 opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Main Active Image with Zoom on Desktop */}
      <div className="relative flex-1 aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 group select-none">
        
        {/* Main Image */}
        <div
          className="w-full h-full cursor-crosshair overflow-hidden"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            src={galleryImages[activeIndex]}
            alt={`${productName} image ${activeIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-200 ${
              isZoomed ? 'scale-150 origin-[var(--zoom-x)_var(--zoom-y)]' : 'scale-100'
            }`}
            style={{
              '--zoom-x': `${zoomPos.x}%`,
              '--zoom-y': `${zoomPos.y}%`
            }}
          />
        </div>

        {/* Zoom Hint Indicator */}
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-xl text-white pointer-events-none hidden md:block">
          <ZoomIn size={16} />
        </div>

        {/* Left / Right Arrow buttons for mobile swipe */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Counter Badge */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[11px] font-bold">
          {activeIndex + 1} / {galleryImages.length}
        </div>

      </div>

    </div>
  );
};
