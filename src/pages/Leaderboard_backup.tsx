import { useState, useEffect, useMemo } from "react";
import { leaderboard as fetchLeaderboard, addVote } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowLeft, Crown, Trophy, Medal, Star, Users, Clock, Share2, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import DynamicPoster from "../components/DynamicPoster";

// Types
interface Contestant {
  id: string;
  email: string;
  ig_username: string;
  totalVotes: number;
  name: string;
  tagline?: string;
}

const Leaderboard = () => {
  const [entries, setEntries] = useState<Contestant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [voteLoading, setVoteLoading] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [userEntry, setUserEntry] = useState<Contestant | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchLeaderboard();
        const sortedData = data.sort((a: Contestant, b: Contestant) => b.totalVotes - a.totalVotes);
        setEntries(sortedData);
        // Find user's own entry by email or ig_username from localStorage
        const userEmail = localStorage.getItem("userEmail") || "";
        const userIG = localStorage.getItem("userInstagram") || "";
        const user = sortedData.find(e => e.email === userEmail || e.ig_username === userIG);
        setUserEntry(user || null);
        setLoading(false);
      } catch (err) {
        setError("Error fetching leaderboard. Please try again.");
        setLoading(false);
      }
    })();
  }, []);

  // Search filter
  const filteredEntries = useMemo(() => {
    if (!search) return entries;
    return entries.filter((entry) =>
      entry.name.toLowerCase().includes(search.toLowerCase()) ||
      entry.ig_username?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, entries]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEntries = filteredEntries.slice(startIndex, endIndex);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Timer (static for now)
  const votingEnds = "2d 4h 33m";

  // Share handler (dummy)
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied! Share with your friends to get more votes!");
  };

  // Voting logic
  const handleVote = async (contestantId: string) => {
    const userEmail = localStorage.getItem("userEmail") || "";
    if (!userEmail) {
      setError("You must be logged in to vote.");
      return;
    }
    setVoteLoading(contestantId);
    try {
      await addVote(userEmail, contestantId);
      const data = await fetchLeaderboard();
      const sortedData = data.sort((a: Contestant, b: Contestant) => b.totalVotes - a.totalVotes);
      setEntries(sortedData);
    } catch (err) {
      setError("Could not register your vote. Please try again.");
    }
    setVoteLoading(null);
  };

  // Loading/empty state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[32px] p-8 shadow-2xl"
        >
          <span className="font-satoshi text-2xl text-[#7a4a00]">Loading leaderboard...</span>
        </motion.div>
      </div>
    );
  }
  if (!entries.length) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[32px] p-8 shadow-2xl"
        >
          <span className="font-satoshi text-2xl text-[#7a4a00]">No entries yet.</span>
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

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto pt-20 pb-12 px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6"
        >
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-[#7a4a00] font-satoshi font-medium text-lg hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          {/* Enhanced Voting Timer */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-[#FF9100] to-[#FFD592] rounded-full px-8 py-4 shadow-xl">
            <Clock className="w-6 h-6 text-white" />
            <div className="flex flex-col items-center">
              <span className="font-satoshi font-medium text-sm text-white/90">Voting ends in:</span>
              <span className="font-coolvetica font-bold text-2xl text-white">{votingEnds}</span>
            </div>
          </div>
          
          <div className="w-16"></div> {/* Spacer for balance */}
        </motion.div>
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="font-coolvetica text-5xl sm:text-6xl md:text-7xl text-[#3B2800] mb-4 leading-tight">
            Pick the best names in the game
          </h1>
          <p className="font-satoshi text-xl sm:text-2xl text-[#7a4a00] font-medium max-w-3xl mx-auto">
            You've got 3 votes. One went to your idea — the other two are up to you.
          </p>
        </motion.div>
        {/* Your Entry Section - Simplified */}
        {userEntry && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-4xl mx-auto mb-12"
          >
            <div className="bg-white rounded-[32px] p-8 shadow-2xl">
              <div className="flex items-center justify-between gap-8">
                {/* Poster */}
                <div className="flex-shrink-0">
                  <DynamicPoster 
                    userName={userEntry.name} 
                    userInstagram={userEntry.ig_username}
                  />
                </div>
                
                {/* Rank Display */}
                <div className="flex-1 text-center">
                  <div className="mb-4">
                    <span className="font-coolvetica text-6xl text-[#7a4a00] font-bold">
                      #{entries.findIndex(e => e.id === userEntry.id) + 1}
                    </span>
                    <p className="font-satoshi text-lg text-[#7a4a00] mt-2">Your Current Rank</p>
                  </div>
                </div>
                
                {/* Share Button */}
                <div className="flex-shrink-0">
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-3 bg-gradient-to-r from-[#FF9100] to-[#FFD592] text-white rounded-full px-8 py-4 shadow-lg hover:scale-105 transition-transform font-satoshi font-medium"
                  >
                    <Share2 className="w-6 h-6" />
                    Share Poster
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Share Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="w-full max-w-4xl mx-auto mb-12"
        >
          <div className="bg-black rounded-[32px] p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-2 text-white text-center sm:text-left">
                <span className="font-coolvetica text-2xl">Want more votes on your name?</span>
                <span className="font-satoshi font-medium text-base opacity-80">Share to your friends to get 5 votes to your name</span>
              </div>
              <button 
                onClick={handleShare}
                className="flex items-center gap-3 bg-white rounded-full px-8 py-4 shadow-lg hover:scale-105 transition-transform"
              >
                <Share2 className="w-5 h-5 text-black" />
                <span className="font-satoshi font-medium text-lg text-black">Share Ticket</span>
                <div className="flex items-center justify-center w-8 h-8 bg-black rounded-full">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>
          </div>
        </motion.div>
        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-2xl mx-auto mb-12"
        >
          <div className="bg-white rounded-full px-8 py-4 shadow-xl flex items-center gap-4">
            <Search className="w-6 h-6 text-[#7a4a00]" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search your friends name and vote them"
              className="w-full bg-transparent outline-none font-satoshi text-lg text-[#7a4a00] placeholder:text-[#7a4a00]/50"
            />
            {search && (
              <button 
                onClick={() => setSearch("")}
                className="flex items-center justify-center w-10 h-10 bg-[#ff9100] rounded-full hover:scale-110 transition-transform"
              >
                <span className="text-white font-bold">×</span>
              </button>
            )}
          </div>
        </motion.div>
        {/* Leaderboard */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-4xl mx-auto space-y-6"
        >
          {currentEntries.map((entry, idx) => {
            const globalRank = startIndex + idx;
            const isTop3 = globalRank < 3;
            
            return (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className={`rounded-[32px] shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${
                  isTop3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200' : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-6">
                  {/* Rank and Name */}
                  <div className="flex items-center gap-6">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-full text-white font-coolvetica text-xl font-bold shadow-lg ${
                      globalRank === 0 ? 'bg-gradient-to-br from-[#FFD700] to-[#FF9100]' : 
                      globalRank === 1 ? 'bg-gradient-to-br from-[#C0C0C0] to-[#FF9100]' : 
                      globalRank === 2 ? 'bg-gradient-to-br from-[#CD7F32] to-[#FF9100]' : 
                      'bg-gradient-to-br from-[#E0E0E0] to-[#FF9100] text-[#7a4a00]'
                    }`}>
                      {globalRank === 0 ? <Crown className="w-8 h-8" /> : 
                       globalRank === 1 ? <Trophy className="w-8 h-8" /> : 
                       globalRank === 2 ? <Medal className="w-8 h-8" /> : 
                       `#${globalRank + 1}`}
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`font-coolvetica text-2xl font-bold ${
                          isTop3 ? 'text-[#B8860B]' : 'text-[#7a4a00]'
                        }`}>
                          {entry.name}
                        </span>
                        <span className={`font-satoshi text-sm text-white px-3 py-1 rounded-full shadow-inner ${
                          isTop3 ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500]' : 'bg-gradient-to-r from-[#FF9100] to-[#FFD592]'
                        }`}>
                          {entry.totalVotes} votes
                        </span>
                      </div>
                      <div className="font-satoshi text-base text-[#7a4a00] flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">Submitted by:</span> 
                        <span className="font-bold">@{entry.ig_username}</span>
                      </div>
                    </div>
                  </div>

                  {/* Vote Button */}
                  {(entry.email !== userEntry?.email && entry.ig_username !== userEntry?.ig_username) && (
                    <button
                      onClick={() => handleVote(entry.id)}
                      disabled={voteLoading === entry.id}
                      className={`px-8 py-3 rounded-full font-satoshi text-base font-bold shadow-lg transition-all duration-200 ${
                        voteLoading === entry.id ? 'animate-pulse' : 'hover:scale-105'
                      } bg-gradient-to-r from-[#FF9100] to-[#FFD592] text-white hover:shadow-xl`}
                    >
                      {voteLoading === entry.id ? 'Voting...' : 'Vote'}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-4 mt-12"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-full font-satoshi font-bold transition-all ${
                    page === currentPage 
                      ? 'bg-gradient-to-r from-[#FF9100] to-[#FFD592] text-white shadow-lg' 
                      : 'bg-white text-[#7a4a00] shadow hover:shadow-lg'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-[#7a4a00]" />
            <span className="font-satoshi font-medium text-lg text-[#7a4a00]">Top 10 best names chosen by you guys</span>
          </div>
          <span className="font-coolvetica text-3xl text-[#3B2800]">Leaderboard</span>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full font-satoshi shadow-lg z-50"
          >
            {error}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard; 