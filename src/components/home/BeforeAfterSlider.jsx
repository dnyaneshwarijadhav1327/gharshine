import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

const comparisons = [
  {
    id: 'glass',
    surface: 'Shower Glass Partition',
    concern: 'Hard Water Borewell Scaling',
    beforeLabel: 'Untreated (Cloudy scaling & soap scum)',
    afterLabel: 'Protected with GharShine NanoShield',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=70&sat=-80&con=30',
    afterImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=90',
    stat: '98% Limescale Repellence'
  },
  {
    id: 'sofa',
    surface: 'Fabric Living Room Sofa',
    concern: 'Chai & Curry Spills',
    beforeLabel: 'Untreated (Liquid soaks into yarn fibers)',
    afterLabel: 'Protected with HydroBarrier Guard',
    beforeImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=70&sat=-40&con=-20',
    afterImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=90',
    stat: '100% Instant Liquid Beading'
  },
  {
    id: 'marble',
    surface: 'Italian Marble Island',
    concern: 'Turmeric & Lemon Acid Etch',
    beforeLabel: 'Untreated (Yellow haldi absorption & dull etch)',
    afterLabel: 'Sealed with StoneArmor Sub-Surface',
    beforeImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70&sat=-60',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90',
    stat: '18-Month Deep Defense'
  }
];

export const BeforeAfterSlider = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const current = comparisons[selectedTab];

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percent = Math.min(100, Math.max(0, (x / width) * 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles size={13} />
            <span>Visible Transformation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            See the Difference
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Drag the interactive slider to compare unshielded surfaces against GharShine nano-barrier protection.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          {comparisons.map((c, index) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedTab(index);
                setSliderPos(50);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 ${
                selectedTab === index
                  ? 'bg-[#087F8C] text-white shadow-md shadow-[#087F8C]/20'
                  : 'bg-[#F8FAFA] text-slate-600 hover:text-slate-900 border border-slate-100'
              }`}
            >
              {c.surface}
            </button>
          ))}
        </div>

        {/* Comparison Viewer Container */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 select-none cursor-ew-resize"
          >
            {/* After Image (Full background) */}
            <img
              src={current.afterImage}
              alt={current.afterLabel}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={current.beforeImage}
                alt={current.beforeLabel}
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{
                  width: containerRef.current?.getBoundingClientRect().width || '100%',
                  height: containerRef.current?.getBoundingClientRect().height || '100%'
                }}
              />
              <div className="absolute inset-0 bg-slate-950/20" />
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold shadow-md border border-white/10">
                BEFORE: Untreated
              </span>
            </div>

            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="px-3 py-1.5 rounded-xl bg-[#087F8C]/90 backdrop-blur-md text-white text-xs font-bold shadow-md border border-white/20">
                AFTER: Protected ✨
              </span>
            </div>

            {/* Draggable Divider Line & Knob */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none flex items-center justify-center -translate-x-1/2"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Vertical Line */}
              <div className="w-0.5 h-full bg-white shadow-lg" />

              {/* Knob */}
              <div className="absolute w-10 h-10 rounded-full bg-white text-[#087F8C] shadow-2xl flex items-center justify-center border-2 border-[#087F8C]">
                <MoveHorizontal size={18} />
              </div>
            </div>

            {/* Bottom Surface Badge */}
            <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex items-center justify-between">
              <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white text-[11px] font-medium hidden sm:block">
                <span>Concern: {current.concern}</span>
              </div>

              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/90 backdrop-blur-md text-white text-xs font-bold shadow-md ml-auto">
                <span>{current.stat}</span>
              </div>
            </div>

          </div>

          <p className="text-center text-xs text-slate-400 mt-4">
            👈 Drag slider left and right to inspect the hydrophobic barrier 👉
          </p>
        </div>

      </div>
    </section>
  );
};
