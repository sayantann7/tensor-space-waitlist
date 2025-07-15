import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { checkSubscriber } from "../lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "../components/ui/progress";
import { useLocation } from "react-router-dom";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notSubscribed, setNotSubscribed] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Progress calculation
  const steps = ["/name", "/email", "/instagram", "/confirmation"];
  const location = useLocation();
  const currentStep = steps.findIndex((step) => location.pathname.startsWith(step));
  const progressValue = ((currentStep + 1) / steps.length) * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!subscribed) {
      setError("You must subscribe to the Tensor Protocol newsletter to continue.");
      return;
    }
    setError("");
    setLoading(true);
    setNotSubscribed(false);
    try {
      const isSub = await checkSubscriber(email);
      if (!isSub) {
        setNotSubscribed(true);
        setLoading(false);
        return;
      }
      localStorage.setItem("userEmail", email);
      setLoading(false);
      navigate("/instagram");
    } catch (err) {
      setNotSubscribed(true);
      setLoading(false);
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
      <div className="relative z-20 w-full max-w-lg mx-auto p-10 bg-white rounded-[48px] shadow-2xl flex flex-col items-center border-none">
        {/* Card Content */}
        <h1 className="text-center text-[#7a4a00] text-2xl md:text-3xl font-normal mb-8 font-coolvetica">
          That name could be a winner where should we<br />send the <span className="italic font-normal font-ivalencia" style={{ color: '#7a4a00' }}>prize?</span>
        </h1>
        {notSubscribed ? (
          <form className="w-full flex flex-col items-center gap-6">
            <div className="w-full relative">
              <input
                type="email"
                value={email}
                readOnly
                className="w-full px-5 py-4 rounded-xl text-[#7a4a00] border-2 border-red-500 bg-white text-base font-normal focus:outline-none focus:ring-2 focus:ring-red-300 transition placeholder:text-[#bfa77a] font-coolvetica"
              />
              <div className="text-red-500 text-sm font-normal mt-2 font-coolvetica">You haven't subscribed to the newsletter</div>
            </div>
            <a
              href="https://tensorboy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[200px] py-4 rounded-full border-2 border-[#7a4a00] text-[#7a4a00] font-normal text-lg mt-2 transition-all duration-150 hover:scale-105 bg-white flex items-center justify-center font-coolvetica"
              onClick={() => setNotSubscribed(false)}
            >
              Subscribe
            </a>
            <label className="flex items-center gap-3 text-sm text-[#7a4a00] font-normal w-full font-coolvetica">
              <input
                type="checkbox"
                checked={subscribed}
                onChange={e => setSubscribed(e.target.checked)}
                className="w-5 h-5 rounded border border-[#7a4a00] focus:ring-[#ff9100] accent-[#ff9100]"
              />
              I have subscribed to the Tensor Protocol newsletter
            </label>
            <button
              type="submit"
              className="w-[200px] py-4 rounded-full bg-[#d9d9d9] text-[#7a4a00] font-normal text-lg mt-2 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed font-coolvetica"
              disabled
            >
              Submit
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6">
            <div className="w-full relative">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Drop your email we’ll keep it warm for you"
                className="w-full px-5 py-4 rounded-xl text-[#7a4a00] border border-[#7a4a00] bg-white text-base font-normal focus:outline-none focus:ring-2 focus:ring-[#ff9100]/40 transition placeholder:text-[#bfa77a] font-coolvetica"
                required
              />
            </div>
            <label className="flex items-center gap-3 text-sm text-[#7a4a00] font-normal w-full font-coolvetica">
              <input
                type="checkbox"
                checked={subscribed}
                onChange={e => setSubscribed(e.target.checked)}
                className="w-5 h-5 rounded border border-[#7a4a00] focus:ring-[#ff9100] accent-[#ff9100]"
              />
              I have subscribed to the Tensor Protocol newsletter
            </label>
            {error && <div className="text-red-500 text-xs font-mono text-center">{error}</div>}
            <button
              type="submit"
              className={`w-[200px] py-4 rounded-full font-normal text-lg mt-2 transition-all duration-150 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed font-coolvetica ${subscribed && !loading ? 'bg-black text-white' : 'bg-[#d9d9d9] text-[#7a4a00]'}`}
              disabled={!subscribed || loading}
            >
              {loading ? 'Wait a min' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailForm;
