import { Link, useLocation } from "react-router-dom";
import { Code2, Menu, X, User, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"
import { toast } from "sonner";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Problems", path: "/problems" },
  { name: "Roadmaps", path: "/roadmaps" },
  { name: "AI Reviewer", path: "/code-reviewer" },
  // { name: "Explore", path: "/explore" },
  // { name: "Contest", path: "/contest" },
];



export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();


  // Hide navbar on problem solve page
  const isProblemSolvePage = location.pathname.match(/^\/problems\/[^/]+$/);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isProblemSolvePage) {
    return null;
  }

  const handleLogout = () => {
    logout();
    toast("Logout successfully");
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4  backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className={`max-w-5xl mx-auto rounded-2xl border border-border/50 px-4 transition-all duration-300 ${scrolled
          ? "bg-background/70 backdrop-blur-xl shadow-lg"
          : "glass"
          }`}>
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">
                Code<span className="text-primary">Forge</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons & Create Problem */}
            <div className="hidden md:flex items-center gap-2">
              {
                isAuthenticated ? (
                  user.isAdmin && <Link to="/create-problem">
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Plus className="w-4 h-4" />
                      Create Problem
                    </Button>
                  </Link>
                ) : (
                  <></>
                )
              }

              {isAuthenticated ? (
                <>
                  <Link to="/profile">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <User className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button onClick={handleLogout} variant="ghost" size="icon" className="h-8 w-8">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="hero" size="sm">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {user?.isAdmin && (
                  <Link
                    to="/create-problem"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-primary bg-primary/10"
                  >
                    Create Problem
                  </Link>
                )}
                {
                  isAuthenticated ? (
                    <>
                      <Link to="/profile">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <User className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button onClick={handleLogout} variant="ghost" size="icon" className="h-8 w-8">
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button variant="ghost" size="sm">Sign In</Button>
                      </Link>
                      <Link to="/signup">
                        <Button variant="hero" size="sm">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
