
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Send, AlertCircle, ArrowLeft } from "lucide-react";
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
    
    const submissionId = Date.now().toString();
    
    const submissionData = {
      id: submissionId,
      email: localStorage.getItem("userEmail"),
      instagram: localStorage.getItem("userInstagram"),
      names: [name1.trim(), name2.trim()].filter(Boolean),
      tagline: tagline.trim(),
      votes: 1,
      timestamp: new Date().toISOString()
    };
    
    const existingSubmissions = JSON.parse(localStorage.getItem("submissions") || "[]");
    existingSubmissions.push(submissionData);
    localStorage.setItem("submissions", JSON.stringify(existingSubmissions));
    localStorage.setItem("currentSubmissionId", submissionId);
    
    const userVotes = {
      total: 3,
      used: 1,
      votedFor: [submissionId]
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
    <div className="min-h-screen tensor-gradient flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl">
        <Card className="tensor-card border-0">
          <CardHeader className="text-center pb-6 sm:pb-8 px-6 sm:px-8 pt-6 sm:pt-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-orange-400 rounded-none flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-light tensor-text font-mono mb-3 sm:mb-4">
              Name Our Browser Workspace
            </CardTitle>
            <p className="tensor-muted font-mono leading-relaxed text-sm sm:text-base">
              Submit 1-2 creative names for the coziest workstation on the internet
            </p>
          </CardHeader>
          
          <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <Label htmlFor="name1" className="tensor-text font-mono text-sm uppercase tracking-wider mb-3 block">
                    Your First Name Suggestion *
                  </Label>
                  <Input
                    id="name1"
                    type="text"
                    placeholder="e.g., DevNest, CodeHaven..."
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    className="tensor-input text-white placeholder-gray-500 font-mono py-3 sm:py-4 px-4 rounded-none border-0 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    maxLength={20}
                    required
                  />
                  <div className="flex justify-between text-xs mt-2 font-mono">
                    <span className="tensor-muted">Max 20 characters</span>
                    <span className={`${name1.length > 15 ? 'text-orange-400' : 'tensor-muted'}`}>
                      {name1.length}/20
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="name2" className="tensor-text font-mono text-sm uppercase tracking-wider mb-3 block">
                    Second Name Suggestion <span className="tensor-muted">(Optional)</span>
                  </Label>
                  <Input
                    id="name2"
                    type="text"
                    placeholder="Got another great idea?"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    className="tensor-input text-white placeholder-gray-500 font-mono py-3 sm:py-4 px-4 rounded-none border-0 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    maxLength={20}
                  />
                  <div className="flex justify-between text-xs mt-2 font-mono">
                    <span className="tensor-muted">Max 20 characters</span>
                    <span className={`${name2.length > 15 ? 'text-orange-400' : 'tensor-muted'}`}>
                      {name2.length}/20
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tagline" className="tensor-text font-mono text-sm uppercase tracking-wider mb-3 block">
                    Why This Name? <span className="tensor-muted">(Optional)</span>
                  </Label>
                  <Textarea
                    id="tagline"
                    placeholder="Brief explanation of your naming choice..."
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="tensor-input text-white placeholder-gray-500 font-mono py-3 sm:py-4 px-4 rounded-none border-0 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 resize-none"
                    rows={3}
                    maxLength={100}
                  />
                  <div className="text-xs tensor-muted mt-2 font-mono">
                    {tagline.length}/100 characters
                  </div>
                </div>
              </div>

              <div className="tensor-card p-4 sm:p-6 border border-orange-400/20">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 mt-1 flex-shrink-0" />
                  <div className="font-mono text-sm">
                    <div className="text-orange-400 font-medium mb-2 sm:mb-3 uppercase tracking-wider">Pro Tips:</div>
                    <ul className="tensor-muted space-y-1 sm:space-y-2 leading-relaxed">
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
                className="w-full tensor-button text-black font-mono font-bold py-4 sm:py-6 text-base sm:text-lg rounded-none transition-all duration-300 hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-black mr-3"></div>
                    SUBMITTING YOUR NAMES...
                  </>
                ) : (
                  <>
                    SUBMIT & GET MY POSTER
                    <Send className="w-5 h-5 sm:w-6 sm:h-6 ml-3" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 sm:mt-8 text-center">
              <button
                onClick={() => navigate("/confirmation")}
                className="tensor-muted hover:text-orange-400 transition-colors font-mono text-sm flex items-center mx-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to confirmation
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Submission;
