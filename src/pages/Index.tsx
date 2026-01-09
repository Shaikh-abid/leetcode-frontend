import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  Trophy, 
  Users, 
  Zap, 
  Target, 
  BookOpen, 
  ArrowRight,
  CheckCircle2 
} from "lucide-react";

const stats = [
  { value: "2,500+", label: "Coding Problems" },
  { value: "1M+", label: "Active Users" },
  { value: "500+", label: "Companies" },
  { value: "50+", label: "Languages" },
];

const features = [
  {
    icon: Target,
    title: "Curated Problems",
    description: "Hand-picked problems from real tech interviews at top companies.",
  },
  {
    icon: Zap,
    title: "Real-time Feedback",
    description: "Instant code execution with detailed performance metrics.",
  },
  {
    icon: Trophy,
    title: "Weekly Contests",
    description: "Compete with developers worldwide and climb the leaderboard.",
  },
  {
    icon: BookOpen,
    title: "Learn by Doing",
    description: "Comprehensive explanations and multiple solution approaches.",
  },
];

const topProblems = [
  { id: 1, title: "Two Sum", difficulty: "Easy", acceptance: 49.2 },
  { id: 2, title: "Add Two Numbers", difficulty: "Medium", acceptance: 40.5 },
  { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", acceptance: 36.1 },
  { id: 5, title: "Valid Parentheses", difficulty: "Easy", acceptance: 40.7 },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
        
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Zap className="w-4 h-4" />
              <span>The #1 Platform for Coding Interview Prep</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Master Your{" "}
              <span className="gradient-text">Coding Skills</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              Practice coding problems, prepare for technical interviews, and land your dream job at top tech companies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/signup">
                <Button variant="hero" size="xl">
                  Start Coding Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/problems">
                <Button variant="outline" size="xl">
                  Explore Problems
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="text-primary">Succeed</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools and resources you need to ace your next coding interview.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card p-6 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Problems Section */}
      <section className="py-24 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Problems</h2>
              <p className="text-muted-foreground">
                Start with our most popular coding challenges
              </p>
            </div>
            <Link to="/problems">
              <Button variant="ghost" className="mt-4 md:mt-0">
                View All Problems
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid gap-4">
            {topProblems.map((problem, index) => (
              <Link
                key={problem.id}
                to={`/problems/${problem.id}`}
                className="glass-card p-4 flex items-center justify-between hover:border-primary/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground font-mono w-8">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {problem.title}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      problem.difficulty === "Easy"
                        ? "bg-difficulty-easy"
                        : problem.difficulty === "Medium"
                        ? "bg-difficulty-medium"
                        : "bg-difficulty-hard"
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                  <span className="text-muted-foreground text-sm hidden sm:block">
                    {problem.acceptance}% Acceptance
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
            <div className="relative">
              <Code2 className="w-16 h-16 mx-auto text-primary mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Level Up Your Skills?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join millions of developers who are preparing for their dream jobs with CodeForge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button variant="hero" size="lg">
                    Get Started for Free
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Free forever plan
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
