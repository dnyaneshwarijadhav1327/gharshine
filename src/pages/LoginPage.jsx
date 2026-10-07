import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { authService } from '../services/authService';
import { useToast } from '../context/ToastContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Account Login | GharShine";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please enter both email and password.', 'error');
      return;
    }

    setLoading(true);
    const res = await authService.login(email, password);
    setLoading(false);

    if (res.success) {
      addToast(res.message, 'info');
      navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#F8FAFA] py-12 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-[#087F8C] flex items-center justify-center text-white mx-auto shadow-md">
            <Sparkles size={20} className="text-[#65D5D8]" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome to GharShine
          </h2>
          <p className="text-xs text-slate-500">
            Sign in to track orders, save wishlists, and manage subscriptions.
          </p>
        </div>

        {/* Backend Connect Placeholder Notice */}
        <div className="p-3 bg-[#E8F8F8] rounded-2xl border border-teal-100 text-[11px] text-[#087F8C] flex items-center gap-2">
          <ShieldCheck size={16} className="shrink-0" />
          <span>Frontend Architecture: Ready to connect your JWT/OAuth backend API.</span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
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

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-700">Password</label>
              <Link to="/forgot-password" className="text-xs text-[#087F8C] hover:underline font-semibold">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F8C]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-md shadow-[#087F8C]/20"
          >
            {loading ? <span>Signing In...</span> : <span>Sign In</span>}
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Don't have an account yet? </span>
          <Link to="/signup" className="text-[#087F8C] font-bold hover:underline">
            Create an Account
          </Link>
        </div>

      </div>
    </div>
  );
};
