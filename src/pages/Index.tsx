import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Star, Sparkles, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      if (latest > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
    return () => unsubscribe();
  }, [scrollY]);

  const prizes = [
    {
      icon: <Trophy className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />,
      title: "6 Months Premium",
      description: "Free premium access to the final product"
    },
    {
      icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />,
      title: "Exclusive Beta",
      description: "Private beta testing before launch"
    },
    {
      icon: <Star className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />,
      title: "Founder Call",
      description: "20-minute one-on-one with Tensorboy"
    },
    {
      icon: <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />,
      title: "Social Recognition",
      description: "Instagram shoutout + attribution"
    }
  ];

  return (
    <div>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'py-4 bg-black/10 backdrop-blur-lg' : 'py-4 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-coolvetica text-[#eb5713] tracking-wider">
            Tensor Space
          </h1>
          <Button
            onClick={() => navigate("/email")}
            className="font-coolvetica font-medium text-[#eb5713] py-2 px-5 rounded-none text-xs sm:text-sm border border-[#eb5713] hover:bg-white hover:text-black transition-colors duration-300 bg-transparent"
          >
            ENTER CONTEST
          </Button>
        </div>
      </motion.header>
      <div 
        className="relative min-h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: `url(/bg1.png)` }}
      >
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 h-full flex flex-col items-center justify-center text-center">
          {/* Hero */}
          <motion.h1
            className="text-6xl md:text-5xl lg:text-8xl font-coolvetica text-white max-w-5xl mt-[220px] lg:mt-[130px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <span className="text-5xl lg:text-5xl font-theseasons italic">Launching</span> Tensor Space,
          </motion.h1>
          <motion.h1
            className="text-3xl md:text-lg lg:text-5xl font-theseasons text-white max-w-5xl mt-[40px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          >
            The coziest workstation on the planet.
          </motion.h1>
          <motion.h1
            className="text-4xl md:text-lg lg:text-6xl font-theseasons text-white max-w-5xl lg:mt-[90px] mt-[40px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          >
            But we need help
          </motion.h1>
          <motion.h1
            className="text-3xl md:text-lg lg:text-5xl font-coolvetica text-white lg:w-[700px] w-[350px] mt-[20px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
          >
            Help us to name this thing, and win exciting prizes.
          </motion.h1>
        </div>
      </div>
      
      <div 
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: `url(/bg1.png)` }}
      >
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
          {/* Info Section */}
          <div className="text-center mb-12 sm:mb-20">
            <div className="mb-6 sm:mb-8">
              <div className="text-xs sm:text-sm text-orange-400 font-mono tracking-wider mb-4 sm:mb-6 uppercase">
                TENSOR PROTOCOL 2.0
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tensor-text leading-tight mb-6 sm:mb-8 px-2">
                What would you name<br />
                <span className="text-orange-400">the coziest workstation</span><br />
                on the internet?
              </h1>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl tensor-muted max-w-4xl mx-auto mb-8 sm:mb-12 font-mono leading-relaxed px-4">
              Weekly AI breakthroughs, hackathons, and internships<br className="hidden sm:block" />
              delivered to your brain in just 5 minutes.
            </p>

            <div className="flex flex-col items-center mb-8 sm:mb-12">
              <Button
                onClick={() => navigate("/email")}
                className="tensor-button text-black font-mono font-medium py-4 sm:py-6 px-8 sm:px-12 rounded-none text-base sm:text-lg transition-all duration-300 transform hover:scale-105 mb-4 sm:mb-6 w-full sm:w-auto max-w-xs sm:max-w-none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                GET YOUR DROP
                <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ml-3 ${isHovered ? 'translate-x-1' : ''} transition-transform`} />
              </Button>
            </div>

            <p className="text-sm tensor-muted font-mono px-4">
              Let's see if your choice is worthy enough 🔥
            </p>
          </div>

          {/* Prizes Section */}
          <div className="mb-12 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-light text-center mb-8 sm:mb-12 tensor-text font-mono">
              Top 3 Winners Get
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {prizes.map((prize, index) => (
                <Card key={index} className="tensor-card hover:border-orange-400/50 transition-all duration-300 group">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="mb-4 sm:mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      {prize.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-medium tensor-text mb-2 sm:mb-3 font-mono">
                      {prize.title}
                    </h3>
                    <p className="tensor-muted text-sm font-mono leading-relaxed">
                      {prize.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-12 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-light text-center mb-8 sm:mb-12 tensor-text font-mono">
              How It Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
              {[
                { num: "1", title: "Submit Your Name", desc: "Share 1-2 creative names for our browser workspace extension" },
                { num: "2", title: "Get Your Poster", desc: "Receive a personalized poster with QR code to share on social media" },
                { num: "3", title: "Vote & Win", desc: "Vote for your favorites and compete for amazing prizes" }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-orange-400 rounded-none flex items-center justify-center mx-auto mb-4 sm:mb-6 tensor-text font-mono text-xl sm:text-2xl font-bold">
                    {step.num}
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium tensor-text mb-3 sm:mb-4 font-mono">{step.title}</h3>
                  <p className="tensor-muted font-mono leading-relaxed text-sm sm:text-base px-2">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;