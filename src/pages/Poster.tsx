import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Poster = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const { toast } = useToast();

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
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden p-4 sm:p-6">
      <Confetti width={width} height={height} recycle={true} numberOfPieces={400} />
      
      {/* Side gradients */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-[500px] bg-gradient-to-r from-[#fba41b]/60 to-transparent z-0" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-[500px] bg-gradient-to-l from-[#fba41b]/60 to-transparent z-0" />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto relative z-10"
      >
        <div className="bg-white/90 rounded-3xl shadow-2xl border border-[#F24C00]/20 flex flex-col items-center p-8 text-center">
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
      </motion.div>
    </div>
  );
};

export default Poster; 