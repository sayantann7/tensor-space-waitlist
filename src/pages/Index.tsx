import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import { ArrowUpRight, Rocket, Trophy, Users, Star, Sparkles, Play, Pause, Volume2, VolumeX } from "lucide-react";
import HomeLeaderboardSection from "@/components/HomeLeaderboardSection";

const Index = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
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
          // Video will be controlled manually by user
        } else {
          videoRef.current?.pause();
          setVideoPlaying(false);
        }
      },
      { threshold: 0.5 }
    );
    const currentVideoContainer = videoContainerRef.current;
    if (currentVideoContainer) {
      observer.observe(currentVideoContainer);
    }
    return () => {
      if (currentVideoContainer) {
        observer.unobserve(currentVideoContainer);
      }
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
        setVideoPlaying(false);
      } else {
        videoRef.current.play();
        setVideoPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoMuted;
      setVideoMuted(!videoMuted);
    }
  };

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
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: '#FFEBC4' }}>


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
              <ArrowUpRight className="w-4 h-4 sm:w-8 sm:h-8" />
            </span>
          </button>
        </header>
        {/* White gradient at bottom for smooth transition */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 sm:h-40 z-30" style={{ background: 'linear-gradient(0deg, #fff 0%, transparent 100%)' }} />
        {/* Launching badge */}
        <div className="inline-flex items-center gap-2 bg-white text-black font-coolvetica text-xl sm:text-base px-4 sm:px-6 py-1.5 sm:py-2 rounded-full shadow mb-6 sm:mb-8 mt-12 sm:mt-24">
          <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-black" /> Launching
        </div>
        {/* Main Title */}
        <h1 className="text-white font-coolvetica text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-normal mb-2">Tensor Space</h1>
        {/* Subtitle */}
        <div className="italic text-white text-xl sm:text-2xl md:text-3xl font-ivalencia mb-4 sm:mb-6">The coziest workstation on the planet.</div>
        {/* Divider */}
        <div className="w-3/4 sm:w-1/2 max-w-md h-px bg-white/40 mx-auto mb-6 sm:mb-8" />
        {/* Help Text */}
        <div className="text-white text-xl sm:text-2xl md:text-3xl font-coolvetica mb-2">But we need help.</div>
        <div className="text-white text-xl w-[250px] sm:text-lg md:text-xl font-ivalencia mb-8 sm:mb-10">Help us to name this thing, and win exciting prizes.</div>
        {/* Enter Contest Button */}
        <button
          onClick={() => navigate('/name')}
          className="flex items-center bg-black text-white font-coolvetica text-xl sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-xl gap-2 sm:gap-3 pr-2 sm:pr-3 hover:scale-105 transition-transform border-2 border-white/80"
        >
          Enter Contest
          <span className="ml-2 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-black border border-black">
            <ArrowUpRight className="w-4 h-4 sm:w-8 sm:h-8" />
          </span>
        </button>
        
        {/* Bottom gradient for smooth transition to video section */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 sm:h-40 z-30" style={{ background: 'linear-gradient(0deg, #FFEBC4 0%, rgba(255,235,196,0.8) 25%, rgba(255,235,196,0.4) 60%, transparent 100%)' }} />
      </main>

      {/* Enhanced Full-Screen Video Section */}
      <div
        ref={videoContainerRef}
        className="relative w-full h-screen overflow-hidden bg-[#FFEBC4]"
      >
        {/* Top gradient for smooth transition from hero section */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-32 sm:h-40 z-30" style={{ background: 'linear-gradient(180deg, #FFEBC4 0%, rgba(255,235,196,0.8) 25%, rgba(255,235,196,0.4) 60%, transparent 100%)' }} />
        
        {/* Decorative background elements matching other pages */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Orange blur backgrounds for consistency */}
        
          
          <motion.div
            animate={{
              y: [-25, 25, -25],
              rotate: [0, 20, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
            className="absolute top-[20%] right-[8%] sm:right-[20%] text-white/15 z-5 hidden md:block"
          >
            <Users className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12" />
          </motion.div>
        </div>

        {/* Enhanced gradient overlays for smooth transitions */}
        {/* <div className="absolute top-0 left-0 w-full h-40 z-10 pointer-events-none" style={{ 
          background: 'linear-gradient(180deg, white 0%, rgba(255,255,255,0.8) 25%, rgba(255,255,255,0.4) 60%, transparent 100%)' 
        }} />
        
        <div className="absolute bottom-0 left-0 w-full h-40 z-10 pointer-events-none" style={{ 
          background: 'linear-gradient(0deg, white 0%, rgba(255,255,255,0.8) 25%, rgba(255,255,255,0.4) 60%, transparent 100%)' 
        }} /> */}
        
        {/* Video container with enhanced styling - Mobile Responsive */}
        <div className="absolute inset-4 sm:inset-6 md:inset-8 lg:inset-16 z-10 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl border-2 md:border-4 border-white/30 backdrop-blur-sm bg-[#FFEBC4] mt-12">
          {/* <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl md:rounded-[2rem]"></div> */}
          
          <video
            ref={videoRef}
            src="/website-intro.mp4"
            loop
            muted={videoMuted}
            playsInline
            className="w-full h-full object-cover rounded-2xl md:rounded-[2rem]"
          />
          
          {/* Video Controls Overlay - Glassmorphism */}
          {/* Show play button in center if paused, else show pause and mute on sides */}
          {!videoPlaying ? (
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center z-20"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <span className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-md rounded-full border border-white/30 hover:scale-105 transition-all">
                <img src="/play.svg" alt="Play" className="w-7 h-7 sm:w-9 sm:h-9" />
              </span>
            </button>
          ) : (
            <>
              {/* Pause/Resume bottom left */}
              <button
                onClick={togglePlay}
                className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/30 hover:scale-105 transition-all z-20"
              >
                {videoPlaying ? (
                  <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="6" height="20" rx="2" fill="white"/><rect x="18" y="4" width="6" height="20" rx="2" fill="white"/></svg>
                ) : (
                  <img src="/play.svg" alt="Play" className="w-7 h-7" />
                )}
              </button>
              {/* Mute/Unmute bottom right */}
              <button
                onClick={toggleMute}
                className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/30 hover:scale-105 transition-all z-20"
              >
                {videoMuted ? (
                  <VolumeX className="w-7 h-7 text-white" />
                ) : (
                  <Volume2 className="w-7 h-7 text-white" />
                )}
              </button>
            </>
          )}
        </div>

        {/* Section Title Overlay */}
        {/* <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/90 backdrop-blur-lg rounded-3xl px-8 py-4 shadow-2xl border-2 border-white/40"
          >
            <h2 className="font-coolvetica text-2xl lg:text-3xl text-[#3B2800] font-bold">
              Watch the Demo
            </h2>
            <p className="font-satoshi text-[#7a4a00] text-lg mt-1">See Tensor Space in action</p>
          </motion.div>
        </div> */}
      </div>

      {/* Restyled: Naming Contest & Prizes Section */}
      <div className="relative w-full min-h-[60vh] flex flex-col justify-center items-center py-20 pt-[200px] bg-[#FFEBC4]">
        {/* White gradient at the top for smooth transition from video */}
        {/* <div className="pointer-events-none absolute top-0 left-0 w-full h-24 z-20" style={{ background: 'linear-gradient(180deg, white 0%, rgba(255,255,255,0.8) 60%, transparent 100%)' }} />
        <div className="pointer-events-none absolute top-0 left-0 h-full w-[500px] bg-gradient-to-r from-[#fba41b]/60 to-transparent z-0" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-[500px] bg-gradient-to-l from-[#fba41b]/60 to-transparent z-0" /> */}
        <div className="flex flex-row flex-wrap justify-center items-end mb-12 -mx-4">
          {/* Card 1 */}
          <div className="bg-white text-black rounded-[2.5rem] shadow-xl px-8 py-16 w-64 sm:w-72 flex flex-col items-center transform -rotate-6 hover:rotate-0 transition-transform duration-300 z-10 -mr-4" style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}>
            <div className="text-4xl mb-2">🎥</div>
            <div className="font-ivalencia text-xl italic text-[#7c5a1a] mb-2 text-center font-bold">1:1 Call with Tensorboy</div>
            <div className="text-[#7c5a1a] text-base text-center font-coolvetica">20 min private session.</div>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-[2.5rem] shadow-xl px-8 py-16 w-64 sm:w-72 flex flex-col items-center transform rotate-3 hover:rotate-0 transition-transform duration-300 z-20 -mx-2" style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}>
            <div className="text-4xl mb-2">💎</div>
            <div className="font-ivalencia text-xl italic text-[#7c5a1a] mb-2 text-center font-bold">6 Months Premium</div>
            <div className="text-[#7c5a1a] text-base text-center font-coolvetica">Free access to the final product.</div>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-[2.5rem] shadow-xl px-8 py-16 w-64 sm:w-72 flex flex-col items-center transform rotate-6 hover:rotate-0 transition-transform duration-300 z-10 -ml-4" style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}>
            <div className="text-4xl mb-2">📣</div>
            <div className="font-ivalencia text-xl italic text-[#7c5a1a] mb-2 text-center font-bold">Instagram Shoutout</div>
            <div className="text-[#7c5a1a] text-base text-center font-coolvetica">Featured by @tensorboy.</div>
          </div>
        </div>
        <div className="text-5xl sm:text-6xl font-coolvetica text-black text-center mb-4 leading-tight">You get to name our next <span className="italic font-ivalencia font-bold">big thing</span></div>
        <div className="text-xl sm:text-2xl text-black text-center mb-8 font-coolvetica">3 creative minds with the coolest names<br className="hidden sm:block" /> will win exciting prizes.</div>
        <button onClick={() => navigate("/name")} className="mt-2 px-6 py-4 rounded-full bg-black text-white font-coolvetica text-lg flex items-center gap-3 border-2 border-black shadow-lg hover:scale-105 transition-transform duration-200">
          Enter Contest
          <span className="ml-2 flex items-center justify-center w-7 h-7 rounded-full bg-white text-black border border-black">
            <ArrowUpRight className="w-8 h-8" />
          </span>
        </button>
      </div>

      {/* Leaderboard Section */}
      <h1 className="font-coolvetica text-2xl sm:text-6xl text-center text-black sm:mt-[220px]">Leaderboard</h1>
      <HomeLeaderboardSection />
    </div>
  );
};

export default Index;