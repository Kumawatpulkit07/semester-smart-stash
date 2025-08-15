import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Target, 
  Plus, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Trophy, 
  Zap,
  TrendingUp,
  Edit,
  Trash2,
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SavingsGoals = () => {
  const { toast } = useToast();
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    deadline: "",
    description: "",
    category: "travel"
  });

  const goals = [
    {
      id: 1,
      name: "Spring Break Trip",
      current: 450,
      target: 800,
      deadline: "March 2024",
      description: "Trip to Cancun with friends",
      category: "travel",
      daysLeft: 45,
      monthlyNeeded: 117,
      status: "on-track"
    },
    {
      id: 2,
      name: "New Laptop",
      current: 720,
      target: 1200,
      deadline: "August 2024",
      description: "MacBook Pro for computer science classes",
      category: "education",
      daysLeft: 120,
      monthlyNeeded: 120,
      status: "ahead"
    },
    {
      id: 3,
      name: "Emergency Fund",
      current: 300,
      target: 500,
      deadline: "December 2024",
      description: "Safety net for unexpected expenses",
      category: "emergency",
      daysLeft: 240,
      monthlyNeeded: 25,
      status: "behind"
    },
    {
      id: 4,
      name: "Car Down Payment",
      current: 1850,
      target: 2000,
      deadline: "May 2024",
      description: "Down payment for used Honda Civic",
      category: "transport",
      daysLeft: 30,
      monthlyNeeded: 50,
      status: "almost-done"
    }
  ];

  const categories = [
    { id: "travel", name: "Travel & Fun", color: "coral" },
    { id: "education", name: "Education", color: "primary" },
    { id: "emergency", name: "Emergency", color: "destructive" },
    { id: "transport", name: "Transportation", color: "success" },
    { id: "tech", name: "Technology", color: "accent" },
    { id: "other", name: "Other", color: "secondary" }
  ];

  const achievements = [
    { id: 1, title: "First Goal", description: "Created your first savings goal", unlocked: true },
    { id: 2, title: "Consistent Saver", description: "Saved for 30 days straight", unlocked: true },
    { id: 3, title: "Goal Crusher", description: "Completed your first savings goal", unlocked: false },
    { id: 4, title: "Emergency Ready", description: "Built a $500 emergency fund", unlocked: false }
  ];

  const savingsTips = [
    "Set up automatic transfers to your savings goals",
    "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings",
    "Track your progress weekly to stay motivated",
    "Consider a part-time job to boost your savings rate"
  ];

  const handleCreateGoal = () => {
    if (!newGoal.name || !newGoal.target || !newGoal.deadline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Goal Created! 🎯",
      description: `Your ${newGoal.name} goal has been set for $${newGoal.target}`,
    });

    setNewGoal({ name: "", target: "", deadline: "", description: "", category: "travel" });
    setShowCreateGoal(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ahead":
        return <Badge className="bg-success text-white">Ahead of Schedule</Badge>;
      case "on-track":
        return <Badge variant="secondary">On Track</Badge>;
      case "behind":
        return <Badge variant="destructive">Behind Schedule</Badge>;
      case "almost-done":
        return <Badge className="bg-coral text-white">Almost Done!</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const completedGoals = goals.filter(goal => goal.current >= goal.target).length;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Target className="w-8 h-8 text-primary" />
              Savings Goals
            </h1>
            <p className="text-muted-foreground">Turn your dreams into achievable financial targets</p>
          </div>
          
          <Button 
            onClick={() => setShowCreateGoal(true)} 
            variant="gradient" 
            size="lg"
            className="animate-pulse-glow"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Goal
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">${totalSaved.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                ${totalTarget - totalSaved} to go
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{goals.length}</div>
              <p className="text-xs text-muted-foreground">
                {completedGoals} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{((totalSaved / totalTarget) * 100).toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                Overall completion
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">$285</div>
              <p className="text-xs text-muted-foreground">
                Saved this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Create Goal Modal */}
        {showCreateGoal && (
          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Savings Goal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-name">Goal Name</Label>
                  <Input
                    id="goal-name"
                    placeholder="e.g., Spring Break Trip"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="target-amount">Target Amount</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      $
                    </div>
                    <Input
                      id="target-amount"
                      type="number"
                      placeholder="1000"
                      className="pl-8"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deadline">Target Date</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full p-2 border border-input rounded-md bg-background"
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="What is this goal for?"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleCreateGoal} className="flex-1" variant="gradient">
                  Create Goal
                </Button>
                <Button onClick={() => setShowCreateGoal(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const percentage = (goal.current / goal.target) * 100;
            const isCompleted = goal.current >= goal.target;
            
            return (
              <Card key={goal.id} className={`${isCompleted ? 'bg-success/5 border-success/20' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {goal.name}
                        {isCompleted && <CheckCircle className="w-5 h-5 text-success" />}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {getStatusBadge(goal.status)}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-semibold">
                        ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{percentage.toFixed(1)}% complete</span>
                      <span>{goal.daysLeft} days left</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-lg font-bold text-primary">${goal.monthlyNeeded}</p>
                      <p className="text-xs text-muted-foreground">Monthly needed</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-lg font-bold">{goal.deadline}</p>
                      <p className="text-xs text-muted-foreground">Target date</p>
                    </div>
                  </div>

                  <Button className="w-full" variant={isCompleted ? "secondary" : "default"}>
                    {isCompleted ? (
                      <>
                        <Trophy className="w-4 h-4 mr-2" />
                        Goal Achieved!
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Money
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-warning" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    achievement.unlocked ? 'bg-success/10' : 'bg-muted/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    achievement.unlocked ? 'bg-success' : 'bg-muted'
                  }`}>
                    {achievement.unlocked ? (
                      <Star className="w-5 h-5 text-white" />
                    ) : (
                      <Star className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${achievement.unlocked ? 'text-success' : 'text-muted-foreground'}`}>
                      {achievement.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Savings Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-warning" />
                Savings Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {savingsTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                  <p className="text-sm">{tip}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoals;