import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Poster = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("userEmail") || "");
    setName(localStorage.getItem("userName") || "");
    setInstagram(localStorage.getItem("userInstagram") || "");
    setShareLink(window.location.origin + "/profile/" + encodeURIComponent(email));
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden p-4 sm:p-6">
      {/* Side gradients */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-[500px] bg-gradient-to-r from-[#fba41b]/60 to-transparent z-0" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-[500px] bg-gradient-to-l from-[#fba41b]/60 to-transparent z-0" />
      <div className="w-full max-w-2xl mx-auto relative z-10">
        <div className="bg-white/90 rounded-3xl shadow-2xl border border-[#F24C00]/20 flex flex-col items-center p-8">
          <h1 className="text-3xl sm:text-4xl font-coolvetica text-[#F24C00] mb-2 text-center">Your Poster</h1>
          <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center mt-6 mb-8">
            {/* Poster preview */}
            <div className="bg-white rounded-2xl shadow-lg border border-[#F24C00]/20 p-6 flex flex-col items-center w-full max-w-xs">
              <div className="text-2xl font-coolvetica text-[#F24C00] mb-2">{name || 'Your Name Suggestion'}</div>
              <div className="text-gray-700 font-theseasons text-sm mb-1">{email}</div>
              {instagram && <div className="text-[#F24C00] font-theseasons text-sm">@{instagram}</div>}
              <div className="mt-4 mb-2">
                {/* Placeholder for QR code */}
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 font-bold text-lg">QR</div>
              </div>
              <div className="text-xs text-gray-400 break-all text-center">{shareLink}</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mt-4">
            <a
              href="https://www.canva.com/" // Replace with your Canva project link
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex justify-center items-center"
            >
              <div className="absolute inset-0 flex justify-center items-center z-0">
                <div className="rounded-full w-[300px] h-[70px] bg-gradient-to-b from-[#fba41b]/70 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                <div className="rounded-full w-[250px] h-[50px] bg-gradient-to-b from-[#fba41b]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                <div className="rounded-full w-[200px] h-[30px] bg-gradient-to-b from-[#f24c00]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
              </div>
              <span className="relative z-10 px-8 py-3 rounded-full bg-gradient-to-b from-[#fba41b] to-[#fff3e0] shadow-xl text-black font-coolvetica text-lg flex items-center gap-3 border-2 border-[#fba41b]/60 hover:scale-105 transition-transform duration-200">
                Edit Poster on Canva
              </span>
            </a>
            <div className="relative flex justify-center items-center">
              <div className="absolute inset-0 flex justify-center items-center z-0">
                <div className="rounded-full w-[300px] h-[70px] bg-gradient-to-b from-[#fba41b]/70 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                <div className="rounded-full w-[250px] h-[50px] bg-gradient-to-b from-[#fba41b]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                <div className="rounded-full w-[200px] h-[30px] bg-gradient-to-b from-[#f24c00]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
              </div>
              <button
                onClick={() => navigate("/voting")}
                className="relative z-10 px-8 py-3 rounded-full bg-gradient-to-b from-[#fba41b] to-[#fff3e0] shadow-xl text-black font-coolvetica text-lg flex items-center gap-3 border-2 border-[#fba41b]/60 hover:scale-105 transition-transform duration-200"
              >
                Go to Voting
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster; 