
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Swords, Sparkles, Trophy, ArrowRight, ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen tensor-gradient flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        <Card className="tensor-card border-0">
          <CardHeader className="text-center pb-6 sm:pb-8 px-6 sm:px-8 pt-6 sm:pt-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-orange-400 rounded-none flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Swords className="w-10 h-10 sm:w-12 sm:h-12 text-orange-400" />
            </div>
            <CardTitle className="text-3xl sm:text-4xl font-light tensor-text font-mono mb-3 sm:mb-4">
              Are you ready for the battle?
            </CardTitle>
            <p className="tensor-muted font-mono leading-relaxed text-base sm:text-lg px-2">
              You're about to enter the arena where creativity meets competition. 
              Let's see what you've got!
            </p>
          </CardHeader>
          
          <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-6 sm:space-y-8">
            {/* User Info Summary */}
            <div className="tensor-card p-4 sm:p-6 border border-orange-400/20">
              <h3 className="tensor-text font-mono font-medium mb-3 sm:mb-4 text-sm uppercase tracking-wider">Your Battle Profile</h3>
              <div className="space-y-2 sm:space-y-3 font-mono text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="tensor-muted">Email:</span>
                  <span className="tensor-text break-all">{email}</span>
                </div>
                {instagram && (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="tensor-muted">Instagram:</span>
                    <span className="text-orange-400">@{instagram}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Battle Rules */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="tensor-text font-mono font-medium flex items-center text-sm uppercase tracking-wider">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-3 text-orange-400" />
                Battle Rules
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {[
                  { num: "1", title: "Submit 1-2 Names", desc: "Max 20 characters each. Make them memorable!" },
                  { num: "2", title: "Get Your Poster", desc: "Share it everywhere to gain votes" },
                  { num: "3", title: "Vote Strategically", desc: "You get 3 votes total (1 for yourself, 2 for others)" }
                ].map((rule, index) => (
                  <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 border border-orange-400 rounded-none flex items-center justify-center text-orange-400 font-mono text-sm font-bold mt-1 flex-shrink-0">
                      {rule.num}
                    </div>
                    <div className="flex-1">
                      <div className="tensor-text font-mono font-medium mb-1 text-sm sm:text-base">{rule.title}</div>
                      <div className="tensor-muted font-mono text-sm leading-relaxed">{rule.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center pt-4 sm:pt-6">
              <Button
                onClick={handleProceed}
                disabled={isReady}
                className="w-full tensor-button text-black font-mono font-bold py-4 sm:py-6 text-base sm:text-lg rounded-none transition-all duration-300 transform hover:scale-105 mb-3 sm:mb-4"
              >
                {isReady ? (
                  <>
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-3 animate-spin" />
                    ENTERING BATTLE...
                  </>
                ) : (
                  <>
                    LET THE BATTLE BEGIN!
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-3" />
                  </>
                )}
              </Button>
              
              <p className="text-xs tensor-muted font-mono">
                Once you submit, there's no going back. Make it count! 🔥
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate("/instagram")}
                className="tensor-muted hover:text-orange-400 transition-colors font-mono text-sm flex items-center mx-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to previous step
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Confirmation;
