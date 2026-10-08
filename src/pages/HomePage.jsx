import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustStrip } from '../components/home/TrustStrip';
import { ConcernSection } from '../components/home/ConcernSection';
import { CombosCarouselSection } from '../components/home/CombosCarouselSection';
import { SurfaceGrid } from '../components/home/SurfaceGrid';
import { BestsellersSection } from '../components/home/BestsellersSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { BeforeAfterSlider } from '../components/home/BeforeAfterSlider';
import { CleaningVsProtection } from '../components/home/CleaningVsProtection';
import { RoomWiseSection } from '../components/home/RoomWiseSection';
import { FeaturedComboSection } from '../components/home/FeaturedComboSection';
import { BuildYourOwnCombo } from '../components/home/BuildYourOwnCombo';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { CustomerReviewsSection } from '../components/home/CustomerReviewsSection';
import { VideoDemoSection } from '../components/home/VideoDemoSection';
import { BrandStorySection } from '../components/home/BrandStorySection';
import { FAQSection } from '../components/home/FAQSection';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "GharShine | Premium Home Surface Care & Protection";
  }, []);

  return (
    <div className="w-full">
      {/* 3. Hero */}
      <HeroSection />

      {/* 4. Trust Strip */}
      <TrustStrip />

      {/* 5. Everyday Problems / Concerns (Section 2) */}
      <ConcernSection />

      {/* 6. Combos Carousel / Products Slider (Section 3) */}
      <CombosCarouselSection />

      {/* 7. Shop By Surface */}
      <SurfaceGrid />

      {/* 7. Best Sellers */}
      <BestsellersSection />

      {/* 8. How It Works */}
      <HowItWorksSection />

      {/* 9. Before / After */}
      <BeforeAfterSlider />

      {/* 10. Cleaning vs Protection */}
      <CleaningVsProtection />

      {/* 11. Room-wise Shopping */}
      <RoomWiseSection />

      {/* 12. Featured Combo */}
      <FeaturedComboSection />

      {/* 13. Build Your Own Combo */}
      <BuildYourOwnCombo />

      {/* 14. Why Choose Us */}
      <WhyChooseUsSection />

      {/* 15. Customer Reviews */}
      <CustomerReviewsSection />

      {/* 16. Video Demo */}
      <VideoDemoSection />

      {/* 17. Brand Story */}
      <BrandStorySection />

      {/* 18. FAQ */}
      <FAQSection />

      {/* 19. Newsletter */}
      <NewsletterSection />
    </div>
  );
};
