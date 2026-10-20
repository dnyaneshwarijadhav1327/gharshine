import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slides = [
    {
      id: 'gharshine-diwali-free-offer',
      image: '/images/hero-dynamic-1.jpg',
      alt: 'GharShine - Diwali Special Offer: Buy Sofa & Fabric Stain Repellent, Get Fabric Cleaner Free',
      link: '/product/sofa-fabric-stain-repellent-combo'
    },
    {
      id: 'gharshine-nano-coatings-collection',
      image: '/images/hero-dynamic-2.jpg',
      alt: 'GharShine - The Magic of Nano-Coatings Complete Home Surface Cleaners & Protectors',
      link: '/shop'
    }
  ];

  // Auto-advance slides every 5 seconds unless hovered/paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

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
      className="relative w-full bg-[#FAF8F5] select-none py-0 sm:py-3 md:py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slightly Minimized Container so Full Banner Fits Above the Fold on First Page */}
      <div className="relative w-full max-w-[1160px] xl:max-w-[1260px] mx-auto sm:px-4 md:px-6">
        <div className="relative w-full overflow-hidden sm:rounded-2xl md:rounded-3xl shadow-xs sm:shadow-md bg-white">
          {/* Side Arrow Navigation Buttons */}
          <button
            onClick={handlePrev}
            aria-label="Previous Banner"
            className="absolute left-2 sm:left-3.5 top-1/2 -translate-y-1/2 z-30 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-black/45 hover:bg-black/75 active:scale-95 text-white flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer shadow-md"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Banner"
            className="absolute right-2 sm:right-3.5 top-1/2 -translate-y-1/2 z-30 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-black/45 hover:bg-black/75 active:scale-95 text-white flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer shadow-md"
          >
            <ChevronRight size={20} />
          </button>

          {/* Slides Track */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, idx) => (
              <div key={slide.id} className="w-full shrink-0 relative">
                <Link to={slide.link} className="block w-full cursor-pointer">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    width="2048"
                    height="1152"
                    decoding="sync"
                    fetchPriority={idx === 0 ? 'high' : 'auto'}
                    className="w-full h-auto sm:max-h-[calc(100vh-145px)] object-contain mx-auto block"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* Dynamic Carousel Indicator Dots */}
          <div className="absolute bottom-2 sm:bottom-3.5 inset-x-0 z-20 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-md ${
                  currentSlide === i
                    ? 'w-7 sm:w-9 bg-[#1B263B] ring-2 ring-white/95'
                    : 'w-2 sm:w-2.5 bg-slate-800/45 hover:bg-slate-800/75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

