import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Progress } from "../components/ui/progress";
import { useLocation } from "react-router-dom";

const InstagramForm = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && !username.match(/^@?([A-Za-z0-9_]){1,15}$/)) {
      setError("Please enter a valid Instagram username.");
      return;
    }
    setError("");
    localStorage.setItem("userInstagram", username);
    navigate("/confirmation");
  };
  const handleSkip = () => {
    localStorage.setItem("userInstagram", "");
    navigate("/confirmation");
  };
  // Progress calculation
  const steps = ["/name", "/email", "/instagram", "/confirmation", "/poster"];
  const location = useLocation();
  const currentStep = steps.findIndex((step) => location.pathname.startsWith(step));
  const progressValue = ((currentStep + 1) / steps.length) * 100;
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
        <motion.h1
          className="text-3xl md:text-4xl font-coolvetica text-[#F24C00] mb-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          What's your Instagram handle? <span className="text-base text-gray-500">(optional)</span>
        </motion.h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="@yourusername"
            className="w-full px-5 py-4 rounded-xl text-black border border-[#F24C00]/30 bg-white/80 text-lg font-coolvetica focus:outline-none focus:ring-2 focus:ring-[#F24C00]/40 transition"
          />
          {error && <div className="text-red-500 text-sm font-mono text-center">{error}</div>}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              type="button"
              onClick={handleSkip}
              className="w-full sm:w-1/2 py-4 rounded-xl border border-[#fba41b]/60 bg-white text-[#F24C00] font-coolvetica text-lg shadow-md hover:bg-[#fff3e0] hover:scale-105 transition-transform duration-200"
            >
              Skip
            </button>
            <button
              type="submit"
              className="w-full sm:w-1/2 py-4 rounded-xl bg-gradient-to-b from-[#fba41b] to-[#fff3e0] text-black font-coolvetica text-lg shadow-md border border-[#fba41b]/60 hover:scale-105 transition-transform duration-200"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstagramForm;
