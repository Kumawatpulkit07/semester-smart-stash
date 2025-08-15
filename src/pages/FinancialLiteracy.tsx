import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Star, 
  Award, 
  TrendingUp, 
  PiggyBank, 
  CreditCard, 
  Target,
  Clock,
  Users,
  Trophy,
  ArrowRight,
  Lightbulb
} from "lucide-react";

const FinancialLiteracy = () => {
  const [completedLessons, setCompletedLessons] = useState([1, 2, 3]);

  const learningPaths = [
    {
      id: 1,
      title: "Budgeting Basics",
      description: "Master the fundamentals of personal budgeting",
      lessons: 8,
      duration: "2 hours",
      difficulty: "Beginner",
      progress: 75,
      icon: PiggyBank,
      color: "success"
    },
    {
      id: 2,
      title: "Credit & Debt Management",
      description: "Understand credit scores and manage debt wisely",
      lessons: 6,
      duration: "1.5 hours",
      difficulty: "Intermediate",
      progress: 33,
      icon: CreditCard,
      color: "warning"
    },
    {
      id: 3,
      title: "Investment Fundamentals",
      description: "Start your investment journey with confidence",
      lessons: 10,
      duration: "3 hours",
      difficulty: "Advanced",
      progress: 0,
      icon: TrendingUp,
      color: "primary"
    },
    {
      id: 4,
      title: "Financial Goal Setting",
      description: "Learn to set and achieve financial milestones",
      lessons: 5,
      duration: "1 hour",
      difficulty: "Beginner",
      progress: 60,
      icon: Target,
      color: "coral"
    }
  ];

  const featuredLessons = [
    {
      id: 1,
      title: "The 50/30/20 Rule Explained",
      duration: "8 min",
      type: "Video",
      difficulty: "Beginner",
      completed: true,
      description: "Learn how to allocate your income effectively"
    },
    {
      id: 2,
      title: "Building Your First Budget",
      duration: "12 min",
      type: "Interactive",
      difficulty: "Beginner",
      completed: true,
      description: "Step-by-step guide to creating a personal budget"
    },
    {
      id: 3,
      title: "Understanding Credit Scores",
      duration: "10 min",
      type: "Video",
      difficulty: "Intermediate",
      completed: true,
      description: "What affects your credit score and how to improve it"
    },
    {
      id: 4,
      title: "Emergency Fund Essentials",
      duration: "6 min",
      type: "Article",
      difficulty: "Beginner",
      completed: false,
      description: "Why you need an emergency fund and how to build one"
    },
    {
      id: 5,
      title: "Student Loan Strategies",
      duration: "15 min",
      type: "Interactive",
      difficulty: "Intermediate",
      completed: false,
      description: "Smart ways to manage and pay off student loans"
    }
  ];

  const achievements = [
    { id: 1, title: "First Steps", description: "Completed your first lesson", unlocked: true },
    { id: 2, title: "Budget Master", description: "Finished the budgeting course", unlocked: true },
    { id: 3, title: "Consistent Learner", description: "Studied for 7 days straight", unlocked: false },
    { id: 4, title: "Knowledge Seeker", description: "Completed 25 lessons", unlocked: false }
  ];

  const dailyTips = [
    "Track every expense for a week to understand your spending patterns",
    "Set up automatic transfers to your savings account",
    "Review your subscriptions monthly and cancel unused ones",
    "Use the envelope method for discretionary spending",
    "Pay yourself first - save before you spend"
  ];

  const progressStats = {
    totalLessons: 29,
    completedLessons: completedLessons.length,
    totalTime: "7.5 hours",
    completedTime: "2.5 hours",
    streak: 5,
    level: 2
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-primary" />
              Financial Literacy
            </h1>
            <p className="text-muted-foreground">Build your financial knowledge, one lesson at a time</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              Level {progressStats.level}
            </Badge>
            <Badge className="bg-success text-white flex items-center gap-1">
              🔥 {progressStats.streak} day streak
            </Badge>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressStats.completedLessons}</div>
              <p className="text-xs text-muted-foreground">
                of {progressStats.totalLessons} total
              </p>
              <Progress value={(progressStats.completedLessons / progressStats.totalLessons) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressStats.completedTime}</div>
              <p className="text-xs text-muted-foreground">
                of {progressStats.totalTime} total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{progressStats.streak}</div>
              <p className="text-xs text-muted-foreground">
                days in a row
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{achievements.filter(a => a.unlocked).length}</div>
              <p className="text-xs text-muted-foreground">
                of {achievements.length} unlocked
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="tips">Daily Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {learningPaths.map((path) => {
                const IconComponent = path.icon;
                return (
                  <Card key={path.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg bg-${path.color}/10`}>
                            <IconComponent className={`w-6 h-6 text-${path.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{path.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{path.description}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{path.difficulty}</Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{path.lessons} lessons</span>
                        <span>{path.duration}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>

                      <Button className="w-full" variant={path.progress > 0 ? "default" : "gradient"}>
                        {path.progress > 0 ? "Continue" : "Start Course"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="lessons" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Featured Lessons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {featuredLessons.map((lesson) => (
                  <div 
                    key={lesson.id} 
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        lesson.completed ? 'bg-success' : 'bg-primary/10'
                      }`}>
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <Play className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <p className="text-sm text-muted-foreground">{lesson.description}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <Badge variant="outline" className="text-xs">{lesson.type}</Badge>
                          <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                          <Badge variant="secondary" className="text-xs">{lesson.difficulty}</Badge>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant={lesson.completed ? "outline" : "default"}>
                      {lesson.completed ? "Review" : "Start"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={achievement.unlocked ? "bg-success/5 border-success/20" : ""}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        achievement.unlocked ? 'bg-success' : 'bg-muted'
                      }`}>
                        {achievement.unlocked ? (
                          <Trophy className="w-6 h-6 text-white" />
                        ) : (
                          <Trophy className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${achievement.unlocked ? 'text-success' : 'text-muted-foreground'}`}>
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <Badge className="mt-2" variant={achievement.unlocked ? "default" : "outline"}>
                          {achievement.unlocked ? "Unlocked" : "Locked"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-warning" />
                  Daily Financial Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dailyTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle>💡 Tip of the Day</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium mb-4">
                  "Start with small savings goals. Even $5 a week adds up to $260 by year end!"
                </p>
                <Button variant="gradient">
                  Set My First Goal
                  <Target className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinancialLiteracy;