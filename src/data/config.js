/**
 * Centralized Brand & Site Configuration
 * Easily change brand names, contact details, announcement text, WhatsApp number, and policies.
 */

export const brandConfig = {
  name: "GharShine",
  tagline: "Smart Surface Care for Modern Indian Homes",
  subTagline: "Clean Every Surface. Protect What Matters.",
  supportPhone: "+91 98765 43210",
  supportEmail: "care@gharshine.com",
  businessHours: "Mon - Sat: 9:30 AM to 6:30 PM IST",
  address: "GharShine Technologies Pvt Ltd, Indiranagar, Bengaluru, Karnataka - 560038, India",
  
  // WhatsApp Configuration (editable)
  whatsapp: {
    number: "919876543210", // International format without +
    defaultMessage: "Hi GharShine Team, I would like to know more about your surface protection products.",
    tooltip: "Need Help? Chat with us"
  },

  // E-commerce threshold settings
  freeShippingThreshold: 999, // in INR
  standardShippingFee: 99,
  currency: "₹",
  
  // Announcement Bar dynamic messages
  announcements: [
    "✨ Free Shipping on All Orders Above ₹999",
    "🛡️ 100% Surface-Safe Formulations Made for Indian Homes",
    "💧 Special Offer: Get 15% OFF on 3+ Bundles | Use Code: SHINE15",
    "⚡ Same Day Dispatch on Orders Placed Before 2 PM"
  ],

  // Mock valid coupon codes for frontend testing
  coupons: {
    "SHINE10": { discountPercent: 10, minOrder: 799, desc: "10% off on orders above ₹799" },
    "SHINE15": { discountPercent: 15, minOrder: 1499, desc: "15% off on orders above ₹1,499" },
    "GHARFIRST": { discountPercent: 20, minOrder: 999, desc: "20% off for first-time orders" }
  },

  // Social Links
  socials: {
    instagram: "https://instagram.com/gharshine.india",
    facebook: "https://facebook.com/gharshine.india",
    youtube: "https://youtube.com/@gharshine",
    whatsapp: "https://wa.me/919876543210"
  },

  // Video Section Settings
  demoVideo: {
    title: "Watch GharShine Hydro-Barrier in Action",
    subtitle: "See how our nano-barrier repels hard water, stains, and grease on glass, marble, and fabric.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", // Placeholder
    posterImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
  }
};
