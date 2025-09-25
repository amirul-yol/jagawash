import HeroSection from '@/components/HeroSection';
import ServicePackages from '@/components/ServicePackages';
import AddOnServices from '@/components/AddOnServices';
import BusinessInfo from '@/components/BusinessInfo';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicePackages />
      <AddOnServices />
      <BusinessInfo />
    </main>
  );
}
