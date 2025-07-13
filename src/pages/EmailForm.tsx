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
  const navigate = useNavigate();
  const { toast } = useToast();

  // Progress calculation
  const steps = ["/name", "/email", "/instagram", "/confirmation", "/poster"];
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
    try {
      const isSub = await checkSubscriber(email);
      if (!isSub) {
        toast({
          title: "Not Subscribed",
          description: "You are not subscribed to tensor protocol",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      localStorage.setItem("userEmail", email);
      setLoading(false);
      navigate("/instagram");
    } catch (err) {
      toast({
        title: "Not Subscribed",
        description: "You are not subscribed to tensor protocol",
        variant: "destructive",
      });
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
      <div className="relative z-20 w-full max-w-lg mx-auto p-10 bg-white rounded-[48px] shadow-2xl flex flex-col items-center border-none" style={{ boxShadow: '0 8px 64px 0 #ff910033' }}>
        {/* Card Content */}
        <motion.h1
          className="text-3xl md:text-4xl font-coolvetica text-[#F24C00] mb-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Enter your email to join the waitlist
        </motion.h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full text-black px-5 py-4 rounded-xl border border-[#F24C00]/30 bg-white/80 text-lg font-coolvetica focus:outline-none focus:ring-2 focus:ring-[#F24C00]/40 transition"
            required
          />
          <label className="flex items-center gap-3 text-sm font-theseasons text-[#F24C00] font-bold">
            <input
              type="checkbox"
              checked={subscribed}
              onChange={e => setSubscribed(e.target.checked)}
              className="accent-[#F24C00] w-5 h-5 rounded"
            />
            I have subscribed to the Tensor Protocol newsletter
          </label>
          {error && <div className="text-red-500 text-sm font-mono text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-b from-[#fba41b] to-[#fff3e0] text-black font-coolvetica text-lg shadow-md border border-[#fba41b]/60 hover:scale-105 transition-transform duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={!subscribed || loading}
          >
            {loading ? "Checking..." : "Next"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
