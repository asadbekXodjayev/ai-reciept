import { Navbar } from '@/components/sections/Navbar';
import { HeroSection } from '@/components/sections/Hero';
import { DemoSection } from '@/components/sections/Demo';
import { FeaturesSection } from '@/components/sections/Features';
import { TestimonialsSection } from '@/components/sections/Testimonials';
import { PricingSection } from '@/components/sections/Pricing';
import { WaitlistSection } from '@/components/sections/Waitlist';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <TestimonialsSection />
        <PricingSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}
