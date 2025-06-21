
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Send, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Submission = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [tagline, setTagline] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name1.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter at least one name suggestion.",
        variant: "destructive",
      });
      return;
    }

    if (name1.length > 20) {
      toast({
        title: "Name Too Long",
        description: "Names must be 20 characters or less.",
        variant: "destructive",
      });
      return;
    }

    if (name2 && name2.length > 20) {
      toast({
        title: "Second Name Too Long",
        description: "Names must be 20 characters or less.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Generate a unique ID for this submission
    const submissionId = Date.now().toString();
    
    // Store submission data
    const submissionData = {
      id: submissionId,
      email: localStorage.getItem("userEmail"),
      instagram: localStorage.getItem("userInstagram"),
      names: [name1.trim(), name2.trim()].filter(Boolean),
      tagline: tagline.trim(),
      votes: 1, // Auto-vote for own submission
      timestamp: new Date().toISOString()
    };
    
    // Store in localStorage (in real app, this would go to database)
    const existingSubmissions = JSON.parse(localStorage.getItem("submissions") || "[]");
    existingSubmissions.push(submissionData);
    localStorage.setItem("submissions", JSON.stringify(existingSubmissions));
    localStorage.setItem("currentSubmissionId", submissionId);
    
    // Initialize user votes (they get 3 total, 1 already used for self)
    const userVotes = {
      total: 3,
      used: 1,
      votedFor: [submissionId] // Already voted for own submission
    };
    localStorage.setItem("userVotes", JSON.stringify(userVotes));
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Submission Complete!",
        description: "Your names have been submitted. Time to get your poster!",
      });
      navigate(`/profile/${submissionId}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="glass-effect">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Name Our Browser Workspace
            </CardTitle>
            <p className="text-gray-400 mt-2">
              Submit 1-2 creative names for the coziest workstation on the internet
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name1" className="text-white font-medium">
                    Your First Name Suggestion *
                  </Label>
                  <Input
                    id="name1"
                    type="text"
                    placeholder="e.g., DevNest, CodeHaven..."
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 mt-2"
                    maxLength={20}
                    required
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-500">Max 20 characters</span>
                    <span className={`${name1.length > 15 ? 'text-yellow-500' : 'text-gray-500'}`}>
                      {name1.length}/20
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="name2" className="text-white font-medium">
                    Second Name Suggestion <span className="text-gray-500">(Optional)</span>
                  </Label>
                  <Input
                    id="name2"
                    type="text"
                    placeholder="Got another great idea?"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 mt-2"
                    maxLength={20}
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-500">Max 20 characters</span>
                    <span className={`${name2.length > 15 ? 'text-yellow-500' : 'text-gray-500'}`}>
                      {name2.length}/20
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tagline" className="text-white font-medium">
                    Why This Name? <span className="text-gray-500">(Optional)</span>
                  </Label>
                  <Textarea
                    id="tagline"
                    placeholder="Brief explanation of your naming choice..."
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 mt-2 resize-none"
                    rows={3}
                    maxLength={100}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {tagline.length}/100 characters
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="text-blue-400 font-medium mb-1">Pro Tips:</div>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Think about the product's purpose: browser workspace for developers</li>
                      <li>• Consider words that evoke productivity, creativity, and comfort</li>
                      <li>• Keep it memorable and easy to type/say</li>
                      <li>• Avoid trademark issues with existing products</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !name1.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 text-lg rounded-lg transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting Your Names...
                  </>
                ) : (
                  <>
                    Submit & Get My Poster
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/confirmation")}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                ← Back to confirmation
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Submission;
