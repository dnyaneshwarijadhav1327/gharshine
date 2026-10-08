import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustStrip } from '../components/home/TrustStrip';
import { ConcernSection } from '../components/home/ConcernSection';
import { CombosCarouselSection } from '../components/home/CombosCarouselSection';
import { BestsellersSection } from '../components/home/BestsellersSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { BeforeAfterSlider } from '../components/home/BeforeAfterSlider';
import { FeaturedComboSection } from '../components/home/FeaturedComboSection';
import { BuildYourOwnCombo } from '../components/home/BuildYourOwnCombo';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { CustomerReviewsSection } from '../components/home/CustomerReviewsSection';
import { VideoDemoSection } from '../components/home/VideoDemoSection';
import { FAQSection } from '../components/home/FAQSection';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "GharShine | Premium Home Surface Care & Protection";
  }, []);

  return (
    <div className="w-full">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. Everyday Problems / Concerns (Section 2) */}
      <ConcernSection />

      {/* 4. Combos Carousel / Products Slider (Section 3) */}
      <CombosCarouselSection />

      {/* 5. Best Sellers */}
      <BestsellersSection />

      {/* 6. How It Works */}
      <HowItWorksSection />

      {/* 7. Before / After */}
      <BeforeAfterSlider />

      {/* 8. Featured Combo */}
      <FeaturedComboSection />

      {/* 9. Build Your Own Combo */}
      <BuildYourOwnCombo />

      {/* 10. Why Choose Us */}
      <WhyChooseUsSection />

      {/* 11. Customer Reviews */}
      <CustomerReviewsSection />

      {/* 12. Video Demo */}
      <VideoDemoSection />

      {/* 13. FAQ */}
      <FAQSection />

      {/* 14. Newsletter */}
      <NewsletterSection />
    </div>
  );
};
