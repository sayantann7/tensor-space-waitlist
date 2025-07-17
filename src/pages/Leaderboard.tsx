import { useState, useEffect, useMemo } from "react";
import { leaderboard as fetchLeaderboard, addVote } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowLeft, Crown, Trophy, Medal, Users, Clock, Share2, ArrowUpRight, ChevronLeft, ChevronRight, Instagram, Send, Download } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import DynamicPoster from "../components/DynamicPoster";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

// AnimatedArrowUpRight component (with direction prop)
const AnimatedArrowUpRight = ({ className = "", size = 24, isHovered = false, direction = "upright" }) => {
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    if (isHovered) setAnimKey((k) => k + 1);
  }, [isHovered]);
  const outgoing = direction === "vertical"
    ? { x: 0, y: 12, opacity: 0 }
    : { x: 12, y: -12, opacity: 0 };
  const incoming = direction === "vertical"
    ? { x: 0, y: -12, opacity: 0 }
    : { x: -12, y: 12, opacity: 0 };
  const atRest = { x: 0, y: 0, opacity: 1 };
  return (
    <span className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <motion.span
        key={"out-" + animKey}
        initial={atRest}
        animate={isHovered ? outgoing : atRest}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <ArrowUpRight width={size} height={size} />
      </motion.span>
      <motion.span
        key={"in-" + animKey}
        initial={incoming}
        animate={isHovered ? atRest : incoming}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <ArrowUpRight width={size} height={size} />
      </motion.span>
    </span>
  );
};

// AnimatedDownload component
const AnimatedDownload = ({ className = "", size = 24, isHovered = false, direction = "vertical" }) => {
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    if (isHovered) setAnimKey((k) => k + 1);
  }, [isHovered]);
  const outgoing = direction === "vertical"
    ? { x: 0, y: 12, opacity: 0 }
    : { x: 12, y: -12, opacity: 0 };
  const incoming = direction === "vertical"
    ? { x: 0, y: -12, opacity: 0 }
    : { x: -12, y: 12, opacity: 0 };
  const atRest = { x: 0, y: 0, opacity: 1 };
  return (
    <span className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <motion.span
        key={"out-" + animKey}
        initial={atRest}
        animate={isHovered ? outgoing : atRest}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <Download width={size} height={size} />
      </motion.span>
      <motion.span
        key={"in-" + animKey}
        initial={incoming}
        animate={isHovered ? atRest : incoming}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <Download width={size} height={size} />
      </motion.span>
    </span>
  );
};
// AnimatedSend component
const AnimatedSend = ({ className = "", size = 24, isHovered = false, direction = "upright" }) => {
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    if (isHovered) setAnimKey((k) => k + 1);
  }, [isHovered]);
  const outgoing = direction === "vertical"
    ? { x: 0, y: 12, opacity: 0 }
    : { x: 12, y: -12, opacity: 0 };
  const incoming = direction === "vertical"
    ? { x: 0, y: -12, opacity: 0 }
    : { x: -12, y: 12, opacity: 0 };
  const atRest = { x: 0, y: 0, opacity: 1 };
  return (
    <span className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <motion.span
        key={"out-" + animKey}
        initial={atRest}
        animate={isHovered ? outgoing : atRest}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <Send width={size} height={size} />
      </motion.span>
      <motion.span
        key={"in-" + animKey}
        initial={incoming}
        animate={isHovered ? atRest : incoming}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <Send width={size} height={size} />
      </motion.span>
    </span>
  );
};

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
  const { width, height } = useWindowSize();
  const [downloadHovered, setDownloadHovered] = useState(false);
  const [dmHovered, setDmHovered] = useState(false);
  const [posterFlipped, setPosterFlipped] = useState(false);

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

  useEffect(() => { setPosterFlipped(true); }, []);

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
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Confetti Effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <Confetti 
          width={width} 
          height={height} 
          recycle={false} 
          numberOfPieces={300}
          gravity={0.3}
          initialVelocityY={20}
        />
      </div>
      
      {/* HERO SECTION - with responsive background images */}
      <div
        className="relative w-full min-h-screen z-10 bg-[url('/mobile-form-bg.png')] sm:bg-[url('/form-bg.png')] bg-cover bg-center bg-no-repeat"
      >
        

        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full z-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 60% 60%, #ff9100 0%, #ffe0b2 100%)', filter: 'blur(40px)', opacity: 0.7 }} />

        <div className="relative z-20 w-full max-w-6xl mx-auto pt-8 sm:pt-12 pb-8 sm:pb-12 px-4 sm:px-6">
          {/* Header */}
          {/* <motion.div
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
          </motion.div> */}

          {/* Congratulations Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full mx-auto mb-8 sm:mb-12 px-4 sm:px-0 text-center"
          >
            <h1 className="font-coolvetica text-4xl sm:text-6xl lg:text-7xl text-white leading-tight drop-shadow-2xl">
              🎉Congratulations!
            </h1>
            <p className="font-coolvetica text-xl sm:text-3xl lg:text-3xl text-white/90 font-medium mt-4 drop-shadow-lg">
              You made it to the LEADERBOARD!
            </p>
          </motion.div>

          {/* User Poster Section */}
          {userEntry && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 py-8"
              style={{ minHeight: '60vh' }}
            >
              {/* Left: Texts */}
              <div className="flex-1 flex flex-col items-start justify-center text-left max-w-xl">
                <h2 className="font-coolvetica text-3xl sm:text-5xl text-black mb-2" >
                  You just named the future.
                </h2>
                <p className="font-coolvetica text-lg sm:text-2xl text-black mb-6" >
                  We turned your idea into a shareable poster.
                </p>
              </div>
              
              {/* Right: Poster and Buttons */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <div
                  className="relative"
                  onMouseEnter={() => setPosterFlipped(true)}
                  onMouseLeave={() => setPosterFlipped(false)}
                >
                  <motion.div
                    className="drop-shadow-2xl mb-4"
                    initial={{ rotateY: 0, rotateZ: -12 }}
                    animate={{ rotateY: posterFlipped ? 360 : 0, rotateZ: -12 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <DynamicPoster
                      userName={userEntry.name}
                      userInstagram={userEntry.ig_username}
                    />
                  </motion.div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center items-center">
                  <button
                    onClick={() => {
                      const posterElement = document.querySelector('[data-poster-ref]');
                      if (posterElement) {
                        const event = new CustomEvent('downloadPoster');
                        posterElement.dispatchEvent(event);
                      }
                    }}
                    onMouseEnter={() => setDownloadHovered(true)}
                    onMouseLeave={() => setDownloadHovered(false)}
                    className="flex items-center bg-black text-white font-coolvetica text-xl sm:text-lg px-6 sm:px-8 py-3 sm:py-3 rounded-full shadow-xl gap-2 sm:gap-1 pr-2 sm:pr-6 hover:scale-105 transition-transform border-2 border-white/80"
                  >
                    Download Poster
                    <span className="ml-2 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black border border-black">
                      <AnimatedDownload size={28} isHovered={downloadHovered} direction="vertical" />
                    </span>
                  </button>
                  <button
                    onClick={handleShare}
                    onMouseEnter={() => setDmHovered(true)}
                    onMouseLeave={() => setDmHovered(false)}
                    className="flex items-center bg-black text-white font-coolvetica text-xl sm:text-lg px-6 sm:px-8 py-3 sm:py-3 rounded-full shadow-xl gap-2 sm:gap-1 pr-2 sm:pr-6 hover:scale-105 transition-transform border-2 border-white/80"
                  >
                    DM it to friends
                    <span className="ml-2 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black border border-black">
                      <AnimatedSend size={28} isHovered={dmHovered} />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* MAIN SECTION - with #FFEBC4 background */}
      <div className="w-full" style={{ backgroundColor: '#FFEBC4' }}>
        <div className="relative z-20 w-full max-w-6xl mx-auto pt-8 sm:pt-12 pb-8 sm:pb-12 px-4 sm:px-6">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-4xl mx-auto mb-8 sm:mb-8 px-4 sm:px-0"
          >
            <div className="bg-gray-50 rounded-2xl sm:rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-xl flex items-center gap-3 sm:gap-4">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search your friends name and vote them."
                className="w-full bg-transparent outline-none font-coolvetica text-base sm:text-lg text-[#7a4a00] placeholder:text-[#7a4a00]/80"
              />
              <button className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full hover:scale-110 transition-transform flex-shrink-0">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-4xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0"
          >
            <div className="bg-gray-50 rounded-2xl sm:rounded-[32px] p-6 sm:p-12 sm:px-16 shadow-2xl">
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

          {/* Pagination */}
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

          {/* Error Message */}
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
    </div>
  );
};

export default Leaderboard;