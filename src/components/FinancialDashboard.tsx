import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  BookOpen, 
  Coffee, 
  Car, 
  Home,
  Plus,
  PiggyBank,
  DollarSign,
  Calendar,
  CheckCircle
} from "lucide-react";

const FinancialDashboard = () => {
  const currentBalance = 2847.50;
  const monthlyBudget = 1200;
  const spent = 856.23;
  const remaining = monthlyBudget - spent;

  const budgetCategories = [
    { name: "Food & Dining", spent: 324, budget: 400, icon: Coffee, color: "coral" },
    { name: "Textbooks", spent: 285, budget: 300, icon: BookOpen, color: "primary" },
    { name: "Transportation", spent: 89, budget: 150, icon: Car, color: "success" },
    { name: "Housing", spent: 158, budget: 350, icon: Home, color: "warning" }
  ];

  const savingsGoals = [
    { name: "Spring Break Trip", current: 450, target: 800, deadline: "March 2024" },
    { name: "New Laptop", current: 720, target: 1200, deadline: "August 2024" },
    { name: "Emergency Fund", current: 300, target: 500, deadline: "December 2024" }
  ];

  const recentTransactions = [
    { name: "Campus Bookstore", amount: -89.99, category: "Textbooks", date: "Today" },
    { name: "Starbucks", amount: -5.45, category: "Food", date: "Today" },
    { name: "Part-time Job", amount: +280.00, category: "Income", date: "Yesterday" },
    { name: "Uber", amount: -12.50, category: "Transportation", date: "2 days ago" }
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Good morning, Alex! 👋</h1>
            <p className="text-muted-foreground">Here's your financial snapshot for this semester</p>
          </div>
          <Button variant="gradient" size="lg" className="animate-pulse-glow">
            <Plus className="w-5 h-5" />
            Add Transaction
          </Button>
        </div>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${currentBalance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1 text-success" />
                +12.3% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${remaining.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                ${spent.toFixed(2)} of ${monthlyBudget} spent
              </p>
              <Progress value={(spent / monthlyBudget) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">23.5%</div>
              <p className="text-xs text-muted-foreground">
                Great job saving this month!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Budget Categories */}
        <Card className="bg-gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Budget Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {budgetCategories.map((category, index) => {
              const percentage = (category.spent / category.budget) * 100;
              const IconComponent = category.icon;
              
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg bg-${category.color}/10`}>
                    <IconComponent className={`w-4 h-4 text-${category.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ${category.spent} / ${category.budget}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                  <Badge variant={percentage > 80 ? "destructive" : "secondary"}>
                    {percentage.toFixed(0)}%
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Savings Goals */}
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-success" />
                Savings Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {savingsGoals.map((goal, index) => {
                const percentage = (goal.current / goal.target) * 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{goal.name}</span>
                      <Badge variant="outline">
                        <Calendar className="w-3 h-3 mr-1" />
                        {goal.deadline}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${goal.current} saved</span>
                      <span>${goal.target} goal</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    {percentage >= 100 && (
                      <div className="flex items-center gap-1 text-success text-sm">
                        <CheckCircle className="w-3 h-3" />
                        Goal achieved!
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.amount > 0 ? 'bg-success/10' : 'bg-muted'
                    }`}>
                      {transaction.amount > 0 ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transaction.name}</p>
                      <p className="text-xs text-muted-foreground">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.amount > 0 ? 'text-success' : 'text-foreground'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;