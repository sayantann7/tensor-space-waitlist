import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swords, Sparkles, Trophy, ArrowRight, ArrowLeft } from "lucide-react";
import { addToWaitlist } from "../lib/utils";

const Confirmation = () => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState("");

  const email = localStorage.getItem("userEmail") || "";
  const instagram = localStorage.getItem("userInstagram") || "";
  const name = localStorage.getItem("userName") || "";

  useEffect(() => {
    (async () => {
      try {
        await addToWaitlist(email, instagram, name);
      } catch (err) {
        setError("Error adding to waitlist. Please try again.");
      }
    })();
    // eslint-disable-next-line
  }, []);

  const handleProceed = () => {
    setIsReady(true);
    setTimeout(() => {
      navigate("/poster");
    }, 800);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden p-4 sm:p-6">
      {/* Side gradients */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-[500px] bg-gradient-to-r from-[#fba41b]/60 to-transparent z-0" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-[500px] bg-gradient-to-l from-[#fba41b]/60 to-transparent z-0" />
      <div className="w-full max-w-2xl mx-auto relative z-10">
        <div className="bg-white/90 rounded-3xl shadow-2xl border border-[#F24C00]/20">
          <div className="text-center pb-6 sm:pb-8 px-6 sm:px-8 pt-6 sm:pt-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-[#F24C00] rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Swords className="w-10 h-10 sm:w-12 sm:h-12 text-[#F24C00]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-coolvetica text-[#F24C00] mb-3 sm:mb-4">Are you ready for the battle?</h1>
            <p className="text-gray-600 font-theseasons leading-relaxed text-base sm:text-lg px-2 font-bold">
              You are about to enter the arena where creativity meets competition
            </p>
          </div>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-6 sm:space-y-8">
            {/* User Info Summary */}
            <div className="bg-white/80 rounded-2xl border border-[#F24C00]/20 p-4 sm:p-6">
              <h3 className="font-coolvetica text-[#F24C00] font-medium mb-3 sm:mb-4 text-sm uppercase tracking-wider">Your Battle Profile</h3>
              <div className="space-y-2 sm:space-y-3 font-theseasons text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="text-gray-500 font-bold">Email:</span>
                  <span className="text-black break-all font-coolvetica">{email}</span>
                </div>
                {instagram && (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="text-gray-500 font-bold">Instagram:</span>
                    <span className="text-[#F24C00] font-coolvetica">{instagram}</span>
                  </div>
                )}
              </div>
            </div>
            {/* Battle Rules */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="font-coolvetica text-[#F24C00] font-medium flex items-center text-sm uppercase tracking-wider">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-3 text-[#F24C00]" />
                Battle Rules
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {[
                  { num: "1", title: "Submit 1 Name", desc: "Make it memorable" },
                  { num: "2", title: "Get Your Poster", desc: "Share it everywhere to gain votes" },
                  { num: "3", title: "Vote Strategically", desc: "You can only give 2 votes" }
                ].map((rule, index) => (
                  <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 border border-[#F24C00] rounded-2xl flex items-center justify-center text-[#F24C00] font-coolvetica text-sm font-bold mt-1 flex-shrink-0">
                      {rule.num}
                    </div>
                    <div className="flex-1">
                      <div className="font-coolvetica text-[#F24C00] font-medium mb-1 text-sm sm:text-base">{rule.title}</div>
                      <div className="text-gray-600 font-theseasons text-sm leading-relaxed font-bold">{rule.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Call to Action */}
            <div className="text-center pt-4 sm:pt-6">
              {error && <div className="text-red-500 text-sm font-mono text-center mb-4">{error}</div>}
              <div className="relative flex justify-center items-center my-8">
                {/* Concentric borders */}
                <div className="absolute inset-0 flex justify-center items-center z-0">
                  <div className="rounded-full w-[430px] h-[120px] bg-gradient-to-b from-[#fba41b]/70 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                  <div className="rounded-full w-[380px] h-[100px] bg-gradient-to-b from-[#fba41b]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                  <div className="rounded-full w-[330px] h-[80px] bg-gradient-to-b from-[#f24c00]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                </div>
                {/* Main button */}
                <button
                  onClick={handleProceed}
                  disabled={isReady}
                  className="relative z-10 px-10 py-5 rounded-full bg-gradient-to-b from-[#fba41b] to-[#fff3e0] shadow-xl text-black font-coolvetica text-lg flex items-center gap-4 border-2 border-[#fba41b]/60 hover:scale-105 transition-transform duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isReady ? (
                    <>
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-3 animate-spin" />
                      ENTERING BATTLE...
                    </>
                  ) : (
                    <>
                      LET THE BATTLE BEGIN!
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 12H6.75m7.5-6 6 6-6 6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 font-theseasons font-bold">
                Once you submit, there is no going back. Make it count 🔥
              </p>
            </div>
            <div className="text-center">
              <button
                onClick={() => navigate("/instagram")}
                className="text-gray-500 hover:text-[#F24C00] transition-colors font-theseasons text-sm flex items-center mx-auto font-bold"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to previous step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
