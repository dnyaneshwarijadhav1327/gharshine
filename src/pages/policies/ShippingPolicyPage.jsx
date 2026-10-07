import React, { useEffect } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

export const ShippingPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Shipping & Delivery Policy | GharShine";
  }, []);

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Shipping Policy' }]} />

        <div className="py-8 border-b border-slate-100 mb-8">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900">Shipping & Delivery Policy</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Pan-India Express Logistics</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Delivery Timelines</h2>
            <p>
              • <strong>Metro Cities:</strong> (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad) — 2 to 3 Business Days.
            </p>
            <p>
              • <strong>Rest of India:</strong> 4 to 6 Business Days.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Free Shipping Eligibility</h2>
            <p>
              Orders with a subtotal of ₹999 or greater qualify for 100% Free Express Shipping across all serviceable pincodes in India. Standard flat shipping of ₹99 applies on orders under ₹999.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Leak-Proof Industrial Packaging</h2>
            <p>
              All liquid bottles are fitted with tamper-evident induction heat seals, secondary safety clips, and multi-layer shock-absorbing air columns to eliminate leakage in transit.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
