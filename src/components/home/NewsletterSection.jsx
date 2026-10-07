import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const NewsletterSection = () => {
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
    addToast("Thank you! You're subscribed to GharShine home care tips.", 'success');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#087F8C] via-[#0AA1B2] to-[#087F8C] p-8 sm:p-14 text-white overflow-hidden shadow-2xl shadow-teal-900/10">
          
          {/* Subtle Graphic Accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#65D5D8]/20 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
              <Sparkles size={13} className="text-[#65D5D8]" />
              <span>Join 25,000+ Indian Homeowners</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Keep Your Home Showroom-Clean, Always.
            </h2>

            <p className="text-xs sm:text-sm text-teal-50 max-w-lg mx-auto leading-relaxed">
              Get monthly seasonal surface maintenance guides, instant stain hacks for Indian recipes, and exclusive subscriber flash discounts.
            </p>

            {/* Form */}
            <div className="pt-3 max-w-md mx-auto">
              {isSubscribed ? (
                <div className="p-4 rounded-2xl bg-white text-[#087F8C] font-bold text-sm flex items-center justify-center gap-2 shadow-lg animate-in zoom-in-95">
                  <CheckCircle2 size={20} className="text-emerald-600" />
                  <span>Thank you! You're now subscribed.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-white rounded-2xl text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white shadow-md"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-md shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>

            <span className="text-[11px] text-teal-100/80 block pt-1">
              🔒 No spam ever. Unsubscribe anytime with 1 click.
            </span>

          </div>
        </div>
      </div>
    </section>
  );
};
