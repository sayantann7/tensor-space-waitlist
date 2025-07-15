import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getContestant, checkSubscriber, addVote } from "../lib/utils";
import { Users, ArrowLeft, Crown, Trophy, Sparkles, Heart, Mail, Instagram, CheckCircle, Award, Zap, Gift, Rocket, PartyPopper, Flame, Diamond } from "lucide-react";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  interface Contestant {
    id: string;
    email: string;
    ig_username: string;
    totalVotes: number;
    name: string;
  }
  
  const [profile, setProfile] = useState<Contestant>({} as Contestant);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[32px] p-8 shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 border-4 border-[#FF9100] border-t-transparent rounded-full animate-spin"></div>
            <span className="font-coolvetica text-2xl text-[#7a4a00]">Loading contestant profile...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[32px] p-8 shadow-2xl text-center"
        >
          <div className="text-red-500 font-coolvetica text-xl mb-4">{error}</div>
          <button
            onClick={() => navigate('/leaderboard')}
            className="px-6 py-3 bg-gradient-to-r from-[#FF9100] to-[#FFD592] text-[#3B2800] font-coolvetica rounded-full hover:scale-105 transition-transform"
          >
            Back to Leaderboard
          </button>
        </motion.div>
      </div>
    );
  }

  // Determine rank badge with more detailed tiers
  const getRankBadge = (votes: number) => {
    if (votes >= 100) return { icon: Diamond, color: 'from-purple-500 to-pink-500', text: 'Legend', glow: 'shadow-purple-500/50' };
    if (votes >= 75) return { icon: Crown, color: 'from-yellow-400 to-yellow-600', text: 'Champion', glow: 'shadow-yellow-500/50' };
    if (votes >= 50) return { icon: Flame, color: 'from-red-400 to-orange-500', text: 'Elite', glow: 'shadow-red-500/50' };
    if (votes >= 25) return { icon: Trophy, color: 'from-orange-400 to-orange-600', text: 'Master', glow: 'shadow-orange-500/50' };
    if (votes >= 10) return { icon: Rocket, color: 'from-blue-400 to-cyan-500', text: 'Rising', glow: 'shadow-blue-500/50' };
    return { icon: Users, color: 'from-gray-400 to-gray-600', text: 'Contestant', glow: 'shadow-gray-500/50' };
  };

  const rankBadge = getRankBadge(profile.totalVotes || 0);
  const RankIcon = rankBadge.icon;

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: "radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)" }}>
      {/* Decorative Images with enhanced positioning */}
      <img
        src="/top-left.png"
        alt="decor top left"
        className="pointer-events-none select-none absolute z-10 opacity-40"
        style={{
          top: '-2vw',
          left: '8vw',
          width: '38vw',
          minWidth: '280px',
          maxWidth: '650px',
          height: 'auto',
          objectFit: 'contain',
        }}
        aria-hidden="true"
      />
      <img
        src="/bottom-right.png"
        alt="decor bottom right"
        className="pointer-events-none select-none absolute z-10 opacity-40"
        style={{
          bottom: '-3vw',
          right: '8vw',
          width: '38vw',
          minWidth: '280px',
          maxWidth: '650px',
          height: 'auto',
          objectFit: 'contain',
        }}
        aria-hidden="true"
      />
      
      <motion.div
        animate={{
          y: [20, -20, 20],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-32 right-[20%] text-[#FFD592] opacity-25 z-10"
      >
        <Gift className="w-10 h-10" />
      </motion.div>

      {/* Orange blur background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full z-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)', filter: 'blur(60px)', opacity: 0.8 }} />

      <div className="relative z-20 w-full max-w-6xl mx-auto pt-12 pb-12 px-4">
        {/* Header with Back Button */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button 
            onClick={() => navigate('/leaderboard')} 
            className="flex items-center gap-2 text-[#7a4a00] font-coolvetica font-medium text-lg hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
            Check out Leaderboard
          </button>
        </motion.div>

        {/* Main Profile Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-4xl mx-auto mb-8"
        >
          <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden">
            <div className="relative p-8 lg:p-12">

              {/* Profile Header */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <h1 className="font-coolvetica text-4xl lg:text-6xl text-[#3B2800] mb-4 leading-tight">
                    Vote for
                  </h1>
                </motion.div>

                {/* Name Display with enhanced effects */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.3, type: "spring", bounce: 0.3 }}
                  className="relative mb-10"
                >
                  <div className="relative inline-block">
                    {/* Multiple glow layers for depth */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD592] rounded-[2rem] blur-2xl opacity-40 transform scale-125 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD592] rounded-[2rem] blur-lg opacity-50 transform scale-115"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD592] rounded-[2rem] blur opacity-60 transform scale-110"></div>
                    
                    {/* Main name container with glass effect */}
                    <div className="relative bg-gradient-to-r from-[#FF9100] via-[#FFD592] to-[#FF9100] text-[#3B2800] px-10 py-6 rounded-[2rem] shadow-2xl border-4 border-white/30 backdrop-blur-sm">
                      <div className="absolute inset-0 bg-white/10 rounded-[2rem]"></div>
                      <span className="font-ivalencia text-4xl lg:text-5xl font-bold relative z-10 drop-shadow-lg">{profile.name}</span>
                      
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced Votes Display with 3D effect */}
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", bounce: 0.4 }}
                  className="flex flex-col items-center justify-center mb-12"
                >
                  <div className="relative flex items-center justify-center mb-6">
                    {/* Multiple glow layers for depth */}
                    <div className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-[#FF9100]/20 to-[#FFD592]/30 blur-[40px] opacity-80 animate-pulse"></div>
                    <div className="absolute w-60 h-60 rounded-full bg-gradient-to-br from-[#FF9100]/30 to-[#FFD592]/40 blur-3xl opacity-90"></div>
                    <div className="absolute w-52 h-52 rounded-full bg-gradient-to-br from-[#FF9100]/40 to-[#FFD592]/50 blur-2xl opacity-80"></div>
                    
                    {/* Main vote circle with enhanced 3D effect */}
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 0.3 }}
                      className="w-56 h-56 rounded-full bg-gradient-to-br from-[#FF9100] via-[#FFD592] via-[#fff3e0] to-[#FF9100] flex flex-col items-center justify-center shadow-2xl border-8 border-white/60 z-10 relative backdrop-blur-sm"
                    >
                      {/* Inner glow and shine effects */}
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/30 to-transparent opacity-60"></div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF9100] to-[#FFD592] opacity-20 animate-pulse"></div>
                      
                      {/* Content */}
                      <div className="relative z-10 text-center p-12">
                        <Users className="w-12 h-12 text-[#3B2800] mb-6 drop-shadow-lg" />
                        <span className="text-6xl font-coolvetica text-[#3B2800] drop-shadow-xl">{profile.totalVotes || 0}</span>
                        <div className="text-xl font-ivalencia font-bold text-[#7a4a00] mt-4 drop-shadow-md">votes</div>
                      </div>
                      
                    </motion.div>
                  </div>
                  
                  {/* Achievement celebration */}
                  {/* {(profile.totalVotes || 0) >= 10 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="text-center"
                    >
                      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full text-sm font-coolvetica font-bold shadow-lg">
                        <Trophy className="w-4 h-4" />
                        Achievement Unlocked!
                      </div>
                    </motion.div>
                  )} */}
                </motion.div>

                {/* Enhanced Contestant Info with glass morphism */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, staggerChildren: 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-3xl mx-auto"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="flex items-center gap-6 p-6 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF9100] to-[#FFD592] rounded-2xl shadow-lg">
                      <Mail className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                    <div className="text-left flex-1">
                      <label className="font-coolvetica text-sm text-[#888] uppercase tracking-wider mb-1 block">Email Address</label>
                      <p className="font-coolvetica text-xl text-[#3B2800]">{profile.email}</p>
                    </div>
                  </motion.div>
                  
                  {profile.ig_username!="" ? (<motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="flex items-center gap-6 p-6 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF9100] to-[#FFD592] rounded-2xl shadow-lg">
                      <Instagram className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                    <div className="text-left flex-1">
                      <label className="font-coolvetica text-sm text-[#888] uppercase tracking-wider mb-1 block">Instagram Handle</label>
                      <p className="font-coolvetica text-xl text-[#3B2800]">@{profile.ig_username}</p>
                    </div>
                  </motion.div>) : (
                    <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="flex items-center gap-6 p-6 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF9100] to-[#FFD592] rounded-2xl shadow-lg">
                      <Instagram className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                    <div className="text-left flex-1">
                      <label className="font-coolvetica text-sm text-[#888] uppercase tracking-wider mb-1 block">Instagram Handle</label>
                      <p className="font-coolvetica text-xl text-[#3B2800]">Not provided</p>
                    </div>
                  </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Enhanced Voting Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring", bounce: 0.3 }}
                className="text-center"
              >
                {!subscribed ? (
                  <div className="max-w-lg mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="text-center mb-8"
                    >
                      <h3 className="font-coolvetica text-3xl text-[#3B2800] mb-3">Help "{profile.name}" climb the leaderboard!</h3>
                    </motion.div>
                    
                    <form onSubmit={handleCheckSubscriber} className="space-y-8">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.0 }}
                        className="relative"
                      >
                        <input
                          type="email"
                          value={visitorEmail}
                          onChange={e => setVisitorEmail(e.target.value)}
                          placeholder="Enter your email to vote"
                          className="w-full px-8 py-5 text-[#3B2800] rounded-3xl border-3 border-[#FF9100]/40 bg-white/90 backdrop-blur-sm text-xl font-satoshi focus:outline-none focus:border-[#FF9100] focus:ring-6 focus:ring-[#FF9100]/30 shadow-xl transition-all duration-300 placeholder:text-[#7a4a00]/60"
                          required
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100]/10 to-[#FFD592]/10 rounded-3xl -z-10 blur-xl"></div>
                      </motion.div>
                      
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                        whileHover={{ 
                          scale: 1.08, 
                          boxShadow: "0 25px 50px rgba(255, 145, 0, 0.5)",
                          y: -3
                        }}
                        whileTap={{ scale: 0.96 }}
                        type="submit"
                        className="w-full py-5 rounded-3xl bg-gradient-to-r from-[#FF9100] via-[#FFD592] to-[#FF9100] shadow-2xl text-[#3B2800] font-coolvetica text-xl font-bold hover:shadow-3xl transition-all duration-300 disabled:opacity-60 relative overflow-hidden group"
                        disabled={subCheckLoading}
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex items-center justify-center gap-3">
                          {subCheckLoading ? (
                            <>
                              <div className="w-7 h-7 border-3 border-current border-t-transparent rounded-full animate-spin"></div>
                              Verifying...
                            </>
                          ) : (
                            <>
                              <Zap className="w-7 h-7" />
                              Continue to Vote
                            </>
                          )}
                        </div>
                      </motion.button>
                    </form>
                  </div>
                ) : (
                  <div className="max-w-lg mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="text-center mb-8"
                    >
                      <h3 className="font-coolvetica text-3xl text-[#3B2800] mb-3">Ready to Vote?</h3>
                      <p className="font-satoshi text-[#7a4a00] text-lg">Your vote will make a difference!</p>
                    </motion.div>
                    
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.0, type: "spring", bounce: 0.4 }}
                      whileHover={{ 
                        scale: voted ? 1 : 1.05, 
                        boxShadow: voted ? "0 15px 30px rgba(34, 197, 94, 0.4)" : "0 20px 40px rgba(255, 145, 0, 0.4)"
                      }}
                      whileTap={{ scale: voted ? 1 : 0.98 }}
                      onClick={handleVote}
                      disabled={voted || voteLoading}
                      className={`w-full py-6 rounded-3xl shadow-2xl font-coolvetica text-xl font-bold transition-all duration-500 relative overflow-hidden group ${
                        voted 
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white cursor-default' 
                          : 'bg-gradient-to-r from-[#FF9100] via-[#FFD592] to-[#FF9100] text-[#3B2800] hover:shadow-3xl'
                      } disabled:opacity-60`}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10 flex items-center justify-center gap-4">
                        {voteLoading ? (
                          <>
                            <div className="w-7 h-7 border-3 border-current border-t-transparent rounded-full animate-spin"></div>
                            <span>Casting your vote...</span>
                          </>
                        ) : voted ? (
                          <>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", bounce: 0.6 }}
                            >
                              <CheckCircle className="w-8 h-8" />
                            </motion.div>
                            <span>Vote Successfully Submitted!</span>
                          </>
                        ) : (
                          <>
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Heart className="w-8 h-8" />
                            </motion.div>
                            <span>Vote for "{profile.name}"</span>
                          </>
                        )}
                      </div>
                      
                      {/* Celebratory particles for successful vote */}
                      {voted && (
                        <div className="absolute inset-0 pointer-events-none">
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                              animate={{ 
                                opacity: [0, 1, 0], 
                                scale: [0, 1, 0], 
                                x: Math.cos(i * 60 * Math.PI / 180) * 50,
                                y: Math.sin(i * 60 * Math.PI / 180) * 50
                              }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              className="absolute top-1/2 left-1/2 text-white"
                            >
                              <Heart className="w-4 h-4" />
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.button>
                  </div>
                )}
                
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl"
                  >
                    <p className="text-red-600 font-coolvetica">{error}</p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile; 