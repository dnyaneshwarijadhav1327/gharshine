import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  return (
    <section className="relative w-full overflow-hidden bg-white select-none">
      
      {/* Side Arrow Navigation Buttons */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        aria-label="Previous Banner"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/30 shadow-xl hover:scale-105"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        aria-label="Next Banner"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/30 shadow-xl hover:scale-105"
      >
        <ChevronRight size={22} />
      </button>

      {/* Main Full-Bleed Edge-to-Edge Slides Wrapper with Responsive Mobile & Desktop Pictures */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div key={slide.id} className="w-full shrink-0 relative">
              <Link to={slide.link} className="block w-full cursor-pointer">
                <picture>
                  <source media="(max-width: 640px)" srcSet={slide.mobileImage} />
                  <img
                    src={slide.desktopImage}
                    alt={slide.alt}
                    className="w-full h-auto object-cover max-h-[640px] block filter contrast-[1.01]"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </picture>
              </Link>
            </div>
          ))}
        </div>

        {/* Carousel Indicator Dots */}
        <div className="absolute bottom-2.5 sm:bottom-6 inset-x-0 z-20 flex items-center justify-center gap-1.5 sm:gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-md ${
                currentSlide === i ? 'w-6 sm:w-9 bg-slate-900 ring-2 ring-white' : 'w-1.5 sm:w-2.5 bg-slate-800/40 hover:bg-slate-800/70'
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  );
};
