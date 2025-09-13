import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart } from "lucide-react";

const CelebrationSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);
  const [showFireworks, setShowFireworks] = useState(false);
  const [balloons, setBalloons] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Generate balloons
          const newBalloons = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 2
          }));
          setBalloons(newBalloons);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('celebration');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const blowCandles = () => {
    setCandlesLit(false);
    setShowFireworks(true);
    
    // Reset after 5 seconds
    setTimeout(() => {
      setCandlesLit(true);
      setShowFireworks(false);
    }, 5000);
  };

  const Candle = ({ index }: { index: number }) => (
    <div className="relative flex flex-col items-center">
      {/* Flame */}
      {candlesLit && (
        <div 
          className="w-2 h-3 bg-gradient-to-t from-orange-500 to-yellow-400 rounded-full animate-pulse"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="w-1 h-2 bg-yellow-300 rounded-full mx-auto animate-sparkle"></div>
        </div>
      )}
      
      {/* Wick */}
      <div className="w-0.5 h-2 bg-gray-800"></div>
      
      {/* Candle Body */}
      <div className={`w-3 h-12 rounded-t-sm ${
        index % 3 === 0 ? 'bg-pink-400' : 
        index % 3 === 1 ? 'bg-blue-400' : 'bg-green-400'
      } shadow-md`}></div>
    </div>
  );

  const Firework = ({ style }: { style: React.CSSProperties }) => (
    <div 
      className="absolute pointer-events-none"
      style={style}
    >
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-luxury-gold rounded-full animate-ping"
          style={{
            transform: `rotate(${i * 30}deg) translate(20px) rotate(-${i * 30}deg)`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );

  return (
    <section id="celebration" className="py-20 px-6 bg-gradient-to-br from-deep-maroon-dark via-royal-blue-dark to-luxury-gold-dark relative overflow-hidden">
      
      {/* Floating Balloons */}
      <div className="absolute inset-0 pointer-events-none">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className="absolute animate-float"
            style={{
              left: `${balloon.left}%`,
              top: '10%',
              animationDelay: `${balloon.delay}s`,
              animationDuration: '4s'
            }}
          >
            <div className={`w-8 h-10 rounded-full shadow-lg ${
              balloon.id % 4 === 0 ? 'bg-luxury-gold' :
              balloon.id % 4 === 1 ? 'bg-red-500' :
              balloon.id % 4 === 2 ? 'bg-blue-500' : 'bg-green-500'
            }`}>
              <div className="w-0.5 h-16 bg-gray-600 mx-auto mt-10"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Fireworks */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <Firework
              key={i}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 40}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-luxury-gold mb-6">
            Birthday Celebration
          </h2>
          <p className="font-montserrat text-xl md:text-2xl text-premium-white max-w-3xl mx-auto leading-relaxed">
            Make a wish, Grandpa! Your special day deserves a celebration as wonderful as you are.
          </p>
        </div>

        {/* Interactive Birthday Cake */}
        <div className={`flex justify-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`} style={{ transitionDelay: '0.5s' }}>
          
          <div className="relative group">
            
            {/* Cake Base */}
            <div className="relative">
              
              {/* Cake Layers */}
              <div className="relative">
                
                {/* Top Layer */}
                <div className="w-64 h-20 bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 rounded-t-3xl border-4 border-pink-400 shadow-luxury relative">
                  {/* Decorative Frosting */}
                  <div className="absolute -top-2 left-4 right-4 h-4 bg-white rounded-full"></div>
                  <div className="absolute top-2 left-8 right-8 flex justify-between">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-luxury-gold rounded-full"></div>
                    ))}
                  </div>
                  
                  {/* Candles */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    {[...Array(5)].map((_, i) => (
                      <Candle key={i} index={i} />
                    ))}
                  </div>
                </div>
                
                {/* Middle Layer */}
                <div className="w-72 h-24 bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300 border-4 border-blue-400 shadow-royal relative -mt-2">
                  <div className="absolute top-2 left-6 right-6 flex justify-between">
                    {[...Array(7)].map((_, i) => (
                      <Heart key={i} className="w-3 h-3 text-red-500 fill-current" />
                    ))}
                  </div>
                </div>
                
                {/* Bottom Layer */}
                <div className="w-80 h-28 bg-gradient-to-r from-green-300 via-green-200 to-green-300 rounded-b-3xl border-4 border-green-400 shadow-premium relative -mt-2">
                  <div className="absolute top-4 left-8 right-8 text-center">
                    <p className="font-playfair text-lg font-bold text-green-800">Happy Birthday Grandpa!</p>
                  </div>
                </div>
              </div>

              {/* Glowing Base Effect */}
              <div className="absolute -inset-4 bg-gradient-glow rounded-3xl opacity-50 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Interactive Button */}
        <div className={`text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '1s' }}>
          
          <Button
            onClick={blowCandles}
            disabled={!candlesLit}
            className={`btn-luxury text-xl px-12 py-6 mb-8 ${
              !candlesLit ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Sparkles className="w-6 h-6 mr-3" />
            {candlesLit ? 'Blow the Candles' : 'Candles Blown! 🎉'}
            <Sparkles className="w-6 h-6 ml-3" />
          </Button>

          {!candlesLit && (
            <div className="animate-fade-up">
              <p className="font-playfair text-3xl text-luxury-gold mb-4 animate-bounce">
                🎉 Happy Birthday, Grandpa! 🎉
              </p>
              <p className="font-montserrat text-xl text-premium-white">
                May all your wishes come true! ✨
              </p>
            </div>
          )}
        </div>

        {/* Celebration Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '1.5s' }}>
          
          {[
            { number: '∞', label: 'Love Shared', icon: '❤️' },
            { number: '100+', label: 'Memories Created', icon: '📸' },
            { number: '∞', label: 'Wisdom Given', icon: '🧠' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="card-celebration">
                <div className="text-6xl mb-4">{stat.icon}</div>
                <div className="font-playfair text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="font-montserrat text-lg text-premium-white/80">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CelebrationSection;