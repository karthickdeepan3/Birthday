import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

import grandpaPortrait from "@/assets/grandpa-portrait.jpg";
import grandpaProfessional from "@/assets/grandpa-professional.jpg";
import grandpaGroup from "@/assets/grandpa-group.jpg";

interface GalleryImage {
  src: string;
  caption: string;
  year: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: grandpaPortrait,
    caption: "A portrait of wisdom and warmth",
    year: "Timeless"
  },
  {
    src: grandpaProfessional,
    caption: "Professional excellence and leadership",
    year: "Career Milestone"
  },
  {
    src: grandpaGroup,
    caption: "Surrounded by love and community",
    year: "Celebration"
  }
];

const GallerySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('gallery');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="gallery" className="py-20 px-6 bg-royal-blue-dark relative overflow-hidden">
      {/* Animated Background Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-luxury-gold rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1.5 + Math.random() * 1.5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-luxury-gold mb-6">
            Cherished Memories
          </h2>
          <p className="font-montserrat text-xl md:text-2xl text-premium-white max-w-3xl mx-auto leading-relaxed">
            A collection of precious moments that tell the beautiful story of a life filled with love and joy.
          </p>
        </div>

        {/* Main Gallery Display */}
        <div className={`relative mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`} style={{ transitionDelay: '0.3s' }}>
          
          {/* Main Image Container */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-3xl shadow-premium bg-gradient-luxury p-4">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={galleryImages[currentIndex].src}
                  alt={galleryImages[currentIndex].caption}
                  className="w-full h-96 md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay with Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-playfair text-2xl md:text-3xl text-white mb-2 font-semibold">
                      {galleryImages[currentIndex].caption}
                    </p>
                    <p className="font-montserrat text-luxury-gold text-lg">
                      {galleryImages[currentIndex].year}
                    </p>
                  </div>
                </div>

                {/* Heart Icon */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Heart className="w-8 h-8 text-luxury-gold fill-current animate-heartbeat" />
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <Button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 btn-royal w-12 h-12 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <Button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 btn-royal w-12 h-12 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className={`flex justify-center space-x-4 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '0.6s' }}>
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                index === currentIndex 
                  ? 'ring-4 ring-luxury-gold scale-110 shadow-glow' 
                  : 'hover:scale-105 hover:shadow-royal'
              }`}
            >
              <img
                src={image.src}
                alt={image.caption}
                className="w-20 h-20 md:w-24 md:h-24 object-cover"
              />
              {index === currentIndex && (
                <div className="absolute inset-0 bg-luxury-gold/20"></div>
              )}
            </button>
          ))}
        </div>

        {/* Gallery Counter */}
        <div className={`text-center mt-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '0.9s' }}>
          <p className="font-montserrat text-premium-white/70">
            {currentIndex + 1} of {galleryImages.length}
          </p>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;