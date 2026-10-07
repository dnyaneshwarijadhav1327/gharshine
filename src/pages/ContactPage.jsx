import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { brandConfig } from '../data/config';
import { Phone, Mail, Clock, MapPin, MessageCircle, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Surface Advice',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact Customer Support | GharShine";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill in all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    addToast('Message sent successfully! Our team will respond shortly.', 'success');
  };

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />

        {/* Header */}
        <div className="py-8 border-b border-slate-100 mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} />
            <span>We're Here To Help</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-base text-slate-600 mt-2">
            Have questions about product compatibility for your stone, glass or fabric? Our surface specialists are just a message away.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Direct Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone */}
            <div className="p-5 rounded-2xl bg-[#F8FAFA] border border-slate-100 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#E8F8F8] text-[#087F8C] flex items-center justify-center shrink-0">
                <Phone size={20} />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Call Us</span>
                <a href={`tel:${brandConfig.supportPhone}`} className="font-bold text-slate-900 hover:text-[#087F8C]">
                  {brandConfig.supportPhone}
                </a>
                <span className="text-slate-500 block text-[11px] mt-0.5">Toll-free customer hotline</span>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="p-5 rounded-2xl bg-[#F8FAFA] border border-slate-100 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <MessageCircle size={20} />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">WhatsApp Care</span>
                <a
                  href={`https://wa.me/${brandConfig.whatsapp.number}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-emerald-700 hover:underline"
                >
                  Chat with a Specialist
                </a>
                <span className="text-slate-500 block text-[11px] mt-0.5">Share photos for custom advice</span>
              </div>
            </div>

            {/* Email */}
            <div className="p-5 rounded-2xl bg-[#F8FAFA] border border-slate-100 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#E8F8F8] text-[#087F8C] flex items-center justify-center shrink-0">
                <Mail size={20} />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Email Support</span>
                <a href={`mailto:${brandConfig.supportEmail}`} className="font-bold text-slate-900 hover:text-[#087F8C]">
                  {brandConfig.supportEmail}
                </a>
                <span className="text-slate-500 block text-[11px] mt-0.5">Average reply time &lt; 2 hours</span>
              </div>
            </div>

            {/* Hours */}
            <div className="p-5 rounded-2xl bg-[#F8FAFA] border border-slate-100 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock size={20} />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Business Hours</span>
                <strong className="text-slate-900 block font-bold">{brandConfig.businessHours}</strong>
                <span className="text-slate-500 block text-[11px] mt-0.5">Sunday Closed for dispatch</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-lg">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our surface care team will reach out to <strong>{formData.email}</strong> within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
                >
                  Send Another Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">
                  Send Us a Direct Message
                </h3>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Nair"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F8C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="priya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F8C]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile / WhatsApp Number</label>
                    <input
                      type="text"
                      placeholder="98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F8C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F8C]"
                  >
                    <option value="Surface Advice">Product & Surface Advice</option>
                    <option value="Order Tracking">Order & Delivery Tracking</option>
                    <option value="Damaged Leakage">Damaged or Leaked Bottle Replacement</option>
                    <option value="Bulk Order">Bulk / Corporate Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Message & Surface Details *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your surface, stain issue, or query in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F8C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-md shadow-[#087F8C]/20"
                >
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
