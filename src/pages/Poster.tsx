import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "../components/ui/progress";
import { useLocation } from "react-router-dom";

const Poster = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const { toast } = useToast();

  // Progress calculation
  const steps = ["/name", "/email", "/instagram", "/confirmation", "/poster"];
  const location = useLocation();
  const currentStep = steps.findIndex((step) => location.pathname.startsWith(step));
  const progressValue = ((currentStep + 1) / steps.length) * 100;

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
        title: "Link Copied!",
        description: "Your voting link has been copied to the clipboard.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy the link. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)", minHeight: '100vh' }}>
      {/* Decorative Images - much larger and above the card */}
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
      {/* Centered card with lower z-index */}
      <div className="relative z-20 w-full max-w-lg mx-auto p-10 bg-white rounded-[48px] shadow-2xl flex flex-col items-center border-none" style={{ boxShadow: '0 8px 64px 0 #ff910033' }}>
        {/* Card Content */}
        <Confetti width={width} height={height} recycle={true} numberOfPieces={400} />
        
        <h1 className="text-4xl sm:text-5xl font-coolvetica text-[#F24C00] mb-4">
          Congratulations! You have entered the contest!
        </h1>

        <h1 className="text-xl sm:text-2xl font-coolvetica text-gray-700 mb-4 mt-4">
          As a reward, we have made a poster for you! <br />Share this poster with the world, gain votes <br />and win big prizes! <br />
        </h1>

        <h1 className="text-xl sm:text-2xl font-coolvetica text-gray-700 mb-4 mt-4">
          You can also share your link with others to <br />let them vote you!
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mt-4">
          <a
            href="https://www.canva.com/" // Replace with your Canva project link
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex justify-center items-center"
          >
            <span className="relative z-10 px-8 py-3 rounded-full bg-gradient-to-b from-[#fba41b] to-[#fff3e0] shadow-xl text-black font-coolvetica text-lg flex items-center gap-3 border-2 border-[#fba41b]/60 hover:scale-105 transition-transform duration-200">
              Get Poster
            </span>
          </a>
          <div className="relative flex justify-center items-center">
            <button
              onClick={handleShareLink}
              className="relative z-10 px-8 py-3 rounded-full bg-gradient-to-b from-[#fba41b] to-[#fff3e0] shadow-xl text-black font-coolvetica text-lg flex items-center gap-3 border-2 border-[#fba41b]/60 hover:scale-105 transition-transform duration-200"
            >
              Share your Voting Link
            </button>
          </div>
          <div className="relative flex justify-center items-center">
            <button
              onClick={() => navigate("/voting")}
              className="relative z-10 px-8 py-3 rounded-full bg-gradient-to-b from-[#fba41b] to-[#fff3e0] shadow-xl text-black font-coolvetica text-lg flex items-center gap-3 border-2 border-[#fba41b]/60 hover:scale-105 transition-transform duration-200"
            >
              Vote Others
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster; 