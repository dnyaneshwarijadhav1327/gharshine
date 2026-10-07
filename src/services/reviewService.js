import { customerReviews, reviewsStats } from '../data/reviews';

/**
 * Review Service (Frontend Mock Layer)
 * 
 * TODO: Connect to backend review submission and retrieval endpoints
 */

export const reviewService = {
  async getReviews(filter = 'all') {
    await new Promise((resolve) => setTimeout(resolve, 80));
    let list = [...customerReviews];
    if (filter && filter !== 'all') {
      const ratingNum = Number(filter);
      if (!isNaN(ratingNum)) {
        list = list.filter((r) => r.rating === ratingNum);
      }
    }
    return {
      success: true,
      stats: reviewsStats,
      data: list
    };
  },

  async submitReview(reviewData) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      success: true,
      message: "Thank you! Your verified review has been submitted for moderation (Mock)."
    };
  }
};
