import { SiteHeader } from '@/components/shared/SiteHeader';
import { SiteFooter } from '@/components/shared/SiteFooter';
import { HeroSection } from '@/components/sections/Hero';
import { DemoSection } from '@/components/sections/Demo';
import { FeaturesSection } from '@/components/sections/Features';
import { TestimonialsSection } from '@/components/sections/Testimonials';
import { PricingSection } from '@/components/sections/Pricing';
import { WaitlistSection } from '@/components/sections/Waitlist';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader transparentOnTop showGenerateAnchor />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <TestimonialsSection />
        <PricingSection />
        <WaitlistSection />
      </main>
      <SiteFooter />
    </div>
  );
}
