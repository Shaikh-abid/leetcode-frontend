import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Star,
  Users,
  ChevronRight,
  Code,
  Database,
  Cloud,
  Smartphone,
  Brain,
  Shield,
  Palette,
  Terminal,
  GitBranch,
  Cpu,
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

interface Roadmap {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: "frontend" | "backend" | "devops" | "mobile" | "ai" | "security" | "design" | "other";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  stars: number;
  learners: number;
  topics: string[];
  color: string;
}

const roadmaps: Roadmap[] = [
  {
    id: "frontend",
    title: "Frontend Developer",
    description: "Learn to build beautiful, responsive user interfaces with modern JavaScript frameworks",
    icon: <Code className="w-6 h-6" />,
    category: "frontend",
    difficulty: "Beginner",
    estimatedTime: "3-6 months",
    stars: 15420,
    learners: 89500,
    topics: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Testing"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "backend",
    title: "Backend Developer",
    description: "Master server-side programming, APIs, databases, and system architecture",
    icon: <Terminal className="w-6 h-6" />,
    category: "backend",
    difficulty: "Intermediate",
    estimatedTime: "4-8 months",
    stars: 12300,
    learners: 67200,
    topics: ["Node.js", "Python", "Databases", "REST APIs", "GraphQL", "Microservices"],
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    description: "Learn CI/CD, containerization, cloud platforms, and infrastructure automation",
    icon: <Cloud className="w-6 h-6" />,
    category: "devops",
    difficulty: "Advanced",
    estimatedTime: "6-12 months",
    stars: 9800,
    learners: 45600,
    topics: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Monitoring"],
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "fullstack",
    title: "Full Stack Developer",
    description: "Become proficient in both frontend and backend development",
    icon: <GitBranch className="w-6 h-6" />,
    category: "other",
    difficulty: "Intermediate",
    estimatedTime: "6-12 months",
    stars: 18500,
    learners: 102300,
    topics: ["Frontend", "Backend", "Databases", "APIs", "Deployment", "Security"],
    color: "from-primary to-yellow-600",
  },
  {
    id: "android",
    title: "Android Developer",
    description: "Build native Android applications with Kotlin and modern Android practices",
    icon: <Smartphone className="w-6 h-6" />,
    category: "mobile",
    difficulty: "Intermediate",
    estimatedTime: "4-6 months",
    stars: 7200,
    learners: 38900,
    topics: ["Kotlin", "Android SDK", "Jetpack", "Material Design", "Testing", "Publishing"],
    color: "from-green-600 to-lime-500",
  },
  {
    id: "ios",
    title: "iOS Developer",
    description: "Create stunning iOS apps with Swift and Apple's development ecosystem",
    icon: <Smartphone className="w-6 h-6" />,
    category: "mobile",
    difficulty: "Intermediate",
    estimatedTime: "4-6 months",
    stars: 6800,
    learners: 34200,
    topics: ["Swift", "SwiftUI", "UIKit", "Core Data", "Testing", "App Store"],
    color: "from-gray-500 to-gray-400",
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Dive into artificial intelligence, machine learning, and deep learning",
    icon: <Brain className="w-6 h-6" />,
    category: "ai",
    difficulty: "Advanced",
    estimatedTime: "8-12 months",
    stars: 14200,
    learners: 56700,
    topics: ["Python", "TensorFlow", "PyTorch", "Neural Networks", "NLP", "Computer Vision"],
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Learn data analysis, visualization, and statistical modeling",
    icon: <Database className="w-6 h-6" />,
    category: "ai",
    difficulty: "Intermediate",
    estimatedTime: "6-9 months",
    stars: 11500,
    learners: 72100,
    topics: ["Python", "Pandas", "NumPy", "SQL", "Visualization", "Statistics"],
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Protect systems and networks from digital attacks and vulnerabilities",
    icon: <Shield className="w-6 h-6" />,
    category: "security",
    difficulty: "Advanced",
    estimatedTime: "6-12 months",
    stars: 8900,
    learners: 41200,
    topics: ["Network Security", "Ethical Hacking", "Cryptography", "OWASP", "Penetration Testing"],
    color: "from-red-500 to-orange-500",
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Design beautiful and user-friendly interfaces and experiences",
    icon: <Palette className="w-6 h-6" />,
    category: "design",
    difficulty: "Beginner",
    estimatedTime: "3-6 months",
    stars: 10200,
    learners: 58400,
    topics: ["Figma", "User Research", "Wireframing", "Prototyping", "Design Systems"],
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Master the fundamentals of DSA for technical interviews",
    icon: <Cpu className="w-6 h-6" />,
    category: "other",
    difficulty: "Intermediate",
    estimatedTime: "3-6 months",
    stars: 22300,
    learners: 145600,
    topics: ["Arrays", "Trees", "Graphs", "Dynamic Programming", "Sorting", "Searching"],
    color: "from-primary to-yellow-500",
  },
  {
    id: "system-design",
    title: "System Design",
    description: "Learn to design scalable, distributed systems for large-scale applications",
    icon: <Cloud className="w-6 h-6" />,
    category: "backend",
    difficulty: "Advanced",
    estimatedTime: "4-8 months",
    stars: 16700,
    learners: 67800,
    topics: ["Scalability", "Load Balancing", "Caching", "Databases", "Microservices", "CAP Theorem"],
    color: "from-indigo-500 to-blue-500",
  },
];

const categories = [
  { id: "all", label: "All Roadmaps" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "devops", label: "DevOps" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI/ML" },
  { id: "security", label: "Security" },
  { id: "design", label: "Design" },
];

export default function Roadmaps() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { user } = useAuth();

  const filteredRoadmaps = roadmaps.filter((roadmap) => {
    const matchesSearch =
      roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      roadmap.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      roadmap.topics.some((topic) =>
        topic.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || roadmap.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-difficulty-easy/15 text-difficulty-easy";
      case "Intermediate":
        return "bg-difficulty-medium/15 text-difficulty-medium";
      case "Advanced":
        return "bg-difficulty-hard/15 text-difficulty-hard";
      default:
        return "";
    }
  };


  if (!user) {
    toast.error("You must be logged in to view roadmaps.");
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Developer <span className="text-primary">Roadmaps</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Step-by-step learning paths to guide you from beginner to expert in various technologies
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search roadmaps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-secondary/50 border-border text-lg"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "" : "border-border"}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Roadmaps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoadmaps.map((roadmap) => (
            <div
              key={roadmap.id}
              className="glass-card overflow-hidden group hover:border-primary/50 transition-all duration-300"
            >
              {/* Gradient Header */}
              <div
                className={`h-24 bg-gradient-to-r ${roadmap.color} flex items-center justify-center relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative text-white/90">{roadmap.icon}</div>
                <div className="absolute top-2 right-2">
                  <Badge className={getDifficultyColor(roadmap.difficulty)}>
                    {roadmap.difficulty}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {roadmap.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {roadmap.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-primary" />
                    {(roadmap.stars / 1000).toFixed(1)}k
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {(roadmap.learners / 1000).toFixed(1)}k learners
                  </div>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {roadmap.topics.slice(0, 4).map((topic) => (
                    <Badge
                      key={topic}
                      variant="secondary"
                      className="text-xs font-normal"
                    >
                      {topic}
                    </Badge>
                  ))}
                  {roadmap.topics.length > 4 && (
                    <Badge variant="secondary" className="text-xs font-normal">
                      +{roadmap.topics.length - 4} more
                    </Badge>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    {roadmap.estimatedTime}
                  </span>
                  <Link to={`/roadmaps/${roadmap.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-primary hover:text-primary"
                    >
                      View Roadmap
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRoadmaps.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No roadmaps found matching your criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
