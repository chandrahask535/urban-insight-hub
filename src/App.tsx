
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Encroachment from "./pages/Encroachment";
import HeatIslands from "./pages/HeatIslands";
import Recommendations from "./pages/Recommendations";
import FloodPrediction from "./pages/FloodPrediction";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Bengaluru from "./pages/Bengaluru";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/encroachment" element={<Encroachment />} />
            <Route path="/heat-islands" element={<HeatIslands />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/flood-prediction" element={<FloodPrediction />} />
            <Route path="/bengaluru" element={<Bengaluru />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
