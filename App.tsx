import React, { useEffect, useState, useRef } from 'react';
import { GoldParticles, CircuitPattern, WavePattern } from './components/VisualElements';
import { IdentitySection } from './components/IdentitySection';
import { SocialContact } from './components/SocialContact';
import { IdentityType } from './types';
import { Globe, Music, Code } from 'lucide-react';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const heroRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (philosophyRef.current) {
        const rect = philosophyRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setSpotlightPos({ x, y });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const timer = setTimeout(() => {
      heroRef.current?.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }, 100);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const quote = "Silence is the ultimate luxury.";

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-gold/30 selection:text-gold">
      <GoldParticles />
      <SocialContact />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-1000 px-8 py-6 flex justify-center items-center ${scrolled ? 'bg-black/85 backdrop-blur-xl py-4 border-b border-gold/10' : ''}`}>
        <div className="flex space-x-12 reveal">
          {['Developer', 'Singer', 'Explorer'].map((item, i) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => scrollToSection(e, item.toLowerCase())}
              className={`relative text-[10px] uppercase font-luxury tracking-[0.3em] text-gray-400 hover:text-gold transition-colors group cursor-pointer reveal delay-${(i+1)*100}`}
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#000] hero-zoom">
            <CircuitPattern />
        </div>
        
        <div className="container mx-auto px-8 relative z-10 text-center space-y-10 pt-32">
          <div className="space-y-4">
            <h1 className="reveal text-5xl md:text-[9rem] font-luxury tracking-tighter leading-none text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-1000 luxury-glow">
              <span className="reveal-mask block">ATAUR</span>
              <span className="text-gold reveal-mask block delay-300">RAHMAN SANI</span>
            </h1>
            <div className="reveal overflow-hidden delay-500">
              <p className="text-gold/80 text-[9px] md:text-[11px] font-luxury tracking-[0.4em] uppercase opacity-0 animate-signature-reveal">
                A Signature Experience by Ataur Rahman Sani
              </p>
            </div>
          </div>

          <p className="reveal max-w-2xl mx-auto text-gray-400 text-lg font-light tracking-widest leading-loose px-4 delay-700">
            <span className="reveal block">“I don’t follow trends. I define standards.”</span>
            <span className="font-serif-elegant italic text-gold/80 block mt-4 opacity-0 animate-in fade-in slide-in-from-top-4 duration-1000 fill-mode-forwards" style={{ animationDelay: '1.6s' }}>
              The architect of a triple-identity lifestyle.
            </span>
          </p>

          <div className="reveal flex justify-center space-x-16 opacity-30 mt-12 delay-1000">
             <Code className="w-6 h-6 hover:text-gold transition-all transform hover:scale-125 cursor-pointer reveal delay-100" />
             <Music className="w-6 h-6 hover:text-gold transition-all transform hover:scale-125 cursor-pointer reveal delay-200" />
             <Globe className="w-6 h-6 hover:text-gold transition-all transform hover:scale-125 cursor-pointer reveal delay-300" />
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 opacity-40 reveal delay-1000">
           <span className="text-[8px] font-luxury tracking-[0.5em] uppercase reveal">Enter the legacy</span>
           <div className="group cursor-pointer">
             <div className="h-16 w-[1px] bg-gradient-to-b from-gold to-transparent relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gold animate-scroll-line"></div>
             </div>
           </div>
        </div>
      </section>

      {/* Identity Showcases */}
      <section id="developer">
        <IdentitySection type={IdentityType.DEVELOPER} />
      </section>
      
      <section id="singer">
        <IdentitySection type={IdentityType.SINGER} reversed />
      </section>
      
      <section id="explorer">
        <IdentitySection type={IdentityType.EXPLORER} />
      </section>

      {/* Philosophy Banner with Enhanced Animation */}
      <section 
        ref={philosophyRef} 
        className="bg-[#050505] py-72 border-y border-gold/10 relative overflow-hidden group"
        style={{
          background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(197, 160, 89, 0.08) 0%, transparent 40%)`
        }}
      >
        <div className="container mx-auto px-8 text-center relative z-10">
          <div className="reveal space-y-16">
            <h3 className="font-serif-elegant italic text-4xl md:text-8xl transition-all duration-1000 hover:text-white cursor-default select-none reveal">
              {quote.split(' ').map((word, i) => (
                <span 
                  key={i} 
                  className={`reveal-word luxury-shimmer-text`}
                  style={{ transitionDelay: `${i * 300}ms` }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </h3>
            
            <div className="flex flex-col items-center space-y-12">
              <div className="relative w-40 h-[1px]">
                 <div className="absolute inset-0 bg-gold opacity-10"></div>
                 <div className="absolute inset-0 bg-gold w-0 transition-all duration-[3s] delay-700 reveal-line group-hover:shadow-[0_0_15px_#C5A059]"></div>
              </div>
              <div className="space-y-4 reveal delay-[1.5s]">
                <p className="text-[10px] font-luxury tracking-[1.2em] text-gold/40 uppercase reveal-sub reveal">The Sani Doctrine</p>
                <div className="flex justify-center space-x-1 opacity-20 reveal delay-[2s]">
                   {[...Array(3)].map((_, i) => (
                     <div key={i} className="w-1 h-1 bg-gold rounded-full"></div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-24 relative overflow-hidden">
        <WavePattern />
        <div className="container mx-auto px-8 md:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-gold/10 pt-16">
            <div className="space-y-6 reveal">
              <h5 className="font-luxury text-gold tracking-widest text-xs uppercase reveal delay-100">The Sani Legacy</h5>
              <p className="text-gray-500 font-light text-sm leading-relaxed max-w-xs reveal delay-200">
                Dedicated to the pursuit of excellence in technology, artistry, and discovery. A lifestyle of intentionality and silent power.
              </p>
            </div>
            <div className="space-y-6 reveal">
              <h5 className="font-luxury text-gold tracking-widest text-xs uppercase reveal delay-100">Inquiries</h5>
              <ul className="space-y-4 text-sm text-gray-400 font-light tracking-widest reveal delay-200">
                <li className="reveal delay-100"><a href="#" className="hover:text-gold transition-all hover:pl-2">Strategic Alliances</a></li>
                <li className="reveal delay-200"><a href="#" className="hover:text-gold transition-all hover:pl-2">Vocal Artistry & Collaborations</a></li>
                <li className="reveal delay-300"><a href="#" className="hover:text-gold transition-all hover:pl-2">Private Expeditions & Cultural Journeys</a></li>
              </ul>
            </div>
            <div className="space-y-6 flex flex-col items-end reveal">
              <div className="text-right reveal delay-100">
                <p className="text-[10px] font-luxury tracking-[0.4em] text-gold uppercase mb-2 reveal">Global HQ</p>
                <p className="text-gray-500 font-light text-sm reveal delay-100">Zurich &middot; Singapore &middot; Dhaka</p>
              </div>
              <div className="mt-8 flex space-x-8 reveal delay-200">
                {['LinkedIn', 'Instagram', 'Spotify'].map((social, i) => (
                  <a key={social} href="#" className={`group relative text-[10px] font-luxury tracking-[0.2em] text-gray-600 hover:text-gold transition-colors uppercase reveal delay-${(i+1)*100}`}>
                    {social}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-500"></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-24 text-center flex flex-col items-center space-y-6 reveal">
            <p className="text-[10px] font-luxury tracking-[0.6em] uppercase text-gold/80 reveal delay-100">
              A Signature Experience by Ataur Rahman Sani
            </p>
            <p className="text-[10px] font-luxury tracking-[1em] uppercase text-gray-500 reveal delay-200">
              &copy; 2026 — ARS
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-scroll-line {
          animation: scroll-line 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes signature-reveal {
          0% { opacity: 0; transform: translateY(15px); letter-spacing: 0.2em; filter: blur(10px); }
          100% { opacity: 0.7; transform: translateY(0); letter-spacing: 0.4em; filter: blur(0); }
        }
        .active .animate-signature-reveal {
          animation: signature-reveal 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;