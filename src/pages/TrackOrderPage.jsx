import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { orderService } from '../services/orderService';
import { Package, Search, Truck, CheckCircle2, Clock, MapPin, Sparkles } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export const TrackOrderPage = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || 'GS-89421');
  const [phone, setPhone] = useState('9876543210');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Track Your Order | GharShine";

    // Auto-fetch demo tracking
    handleTrack();
  }, []);

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    if (!orderId) return;

    setLoading(true);
    const res = await orderService.trackOrder(orderId, phone);
    if (res.success) {
      setTrackingData(res.data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: 'Track Order' }]} />

        {/* Header */}
        <div className="py-8 text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider">
            <Truck size={13} />
            <span>Live Dispatch Status</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Enter your GharShine Order ID (e.g. GS-89421) to check live courier milestones.
          </p>
        </div>

        {/* Lookup Box */}
        <div className="max-w-2xl mx-auto bg-[#F8FAFA] p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm mb-10">
          <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs sm:text-sm">
            <div className="sm:col-span-6">
              <label className="block text-slate-500 font-bold mb-1">Order ID</label>
              <input
                type="text"
                required
                placeholder="e.g. GS-89421"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl uppercase font-bold text-slate-800 focus:outline-none focus:border-[#087F8C]"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-slate-500 font-bold mb-1">Mobile Number</label>
              <input
                type="text"
                placeholder="Registered phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#087F8C]"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-[#087F8C]/20"
              >
                <Search size={15} />
                <span>Track</span>
              </button>
            </div>
          </form>
        </div>

        {/* Tracking Timeline Visualization */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-3 border-[#087F8C] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <span className="text-xs text-slate-500 font-medium">Fetching courier telemetry...</span>
          </div>
        ) : trackingData ? (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
            
            {/* Top Status Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#E8F8F8] to-[#F4F8F7] border border-teal-100">
              <div>
                <span className="text-xs text-slate-500 font-medium">Status for Order: <strong className="text-slate-900">{trackingData.orderId}</strong></span>
                <h3 className="text-xl font-extrabold text-[#087F8C] mt-0.5">
                  Package In Transit (On Schedule)
                </h3>
                <span className="text-xs text-slate-600 block mt-1">
                  Courier: <strong>{trackingData.courier}</strong> • AWB: {trackingData.trackingNumber}
                </span>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500 block">Estimated Arrival</span>
                <strong className="text-sm sm:text-base text-slate-900 block font-bold">
                  {trackingData.estimatedDelivery}
                </strong>
              </div>
            </div>

            {/* Step-by-Step Vertical Timeline */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
                Shipment History
              </h4>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {trackingData.steps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    {/* Circle Node */}
                    <div
                      className={`absolute -left-6 sm:-left-8 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center -translate-x-1/2 shadow-xs transition ${
                        step.completed
                          ? 'bg-[#087F8C] text-white'
                          : 'bg-white border-2 border-slate-300 text-slate-300'
                      }`}
                    >
                      {step.completed ? <CheckCircle2 size={16} /> : <Clock size={14} />}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5 className={`text-sm font-bold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step.status}
                        </h5>
                        <span className="text-xs text-slate-400">{step.date}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination Address & Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100 text-xs">
              <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-slate-100">
                <span className="text-slate-400 font-bold block mb-1">Delivering To</span>
                <strong className="text-slate-900 block">{trackingData.shippingAddress.name}</strong>
                <p className="text-slate-600">
                  {trackingData.shippingAddress.city}, {trackingData.shippingAddress.state} - {trackingData.shippingAddress.pincode}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-slate-100">
                <span className="text-slate-400 font-bold block mb-1">Order Total</span>
                <strong className="text-slate-900 block">{formatPrice(trackingData.totalAmount)}</strong>
                <span className="text-emerald-700 font-semibold block">Prepaid (Verified)</span>
              </div>
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
};
