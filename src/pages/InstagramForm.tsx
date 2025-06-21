
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram, ArrowRight, Users, Gift, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InstagramForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [instagram, setInstagram] = useState("");
  const [followed, setFollowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    localStorage.setItem("userInstagram", instagram);
    localStorage.setItem("userFollowed", followed.toString());
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Awesome!",
        description: "Social info saved. Ready for the next step!",
      });
      navigate("/confirmation");
    }, 1000);
  };

  const handleSkip = () => {
    localStorage.setItem("userInstagram", "");
    localStorage.setItem("userFollowed", "false");
    navigate("/confirmation");
  };

  return (
    <div className="min-h-screen tensor-gradient flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <Card className="tensor-card border-0">
          <CardHeader className="text-center pb-8">
            <div className="w-20 h-20 border-2 border-orange-400 rounded-none flex items-center justify-center mx-auto mb-6">
              <Instagram className="w-10 h-10 text-orange-400" />
            </div>
            <CardTitle className="text-3xl font-light tensor-text font-mono mb-4">
              Boost Your Chances
            </CardTitle>
            <p className="tensor-muted font-mono leading-relaxed">
              Connect your Instagram for extra engagement and potential bonus recognition
            </p>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="instagram" className="tensor-text font-mono text-sm uppercase tracking-wider">
                  Instagram Username <span className="tensor-muted">(Optional)</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 tensor-muted font-mono">
                    @
                  </span>
                  <Input
                    id="instagram"
                    type="text"
                    placeholder="username"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value.replace('@', ''))}
                    className="tensor-input text-white placeholder-gray-500 font-mono py-4 pl-8 pr-4 rounded-none border-0 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="followed"
                    checked={followed}
                    onCheckedChange={(checked) => setFollowed(checked as boolean)}
                    className="border-orange-400/50 data-[state=checked]:bg-orange-400 data-[state=checked]:border-orange-400 rounded-none mt-1"
                  />
                  <Label htmlFor="followed" className="tensor-muted font-mono text-sm cursor-pointer leading-relaxed">
                    I've followed{" "}
                    <a 
                      href="https://instagram.com/tensorboy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 underline"
                    >
                      @tensorboy
                    </a>
                  </Label>
                </div>

                <div className="tensor-card p-6 border border-orange-400/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <Gift className="w-5 h-5 text-orange-400" />
                    <span className="font-mono font-medium tensor-text text-sm uppercase tracking-wider">Bonus Benefits</span>
                  </div>
                  <ul className="text-sm tensor-muted font-mono space-y-2 leading-relaxed">
                    <li>• Potential Instagram shoutout for winners</li>
                    <li>• Your poster will include your handle</li>
                    <li>• Join our community of creators</li>
                  </ul>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSkip}
                  className="flex-1 border-orange-400/30 text-orange-400 hover:bg-orange-400/10 hover:text-orange-300 font-mono rounded-none py-4"
                >
                  SKIP
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 tensor-button text-black font-mono font-medium py-4 rounded-none transition-all duration-300 hover:scale-105"
                >
                  {isLoading ? (
                    "SAVING..."
                  ) : (
                    <>
                      CONTINUE
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/email")}
                className="tensor-muted hover:text-orange-400 transition-colors font-mono text-sm flex items-center mx-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to email
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-3 text-xs tensor-muted font-mono">
                <Users className="w-4 h-4 text-orange-400" />
                <span>Join our growing community of tech enthusiasts</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstagramForm;
