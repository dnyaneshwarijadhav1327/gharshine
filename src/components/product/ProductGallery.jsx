import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, ChevronUp, ChevronDown } from 'lucide-react';

export const ProductGallery = ({ images = [], productName = "Product" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const thumbListRef = useRef(null);
  const thumbRefs = useRef([]);

  const galleryImages = images.length > 0 ? images : [
    "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineBathroomCleaningTrio.png?v=1791689722"
  ];

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  // Scroll active thumbnail into view
  useEffect(() => {
    try {
      const el = thumbRefs.current?.[activeIndex];
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        });
      }
    } catch {
      // safe fallback
    }
  }, [activeIndex]);

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

  const scrollThumbnails = (direction) => {
    if (thumbListRef.current) {
      const scrollAmount = direction === 'up' ? -160 : 160;
      thumbListRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3.5 lg:gap-4 items-start w-full">
      
      {/* Thumbnail Strip with scrolling controls on laptop */}
      <div className="relative flex md:flex-col items-center shrink-0 w-full md:w-20 lg:w-24">
        
        {/* Desktop Up Scroll Indicator */}
        {galleryImages.length > 5 && (
          <button
            onClick={() => scrollThumbnails('up')}
            className="hidden md:flex items-center justify-center w-full py-1 text-slate-400 hover:text-slate-800 transition cursor-pointer"
            aria-label="Scroll thumbnails up"
          >
            <ChevronUp size={16} />
          </button>
        )}

        <div
          ref={thumbListRef}
          className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto no-scrollbar w-full md:max-h-[480px] lg:max-h-[530px] py-1 px-0.5"
        >
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              ref={(el) => (thumbRefs.current[idx] = el)}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-white p-1 flex items-center justify-center cursor-pointer ${
                activeIndex === idx
                  ? 'border-[#087F8C] shadow-sm ring-2 ring-[#087F8C]/20 opacity-100'
                  : 'border-slate-200/80 hover:border-slate-400 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {/* Desktop Down Scroll Indicator */}
        {galleryImages.length > 5 && (
          <button
            onClick={() => scrollThumbnails('down')}
            className="hidden md:flex items-center justify-center w-full py-1 text-slate-400 hover:text-slate-800 transition cursor-pointer"
            aria-label="Scroll thumbnails down"
          >
            <ChevronDown size={16} />
          </button>
        )}
      </div>

      {/* Main Active Image Container */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="relative flex-1 w-full aspect-square md:max-h-[480px] lg:max-h-[530px] rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-2xs group select-none cursor-pointer flex items-center justify-center p-3 sm:p-5"
      >
        {/* Main Product Image (Centered, Uncropped, Crisp) */}
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={galleryImages[activeIndex]}
            alt={`${productName} image ${activeIndex + 1}`}
            className="w-full h-full object-contain max-h-[440px] lg:max-h-[490px] transition-all duration-300"
          />
        </div>

        {/* Left / Right Arrow buttons */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-white/90 hover:bg-white text-slate-800 border border-slate-200 shadow-md flex items-center justify-center transition z-10 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-white/90 hover:bg-white text-slate-800 border border-slate-200 shadow-md flex items-center justify-center transition z-10 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Bottom Pagination Dots on mobile */}
        {galleryImages.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex md:hidden items-center justify-center gap-1.5 z-10 pointer-events-none">
            {galleryImages.slice(0, 8).map((_, idx) => (
              <span
                key={idx}
                className={`transition-all rounded-full ${
                  activeIndex === idx
                    ? 'w-2.5 h-2.5 bg-slate-900 shadow-xs'
                    : 'w-1.5 h-1.5 bg-slate-400/80'
                }`}
              />
            ))}
          </div>
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
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition z-50 cursor-pointer"
            aria-label="Close fullscreen"
          >
            <X size={24} />
          </button>

          {/* Large Main Modal Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center p-2"
          >
            <img
              src={galleryImages[activeIndex]}
              alt={`${productName} high resolution`}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl bg-white/5"
            />

            {/* Modal Left/Right Buttons */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition cursor-pointer"
                  aria-label="Previous"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition cursor-pointer"
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
            className="mt-6 flex items-center gap-2 overflow-x-auto no-scrollbar max-w-2xl px-2"
          >
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition bg-white/10 p-1 flex items-center justify-center cursor-pointer ${
                  activeIndex === idx ? 'border-[#52D1DC] scale-105' : 'border-white/20 opacity-50'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
