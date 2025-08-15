import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Shield, 
  TrendingUp, 
  Users, 
  Star,
  CheckCircle,
  Sparkles
} from "lucide-react";
import financialHero from "@/assets/financial-hero.jpg";

const HeroSection = () => {
  const features = [
    { icon: Smartphone, title: "Mobile-First", description: "Designed for your digital lifestyle" },
    { icon: Shield, title: "Secure", description: "Bank-grade security for your data" },
    { icon: TrendingUp, title: "Smart Insights", description: "AI-powered financial guidance" },
    { icon: Users, title: "Student-Focused", description: "Built specifically for college life" }
  ];

  const testimonials = [
    { name: "Sarah M.", text: "Finally, a financial app that gets student life!", rating: 5 },
    { name: "Alex K.", text: "Helped me save $500 in my first semester!", rating: 5 },
    { name: "Jordan L.", text: "Love the budgeting categories for textbooks and food.", rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-8">
              <div className="space-y-2">
                <Badge className="bg-white/20 text-white border-white/30" variant="outline">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Now in Beta
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  Your Money,
                  <span className="block text-coral">Simplified</span>
                </h1>
              </div>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                The student-first financial platform that blends effortlessly into your digital routine 
                and builds lasting financial confidence from your very first semester.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 shadow-2xl font-semibold"
                >
                  Get Started Free
                  <TrendingUp className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/10 font-semibold"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>Student discounts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>24/7 support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={financialHero} 
                  alt="Students managing finances with Semester Smart Stash"
                  className="w-full h-auto rounded-2xl shadow-2xl animate-float"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-xl"></div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm text-white/80">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Social Proof */}
          <div className="text-center space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Trusted by 10,000+ Students</h2>
              <p className="text-white/80">Join the financial revolution on campuses nationwide</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-white/90 italic">"{testimonial.text}"</p>
                    <p className="text-white/70 font-semibold">- {testimonial.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-8">
              <Button 
                variant="gradient" 
                size="lg" 
                className="font-semibold shadow-2xl animate-pulse-glow"
              >
                Start Your Financial Journey
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;