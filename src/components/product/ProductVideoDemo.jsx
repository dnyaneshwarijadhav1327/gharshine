import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, ShieldCheck } from 'lucide-react';

export const ProductVideoDemo = ({
  videoSrc = null,
  videoPoster = '/images/gharshine-banner-protect.png',
  title = 'Watch Product in Action',
  subtitle = 'See how our nano-barrier coating instantly repels hard water, stains, oil & chai.'
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles size={13} />
            <span>Product Demonstration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {subtitle}
          </p>
        </div>

        {/* Video Player Box */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-950 aspect-[16/9] max-w-4xl mx-auto group">
          
          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={videoPoster}
              playsInline
              loop
              muted={isMuted}
              className="w-full h-full object-cover"
              onClick={togglePlay}
            />
          ) : (
            /* High-resolution Video Poster & Interactive Simulation */
            <div className="relative w-full h-full">
              <img
                src={videoPoster}
                alt="Product video preview"
                className="w-full h-full object-cover brightness-75 group-hover:scale-102 transition-transform duration-700"
              />
              
              {/* Dark overlay with highlights */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-6 sm:p-8">
                
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-[#52D1DC]" />
                    <span>Real-World Hydrophobic Lab Test</span>
                  </span>
                </div>

                {/* Center Big Play Button */}
                <div className="flex items-center justify-center">
                  <button
                    onClick={togglePlay}
                    aria-label="Play video"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#52D1DC] hover:bg-[#3ec4d0] active:scale-95 text-slate-950 shadow-2xl flex items-center justify-center transition-all cursor-pointer pl-1 group-hover:scale-110"
                  >
                    <Play size={32} className="fill-slate-950" />
                  </button>
                </div>

                {/* Bottom info */}
                <div className="flex items-center justify-between text-white text-xs sm:text-sm font-medium">
                  <span>90-180 Days Protection Verification</span>
                  <span className="text-slate-300 text-[11px]">Click to upload or play advertising video</span>
                </div>
              </div>
            </div>
          )}

          {/* Video Control Bar if video is playing */}
          {videoSrc && (
            <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={toggleMute}
                className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition cursor-pointer"
                aria-label="Toggle Mute"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button
                onClick={togglePlay}
                className="px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-md transition cursor-pointer"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
