import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
import { ArrowUpRight, Rocket, Trophy, Users, Star, Sparkles, Play, Pause, Volume2, VolumeX } from "lucide-react";
import HomeLeaderboardSection from "@/components/HomeLeaderboardSection";
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';
import CardSwap, { Card } from "@/components/CardSwap";

// Animated ArrowUpRight component
const AnimatedArrowUpRight = ({ className = "", size = 24, isHovered = false }) => {
  // Use a key to force remount on each hover for one-time animation
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    if (isHovered) setAnimKey((k) => k + 1);
  }, [isHovered]);

  return (
    <span className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      {/* Outgoing arrow */}
      <motion.span
        key={"out-" + animKey}
        initial={{ x: 0, y: 0, opacity: 1 }}
        animate={isHovered ? { x: 12, y: -12, opacity: 0 } : { x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <ArrowUpRight width={size} height={size} />
      </motion.span>
      {/* Incoming arrow */}
      <motion.span
        key={"in-" + animKey}
        initial={{ x: -12, y: 12, opacity: 0 }}
        animate={isHovered ? { x: 0, y: 0, opacity: 1 } : { x: -12, y: 12, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <ArrowUpRight width={size} height={size} />
      </motion.span>
    </span>
  );
};

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

  // Add three independent hover states for each button
  const [headerHovered, setHeaderHovered] = useState(false);
  const [heroHovered, setHeroHovered] = useState(false);
  const [prizesHovered, setPrizesHovered] = useState(false);

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
        className="relative z-20 flex flex-col items-center text-center min-h-[100vh] w-full pt-[170px] sm:pt-12 pb-0"
        style={{
          backgroundImage: 'url(/bg1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Header inside Hero */}
        <header className="w-full flex flex-row items-start sm:items-center justify-between px-4 sm:px-8 md:px-8 pt-0 absolute top-0 left-0 z-30">
          <div className="text-white text-xl sm:text-xl md:text-2xl font-coolvetica py-4 sm:py-6"><h1 className="pt-1">Tensor Space</h1></div>
          <div className="flex flex-col items-end gap-2 mt-4 sm:mt-4">
            <button
              onClick={() => navigate('/name')}
              onMouseEnter={() => setHeaderHovered(true)}
              onMouseLeave={() => setHeaderHovered(false)}
              className="flex items-center bg-white text-black font-coolvetica text-base sm:text-lg px-4 sm:px-7 py-2 sm:py-3 rounded-full shadow-lg gap-1 sm:gap-3 pr-2 sm:pr-3 hover:scale-105 transition-transform border border-white/30"
            >
              Enter Contest
              <span className="ml-2 flex items-center justify-center w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-black text-white">
                <AnimatedArrowUpRight size={20} className="w-4 h-4 sm:w-8 sm:h-8" isHovered={headerHovered} />
              </span>
            </button>
            {/* Countdown Timer */}
            <div className="flex flex-col items-end mt-1">
              <span className="text-base sm:text-base tracking-wide mt-0 mr-3 text-white">Voting Ends In <span className="text-2xl">2d 15h</span></span>
            </div>
          </div>
        </header>
        {/* White gradient at bottom for smooth transition */}
        {/* <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 sm:h-40 z-30" style={{ background: 'linear-gradient(0deg, #fff 0%, transparent 100%)' }} /> */}
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
          onMouseEnter={() => setHeroHovered(true)}
          onMouseLeave={() => setHeroHovered(false)}
          className="flex items-center bg-black text-white font-coolvetica text-xl sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-xl gap-2 sm:gap-3 pr-2 sm:pr-3 hover:scale-105 transition-transform border-2 border-white/80"
        >
          Enter Contest
          <span className="ml-2 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-black border border-black">
            <AnimatedArrowUpRight size={24} className="w-4 h-4 sm:w-8 sm:h-8" isHovered={heroHovered} />
          </span>
        </button>
        
        {/* White info bar at bottom of hero section */}
        <div className="w-full bg-white py-3 px-2 flex items-center justify-center text-center text-black font-coolvetica text-sm sm:text-base font-normal mt-auto">
        Don't worry, even if you don't win there's a lucky draw. Only 50 lucky people! 
        </div>
      </main>

      {/* Full-width video section with controls overlay */}
      <section className="w-full h-screen bg-[#FFEBC4] relative" ref={videoContainerRef}>
        <video
          ref={videoRef}
          src="/website-intro.mp4"
          loop
          muted={videoMuted}
          playsInline
          className="w-full h-full object-cover"
          style={{ display: 'block' }}
          onPlay={() => setVideoPlaying(true)}
          onPause={() => setVideoPlaying(false)}
        />
        {/* Video Controls Overlay */}
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
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="6" height="20" rx="2" fill="white"/><rect x="18" y="4" width="6" height="20" rx="2" fill="white"/></svg>
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
      </section>

      {/* Restyled: Naming Contest & Prizes Section */}
      <div className="relative w-full min-h-[60vh] flex flex-col justify-center items-center py-20 pt-[200px] bg-[#FFEBC4]">
        {/* Flex row for text/button and CardSwap */}
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
          {/* Left: Texts and Button */}
          <div className="flex-1 flex flex-col items-start justify-center text-left max-w-xl w-full px-4 md:px-0">
            <div className="text-5xl sm:text-6xl font-coolvetica text-black mb-4 leading-tight">You get to name our next <span className="italic font-ivalencia font-bold">big thing</span></div>
            <div className="text-xl sm:text-2xl text-black mb-8 font-coolvetica">3 creative minds with the coolest names<br className="hidden sm:block" /> will win exciting prizes.</div>
            <button onClick={() => navigate("/name")}
              onMouseEnter={() => setPrizesHovered(true)}
              onMouseLeave={() => setPrizesHovered(false)}
              className="px-6 py-4 rounded-full bg-black text-white font-coolvetica text-lg flex items-center gap-3 border-2 border-black shadow-lg hover:scale-105 transition-transform duration-200">
              Enter Contest
              <span className="ml-2 flex items-center justify-center w-7 h-7 rounded-full bg-white text-black border border-black">
                <AnimatedArrowUpRight size={28} className="w-8 h-8" isHovered={prizesHovered} />
              </span>
            </button>
          </div>
          {/* Right: Animated Prizes Stack */}
          <div className="flex-1 flex items-center justify-center w-full relative min-h-[420px] md:min-h-[420px] max-w-[520px] overflow-visible">
            <CardSwap width={520} height={380} cardDistance={60} verticalDistance={50} delay={4200} skewAmount={2} easing="elastic">
              {/* 1st Place */}
              <Card customClass="bg-white border-2 border-yellow-300 rounded-[32px] shadow-xl px-4 sm:px-8 py-8 flex flex-col items-center max-w-full overflow-hidden">
                <div className="font-coolvetica text-2xl sm:text-3xl font-bold text-[#7a4a00] mb-6 flex items-center gap-2 text-center w-full"><span className="text-2xl">🥇</span>1st Place — You Named the Workstation</div>
                <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
                  <div className="flex-1 bg-[#F8F6F2] rounded-2xl px-4 py-6 flex flex-col items-center min-w-[120px] max-w-[180px]">
                    <span className="text-2xl mb-2">🎥</span>
                    <div className="font-coolvetica text-lg font-bold mb-1 text-center text-[#7a4a00]">1:1 Call with Tensorboy</div>
                    <div className="text-[#7a4a00] text-base text-center">20 min private session.</div>
                  </div>
                  <div className="flex-1 bg-[#F8F6F2] rounded-2xl px-4 py-6 flex flex-col items-center min-w-[120px] max-w-[180px]">
                    <span className="text-2xl mb-2">📣</span>
                    <div className="font-coolvetica text-lg font-bold mb-1 text-center text-[#7a4a00]">Instagram Shoutout</div>
                    <div className="text-[#7a4a00] text-base text-center">Featured by @tensorboy.</div>
                  </div>
                  <div className="flex-1 bg-[#F8F6F2] rounded-2xl px-4 py-6 flex flex-col items-center min-w-[120px] max-w-[180px]">
                    <span className="text-2xl mb-2">💎</span>
                    <div className="font-coolvetica text-lg font-bold mb-1 text-center text-[#7a4a00]">Lifetime Premium</div>
                    <div className="text-[#7a4a00] text-base text-center">Free access to the final product.</div>
                  </div>
                </div>
              </Card>
              {/* 2nd Place */}
              <Card customClass="bg-white border-2 border-gray-300 rounded-[32px] shadow-xl px-4 sm:px-8 py-8 flex flex-col items-center max-w-full overflow-hidden">
                <div className="font-coolvetica text-2xl sm:text-3xl font-bold text-[#7a4a00] mb-6 flex items-center gap-2 text-center w-full"><span className="text-2xl">🥈</span>2nd Place</div>
                <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
                  <div className="flex-1 bg-[#F8F6F2] rounded-2xl px-4 py-6 flex flex-col items-center min-w-[120px] max-w-[180px]">
                    <span className="text-2xl mb-2">🎥</span>
                    <div className="font-coolvetica text-lg font-bold mb-1 text-center text-[#7a4a00]">1:1 Call with Tensorboy</div>
                    <div className="text-[#7a4a00] text-base text-center">20 min private session.</div>
                  </div>
                  <div className="flex-1 bg-[#F8F6F2] rounded-2xl px-4 py-6 flex flex-col items-center min-w-[120px] max-w-[180px]">
                    <span className="text-2xl mb-2">📣</span>
                    <div className="font-coolvetica text-lg font-bold mb-1 text-center text-[#7a4a00]">Instagram Shoutout</div>
                    <div className="text-[#7a4a00] text-base text-center">Featured by @tensorboy.</div>
                  </div>
                  <div className="flex-1 bg-[#F8F6F2] rounded-2xl px-4 py-6 flex flex-col items-center min-w-[120px] max-w-[180px]">
                    <span className="text-2xl mb-2">💎</span>
                    <div className="font-coolvetica text-lg font-bold mb-1 text-center text-[#7a4a00]">1 Year Premium</div>
                    <div className="text-[#7a4a00] text-base text-center">Free access to the final product.</div>
                  </div>
                </div>
              </Card>
              {/* 3rd Place */}
              <Card customClass="bg-white border-2 border-[#b87333] rounded-[32px] shadow-xl px-4 sm:px-8 py-8 flex flex-col items-center max-w-full overflow-hidden">
                <div className="font-coolvetica text-2xl sm:text-3xl font-bold text-[#7a4a00] mb-6 flex items-center gap-2 text-center w-full"><span className="text-2xl">🥉</span>3rd Place</div>
                <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
                  <div className="flex-1 bg-[#F8F6F2] rounded-2xl px-4 py-6 flex flex-col items-center min-w-[120px] max-w-[180px]">
                    <span className="text-2xl mb-2">📣</span>
                    <div className="font-coolvetica text-lg font-bold mb-1 text-center text-[#7a4a00]">Instagram Shoutout</div>
                    <div className="text-[#7a4a00] text-base text-center">Featured by @tensorboy.</div>
                  </div>
                  <div className="flex-1 bg-[#F8F6F2] rounded-2xl px-4 py-6 flex flex-col items-center min-w-[120px] max-w-[180px]">
                    <span className="text-2xl mb-2">💎</span>
                    <div className="font-coolvetica text-lg font-bold mb-1 text-center text-[#7a4a00]">6 Months Premium</div>
                    <div className="text-[#7a4a00] text-base text-center">Free access to the final product.</div>
                  </div>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <h1 className="font-coolvetica text-2xl sm:text-6xl text-center text-black sm:mt-[220px]">Leaderboard</h1>
      <HomeLeaderboardSection />
    </div>
  );
};

export default Index;