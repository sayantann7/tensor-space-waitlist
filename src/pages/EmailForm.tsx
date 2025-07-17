import { useState } from "react";
import { checkSubscriber } from "../lib/utils";
import { addSubscriber } from "../lib/utils";

export const EmailCaptureForm = ({ onSuccess, loading: externalLoading = false }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await addSubscriber(email, [], "", "", "", false, "", 0, "", "", "");
      setLoading(false);
      onSuccess(email);
    } catch (err) {
      setError("Failed to subscribe. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-lg mx-auto my-8 p-4 sm:p-6 md:p-8 lg:p-12 bg-[#FFEBC4] bg-opacity-100 rounded-[24px] sm:rounded-[32px] lg:rounded-[48px] shadow-2xl flex flex-col items-center border border-[#ffe0b2]/60" style={{ boxShadow: '0 8px 64px 0 #ff910033' }}>
      <h1 className="text-center text-[#7a4a00] text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal mb-6 sm:mb-8 font-coolvetica">
        Enter your email to vote
      </h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6">
        <div className="w-full relative">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-5 py-4 rounded-xl text-[#7a4a00] border border-[#7a4a00] bg-[#FFEBC4] text-base font-normal focus:outline-none focus:ring-2 focus:ring-[#ff9100]/40 transition placeholder:text-[#7a4a00] font-ivalencia"
            required
          />
        </div>
        {error && <div className="text-red-500 text-xs font-mono text-center">{error}</div>}
        <button
          type="submit"
          className={`w-full sm:w-[200px] py-4 rounded-full font-normal text-base sm:text-lg mt-2 transition-all duration-150 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed font-coolvetica ${loading || externalLoading ? 'bg-[#d9d9d9] text-[#7a4a00]' : 'bg-black text-white'}`}
          disabled={loading || externalLoading}
        >
          {(loading || externalLoading) ? 'Wait a min' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

// Original EmailForm for backwards compatibility
import { useNavigate } from "react-router-dom";
import { Progress } from "../components/ui/progress";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
const EmailForm = () => {
  const navigate = useNavigate();
  const steps = ["/name", "/email", "/instagram", "/confirmation"];
  const location = useLocation();
  const currentStep = steps.findIndex((step) => location.pathname.startsWith(step));
  const progressValue = ((currentStep + 1) / steps.length) * 100;
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[url('/mobile-form-bg.png')] sm:bg-[url('/form-bg.png')] bg-no-repeat bg-cover bg-center px-4" style={{ minHeight: '100vh' }}>
      {/* Top progress bar */}
      <div className="absolute top-4 sm:top-8 left-0 w-full flex justify-center z-20">
        <div className="relative w-[95%] max-w-5xl mx-auto">
          <Progress value={progressValue} flow color="linear-gradient(90deg, #ff9100 0%, #fff176 100%)" height={14} />
        </div>
      </div>
      <EmailCaptureForm onSuccess={email => {
        localStorage.setItem("userEmail", email);
        navigate("/instagram");
      }} />
    </div>
  );
};
export default EmailForm;
