import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slides = [
    {
      id: 'gharshine-diwali-festive',
      desktopImage: '/images/gharshine-banner-diwali.png',
      mobileImage: '/images/hero-diwali-coating-mobile.jpg',
      alt: 'GharShine - Ye Diwali GharShine Wali - Aabse har Diwali cleaning me, GharShine ka coating!',
      link: '/shop'
    },
    {
      id: 'gharshine-stop-cleaning-protect',
      desktopImage: '/images/gharshine-banner-protect.png',
      mobileImage: '/images/hero-stop-cleaning-mobile.jpg',
      alt: 'GharShine - Stop Cleaning Your Home. Start Protecting It. Engineered nano-coatings for spotless home surfaces',
      link: '/shop'
    },
    {
      id: 'gharshine-choose-6-bundle',
      desktopImage: '/images/gharshine-banner-bundle.png',
      mobileImage: '/images/hero-bundle-1999-mobile.jpg',
      alt: 'GharShine - Choose any 6 products @just ₹1,999/- FLAT Build your own bundle',
      link: '/combo-builder'
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
      {/* Side Arrow Navigation Buttons (Edge-aligned like reference image) */}
      <button
        onClick={handlePrev}
        aria-label="Previous Banner"
        className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-7 sm:w-11 h-12 sm:h-11 rounded-r-md sm:rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer shadow-md"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Banner"
        className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-7 sm:w-11 h-12 sm:h-11 rounded-l-md sm:rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer shadow-md"
      >
        <ChevronRight size={22} />
      </button>

      {/* Main Full-Bleed Edge-to-Edge Slides Wrapper */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div key={slide.id} className="w-full shrink-0 relative">
              <Link to={slide.link} className="block w-full cursor-pointer">
                <picture className="w-full block">
                  {/* High-res dedicated mobile 1:1 portrait banner */}
                  <source media="(max-width: 640px)" srcSet={slide.mobileImage} />
                  {/* Ultra high-res desktop 1920x680 crystal clear banner */}
                  <img
                    src={slide.desktopImage}
                    alt={slide.alt}
                    className="w-full aspect-square sm:aspect-auto sm:h-auto object-cover max-h-[640px] block"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </picture>
              </Link>
            </div>
          ))}
        </div>

        {/* Carousel Indicator Dots */}
        <div className="absolute bottom-3 sm:bottom-6 inset-x-0 z-20 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-md ${
                currentSlide === i
                  ? 'w-6 sm:w-9 bg-slate-900 ring-2 ring-white/90'
                  : 'w-2 sm:w-2.5 bg-slate-700/40 hover:bg-slate-700/70'
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  );
};
