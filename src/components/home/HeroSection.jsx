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
      className="relative w-full overflow-hidden bg-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Side Arrow Navigation Buttons (Edge-aligned like reference image) */}
      <button
        onClick={handlePrev}
        aria-label="Previous Banner"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-7 sm:w-8 h-11 sm:h-12 rounded-r-md bg-black/45 hover:bg-black/75 active:scale-95 text-white flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer shadow-md"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Banner"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-7 sm:w-8 h-11 sm:h-12 rounded-l-md bg-black/45 hover:bg-black/75 active:scale-95 text-white flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer shadow-md"
      >
        <ChevronRight size={20} />
      </button>

      {/* Main Full-Bleed Edge-to-Edge Slides Wrapper Adjusted for First Page */}
      <div className="relative w-full overflow-hidden">
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
                  width="2300"
                  height="1000"
                  decoding="sync"
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                  className="w-full h-auto sm:max-h-[calc(100vh-112px)] object-cover object-center block"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Carousel Indicator Dots (Circular like reference image) */}
        <div className="absolute bottom-2.5 sm:bottom-4 inset-x-0 z-20 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-sm ${
                currentSlide === i
                  ? 'bg-[#1B263B] scale-110'
                  : 'bg-slate-500/60 hover:bg-slate-700/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

