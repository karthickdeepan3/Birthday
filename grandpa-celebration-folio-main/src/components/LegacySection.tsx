import { useState, useEffect } from "react";
import { Quote, Lightbulb, Heart, Crown } from "lucide-react";

interface LegacyQuote {
  text: string;
  theme: string;
  icon: React.ElementType;
}

const legacyQuotes: LegacyQuote[] = [
  {
    text: "The greatest legacy one can pass on to their children and grandchildren is not money or other material things accumulated in one's life, but rather a legacy of character and faith.",
    theme: "Character & Faith",
    icon: Crown
  },
  {
    text: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it. The stories and lessons shared by grandparents become the foundation stones of wisdom for future generations.",
    theme: "Wisdom & Learning", 
    icon: Lightbulb
  },
  {
    text: "Love is the bridge between hearts and the thread that weaves families together across generations. A grandfather's love creates ripples that last forever.",
    theme: "Love & Family",
    icon: Heart
  },
  {
    text: "The measure of a man's life is not in the years he has lived, but in the positive impact he has made on others and the love he has shared unconditionally.",
    theme: "Impact & Purpose",
    icon: Quote
  }
];

const LegacySection = () => {
  const [visibleQuotes, setVisibleQuotes] = useState<Set<number>>(new Set());
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleQuotes(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const quoteElements = document.querySelectorAll('.legacy-quote');
    quoteElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Auto-rotate quotes
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % legacyQuotes.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="legacy" className="py-20 px-6 relative overflow-hidden">
      
      {/* Elegant Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-royal-blue-dark via-deep-maroon-dark to-luxury-gold-dark"></div>
      
      {/* Animated Golden Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent animate-pulse"
            style={{
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-luxury-gold mb-6">
            Timeless Legacy
          </h2>
          <p className="font-montserrat text-xl md:text-2xl text-premium-white max-w-3xl mx-auto leading-relaxed">
            Words of wisdom that capture the essence of a life beautifully lived and the profound impact of love across generations.
          </p>
        </div>

        {/* Featured Quote Display */}
        <div className="mb-20">
          <div className="relative max-w-5xl mx-auto">
            
            {/* Main Quote Card */}
            <div className="card-celebration relative overflow-hidden">
              
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-luxury-gold rounded-tl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-luxury-gold rounded-br-2xl"></div>
              
              {/* Quote Content */}
              <div className="text-center py-12 px-8">
                <div className="mb-8">
                  {legacyQuotes.map((quote, index) => {
                    const Icon = quote.icon;
                    return (
                      <div
                        key={index}
                        className={`transition-all duration-1000 ${
                          index === currentQuote 
                            ? 'opacity-100 scale-100' 
                            : 'opacity-0 scale-95 absolute inset-0'
                        }`}
                      >
                        <div className="flex justify-center mb-6">
                          <div className="p-4 bg-gradient-luxury rounded-full shadow-luxury">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        
                        <blockquote className="font-playfair text-2xl md:text-3xl lg:text-4xl font-medium text-royal-blue leading-relaxed mb-6 italic">
                          "{quote.text}"
                        </blockquote>
                        
                        <div className="font-montserrat text-lg text-deep-maroon font-semibold">
                          — {quote.theme}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quote Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-3">
              {legacyQuotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuote(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentQuote 
                      ? 'bg-luxury-gold scale-125 shadow-glow' 
                      : 'bg-luxury-gold/40 hover:bg-luxury-gold/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Personal Legacy Messages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Your Guiding Light",
              content: "Grandpa, you've been our compass through life's journey. Your steady presence and unwavering love have guided us through every storm and celebrated with us in every victory.",
              delay: 0
            },
            {
              title: "Wisdom Keeper", 
              content: "The stories you tell, the lessons you share, and the wisdom you've gained through years of experience are treasures more valuable than any material wealth.",
              delay: 0.3
            },
            {
              title: "Heart of the Family",
              content: "You are the cornerstone that holds our family together. Your love creates the foundation upon which all our relationships are built and flourish.",
              delay: 0.6
            },
            {
              title: "Living Legacy",
              content: "Every act of kindness, every moment of patience, and every expression of love you've shown continues to inspire us to be better people every day.",
              delay: 0.9
            }
          ].map((item, index) => (
            <div
              key={index}
              data-index={index}
              className={`legacy-quote transition-all duration-1000 ease-out ${
                visibleQuotes.has(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${item.delay}s` }}
            >
              <div className="card-celebration group h-full">
                <div className="text-center">
                  
                  {/* Decorative Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-luxury rounded-full mb-6 shadow-luxury group-hover:shadow-glow transition-shadow duration-300">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gradient mb-4">
                    {item.title}
                  </h3>
                  
                  {/* Content */}
                  <p className="font-montserrat text-lg text-foreground leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Infinity Symbol with Hearts */}
        <div className={`text-center mt-20 transition-all duration-1000 ${
          visibleQuotes.size > 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '2s' }}>
          <div className="relative inline-block">
            <div className="text-8xl md:text-9xl text-luxury-gold font-bold opacity-20">∞</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-12 h-12 text-luxury-gold fill-current animate-heartbeat" />
            </div>
          </div>
          <p className="font-playfair text-2xl md:text-3xl text-gradient mt-6">
            Your Love is Infinite
          </p>
        </div>
      </div>
    </section>
  );
};

export default LegacySection;