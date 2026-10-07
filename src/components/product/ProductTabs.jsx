import React, { useState } from 'react';
import {
  Check,
  X,
  AlertTriangle,
  Layers,
  Sparkles,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  Star
} from 'lucide-react';
import { RatingStars } from '../common/RatingStars';
import { useToast } from '../../context/ToastContext';

export const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('highlights');
  const [newReviewModal, setNewReviewModal] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const { addToast } = useToast();

  const tabs = [
    { id: 'highlights', label: 'Highlights & Science' },
    { id: 'howToUse', label: 'How To Use' },
    { id: 'surfaces', label: 'Suitable Surfaces' },
    { id: 'safety', label: 'Specs & Safety' },
    { id: 'reviews', label: `Reviews (${product.reviewCount || 0})` }
  ];

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) {
      addToast('Please fill all review fields.', 'error');
      return;
    }
    setNewReviewModal(false);
    setReviewName('');
    setReviewComment('');
    addToast('Thank you! Your verified review has been submitted for moderation.', 'success');
  };

  return (
    <div className="pt-12 sm:pt-16 border-t border-slate-100">
      
      {/* Tab Navigation Buttons */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar pb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 sm:px-6 py-3.5 text-xs sm:text-sm font-bold transition-all shrink-0 border-b-2 ${
              activeTab === tab.id
                ? 'border-[#087F8C] text-[#087F8C]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Panels */}
      <div className="py-8">
        
        {/* Tab 1: Highlights */}
        {activeTab === 'highlights' && (
          <div className="space-y-6 max-w-4xl">
            <h3 className="text-lg font-bold text-slate-900">
              Why this formula is engineered for Indian Homes:
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {product.features?.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8FAFA] border border-slate-100 text-xs sm:text-sm text-slate-800 font-medium"
                >
                  <Check size={18} className="text-[#087F8C] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: How To Use */}
        {activeTab === 'howToUse' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#087F8C]" />
              <h3 className="text-lg font-bold text-slate-900">
                Step-by-Step Application Guide
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.howToUse?.map((stepItem, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col justify-between"
                >
                  <span className="text-xs font-black text-[#087F8C] uppercase tracking-wider mb-2 block">
                    {stepItem.step}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {stepItem.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Pro Application Tip:</strong> For maximum durability, allow 4 hours of water-free curing after buffing the protective nano-shield onto glass or stone.
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Suitable & Non Suitable Surfaces */}
        {activeTab === 'surfaces' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
            {/* Suitable */}
            <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-100 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <Check size={18} className="text-emerald-600" />
                <span>Recommended Surfaces</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {product.suitableFor?.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Suitable */}
            <div className="p-6 rounded-3xl bg-rose-50/50 border border-rose-100 space-y-3">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                <X size={18} className="text-rose-600" />
                <span>Not Recommended / Precautions</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {product.notSuitableFor?.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 4: Specs & Safety */}
        {activeTab === 'safety' && (
          <div className="space-y-6 max-w-3xl">
            <h3 className="text-lg font-bold text-slate-900">Technical Specifications</h3>
            
            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white overflow-hidden text-xs sm:text-sm">
              {product.specs &&
                Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="p-3.5 flex justify-between">
                    <span className="text-slate-500 font-medium">{key}</span>
                    <span className="text-slate-900 font-bold">{val}</span>
                  </div>
                ))}
              <div className="p-3.5 flex justify-between">
                <span className="text-slate-500 font-medium">Environmental Safety</span>
                <span className="text-emerald-700 font-bold">100% Biodegradable Surfactants</span>
              </div>
              <div className="p-3.5 flex justify-between">
                <span className="text-slate-500 font-medium">Acid Fumes</span>
                <span className="text-emerald-700 font-bold">Zero Hydrochloric Acid / Non-Corrosive</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-500 flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-[#087F8C]" />
              <span>Tested & formulated in ISO 9001 certified chemical laboratory facilities in India.</span>
            </div>
          </div>
        )}

        {/* Tab 5: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-8 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-[#F8FAFA] rounded-3xl border border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Customer Ratings & Experiences
                </h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <RatingStars rating={product.rating} reviewCount={product.reviewCount} size={16} />
                  <span className="text-xs text-slate-500">96% of reviewers recommend this product</span>
                </div>
              </div>

              <button
                onClick={() => setNewReviewModal(true)}
                className="px-5 py-2.5 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shrink-0"
              >
                <MessageSquare size={16} />
                <span>Write a Review</span>
              </button>
            </div>

            {/* Mock Review items */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Deepak Nair (Bengaluru)</span>
                  <span className="text-xs text-slate-400">1 week ago</span>
                </div>
                <RatingStars rating={5} size={13} showCount={false} />
                <p className="text-xs sm:text-sm text-slate-600">
                  "Exceeded my expectations. The hard water marks in our bathroom were 2 years old and vanished after 5 minutes of application. Top quality spray bottle and cloths too!"
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Sunita Rao (Mumbai)</span>
                  <span className="text-xs text-slate-400">2 weeks ago</span>
                </div>
                <RatingStars rating={5} size={13} showCount={false} />
                <p className="text-xs sm:text-sm text-slate-600">
                  "Applied this to our new dining table and sofa. Super easy instructions and leaves no smell whatsoever. Very happy with GharShine."
                </p>
              </div>
            </div>

            {/* Write Review Modal */}
            {newReviewModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 space-y-4 animate-in zoom-in-95">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-900">Write a Verified Review</h4>
                    <button
                      onClick={() => setNewReviewModal(false)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmitReview} className="space-y-3.5 text-xs sm:text-sm">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Your Name & City</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh K., Hyderabad"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F8C]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            type="button"
                            key={s}
                            onClick={() => setReviewRating(s)}
                            className="p-1 text-amber-400 hover:scale-110 transition"
                          >
                            <Star
                              size={24}
                              className={s <= reviewRating ? 'fill-amber-400' : 'text-slate-200'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Review Comments</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Tell other Indian homeowners about your results on this surface..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F8C]"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setNewReviewModal(false)}
                        className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#087F8C] hover:bg-[#066670] text-white rounded-xl font-bold"
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
