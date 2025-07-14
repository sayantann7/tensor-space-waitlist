import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Swords, Sparkles, Trophy, ArrowRight, ArrowLeft } from "lucide-react";
import { addToWaitlist } from "../lib/utils";
import { Progress } from "../components/ui/progress";

const Confirmation = () => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");

  const email = localStorage.getItem("userEmail") || "";
  const instagram = localStorage.getItem("userInstagram") || "";
  const name = localStorage.getItem("userName") || "";

  useEffect(() => {
    (async () => {
      try {
        const newUserData = await addToWaitlist(email, instagram, name);
        const id = await newUserData.newWaitlistEntry.id;
        localStorage.setItem("userId", id);
        setUserId(id);
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

  // Progress calculation
  const steps = ["/name", "/email", "/instagram", "/confirmation", "/poster"];
  const location = useLocation();
  const currentStep = steps.findIndex((step) => location.pathname.startsWith(step));
  const progressValue = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="relative min-h-screen flex flex-col items-start justify-start overflow-hidden" style={{ background: "radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)", minHeight: '100vh' }}>
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
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[100px] rounded-full z-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)', filter: 'blur(40px)', opacity: 0.7 }} />
      {/* Ticket-style card */}
      <div className="relative z-20 mx-auto mt-32 flex flex-col items-start w-[800px] max-w-full">
        <h2 className="text-2xl font-normal text-black mb-8 ml-4 font-coolvetica">Ready to enter the arena?</h2>
        <div
          className="flex w-full"
          style={{
            minHeight: 445,
            position: 'relative',
            boxShadow: '0 8px 64px 0 #ff910033',
            borderRadius: 48,
            overflow: 'visible',
            background: `url("data:image/svg+xml;utf8,<svg width='1124' height='680' viewBox='0 0 1124 449' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M162 0.5C162 17.3447 176.103 31 193.5 31C210.897 31 225 17.3447 225 0.5C225 0.333002 224.996 0.166361 224.993 0H1054C1083.97 0 1109.55 18.8407 1119.53 45.3252C1105.63 47.3654 1095 58.7552 1095 72.5C1095 87.6878 1107.98 100 1124 100V106C1107.98 106 1095 118.312 1095 133.5C1095 148.688 1107.98 161 1124 161V167C1107.98 167 1095 179.312 1095 194.5C1095 209.688 1107.98 222 1124 222V228C1107.98 228 1095 240.312 1095 255.5C1095 270.688 1107.98 283 1124 283V289C1107.98 289 1095 301.312 1095 316.5C1095 331.688 1107.98 344 1124 344V350C1107.98 350 1095 362.312 1095 377.5C1095 391.125 1105.45 402.434 1119.16 404.617C1108.94 430.605 1083.62 449 1054 449H224.962C224.987 448.503 225 448.003 225 447.5C225 430.655 210.897 417 193.5 417C176.103 417 162 430.655 162 447.5C162 448.003 162.013 448.503 162.038 449H70C40.5032 449 15.2684 430.755 4.96289 404.936C20.0637 403.978 32 392.062 32 377.5C32 362.312 19.0163 350 3 350C1.98706 350 0.986165 350.048 0 350.145V343.854C0.986196 343.951 1.98703 344 3 344C19.0163 344 32 331.688 32 316.5C32 301.312 19.0163 289 3 289C1.98706 289 0.986165 289.048 0 289.145V282.854C0.986196 282.951 1.98703 283 3 283C19.0163 283 32 270.688 32 255.5C32 240.312 19.0163 228 3 228C1.98706 228 0.986165 228.048 0 228.145V221.854C0.986196 221.951 1.98703 222 3 222C19.0163 222 32 209.688 32 194.5C32 179.312 19.0163 167 3 167C1.98706 167 0.986165 167.048 0 167.145V160.854C0.986196 160.951 1.98703 161 3 161C19.0163 161 32 148.688 32 133.5C32 118.312 19.0163 106 3 106C1.98706 106 0.986165 106.048 0 106.145V99.8545C0.986196 99.9506 1.98703 100 3 100C19.0163 100 32 87.6878 32 72.5C32 57.8152 19.862 45.8196 4.58105 45.041C14.6345 18.7058 40.1326 0 70 0H162.007C162.004 0.166361 162 0.333002 162 0.5Z' fill='white'/></svg>") center center / cover no-repeat`
          }}
        >
        
          {/* Left side: QR and message */} 
          <div className="flex flex-col items-center justify-center w-1/2 py-10 px-8 border-r border-dashed border-gray-300">
            <div className="text-2xl text-[#7a4a00] text-center mb-6 font-coolvetica">
              It’s time to show the<br />world your <span className="italic font-ivalencia">creativity.</span>
            </div>
            <img
                src={`https://quickchart.io/qr?text=https://contest.tensorboy.com/users/${userId}&size=400`}
                alt="QR Code"
                className="w-36 h-36 mx-auto rounded-lg"
              />
          </div>
          {/* Right side: user info and submit */}
          <div className="flex flex-col justify-center w-1/2 py-10 px-8 gap-6">
            <div className="flex items-center gap-3">
              <span className="bg-[#ededed] rounded-lg px-3 py-2 text-[#888] text-base font-normal font-coolvetica">Username :</span>
              <span className="text-black text-base font-normal font-coolvetica">{email}</span>
              <button className="ml-2 p-1 bg-gray-500 rounded hover:bg-gray-800"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg></button>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-[#ededed] rounded-lg px-3 py-2 text-[#888] text-base font-normal font-coolvetica">Suggested name:</span>
              <span className="text-black text-base font-normal font-coolvetica">{name}</span>
              <button className="ml-2 p-1 rounded bg-gray-500 hover:bg-gray-800"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg></button>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-[#ededed] rounded-lg px-3 py-2 text-[#888] text-base font-normal font-coolvetica">Instagram:</span>
              <span className="text-black text-base font-normal font-coolvetica">{instagram}</span>
              <button className="ml-2 p-1 rounded bg-gray-500 hover:bg-gray-800"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg></button>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-[#888] text-sm underline cursor-pointer font-coolvetica">Edit</span>
              <button
                onClick={handleProceed}
                disabled={isReady}
                className="w-[180px] py-4 rounded-full bg-black text-white font-normal text-lg transition-all duration-150 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed font-coolvetica"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
