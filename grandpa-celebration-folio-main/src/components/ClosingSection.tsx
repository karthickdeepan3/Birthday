import { useState, useEffect } from "react";
import { Heart, Star, Sparkles, Crown } from "lucide-react";

const ClosingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [fireworksActive, setFireworksActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start fireworks after a delay
          setTimeout(() => {
            setFireworksActive(true);
          }, 1000);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('closing');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const Firework = ({ delay, left, top }: { delay: number; left: string; top: string }) => (
    <div 
      className={`absolute pointer-events-none ${fireworksActive ? 'animate-ping' : 'opacity-0'}`}
      style={{ 
        left, 
        top,
        animationDelay: `${delay}s`,
        animationDuration: '2s'
      }}
    >
      <div className="relative">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-luxury-gold rounded-full"
            style={{
              transform: `rotate(${i * 45}deg) translate(30px) rotate(-${i * 45}deg)`,
            }}
          />
        ))}
        <div className="w-4 h-4 bg-luxury-gold rounded-full"></div>
      </div>
    </div>
  );

  const FloatingHeart = ({ delay, size = "w-6 h-6" }: { delay: number; size?: string }) => (
    <Heart 
      className={`absolute ${size} text-luxury-gold fill-current animate-float opacity-70`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}
    />
  );

  return (
    <section id="closing" className="py-32 px-6 relative overflow-hidden min-h-screen flex items-center">
      
      {/* Grand Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-maroon via-royal-blue to-luxury-gold-dark"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Floating Hearts */}
        {[...Array(20)].map((_, i) => (
          <FloatingHeart 
            key={`heart-${i}`} 
            delay={i * 0.3}
            size={i % 3 === 0 ? "w-8 h-8" : "w-6 h-6"}
          />
        ))}

        {/* Sparkling Stars */}
        {[...Array(25)].map((_, i) => (
          <Star
            key={`star-${i}`}
            className="absolute text-luxury-gold animate-sparkle"
            size={16 + Math.random() * 8}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 1}s`
            }}
          />
        ))}

        {/* Fireworks */}
        <Firework delay={0} left="20%" top="30%" />
        <Firework delay={0.5} left="80%" top="20%" />
        <Firework delay={1} left="70%" top="60%" />
        <Firework delay={1.5} left="30%" top="70%" />
        <Firework delay={2} left="50%" top="40%" />
        <Firework delay={2.5} left="90%" top="50%" />
        <Firework delay={3} left="10%" top="80%" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        
        {/* Crown Icon */}
        <div className={`flex justify-center mb-12 transition-all duration-1500 ${
          isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-12'
        }`}>
          <div className="relative">
            <div className="p-6 bg-gradient-luxury rounded-full shadow-glow">
              <Crown className="w-16 h-16 md:w-20 md:h-20 text-white" />
            </div>
            <div className="absolute -inset-2 bg-gradient-glow rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className={`font-playfair text-6xl md:text-8xl lg:text-9xl font-bold mb-8 transition-all duration-1500 ${
          isVisible ? 'opacity-100 translate-y-0 text-glow' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '0.3s' }}>
          <span className="text-gradient">Happy Birthday</span>
        </h1>

        <h2 className={`font-playfair text-5xl md:text-7xl lg:text-8xl font-bold mb-12 transition-all duration-1500 ${
          isVisible ? 'opacity-100 translate-y-0 text-glow' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '0.6s' }}>
          <span className="text-luxury-gold">Grandpa!</span>
        </h2>

        {/* Subtitle */}
        <p className={`font-montserrat text-2xl md:text-4xl lg:text-5xl text-premium-white max-w-4xl mx-auto mb-16 leading-relaxed transition-all duration-1500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '0.9s' }}>
          You are our <span className="text-luxury-gold font-semibold">guiding star</span>
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl text-luxury-gold/90">
            With love, forever and always
          </span>
        </p>

        {/* Animated Hearts Row */}
        <div className={`flex justify-center space-x-4 mb-16 transition-all duration-1500 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`} style={{ transitionDelay: '1.2s' }}>
          {[...Array(7)].map((_, i) => (
            <Heart 
              key={i}
              className="text-luxury-gold fill-current animate-heartbeat"
              size={32 + (i === 3 ? 16 : 0)} // Center heart is bigger
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Infinity Symbol with Special Message */}
        <div className={`mb-16 transition-all duration-1500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '1.5s' }}>
          <div className="relative inline-block mb-8">
            <div className="text-8xl md:text-9xl text-luxury-gold font-bold animate-pulse">∞</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white animate-sparkle" />
            </div>
          </div>
          <p className="font-playfair text-2xl md:text-3xl text-gradient">
            Your Love Lives On Forever
          </p>
        </div>

        {/* Footer Credit */}
        <div className={`transition-all duration-1500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '1.8s' }}>
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-0.5 bg-gradient-luxury"></div>
            <Heart className="w-6 h-6 text-luxury-gold fill-current mx-4" />
            <div className="w-24 h-0.5 bg-gradient-luxury"></div>
          </div>

          {/* Credit Text */}
          <p className="font-montserrat text-xl md:text-2xl text-premium-white/90 mb-2">
            Made with ❤️ by your family
          </p>
          <p className="font-montserrat text-lg text-luxury-gold/80">
            using code & creativity
          </p>
        </div>

        {/* Final Blessing */}
        <div className={`mt-20 transition-all duration-2000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`} style={{ transitionDelay: '2.5s' }}>
          <div className="card-celebration max-w-3xl mx-auto">
            <p className="font-playfair text-xl md:text-2xl text-royal-blue leading-relaxed italic">
              "May your birthday be filled with sunshine and smiles, laughter, love, and cheer. 
              For you bring joy to everyone whose life you touch throughout the year."
            </p>
            <div className="flex justify-center mt-6 space-x-2">
              {[...Array(5)].map((_, i) => (
                <Sparkles 
                  key={i}
                  className="w-6 h-6 text-luxury-gold animate-sparkle" 
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;