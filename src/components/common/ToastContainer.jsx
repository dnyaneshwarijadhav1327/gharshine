import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      {toasts.map((toast) => {
        let icon = <CheckCircle size={18} className="text-emerald-500 shrink-0" />;
        let borderBg = "border-emerald-100 bg-white text-slate-800";

        if (toast.type === 'error') {
          icon = <AlertCircle size={18} className="text-rose-500 shrink-0" />;
          borderBg = "border-rose-100 bg-white text-slate-800";
        } else if (toast.type === 'info') {
          icon = <Info size={18} className="text-[#087F8C] shrink-0" />;
          borderBg = "border-teal-100 bg-white text-slate-800";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl shadow-xl border ${borderBg} animate-in fade-in slide-in-from-bottom-3 duration-200`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {icon}
              <span className="text-xs sm:text-sm font-medium leading-snug">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-1 shrink-0"
              aria-label="Dismiss toast"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
