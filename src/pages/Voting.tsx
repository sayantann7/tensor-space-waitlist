
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

    const updatedSubmissions = submissions.map(sub => 
      sub.id === submissionId ? { ...sub, votes: sub.votes + 1 } : sub
    ).sort((a, b) => b.votes - a.votes);

    const updatedUserVotes = {
      ...userVotes,
      used: userVotes.used + 1,
      votedFor: [...userVotes.votedFor, submissionId]
    };

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
    <div className="min-h-screen tensor-gradient p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light tensor-text mb-6 font-mono">
            Vote for Your Favorites
          </h1>
          <p className="tensor-muted mb-8 font-mono text-lg">
            Help decide the future name of our browser workspace extension
          </p>
          
          <div className="tensor-card rounded-none p-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 font-mono mb-2">{userVotes.total - userVotes.used}</div>
                <div className="text-sm tensor-muted font-mono uppercase tracking-wider">Votes Left</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 font-mono mb-2">{submissions.length}</div>
                <div className="text-sm tensor-muted font-mono uppercase tracking-wider">Total Entries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 font-mono mb-2">TOP 3</div>
                <div className="text-sm tensor-muted font-mono uppercase tracking-wider">Win Prizes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        {submissions.length > 0 && (
          <div className="mb-12">
            <Card className="tensor-card border-0">
              <CardHeader>
                <CardTitle className="tensor-text flex items-center font-mono text-xl font-light">
                  <Trophy className="w-6 h-6 mr-3 text-orange-400" />
                  CURRENT LEADERBOARD
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.slice(0, 3).map((submission, index) => (
                    <div key={submission.id} className="flex items-center justify-between p-6 tensor-card border border-orange-400/20">
                      <div className="flex items-center space-x-6">
                        <div className="text-3xl">{getRankIcon(index)}</div>
                        <div>
                          <div className="tensor-text font-mono font-medium text-lg mb-1">
                            {submission.names.join(" • ")}
                          </div>
                          {submission.tagline && (
                            <div className="tensor-muted font-mono text-sm mb-2">{submission.tagline}</div>
                          )}
                          {submission.instagram && (
                            <div className="text-orange-400 font-mono text-sm">@{submission.instagram}</div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold tensor-text font-mono">{submission.votes}</div>
                        <div className="text-sm tensor-muted font-mono uppercase">votes</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* All Submissions */}
        <div className="space-y-6">
          <h2 className="text-3xl font-light tensor-text mb-8 flex items-center font-mono">
            <Users className="w-8 h-8 mr-4 text-orange-400" />
            ALL SUBMISSIONS
          </h2>
          
          {submissions.length === 0 ? (
            <Card className="tensor-card border-0">
              <CardContent className="text-center py-16">
                <Vote className="w-16 h-16 tensor-muted mx-auto mb-6" />
                <h3 className="text-2xl font-light tensor-text mb-4 font-mono">No Submissions Yet</h3>
                <p className="tensor-muted font-mono">Be the first to submit a name suggestion!</p>
              </CardContent>
            </Card>
          ) : (
            submissions.map((submission, index) => (
              <Card key={submission.id} className="tensor-card hover:border-orange-400/50 transition-all duration-300 border-0">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-xl font-bold tensor-muted font-mono">
                          {getRankIcon(index)}
                        </span>
                        <div className="text-2xl font-medium tensor-text font-mono">
                          {submission.names.join(" • ")}
                        </div>
                        <Badge variant="secondary" className="bg-orange-400/20 text-orange-400 font-mono rounded-none px-3 py-1">
                          {submission.votes} votes
                        </Badge>
                      </div>
                      
                      {submission.tagline && (
                        <p className="tensor-muted mb-3 font-mono">{submission.tagline}</p>
                      )}
                      
                      <div className="flex items-center space-x-6 text-sm tensor-muted font-mono">
                        {submission.instagram && (
                          <span className="text-orange-400">@{submission.instagram}</span>
                        )}
                        <span>{new Date(submission.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="ml-6">
                      <Button
                        onClick={() => handleVote(submission.id)}
                        disabled={
                          isLoading || 
                          userVotes.used >= userVotes.total || 
                          userVotes.votedFor.includes(submission.id)
                        }
                        className={`
                          ${userVotes.votedFor.includes(submission.id) 
                            ? 'bg-green-600 hover:bg-green-700 border-green-600' 
                            : 'tensor-button'
                          } text-black font-mono font-medium px-6 py-3 rounded-none transition-all duration-300
                        `}
                      >
                        {userVotes.votedFor.includes(submission.id) ? (
                          <>
                            <Heart className="w-5 h-5 mr-2 fill-current" />
                            VOTED
                          </>
                        ) : (
                          <>
                            <Vote className="w-5 h-5 mr-2" />
                            VOTE
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
          <div className="mt-12 text-center">
            <Card className="tensor-card max-w-lg mx-auto border-0">
              <CardContent className="p-8">
                <Trophy className="w-16 h-16 text-orange-400 mx-auto mb-6" />
                <h3 className="text-2xl font-light tensor-text mb-4 font-mono">All Votes Cast!</h3>
                <p className="tensor-muted font-mono">
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
