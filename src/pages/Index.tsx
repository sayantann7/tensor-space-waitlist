
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Star, Sparkles, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const prizes = [
    {
      icon: <Trophy className="w-8 h-8 text-orange-400" />,
      title: "6 Months Premium",
      description: "Free premium access to the final product"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-400" />,
      title: "Exclusive Beta",
      description: "Private beta testing before launch"
    },
    {
      icon: <Star className="w-8 h-8 text-orange-400" />,
      title: "Founder Call",
      description: "20-minute one-on-one with founder"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-orange-400" />,
      title: "Social Recognition",
      description: "Instagram shoutout + attribution"
    }
  ];

  return (
    <div className="min-h-screen tensor-gradient">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <div className="text-sm text-orange-400 font-mono tracking-wider mb-6 uppercase">
              TENSOR PROTOCOL 2.0
            </div>
            <h1 className="text-5xl md:text-7xl font-light tensor-text leading-tight mb-8">
              What would you name<br />
              <span className="text-orange-400">the coziest workstation</span><br />
              on the internet?
            </h1>
          </div>
          
          <p className="text-xl tensor-muted max-w-4xl mx-auto mb-12 font-mono leading-relaxed">
            Weekly AI breakthroughs, hackathons, and internships<br />
            delivered to your brain in just 5 minutes.
          </p>

          <div className="flex flex-col items-center mb-12">
            <Button
              onClick={() => navigate("/email")}
              className="tensor-button text-black font-mono font-medium py-6 px-12 rounded-none text-lg transition-all duration-300 transform hover:scale-105 mb-6"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              GET YOUR DROP
              <ArrowRight className={`w-5 h-5 ml-3 ${isHovered ? 'translate-x-1' : ''} transition-transform`} />
            </Button>
            
            <div className="flex items-center space-x-8 text-sm tensor-muted font-mono">
              <span>○ No spam. Totally FREE.</span>
              <span>✓ Unsubscribe anytime.</span>
            </div>
          </div>

          <p className="text-sm tensor-muted font-mono">
            Let's see if your choice is worthy enough 🔥
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { label: "FOLLOWERS", value: "200K+", key: "FO" },
            { label: "HACKATHONS", value: "50+", key: "HA" },
            { label: "RESOURCES", value: "500+", key: "RE" },
            { label: "COUNTRIES", value: "15+", key: "CO" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-xs tensor-muted font-mono mb-2">{stat.key}</div>
              <div className="text-3xl font-bold tensor-text font-mono mb-1">{stat.value}</div>
              <div className="text-xs tensor-muted font-mono uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Prizes Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-light text-center mb-12 tensor-text font-mono">
            Top 3 Winners Get
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {prizes.map((prize, index) => (
              <Card key={index} className="tensor-card hover:border-orange-400/50 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {prize.icon}
                  </div>
                  <h3 className="text-lg font-medium tensor-text mb-3 font-mono">
                    {prize.title}
                  </h3>
                  <p className="tensor-muted text-sm font-mono leading-relaxed">
                    {prize.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl font-light text-center mb-12 tensor-text font-mono">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: "1", title: "Submit Your Name", desc: "Share 1-2 creative names for our browser workspace extension" },
              { num: "2", title: "Get Your Poster", desc: "Receive a personalized poster with QR code to share on social media" },
              { num: "3", title: "Vote & Win", desc: "Vote for your favorites and compete for amazing prizes" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 border-2 border-orange-400 rounded-none flex items-center justify-center mx-auto mb-6 tensor-text font-mono text-2xl font-bold">
                  {step.num}
                </div>
                <h3 className="text-xl font-medium tensor-text mb-4 font-mono">{step.title}</h3>
                <p className="tensor-muted font-mono leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
