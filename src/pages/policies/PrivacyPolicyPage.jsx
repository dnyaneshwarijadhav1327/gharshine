import React, { useEffect } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

export const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy Policy | GharShine";
  }, []);

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        <div className="py-8 border-b border-slate-100 mb-8">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900">Privacy Policy</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Last Updated: October 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              When you purchase home surface care solutions on GharShine, we collect essential transactional data including your name, contact phone number, delivery address, pincode, and email address to fulfill your orders and provide express dispatch tracking.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. How We Use Your Data</h2>
            <p>
              Your data is utilized solely for processing orders, courier shipping notifications via WhatsApp and SMS, customer support queries, and periodic surface care maintenance advice if opted in. We do not sell or rent customer information to third-party marketing brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Payment Security</h2>
            <p>
              All online transactions through UPI, Credit/Debit cards, and NetBanking are processed through RBI-compliant, 256-bit SSL encrypted Indian payment gateways. GharShine does not store full credit card credentials or banking passwords.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">4. Contact Us Regarding Privacy</h2>
            <p>
              If you have any questions or wish to delete your stored account information, please contact our Data Protection desk at <strong>privacy@gharshine.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
