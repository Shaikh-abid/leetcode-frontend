import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
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
  Settings,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  BookOpen,
  MessageSquare
} from "lucide-react";
import { problems } from "@/data/problems";

type Language = "javascript" | "python" | "cpp";

export default function ProblemSolve() {
  const { slug } = useParams();
  const problem = problems.find((p) => p.slug === slug) || problems[0];
  
  const [language, setLanguage] = useState<Language>("javascript");
  const [code, setCode] = useState(problem.starterCode[language]);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("description");

  const currentIndex = problems.findIndex((p) => p.slug === slug);
  const prevProblem = currentIndex > 0 ? problems[currentIndex - 1] : null;
  const nextProblem = currentIndex < problems.length - 1 ? problems[currentIndex + 1] : null;

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCode(problem.starterCode[lang]);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);
    
    // Simulate running code
    setTimeout(() => {
      setIsRunning(false);
      setOutput(`Running test cases...

Test Case 1: ✓ Passed
  Input: nums = [2,7,11,15], target = 9
  Expected: [0,1]
  Output: [0,1]

Test Case 2: ✓ Passed
  Input: nums = [3,2,4], target = 6
  Expected: [1,2]
  Output: [1,2]

All test cases passed!`);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setOutput(null);
    
    // Simulate submission
    setTimeout(() => {
      setIsRunning(false);
      setOutput(`Submission successful!

✓ 57 / 57 test cases passed
Runtime: 52 ms (beats 85.42%)
Memory: 42.3 MB (beats 67.89%)`);
    }, 2000);
  };

  const handleReset = () => {
    setCode(problem.starterCode[language]);
    setOutput(null);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar isLoggedIn />
      
      {/* Problem Navigation */}
      <div className="h-12 border-b border-border bg-card/50 flex items-center px-4 gap-4">
        <div className="flex items-center gap-2">
          {prevProblem ? (
            <Link to={`/problems/${prevProblem.slug}`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
              <ChevronLeft className="w-4 h-4" />
            </Button>
          )}
          <span className="text-sm text-muted-foreground">
            {problem.id}. {problem.title}
          </span>
          {nextProblem ? (
            <Link to={`/problems/${nextProblem.slug}`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        <Badge
          className={`${
            problem.difficulty === "Easy"
              ? "bg-difficulty-easy"
              : problem.difficulty === "Medium"
              ? "bg-difficulty-medium"
              : "bg-difficulty-hard"
          }`}
        >
          {problem.difficulty}
        </Badge>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Panel - Problem Description */}
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="h-full flex flex-col bg-card/30">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-4">
                  <TabsTrigger value="description" className="data-[state=active]:bg-secondary">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Description
                  </TabsTrigger>
                  <TabsTrigger value="solutions" className="data-[state=active]:bg-secondary">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Solutions
                  </TabsTrigger>
                  <TabsTrigger value="discuss" className="data-[state=active]:bg-secondary">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Discuss
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="flex-1 overflow-y-auto p-6 m-0">
                  <h1 className="text-xl font-bold mb-4">
                    {problem.id}. {problem.title}
                  </h1>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {problem.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div 
                    className="prose prose-invert prose-sm max-w-none mb-6"
                    dangerouslySetInnerHTML={{ __html: problem.description.replace(/\n/g, "<br />") }}
                  />
                  
                  {/* Examples */}
                  <div className="space-y-4 mb-6">
                    {problem.examples.map((example, index) => (
                      <div key={index} className="bg-secondary/50 rounded-lg p-4">
                        <div className="text-sm font-medium mb-2">Example {index + 1}:</div>
                        <div className="font-mono text-sm space-y-1">
                          <div>
                            <span className="text-muted-foreground">Input: </span>
                            {example.input}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Output: </span>
                            {example.output}
                          </div>
                          {example.explanation && (
                            <div className="text-muted-foreground mt-2">
                              <span className="text-foreground">Explanation: </span>
                              {example.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Constraints */}
                  <div>
                    <div className="text-sm font-medium mb-2">Constraints:</div>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {problem.constraints.map((constraint, index) => (
                        <li key={index} className="font-mono">{constraint}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="solutions" className="flex-1 overflow-y-auto p-6 m-0">
                  <div className="text-center text-muted-foreground py-12">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Solutions will be available after you solve the problem.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="discuss" className="flex-1 overflow-y-auto p-6 m-0">
                  <div className="text-center text-muted-foreground py-12">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Join the discussion about this problem.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Right Panel - Code Editor */}
          <ResizablePanel defaultSize={60} minSize={40}>
            <div className="h-full flex flex-col">
              {/* Editor Header */}
              <div className="h-12 border-b border-border bg-card/50 flex items-center justify-between px-4">
                <Select value={language} onValueChange={(v) => handleLanguageChange(v as Language)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Code Editor */}
              <div className="flex-1 overflow-hidden">
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={70} minSize={30}>
                    <div className="h-full bg-[hsl(220,20%,8%)]">
                      <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-full bg-transparent font-mono text-sm p-4 resize-none focus:outline-none text-foreground leading-relaxed"
                        spellCheck={false}
                      />
                    </div>
                  </ResizablePanel>
                  
                  <ResizableHandle withHandle />
                  
                  {/* Console / Output */}
                  <ResizablePanel defaultSize={30} minSize={15}>
                    <div className="h-full bg-[hsl(220,20%,6%)] flex flex-col">
                      <div className="h-10 border-b border-border px-4 flex items-center">
                        <span className="text-sm font-medium">Console</span>
                      </div>
                      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
                        {isRunning ? (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Running...
                          </div>
                        ) : output ? (
                          <pre className="whitespace-pre-wrap text-foreground/80">{output}</pre>
                        ) : (
                          <span className="text-muted-foreground">
                            Click "Run" to execute your code
                          </span>
                        )}
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
              
              {/* Action Buttons */}
              <div className="h-14 border-t border-border bg-card/50 flex items-center justify-between px-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Last saved: Just now</span>
                </div>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    onClick={handleRun}
                    disabled={isRunning}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Run
                  </Button>
                  <Button 
                    variant="hero" 
                    onClick={handleSubmit}
                    disabled={isRunning}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit
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
