import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "../components/ui/progress";
import { useLocation } from "react-router-dom";
import { ArrowUpRight, Share2, Users, ExternalLink, Vote } from "lucide-react";
import DynamicPoster from "../components/DynamicPoster";

const Poster = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const { toast } = useToast();

  // Progress calculation
  const steps = ["/name", "/email", "/instagram", "/confirmation", "/poster"];
  const location = useLocation();
  const currentStep = steps.findIndex((step) => location.pathname.startsWith(step));
  const progressValue = ((currentStep + 1) / steps.length) * 100;

  // Get user data from localStorage
  const userName = localStorage.getItem("userName") || "Your Name";
  const userEmail = localStorage.getItem("userEmail") || "";
  const userInstagram = localStorage.getItem("userInstagram") || "";

  const handleShareLink = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast({
        title: "Error",
        description: "User ID not found. Please try again.",
        variant: "destructive",
      });
      return;
    }
    const link = `https://contest.tensorboy.com/users/${userId}`;
    try {
      await navigator.clipboard.writeText(link);
      toast({
        title: "🎉 Link Copied!",
        description: "Your voting link has been copied to the clipboard.",
        className: "font-coolvetica border-[#FF9100]/30 bg-white/95 backdrop-blur-sm shadow-xl",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy the link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGetPoster = () => {
    const posterElement = document.querySelector('[data-poster-ref]');
    if (posterElement) {
      const event = new CustomEvent('downloadPoster');
      posterElement.dispatchEvent(event);
      toast({
        title: "🎨 Downloading Poster!",
        description: "Your HD poster is being downloaded.",
        className: "font-coolvetica border-[#FF9100]/30 bg-white/95 backdrop-blur-sm shadow-xl",
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: "radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)" }}>
      {/* Decorative Images */}
      <img
        src="/top-left.png"
        alt="decor top left"
        className="pointer-events-none select-none absolute z-10"
        style={{
          top: '-2vw',
          left: '14vw',
          width: '40vw',
          minWidth: '300px',
          maxWidth: '700px',
          height: 'auto',
          objectFit: 'contain',
        }}
        aria-hidden="true"
      />
      <img
        src="/bottom-right.png"
        alt="decor bottom right"
        className="pointer-events-none select-none absolute z-10"
        style={{
          bottom: '-3vw',
          right: '14vw',
          width: '40vw',
          minWidth: '300px',
          maxWidth: '700px',
          height: 'auto',
          objectFit: 'contain',
        }}
        aria-hidden="true"
      />

      {/* Top progress bar */}
      <div className="absolute top-8 left-0 w-full flex justify-center z-20">
        <div className="relative w-[95%] max-w-5xl mx-auto">
          <Progress value={progressValue} flow color="linear-gradient(90deg, #ff9100 0%, #fff176 100%)" height={14} />
        </div>
      </div>

      {/* Orange blur background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full z-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)', filter: 'blur(40px)', opacity: 0.7 }} />

      {/* Header */}
      <div className="relative z-20 w-full max-w-6xl mx-auto pt-20 pb-8 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-2">
            <span className="font-coolvetica text-2xl sm:text-3xl text-[#3B2800] font-bold">Tensor Space</span>
          </div>

          <button
            onClick={() => navigate("/leaderboard")}
            className="flex items-center gap-2 bg-white text-[#3B2800] font-coolvetica font-medium text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            View Leaderboard
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </button>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Left Side - Poster */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <DynamicPoster
              userName={userName}
              userInstagram={userInstagram}
            />
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-1 max-w-lg"
          >
            <div className="bg-white rounded-2xl sm:rounded-[32px] p-8 sm:p-10 shadow-2xl">
              <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl sm:text-4xl font-coolvetica text-[#3B2800] font-bold mb-4">
                  🎉 Congratulations!
                </h1>
                <p className="text-lg sm:text-xl font-coolvetica text-[#7a4a00] mb-4">
                  You've successfully entered the contest!
                </p>
                <p className="text-base font-ivalencia text-gray-600 leading-relaxed">
                  Your poster is ready! Share it with the world, gain votes, and win amazing prizes.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-4"
              >
                <button
                  onClick={handleGetPoster}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF9100] to-[#FFD592] text-[#3B2800] rounded-full px-8 py-4 shadow-lg hover:scale-105 transition-transform font-coolvetica font-bold text-lg"
                >
                  <ExternalLink className="w-5 h-5" />
                  Get Your Poster
                </button>

                <button
                  onClick={handleShareLink}
                  className="w-full flex items-center justify-center gap-3 bg-black text-white rounded-full px-8 py-4 shadow-lg hover:scale-105 transition-transform font-coolvetica font-bold text-lg"
                >
                  <Share2 className="w-5 h-5" />
                  Share Voting Link
                </button>

                <button
                  onClick={() => navigate("/voting")}
                  className="w-full flex items-center justify-center gap-3 bg-white text-[#3B2800] border-2 border-[#FF9100] rounded-full px-8 py-4 shadow-lg hover:scale-105 transition-transform font-coolvetica font-bold text-lg"
                >
                  <Vote className="w-5 h-5" />
                  Vote for Others
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="mt-8 pt-6 border-t border-gray-200"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-[#7a4a00]" />
                  <span className="font-coolvetica text-base text-[#7a4a00]">Your Contest Entry</span>
                </div>
                <div className="space-y-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-coolvetica text-lg text-[#3B2800] font-bold">"{userName}"</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-coolvetica text-sm text-[#7a4a00]">by {userInstagram}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="bg-black rounded-2xl sm:rounded-[32px] p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-2 text-white text-center sm:text-left">
                <span className="font-coolvetica text-xl sm:text-2xl">Ready to climb the leaderboard?</span>
                <span className="font-coolvetica font-medium text-sm sm:text-base opacity-80">
                  Share your poster and voting link to get more votes and win amazing prizes!
                </span>
              </div>
              <button
                onClick={() => navigate("/leaderboard")}
                className="flex items-center gap-3 bg-white rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-lg hover:scale-105 transition-transform"
              >
                <span className="font-coolvetica font-medium text-base sm:text-lg text-black">View Leaderboard</span>
                <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Poster;