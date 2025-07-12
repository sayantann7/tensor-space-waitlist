import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import { ArrowUpRight, Rocket, Trophy, Users, Star, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Section refs for animation
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
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: "linear-gradient(180deg, #FFB347 0%, #FF8008 60%, #FFF 100%)" }}>


      {/* Hero Section */}
      <main
        className="relative z-20 flex flex-col items-center text-center min-h-[110vh] w-full pt-[170px] sm:pt-12"
        style={{
          backgroundImage: 'url(/bg1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Header inside Hero */}
        <header className="w-full flex justify-between items-center px-4 sm:px-8 md:px-8 pt-0 absolute top-0 left-0 z-30">
          <div className="text-white text-xl sm:text-xl md:text-2xl font-coolvetica py-4 sm:py-6"><h1 className="pt-1">Tensor Space</h1></div>
          <button
            onClick={() => navigate('/name')}
            className="flex items-center bg-white text-black font-coolvetica text-base sm:text-lg px-4 sm:px-7 py-2 sm:py-3 rounded-full shadow-lg gap-1 sm:gap-3 pr-2 sm:pr-3 hover:scale-105 transition-transform border border-white/30 mt-2 sm:mt-4"
          >
            Enter Contest
            <span className="ml-2 flex items-center justify-center w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-black text-white">
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </button>
        </header>
        {/* White gradient at bottom for smooth transition */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 sm:h-40 z-30" style={{ background: 'linear-gradient(0deg, #fff 0%, transparent 100%)' }} />
        {/* Launching badge */}
        <div className="inline-flex items-center gap-2 bg-white text-black font-coolvetica text-xl sm:text-base px-4 sm:px-6 py-1.5 sm:py-2 rounded-full shadow mb-6 sm:mb-8 mt-12 sm:mt-24">
          <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-[#eb5713]" /> Launching
        </div>
        {/* Main Title */}
        <h1 className="text-white font-coolvetica text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-normal mb-2">Tensor Space</h1>
        {/* Subtitle */}
        <div className="italic text-white text-xl sm:text-2xl md:text-3xl font-theseasons mb-4 sm:mb-6">The coziest workstation on the planet.</div>
        {/* Divider */}
        <div className="w-3/4 sm:w-1/2 max-w-md h-px bg-white/40 mx-auto mb-6 sm:mb-8" />
        {/* Help Text */}
        <div className="text-white text-xl sm:text-2xl md:text-3xl font-coolvetica mb-2">But we need help.</div>
        <div className="text-white text-xl w-[250px] sm:text-lg md:text-xl font-theseasons mb-8 sm:mb-10">Help us to name this thing, and win exciting prizes.</div>
        {/* Enter Contest Button */}
        <button
          onClick={() => navigate('/name')}
          className="flex items-center bg-black text-white font-coolvetica text-xl sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-xl gap-2 sm:gap-3 pr-2 sm:pr-3 hover:scale-105 transition-transform border-2 border-white/80"
        >
          Enter Contest
          <span className="ml-2 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-black border border-black">
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </span>
        </button>
      </main>

      {/* Restored: Video/Demo Section */}
      <div
        className="relative w-full bg-cover bg-center"
        style={{ backgroundColor: "white" }}
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
      </div>

      {/* Restyled: Naming Contest & Prizes Section */}
      <div className="relative w-full min-h-[60vh] flex flex-col justify-center items-center py-20 pt-[200px] bg-cover bg-center" style={{ backgroundColor: 'white' }}>
        <div className="pointer-events-none absolute top-0 left-0 h-full w-[500px] bg-gradient-to-r from-[#fba41b]/60 to-transparent z-0" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-[500px] bg-gradient-to-l from-[#fba41b]/60 to-transparent z-0" />
        <div className="flex flex-row flex-wrap justify-center items-end mb-12 -mx-4">
          {/* Card 1 */}
          <div className="bg-white text-black rounded-[2.5rem] shadow-xl px-8 py-16 w-64 sm:w-72 flex flex-col items-center transform -rotate-6 hover:rotate-0 transition-transform duration-300 z-10 -mr-4" style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}>
            <div className="text-4xl mb-2">🎥</div>
            <div className="font-theseasons text-xl italic text-[#7c5a1a] mb-2 text-center font-bold">1:1 Call with Tensorboy</div>
            <div className="text-[#7c5a1a] text-base text-center font-coolvetica">20 min private session.</div>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-[2.5rem] shadow-xl px-8 py-16 w-64 sm:w-72 flex flex-col items-center transform rotate-3 hover:rotate-0 transition-transform duration-300 z-20 -mx-2" style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}>
            <div className="text-4xl mb-2">💎</div>
            <div className="font-theseasons text-xl italic text-[#7c5a1a] mb-2 text-center font-bold">6 Months Premium</div>
            <div className="text-[#7c5a1a] text-base text-center font-coolvetica">Free access to the final product.</div>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-[2.5rem] shadow-xl px-8 py-16 w-64 sm:w-72 flex flex-col items-center transform rotate-6 hover:rotate-0 transition-transform duration-300 z-10 -ml-4" style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}>
            <div className="text-4xl mb-2">📣</div>
            <div className="font-theseasons text-xl italic text-[#7c5a1a] mb-2 text-center font-bold">Instagram Shoutout</div>
            <div className="text-[#7c5a1a] text-base text-center font-coolvetica">Featured by @tensorboy.</div>
          </div>
        </div>
        <div className="text-5xl sm:text-6xl font-coolvetica text-black text-center mb-4 leading-tight">You get to name our next <span className="italic font-theseasons font-bold">big thing</span></div>
        <div className="text-xl sm:text-2xl text-black text-center mb-8 font-coolvetica">3 creative minds with the coolest names<br className="hidden sm:block" /> will win exciting prizes.</div>
        <button onClick={() => navigate("/name")} className="mt-2 px-6 py-4 rounded-full bg-black text-white font-coolvetica text-lg flex items-center gap-3 border-2 border-black shadow-lg hover:scale-105 transition-transform duration-200">
          Enter Contest
          <span className="ml-2 flex items-center justify-center w-7 h-7 rounded-full bg-white text-black border border-black">
            <ArrowUpRight className="w-5 h-5" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Index;