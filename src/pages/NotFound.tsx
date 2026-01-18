import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, ArrowLeft, Search, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dot Pattern */}
        <div className="absolute inset-0 dot-pattern opacity-30" />

        {/* Floating Orbs */}
        <div
          className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
        />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)`,
            animationDelay: "1s"
          }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-48 h-48 bg-primary/15 rounded-full blur-2xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            animationDelay: "0.5s"
          }}
        />

        {/* Floating Shapes */}
        <div className="absolute top-32 right-1/4 animate-float">
          <div className="w-16 h-16 border-4 border-primary/40 rotate-45" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float" style={{ animationDelay: "1s" }}>
          <div className="w-12 h-12 bg-primary/30 rounded-full" />
        </div>
        <div className="absolute top-1/4 left-16 animate-float" style={{ animationDelay: "2s" }}>
          <div className="w-8 h-8 border-4 border-primary/50 rounded-lg rotate-12" />
        </div>
        <div className="absolute bottom-1/4 right-16 animate-float" style={{ animationDelay: "0.5s" }}>
          <div className="w-10 h-10 bg-primary/20 rotate-45" />
        </div>

        {/* Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Glitchy 404 Number */}
        <div className="relative mb-8">
          <h1
            className="text-[12rem] md:text-[16rem] font-black leading-none select-none"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.6) 50%, hsl(var(--primary)) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 80px hsl(var(--primary)/0.5)",
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            }}
          >
            404
          </h1>

          {/* Glitch Effect Layers */}
          <h1
            className="absolute top-0 left-0 text-[12rem] md:text-[16rem] font-black leading-none select-none opacity-30 text-primary"
            style={{
              transform: `translate(${mousePosition.x * 0.8 + 4}px, ${mousePosition.y * 0.8 - 2}px)`,
              clipPath: "inset(0 0 50% 0)",
            }}
          >
            404
          </h1>
          <h1
            className="absolute top-0 left-0 text-[12rem] md:text-[16rem] font-black leading-none select-none opacity-20 text-primary"
            style={{
              transform: `translate(${mousePosition.x * 0.3 - 4}px, ${mousePosition.y * 0.3 + 2}px)`,
              clipPath: "inset(50% 0 0 0)",
            }}
          >
            404
          </h1>

          {/* Rocket Animation */}
          <div
            className="absolute -top-8 -right-8 md:right-8 animate-bounce"
            style={{ animationDuration: "3s" }}
          >
            <Rocket className="w-16 h-16 text-primary rotate-45" />
          </div>
        </div>

        {/* Message */}
        <div className="glass-card p-8 rounded-3xl border border-primary/20 backdrop-blur-xl mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Oops! Lost in <span className="text-primary">Space</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for has drifted into the void.
            Don't worry, even the best explorers get lost sometimes.
          </p>

          {/* Path Display */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Search className="w-4 h-4 text-primary" />
            <code className="text-sm text-primary font-mono">{location.pathname}</code>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/25 transition-all hover:scale-105"
          >
            <Link to="/">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 border-primary/30 hover:bg-primary/10 px-8 py-6 text-lg rounded-xl transition-all hover:scale-105"
            onClick={() => window.history.back()}
          >
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </Button>
        </div>

        {/* Fun Suggestion */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <span className="text-muted-foreground text-sm">Try exploring:</span>
          {[
            { name: "Problems", path: "/problems" },
            { name: "Roadmaps", path: "/roadmaps" },
            { name: "Profile", path: "/profile" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-sm text-foreground hover:bg-primary/10 hover:border-primary/40 transition-all hover:scale-105"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/5 to-transparent" />
    </div>
  );
};

export default NotFound;
