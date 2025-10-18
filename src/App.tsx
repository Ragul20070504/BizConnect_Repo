import { BrowserRouter as Router, Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu.tsx"
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FileUploader from "./pages/FileUploader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import GSTCalendarWrapper from "./pages/GSTcalender";
import Salescollect from "./pages/Salescollect";
import DataDisplay from "./pages/DataDisplay";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SalesVisualizer from "./pages/SalesVisualizer";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ServiceList from "./pages/ServiceList";
import Services from "./pages/Services";
import Chatbot from "./pages/Chatbot";
import NotFound from "./pages/NotFound";
import Lorem from "./pages/Lorem";
import Calender from "./pages/Calender"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Menu visible everywhere */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/analysis" element={<SalesVisualizer />} />
            <Route path="/community" element={<DataDisplay />} />
            <Route path="/profile" element={<Dashboard />} />
            <Route path="/lorem" element={<ServiceList />} />
	    <Route path="/doc" element={<FileUploader />} />
	    <Route path="/calender" element={<GSTCalendarWrapper />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
