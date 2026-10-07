import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { authService } from '../services/authService';
import { useToast } from '../context/ToastContext';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Reset Password | GharShine";
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const res = await authService.forgotPassword(email);
    setLoading(false);

    if (res.success) {
      setSent(true);
      addToast(res.message, 'success');
    }
  };

  return (
    <div className="min-h-[75vh] bg-[#F8FAFA] py-12 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-[#087F8C] flex items-center justify-center text-white mx-auto shadow-md">
            <Sparkles size={20} className="text-[#65D5D8]" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Reset Your Password
          </h2>
          <p className="text-xs text-slate-500">
            Enter your registered email address and we'll send you a password recovery link.
          </p>
        </div>

        {sent ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We have sent password reset instructions to <strong>{email}</strong> (Mock). Please check your inbox.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087F8C] hover:underline"
            >
              <ArrowLeft size={14} />
              <span>Back to Sign In</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F8C]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-md shadow-[#087F8C]/20"
            >
              {loading ? <span>Sending Link...</span> : <span>Send Reset Instructions</span>}
            </button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                <ArrowLeft size={13} />
                <span>Return to Login</span>
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
