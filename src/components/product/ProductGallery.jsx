import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, X, Maximize2 } from 'lucide-react';

export const ProductGallery = ({ images = [], productName = "Product" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoverZoomed, setIsHoverZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const galleryImages = images.length > 0 ? images : [
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
  ];

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      
      {/* Thumbnail Strip */}
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

      {/* Main Active Image Container */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="relative flex-1 aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 group select-none cursor-pointer"
      >
        {/* Main Image with Hover Lens Effect on Desktop */}
        <div
          className="w-full h-full overflow-hidden"
          onMouseEnter={() => setIsHoverZoomed(true)}
          onMouseLeave={() => setIsHoverZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            src={galleryImages[activeIndex]}
            alt={`${productName} image ${activeIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-200 ${
              isHoverZoomed ? 'md:scale-150 md:origin-[var(--zoom-x)_var(--zoom-y)]' : 'scale-100'
            }`}
            style={{
              '--zoom-x': `${zoomPos.x}%`,
              '--zoom-y': `${zoomPos.y}%`
            }}
          />
        </div>

        {/* Fullscreen Zoom Pill Hint */}
        <div className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition pointer-events-none">
          <Maximize2 size={13} />
          <span className="hidden sm:inline">Click to expand</span>
        </div>

        {/* Left / Right Arrow buttons */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition z-10"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition z-10"
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

      {/* Full-Screen Lightbox Modal on Click */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in"
        >
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition z-50"
            aria-label="Close fullscreen"
          >
            <X size={24} />
          </button>

          {/* Large Main Modal Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[75vh] w-full flex items-center justify-center"
          >
            <img
              src={galleryImages[activeIndex]}
              alt={`${productName} high resolution`}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />

            {/* Modal Left/Right Buttons */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition"
                  aria-label="Previous"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition"
                  aria-label="Next"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Modal Bottom Thumbnail Strip */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-6 flex items-center gap-2 overflow-x-auto no-scrollbar max-w-lg px-2"
          >
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                  activeIndex === idx ? 'border-[#52D1DC] scale-105' : 'border-white/20 opacity-50'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

