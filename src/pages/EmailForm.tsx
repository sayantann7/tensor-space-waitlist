import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { checkSubscriber } from "../lib/utils";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
        setError("You must be a subscriber to continue.");
        setLoading(false);
        return;
      }
      localStorage.setItem("userEmail", email);
      setLoading(false);
      navigate("/instagram");
    } catch (err) {
      setError("Error checking subscriber. Please try again.");
      setLoading(false);
    }
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Side gradients */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-[500px] bg-gradient-to-r from-[#fba41b]/60 to-transparent z-0" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-[500px] bg-gradient-to-l from-[#fba41b]/60 to-transparent z-0" />
      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-white/90 rounded-3xl shadow-2xl border border-[#F24C00]/20 flex flex-col items-center">
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
