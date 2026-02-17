import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css"; // Import a syntax highlighting style
import AIService from "../services/AIService";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Bot,
    Send,
    Code2,
    Sparkles,
    Copy,
    Check,
    Trash2,
    Loader2,
    ChevronDown,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Editor } from "@monaco-editor/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

// Map display labels → Monaco language identifiers
const languageMap: Record<string, string> = {
    javascript: "javascript",
    python: "python",
    java: "java",
    "c++": "cpp",
};

const languageOptions = Object.keys(languageMap);

// Default boilerplate per language
const defaultSnippets: Record<string, string> = {
    javascript:
        'function hello() {\n    console.log("Hello world!");\n}\n',
    python:
        'def hello():\n    print("Hello world!")\n',
    java:
        'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello world!");\n    }\n}\n',
    "c++":
        '#include <iostream>\n\nint main() {\n    std::cout << "Hello world!" << std::endl;\n    return 0;\n}\n',
};

export default function CodeReviewer() {
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState(defaultSnippets["javascript"]);
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const { user } = useAuth();

    const handleLanguageChange = (lang: string) => {
        setSelectedLanguage(lang);
        setCode(defaultSnippets[lang]);
    };

    // 🔴 REAL API CALL IMPLEMENTATION
    const handleReview = async () => {
        if (!code.trim()) return;

        setIsLoading(true);
        setResponse(""); // Clear previous response

        try {
            // Prepare the payload for the Backend
            const payload = {
                code: code,
                language: selectedLanguage,
                prompt: prompt
            };

            // Call the AI Service
            const result = await AIService(payload);

            // Update UI with the result (result.result comes from backend controller)
            setResponse(result.result);

        } catch (error) {
            console.error("AI Service Error:", error);
            setResponse("❌ Something went wrong. Please check your backend connection or try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopyResponse = () => {
        navigator.clipboard.writeText(response);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setCode(defaultSnippets[selectedLanguage]);
        setPrompt("");
        setResponse("");
    };


    if (!user) {
        toast.error("You must be logged in to use AI Code Reviewer.");
        return <Navigate to="/login" />;
    }

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
                                        Ask AI
                                    </span>
                                </h1>
                                <p className="text-xs text-muted-foreground">
                                    Paste your code, get instant AI-powered feedback
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClear}
                            className="gap-1.5 text-muted-foreground hover:text-destructive"
                        >
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
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Code Input
                            </span>

                            {/* ─── Language Dropdown ─── */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="ml-4 h-7 gap-1.5 text-xs font-medium border-border/50 bg-background/50 hover:bg-card capitalize"
                                    >
                                        <Code2 className="w-3.5 h-3.5 text-primary" />
                                        {selectedLanguage}
                                        <ChevronDown className="w-3 h-3 text-muted-foreground" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="min-w-[140px]">
                                    {languageOptions.map((lang) => (
                                        <DropdownMenuItem
                                            key={lang}
                                            onClick={() => handleLanguageChange(lang)}
                                            className={`capitalize text-xs ${lang === selectedLanguage
                                                ? "text-primary font-semibold"
                                                : ""
                                                }`}
                                        >
                                            {lang}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <div className="ml-auto flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                                <div className="w-2.5 h-2.5 rounded-full bg-difficulty-medium/60" />
                                <div className="w-2.5 h-2.5 rounded-full bg-difficulty-easy/60" />
                            </div>
                        </div>

                        {/* Code Editor Area */}
                        <div className="flex-1 relative">
                            <Editor
                                theme="vs-dark"
                                language={languageMap[selectedLanguage]}
                                value={code}
                                onChange={(value) => setCode(value ?? "")}
                                options={{
                                    fontSize: 16,
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    padding: { top: 12 },
                                    wordWrap: "on",
                                }}
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
                                    variant="default"
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
                                {[
                                    "Find bugs",
                                    "Optimize performance",
                                    "Add error handling",
                                    "Improve readability",
                                ].map((suggestion) => (
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
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                AI Response
                            </span>
                            {response && (
                                <button
                                    onClick={handleCopyResponse}
                                    className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {copied ? (
                                        <Check className="w-3.5 h-3.5 text-difficulty-easy" />
                                    ) : (
                                        <Copy className="w-3.5 h-3.5" />
                                    )}
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
                                        <p className="text-sm text-muted-foreground">
                                            Analyzing your code...
                                        </p>
                                    </div>
                                ) : response ? (
                                    <div className="prose prose-sm max-w-none prose-invert">
                                        <ReactMarkdown
                                            rehypePlugins={[rehypeHighlight]}
                                            components={{
                                                // 1. HEADINGS: Add spacing and color to separate sections
                                                h1: ({ node, ...props }) => (
                                                    <h1 className="text-xl font-bold mt-6 mb-3 text-primary" {...props} />
                                                ),
                                                h2: ({ node, ...props }) => (
                                                    <h2 className="text-lg font-semibold mt-6 mb-3 text-foreground border-b border-border/50 pb-1" {...props} />
                                                ),
                                                h3: ({ node, ...props }) => (
                                                    <h3 className="text-base font-medium mt-4 mb-2 text-foreground/90" {...props} />
                                                ),

                                                // 2. PARAGRAPHS: Relax the line height for readability
                                                p: ({ node, ...props }) => (
                                                    <p className="mb-4 leading-relaxed text-muted-foreground" {...props} />
                                                ),

                                                // 3. LISTS: Add spacing between bullet points so they aren't cramped
                                                ul: ({ node, ...props }) => (
                                                    <ul className="list-disc pl-6 mb-4 space-y-2 text-muted-foreground" {...props} />
                                                ),
                                                ol: ({ node, ...props }) => (
                                                    <ol className="list-decimal pl-6 mb-4 space-y-2 text-muted-foreground" {...props} />
                                                ),

                                                // 4. HIGHLIGHTS: Make **bold text** pop with a nice color
                                                strong: ({ node, ...props }) => (
                                                    <span className="font-bold text-primary" {...props} />
                                                ),

                                                // 5. INLINE CODE: Style single backtick code `like this`
                                                code: ({ inline, className, children, ...props }: any) => {
                                                    const match = /language-(\w+)/.exec(className || '');
                                                    return !inline ? (
                                                        // BLOCK CODE (handled by rehype-highlight, just adding margin)
                                                        <code className={`${className} rounded bg-card/50`} {...props}>
                                                            {children}
                                                        </code>
                                                    ) : (
                                                        // INLINE CODE
                                                        <code className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-mono text-xs border border-primary/20" {...props}>
                                                            {children}
                                                        </code>
                                                    );
                                                },

                                                // 6. BLOCKQUOTES: For "Note" or "Tip" sections
                                                blockquote: ({ node, ...props }) => (
                                                    <blockquote className="border-l-4 border-primary/30 pl-4 py-1 my-4 italic text-muted-foreground bg-primary/5 rounded-r-md" {...props} />
                                                ),
                                            }}
                                        >
                                            {response}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/5 border border-border/30 flex items-center justify-center">
                                            <Sparkles className="w-7 h-7 text-muted-foreground/40" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">
                                                No analysis yet
                                            </p>
                                            <p className="text-xs text-muted-foreground/60 mt-1 max-w-[250px]">
                                                Paste your code on the left and hit Review to get
                                                AI-powered feedback
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