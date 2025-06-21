
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EmailForm from "./pages/EmailForm";
import InstagramForm from "./pages/InstagramForm";
import Confirmation from "./pages/Confirmation";
import Submission from "./pages/Submission";
import Voting from "./pages/Voting";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/email" element={<EmailForm />} />
          <Route path="/instagram" element={<InstagramForm />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/submission" element={<Submission />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
