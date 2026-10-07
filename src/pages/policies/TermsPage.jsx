import React, { useEffect } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

export const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Terms and Conditions | GharShine";
  }, []);

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

        <div className="py-8 border-b border-slate-100 mb-8">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900">Terms & Conditions</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Effective Date: October 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing or shopping on GharShine (gharshine.com), you agree to be bound by these Terms and Conditions and our associated delivery and refund policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Surface Application Guidance</h2>
            <p>
              While GharShine formulas undergo rigorous chemical stability and material compatibility testing, the user is advised to read bottle label instructions carefully and conduct a small spot test in an inconspicuous area prior to full treatment on delicate antique or unsealed natural materials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Pricing and Availability</h2>
            <p>
              All prices listed on the store are in Indian Rupees (INR) and inclusive of applicable Goods and Services Tax (GST). GharShine reserves the right to modify promotional bundle discounts without prior notice.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
