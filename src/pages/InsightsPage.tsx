import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  Users, 
  Target,
  Coffee,
  BookOpen,
  Car,
  Home,
  ArrowUp,
  ArrowDown,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";

const InsightsPage = () => {
  const [timeframe, setTimeframe] = useState("month");

  const spendingData = {
    currentMonth: 856.23,
    lastMonth: 742.50,
    change: 15.3,
    trend: "up"
  };

  const categoryBreakdown = [
    { category: "Food & Dining", amount: 324, percentage: 37.8, icon: Coffee, color: "coral", change: 12 },
    { category: "Textbooks", amount: 285, percentage: 33.3, icon: BookOpen, color: "primary", change: -5 },
    { category: "Transportation", amount: 89, percentage: 10.4, icon: Car, color: "success", change: 8 },
    { category: "Housing", amount: 158, percentage: 18.5, icon: Home, color: "warning", change: 3 }
  ];

  const peerComparison = {
    yourSpending: 856,
    averageSpending: 1124,
    percentile: 68,
    betterThan: 68
  };

  const weeklyTrends = [
    { week: "Week 1", spending: 180, budget: 300 },
    { week: "Week 2", spending: 245, budget: 300 },
    { week: "Week 3", spending: 198, budget: 300 },
    { week: "Week 4", spending: 233, budget: 300 }
  ];

  const topExpenses = [
    { name: "Campus Bookstore", amount: 89.99, category: "Textbooks", date: "Mar 15" },
    { name: "Chipotle", amount: 12.45, category: "Food", date: "Mar 14", frequency: "5x this month" },
    { name: "Starbucks", amount: 5.45, category: "Food", date: "Mar 14", frequency: "12x this month" },
    { name: "Uber", amount: 18.50, category: "Transport", date: "Mar 13" },
    { name: "Amazon", amount: 34.99, category: "Shopping", date: "Mar 12" }
  ];

  const insights = [
    {
      type: "tip",
      title: "Coffee Spending Alert",
      message: "You've spent $67 on coffee this month. Consider a campus meal plan to save ~$40/month.",
      action: "View Alternatives"
    },
    {
      type: "achievement",
      title: "Budget Champion!",
      message: "You're 32% under budget this month. Great job staying on track!",
      action: "Keep It Up"
    },
    {
      type: "warning",
      title: "Weekend Splurge Pattern",
      message: "Your weekend spending is 2.3x higher than weekdays. Plan ahead for better control.",
      action: "Set Weekend Budget"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-primary" />
              Financial Insights
            </h1>
            <p className="text-muted-foreground">Understand your spending patterns and habits</p>
          </div>
          
          <div className="flex gap-2">
            {["week", "month", "semester"].map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(period)}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${spendingData.currentMonth.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {spendingData.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 mr-1 text-destructive" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1 text-success" />
                )}
                {spendingData.change}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">vs Peers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{peerComparison.percentile}%</div>
              <p className="text-xs text-muted-foreground">
                Better than {peerComparison.betterThan}% of students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(spendingData.currentMonth / 30).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Per day this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">28% Under</div>
              <p className="text-xs text-muted-foreground">
                $343.77 remaining
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="spending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="comparison">Compare</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="spending" className="space-y-6">
            {/* Weekly Spending Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Weekly Spending Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyTrends.map((week, index) => {
                    const percentage = (week.spending / week.budget) * 100;
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{week.week}</span>
                          <span className="text-sm text-muted-foreground">
                            ${week.spending} / ${week.budget}
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Top Expenses */}
            <Card>
              <CardHeader>
                <CardTitle>Top Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topExpenses.map((expense, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{expense.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {expense.category} • {expense.date} 
                            {expense.frequency && ` • ${expense.frequency}`}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold">${expense.amount}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Category Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryBreakdown.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-${category.color}/10`}>
                            <IconComponent className={`w-4 h-4 text-${category.color}`} />
                          </div>
                          <span className="font-medium">{category.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">${category.amount}</span>
                          <Badge variant={category.change > 0 ? "destructive" : "secondary"}>
                            {category.change > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                            {Math.abs(category.change)}%
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={category.percentage} className="flex-1 h-2" />
                        <span className="text-xs text-muted-foreground w-12">
                          {category.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Peer Comparison
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-success">{peerComparison.percentile}%</div>
                  <p className="text-lg">You spend less than {peerComparison.betterThan}% of students</p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-2xl font-bold">${peerComparison.yourSpending}</p>
                      <p className="text-sm text-muted-foreground">Your Spending</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-2xl font-bold">${peerComparison.averageSpending}</p>
                      <p className="text-sm text-muted-foreground">Peer Average</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">How You Compare By Category</h4>
                  {categoryBreakdown.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{category.category}</span>
                      <Badge variant="secondary">
                        {category.amount < 200 ? "Below Average" : 
                         category.amount < 300 ? "Average" : "Above Average"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <Card key={index} className={`${
                  insight.type === "achievement" ? "bg-success/5 border-success/20" :
                  insight.type === "warning" ? "bg-warning/5 border-warning/20" :
                  "bg-primary/5 border-primary/20"
                }`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {insight.type === "achievement" && <Target className="w-5 h-5 text-success" />}
                      {insight.type === "warning" && <TrendingUp className="w-5 h-5 text-warning" />}
                      {insight.type === "tip" && <DollarSign className="w-5 h-5 text-primary" />}
                      {insight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-3">{insight.message}</p>
                    <Button size="sm" variant="outline">
                      {insight.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InsightsPage;