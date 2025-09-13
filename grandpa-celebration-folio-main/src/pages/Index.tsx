import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import MessagesSection from "@/components/MessagesSection";
import CodeTributeSection from "@/components/CodeTributeSection";
import CelebrationSection from "@/components/CelebrationSection";
import LegacySection from "@/components/LegacySection";
import ClosingSection from "@/components/ClosingSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Grand entrance with grandpa's portrait */}
      <HeroSection />
      
      {/* About Section - Timeline of grandpa's remarkable journey */}
      <AboutSection />
      
      {/* Gallery Section - Precious memory collection */}
      <GallerySection />
      
      {/* Messages Section - Heartfelt family wishes */}
      <MessagesSection />
      
      {/* Code Tribute Section - Unique tech tribute */}
      <CodeTributeSection />
      
      {/* Celebration Section - Interactive birthday experience */}
      <CelebrationSection />
      
      {/* Legacy Section - Wisdom and inspiring quotes */}
      <LegacySection />
      
      {/* Closing Section - Grand finale celebration */}
      <ClosingSection />
    </div>
  );
};

export default Index;
