import { useState, useEffect } from "react";
import { Heart, Quote } from "lucide-react";

interface Message {
  text: string;
  author: string;
  relationship: string;
  delay: number;
}

const familyMessages: Message[] = [
  {
    text: "Grandpa, you are the foundation of our family. Your wisdom guides us, your love nurtures us, and your strength inspires us every single day. Thank you for being our guiding star.",
    author: "Your Loving Family",
    relationship: "With Endless Love",
    delay: 0
  },
  {
    text: "Every story you tell, every lesson you share, and every moment of laughter we have together creates memories that we treasure forever. You are truly a blessing in our lives.",
    author: "Your Grandchildren", 
    relationship: "Forever Grateful",
    delay: 0.3
  },
  {
    text: "Your kindness has touched every life you've encountered. Your legacy of love, compassion, and integrity continues to inspire not just our family, but everyone who knows you.",
    author: "Everyone Who Loves You",
    relationship: "In Admiration",
    delay: 0.6
  },
  {
    text: "On this special day, we celebrate not just your birthday, but the incredible person you are. May this new year bring you as much joy as you've brought to all of us.",
    author: "From All of Us",
    relationship: "Happy Birthday",
    delay: 0.9
  }
];

const MessagesSection = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const messageCards = document.querySelectorAll('.message-card');
    messageCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="messages" className="py-20 px-6 relative overflow-hidden">
      {/* Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-soft-cream via-premium-white to-luxury-gold/10"></div>
      
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-luxury-gold/20 animate-float"
            size={24 + Math.random() * 16}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-gradient mb-6">
            Messages of Love
          </h2>
          <p className="font-montserrat text-xl md:text-2xl text-royal-blue max-w-3xl mx-auto leading-relaxed">
            Heartfelt words from those whose lives you've touched with your boundless love and wisdom.
          </p>
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {familyMessages.map((message, index) => {
            const isVisible = visibleCards.has(index);
            
            return (
              <div
                key={index}
                data-index={index}
                className={`message-card transition-all duration-1000 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 rotate-0' 
                    : 'opacity-0 translate-y-16 rotate-1'
                }`}
                style={{ 
                  transitionDelay: `${message.delay}s`
                }}
              >
                {/* Message Card */}
                <div className="card-celebration group relative">
                  {/* Decorative Quote Icon */}
                  <div className="absolute -top-4 -left-4">
                    <div className="w-12 h-12 bg-gradient-luxury rounded-full flex items-center justify-center shadow-luxury">
                      <Quote className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="pt-6">
                    <blockquote className="font-montserrat text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                      "{message.text}"
                    </blockquote>

                    {/* Author Information */}
                    <div className="border-t border-luxury-gold/20 pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-playfair text-xl font-semibold text-royal-blue mb-1">
                            {message.author}
                          </p>
                          <p className="font-montserrat text-deep-maroon font-medium">
                            {message.relationship}
                          </p>
                        </div>
                        
                        {/* Animated Heart */}
                        <div className="flex space-x-1">
                          <Heart className="w-6 h-6 text-luxury-gold fill-current animate-heartbeat" />
                          <Heart 
                            className="w-4 h-4 text-deep-maroon fill-current animate-heartbeat" 
                            style={{ animationDelay: '0.3s' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-luxury opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Special Birthday Message */}
        <div className={`mt-20 text-center transition-all duration-1000 ${
          visibleCards.size > 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '1.5s' }}>
          <div className="card-celebration max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="font-playfair text-3xl md:text-4xl font-bold text-gradient mb-6">
                A Special Birthday Wish
              </h3>
              <p className="font-montserrat text-xl md:text-2xl text-royal-blue leading-relaxed mb-6">
                May this birthday be filled with all the joy, laughter, and love that you've given to us throughout the years. 
                You deserve all the happiness in the world, Grandpa.
              </p>
              <div className="flex justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Heart 
                    key={i}
                    className="w-8 h-8 text-luxury-gold fill-current animate-heartbeat" 
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesSection;