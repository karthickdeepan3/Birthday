import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import grandpaPortrait from "@/assets/grandpa-portrait.jpg";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToCelebration = () => {
    document.getElementById('about')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden particles-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Golden Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-luxury-gold rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Floating Confetti */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`confetti-${i}`}
            className="absolute w-1 h-4 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? 'hsl(var(--luxury-gold))' : i % 3 === 1 ? 'hsl(var(--royal-blue))' : 'hsl(var(--deep-maroon))',
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        {/* Grandpa's Portrait with Luxury Frame */}
        <div className="relative mb-12 inline-block">
          <div className="relative">
            {/* Glowing Background */}
            <div className="absolute -inset-8 bg-gradient-glow rounded-full animate-pulse"></div>
            
            {/* Golden Frame */}
            <div className="relative p-4 bg-gradient-luxury rounded-full shadow-luxury">
              <div className="p-2 bg-premium-white rounded-full">
                <img 
                  src={grandpaPortrait}
                  alt="Beloved Grandpa"
                  className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-premium"
                />
              </div>
            </div>
            
            {/* Floating Hearts */}
            <div className="absolute -top-6 -right-6 text-4xl animate-heartbeat">💖</div>
            <div className="absolute -bottom-6 -left-6 text-3xl animate-float" style={{ animationDelay: '1s' }}>🎉</div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-gradient animate-fade-up">
          Happy Birthday
        </h1>
        
        <h2 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-semibold mb-8 text-glow animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Grandpa 💖
        </h2>

        {/* Subtitle */}
        <p className={`font-montserrat text-xl md:text-2xl lg:text-3xl text-royal-blue max-w-4xl mx-auto mb-12 leading-relaxed transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`} style={{ transitionDelay: '0.5s' }}>
          Your wisdom, love, and kindness light up our lives.<br/>
          <span className="text-deep-maroon font-medium">Today we celebrate YOU.</span>
        </p>

        {/* Call to Action Button */}
        <Button 
          onClick={scrollToCelebration}
          className={`btn-luxury text-xl md:text-2xl px-12 py-6 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{ transitionDelay: '0.8s' }}
        >
          <span className="relative z-10 font-montserrat font-semibold">
            Enter Celebration ✨
          </span>
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 bg-gradient-luxury rounded-full opacity-70"></div>
      </div>
    </section>
  );
};

export default HeroSection;