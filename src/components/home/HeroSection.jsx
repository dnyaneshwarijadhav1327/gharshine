import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'gharshine-diwali-festive',
      image: '/images/gharshine-banner-diwali.png',
      alt: 'GharShine - Ye Diwali GharShine Wali - Aabse har Diwali cleaning me, GharShine ka coating',
      link: '/shop'
    },
    {
      id: 'gharshine-stop-cleaning-protect',
      image: '/images/gharshine-banner-protect.png',
      alt: 'GharShine - Stop Cleaning Your Home. Start Protecting It. Engineered nano-coatings for spotless home surfaces',
      link: '/shop'
    },
    {
      id: 'gharshine-choose-6-bundle',
      image: '/images/gharshine-banner-bundle.png',
      alt: 'GharShine - Choose any 6 products @just ₹1,999/- FLAT Build your own bundle',
      link: '/combo-builder'
    }
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full overflow-hidden bg-slate-100 select-none border-b border-slate-200">
      
      {/* Side Arrow Navigation Buttons */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        aria-label="Previous Banner"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/20 shadow-lg hover:scale-105"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        aria-label="Next Banner"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/20 shadow-lg hover:scale-105"
      >
        <ChevronRight size={24} />
      </button>

      {/* Main Slides Wrapper with Smooth Carousel Slide Animation */}
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
                  className="w-full h-auto object-cover max-h-[640px] filter contrast-[1.02]"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
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
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-sm ${
                currentSlide === i ? 'w-8 bg-slate-900 ring-2 ring-white' : 'w-2.5 bg-slate-800/40 hover:bg-slate-800/70'
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  );
};
