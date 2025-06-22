import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Star, Sparkles, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // HERO SECTION HEADINGS
  const hero1Ref = useRef(null);
  const hero2Ref = useRef(null);
  const hero3Ref = useRef(null);
  const hero4Ref = useRef(null);
  const hero1InView = useInView(hero1Ref, { amount: 0.5 });
  const hero2InView = useInView(hero2Ref, { amount: 0.5 });
  const hero3InView = useInView(hero3Ref, { amount: 0.5 });
  const hero4InView = useInView(hero4Ref, { amount: 0.5 });

  // HEADINGS for other sections
  const demoRef = useRef(null);
  const suggestRef = useRef(null);
  const winnersRef = useRef(null);
  const demoInView = useInView(demoRef, { amount: 0.5 });
  const suggestInView = useInView(suggestRef, { amount: 0.5 });
  const winnersInView = useInView(winnersRef, { amount: 0.5 });

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

  // Intersection Observer to play/pause video on view
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
          setVideoPlaying(true);
        } else {
          videoRef.current?.pause();
          setVideoPlaying(false);
        }
      },
      { threshold: 0.5 }
    );
    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }
    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, []);

  const prizes = [
    {
      title: "6 Months Premium",
      description: "Free premium access to the final product"
    },
    {
      title: "Free Ted Talk",
      description: "20 minute video call with Tensorboy"
    },
    {
      title: "Social Recognition",
      description: "Instagram shoutout from Tensorboy"
    }
  ];

  return (
    <div>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'py-4 bg-white/10 backdrop-blur-lg' : 'py-4 bg-transparent'
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
            ref={hero1Ref}
            className="text-6xl md:text-7xl lg:text-8xl font-coolvetica text-white max-w-5xl mt-[220px] lg:mt-[130px]"
            initial={{ opacity: 0, y: 50 }}
            animate={hero1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <span className="text-5xl lg:text-5xl font-theseasons italic">Launching</span> Tensor Space,
          </motion.h1>
          <motion.h1
            ref={hero2Ref}
            className="text-3xl md:text-lg lg:text-5xl font-theseasons text-white max-w-5xl mt-[40px]"
            initial={{ opacity: 0, y: 50 }}
            animate={hero2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          >
            The coziest workstation on the planet.
          </motion.h1>
          <motion.h1
            ref={hero3Ref}
            className="text-4xl md:text-lg lg:text-6xl font-theseasons text-white max-w-5xl lg:mt-[90px] mt-[40px]"
            initial={{ opacity: 0, y: 50 }}
            animate={hero3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          >
            But we need help
          </motion.h1>
          <motion.h1
            ref={hero4Ref}
            className="text-3xl md:text-lg lg:text-5xl font-coolvetica text-white lg:w-[700px] w-[350px] mt-[20px]"
            initial={{ opacity: 0, y: 50 }}
            animate={hero4InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
          >
            Help us to name this thing, and win exciting prizes.
          </motion.h1>
        </div>
      </div>
      
      <div 
        className="relative w-full bg-cover bg-center"
        style={{ backgroundColor : "white" }}
      >
        {/* Left and right subtle orange gradients (more visible) */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-[500px] bg-gradient-to-r from-[#fba41b]/60 to-transparent z-0" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-[500px] bg-gradient-to-l from-[#fba41b]/60 to-transparent z-0" />
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent text-center" />
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 flex flex-col text-center items-center relative z-10">
          {/* Video Section */}
          <motion.h1
            ref={demoRef}
            className="text-3xl md:text-lg lg:text-5xl font-coolvetica text-black lg:w-[700px] w-[350px] mt-[200px]"
            initial={{ opacity: 0, y: 50 }}
            animate={demoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            Enjoy the Demo
          </motion.h1>
          <div className="flex justify-center items-center mb-16 mt-9">
            <div ref={videoContainerRef} className="relative backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl p-1 sm:p-[7px] max-w-3xl w-full flex justify-center items-center">
              <video
                ref={videoRef}
                src="/website-intro.mp4"
                loop
                controls
                playsInline
                className="rounded-2xl w-full h-auto shadow-lg border border-white/30 outline-none"
                style={{ boxShadow: '0 8px 32px 0 rgba(235,87,19,0.15), 0 1.5px 0 0 #fff' }}
              />
            </div>
          </div>
        </div>
        {/* <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-white pointer-events-none" /> */}
      </div>

      {/* Third Section: Naming Contest */}
      <div className="relative w-full bg-cover bg-center min-h-[60vh] flex flex-col justify-center items-center" style={{ backgroundColor : "white" }}>
        {/* Left and right subtle orange gradients (more visible) */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-[500px] bg-gradient-to-r from-[#fba41b]/60 to-transparent z-0" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-[500px] bg-gradient-to-l from-[#fba41b]/60 to-transparent z-0" />
        {/* Gradient transition from previous section */}
        {/* <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent pointer-events-none" /> */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full py-24 flex flex-row items-center text-center">
          <motion.h1
            ref={suggestRef}
            className="text-3xl md:text-lg lg:text-5xl font-coolvetica text-black lg:w-[700px] w-[350px] mt-[200px]"
            initial={{ opacity: 0, y: 50 }}
            animate={suggestInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            Suggest a name for this, and win exciting prizes.
          </motion.h1>
          <motion.h1
            ref={winnersRef}
            className="text-2xl md:text-lg lg:text-3xl font-theseasons text-black lg:w-[700px] w-[350px] mt-[40px]"
            initial={{ opacity: 0, y: 50 }}
            animate={winnersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            Only <span className="font-coolvetica">3 lucky winners</span> will receive these prizes
          </motion.h1>
          <div className="flex flex-wrap justify-center gap-6 mt-12 w-full max-w-4xl">
            {prizes.map((prize, idx) => (
              <div
                key={prize.title}
                className="bg-white/90 border border-[#F24C00]/30 rounded-2xl shadow-lg p-6 flex flex-col items-center w-64 min-h-[180px] transition-transform hover:scale-105 hover:shadow-xl duration-200"
                style={{ backdropFilter: 'blur(2px)' }}
              >
                <div className="text-4xl mb-3">{["🏆","👥","⭐","✨"][idx]}</div>
                <div className="font-coolvetica text-lg text-[#F24C00] mb-1 text-center">{prize.title}</div>
                <div className="text-gray-700 text-sm text-center font-theseasons">{prize.description}</div>
              </div>
            ))}
          </div>
          {/* Concentric Orange Button */}
          <div className="relative flex justify-center items-center mt-20 mb-8">
            {/* Concentric borders */}
            <div className="absolute inset-0 flex justify-center items-center z-0">
              <div className="rounded-full w-[400px] h-[120px] bg-gradient-to-b from-[#fba41b]/70 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
              <div className="rounded-full w-[350px] h-[100px] bg-gradient-to-b from-[#fba41b]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
              <div className="rounded-full w-[300px] h-[80px] bg-gradient-to-b from-[#f24c00]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
            </div>
            {/* Main button */}
            <button className="relative z-10 px-10 py-5 rounded-full bg-gradient-to-b from-[#fba41b] to-[#fff3e0] shadow-xl text-black font-coolvetica text-lg flex items-center gap-4 border-2 border-[#fba41b]/60 hover:scale-105 transition-transform duration-200">
              ENTER CONTEST
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 12H6.75m7.5-6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;