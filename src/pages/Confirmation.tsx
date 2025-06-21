
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Swords, Sparkles, Trophy, ArrowRight } from "lucide-react";

const Confirmation = () => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  const email = localStorage.getItem("userEmail") || "";
  const instagram = localStorage.getItem("userInstagram") || "";

  const handleProceed = () => {
    setIsReady(true);
    setTimeout(() => {
      navigate("/submission");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="glass-effect">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Swords className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Are you ready for the battle?
            </CardTitle>
            <p className="text-gray-400">
              You're about to enter the arena where creativity meets competition. 
              Let's see what you've got!
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* User Info Summary */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-white font-medium mb-3">Your Battle Profile</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{email}</span>
                </div>
                {instagram && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Instagram:</span>
                    <span className="text-purple-400">@{instagram}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Battle Rules */}
            <div className="space-y-4">
              <h3 className="text-white font-medium flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                Battle Rules
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <div className="text-white font-medium">Submit 1-2 Names</div>
                    <div className="text-gray-400">Max 20 characters each. Make them memorable!</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <div className="text-white font-medium">Get Your Poster</div>
                    <div className="text-gray-400">Share it everywhere to gain votes</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <div className="text-white font-medium">Vote Strategically</div>
                    <div className="text-gray-400">You get 3 votes total (1 for yourself, 2 for others)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center pt-4">
              <Button
                onClick={handleProceed}
                disabled={isReady}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {isReady ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Entering Battle...
                  </>
                ) : (
                  <>
                    Let the Battle Begin!
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
              
              <p className="text-xs text-gray-500 mt-3">
                Once you submit, there's no going back. Make it count! 🔥
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate("/instagram")}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                ← Back to previous step
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Confirmation;
