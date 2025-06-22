import { useState, useEffect } from "react";
import { leaderboard as fetchLeaderboard, addVote } from "../lib/utils";

const Voting = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [voted, setVoted] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [voteLoading, setVoteLoading] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchLeaderboard();
        setEntries(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching leaderboard. Please try again.");
        setLoading(false);
      }
    })();
  }, []);

  const handleVote = async (contestantEmail: string) => {
    const userEmail = localStorage.getItem("userEmail") || "";
    if (!userEmail || voted.includes(contestantEmail)) return;
    setVoteLoading(contestantEmail);
    try {
      const success = await addVote(userEmail, contestantEmail);
      if (success) {
        setEntries(entries => entries.map(e => e.submitter === contestantEmail ? { ...e, votes: e.votes + 1 } : e));
        setVoted([...voted, contestantEmail]);
      } else {
        setError("Could not register your vote. Please try again.");
      }
    } catch (err) {
      setError("Could not register your vote. Please try again.");
    }
    setVoteLoading(null);
  };

  const leaderboard = [...entries].sort((a, b) => b.votes - a.votes).slice(0, 3);

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-white overflow-hidden p-4 sm:p-6">
      {/* Side gradients */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-[500px] bg-gradient-to-r from-[#fba41b]/60 to-transparent z-0" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-[500px] bg-gradient-to-l from-[#fba41b]/60 to-transparent z-0" />
      <div className="w-full max-w-3xl mx-auto relative z-10">
        <h1 className="text-3xl sm:text-4xl font-coolvetica text-[#F24C00] mb-8 text-center mt-8">Leaderboard</h1>
        {loading ? (
          <div className="text-center text-gray-500 font-coolvetica text-lg my-12">Loading leaderboard...</div>
        ) : error ? (
          <div className="text-center text-red-500 font-coolvetica text-lg my-12">{error}</div>
        ) : (
        <>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          {leaderboard.map((entry, idx) => (
            <div
              key={entry.id}
              className={`flex-1 bg-white/90 rounded-2xl shadow-lg border-2 p-6 flex flex-col items-center ${
                idx === 0 ? 'border-yellow-400' : idx === 1 ? 'border-gray-400' : 'border-orange-400'
              }`}
            >
              <div className={`text-3xl mb-2 font-coolvetica ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-500' : 'text-orange-500'}`}>
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
              </div>
              <div className="font-coolvetica text-xl text-[#F24C00] mb-1">{entry.name}</div>
              <div className="text-gray-500 text-xs mb-2">by {entry.submitter}</div>
              <div className="font-coolvetica text-lg text-black">{entry.votes} votes</div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-coolvetica text-[#F24C00] mb-6 text-center">All Entries</h2>
        <div className="flex flex-col gap-6 mb-16">
          {entries.map(entry => (
            <div key={entry.id} className="bg-white/90 rounded-2xl shadow-md border border-[#F24C00]/20 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-coolvetica text-lg text-[#F24C00] mb-1">{entry.name}</div>
                <div className="text-gray-500 text-xs mb-2">by {entry.submitter}</div>
                <div className="font-coolvetica text-base text-black">{entry.votes} votes</div>
              </div>
              <div className="relative flex justify-center items-center">
                <div className="absolute inset-0 flex justify-center items-center z-0">
                  <div className="rounded-full w-[120px] h-[40px] bg-gradient-to-b from-[#fba41b]/70 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                  <div className="rounded-full w-[90px] h-[30px] bg-gradient-to-b from-[#fba41b]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                  <div className="rounded-full w-[60px] h-[20px] bg-gradient-to-b from-[#f24c00]/80 to-transparent opacity-100 absolute" style={{filter:'blur(0.5px)'}}></div>
                </div>
                <button
                  onClick={() => handleVote(entry.submitter)}
                  disabled={voted.includes(entry.submitter) || voteLoading === entry.submitter}
                  className="relative z-10 px-6 py-2 rounded-full bg-gradient-to-b from-[#fba41b] to-[#fff3e0] shadow text-black font-coolvetica text-base flex items-center gap-2 border-2 border-[#fba41b]/60 hover:scale-105 transition-transform duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {voteLoading === entry.submitter ? 'Voting...' : voted.includes(entry.submitter) ? 'Voted' : 'Vote'}
                </button>
              </div>
            </div>
          ))}
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default Voting; 