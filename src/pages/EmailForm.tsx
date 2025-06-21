
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowRight, Shield, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmailForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to continue.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userSubscribed", subscribe.toString());
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Great!",
        description: "Your email has been saved. Let's continue!",
      });
      navigate("/instagram");
    }, 1000);
  };

  return (
    <div className="min-h-screen tensor-gradient flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <Card className="tensor-card border-0">
          <CardHeader className="text-center pb-8">
            <div className="w-20 h-20 border-2 border-orange-400 rounded-none flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-orange-400" />
            </div>
            <CardTitle className="text-3xl font-light tensor-text font-mono mb-4">
              Let's Get Started
            </CardTitle>
            <p className="tensor-muted font-mono leading-relaxed">
              Enter your email to join the competition and receive your personalized poster
            </p>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="email" className="tensor-text font-mono text-sm uppercase tracking-wider">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hacker@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="tensor-input text-white placeholder-gray-500 font-mono py-4 px-4 rounded-none border-0 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  required
                />
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="subscribe"
                  checked={subscribe}
                  onCheckedChange={(checked) => setSubscribe(checked as boolean)}
                  className="border-orange-400/50 data-[state=checked]:bg-orange-400 data-[state=checked]:border-orange-400 rounded-none mt-1"
                />
                <Label htmlFor="subscribe" className="tensor-muted font-mono text-sm leading-relaxed cursor-pointer">
                  Subscribe to TensorBoy updates and exclusive content
                </Label>
              </div>

              <div className="flex items-center space-x-3 text-xs tensor-muted font-mono">
                <Shield className="w-4 h-4 text-orange-400" />
                <span>Your email is required for voting verification and prize delivery</span>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full tensor-button text-black font-mono font-medium py-4 rounded-none text-base transition-all duration-300 hover:scale-105"
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
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/")}
                className="tensor-muted hover:text-orange-400 transition-colors font-mono text-sm flex items-center mx-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to landing page
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailForm;
