
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share2, Download, Vote, Trophy, QrCode, Instagram, ExternalLink } from "lucide-react";
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

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [rank, setRank] = useState(0);
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  useEffect(() => {
    if (!id) return;
    
    const submissions = JSON.parse(localStorage.getItem("submissions") || "[]");
    const sortedSubmissions = submissions.sort((a: Submission, b: Submission) => b.votes - a.votes);
    const foundSubmission = sortedSubmissions.find((sub: Submission) => sub.id === id);
    
    if (foundSubmission) {
      setSubmission(foundSubmission);
      setRank(sortedSubmissions.indexOf(foundSubmission) + 1);
      setTotalSubmissions(submissions.length);
    }
  }, [id]);

  const handleShare = async () => {
    const shareData = {
      title: `Vote for "${submission?.names.join(' or ')}" - Browser Workspace Naming Contest`,
      text: `I named this browser workspace. Help me win! Vote for my brainchild: "${submission?.names.join(' or ')}"`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({
          title: "Shared!",
          description: "Thanks for spreading the word!",
        });
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied!",
          description: "Share this link to get more votes!",
        });
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Share this link to get more votes!",
      });
    }
  };

  const generatePosterContent = () => {
    if (!submission) return "";
    
    return `
🚀 BROWSER WORKSPACE NAMING CONTEST 🚀

"${submission.names.join('" or "')}"

${submission.tagline ? `💡 ${submission.tagline}` : ''}

Vote for my suggestion! 
Made for hackers, by hackers.

${submission.instagram ? `Created by @${submission.instagram}` : ''}

🔗 ${window.location.href}

#BrowserWorkspace #NamingContest #TensorBoy
    `.trim();
  };

  const handleDownloadPoster = () => {
    const content = generatePosterContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${submission?.names[0] || 'submission'}-poster.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Poster Downloaded!",
      description: "Share this content on your social media!",
    });
  };

  const getRankBadge = () => {
    if (rank === 1) return { text: "🥇 1st Place", color: "bg-yellow-600" };
    if (rank === 2) return { text: "🥈 2nd Place", color: "bg-gray-400" };
    if (rank === 3) return { text: "🥉 3rd Place", color: "bg-orange-600" };
    return { text: `#${rank} of ${totalSubmissions}`, color: "bg-gray-600" };
  };

  if (!submission) {
    return (
      <div className="min-h-screen tensor-gradient flex items-center justify-center p-4">
        <Card className="tensor-card max-w-md">
          <CardContent className="text-center py-8 sm:py-12">
            <h2 className="text-lg sm:text-xl font-semibold tensor-text mb-4">Submission Not Found</h2>
            <Button onClick={() => navigate("/")} variant="outline">
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const rankBadge = getRankBadge();

  return (
    <div className="min-h-screen tensor-gradient p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Badge className={`${rankBadge.color} text-white text-base sm:text-lg px-3 sm:px-4 py-2 mb-3 sm:mb-4`}>
            {rankBadge.text}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold tensor-text mb-2 font-mono break-words">
            {submission.names.join(" • ")}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:space-x-4 tensor-muted space-y-1 sm:space-y-0">
            <span className="flex items-center justify-center">
              <Vote className="w-4 h-4 mr-1" />
              {submission.votes} votes
            </span>
            {submission.instagram && (
              <span className="flex items-center justify-center text-orange-400">
                <Instagram className="w-4 h-4 mr-1" />
                @{submission.instagram}
              </span>
            )}
          </div>
        </div>

        {/* Submission Details */}
        <Card className="tensor-card mb-4 sm:mb-6">
          <CardHeader>
            <CardTitle className="tensor-text font-mono">Submission Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="tensor-text font-medium mb-2">Suggested Names:</h3>
              <div className="space-y-2">
                {submission.names.map((name, index) => (
                  <Badge key={index} variant="secondary" className="bg-orange-400/20 text-orange-400 text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2 mr-2 mb-2 font-mono">
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
            
            {submission.tagline && (
              <div>
                <h3 className="tensor-text font-medium mb-2">Reasoning:</h3>
                <p className="tensor-muted tensor-card p-3 rounded-lg font-mono text-sm sm:text-base">
                  {submission.tagline}
                </p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm tensor-muted font-mono space-y-1 sm:space-y-0">
              <span>Submitted: {new Date(submission.timestamp).toLocaleDateString()}</span>
              <span>Rank: #{rank} of {totalSubmissions}</span>
            </div>
          </CardContent>
        </Card>

        {/* Personalized Poster */}
        <Card className="tensor-card mb-4 sm:mb-6">
          <CardHeader>
            <CardTitle className="tensor-text flex items-center font-mono">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Your Personalized Poster
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="tensor-card p-4 sm:p-6 rounded-lg border border-orange-400/30 mb-4">
              <div className="text-center space-y-2 sm:space-y-3">
                <div className="text-lg sm:text-2xl font-bold tensor-text font-mono">
                  🚀 BROWSER WORKSPACE NAMING CONTEST 🚀
                </div>
                <div className="text-base sm:text-xl text-orange-400 font-mono break-words">
                  "{submission.names.join('" or "')}"
                </div>
                {submission.tagline && (
                  <div className="tensor-muted font-mono text-sm sm:text-base">
                    💡 {submission.tagline}
                  </div>
                )}
                <div className="tensor-text font-medium font-mono text-sm sm:text-base">
                  Vote for my suggestion!<br />
                  Made for hackers, by hackers.
                </div>
                {submission.instagram && (
                  <div className="text-orange-400 font-mono text-sm sm:text-base">
                    Created by @{submission.instagram}
                  </div>
                )}
                <div className="flex items-center justify-center space-x-2 pt-2">
                  <QrCode className="w-5 h-5 sm:w-6 sm:h-6 tensor-muted" />
                  <span className="text-xs sm:text-sm tensor-muted font-mono">Scan to vote</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                onClick={handleShare}
                className="flex-1 tensor-button text-black font-mono"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Poster
              </Button>
              <Button
                onClick={handleDownloadPoster}
                variant="outline"
                className="flex-1 border-orange-400/30 text-orange-400 hover:bg-orange-400/10 hover:text-orange-300 font-mono"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="tensor-card">
          <CardContent className="text-center p-4 sm:p-6">
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-orange-400 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold tensor-text mb-2 font-mono">
              Help Your Submission Win!
            </h3>
            <p className="tensor-muted mb-4 font-mono text-sm sm:text-base">
              Share your poster everywhere to get more votes. Top 3 submissions win amazing prizes!
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                onClick={() => navigate("/voting")}
                variant="outline"
                className="flex-1 border-orange-400/30 text-orange-400 hover:bg-orange-400/10 hover:text-orange-300 font-mono"
              >
                <Vote className="w-4 h-4 mr-2" />
                View All Submissions
              </Button>
              <Button
                onClick={handleShare}
                className="flex-1 tensor-button text-black font-mono"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Share Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
