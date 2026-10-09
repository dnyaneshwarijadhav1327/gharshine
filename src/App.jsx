import React, { Suspense, lazy, Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { QuickViewProvider } from './context/QuickViewContext';
import { SearchProvider } from './context/SearchContext';

import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { CookieConsent } from './components/common/CookieConsent';
import { SearchOverlay } from './components/common/SearchOverlay';
import { CartDrawer } from './components/common/CartDrawer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { ToastContainer } from './components/common/ToastContainer';

// Route Code Splitting for Ultra-Fast Initial Page Loads Across India (4G/5G)
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then(m => ({ default: m.ShopPage })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then(m => ({ default: m.CategoryPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const CartPage = lazy(() => import('./pages/CartPage').then(m => ({ default: m.CartPage })));
const WishlistPage = lazy(() => import('./pages/WishlistPage').then(m => ({ default: m.WishlistPage })));
const ComboBuilderPage = lazy(() => import('./pages/ComboBuilderPage').then(m => ({ default: m.ComboBuilderPage })));
const HowToUsePage = lazy(() => import('./pages/HowToUsePage').then(m => ({ default: m.HowToUsePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const TrackOrderPage = lazy(() => import('./pages/TrackOrderPage').then(m => ({ default: m.TrackOrderPage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import('./pages/SignupPage').then(m => ({ default: m.SignupPage })));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));

const PrivacyPolicyPage = lazy(() => import('./pages/policies/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/policies/TermsPage').then(m => ({ default: m.TermsPage })));
const ShippingPolicyPage = lazy(() => import('./pages/policies/ShippingPolicyPage').then(m => ({ default: m.ShippingPolicyPage })));
const RefundPolicyPage = lazy(() => import('./pages/policies/RefundPolicyPage').then(m => ({ default: m.RefundPolicyPage })));

// Global React Error Boundary Class
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('GharShine App Crash Prevented:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
          <div className="max-w-md w-full p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">GharShine</h2>
            <p className="text-sm text-slate-600">
              We are refreshing the page to load the latest protection kits.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="px-6 py-3 bg-[#087F8C] text-white font-bold rounded-xl shadow-md hover:bg-[#066670] transition"
            >
              Refresh Store
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Loading spinner fallback
const PageLoader = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
    <div className="w-9 h-9 border-3 border-[#087F8C] border-t-transparent rounded-full animate-spin" />
    <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Loading GharShine...</span>
  </div>
);

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <QuickViewProvider>
                <SearchProvider>
                  <div className="flex flex-col min-h-screen bg-white text-[#172026] font-sans antialiased selection:bg-[#087F8C]/15 selection:text-[#087F8C]">
                    {/* Top Announcement Bar */}
                    <AnnouncementBar />

                    {/* Sticky Header */}
                    <Header />

                    {/* Main Page Content with Suspense Lazy Loading */}
                    <main className="flex-1">
                      <Suspense fallback={<PageLoader />}>
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/shop" element={<ShopPage />} />
                          <Route path="/shop/:categorySlug" element={<CategoryPage />} />
                          <Route path="/product/:slug" element={<ProductDetailPage />} />
                          <Route path="/cart" element={<CartPage />} />
                          <Route path="/wishlist" element={<WishlistPage />} />
                          <Route path="/combo-builder" element={<ComboBuilderPage />} />
                          <Route path="/how-to-use" element={<HowToUsePage />} />
                          <Route path="/about" element={<AboutPage />} />
                          <Route path="/contact" element={<ContactPage />} />
                          <Route path="/track-order" element={<TrackOrderPage />} />
                          <Route path="/faq" element={<FAQPage />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/signup" element={<SignupPage />} />
                          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                          {/* Policy Routes */}
                          <Route path="/policies/privacy" element={<PrivacyPolicyPage />} />
                          <Route path="/policies/terms" element={<TermsPage />} />
                          <Route path="/policies/shipping" element={<ShippingPolicyPage />} />
                          <Route path="/policies/refund" element={<RefundPolicyPage />} />

                          {/* Fallback to Home */}
                          <Route path="*" element={<HomePage />} />
                        </Routes>
                      </Suspense>
                    </main>

                    {/* Footer */}
                    <Footer />

                    {/* Global Overlays & Modals */}
                    <FloatingWhatsApp />
                    <CookieConsent />
                    <SearchOverlay />
                    <CartDrawer />
                    <QuickViewModal />
                    <ToastContainer />
                  </div>
                </SearchProvider>
              </QuickViewProvider>
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
