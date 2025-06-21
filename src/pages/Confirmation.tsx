
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
    <div className="min-h-screen tensor-gradient flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <Card className="tensor-card border-0">
          <CardHeader className="text-center pb-8">
            <div className="w-24 h-24 border-2 border-orange-400 rounded-none flex items-center justify-center mx-auto mb-6">
              <Swords className="w-12 h-12 text-orange-400" />
            </div>
            <CardTitle className="text-4xl font-light tensor-text font-mono mb-4">
              Are you ready for the battle?
            </CardTitle>
            <p className="tensor-muted font-mono leading-relaxed text-lg">
              You're about to enter the arena where creativity meets competition. 
              Let's see what you've got!
            </p>
          </CardHeader>
          
          <CardContent className="px-8 pb-8 space-y-8">
            {/* User Info Summary */}
            <div className="tensor-card p-6 border border-orange-400/20">
              <h3 className="tensor-text font-mono font-medium mb-4 text-sm uppercase tracking-wider">Your Battle Profile</h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between items-center">
                  <span className="tensor-muted">Email:</span>
                  <span className="tensor-text">{email}</span>
                </div>
                {instagram && (
                  <div className="flex justify-between items-center">
                    <span className="tensor-muted">Instagram:</span>
                    <span className="text-orange-400">@{instagram}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Battle Rules */}
            <div className="space-y-6">
              <h3 className="tensor-text font-mono font-medium flex items-center text-sm uppercase tracking-wider">
                <Trophy className="w-5 h-5 mr-3 text-orange-400" />
                Battle Rules
              </h3>
              <div className="space-y-6">
                {[
                  { num: "1", title: "Submit 1-2 Names", desc: "Max 20 characters each. Make them memorable!" },
                  { num: "2", title: "Get Your Poster", desc: "Share it everywhere to gain votes" },
                  { num: "3", title: "Vote Strategically", desc: "You get 3 votes total (1 for yourself, 2 for others)" }
                ].map((rule, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 border border-orange-400 rounded-none flex items-center justify-center text-orange-400 font-mono text-sm font-bold mt-1">
                      {rule.num}
                    </div>
                    <div>
                      <div className="tensor-text font-mono font-medium mb-1">{rule.title}</div>
                      <div className="tensor-muted font-mono text-sm leading-relaxed">{rule.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center pt-6">
              <Button
                onClick={handleProceed}
                disabled={isReady}
                className="w-full tensor-button text-black font-mono font-bold py-6 text-lg rounded-none transition-all duration-300 transform hover:scale-105 mb-4"
              >
                {isReady ? (
                  <>
                    <Sparkles className="w-6 h-6 mr-3 animate-spin" />
                    ENTERING BATTLE...
                  </>
                ) : (
                  <>
                    LET THE BATTLE BEGIN!
                    <ArrowRight className="w-6 h-6 ml-3" />
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
