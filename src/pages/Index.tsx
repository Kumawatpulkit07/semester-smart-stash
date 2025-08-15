import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FinancialDashboard from "@/components/FinancialDashboard";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <FinancialDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <div className="text-center py-8 bg-background">
        <button 
          onClick={() => setShowDashboard(true)}
          className="text-primary hover:text-primary/80 underline font-medium"
        >
          → View Sample Dashboard
        </button>
      </div>
    </div>
  );
};

export default Index;
