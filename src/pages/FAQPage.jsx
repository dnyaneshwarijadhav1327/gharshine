import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { faqs, faqCategories } from '../data/faqs';
import { Search, ChevronDown, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';
import { brandConfig } from '../data/config';

export const FAQPage = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openId, setOpenId] = useState(faqs[0].id);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Help Center & FAQs | GharShine";
  }, []);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  const filtered = faqs.filter((f) => {
    const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch =
      !search ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: 'Knowledge Base & FAQs' }]} />

        {/* Hero Header */}
        <div className="py-8 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider">
            <HelpCircle size={13} />
            <span>Customer Knowledge Center</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            How Can We Help You?
          </h1>
          <p className="text-xs sm:text-base text-slate-600">
            Search answers on surface compatibility, application methods, safety, and delivery timelines.
          </p>

          {/* Search Box */}
          <div className="pt-4 max-w-lg mx-auto">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions (e.g. marble, borewell water, returns...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-[#F8FAFA] border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#087F8C] shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-2">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#087F8C] text-white shadow-xs'
                  : 'bg-[#F8FAFA] text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filtered.length > 0 ? (
            filtered.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs transition"
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isOpen ? 'bg-[#087F8C] text-white rotate-180' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 animate-in fade-in duration-200">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-slate-500 text-sm">
              No questions found matching "{search}".
            </div>
          )}
        </div>

        {/* Live Help Bottom CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#E8F8F8] to-[#F4F8F7] border border-teal-100 text-center max-w-xl mx-auto space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Still need assistance with a specific surface?
          </h3>
          <p className="text-xs text-slate-600">
            Send photos of your bathroom glass, marble, or upholstery to our specialists.
          </p>
          <a
            href={`https://wa.me/${brandConfig.whatsapp.number}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition"
          >
            <MessageCircle size={18} />
            <span>Chat on WhatsApp Support</span>
          </a>
        </div>

      </div>
    </div>
  );
};
