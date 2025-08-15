import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  X, 
  PiggyBank, 
  BarChart3, 
  Target, 
  BookOpen, 
  Settings,
  User
} from "lucide-react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    { name: "Dashboard", icon: BarChart3, active: true, path: "/" },
    { name: "Add Expense", icon: PiggyBank, active: false, path: "/add-expense" },
    { name: "Split Bills", icon: Target, active: false, path: "/bill-split" },
    { name: "Insights", icon: BookOpen, active: false, path: "/insights" },
    { name: "Goals", icon: Target, active: false, path: "/savings" },
    { name: "Learn", icon: BookOpen, active: false, path: "/learn" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <PiggyBank className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Smart Stash</span>
              <Badge variant="secondary" className="text-xs">Beta</Badge>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={item.active ? "default" : "ghost"}
                  className="flex items-center space-x-2"
                  onClick={() => navigate(item.path)}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.name}</span>
                </Button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Alex</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant={item.active ? "default" : "ghost"}
                    className="w-full justify-start space-x-2"
                    onClick={() => navigate(item.path)}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Button>
                );
              })}
              <div className="pt-4 border-t border-border">
                <Button variant="outline" className="w-full justify-start space-x-2">
                  <User className="w-4 h-4" />
                  <span>Alex</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;