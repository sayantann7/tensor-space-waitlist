import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Edit, CheckCircle, User, Mail, Instagram, QrCode, Sparkles, Trophy, Crown } from "lucide-react";
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[32px] p-8 shadow-2xl"
        >
          <span className="font-coolvetica text-2xl text-[#7a4a00]">Setting up your contest entry...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: "radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)" }}>
      {/* Decorative Images */}
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

      {/* Orange blur background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full z-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)', filter: 'blur(40px)', opacity: 0.7 }} />

      {/* Top progress bar */}
      <div className="absolute top-8 left-0 w-full flex justify-center z-20">
        <div className="relative w-[95%] max-w-5xl mx-auto">
          <Progress value={progressValue} flow color="linear-gradient(90deg, #ff9100 0%, #fff176 100%)" height={14} />
        </div>
      </div>

      <div className="relative z-20 w-full max-w-6xl mx-auto pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <button 
            onClick={() => navigate('/instagram')} 
            className="flex items-center gap-2 text-[#7a4a00] font-coolvetica font-medium text-lg hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </motion.div>

        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="font-coolvetica text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#3B2800] mb-4 leading-tight px-4 text-center">
            Ready to enter the arena?
          </h1>
          <p className="font-coolvetica text-lg sm:text-xl md:text-2xl text-[#7a4a00] font-medium max-w-3xl mx-auto px-4 text-center">
            Review your information and join the ultimate naming contest
          </p>
        </motion.div>

        {/* Main Confirmation Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-5xl mx-auto mb-12"
        >
          <div className="bg-white rounded-2xl sm:rounded-[32px] shadow-2xl overflow-hidden mx-4 sm:mx-0">
            <div className="flex flex-col lg:flex-row items-center align-center">
              <div className="w-full p-6 sm:p-8">
                <div className="mb-8">
                  <h3 className="font-coolvetica text-2xl sm:text-3xl text-[#3B2800] font-bold mb-2">
                    Confirm Your Details
                  </h3>
                  <p className="font-coolvetica text-[#7a4a00] text-base sm:text-lg">
                    Make sure everything looks perfect before submitting
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {/* Email Field */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors gap-3 sm:gap-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#FF9100] to-[#FFD592] rounded-xl">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <label className="font-coolvetica text-sm text-[#888] uppercase tracking-wider">Email</label>
                        <p className="font-coolvetica text-lg text-[#3B2800] font-medium">{email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleEdit('email')}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-[#FF9100] hover:bg-orange-50 transition-all"
                    >
                      <Edit className="w-4 h-4 text-[#7a4a00]" />
                      <span className="font-coolvetica text-sm text-[#7a4a00]">Edit</span>
                    </button>
                  </motion.div>

                  {/* Name Field */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors gap-3 sm:gap-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#FF9100] to-[#FFD592] rounded-xl">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <label className="font-coolvetica text-sm text-[#888] uppercase tracking-wider">Suggested Name</label>
                        <p className="font-coolvetica text-lg text-[#3B2800] font-medium">{name}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleEdit('name')}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-[#FF9100] hover:bg-orange-50 transition-all"
                    >
                      <Edit className="w-4 h-4 text-[#7a4a00]" />
                      <span className="font-coolvetica text-sm text-[#7a4a00]">Edit</span>
                    </button>
                  </motion.div>

                  {/* Instagram Field */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors gap-3 sm:gap-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#FF9100] to-[#FFD592] rounded-xl">
                        <Instagram className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <label className="font-coolvetica text-sm text-[#888] uppercase tracking-wider">Instagram</label>
                        <p className="font-coolvetica text-lg text-[#3B2800] font-medium">@{instagram}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleEdit('instagram')}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-[#FF9100] hover:bg-orange-50 transition-all"
                    >
                      <Edit className="w-4 h-4 text-[#7a4a00]" />
                      <span className="font-coolvetica text-sm text-[#7a4a00]">Edit</span>
                    </button>
                  </motion.div>
                </div>

                {/* Submit Button */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 flex justify-center"
                >
                  <button
                    onClick={handleProceed}
                    disabled={isReady}
                    className={`flex items-center gap-3 px-12 py-4 rounded-full font-coolvetica text-lg font-bold shadow-xl transition-all duration-300 ${
                      isReady 
                        ? 'bg-green-500 text-white scale-105' 
                        : 'bg-gradient-to-r from-[#FF9100] to-[#FFD592] text-[#3B2800] hover:scale-105 hover:shadow-2xl'
                    }`}
                  >
                    {isReady ? (
                      <>
                        <CheckCircle className="w-6 h-6" />
                        Submitted!
                      </>
                    ) : (
                      <>
                        Enter Contest
                      </>
                    )}
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {/* {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full font-coolvetica shadow-lg z-50"
          >
            {error}
          </motion.div>
        )} */}
      </div>
    </div>
  );
};

export default Confirmation;