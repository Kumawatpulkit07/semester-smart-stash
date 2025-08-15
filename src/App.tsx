import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AddExpense from "./pages/AddExpense";
import BillSplit from "./pages/BillSplit";
import InsightsPage from "./pages/InsightsPage";
import SavingsGoals from "./pages/SavingsGoals";
import FinancialLiteracy from "./pages/FinancialLiteracy";
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
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/bill-split" element={<BillSplit />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/savings" element={<SavingsGoals />} />
          <Route path="/learn" element={<FinancialLiteracy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
