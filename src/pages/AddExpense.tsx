import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Plus, 
  Coffee, 
  BookOpen, 
  Car, 
  Home, 
  ShoppingBag, 
  Gamepad2,
  Heart,
  MoreHorizontal,
  Receipt,
  Camera
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddExpense = () => {
  const { toast } = useToast();
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().split('T')[0]
  });

  const categories = [
    { id: "food", name: "Food & Dining", icon: Coffee, color: "coral", budget: 400 },
    { id: "textbooks", name: "Textbooks & Supplies", icon: BookOpen, color: "primary", budget: 300 },
    { id: "transport", name: "Transportation", icon: Car, color: "success", budget: 150 },
    { id: "housing", name: "Housing & Utilities", icon: Home, color: "warning", budget: 350 },
    { id: "shopping", name: "Shopping", icon: ShoppingBag, color: "secondary", budget: 200 },
    { id: "entertainment", name: "Entertainment", icon: Gamepad2, color: "accent", budget: 100 },
    { id: "health", name: "Health & Fitness", icon: Heart, color: "destructive", budget: 150 },
    { id: "other", name: "Other", icon: MoreHorizontal, color: "muted", budget: 100 }
  ];

  const quickAmounts = [5, 10, 15, 25, 50, 100];
  const recentExpenses = [
    { description: "Starbucks Coffee", amount: 5.45, category: "food" },
    { description: "Uber Ride", amount: 12.50, category: "transport" },
    { description: "Grocery Store", amount: 34.75, category: "food" },
    { description: "Movie Ticket", amount: 15.00, category: "entertainment" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expense.amount || !expense.category || !expense.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Expense Added!",
      description: `$${expense.amount} added to ${categories.find(c => c.id === expense.category)?.name}`,
    });

    // Reset form
    setExpense({
      amount: "",
      description: "",
      category: "",
      date: new Date().toISOString().split('T')[0]
    });
  };

  const selectedCategory = categories.find(c => c.id === expense.category);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add Expense</h1>
            <p className="text-muted-foreground">Track your spending easily</p>
          </div>
        </div>

        {/* Quick Add from Recent */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Recent Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentExpenses.map((recent, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                onClick={() => setExpense({
                  ...expense,
                  amount: recent.amount.toString(),
                  description: recent.description,
                  category: recent.category
                })}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Plus className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{recent.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {categories.find(c => c.id === recent.category)?.name}
                    </p>
                  </div>
                </div>
                <span className="font-semibold">${recent.amount.toFixed(2)}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Main Form */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Amount Input */}
              <div className="space-y-3">
                <Label htmlFor="amount">Amount ($)</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    $
                  </div>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-8 text-lg font-semibold"
                    value={expense.amount}
                    onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                  />
                </div>
                
                {/* Quick Amount Buttons */}
                <div className="flex flex-wrap gap-2">
                  {quickAmounts.map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setExpense({ ...expense, amount: amount.toString() })}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Category Selection */}
              <div className="space-y-3">
                <Label>Category</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    const isSelected = expense.category === category.id;
                    
                    return (
                      <button
                        key={category.id}
                        type="button"
                        className={`p-4 rounded-lg border-2 transition-all text-center space-y-2 ${
                          isSelected 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setExpense({ ...expense, category: category.id })}
                      >
                        <div className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-primary text-white' : 'bg-muted'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-medium">{category.name}</p>
                          <p className="text-xs text-muted-foreground">${category.budget}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedCategory && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Monthly budget: <span className="font-semibold">${selectedCategory.budget}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="What did you buy?"
                  value={expense.description}
                  onChange={(e) => setExpense({ ...expense, description: e.target.value })}
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={expense.date}
                  onChange={(e) => setExpense({ ...expense, date: e.target.value })}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1" variant="gradient">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Expense
                </Button>
                <Button type="button" variant="outline" size="icon">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddExpense;