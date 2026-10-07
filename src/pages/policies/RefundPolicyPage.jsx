import React, { useEffect } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

export const RefundPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Refund & Replacement Policy | GharShine";
  }, []);

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Refund & Returns Policy' }]} />

        <div className="py-8 border-b border-slate-100 mb-8">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900">Returns & Refund Policy</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">7-Day Hassle-Free Replacement Guarantee</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Transit Damage or Leakage</h2>
            <p>
              If your package arrives damaged, leaked, or with an incorrect product bottle, GharShine offers a 100% free direct replacement within 7 days of delivery. Simply message our WhatsApp support (+91 98765 43210) or email <strong>care@gharshine.com</strong> with a photo of the package and your Order ID.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Refund Processing Time</h2>
            <p>
              In cases where replacement is not requested and refund is approved, funds are credited back to the original source payment method (UPI account or Card) within 3-5 business days.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Non-Returnable Items</h2>
            <p>
              Due to hygiene and chemical seal integrity guidelines, bottles with broken induction seals that have been extensively used cannot be accepted for return, unless proven defective upon arrival.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
