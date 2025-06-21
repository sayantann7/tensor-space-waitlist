
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram, ArrowRight, Users, Gift } from "lucide-react";
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
    
    // Store Instagram info in localStorage
    localStorage.setItem("userInstagram", instagram);
    localStorage.setItem("userFollowed", followed.toString());
    
    // Simulate API call
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="glass-effect">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Instagram className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Boost Your Chances
            </CardTitle>
            <p className="text-gray-400 mt-2">
              Connect your Instagram for extra engagement and potential bonus recognition
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="instagram" className="text-white">
                  Instagram Username <span className="text-gray-500">(Optional)</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    @
                  </span>
                  <Input
                    id="instagram"
                    type="text"
                    placeholder="username"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value.replace('@', ''))}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 pl-8"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="followed"
                    checked={followed}
                    onCheckedChange={(checked) => setFollowed(checked as boolean)}
                    className="border-gray-600 data-[state=checked]:bg-purple-600"
                  />
                  <Label htmlFor="followed" className="text-sm text-gray-300 cursor-pointer">
                    I've followed{" "}
                    <a 
                      href="https://instagram.com/tensorboy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 underline"
                    >
                      @tensorboy
                    </a>
                  </Label>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <Gift className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-white">Bonus Benefits</span>
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Potential Instagram shoutout for winners</li>
                    <li>• Your poster will include your handle</li>
                    <li>• Join our community of creators</li>
                  </ul>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSkip}
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Skip
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300"
                >
                  {isLoading ? (
                    "Saving..."
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/email")}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                ← Back to email
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <Users className="w-4 h-4" />
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
