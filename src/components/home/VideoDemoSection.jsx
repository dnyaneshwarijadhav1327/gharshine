import React, { useState } from 'react';
import { Play, Sparkles, X, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { brandConfig } from '../../data/config';

export const VideoDemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const demo = brandConfig.demoVideo;

  return (
    <section className="py-16 sm:py-24 bg-[#F8FAFA] border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles size={13} />
            <span>Real-World Demonstrations</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Watch It Work
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {demo.subtitle}
          </p>
        </div>

        {/* Video Player Card */}
        <div className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-950 aspect-[16/9] flex items-center justify-center group">
          {isPlaying ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white p-6">
              {/* Simulated Demo Simulation Video Player */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={demo.posterImage}
                  alt="Video poster demo"
                  className="w-full h-full object-cover opacity-60 filter blur-xs"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              </div>

              <div className="relative z-10 text-center max-w-md space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#087F8C] flex items-center justify-center mx-auto text-white shadow-lg animate-pulse">
                  <Sparkles size={28} className="text-[#65D5D8]" />
                </div>
                <h3 className="text-xl font-bold">Hydrophobic Liquid Repellency Test</h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Observe how chai, coffee, and borewell water instantly form tight beads at a 110° contact angle on treated surfaces.
                </p>
                
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-white backdrop-blur-md transition"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="px-5 py-2.5 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-100 transition"
                  >
                    Pause Video
                  </button>
                </div>
              </div>

              {/* Close corner */}
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black text-white rounded-full transition z-20"
                aria-label="Close video"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="relative w-full h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
              <img
                src={demo.posterImage}
                alt="Video poster thumbnail"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/90 group-hover:bg-[#087F8C] group-hover:text-white text-[#087F8C] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Play size={32} className="ml-1 fill-current" />
                </div>
              </div>

              {/* Video Title Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-xl font-bold">{demo.title}</h3>
                  <span className="text-xs text-slate-300">Duration: 1 min 30 sec • 4K HDR Demo</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md text-xs font-semibold">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>Lab Tested</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
