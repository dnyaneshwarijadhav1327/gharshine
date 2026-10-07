# GharShine - Premium Indian Home Surface Care & Protection E-Commerce Frontend

A production-grade, highly polished, responsive frontend for an Indian direct-to-consumer (D2C) home surface cleaning, stain-removal, and nano-barrier surface protection brand.

Built with **React 19**, **Vite**, **Tailwind CSS v4**, **React Router v7**, and **Lucide Icons**.

---

## 🌟 Key Highlights & Features

1. **Frontend-Only, API-Ready Architecture:**
   - Zero hardcoded backend dependencies.
   - Centralized mock service layer in `src/services/` with explicit `TODO` markers for easy REST/GraphQL API integration.
   - Comprehensive state management using React Context API + LocalStorage persistence.

2. **Extensible Product Catalog (`src/data/products.js`):**
   - Supports 50+ products without redesigning or rewriting any UI components.
   - Includes full metadata: pricing, discounts, surface categories, concerns, rooms, usage steps, suitable/unsuitable surfaces, safety specs, and customer ratings.

3. **All 21 Homepage Sections in Specified Flow:**
   1. Dynamic dismissible/rotatable **Announcement Bar**
   2. Sticky Header with blur, cart item counter & full-height mobile drawer
   3. **Hero Section** with lifestyle imagery, trust badges & action CTAs
   4. **Trust Strip** with 5 core brand pillars
   5. **Everyday Problems / Concerns** with zoom effects & dark gradients
   6. **Shop By Surface** carousel (Glass, Ceramic, Bathroom, Fabric, Marble, Granite, Wood, Leather, Tiles, Kitchen, Metal, Multi-surface)
   7. **Bestsellers & Customer Favorites** with interactive category filters
   8. **How It Works** 4-step chemical bonding methodology
   9. **Before / After Comparison** with touch & mouse draggable split slider
   10. **Cleaning vs Protection** educational scientific comparison
   11. **Room-Wise Shopping** (Bathroom, Living Room, Kitchen, Bedroom, Pooja Mandir, Balcony)
   12. **Featured Value Bundles & Combos** with live retail savings breakdown
   13. **Build Your Own Combo** 3-step interactive bundle builder with tiered savings (10%, 15%, 20%)
   14. **Why Choose Us** 6-pillar benefit grid
   15. **Customer Reviews** with Indian cities, verified buyer badges & rating filters
   16. **Watch It Work** video demo player
   17. **Brand Story** ("Made for the Way Indian Homes Live")
   18. **FAQ Accordion** with category switcher
   19. **Newsletter Subscription** with instant validation
   20. **Footer** with 4 collections, trust assurances & legal links
   21. **Floating WhatsApp Helpdesk** with direct pre-filled chat launcher

4. **Complete E-Commerce Pages & Flows:**
   - `/` — Homepage
   - `/shop` — Shop All catalog with multi-facet sidebar filters (Category, Surface, Concern, Price Range, Min Rating) & sorting
   - `/shop/:categorySlug` — Dynamic surface / concern / room landing pages
   - `/product/:slug` — Product Detail Page with image gallery & zoom, pincode delivery estimator, detailed tabs, safety specs & review submission modal
   - `/cart` — Full Cart & Checkout screen with line items, coupon code validator, shipping address form & payment method selector (UPI, Card, COD)
   - `/wishlist` — Saved wishlist items with 1-click Move-to-Cart
   - `/combo-builder` — Dedicated custom bundle builder
   - `/how-to-use` — Step-by-step surface application guide with Do's and Don'ts
   - `/about` — Brand story and science of surface care
   - `/contact` — Multi-channel contact page with interactive query form
   - `/track-order` — Order tracker with step-by-step progress timeline
   - `/faq` — Searchable knowledge base
   - `/login`, `/signup`, `/forgot-password` — Authentication UI screens
   - Legal policy pages: Privacy, Terms, Shipping & Returns

5. **Interactive UI Overlays:**
   - **Cart Drawer:** Slide-out right side drawer with real-time Free Shipping progress meter towards ₹999.
   - **Live Search Overlay:** Instant auto-suggestions with quick Add-to-Cart.
   - **Quick View Modal:** High-speed product preview from product cards.
   - **Cookie & Privacy Notice:** Non-intrusive bottom banner with preferences.
   - **Toast Alert System:** Responsive notifications for cart/wishlist actions.

---

## 🚀 Quick Start (Running Locally)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## ⚙️ Configuration & Customization Guide

### Brand & Site Settings (`src/data/config.js`)
Edit this single file to update:
- Brand name & taglines
- Support phone, email, and Indiranagar office address
- WhatsApp number (`whatsapp.number`) and default chat message
- Free shipping threshold (default `₹999`) and standard shipping fee (`₹99`)
- Active coupon codes (e.g. `SHINE10`, `SHINE15`, `GHARFIRST`)
- Announcement bar ticker text

### Adding New Products (`src/data/products.js`)
Simply append an object to the `products` array:
```javascript
{
  id: 13,
  name: "Your New Product Name",
  slug: "your-new-product-slug",
  category: "Protection", // 'Combos' | 'Protection' | 'Cleaners'
  surface: ["Glass", "Ceramic"],
  concerns: ["Hard Water Stains"],
  price: 699,
  originalPrice: 999,
  discount: 30,
  rating: 4.9,
  reviewCount: 120,
  badge: "NEW",
  size: "500ml Spray Bottle",
  shortDescription: "Short summary for product card",
  description: "Detailed description for product page...",
  thumbnail: "https://images.unsplash.com/...",
  images: ["https://..."],
  features: ["Benefit 1", "Benefit 2"],
  howToUse: [
    { step: "01. Clean", text: "..." },
    { step: "02. Apply", text: "..." }
  ],
  suitableFor: ["Shower enclosures", "Mirrors"],
  notSuitableFor: ["Raw unsealed wood"],
  specs: { "Volume": "500ml", "Origin": "India" }
}
```

---

## 🔌 Connecting Your Backend APIs Later

All data queries flow through the mock services in `src/services/`:
- `productService.js`: Replace `products` filter methods with `fetch('/api/products')`
- `cartService.js`: Connect server-side session cart APIs
- `orderService.js`: Connect payment gateway (Razorpay / Cashfree / Stripe) and order tracking API
- `authService.js`: Connect JWT/OAuth `/api/auth/login` and `/api/auth/register`
- `reviewService.js`: Connect customer review submission and moderation API

Each service contains clear `// TODO: Replace with real API endpoint` comments for rapid integration.

---

© 2026 GharShine. Formulated for Modern Indian Homes.
