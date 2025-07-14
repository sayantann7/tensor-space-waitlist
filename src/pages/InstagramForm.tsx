import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Progress } from "../components/ui/progress";
import { useLocation } from "react-router-dom";

const InstagramForm = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
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
      <div className="relative z-20 w-full max-w-lg mx-auto p-10 bg-white rounded-[48px] shadow-2xl flex flex-col items-center border-none">
        {/* Skip button */}
        <button
          type="button"
          onClick={handleSkip}
          className="absolute top-8 right-8 text-[#7a4a00] text-sm font-normal bg-transparent border-none outline-none hover:underline font-coolvetica"
        >
          Skip
        </button>
        {/* Card Content */}
        <h1 className="text-center text-[#7a4a00] text-2xl md:text-3xl font-normal mb-8 font-coolvetica">
          Add your <span className="font-bold">@</span> so we can<br />shout you out
        </h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6">
          <div className="w-full relative">
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Drop your @ below"
              className="w-full px-5 py-4 rounded-xl text-[#7a4a00] border border-[#7a4a00] bg-white text-base font-normal focus:outline-none focus:ring-2 focus:ring-[#ff9100]/40 transition placeholder:text-[#bfa77a] font-coolvetica"
            />
          </div>
          <label className="flex items-center gap-3 text-sm text-[#7a4a00] font-normal w-full font-coolvetica">
            <input
              type="checkbox"
              checked={isFollowing}
              onChange={e => setIsFollowing(e.target.checked)}
              className="w-5 h-5 rounded border border-[#ff9100] bg-[#ff9100] accent-[#ff9100] focus:ring-[#ff9100]"
              style={{ accentColor: '#ff9100' }}
            />
            You are following us right?
          </label>
          {error && <div className="text-red-500 text-xs font-mono text-center">{error}</div>}
          <button
            type="submit"
            className="w-[200px] py-4 rounded-full bg-black text-white font-normal text-lg mt-2 transition-all duration-150 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed font-coolvetica"
            disabled={!isFollowing}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstagramForm;
