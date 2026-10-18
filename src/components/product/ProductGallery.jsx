import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, ChevronUp, ChevronDown, Maximize2 } from 'lucide-react';

export const ProductGallery = ({ images = [], productName = "Product" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const thumbListRef = useRef(null);
  const thumbRefs = useRef([]);

  const galleryImages = images.length > 0 ? images : [
    "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineBathroomCleaningTrio.png?v=1791689722"
  ];

  // Reset activeIndex when images change
  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

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
      const scrollAmount = direction === 'up' ? -150 : 150;
      thumbListRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3.5 lg:gap-4 items-stretch w-full">
      {/* Vertical Thumbnail Strip with Up/Down Arrows */}
      <div className="relative flex md:flex-col items-center justify-between shrink-0 w-full md:w-20 lg:w-22">
        {/* Desktop Up Scroll Button */}
        {galleryImages.length > 5 && (
          <button
            onClick={() => scrollThumbnails('up')}
            className="hidden md:flex items-center justify-center w-full py-1 text-[#A61B64] hover:opacity-75 transition cursor-pointer"
            aria-label="Scroll thumbnails up"
          >
            <ChevronUp size={18} strokeWidth={2.5} />
          </button>
        )}

        <div
          ref={thumbListRef}
          className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto no-scrollbar w-full md:max-h-[480px] lg:max-h-[520px] py-1 px-0.5"
        >
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              ref={(el) => (thumbRefs.current[idx] = el)}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-[#F6F5F2] cursor-pointer ${
                activeIndex === idx
                  ? 'border-[#C82068] shadow-xs ring-2 ring-[#C82068]/20 opacity-100'
                  : 'border-transparent hover:border-pink-200 opacity-85 hover:opacity-100'
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

        {/* Desktop Down Scroll Button */}
        <button
          onClick={() => scrollThumbnails('down')}
          className="hidden md:flex items-center justify-center w-full py-1 text-[#A61B64] hover:opacity-75 transition cursor-pointer"
          aria-label="Scroll thumbnails down"
        >
          <ChevronDown size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Main Active Image Container */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="relative flex-1 w-full aspect-square md:h-[500px] lg:h-[540px] rounded-[28px] overflow-hidden bg-[#F5F3EF] border border-slate-100 shadow-xs group select-none cursor-pointer flex items-center justify-center"
      >
        <img
          src={galleryImages[activeIndex]}
          alt={`${productName} image ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500"
        />

        {/* Circular Left / Right Arrow buttons */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-[#13223B] shadow-md flex items-center justify-center transition z-10 cursor-pointer active:scale-95"
            >
              <ChevronLeft size={19} strokeWidth={2.2} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-[#13223B] shadow-md flex items-center justify-center transition z-10 cursor-pointer active:scale-95"
            >
              <ChevronRight size={19} strokeWidth={2.2} />
            </button>
          </>
        )}

        {/* Counter Pill Badge (Bottom Right) */}
        <div className="absolute bottom-3.5 right-3.5 bg-black/65 backdrop-blur-xs px-3 py-1 rounded-full text-white text-xs font-bold tracking-wide">
          {activeIndex + 1}/{galleryImages.length}
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
