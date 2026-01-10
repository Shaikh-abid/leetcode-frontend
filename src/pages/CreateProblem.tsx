import { useState } from "react";
import Editor from '@monaco-editor/react';
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  X,
  Code2,
  FileText,
  TestTube2,
  Settings,
  Lightbulb,
  Save,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProblem } from "../context/ProblemContext";

const categories = [
  "Array",
  "String",
  "Hash Table",
  "Dynamic Programming",
  "Math",
  "Sorting",
  "Greedy",
  "Depth-First Search",
  "Binary Search",
  "Breadth-First Search",
  "Tree",
  "Matrix",
  "Two Pointers",
  "Bit Manipulation",
  "Stack",
  "Heap",
  "Graph",
  "Linked List",
  "Recursion",
  "Sliding Window",
  "Backtracking",
  "Divide and Conquer",
];

const companies = [
  "Google",
  "Amazon",
  "Microsoft",
  "Facebook",
  "Apple",
  "Netflix",
  "Uber",
  "LinkedIn",
  "Twitter",
  "Adobe",
  "Oracle",
  "Salesforce",
];

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  explanation?: string;
}

interface Hint {
  id: string;
  text: string;
}

export default function CreateProblem() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [constraints, setConstraints] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: "1", input: "", expectedOutput: "", explanation: "" },
  ]);
  const [hints, setHints] = useState<Hint[]>([]);
  const [starterCode, setStarterCode] = useState({
    javascript: "function solution(input) {\n  // Your code here\n  \n}",
    python: "def solution(input):\n    # Your code here\n    pass",
    cpp: "class Solution {\npublic:\n    void solution() {\n        // Your code here\n    }\n};",
    java: "public class Solution {\n    public void solution() {\n        // Your code here\n    }\n}",
  });
  const [solution, setSolution] = useState({
    javascript: "function solution(input) {\n  // Your code here\n  \n}",
    python: "def solution(input):\n    # Your code here\n    pass",
    cpp: "class Solution {\npublic:\n    void solution() {\n        // Your code here\n    }\n};",
    java: "public class Solution {\n    public void solution() {\n        // Your code here\n    }\n}",
  });
  const [solutionExplanation, setSolutionExplanation] = useState("");
  const [timeComplexity, setTimeComplexity] = useState("");
  const [spaceComplexity, setSpaceComplexity] = useState("");
  const [driverCode, setDriverCode] = useState({
    javascript: "const result = solution(...inputs);\nconsole.log(JSON.stringify(result));",
    python: "import json\nprint(json.dumps(solution(*inputs)))",
    cpp: "// Driver code handled in backend usually for C++",
    java: "// Driver code handled in backend",
  });

  const { addProblem } = useProblem();

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const addCompany = (company: string) => {
    if (!selectedCompanies.includes(company)) {
      setSelectedCompanies([...selectedCompanies, company]);
    }
  };

  const removeCompany = (company: string) => {
    setSelectedCompanies(selectedCompanies.filter((c) => c !== company));
  };

  const addTestCase = () => {
    setTestCases([
      ...testCases,
      { id: Date.now().toString(), input: "", expectedOutput: "", explanation: "" },
    ]);
  };

  const removeTestCase = (id: string) => {
    if (testCases.length > 1) {
      setTestCases(testCases.filter((tc) => tc.id !== id));
    }
  };

  const updateTestCase = (id: string, field: keyof TestCase, value: string) => {
    setTestCases(
      testCases.map((tc) => (tc.id === id ? { ...tc, [field]: value } : tc))
    );
  };

  const addHint = () => {
    setHints([...hints, { id: Date.now().toString(), text: "" }]);
  };

  const removeHint = (id: string) => {
    setHints(hints.filter((h) => h.id !== id));
  };

  const updateHint = (id: string, text: string) => {
    setHints(hints.map((h) => (h.id === id ? { ...h, text } : h)));
  };

  const handleSubmit = async () => {
    if (!title || !difficulty || !description || !selectedTags.length || !selectedCompanies.length || !testCases.length || !hints.length || !starterCode || !solution || !timeComplexity || !spaceComplexity || !solutionExplanation || !constraints || !driverCode) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      });
      return;
    }

    // 1. Clean the data (extract text from hint objects if they are objects)
    // Your state might be [{id: 1, text: "hint"}], but backend expects ["hint"]
    const cleanedHints = hints.map(h => h.text).filter(t => t.trim() !== "");

    // Clean test cases (remove IDs if backend doesn't need them, or keep them)
    const cleanedTestCases = testCases.map(({ id, ...rest }) => rest);

    const problemData = {
      title,
      difficulty,
      description,
      tags: selectedTags,
      companies: selectedCompanies,
      testCases: cleanedTestCases,
      hints: cleanedHints,
      starterCode,
      driverCode, // Don't forget this!
      solution: {
        ...solution, // code object
        explanation: solutionExplanation,
        timeComplexity,
        spaceComplexity
      },
      constraints,
    };

    try {
      await addProblem(problemData); // Uses the context function
      toast({
        title: "Problem Created!",
        description: "Your problem has been successfully created and is pending review.",
      });
    } catch (err) {
      toast({ title: "Error In Creating Problem", variant: "destructive" });
    }

    // Here you would empty the all fields
    setTitle("");
    setDifficulty("");
    setDescription("");
    setSelectedTags([]);
    setSelectedCompanies([]);
    setTestCases([
      { id: "1", input: "", expectedOutput: "", explanation: "" },
    ]);
    setHints([]);
    setStarterCode({
      javascript: "function solution(input) {\n  // Your code here\n  \n}",
      python: "def solution(input):\n    # Your code here\n    pass",
      cpp: "class Solution {\npublic:\n    void solution() {\n        // Your code here\n    }\n};",
      java: "public class Solution {\n    public void solution() {\n        // Your code here\n    }\n}",
    });
    setSolution({
      javascript: "function solution(input) {\n  // Your code here\n  \n}",
      python: "def solution(input):\n    # Your code here\n    pass",
      cpp: "class Solution {\npublic:\n    void solution() {\n        // Your code here\n    }\n};",
      java: "public class Solution {\n    public void solution() {\n        // Your code here\n    }\n}",
    });
    setSolutionExplanation("");
    setTimeComplexity("");
    setSpaceComplexity("");
    setConstraints("");
    setDriverCode({
      javascript: "function solution(input) {\n  // Your code here\n  \n}",
      python: "def solution(input):\n    # Your code here\n    pass",
      cpp: "class Solution {\npublic:\n    void solution() {\n        // Your code here\n    }\n};",
      java: "public class Solution {\n    public void solution() {\n        // Your code here\n    }\n}",
    });

    // console.log(problemData);

  };

  return (
    <Layout showFooter={false}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Problem</h1>
          <p className="text-muted-foreground">
            Design a coding challenge for the community. Fill in all the required fields below.
          </p>
        </div>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="glass-card p-1 w-full justify-start gap-1 flex-wrap h-auto">
            <TabsTrigger value="details" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-4 h-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="testcases" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TestTube2 className="w-4 h-4" />
              Test Cases
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Code2 className="w-4 h-4" />
              Starter Code
            </TabsTrigger>
            <TabsTrigger value="solution" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Lightbulb className="w-4 h-4" />
              Solution
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="driver" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="w-4 h-4" /> {/* Or import { Terminal } from lucide-react */}
              Driver Code
            </TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <Card className="glass-card border-border">
              <CardHeader>
                <CardTitle>Problem Information</CardTitle>
                <CardDescription>Basic details about your coding problem</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Problem Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Two Sum"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty *</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Problem Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the problem in detail. Include examples and edge cases..."
                    rows={8}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-background font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">Supports Markdown formatting</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="constraints">Constraints</Label>
                  <Textarea
                    id="constraints"
                    placeholder="e.g., 1 <= nums.length <= 10^4&#10;-10^9 <= nums[i] <= 10^9"
                    rows={4}
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                    className="bg-background font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-border">
              <CardHeader>
                <CardTitle>Categories & Tags</CardTitle>
                <CardDescription>Help users find your problem</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Algorithm Categories</Label>
                  <Select onValueChange={addTag}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Add a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((c) => !selectedTags.includes(c))
                        .map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="gap-1 cursor-pointer hover:bg-destructive/20"
                        onClick={() => removeTag(tag)}
                      >
                        {tag}
                        <X className="w-3 h-3" />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Companies (Optional)</Label>
                  <Select onValueChange={addCompany}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Add a company" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies
                        .filter((c) => !selectedCompanies.includes(c))
                        .map((company) => (
                          <SelectItem key={company} value={company}>
                            {company}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedCompanies.map((company) => (
                      <Badge
                        key={company}
                        className="gap-1 cursor-pointer bg-primary/20 text-primary hover:bg-destructive/20"
                        onClick={() => removeCompany(company)}
                      >
                        {company}
                        <X className="w-3 h-3" />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Test Cases Tab */}
          <TabsContent value="testcases" className="space-y-6">
            <Card className="glass-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Test Cases</CardTitle>
                  <CardDescription>Add input/output examples for validation</CardDescription>
                </div>
                <Button onClick={addTestCase} variant="outline" size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Test Case
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {testCases.map((testCase, index) => (
                  <div
                    key={testCase.id}
                    className="p-4 rounded-lg bg-background border border-border space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Test Case {index + 1}</span>
                      {testCases.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTestCase(testCase.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Input</Label>
                        <Textarea
                          placeholder="[2,7,11,15], 9"
                          rows={3}
                          value={testCase.input}
                          onChange={(e) =>
                            updateTestCase(testCase.id, "input", e.target.value)
                          }
                          className="font-mono text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Expected Output</Label>
                        <Textarea
                          placeholder="[0,1]"
                          rows={3}
                          value={testCase.expectedOutput}
                          onChange={(e) =>
                            updateTestCase(testCase.id, "expectedOutput", e.target.value)
                          }
                          className="font-mono text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Explanation (Optional)</Label>
                      <Input
                        placeholder="Because nums[0] + nums[1] == 9, we return [0, 1]"
                        value={testCase.explanation}
                        onChange={(e) =>
                          updateTestCase(testCase.id, "explanation", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Starter Code Tab */}
          <TabsContent value="code" className="space-y-6">
            <Card className="glass-card border-border">
              <CardHeader>
                <CardTitle>Starter Code Templates</CardTitle>
                <CardDescription>Provide boilerplate code for different languages</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="javascript" className="space-y-4">
                  <TabsList className="bg-background">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="cpp">C++</TabsTrigger>
                    <TabsTrigger value="java">Java</TabsTrigger>
                  </TabsList>
                  <TabsContent value="javascript">
                    <div className="border border-border rounded-md overflow-hidden">
                      <Editor
                        height="300px"
                        defaultLanguage="javascript"
                        value={starterCode.javascript}
                        onChange={(value) =>
                          setStarterCode({ ...starterCode, javascript: value || '' })
                        }
                        theme="vs-dark"
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: 'on',
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          tabSize: 2,
                        }}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="python">
                    <div className="border border-border rounded-md overflow-hidden">
                      <Editor
                        height="300px"
                        defaultLanguage="python"
                        value={starterCode.python}
                        onChange={(value) =>
                          setStarterCode({ ...starterCode, python: value || '' })
                        }
                        theme="vs-dark"
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: 'on',
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          tabSize: 4,
                        }}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="cpp">
                    <div className="border border-border rounded-md overflow-hidden">
                      <Editor
                        height="300px"
                        defaultLanguage="cpp"
                        value={starterCode.cpp}
                        onChange={(value) =>
                          setStarterCode({ ...starterCode, cpp: value || '' })
                        }
                        theme="vs-dark"
                        options={{
                          minimap: { enabled: false },
                          fontSize: 16,
                          lineNumbers: 'on',
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          tabSize: 4,
                        }}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="java">
                    <div className="border border-border rounded-md overflow-hidden">
                      <Editor
                        height="300px"
                        defaultLanguage="java"
                        value={starterCode.java}
                        onChange={(value) =>
                          setStarterCode({ ...starterCode, java: value || '' })
                        }
                        theme="vs-dark"
                        options={{
                          minimap: { enabled: false },
                          fontSize: 16,
                          lineNumbers: 'on',
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          tabSize: 4,
                        }}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Solution Tab */}
          <TabsContent value="solution" className="space-y-6">
            <Card className="glass-card border-border">
              <CardHeader>
                <CardTitle>Solution & Explanation</CardTitle>
                <CardDescription>Provide the optimal solution and walkthrough</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="javascript" className="space-y-4">
                  <TabsList className="bg-background">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="cpp">C++</TabsTrigger>
                    <TabsTrigger value="java">Java</TabsTrigger>
                  </TabsList>
                  <TabsContent value="javascript">
                    <div className="border border-border rounded-md overflow-hidden">
                      <Editor
                        height="300px"
                        defaultLanguage="javascript"
                        value={solution.javascript}
                        onChange={(value) =>
                          setSolution({ ...solution, javascript: value || '' })
                        }
                        theme="vs-dark"
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: 'on',
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          tabSize: 2,
                        }}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="python">
                    <div className="border border-border rounded-md overflow-hidden">
                      <Editor
                        height="300px"
                        defaultLanguage="python"
                        value={solution.python}
                        onChange={(value) =>
                          setSolution({ ...solution, python: value || '' })
                        }
                        theme="vs-dark"
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: 'on',
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          tabSize: 4,
                        }}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="cpp">
                    <div className="border border-border rounded-md overflow-hidden">
                      <Editor
                        height="300px"
                        defaultLanguage="cpp"
                        value={solution.cpp}
                        onChange={(value) =>
                          setSolution({ ...solution, cpp: value || '' })
                        }
                        theme="vs-dark"
                        options={{
                          minimap: { enabled: false },
                          fontSize: 16,
                          lineNumbers: 'on',
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          tabSize: 4,
                        }}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="java">
                    <div className="border border-border rounded-md overflow-hidden">
                      <Editor
                        height="300px"
                        defaultLanguage="java"
                        value={solution.java}
                        onChange={(value) =>
                          setSolution({ ...solution, java: value || '' })
                        }
                        theme="vs-dark"
                        options={{
                          minimap: { enabled: false },
                          fontSize: 16,
                          lineNumbers: 'on',
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          tabSize: 4,
                        }}
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-2">
                  <Label>Explanation</Label>
                  <Textarea
                    rows={6}
                    placeholder="Explain the approach, time/space complexity, and any key insights..."
                    value={solutionExplanation}
                    onChange={(e) => setSolutionExplanation(e.target.value)}
                    className="bg-background"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Time Complexity</Label>
                    <Input
                      placeholder="O(n)"
                      value={timeComplexity}
                      onChange={(e) => setTimeComplexity(e.target.value)}
                      className="bg-background font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Space Complexity</Label>
                    <Input
                      placeholder="O(n)"
                      value={spaceComplexity}
                      onChange={(e) => setSpaceComplexity(e.target.value)}
                      className="bg-background font-mono"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Hints</CardTitle>
                  <CardDescription>Optional hints to help users who are stuck</CardDescription>
                </div>
                <Button onClick={addHint} variant="outline" size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Hint
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {hints.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-8">
                    No hints added yet. Click "Add Hint" to help users who get stuck.
                  </p>
                ) : (
                  hints.map((hint, index) => (
                    <div key={hint.id} className="flex gap-3 items-start">
                      <span className="text-sm text-muted-foreground mt-2.5 w-16">
                        Hint {index + 1}
                      </span>
                      <Input
                        placeholder="Think about using a hash map to store..."
                        value={hint.text}
                        onChange={(e) => updateHint(hint.id, e.target.value)}
                        className="flex-1 bg-background"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeHint(hint.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Driver Code Tab */}
          <TabsContent value="driver" className="space-y-6">
            <Card className="glass-card border-border">
              <CardHeader>
                <CardTitle>Hidden Driver Code</CardTitle>
                <CardDescription>
                  This code is hidden from the user. It calls their function and prints the result.
                  <br />
                  <span className="text-xs text-muted-foreground">Variables available: <code>inputs</code> (array of arguments)</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="javascript" className="space-y-4">
                  <TabsList className="bg-background">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="cpp">C++</TabsTrigger>
                    <TabsTrigger value="java">Java</TabsTrigger>
                  </TabsList>
                  <TabsContent value="javascript">
                    <div className="border border-border rounded-md overflow-hidden">
                      <Editor
                        height="300px"
                        defaultLanguage="javascript"
                        value={driverCode.javascript}
                        onChange={(value) =>
                          setDriverCode({ ...driverCode, javascript: value || '' })
                        }
                        theme="vs-dark"
                        options={{ minimap: { enabled: false }, fontSize: 14 }}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="python">
                    <div className="border border-border rounded-md overflow-hidden">
                      <Editor
                        height="300px"
                        defaultLanguage="python"
                        value={driverCode.python}
                        onChange={(value) =>
                          setDriverCode({ ...driverCode, python: value || '' })
                        }
                        theme="vs-dark"
                        options={{ minimap: { enabled: false }, fontSize: 14 }}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="cpp">
                    <div className="border border-border rounded-md overflow-hidden">
                      <Editor
                        height="300px"
                        defaultLanguage="cpp"
                        value={driverCode.cpp}
                        onChange={(value) =>
                          setDriverCode({ ...driverCode, cpp: value || '' })
                        }
                        theme="vs-dark"
                        options={{ minimap: { enabled: false }, fontSize: 14 }}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="java">
                    <div className="border border-border rounded-md overflow-hidden">
                      <Editor
                        height="300px"
                        defaultLanguage="java"
                        value={driverCode.java}
                        onChange={(value) =>
                          setDriverCode({ ...driverCode, java: value || '' })
                        }
                        theme="vs-dark"
                        options={{ minimap: { enabled: false }, fontSize: 14 }}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-card border-border">
              <CardHeader>
                <CardTitle>Problem Settings</CardTitle>
                <CardDescription>Configure additional options for your problem</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Time Limit (ms)</Label>
                    <Input
                      type="number"
                      placeholder="1000"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Memory Limit (MB)</Label>
                    <Input
                      type="number"
                      placeholder="256"
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Problem Source (Optional)</Label>
                  <Input
                    placeholder="e.g., LeetCode, Codeforces, Original"
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Related Problems (Optional)</Label>
                  <Input
                    placeholder="Enter problem IDs separated by commas"
                    className="bg-background"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 mt-8 pb-8">
          <Button variant="outline" className="gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button variant="hero" onClick={handleSubmit} className="gap-2">
            <Save className="w-4 h-4" />
            Create Problem
          </Button>
        </div>
      </div>
    </Layout>
  );
}
