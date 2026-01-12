export type Difficulty = "easy" | "medium" | "hard";

export interface Problem {
  _id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  acceptance: number;
  tags: string[];
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: {
    javascript: string;
    python: string;
    cpp: string;
    java: string;
  };
  driverCode: {
    javascript: string;
    python: string;
    cpp: string;
    java: string;
  };

}
