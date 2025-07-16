import { useState, useEffect, useMemo } from "react";
import { leaderboard as fetchLeaderboard, addVote } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowLeft, Crown, Trophy, Medal, Users, Clock, Share2, ArrowUpRight, ChevronLeft, ChevronRight, Instagram, Send, Download } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import DynamicPoster from "../components/DynamicPoster";

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

  const filteredEntries = useMemo(() => {
    if (!search) return entries;
    return entries.filter((entry) =>
      entry.name.toLowerCase().includes(search.toLowerCase()) ||
      entry.ig_username?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, entries]);

  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEntries = filteredEntries.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const votingEnds = "2d 4h 33m";

  const { toast } = useToast();
  const handleShare = async () => {
    if (!userEntry) return;
    const link = `https://contest.tensorboy.com/users/${userEntry.id}`;
    try {
      await navigator.clipboard.writeText(link);
      toast({
        title: "🎉 Link Copied!",
        description: "Share this link with friends to get more votes!",
        className: "font-coolvetica border-[#FF9100]/30 bg-white/95 backdrop-blur-sm shadow-xl text-sm sm:text-base max-w-sm sm:max-w-md",
      });
    } catch (err) {
      toast({
        title: "❌ Failed to copy",
        description: "Please try copying the link again.",
        variant: "destructive",
        className: "font-coolvetica border-red-200 bg-white/95 backdrop-blur-sm shadow-xl text-sm sm:text-base max-w-sm sm:max-w-md",
      });
    }
  };

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

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: "radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)" }}>
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

      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full z-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)', filter: 'blur(40px)', opacity: 0.7 }} />

      <div className="relative z-20 w-full max-w-6xl mx-auto pt-8 sm:pt-12 pb-8 sm:pb-12 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 sm:mb-12 gap-4 sm:gap-6"
        >
          <div className="flex items-center gap-2">
            <span className="font-coolvetica text-2xl sm:text-3xl text-[#3B2800] font-bold">Tensor Space</span>
          </div>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-white text-[#3B2800] font-coolvetica font-medium text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            Enter Contest
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-4xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0"
        >
          <div className="bg-black rounded-2xl sm:rounded-[32px] p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-2 text-white text-center sm:text-left">
                <span className="font-coolvetica text-xl sm:text-2xl">Want more votes on your name?</span>
                <span className="font-coolvetica font-medium text-sm sm:text-base opacity-80">Share to your friends to get 5 votes to your name</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-3 bg-white rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-lg hover:scale-105 transition-transform"
              >
                <Share2 className="w-5 h-5 text-black" />
                <span className="font-coolvetica font-medium text-base sm:text-lg text-black">Share Ticket</span>
                <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {userEntry && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-4xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
              <div className="flex-shrink-0">
                <DynamicPoster
                  userName={userEntry.name}
                  userInstagram={userEntry.ig_username}
                />
              </div>

              <div className="flex flex-col items-center sm:items-start gap-4">
                <div className="text-center sm:text-left">
                  <h2 className="font-coolvetica text-3xl sm:text-4xl text-white font-bold mb-2">
                    "{userEntry.name}"
                  </h2>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-[#FF9100] to-[#FFD592] rounded-full px-4 py-2 shadow-lg">
                    <span className="font-coolvetica text-sm sm:text-base text-[#3B2800] font-bold">
                      {userEntry.totalVotes}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-coolvetica text-base sm:text-lg text-white">Username:</span>
                    <span className="font-coolvetica text-base sm:text-lg text-white font-medium">
                      {userEntry.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-coolvetica text-base sm:text-lg text-white">Instagram:</span>
                    <span className="font-coolvetica text-base sm:text-lg text-white font-medium">
                      {userEntry.ig_username}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button
                    onClick={() => {
                      const posterElement = document.querySelector('[data-poster-ref]');
                      if (posterElement) {
                        const event = new CustomEvent('downloadPoster');
                        posterElement.dispatchEvent(event);
                      }
                    }}
                    className="flex items-center gap-2 bg-black text-white rounded-full px-6 py-3 shadow-lg hover:scale-105 transition-transform font-coolvetica font-medium"
                  >
                    <span>Download Poster</span>
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 bg-black text-white rounded-full px-6 py-3 shadow-lg hover:scale-105 transition-transform font-coolvetica font-medium"
                  >
                    <span>DM it to friends</span>
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-4xl mx-auto mb-8 sm:mb-8 px-4 sm:px-0"
        >
          <div className="bg-white rounded-2xl sm:rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-xl flex items-center gap-3 sm:gap-4">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search your friends name and vote them."
              className="w-full bg-transparent outline-none font-coolvetica text-base sm:text-lg text-[#7a4a00] placeholder:text-[#7a4a00]/50"
            />
            <button className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full hover:scale-110 transition-transform flex-shrink-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-4xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0"
        >
          <div className="bg-gray-100 rounded-2xl sm:rounded-[32px] p-6 sm:p-12 sm:px-16 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col">
                <h3 className="font-coolvetica text-3xl sm:text-4xl text-[#3B2800] font-bold">Leaderboard</h3>
                <span className="font-ivalencia font-bold mt-2 text-lg sm:text-xl text-[#7a4a00]">The best names chosen by you guys</span>
              </div>
            </div>

            <div className="space-y-3">
              {currentEntries.slice(0, 10).map((entry, idx) => {
                // Find the global rank of this entry in the full sorted leaderboard
                const globalRank = entries.findIndex(e => e.id === entry.id);
                const isTop3 = globalRank < 3;

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className={`rounded-xl p-4 transition-all duration-300 ${isTop3 ? 'bg-gradient-to-r from-[#FF9100]/20 to-white' : 'bg-white'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-lg font-coolvetica text-3xl font-bold ${isTop3 ? 'text-white' : 'bg-gray-200 text-gray-500'}`} style={isTop3 ? { background: 'linear-gradient(358deg, #FFD592 1.78%, #FF733C 98.22%)' } : {}}>
                          #{globalRank + 1}
                        </div>

                        <div className="flex flex-col gap-1">
                          <div className="flex items-center">
                            {isTop3 ? (
                              <span className="text-white font-coolvetica text-xl px-3 py-1 rounded-full" style={{ background: 'linear-gradient(358deg, #FFD592 1.78%, #FF733C 98.22%)' }}>
                                {entry.name}
                              </span>
                            ) : (
                              <span className="font-coolvetica text-xl text-[#7a4a00]">
                                {entry.name}
                              </span>
                            )}
                          </div>
                          <div className="font-coolvetica text-base text-[#7a4a00] flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {entry.ig_username.startsWith("@") ? (
                              <span>{entry.ig_username}</span>
                            ) : (
                              <span>@{entry.ig_username}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <button
                          onClick={() => handleVote(entry.id)}
                          disabled={voteLoading === entry.id}
                          className={`h-10 px-5 rounded-full font-coolvetica text-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 ${voteLoading === entry.id ? 'animate-pulse' : 'hover:scale-105'} ${isTop3 ? 'text-white' : 'bg-gray-200 text-gray-500'}`}
                          style={isTop3 ? { background: 'linear-gradient(358deg, #FFD592 1.78%, #FF733C 98.22%)' } : {}}
                        >
                          <span className="text-2xl">👍</span>
                          <span className="ml-2 text-xl">{entry.totalVotes}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-4 mt-0"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-12 h-12 rounded-full font-coolvetica font-bold text-xl transition-all ${page === currentPage
                    ? 'text-white shadow-lg'
                    : 'bg-white text-[#7a4a00] shadow hover:shadow-lg'
                  }`}
                  style={page === currentPage ? { background: 'linear-gradient(358deg, #FFD592 1.78%, #FF733C 98.22%)' } : {}}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-black"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full font-coolvetica shadow-lg z-50"
          >
            {error}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;