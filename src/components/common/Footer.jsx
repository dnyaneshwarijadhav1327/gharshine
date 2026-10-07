import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, CheckCircle2, ArrowRight, ShieldCheck, Truck, RefreshCw, Lock } from 'lucide-react';
import { brandConfig } from '../../data/config';
import { surfaces } from '../../data/categories';
import { useToast } from '../../context/ToastContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    setIsSubscribed(true);
    addToast('Thank you! You are now subscribed to GharShine home care tips & offers.', 'success');
  };

  return (
    <footer className="bg-[#F8FAFA] border-t border-slate-200/70 pt-16 pb-10 text-slate-600 text-sm">
      {/* Trust Badges Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-slate-200/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#E8F8F8] text-[#087F8C] flex items-center justify-center shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Free Express Shipping</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">On all prepaid orders over ₹999</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#E8F8F8] text-[#087F8C] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">100% Surface Safe</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Engineered for Indian homes & water</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#E8F8F8] text-[#087F8C] flex items-center justify-center shrink-0">
              <RefreshCw size={20} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">7-Day Replacement</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Hassle-free guarantee on transit damages</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#E8F8F8] text-[#087F8C] flex items-center justify-center shrink-0">
              <Lock size={20} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Secure Checkout</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">UPI, Cards, NetBanking & COD</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#087F8C] flex items-center justify-center text-white">
                <Sparkles size={18} className="text-[#65D5D8]" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                Ghar<span className="text-[#087F8C]">Shine</span>
              </span>
            </Link>
            
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
              Scientific cleaning and nano-barrier surface protection solutions crafted specifically for modern Indian households, tap water conditions, and daily living.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Join the Surface Care Club
              </h5>
              <p className="text-xs text-slate-500 mb-3">
                Get monthly deep cleaning guides, stain emergency tips & member-only discounts.
              </p>

              {isSubscribed ? (
                <div className="flex items-center gap-2 p-3 bg-[#E8F8F8] text-[#087F8C] rounded-xl text-xs font-medium">
                  <CheckCircle2 size={16} />
                  <span>Thank you for subscribing! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md">
                  <div className="relative flex-1">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#087F8C] focus:ring-1 focus:ring-[#087F8C] transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/shop" className="hover:text-[#087F8C] transition">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Combos" className="hover:text-[#087F8C] transition">
                  Value Combos & Kits
                </Link>
              </li>
              <li>
                <Link to="/combo-builder" className="hover:text-[#087F8C] text-[#087F8C] font-semibold transition">
                  Build Your Own Kit ✨
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Protection" className="hover:text-[#087F8C] transition">
                  Surface Protectants
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Cleaners" className="hover:text-[#087F8C] transition">
                  Deep Cleaners & Scale Removers
                </Link>
              </li>
              <li>
                <Link to="/how-to-use" className="hover:text-[#087F8C] transition">
                  How To Use Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop By Surface Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Shop By Surface
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {surfaces.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link to={`/shop?surface=${s.slug}`} className="hover:text-[#087F8C] transition">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Support Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Help & Support
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/track-order" className="hover:text-[#087F8C] transition font-medium">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#087F8C] transition">
                  FAQs & Knowledge Base
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#087F8C] transition">
                  Contact Customer Care
                </Link>
              </li>
              <li>
                <Link to="/policies/shipping" className="hover:text-[#087F8C] transition">
                  Shipping & Delivery Info
                </Link>
              </li>
              <li>
                <Link to="/policies/refund" className="hover:text-[#087F8C] transition">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${brandConfig.whatsapp.number}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#087F8C] transition text-emerald-700 font-medium"
                >
                  WhatsApp Helpdesk
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          © {new Date().getFullYear()} {brandConfig.name}. All Rights Reserved. Formulated for Indian Homes.
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link to="/policies/privacy" className="hover:text-slate-600 transition">
            Privacy Policy
          </Link>
          <Link to="/policies/terms" className="hover:text-slate-600 transition">
            Terms & Conditions
          </Link>
          <Link to="/policies/shipping" className="hover:text-slate-600 transition">
            Shipping Policy
          </Link>
          <Link to="/policies/refund" className="hover:text-slate-600 transition">
            Refund Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};
