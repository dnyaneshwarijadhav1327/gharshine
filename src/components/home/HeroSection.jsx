import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slides = [
    {
      id: 'gharshine-stain-protection',
      image: '/images/hero-stain-protection.png',
      alt: 'GharShine - Stain Protection That Lasts - Seal today. Stay spotless tomorrow.',
      link: '/shop'
    },
    {
      id: 'gharshine-cleaning-bundle',
      image: '/images/hero-cleaning-bundle.png',
      alt: 'GharShine - Choose Your Perfect Cleaning Bundle - Complete protection for every surface.',
      link: '/combo-builder'
    },
    {
      id: 'gharshine-diwali-festive',
      image: '/images/hero-diwali-festive.png',
      alt: 'GharShine - This Diwali, Let Your Home Shine! Nano-coating solutions for Indian homes.',
      link: '/shop'
    }
  ];

  // Auto-advance slides every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (swipeDistance > 50) {
      handleNext();
    } else if (swipeDistance < -50) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section 
      className="relative w-full overflow-hidden bg-white select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Side Arrow Navigation Buttons */}
      <button
        onClick={handlePrev}
        aria-label="Previous Banner"
        className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/30 shadow-lg hover:scale-105"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Banner"
        className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/30 shadow-lg hover:scale-105"
      >
        <ChevronRight size={22} />
      </button>

      {/* Main Full-Bleed Slides Wrapper for All Devices */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div key={slide.id} className="w-full shrink-0 relative">
              <Link to={slide.link} className="block w-full cursor-pointer">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-auto block object-cover max-h-[640px] transition-all"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Carousel Indicator Dots */}
        <div className="absolute bottom-2 sm:bottom-5 inset-x-0 z-20 flex items-center justify-center gap-1.5 sm:gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer shadow-md ${
                currentSlide === i ? 'w-6 sm:w-8 bg-slate-900 ring-2 ring-white/90' : 'w-1.5 sm:w-2 bg-slate-900/40 hover:bg-slate-900/70'
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  );
};
