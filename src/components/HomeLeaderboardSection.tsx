import { useState, useEffect, useMemo } from "react";
import { leaderboard as fetchLeaderboard, addVote } from "../lib/utils";
import { motion } from "framer-motion";
import { Search, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "../hooks/use-toast";

interface Contestant {
  id: string;
  email: string;
  ig_username: string;
  totalVotes: number;
  name: string;
  tagline?: string;
}

const HomeLeaderboardSection = () => {
  const [entries, setEntries] = useState<Contestant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [voteLoading, setVoteLoading] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchLeaderboard();
        const sortedData = data.sort((a: Contestant, b: Contestant) => b.totalVotes - a.totalVotes);
        setEntries(sortedData);
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
    <section className="w-full max-w-4xl mx-auto my-16 px-4 sm:px-0 bg-[#FFEBC4]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div className="bg-gray-50 rounded-2xl sm:rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-xl flex items-center gap-3 sm:gap-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search your friends name and vote them"
            className="w-full bg-transparent outline-none font-coolvetica text-base sm:text-lg text-[#7a4a00] placeholder:text-[#7a4a00]/80"
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
      >
        <div className="bg-gray-50 rounded-2xl sm:rounded-[32px] p-6 sm:p-12 sm:px-16 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col">
              {/* <h3 className="font-coolvetica text-3xl sm:text-4xl text-[#3B2800] font-bold">Leaderboard</h3> */}
              <span className="font-ivalencia font-bold mt-0 text-lg sm:text-xl text-[#7a4a00]">The best names chosen by you guys</span>
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
                            <span className="font-coolvetica text-xl text-[#7a4a00] g">
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
          className="flex items-center justify-center gap-4 mt-8"
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
    </section>
  );
};

export default HomeLeaderboardSection; 