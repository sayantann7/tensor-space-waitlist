
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <Card className="glass-effect max-w-md">
          <CardContent className="text-center py-12">
            <h2 className="text-xl font-semibold text-white mb-4">Submission Not Found</h2>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className={`${rankBadge.color} text-white text-lg px-4 py-2 mb-4`}>
            {rankBadge.text}
          </Badge>
          <h1 className="text-3xl font-bold text-white mb-2">
            {submission.names.join(" • ")}
          </h1>
          <div className="flex items-center justify-center space-x-4 text-gray-400">
            <span className="flex items-center">
              <Vote className="w-4 h-4 mr-1" />
              {submission.votes} votes
            </span>
            {submission.instagram && (
              <span className="flex items-center text-purple-400">
                <Instagram className="w-4 h-4 mr-1" />
                @{submission.instagram}
              </span>
            )}
          </div>
        </div>

        {/* Submission Details */}
        <Card className="glass-effect mb-6">
          <CardHeader>
            <CardTitle className="text-white">Submission Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-white font-medium mb-2">Suggested Names:</h3>
              <div className="space-y-2">
                {submission.names.map((name, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-700 text-white text-lg px-4 py-2">
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
            
            {submission.tagline && (
              <div>
                <h3 className="text-white font-medium mb-2">Reasoning:</h3>
                <p className="text-gray-300 bg-gray-800 p-3 rounded-lg">
                  {submission.tagline}
                </p>
              </div>
            )}
            
            <div className="flex justify-between text-sm text-gray-400">
              <span>Submitted: {new Date(submission.timestamp).toLocaleDateString()}</span>
              <span>Rank: #{rank} of {totalSubmissions}</span>
            </div>
          </CardContent>
        </Card>

        {/* Personalized Poster */}
        <Card className="glass-effect mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Share2 className="w-5 h-5 mr-2" />
              Your Personalized Poster
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-purple-900 to-pink-900 p-6 rounded-lg border border-purple-500/30 mb-4">
              <div className="text-center space-y-3">
                <div className="text-2xl font-bold text-white">
                  🚀 BROWSER WORKSPACE NAMING CONTEST 🚀
                </div>
                <div className="text-xl text-purple-200">
                  "{submission.names.join('" or "')}"
                </div>
                {submission.tagline && (
                  <div className="text-purple-300">
                    💡 {submission.tagline}
                  </div>
                )}
                <div className="text-white font-medium">
                  Vote for my suggestion!<br />
                  Made for hackers, by hackers.
                </div>
                {submission.instagram && (
                  <div className="text-purple-400">
                    Created by @{submission.instagram}
                  </div>
                )}
                <div className="flex items-center justify-center space-x-2 pt-2">
                  <QrCode className="w-6 h-6 text-gray-300" />
                  <span className="text-sm text-gray-300">Scan to vote</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={handleShare}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Poster
              </Button>
              <Button
                onClick={handleDownloadPoster}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="glass-effect">
          <CardContent className="text-center p-6">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Help Your Submission Win!
            </h3>
            <p className="text-gray-400 mb-4">
              Share your poster everywhere to get more votes. Top 3 submissions win amazing prizes!
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={() => navigate("/voting")}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Vote className="w-4 h-4 mr-2" />
                View All Submissions
              </Button>
              <Button
                onClick={handleShare}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
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
