import { useState, useEffect } from "react";
import { Code, Heart, Terminal } from "lucide-react";

const CodeTributeSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedCode, setTypedCode] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const codeLines = [
    "// A special tribute written in code",
    "function celebrateGrandpa() {",
    "  const love = Infinity;",
    "  const wisdom = 'immeasurable';",
    "  const kindness = true;",
    "",
    "  console.log('Happy Birthday Grandpa! ❤️');",
    "  console.log(`Love level: ${love}`);",
    "  console.log(`Wisdom status: ${wisdom}`);",
    "  console.log(`Kind heart: ${kindness}`);",
    "",
    "  return {",
    "    message: 'You are our hero',",
    "    gratitude: 'endless',",
    "    wishes: 'may all your dreams come true'",
    "  };",
    "}",
    "",
    "// Execute the celebration",
    "celebrateGrandpa();",
    "",
    "/* Made with ❤️ by your tech-savvy family */",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('code-tribute');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const typeCode = async () => {
      for (let lineIndex = 0; lineIndex < codeLines.length; lineIndex++) {
        setCurrentLineIndex(lineIndex);
        const line = codeLines[lineIndex];
        
        for (let charIndex = 0; charIndex <= line.length; charIndex++) {
          await new Promise(resolve => setTimeout(resolve, 30));
          
          setTypedCode(prev => {
            const lines = prev.split('\n');
            lines[lineIndex] = line.substring(0, charIndex);
            return lines.slice(0, lineIndex + 1).join('\n');
          });
        }
        
        // Add a small pause after each line
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    };

    // Start typing after a delay
    const timer = setTimeout(typeCode, 1000);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <section id="code-tribute" className="py-20 px-6 bg-gray-900 relative overflow-hidden">
      {/* Matrix-style background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-luxury-gold/30 font-mono text-xs animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-center justify-center mb-6">
            <Terminal className="w-12 h-12 text-luxury-gold mr-4" />
            <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-luxury-gold">
              Code Tribute
            </h2>
            <Code className="w-12 h-12 text-luxury-gold ml-4" />
          </div>
          <p className="font-montserrat text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A heartfelt message written in the language of technology, combining our love for you with our passion for code.
          </p>
        </div>

        {/* Code Terminal */}
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`} style={{ transitionDelay: '0.3s' }}>
          
          {/* Terminal Window */}
          <div className="bg-gray-800 rounded-2xl shadow-premium overflow-hidden border border-luxury-gold/30">
            
            {/* Terminal Header */}
            <div className="bg-gray-700 px-6 py-4 flex items-center justify-between border-b border-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="font-mono text-gray-300 text-sm">grandpa-birthday-tribute.js</span>
              </div>
              <Heart className="w-5 h-5 text-luxury-gold fill-current animate-heartbeat" />
            </div>

            {/* Terminal Content */}
            <div className="p-6 bg-gray-900 min-h-[400px] font-mono text-sm">
              <pre className="text-gray-300 leading-relaxed">
                <code>
                  {typedCode.split('\n').map((line, index) => (
                    <div key={index} className={`${
                      index === currentLineIndex ? 'relative' : ''
                    }`}>
                      <span className={`${
                        line.includes('//') || line.includes('/*') ? 'text-gray-500' : 
                        line.includes('function') || line.includes('const') || line.includes('return') ? 'text-blue-400' :
                        line.includes("'") || line.includes('"') || line.includes('`') ? 'text-green-400' :
                        line.includes('console.log') ? 'text-yellow-400' :
                        line.includes('❤️') || line.includes('Infinity') ? 'text-pink-400' :
                        'text-gray-300'
                      }`}>
                        {line}
                      </span>
                      {index === currentLineIndex && isVisible && (
                        <span className="animate-pulse text-luxury-gold">|</span>
                      )}
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Output Console */}
        <div className={`mt-8 transition-all duration-1000 ${
          isVisible && typedCode.includes('celebrateGrandpa();') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '2s' }}>
          
          <div className="bg-black rounded-xl p-6 border border-luxury-gold/50 shadow-glow">
            <div className="flex items-center mb-4">
              <Terminal className="w-5 h-5 text-luxury-gold mr-2" />
              <span className="font-mono text-luxury-gold text-sm">Console Output</span>
            </div>
            
            <div className="font-mono text-green-400 space-y-2">
              <div className="animate-fade-up">▶ Happy Birthday Grandpa! ❤️</div>
              <div className="animate-fade-up" style={{ animationDelay: '0.5s' }}>▶ Love level: Infinity</div>
              <div className="animate-fade-up" style={{ animationDelay: '1s' }}>▶ Wisdom status: immeasurable</div>
              <div className="animate-fade-up" style={{ animationDelay: '1.5s' }}>▶ Kind heart: true</div>
              <div className="animate-fade-up text-luxury-gold" style={{ animationDelay: '2s' }}>
                ▶ {`{ message: 'You are our hero', gratitude: 'endless', wishes: 'may all your dreams come true' }`}
              </div>
            </div>
          </div>
        </div>

        {/* Tech Love Message */}
        <div className={`text-center mt-12 transition-all duration-1000 ${
          isVisible && typedCode.includes('Made with') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '3s' }}>
          <p className="font-montserrat text-xl text-gray-300 mb-4">
            Even in the digital world, our love for you compiles perfectly! 💻❤️
          </p>
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <Heart 
                key={i}
                className="w-6 h-6 text-luxury-gold fill-current animate-heartbeat" 
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeTributeSection;