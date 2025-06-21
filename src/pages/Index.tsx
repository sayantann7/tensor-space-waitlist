
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Star, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const prizes = [
    {
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      title: "6 Months Premium Access",
      description: "Free premium access to the final product"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Exclusive Beta Access",
      description: "Private beta testing before public launch"
    },
    {
      icon: <Star className="w-6 h-6 text-purple-500" />,
      title: "Founder Call",
      description: "20-minute one-on-one call with the founder"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      title: "Social Recognition",
      description: "Instagram shoutout + product attribution"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="text-sm text-purple-400 font-medium tracking-wide mb-2">
              NAMING COMPETITION
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
              What would you name<br />
              <span className="text-white">the coziest workstation</span><br />
              on the internet?
            </h1>
          </div>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            We're building the ultimate browser workspace extension for developers and creators. 
            Help us find the perfect name and become part of our founding community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="text-sm text-gray-400">
              Currently called: <span className="text-purple-400 font-semibold">"Tensor Space"</span>
            </div>
            <div className="text-sm text-gray-400">
              Made for hackers, by hackers
            </div>
          </div>

          <Button
            onClick={() => navigate("/email")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Sparkles className={`w-5 h-5 mr-2 ${isHovered ? 'animate-spin' : ''}`} />
            Grab Your Prize
          </Button>

          <p className="text-sm text-gray-500 mt-4">
            Let's see if your choice is worthy enough 🔥
          </p>
        </div>

        {/* Prizes Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Top 3 Winners Get
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {prizes.map((prize, index) => (
              <Card key={index} className="glass-effect hover:neon-border transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center group-hover:animate-float">
                    {prize.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {prize.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {prize.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Submit Your Name</h3>
              <p className="text-gray-400">
                Share 1-2 creative names for our browser workspace extension
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Get Your Poster</h3>
              <p className="text-gray-400">
                Receive a personalized poster with QR code to share on social media
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Vote & Win</h3>
              <p className="text-gray-400">
                Vote for your favorites and compete for amazing prizes
              </p>
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="text-center">
          <div className="glass-effect rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Join the Movement</h3>
            <p className="text-gray-400 mb-6">
              Be part of shaping the future of browser workspaces. Your creativity matters.
            </p>
            <div className="flex justify-center space-x-8">
              <div>
                <div className="text-2xl font-bold text-purple-400">Top 3</div>
                <div className="text-sm text-gray-500">Winners</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-400">3</div>
                <div className="text-sm text-gray-500">Votes Each</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">∞</div>
                <div className="text-sm text-gray-500">Possibilities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
