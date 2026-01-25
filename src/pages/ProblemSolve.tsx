/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Play,
  Send,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Loader2,
  BookOpen,
  MessageSquare,
  History,
  Code,
  Calendar,
  CircleCheckBig
} from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { useProblem } from "../context/ProblemContext";
import { useAuth } from "../context/AuthContext";
import { Problem } from "../data/problems";

// --- TYPES ---
interface ExecutionResult {
  success: boolean;
  status: string;
  results?: {
    caseId: number;
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
  }[];
  error?: string;
}

type Language = "javascript" | "python" | "cpp" | "java";

interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

// --- HELPER COMPONENT: Styled Text ---
const StyledText = ({ text, isConstraint = false }: { text: string; isConstraint?: boolean }) => {
  if (!text) return null;
  const lines = text.split(/\\n|\n/);

  return (
    <div className={`space-y-1 ${isConstraint ? "font-mono text-xs" : "text-sm"}`}>
      {lines.map((line, index) => {
        if (!line.trim()) return <div key={index} className="h-2" />;
        const isBullet = line.trim().startsWith("-");
        const cleanLine = isBullet ? line.trim().substring(1).trim() : line;

        const parts = cleanLine.split(/(\*\*.*?\*\*|`.*?`)/g).map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <span key={i} className="font-bold text-foreground">{part.slice(2, -2)}</span>;
          }
          if (part.startsWith("`") && part.endsWith("`")) {
            return <code key={i} className="bg-secondary px-1 py-0.5 rounded text-foreground font-mono text-xs border border-border/50">{part.slice(1, -1)}</code>;
          }
          return part;
        });

        return (
          <div key={index} className={`flex ${isBullet ? "gap-2 ml-2" : ""}`}>
            {isBullet && <span className="text-muted-foreground">•</span>}
            <span className={`text-muted-foreground/90 leading-relaxed ${isConstraint ? "text-foreground/80" : ""}`}>{parts}</span>
          </div>
        );
      })}
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function ProblemSolve() {
  const { slug } = useParams();
  const { fetchProblem, currentProblem, problems, error, loading, runUserCode, finalSubmit, fetchSubmissions, mySubmissions } = useProblem();
  const { user } = useAuth();

  // 1. Add state to track the expanded submission
  const [activeSubmissionId, setActiveSubmissionId] = useState<string | null>(null);

  const toggleSubmission = (id: string) => {
    setActiveSubmissionId(prev => prev === id ? null : id);
  };

  const [language, setLanguage] = useState<Language>("javascript");
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  // Stores the detailed result object from the API
  const [result, setResult] = useState<ExecutionResult | null>(null);

  useEffect(() => {
    fetchProblem(slug);
  }, [slug]);

  useEffect(() => {
    fetchSubmissions(slug);
  }, [slug]);


  useEffect(() => {
    if (currentProblem && currentProblem.starterCode) {
      setCode(currentProblem.starterCode[language] || "");
    }
  }, [currentProblem, language]);

  const currentIndex = problems.findIndex((p: Problem) => p.slug === slug);
  const prevProblem = currentIndex > 0 ? problems[currentIndex - 1] : null;
  const nextProblem = currentIndex >= 0 && currentIndex < problems.length - 1 ? problems[currentIndex + 1] : null;

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    if (currentProblem?.starterCode) {
      setCode(currentProblem.starterCode[lang] || "");
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setResult(null); // Clear previous results

    try {
      // Call the API
      const res = await runUserCode(language, code, slug);
      setResult(res); // Store the full object, not just a string
    } catch (error) {
      setResult({
        success: false,
        status: "Error",
        error: "An error occurred while communicating with the server."
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    setResult(null); // Optional: Clear previous run results or keep them

    try {
      // 1. Call the Context function
      const res = await finalSubmit(language, code, slug);

      // 2. Set the result to display detailed output (Test cases)
      setResult(res);

      if (res.status === "Accepted" || res.status === "Wrong Answer") {
        // 👇 REFRESH HISTORY IMMEDIATELY
        fetchSubmissions(slug);
      }

      // 3. Show Toast Notification based on status
      if (res.status === "Accepted") {
        toast.success("Problem Solved! 🎉");
        // Optional: Play a sound effect here
      } else if (res.status === "Wrong Answer") {
        toast.error("Solution was not accepted. Check test cases.");
      } else {
        toast.error("Runtime Error or Compilation Failed.");
      }

    } catch (error) {
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsRunning(false);
    }
  };
  const handleReset = () => {
    if (currentProblem?.starterCode) {
      setCode(currentProblem.starterCode[language] || "");
    }
    setResult(null);
  };

  if (loading || !currentProblem) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-muted-foreground gap-2">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span>Loading Problem...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-destructive">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!user) {
    toast.error("You must be logged in to solve problems.");
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="h-12 border-b border-border bg-card/50 flex items-center px-4 gap-4">
        <div className="flex items-center gap-2">
          <Link to={prevProblem ? `/problems/${prevProblem.slug}` : "#"}>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={!prevProblem}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </Link>
          <span className="text-sm text-muted-foreground font-medium">
            {currentIndex >= 0 ? currentIndex + 1 : "?"}. {currentProblem.title}
          </span>
          <Link to={nextProblem ? `/problems/${nextProblem.slug}` : "#"}>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={!nextProblem}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <Badge variant="outline" className={`text-xs ${currentProblem.difficulty === "easy" ? "bg-green-500" : currentProblem.difficulty === "medium" ? "bg-yellow-500" : "bg-red-500"}`}>{currentProblem.difficulty.toUpperCase()}</Badge>
      </div>

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">

          {/* LEFT PANEL: Description */}
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="h-full flex flex-col bg-card/30">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
                <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-4">
                  <TabsTrigger value="description" className="data-[state=active]:bg-secondary">
                    <BookOpen className="w-4 h-4 mr-2" /> Description
                  </TabsTrigger>
                  <TabsTrigger value="Submissions" className="data-[state=active]:bg-secondary">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Submissions
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="flex-1 overflow-y-auto min-h-0 m-0">
                  <div className="p-6 pb-20">
                    <div className="flex items-center justify-between mb-6">
                      <h1 className="text-2xl font-bold mb-4">{currentProblem.title}</h1>
                      {
                        mySubmissions.length > 0 && (
                          <div>
                            <p className="text-sm text-muted-foreground flex items-center gap-2 "><span className="text-green-500 "><CircleCheckBig /></span> Solved </p>
                          </div>
                        )
                      }
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {currentProblem.tags?.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>

                    <div className="mb-8">
                      <StyledText text={currentProblem.description} />
                    </div>

                    <div className="space-y-6 mb-8">
                      {currentProblem.testCases?.map((testCase: TestCase, index: number) => (
                        <div key={index} className="bg-secondary/50 rounded-lg p-4 border border-border/50">
                          <div className="text-sm font-semibold mb-3">Example {index + 1}:</div>
                          <div className="font-mono text-sm space-y-2">
                            <div className="flex gap-2">
                              <span className="text-muted-foreground min-w-[60px]">Input:</span>
                              <span className="text-foreground">{testCase.input}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-muted-foreground min-w-[60px]">Output:</span>
                              <span className="text-foreground">{testCase.output}</span>
                            </div>
                            {testCase.explanation && (
                              <div className="flex gap-2 pt-1">
                                <span className="text-muted-foreground min-w-[60px]">Expl:</span>
                                <span className="text-muted-foreground/80 italic">{testCase.explanation}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {currentProblem.constraints && (
                      <div className="mt-8 border-t border-border/50 pt-6">
                        <div className="text-sm font-medium mb-4 text-foreground">Constraints:</div>
                        <div className="bg-secondary/20 border border-border/50 rounded-lg p-4">
                          <StyledText text={currentProblem.constraints} isConstraint={true} />
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="Submissions" className="flex-1 overflow-y-auto min-h-0 m-0 p-0">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <History className="w-5 h-5 text-primary" />
                        Submission History
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {mySubmissions && mySubmissions.length > 0 ? (
                        mySubmissions.map((sub: any, idx: number) => {
                          const isOpen = activeSubmissionId === (sub._id || idx);

                          return (
                            <div
                              key={sub._id || idx}
                              className={`border rounded-lg transition-all overflow-hidden ${isOpen
                                ? "bg-card border-primary/50 ring-1 ring-primary/20"
                                : "bg-card/50 border-border/50 hover:bg-card/80"
                                }`}
                            >
                              {/* ACCORDION HEADER - CLICK TO TOGGLE */}
                              <div
                                onClick={() => toggleSubmission(sub._id || idx)}
                                className="p-4 cursor-pointer flex items-center justify-between"
                              >
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-3">
                                    <span
                                      className={`font-bold ${sub.status === "Accepted" ? "text-green-500" : "text-red-500"
                                        }`}
                                    >
                                      {sub.status}
                                    </span>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      {new Date(sub.createdAt).toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Code className="w-3 h-3" />
                                    <span className="capitalize">{sub.language}</span>
                                  </div>
                                </div>

                                {/* Arrow Icon */}
                                {isOpen ? (
                                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                )}
                              </div>

                              {/* ACCORDION BODY - EDITOR */}
                              {isOpen && (
                                <div className="border-t border-border/50 p-4 bg-background/50">
                                  <div className="h-[300px] w-full rounded-md overflow-hidden border border-border/30">
                                    <Editor
                                      value={sub.code}
                                      language={sub.language}
                                      theme="vs-dark"
                                      // Note: Removed onChange here because this is history (view-only).
                                      // Added readOnly: true to options so user doesn't try to edit history.
                                      options={{
                                        minimap: { enabled: false },
                                        fontSize: 14,
                                        automaticLayout: true,
                                        padding: { top: 16 },
                                        readOnly: true, // Prevent editing history
                                        scrollBeyondLastLine: false
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-12 text-muted-foreground">
                          <History className="w-12 h-12 mx-auto mb-3 opacity-20" />
                          <p>No submissions yet.</p>
                          <p className="text-xs mt-1">Solve the problem to see your history here!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* RIGHT PANEL: Editor & Console */}
          <ResizablePanel defaultSize={60} minSize={40}>
            <div className="h-full flex flex-col">
              <div className="h-12 border-b border-border bg-card/50 flex items-center justify-between px-4">
                <Select value={language} onValueChange={(v) => handleLanguageChange(v as Language)}>
                  <SelectTrigger className="w-40 bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={handleReset}><RotateCcw className="w-4 h-4" /></Button>
              </div>

              <div className="flex-1 overflow-hidden">
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={70} minSize={30}>
                    <Editor
                      value={code}
                      onChange={(v) => setCode(v || "")}
                      language={language}
                      theme="vs-dark"
                      options={{ minimap: { enabled: false }, fontSize: 16, automaticLayout: true, padding: { top: 16 } }}
                    />
                  </ResizablePanel>
                  <ResizableHandle withHandle />

                  {/* CONSOLE / OUTPUT SECTION */}
                  <ResizablePanel defaultSize={30} minSize={15}>
                    <div className="h-full bg-[hsl(220,20%,6%)] flex flex-col">
                      <div className="h-10 border-b border-border/50 px-4 flex items-center bg-card/20">
                        <span className="text-sm font-medium text-muted-foreground">Test Results</span>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
                        {isRunning ? (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Running Code...
                          </div>
                        ) : result ? (
                          <div className="space-y-4">
                            {/* Status Header */}
                            <div className={`text-lg font-bold ${result.status === "Accepted" ? "text-green-500" : "text-red-500"}`}>
                              {result.status}
                            </div>

                            {/* Compilation/Runtime Error */}
                            {result.error && (
                              <div className="p-3 rounded border border-red-500/20 bg-red-500/10 text-red-400 whitespace-pre-wrap">
                                {result.error}
                              </div>
                            )}

                            {/* Test Cases List */}
                            {result.results && (
                              <div className="space-y-3">
                                {result.results.map((res) => (
                                  <div key={res.caseId} className="border border-border/50 rounded-md overflow-hidden">
                                    <div className="flex items-center gap-2 bg-card/50 px-3 py-2 border-b border-border/50">
                                      {res.passed ? (
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                      ) : (
                                        <XCircle className="w-4 h-4 text-red-500" />
                                      )}
                                      <span className="text-xs font-medium uppercase text-muted-foreground">Test Case {res.caseId}</span>
                                    </div>

                                    <div className="p-3 space-y-2 bg-card/20">
                                      <div>
                                        <div className="text-xs text-muted-foreground mb-1">Input</div>
                                        <div className="bg-background/50 p-2 rounded text-xs border border-border/50">{res.input}</div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <div className="text-xs text-muted-foreground mb-1">Your Output</div>
                                          <div className={`p-2 rounded text-xs border border-border/50 ${res.passed ? "bg-background/50" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                                            {res.actual}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-xs text-muted-foreground mb-1">Expected</div>
                                          <div className="bg-background/50 p-2 rounded text-xs border border-border/50">{res.expected}</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-muted-foreground/50 italic text-xs">
                            Run your code to see results here...
                          </div>
                        )}
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>

              {/* Action Buttons */}
              <div className="h-14 border-t border-border bg-card/50 flex items-center justify-between px-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {/* <Clock className="w-4 h-4" /> <span>Last saved: Just now</span> */}
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="secondary" onClick={handleRun} disabled={isRunning} className="gap-2">
                    <Play className="w-4 h-4" /> Run
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleSubmit}
                    // DISABLE LOGIC: Must not be running AND must have a result
                    disabled={isRunning || !result}
                    className="gap-2 px-6"
                  >
                    <Send className="w-4 h-4" /> Submit
                  </Button>
                </div>
              </div>
            </div>
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>
    </div>
  );
}