import { Navbar } from '@/components/sections/Navbar';
import { HeroSection } from '@/components/sections/Hero';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </div>
  );
}
