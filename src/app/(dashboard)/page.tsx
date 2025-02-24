import Navbar from '../components/navbar';
import HeroSection from '../components/heroSection';
import ContactSection from '../components/contactSection';
import AboutSection from '../components/aboutSection';
import ModelsSection from '../components/modelsSection';
import RaceSection from '../components/raceSection';
import NewsSection from '../components/newsSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ModelsSection />
      <RaceSection />
      <NewsSection />
      <ContactSection />


    </div>
  );
}