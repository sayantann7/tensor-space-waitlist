
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vote, Trophy, Users, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Submission {
  id: string;
  email: string;
  instagram: string;
  names: string[];
  tagline: string;
  votes: number;
  timestamp: string;
}

const Voting = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [userVotes, setUserVotes] = useState({ total: 3, used: 0, votedFor: [] as string[] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load submissions and user votes
    const savedSubmissions = JSON.parse(localStorage.getItem("submissions") || "[]");
    const savedUserVotes = JSON.parse(localStorage.getItem("userVotes") || JSON.stringify({ total: 3, used: 0, votedFor: [] }));
    
    setSubmissions(savedSubmissions.sort((a: Submission, b: Submission) => b.votes - a.votes));
    setUserVotes(savedUserVotes);
  }, []);

  const handleVote = async (submissionId: string) => {
    if (userVotes.used >= userVotes.total) {
      toast({
        title: "No Votes Left",
        description: "You've used all your votes!",
        variant: "destructive",
      });
      return;
    }

    if (userVotes.votedFor.includes(submissionId)) {
      toast({
        title: "Already Voted",
        description: "You've already voted for this submission.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Update votes
    const updatedSubmissions = submissions.map(sub => 
      sub.id === submissionId ? { ...sub, votes: sub.votes + 1 } : sub
    ).sort((a, b) => b.votes - a.votes);

    const updatedUserVotes = {
      ...userVotes,
      used: userVotes.used + 1,
      votedFor: [...userVotes.votedFor, submissionId]
    };

    // Save to localStorage
    localStorage.setItem("submissions", JSON.stringify(updatedSubmissions));
    localStorage.setItem("userVotes", JSON.stringify(updatedUserVotes));

    setSubmissions(updatedSubmissions);
    setUserVotes(updatedUserVotes);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Vote Cast!",
        description: `You have ${updatedUserVotes.total - updatedUserVotes.used} votes remaining.`,
      });
    }, 500);
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Vote for Your Favorites
          </h1>
          <p className="text-gray-400 mb-6">
            Help decide the future name of our browser workspace extension
          </p>
          
          <div className="glass-effect rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{userVotes.total - userVotes.used}</div>
                <div className="text-sm text-gray-400">Votes Left</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">{submissions.length}</div>
                <div className="text-sm text-gray-400">Total Entries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">Top 3</div>
                <div className="text-sm text-gray-400">Win Prizes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        {submissions.length > 0 && (
          <div className="mb-8">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                  Current Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.slice(0, 3).map((submission, index) => (
                    <div key={submission.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{getRankIcon(index)}</div>
                        <div>
                          <div className="text-white font-semibold">
                            {submission.names.join(", ")}
                          </div>
                          {submission.tagline && (
                            <div className="text-gray-400 text-sm">{submission.tagline}</div>
                          )}
                          {submission.instagram && (
                            <div className="text-purple-400 text-sm">@{submission.instagram}</div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{submission.votes}</div>
                        <div className="text-sm text-gray-400">votes</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* All Submissions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Users className="w-6 h-6 mr-2" />
            All Submissions
          </h2>
          
          {submissions.length === 0 ? (
            <Card className="glass-effect">
              <CardContent className="text-center py-12">
                <Vote className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Submissions Yet</h3>
                <p className="text-gray-400">Be the first to submit a name suggestion!</p>
              </CardContent>
            </Card>
          ) : (
            submissions.map((submission, index) => (
              <Card key={submission.id} className="glass-effect hover:neon-border transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-lg font-bold text-gray-400">
                          {getRankIcon(index)}
                        </span>
                        <div className="text-xl font-bold text-white">
                          {submission.names.join(" • ")}
                        </div>
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                          {submission.votes} votes
                        </Badge>
                      </div>
                      
                      {submission.tagline && (
                        <p className="text-gray-400 mb-2">{submission.tagline}</p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {submission.instagram && (
                          <span className="text-purple-400">@{submission.instagram}</span>
                        )}
                        <span>{new Date(submission.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <Button
                        onClick={() => handleVote(submission.id)}
                        disabled={
                          isLoading || 
                          userVotes.used >= userVotes.total || 
                          userVotes.votedFor.includes(submission.id)
                        }
                        className={`
                          ${userVotes.votedFor.includes(submission.id) 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                          } text-white transition-all duration-300
                        `}
                      >
                        {userVotes.votedFor.includes(submission.id) ? (
                          <>
                            <Heart className="w-4 h-4 mr-2 fill-current" />
                            Voted
                          </>
                        ) : (
                          <>
                            <Vote className="w-4 h-4 mr-2" />
                            Vote
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {userVotes.used >= userVotes.total && (
          <div className="mt-8 text-center">
            <Card className="glass-effect max-w-md mx-auto">
              <CardContent className="p-6">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">All Votes Cast!</h3>
                <p className="text-gray-400">
                  Thanks for participating! Share your submission to get more votes.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Voting;
