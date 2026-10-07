import React, { useState } from 'react';
import { MapPin, CheckCircle2, Truck, RefreshCw, ShieldCheck } from 'lucide-react';

export const PincodeChecker = () => {
  const [pincode, setPincode] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6 || isNaN(Number(pincode))) {
      setStatus({ success: false, message: 'Please enter a valid 6-digit Indian PIN code.' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Mock lookup based on first digit
      const isMetro = ['1', '4', '5', '6', '7'].includes(pincode[0]);
      setStatus({
        success: true,
        pincode,
        deliveryTime: isMetro ? 'Delivery in 2 - 3 Business Days' : 'Delivery in 4 - 6 Business Days',
        cod: true,
        freeShipping: true
      });
    }, 400);
  };

  return (
    <div className="bg-[#F8FAFA] p-4 sm:p-5 rounded-2xl border border-slate-100 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
        <MapPin size={15} className="text-[#087F8C]" />
        <span>Check Delivery & Cash on Delivery (COD)</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit Pincode"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, ''));
            setStatus(null);
          }}
          className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#087F8C]"
        />
        <button
          type="submit"
          disabled={loading || pincode.length !== 6}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shrink-0"
        >
          {loading ? 'Checking...' : 'Check'}
        </button>
      </form>

      {/* Result feedback */}
      {status && (
        <div className="animate-in fade-in duration-200 pt-1">
          {status.success ? (
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <CheckCircle2 size={14} />
                <span>Express Dispatch Available for PIN {status.pincode}</span>
              </div>
              <p className="text-slate-600 pl-5">⚡ {status.deliveryTime}</p>
              <p className="text-slate-600 pl-5">💵 Cash on Delivery & Prepaid UPI both available</p>
            </div>
          ) : (
            <p className="text-xs text-rose-500 font-medium">{status.message}</p>
          )}
        </div>
      )}

      {/* Quick Trust Strip below */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
        <span className="flex items-center gap-1">
          <Truck size={13} className="text-[#087F8C]" /> Free on ₹999+
        </span>
        <span className="flex items-center gap-1">
          <RefreshCw size={13} className="text-[#087F8C]" /> 7-Day Replace
        </span>
        <span className="flex items-center gap-1">
          <ShieldCheck size={13} className="text-[#087F8C]" /> 100% Genuine
        </span>
      </div>
    </div>
  );
};
