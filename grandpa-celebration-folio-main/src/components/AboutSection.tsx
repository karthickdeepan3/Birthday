import { useState, useEffect, useRef } from "react";
import { Heart, BookOpen, Users, Award, Home } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
  delay: number;
}

const timelineData: TimelineItem[] = [
  {
    year: "Early Years",
    title: "A Life of Purpose Begins",
    description: "Born with a heart full of dreams and determination, laying the foundation for a remarkable journey ahead.",
    icon: Home,
    delay: 0
  },
  {
    year: "Career Excellence", 
    title: "Professional Achievement",
    description: "Building a successful career with dedication, integrity, and the leadership that would inspire generations.",
    icon: Award,
    delay: 0.2
  },
  {
    year: "Family Foundation",
    title: "Creating Our Beautiful Family", 
    description: "The cornerstone of love - creating a family filled with warmth, wisdom, and unconditional support.",
    icon: Heart,
    delay: 0.4
  },
  {
    year: "Wisdom Keeper",
    title: "Sharing Life's Lessons",
    description: "Becoming the guiding light for all of us, sharing stories, wisdom, and life lessons that shape our values.",
    icon: BookOpen,
    delay: 0.6
  },
  {
    year: "Legacy Builder",
    title: "Inspiring Generations", 
    description: "Creating a legacy of love, kindness, and strength that continues to inspire everyone around you.",
    icon: Users,
    delay: 0.8
  }
];

const AboutSection = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6 bg-gradient-celebration relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 border border-luxury-gold rounded-full animate-pulse"
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
            A Life Well Lived
          </h2>
          <p className="font-montserrat text-xl md:text-2xl text-royal-blue max-w-3xl mx-auto leading-relaxed">
            Celebrating the extraordinary journey of a remarkable man who has touched countless lives with love and wisdom.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-luxury rounded-full hidden md:block"></div>

          <div className="space-y-16">
            {timelineData.map((item, index) => {
              const Icon = item.icon;
              const isVisible = visibleItems.has(index);
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  data-index={index}
                  className={`timeline-item flex items-center justify-center md:justify-${isLeft ? 'start' : 'end'} relative`}
                >
                  {/* Desktop Layout */}
                  <div className="hidden md:block w-full">
                    <div className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                      {/* Content Card */}
                      <div className={`w-5/12 transition-all duration-1000 ease-out ${
                        isVisible 
                          ? `opacity-100 ${isLeft ? 'translate-x-0' : 'translate-x-0'}` 
                          : `opacity-0 ${isLeft ? '-translate-x-20' : 'translate-x-20'}`
                      }`} style={{ transitionDelay: `${item.delay}s` }}>
                        <div className="card-celebration">
                          <div className="flex items-center mb-4">
                            <div className="p-3 bg-gradient-luxury rounded-full mr-4">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-montserrat font-bold text-luxury-gold text-lg">
                              {item.year}
                            </span>
                          </div>
                          <h3 className="font-playfair text-2xl font-semibold text-royal-blue mb-3">
                            {item.title}
                          </h3>
                          <p className="font-montserrat text-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Timeline Node */}
                      <div className="w-2/12 flex justify-center">
                        <div className={`w-6 h-6 bg-luxury-gold rounded-full border-4 border-white shadow-glow transition-all duration-1000 ${
                          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                        }`} style={{ transitionDelay: `${item.delay + 0.3}s` }}>
                        </div>
                      </div>

                      <div className="w-5/12"></div>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="block md:hidden w-full">
                    <div className={`transition-all duration-1000 ease-out ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`} style={{ transitionDelay: `${item.delay}s` }}>
                      <div className="card-celebration">
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-gradient-luxury rounded-full mr-4">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="font-montserrat font-bold text-luxury-gold text-lg">
                            {item.year}
                          </span>
                        </div>
                        <h3 className="font-playfair text-2xl font-semibold text-royal-blue mb-3">
                          {item.title}
                        </h3>
                        <p className="font-montserrat text-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;