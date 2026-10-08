import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'festive-coating-save800',
      desktopImg: 'https://www.invisel.in/cdn/shop/files/02.jpg_1.jpg?v=1791440002&width=1800',
      mobileImg: 'https://www.invisel.in/cdn/shop/files/01.jpg_1.jpg?v=1791440013&width=800',
      alt: 'GharShine - Iss baar Diwali cleaning ke sath coating bhi karo - Save up to ₹800',
      link: '/shop'
    },
    {
      id: 'stop-cleaning-protect-combo',
      desktopImg: 'https://www.invisel.in/cdn/shop/files/Banner_03.jpg?v=1791117386&width=1800',
      mobileImg: 'https://www.invisel.in/cdn/shop/files/Banner_03_Mobile_View.jpg?v=1791117397&width=800',
      alt: 'GharShine - Stop Cleaning Your Home. Start Protecting It. Explore Combo',
      link: '/shop'
    },
    {
      id: 'festive-gift-box',
      desktopImg: 'https://www.invisel.in/cdn/shop/files/WhatsApp_Image_2026-10-02_at_11.38.57_AM_1.jpg?v=1790922331&width=1800',
      mobileImg: 'https://www.invisel.in/cdn/shop/files/WhatsApp_Image_2026-10-02_at_11.38.57_AM.jpg?v=1790922317&width=800',
      alt: 'GharShine - Ye Diwali GharShine Wali - Copper, Brass, Silver, Wood & Multi-Surface Kit',
      link: '/shop'
    },
    {
      id: 'bundle-flat-1999',
      desktopImg: 'https://www.invisel.in/cdn/shop/files/desktop_1440_x_580.jpg?v=1784298766&width=1800',
      mobileImg: 'https://www.invisel.in/cdn/shop/files/45e30dc3d727f693aa789da432f90ad4acbf0b9a.png?v=1784297576&width=800',
      alt: 'GharShine - Choose any 6 products @just ₹1,999 FLAT Build your own bundle',
      link: '/combo-builder'
    }
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full overflow-hidden bg-slate-100 select-none">
      
      {/* Side Arrow Navigation Buttons */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        aria-label="Previous Slide"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-lg bg-black/40 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/20 shadow-lg"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        aria-label="Next Slide"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-lg bg-black/40 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/20 shadow-lg"
      >
        <ChevronRight size={24} />
      </button>

      {/* Main Slides Wrapper with Smooth Slide-Transform Animation */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div key={slide.id} className="w-full shrink-0 relative">
              <Link to={slide.link} className="block w-full">
                {/* Desktop High-Resolution Banner */}
                <img
                  src={slide.desktopImg}
                  alt={slide.alt}
                  className="hidden sm:block w-full h-auto object-cover max-h-[620px] filter contrast-105"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />

                {/* Mobile Optimized Banner */}
                <img
                  src={slide.mobileImg}
                  alt={slide.alt}
                  className="sm:hidden w-full h-auto object-cover"
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
