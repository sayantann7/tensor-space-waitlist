import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Edit, CheckCircle, User, Mail, Instagram, QrCode, Sparkles, Trophy, Crown, ArrowUpRight } from "lucide-react";
import { addToWaitlist } from "../lib/utils";
import { Progress } from "../components/ui/progress";

const Confirmation = () => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("userEmail") || "";
  const instagram = localStorage.getItem("userInstagram") || "";
  const name = localStorage.getItem("userName") || "";

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const newUserData = await addToWaitlist(email, instagram, name);
        const id = await newUserData.newWaitlistEntry.id;
        localStorage.setItem("userId", id);
        setUserId(id);
        setLoading(false);
      } catch (err) {
        setError("Error adding to waitlist. Please try again.");
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const handleProceed = () => {
    setIsReady(true);
    setTimeout(() => {
      navigate("/leaderboard");
    }, 800);
  };

  const handleEdit = (field: string) => {
    switch (field) {
      case 'email':
        navigate('/email');
        break;
      case 'name':
        navigate('/name');
        break;
      case 'instagram':
        navigate('/instagram');
        break;
      default:
        break;
    }
  };

  // Progress calculation
  const steps = ["/name", "/email", "/instagram", "/confirmation"];
  const location = useLocation();
  const currentStep = steps.findIndex((step) => location.pathname.startsWith(step));
  const progressValue = ((currentStep + 1) / steps.length) * 100;

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center" style={{ background: "radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)" }}>
  //       <motion.div
  //         initial={{ opacity: 0, scale: 0.9 }}
  //         animate={{ opacity: 1, scale: 1 }}
  //         className="bg-white rounded-[32px] p-8 shadow-2xl"
  //       >
  //         <span className="font-coolvetica text-2xl text-[#7a4a00]">Setting up your contest entry...</span>
  //       </motion.div>
  //     </div>
  //   );
  // }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[url('/form-bg.png')]" style={{ minHeight: '100vh' }}>
      {/* Top progress bar */}
      <div className="absolute top-8 left-0 w-full flex justify-center z-20">
        <div className="relative w-[95%] max-w-5xl mx-auto">
          <Progress value={progressValue} flow color="linear-gradient(90deg, #ff9100 0%, #fff176 100%)" height={14} />
        </div>
      </div>
      {/* Orange blur background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full z-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)', filter: 'blur(40px)', opacity: 0.7 }} />
      {/* Centered card with lower z-index */}
      <div className="relative z-20 w-full max-w-3xl mx-auto p-12 px-32 bg-[#FFEBC4] rounded-[48px] shadow-2xl flex flex-col items-center border-none" style={{ boxShadow: '0 8px 64px 0 #ff910033' }}>
        {/* Card Content */}
        <h1 className="text-center text-[#7a4a00] text-2xl md:text-4xl font-normal mb-4 font-coolvetica">
          Ready to enter <span className="font-ivalencia italic">the arena?</span>
        </h1>
        <p className="text-center text-[#7a4a00] text-base font-coolvetica mb-8">Make sure everything looks perfect before submitting</p>
        <div className="flex flex-col gap-8 w-full mb-8">
          {/* Suggested Name */}
          <div className="flex items-center w-full gap-4">
            <span className="bg-[#FFD592] items-center text-center px-4 py-2 rounded-xl text-[#7a4a00] font-coolvetica text-sm min-w-[140px] text-left">Suggested Name:</span>
            <span className="text-[#7a4a00] text-2xl font-coolvetica flex-1 text-left">“{name}”</span>
            <button onClick={() => handleEdit('name')} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#7a4a00] hover:scale-105 transition-all"><Edit className="w-5 h-5 text-[#FFEBC4]" /></button>
          </div>
          {/* Username/Email */}
          <div className="flex items-center w-full gap-4">
            <span className="bg-[#FFD592] items-center text-center px-4 py-2 rounded-xl text-[#7a4a00] font-coolvetica text-sm min-w-[140px] text-left">Username:</span>
            <span className="text-[#7a4a00] text-base font-coolvetica flex-1 text-left">{email}</span>
            <button onClick={() => handleEdit('email')} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#7a4a00] hover:scale-105 transition-all"><Edit className="w-5 h-5 text-[#FFEBC4]" /></button>
          </div>
          {/* Instagram */}
          {instagram ? (
            <div className="flex items-center w-full gap-4">
            <span className="bg-[#FFD592] items-center text-center px-4 py-2 rounded-xl text-[#7a4a00] font-coolvetica text-sm min-w-[140px] text-left">Instagram:</span>
            <span className="text-[#7a4a00] text-base font-coolvetica flex-1 text-left">{instagram ? instagram : <span className='italic text-[#bfa77a]'>Not provided</span>}</span>
            <button onClick={() => handleEdit('instagram')} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#7a4a00] hover:scale-105 transition-all"><Edit className="w-5 h-5 text-[#FFEBC4]" /></button>
          </div>
          ) : <></> }
        </div>
        <button
          onClick={handleProceed}
          disabled={isReady}
          className={`w-[180px] py-3 rounded-full bg-black text-white font-normal text-base mt-2 transition-all duration-150 hover:scale-105 flex items-center justify-center gap-2 font-coolvetica ${isReady ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          Enter Contest
          <span className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-white text-black border border-black">
            <ArrowUpRight className="w-6 h-6" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Confirmation;