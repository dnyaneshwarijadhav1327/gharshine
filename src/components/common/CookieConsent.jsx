import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gharshine_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('gharshine_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const decline = () => {
    localStorage.setItem('gharshine_cookie_consent', 'essential_only');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#E8F8F8] text-[#087F8C] flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck size={18} />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold text-slate-900">Cookie & Experience Notice</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            We use essential cookies to remember your shopping cart, preferences, and ensure seamless delivery tracking.
          </p>
          
          <div className="flex items-center gap-2 mt-3.5">
            <button
              onClick={acceptAll}
              className="px-3.5 py-1.5 bg-[#087F8C] hover:bg-[#066670] text-white rounded-lg text-xs font-semibold transition"
            >
              Accept All
            </button>
            <button
              onClick={decline}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition"
            >
              Essential Only
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-slate-600 p-1"
          aria-label="Close cookie banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
