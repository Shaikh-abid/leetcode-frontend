import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Bot, Send, Code2, Sparkles, Copy, Check, Trash2, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";



export default function CodeReviewer() {
    const [code, setCode] = useState("");
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const handleReview = () => {
        if (!code.trim()) return;
        setIsLoading(true);
        setResponse("");
        // Simulate AI response
        setTimeout(() => {
            const analysis = generateMockReview(code, prompt);
            setResponse(analysis);
            setIsLoading(false);
        }, 2000);
    };
    const handleCopyResponse = () => {
        navigator.clipboard.writeText(response);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const handleClear = () => {
        setCode("");
        setPrompt("");
        setResponse("");
    };
    return (
        <Layout showFooter={false}>
            <div className="min-h-[calc(100vh-4rem)] flex flex-col">
                {/* Header */}
                <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm px-6 py-4 mt-5">
                    <div className="container mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
                                    AI Code Reviewer
                                    <span className="text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                                        BETA
                                    </span>
                                </h1>
                                <p className="text-xs text-muted-foreground">Paste your code, get instant AI-powered feedback</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleClear} className="gap-1.5 text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-3.5 h-3.5" />
                            Clear All
                        </Button>
                    </div>
                </div>
                {/* Main Content */}
                <div className="flex-1 flex flex-col lg:flex-row">
                    {/* Left Panel - Code Editor */}
                    <div className="flex-1 flex flex-col border-r border-border/50 min-w-0">
                        {/* Editor Header */}
                        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50 bg-card/20">
                            <Code2 className="w-4 h-4 text-primary" />
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Code Input</span>
                            <div className="ml-auto flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                                <div className="w-2.5 h-2.5 rounded-full bg-difficulty-medium/60" />
                                <div className="w-2.5 h-2.5 rounded-full bg-difficulty-easy/60" />
                            </div>
                        </div>
                        {/* Code Editor Area */}
                        <div className="flex-1 relative">
                            <Textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder={`// Paste your code here...\n\nfunction example() {\n  // Your code will be analyzed by AI\n  const data = fetchData();\n  return data;\n}`}
                                className="absolute inset-0 resize-none border-0 rounded-none bg-background/50 font-mono text-sm leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0 p-4"
                                spellCheck={false}
                            />
                        </div>
                        {/* Prompt Input */}
                        <div className="border-t border-border/50 p-4 bg-card/20">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Input
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="Ask something... e.g. 'Find bugs' or 'How can I optimize this?'"
                                        className="pr-4 bg-background/50 border-border/50 h-11 text-sm"
                                        onKeyDown={(e) => e.key === "Enter" && handleReview()}
                                    />
                                </div>
                                <Button
                                    onClick={handleReview}
                                    disabled={!code.trim() || isLoading}
                                    className="gap-2 h-11 px-5"
                                    variant="hero"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                    Review
                                </Button>
                            </div>
                            <div className="flex gap-2 mt-3 flex-wrap">
                                {["Find bugs", "Optimize performance", "Add error handling", "Improve readability"].map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        onClick={() => setPrompt(suggestion)}
                                        className="text-[11px] px-2.5 py-1 rounded-full border border-border/50 bg-card/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Right Panel - AI Response */}
                    <div className="flex-1 flex flex-col min-w-0 bg-card/10">
                        {/* Response Header */}
                        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50 bg-card/20">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">AI Response</span>
                            {response && (
                                <button
                                    onClick={handleCopyResponse}
                                    className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {copied ? <Check className="w-3.5 h-3.5 text-difficulty-easy" /> : <Copy className="w-3.5 h-3.5" />}
                                    {copied ? "Copied" : "Copy"}
                                </button>
                            )}
                        </div>
                        {/* Response Content */}
                        <ScrollArea className="flex-1">
                            <div className="p-5">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center animate-pulse">
                                                <Bot className="w-6 h-6 text-primary" />
                                            </div>
                                            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary animate-ping" />
                                        </div>
                                        <p className="text-sm text-muted-foreground">Analyzing your code...</p>
                                    </div>
                                ) : response ? (
                                    <div className="prose prose-sm prose-invert max-w-none">
                                        <div className="space-y-4 text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap font-mono">
                                            {response}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/5 border border-border/30 flex items-center justify-center">
                                            <Sparkles className="w-7 h-7 text-muted-foreground/40" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">No analysis yet</p>
                                            <p className="text-xs text-muted-foreground/60 mt-1 max-w-[250px]">
                                                Paste your code on the left and hit Review to get AI-powered feedback
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
function generateMockReview(code: string, prompt: string): string {
    const lines = code.split("\n").length;
    const hasFunction = /function|const\s+\w+\s*=/.test(code);
    const hasAsync = /async|await|Promise|fetch/.test(code);
    const hasError = /try|catch|throw|Error/.test(code);
    const hasTodo = /TODO|FIXME|HACK/.test(code);
    let review = `📋 CODE ANALYSIS REPORT\n${"─".repeat(40)}\n\n`;
    review += `📊 Overview\n`;
    review += `   • Lines of code: ${lines}\n`;
    review += `   • Functions detected: ${hasFunction ? "Yes" : "No"}\n`;
    review += `   • Async patterns: ${hasAsync ? "Yes" : "No"}\n`;
    review += `   • Error handling: ${hasError ? "Present" : "⚠️ Missing"}\n\n`;
    if (prompt.toLowerCase().includes("bug") || prompt.toLowerCase().includes("find")) {
        review += `🐛 Potential Issues\n`;
        review += `   1. No input validation detected — consider\n      adding type checks or guard clauses.\n`;
        if (!hasError) {
            review += `   2. Missing try/catch blocks — unhandled\n      exceptions could crash the application.\n`;
        }
        if (hasAsync) {
            review += `   3. Async operations without proper error\n      boundaries — add .catch() or try/catch.\n`;
        }
        review += `\n`;
    }
    if (prompt.toLowerCase().includes("optim") || prompt.toLowerCase().includes("performance")) {
        review += `⚡ Performance Suggestions\n`;
        review += `   1. Consider memoizing expensive computations\n      using useMemo or useCallback.\n`;
        review += `   2. Avoid unnecessary re-renders by splitting\n      state into smaller, focused pieces.\n`;
        review += `   3. Use lazy loading for heavy dependencies.\n\n`;
    }
    if (prompt.toLowerCase().includes("readab") || prompt.toLowerCase().includes("clean")) {
        review += `✨ Readability Improvements\n`;
        review += `   1. Extract magic numbers into named constants.\n`;
        review += `   2. Add JSDoc comments for public functions.\n`;
        review += `   3. Use descriptive variable names instead of\n      single-letter abbreviations.\n\n`;
    }
    if (!prompt || prompt.toLowerCase().includes("review") || prompt.toLowerCase().includes("error") || prompt.toLowerCase().includes("improve")) {
        review += `🔍 General Recommendations\n`;
        review += `   1. Add input validation at function boundaries.\n`;
        if (!hasError) {
            review += `   2. Wrap critical logic in try/catch blocks.\n`;
        }
        review += `   3. Consider adding unit tests for edge cases.\n`;
        review += `   4. Use TypeScript for better type safety.\n\n`;
    }
    if (hasTodo) {
        review += `📝 TODO Items Found\n`;
        review += `   • Resolve TODO/FIXME comments before shipping.\n\n`;
    }
    review += `${"─".repeat(40)}\n`;
    review += `✅ Analysis complete. ${lines > 20 ? "Consider breaking this into smaller modules." : "Code size looks manageable."}`;
    return review;
}