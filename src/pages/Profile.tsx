import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getContestant, checkSubscriber, addVote } from "../lib/utils";
import { Users } from "lucide-react";

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
        setProfile({ ...profile, totalVotes: (profile.totalVotes || 0) + 1 });
      } else {
        setError("Could not register your vote. Please try again.");
      }
    } catch (err) {
      setError("Could not register your vote. Please try again.");
    }
    setVoteLoading(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500 font-satoshi text-lg">Loading profile...</div>;
  if (error && !profile) return <div className="min-h-screen flex items-center justify-center text-red-500 font-satoshi text-lg">{error}</div>;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden p-4 sm:p-6">
      {/* Side gradients */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-[500px] bg-gradient-to-r from-[#fba41b]/60 to-transparent z-0" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-[500px] bg-gradient-to-l from-[#fba41b]/60 to-transparent z-0" />
      <div className="w-full max-w-lg mx-auto relative z-10">
        <div className="bg-white/90 rounded-3xl shadow-2xl border border-[#F24C00]/20 flex flex-col items-center p-10">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-coolvetica text-[#F24C00] text-center mb-10 drop-shadow-lg">
            Vote for <br /><span className="text-black font-ivalencia font-bold">{profile.name}</span>
          </h1>

          {/* Votes Display */}
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-44 h-44 rounded-full bg-gradient-to-br from-[#fba41b]/40 to-[#fff3e0]/80 blur-2xl opacity-80"></div>
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#fba41b] to-[#fff3e0] flex flex-col items-center justify-center shadow-xl border-4 border-[#F24C00]/30 z-10">
                <Users className="w-12 h-12 text-[#F24C00] mb-2" />
                <span className="text-5xl font-coolvetica text-[#F24C00]">{profile.totalVotes}</span>
                <span className="text-lg font-ivalencia font-bold text-black mt-1">votes</span>
              </div>
            </div>
          </div>

          {/* Voting Section */}
          {!subscribed ? (
            <form onSubmit={handleCheckSubscriber} className="w-full max-w-xs mx-auto flex flex-col gap-4 items-center mb-6">
              <input
                type="email"
                value={visitorEmail}
                onChange={e => setVisitorEmail(e.target.value)}
                placeholder="Enter your email to vote"
                className="w-full px-5 py-3 text-black rounded-xl border border-[#F24C00]/30 bg-white/80 text-lg font-satoshi focus:outline-none focus:ring-2 focus:ring-[#F24C00]/40 transition"
                required
              />
              <div className="relative flex justify-center items-center w-full mt-4 mb-2">
                {/* Concentric borders */}
                <div className="absolute inset-0 flex justify-center items-center z-0">
                  <div className="rounded-full w-[210px] h-[85px] bg-gradient-to-b from-[#fba41b]/70 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                  <div className="rounded-full w-[190px] h-[75px] bg-gradient-to-b from-[#fba41b]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                  <div className="rounded-full w-[170px] h-[65px] bg-gradient-to-b from-[#f24c00]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                </div>
                {/* Main button */}
                <button
                  type="submit"
                  className="relative z-10 px-10 py-3 rounded-full bg-gradient-to-b from-[#fba41b] to-[#fff3e0] shadow-xl text-black font-satoshi text-lg flex items-center gap-4 border-2 border-[#fba41b]/60 hover:scale-105 transition-transform duration-200"
                  disabled={subCheckLoading}
                >
                  {subCheckLoading ? "Checking..." : "Continue"}
                </button>
              </div>
            </form>
          ) : (
            <div className="relative flex justify-center items-center w-full mb-6 mt-2">
              {/* Concentric borders */}
              <div className="absolute inset-0 flex justify-center items-center z-0">
                  <div className="rounded-full w-[280px] h-[85px] bg-gradient-to-b from-[#fba41b]/70 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                  <div className="rounded-full w-[260px] h-[75px] bg-gradient-to-b from-[#fba41b]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                  <div className="rounded-full w-[240px] h-[65px] bg-gradient-to-b from-[#f24c00]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                </div>
              {/* Main button */}
              <button
                onClick={handleVote}
                disabled={voted || voteLoading}
                className="relative z-10 px-10 py-3 rounded-full bg-gradient-to-b from-[#fba41b] to-[#fff3e0] shadow-xl text-black font-satoshi text-lg flex items-center gap-4 border-2 border-[#fba41b]/60 hover:scale-105 transition-transform duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
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