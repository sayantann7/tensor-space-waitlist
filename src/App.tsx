import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EmailForm from "./pages/EmailForm";
import InstagramForm from "./pages/InstagramForm";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";
import NameForm from "./pages/NameForm";
import Poster from "./pages/Poster";
import Voting from "./pages/Voting";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Leaderboard from "./pages/Leaderboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/name" element={<NameForm />} />
          <Route path="/email" element={<EmailForm />} />
          <Route path="/instagram" element={<InstagramForm />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/poster" element={<Poster />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/voting" element={<Voting />} />
          {/* <Route path="/users" element={<Users />} /> */}
          <Route path="/users/:id" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
