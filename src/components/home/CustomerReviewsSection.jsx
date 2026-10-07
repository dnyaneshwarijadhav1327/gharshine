import React, { useState } from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, ThumbsUp, Star } from 'lucide-react';
import { customerReviews, reviewsStats } from '../../data/reviews';
import { RatingStars } from '../common/RatingStars';

export const CustomerReviewsSection = () => {
  const [reviewsList, setReviewsList] = useState(customerReviews);
  const [selectedRating, setSelectedRating] = useState('all');

  const handleFilter = (val) => {
    setSelectedRating(val);
    if (val === 'all') {
      setReviewsList(customerReviews);
    } else {
      setReviewsList(customerReviews.filter((r) => r.rating === Number(val)));
    }
  };

  const handleHelpful = (id) => {
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1, userVoted: true } : r))
    );
  };

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Overall Ratings Strip */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 pb-10 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F8] text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-2.5">
              <Sparkles size={13} />
              <span>Real Customer Stories</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Trusted by Homeowners Across India
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              From high-rise apartments in Bengaluru and Mumbai to villas in Delhi NCR, see how GharShine protects cherished spaces.
            </p>
          </div>

          {/* Rating Summary Box */}
          <div className="bg-[#F8FAFA] p-6 rounded-3xl border border-slate-100 flex items-center gap-6 shrink-0">
            <div className="text-center">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 leading-none">
                {reviewsStats.overallRating}
              </span>
              <div className="flex items-center text-amber-400 mt-2 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-amber-400" />
                ))}
              </div>
              <span className="text-[11px] text-slate-500 font-semibold block mt-1">
                Based on {reviewsStats.totalReviews}+ reviews
              </span>
            </div>

            <div className="h-14 w-px bg-slate-200 hidden sm:block" />

            {/* Micro Highlights */}
            <div className="space-y-1 text-xs hidden sm:block">
              {reviewsStats.highlights.map((h, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <span className="text-slate-600">{h.label}</span>
                  <strong className="text-[#087F8C]">{h.score}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
            Filter:
          </span>
          <button
            onClick={() => handleFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedRating === 'all'
                ? 'bg-[#087F8C] text-white'
                : 'bg-[#F8FAFA] text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Reviews ({customerReviews.length})
          </button>
          <button
            onClick={() => handleFilter('5')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedRating === '5'
                ? 'bg-[#087F8C] text-white'
                : 'bg-[#F8FAFA] text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            ★★★★★ 5-Star Only
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* User & Location */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{rev.name}</h4>
                    <span className="text-[11px] text-slate-400 block">{rev.location}</span>
                  </div>

                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      <CheckCircle2 size={11} /> Verified Buyer
                    </span>
                  )}
                </div>

                {/* Stars & Product */}
                <div className="flex items-center gap-2 mb-3">
                  <RatingStars rating={rev.rating} size={14} showCount={false} />
                  <span className="text-[11px] text-slate-400">• {rev.date}</span>
                </div>

                <span className="text-[11px] font-bold text-[#087F8C] uppercase tracking-wider bg-[#E8F8F8] px-2 py-0.5 rounded-md inline-block mb-2">
                  {rev.productName}
                </span>

                {/* Review Title & Content */}
                <h5 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                  "{rev.title}"
                </h5>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {rev.content}
                </p>
              </div>

              {/* Bottom Helpful Button */}
              <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
                <span>Surface: {rev.surface}</span>
                <button
                  onClick={() => handleHelpful(rev.id)}
                  disabled={rev.userVoted}
                  className={`flex items-center gap-1 text-[11px] font-semibold transition ${
                    rev.userVoted ? 'text-[#087F8C]' : 'hover:text-slate-700'
                  }`}
                >
                  <ThumbsUp size={13} className={rev.userVoted ? 'fill-[#087F8C]' : ''} />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
