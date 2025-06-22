import { useState, useEffect } from "react";
import { leaderboard as fetchLeaderboard, addVote } from "../lib/utils";
import { Link } from "react-router-dom";

type Contestant = {
  id: string;
  email: string;
  ig_username: string;
  totalVotes: number;
  name: string;
};

const Voting = () => {
  const [entries, setEntries] = useState<Contestant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [voteLoading, setVoteLoading] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchLeaderboard();
        // Sort entries by totalVotes once on fetch
        const sortedData = data.sort((a: Contestant, b: Contestant) => b.totalVotes - a.totalVotes);
        setEntries(sortedData);
        setLoading(false);
      } catch (err) {
        setError("Error fetching leaderboard. Please try again.");
        setLoading(false);
      }
    })();
  }, []);

  const handleVote = async (contestantId: string) => {
    const userEmail = localStorage.getItem("userEmail") || "";
    if (!userEmail) {
      setError("You must be logged in to vote.");
      return;
    }
    setVoteLoading(contestantId);
    try {
      await addVote(userEmail, contestantId);
      // Re-fetch and sort to ensure data consistency after voting
      const data = await fetchLeaderboard();
      const sortedData = data.sort((a: Contestant, b: Contestant) => b.totalVotes - a.totalVotes);
      setEntries(sortedData);
    } catch (err) {
      setError("Could not register your vote. Please try again.");
    }
    setVoteLoading(null);
  };

  const topThree = entries.slice(0, 3);
  const otherEntries = entries.slice(3);

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
          {topThree.map((entry, idx) => (
            <div
              key={entry.id}
              className={`flex-1 bg-white/90 rounded-2xl shadow-lg border-2 p-6 flex flex-col items-center text-center ${
                idx === 0 ? 'border-yellow-400' : idx === 1 ? 'border-gray-400' : 'border-orange-400'
              }`}
            >
              <div className={`text-3xl mb-2 font-coolvetica ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-500' : 'text-orange-500'}`}>
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
              </div>
              <div className="font-coolvetica text-xl text-[#F24C00] mb-1 truncate w-full" title={entry.name}>{entry.name}</div>
              <div className="font-coolvetica text-lg text-black">{entry.totalVotes} votes</div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-coolvetica text-[#F24C00] mb-6 text-center">All Entries</h2>
        <div className="flex flex-col gap-4 mb-16">
          {otherEntries.map((entry, idx) => (
            <div key={entry.id} className="bg-white/90 rounded-2xl shadow-md border border-[#F24C00]/20 p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-coolvetica text-lg text-gray-500 w-6 text-center">{idx + 4}</span>
                <div className="font-coolvetica text-lg text-[#F24C00]">{entry.name}</div>
              </div>
              <div className="text-right">
                <div className="font-coolvetica text-base text-black mb-2">{entry.totalVotes} votes</div>
                <button
                  onClick={() => handleVote(entry.id)}
                  disabled={voteLoading === entry.id}
                  className="relative z-10 px-6 py-2 rounded-full bg-gradient-to-b from-[#fba41b] to-[#fff3e0] shadow text-black font-coolvetica text-sm flex items-center gap-2 border-2 border-[#fba41b]/60 hover:scale-105 transition-transform duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {voteLoading === entry.id ? 'Voting...' : 'Vote'}
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