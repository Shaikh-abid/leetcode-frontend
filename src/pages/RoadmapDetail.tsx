import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    ArrowLeft,
    Star,
    Users,
    Clock,
    CheckCircle2,
    Circle,
    BookOpen,
    Video,
    FileText,
    ExternalLink,
    ChevronDown,
    Sparkles,
    Target,
    Zap,
    Trophy,
    Rocket,
    Code,
    Terminal,
    Cloud,
    Brain,
    Cpu,
    Shield,
    Palette,
    Database,
    Smartphone,
    GitBranch,
} from "lucide-react";
import { useState } from "react";
import { roadmapDetails, getDefaultRoadmapDetail } from "@/data/roadmapDetails";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
    Code: <Code className="w-8 h-8" />,
    Terminal: <Terminal className="w-8 h-8" />,
    Cloud: <Cloud className="w-8 h-8" />,
    Brain: <Brain className="w-8 h-8" />,
    Cpu: <Cpu className="w-8 h-8" />,
    Shield: <Shield className="w-8 h-8" />,
    Palette: <Palette className="w-8 h-8" />,
    Database: <Database className="w-8 h-8" />,
    Smartphone: <Smartphone className="w-8 h-8" />,
    GitBranch: <GitBranch className="w-8 h-8" />,
};

const resourceIcons: Record<string, React.ReactNode> = {
    article: <FileText className="w-4 h-4" />,
    video: <Video className="w-4 h-4" />,
    course: <BookOpen className="w-4 h-4" />,
    docs: <ExternalLink className="w-4 h-4" />,
};

export default function RoadmapDetail() {
    const { id } = useParams<{ id: string }>();
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);

    const roadmap = id && roadmapDetails[id] ? roadmapDetails[id] : getDefaultRoadmapDetail(id || "unknown");

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) =>
            prev.includes(sectionId)
                ? prev.filter((s) => s !== sectionId)
                : [...prev, sectionId]
        );
    };

    const toggleStep = (stepId: string) => {
        setCompletedSteps((prev) =>
            prev.includes(stepId)
                ? prev.filter((s) => s !== stepId)
                : [...prev, stepId]
        );
    };

    const totalSteps = roadmap.sections.reduce(
        (acc, section) => acc + section.steps.length,
        0
    );
    const progress = (completedSteps.length / totalSteps) * 100;

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner":
                return "bg-difficulty-easy/15 text-difficulty-easy border-difficulty-easy/30";
            case "Intermediate":
                return "bg-difficulty-medium/15 text-difficulty-medium border-difficulty-medium/30";
            case "Advanced":
                return "bg-difficulty-hard/15 text-difficulty-hard border-difficulty-hard/30";
            default:
                return "";
        }
    };

    return (
        <Layout>
            <div className="min-h-screen">
                {/* Hero Section with 3D Effect */}
                <div className={`relative overflow-hidden bg-gradient-to-br ${roadmap.color} py-16 md:py-24`}>
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
                        <div className="absolute bottom-10 right-20 w-96 h-96 bg-black/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />

                        {/* 3D Floating Shapes */}
                        <div className="absolute top-32 right-32 w-20 h-20 bg-white/20 rounded-xl rotate-12 backdrop-blur-sm border border-white/30 shadow-2xl animate-float" style={{ animationDelay: "0.5s" }} />
                        <div className="absolute bottom-32 left-32 w-16 h-16 bg-white/15 rounded-lg -rotate-12 backdrop-blur-sm border border-white/20 shadow-xl animate-float" style={{ animationDelay: "1.5s" }} />
                        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-lg animate-float" style={{ animationDelay: "2s" }} />
                    </div>

                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Back Button */}
                        <Link to="/roadmaps" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Roadmaps
                        </Link>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                                        {iconMap[roadmap.icon] || <Code className="w-8 h-8" />}
                                    </div>
                                    <Badge className={`${getDifficultyColor(roadmap.difficulty)} border px-3 py-1`}>
                                        {roadmap.difficulty}
                                    </Badge>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                    {roadmap.title}
                                </h1>

                                <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                                    {roadmap.longDescription}
                                </p>

                                {/* Stats Row */}
                                <div className="flex flex-wrap gap-6 mb-8">
                                    <div className="flex items-center gap-2 text-white/90">
                                        <Star className="w-5 h-5 text-yellow-300" />
                                        <span className="font-semibold">{(roadmap.stars / 1000).toFixed(1)}k</span>
                                        <span className="text-white/60">stars</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/90">
                                        <Users className="w-5 h-5" />
                                        <span className="font-semibold">{(roadmap.learners / 1000).toFixed(1)}k</span>
                                        <span className="text-white/60">learners</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/90">
                                        <Clock className="w-5 h-5" />
                                        <span className="font-semibold">{roadmap.estimatedTime}</span>
                                    </div>
                                </div>

                                <Button size="xl" className="bg-white text-gray-900 hover:bg-white/90 shadow-xl hover:shadow-2xl font-semibold gap-2">
                                    <Rocket className="w-5 h-5" />
                                    Start Learning
                                </Button>
                            </div>

                            {/* Right - 3D Card */}
                            <div className="hidden lg:block perspective-1000">
                                <div className="relative transform-gpu hover:rotate-y-3 hover:-rotate-x-3 transition-transform duration-500">
                                    {/* Main Card */}
                                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                                        {/* Progress Ring Visual */}
                                        <div className="relative w-48 h-48 mx-auto mb-6">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle
                                                    cx="96"
                                                    cy="96"
                                                    r="80"
                                                    stroke="rgba(255,255,255,0.2)"
                                                    strokeWidth="12"
                                                    fill="none"
                                                />
                                                <circle
                                                    cx="96"
                                                    cy="96"
                                                    r="80"
                                                    stroke="white"
                                                    strokeWidth="12"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeDasharray={`${progress * 5.02} 502`}
                                                    className="transition-all duration-500"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center">
                                                    <span className="text-4xl font-bold text-white">{Math.round(progress)}%</span>
                                                    <p className="text-sm text-white/60">Complete</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quick Stats */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/10 rounded-xl p-4 text-center">
                                                <span className="text-2xl font-bold text-white">{roadmap.sections.length}</span>
                                                <p className="text-sm text-white/60">Sections</p>
                                            </div>
                                            <div className="bg-white/10 rounded-xl p-4 text-center">
                                                <span className="text-2xl font-bold text-white">{totalSteps}</span>
                                                <p className="text-sm text-white/60">Steps</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Badge */}
                                    <div className="absolute -top-4 -right-4 bg-white rounded-xl px-4 py-2 shadow-xl flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                        <span className="font-semibold text-gray-900">Popular</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-16">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Prerequisites Card */}
                            <div className="glass-card p-6 sticky top-24">
                                <div className="flex items-center gap-2 mb-4">
                                    <Target className="w-5 h-5 text-primary" />
                                    <h3 className="font-semibold text-lg">Prerequisites</h3>
                                </div>
                                <ul className="space-y-3">
                                    {roadmap.prerequisites.map((prereq, index) => (
                                        <li key={index} className="flex items-start gap-3 text-muted-foreground">
                                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <span>{prereq}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="border-t border-border my-6" />

                                <div className="flex items-center gap-2 mb-4">
                                    <Trophy className="w-5 h-5 text-primary" />
                                    <h3 className="font-semibold text-lg">What You'll Learn</h3>
                                </div>
                                <ul className="space-y-3">
                                    {roadmap.outcomes.map((outcome, index) => (
                                        <li key={index} className="flex items-start gap-3 text-muted-foreground">
                                            <Zap className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                                            <span>{outcome}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="border-t border-border my-6" />

                                {/* Topics */}
                                <h3 className="font-semibold text-lg mb-4">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {roadmap.topics.map((topic) => (
                                        <Badge key={topic} variant="secondary" className="text-sm">
                                            {topic}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Roadmap Content */}
                        <div className="lg:col-span-2">
                            {/* Progress Bar */}
                            <div className="glass-card p-6 mb-8">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-semibold">Your Progress</span>
                                    <span className="text-primary font-semibold">{completedSteps.length} / {totalSteps} steps</span>
                                </div>
                                <Progress value={progress} className="h-3" />
                            </div>

                            {/* Sections */}
                            <div className="space-y-6">
                                {roadmap.sections.map((section, sectionIndex) => (
                                    <div key={section.id} className="glass-card overflow-hidden">
                                        {/* Section Header */}
                                        <button
                                            onClick={() => toggleSection(section.id)}
                                            className="w-full p-6 flex items-center justify-between hover:bg-accent/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${roadmap.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                                                    {sectionIndex + 1}
                                                </div>
                                                <div className="text-left">
                                                    <h3 className="text-xl font-bold">{section.title}</h3>
                                                    <p className="text-sm text-muted-foreground">{section.description}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm text-muted-foreground hidden sm:block">
                                                    {section.steps.filter(s => completedSteps.includes(s.id)).length}/{section.steps.length} completed
                                                </span>
                                                <ChevronDown className={cn(
                                                    "w-5 h-5 transition-transform",
                                                    expandedSections.includes(section.id) && "rotate-180"
                                                )} />
                                            </div>
                                        </button>

                                        {/* Section Steps */}
                                        {expandedSections.includes(section.id) && (
                                            <div className="border-t border-border">
                                                {section.steps.map((step, stepIndex) => (
                                                    <div
                                                        key={step.id}
                                                        className={cn(
                                                            "p-6 border-b border-border last:border-b-0 transition-colors",
                                                            completedSteps.includes(step.id) && "bg-primary/5"
                                                        )}
                                                    >
                                                        <div className="flex gap-4">
                                                            {/* Step Indicator */}
                                                            <div className="flex flex-col items-center">
                                                                <button
                                                                    onClick={() => toggleStep(step.id)}
                                                                    className={cn(
                                                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                                                        completedSteps.includes(step.id)
                                                                            ? "bg-primary text-primary-foreground"
                                                                            : "bg-secondary hover:bg-primary/20"
                                                                    )}
                                                                >
                                                                    {completedSteps.includes(step.id) ? (
                                                                        <CheckCircle2 className="w-5 h-5" />
                                                                    ) : (
                                                                        <Circle className="w-5 h-5" />
                                                                    )}
                                                                </button>
                                                                {stepIndex < section.steps.length - 1 && (
                                                                    <div className={cn(
                                                                        "w-0.5 flex-1 mt-2",
                                                                        completedSteps.includes(step.id) ? "bg-primary" : "bg-border"
                                                                    )} />
                                                                )}
                                                            </div>

                                                            {/* Step Content */}
                                                            <div className="flex-1 pb-4">
                                                                <div className="flex items-start justify-between gap-4 mb-3">
                                                                    <div>
                                                                        <h4 className="text-lg font-semibold flex items-center gap-2">
                                                                            {step.title}
                                                                            {step.isOptional && (
                                                                                <Badge variant="outline" className="text-xs">Optional</Badge>
                                                                            )}
                                                                        </h4>
                                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                                            <Clock className="w-4 h-4" />
                                                                            {step.estimatedTime}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <p className="text-muted-foreground mb-4">{step.description}</p>

                                                                {/* Topics */}
                                                                <div className="flex flex-wrap gap-2 mb-4">
                                                                    {step.topics.map((topic) => (
                                                                        <Badge key={topic} variant="secondary" className="text-xs">
                                                                            {topic}
                                                                        </Badge>
                                                                    ))}
                                                                </div>

                                                                {/* Resources */}
                                                                <div className="space-y-2">
                                                                    <span className="text-sm font-medium text-muted-foreground">Resources:</span>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {step.resources.map((resource, i) => (
                                                                            <Button
                                                                                key={i}
                                                                                variant="outline"
                                                                                size="sm"
                                                                                className="gap-2 text-xs hover:bg-primary/10 hover:text-primary hover:border-primary/50"
                                                                            >
                                                                                {resourceIcons[resource.type]}
                                                                                {resource.title}
                                                                            </Button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Completion CTA */}
                            <div className={`mt-12 bg-gradient-to-br ${roadmap.color} rounded-2xl p-8 text-center text-white relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/10" />
                                <div className="relative z-10">
                                    <Trophy className="w-16 h-16 mx-auto mb-4 opacity-90" />
                                    <h3 className="text-2xl font-bold mb-2">Ready to Master {roadmap.title}?</h3>
                                    <p className="text-white/80 mb-6 max-w-md mx-auto">
                                        Start your journey today and join thousands of learners who've transformed their careers.
                                    </p>
                                    <Button size="lg" className="bg-white text-gray-900 hover:bg-white/90 font-semibold">
                                        Begin Your Journey
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
