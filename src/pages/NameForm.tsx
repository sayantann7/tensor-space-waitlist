import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Progress } from "../components/ui/progress";
import { useLocation } from "react-router-dom";

const NameForm = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const maxChars = 20;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length < 1 || name.length > maxChars) {
      setError(`Name must be between 1 and ${maxChars} characters.`);
      return;
    }
    setError("");
    localStorage.setItem("userName", name);
    navigate("/email");
  };
  // Progress calculation
  const steps = ["/name", "/email", "/instagram", "/confirmation"];
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
        {/* Surrounding Images */}
        {/* Card Content */}
        <h1 className="text-center text-[#7a4a00] text-2xl md:text-3xl font-normal mb-8 font-coolvetica">
          Give a name the <span className="italic font-normal font-ivalencia" style={{ color: '#7a4a00' }}>coziest</span><br />workstation on the planet
        </h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6">
          <div className="w-full relative">
            <input
              type="text"
              value={name}
              onChange={e => {
                if (e.target.value.length <= maxChars) setName(e.target.value);
              }}
              placeholder="Your future startup name?"
              className="w-full px-5 py-4 rounded-xl text-[#7a4a00] border border-[#7a4a00] bg-white text-base font-normal focus:outline-none focus:ring-2 focus:ring-[#ff9100]/40 transition placeholder:text-[#bfa77a] font-coolvetica"
              maxLength={maxChars}
              required
            />
            <span className="absolute right-3 bottom-2 text-xs text-[#7a4a00] opacity-70 select-none font-coolvetica">{name.length}/{maxChars}</span>
          </div>
          {error && <div className="text-red-500 text-xs font-mono text-center">{error}</div>}
          <button
            type="submit"
            className="w-[180px] py-3 rounded-full bg-black text-white font-normal text-base mt-2 transition-all duration-150 hover:scale-105 font-coolvetica"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameForm;
