import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getContestant, checkSubscriber, addVote } from "../lib/utils";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [voted, setVoted] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const [subCheckLoading, setSubCheckLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getContestant(id || "");
        setProfile(data.contestant);
        console.log("data : ",data.contestant)
        console.log("profile",profile)
        setLoading(false);
      } catch (err) {
        setError("Could not load contestant profile.");
        setLoading(false);
      }
    })();
  }, [id]);

  const handleCheckSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubCheckLoading(true);
    setError("");
    try {
      const isSub = await checkSubscriber(visitorEmail);
      if (isSub) {
        setSubscribed(true);
      } else {
        setError("You must be a subscriber to vote.");
      }
    } catch (err) {
      setError("Error checking subscriber. Please try again.");
    }
    setSubCheckLoading(false);
  };

  const handleVote = async () => {
    if (!subscribed || voted || !profile) return;
    setVoteLoading(true);
    setError("");
    try {
      const success = await addVote(visitorEmail, profile.email);
      if (success) {
        setVoted(true);
        setProfile({ ...profile, votes: (profile.votes || 0) + 1 });
      } else {
        setError("Could not register your vote. Please try again.");
      }
    } catch (err) {
      setError("Could not register your vote. Please try again.");
    }
    setVoteLoading(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500 font-coolvetica text-lg">Loading profile...</div>;
  if (error && !profile) return <div className="min-h-screen flex items-center justify-center text-red-500 font-coolvetica text-lg">{error}</div>;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden p-4 sm:p-6">
      {/* Side gradients */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-[500px] bg-gradient-to-r from-[#fba41b]/60 to-transparent z-0" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-[500px] bg-gradient-to-l from-[#fba41b]/60 to-transparent z-0" />
      <div className="w-full max-w-2xl mx-auto relative z-10">
        <div className="bg-white/90 rounded-3xl shadow-2xl border border-[#F24C00]/20 flex flex-col items-center p-8">
          <h1 className="text-3xl sm:text-4xl font-coolvetica text-[#F24C00] mb-2 text-center">{profile.name}</h1>
          <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center mt-6 mb-8">
            {/* Poster preview */}
            <div className="bg-white rounded-2xl shadow-lg border border-[#F24C00]/20 p-6 flex flex-col items-center w-full max-w-xs">
              <div className="text-2xl font-coolvetica text-[#F24C00] mb-2">{profile.name}</div>
              <div className="text-gray-700 font-theseasons text-sm mb-1">{profile.email}</div>
              {profile.instagram && <div className="text-[#F24C00] font-theseasons text-sm">@{profile.instagram}</div>}
              <div className="mt-4 mb-2">
                {/* Placeholder for QR code */}
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 font-bold text-lg">QR</div>
              </div>
              <div className="font-coolvetica text-base text-black mt-2">{profile.votes} votes</div>
            </div>
          </div>
          {!subscribed ? (
            <form onSubmit={handleCheckSubscriber} className="w-full max-w-xs mx-auto flex flex-col gap-4 items-center mb-6">
              <input
                type="email"
                value={visitorEmail}
                onChange={e => setVisitorEmail(e.target.value)}
                placeholder="Enter your email to vote"
                className="w-full px-5 py-3 rounded-xl border border-[#F24C00]/30 bg-white/80 text-lg font-theseasons focus:outline-none focus:ring-2 focus:ring-[#F24C00]/40 transition"
                required
              />
              <div className="relative flex justify-center items-center w-full">
                <div className="absolute inset-0 flex justify-center items-center z-0">
                  <div className="rounded-full w-[180px] h-[40px] bg-gradient-to-b from-[#fba41b]/70 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                  <div className="rounded-full w-[140px] h-[30px] bg-gradient-to-b from-[#fba41b]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                  <div className="rounded-full w-[100px] h-[20px] bg-gradient-to-b from-[#f24c00]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                </div>
                <button
                  type="submit"
                  className="relative z-10 px-6 py-2 rounded-full bg-gradient-to-b from-[#fba41b] to-[#fff3e0] shadow text-black font-coolvetica text-base flex items-center gap-2 border-2 border-[#fba41b]/60 hover:scale-105 transition-transform duration-200"
                  disabled={subCheckLoading}
                >
                  {subCheckLoading ? "Checking..." : "Continue"}
                </button>
              </div>
            </form>
          ) : (
            <div className="relative flex justify-center items-center w-full mb-6">
              <div className="absolute inset-0 flex justify-center items-center z-0">
                <div className="rounded-full w-[180px] h-[40px] bg-gradient-to-b from-[#fba41b]/70 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                <div className="rounded-full w-[140px] h-[30px] bg-gradient-to-b from-[#fba41b]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                <div className="rounded-full w-[100px] h-[20px] bg-gradient-to-b from-[#f24c00]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
              </div>
              <button
                onClick={handleVote}
                disabled={voted || voteLoading}
                className="relative z-10 px-6 py-2 rounded-full bg-gradient-to-b from-[#fba41b] to-[#fff3e0] shadow text-black font-coolvetica text-base flex items-center gap-2 border-2 border-[#fba41b]/60 hover:scale-105 transition-transform duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {voteLoading ? 'Voting...' : voted ? 'Voted' : 'Vote for this name'}
              </button>
            </div>
          )}
          {error && <div className="text-red-500 text-sm font-mono text-center mb-4">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Profile; 