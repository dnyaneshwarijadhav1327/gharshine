import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { brandConfig } from '../../data/config';

export const FloatingWhatsApp = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const wa = brandConfig.whatsapp;

  const handleClick = () => {
    const url = `https://wa.me/${wa.number}?text=${encodeURIComponent(wa.defaultMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs font-semibold py-2 px-3.5 rounded-full shadow-lg border border-slate-100 animate-in fade-in slide-in-from-right-4 duration-300">
          <span>{wa.tooltip}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        aria-label="Chat on WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-200"
        title="Chat with our surface care experts on WhatsApp"
      >
        <MessageCircle size={28} className="fill-white text-white" />
      </button>
    </div>
  );
};
