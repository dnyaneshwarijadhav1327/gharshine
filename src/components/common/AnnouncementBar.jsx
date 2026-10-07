import React, { useState, useEffect } from 'react';
import { brandConfig } from '../../data/config';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const announcements = brandConfig.announcements || [];

  useEffect(() => {
    if (announcements.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [announcements.length, isPaused]);

  if (!isVisible || announcements.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? announcements.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  return (
    <div
      className="bg-[#087F8C] text-white text-xs sm:text-[13px] font-medium py-1.5 px-3 relative z-50 select-none transition-all duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="p-0.5 hover:bg-white/10 rounded transition text-white/80 hover:text-white hidden sm:inline-flex"
        >
          <ChevronLeft size={14} />
        </button>

        <div className="flex-1 text-center truncate px-2 tracking-wide">
          <span>{announcements[currentIndex]}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleNext}
            aria-label="Next announcement"
            className="p-0.5 hover:bg-white/10 rounded transition text-white/80 hover:text-white hidden sm:inline-flex"
          >
            <ChevronRight size={14} />
          </button>
          
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement"
            className="p-0.5 hover:bg-white/10 rounded transition text-white/70 hover:text-white ml-1"
          >
            <X size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
