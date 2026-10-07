import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { faqs, faqCategories } from '../../data/faqs';

export const FAQSection = () => {
  const [openId, setOpenId] = useState(faqs[0].id);
  const [activeCategory, setActiveCategory] = useState('All');

  const toggleFAQ = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = faqs.filter((f) => {
    if (activeCategory === 'All') return true;
    return f.category === activeCategory;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#F4F8F7]/60" id="faq">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-2.5 border border-teal-100">
            <HelpCircle size={13} />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Everything you need to know about surface compatibility, application, and safety.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-1">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#087F8C] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#087F8C] text-white rotate-180'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 text-center bg-white p-6 rounded-3xl border border-slate-100 shadow-sm max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900">Have a specific surface doubt?</h4>
            <p className="text-xs text-slate-500">Send us a picture of your surface on WhatsApp</p>
          </div>
          <Link
            to="/contact"
            className="px-5 py-2.5 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0"
          >
            <span>Ask Support</span>
            <ArrowRight size={13} />
          </Link>
        </div>

      </div>
    </section>
  );
};
