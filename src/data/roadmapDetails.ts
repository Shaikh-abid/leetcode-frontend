import {
  Code,
  Terminal,
  Cloud,
  GitBranch,
  Smartphone,
  Brain,
  Database,
  Shield,
  Palette,
  Cpu,
} from "lucide-react";

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  topics: string[];
  resources: { title: string; type: "article" | "video" | "course" | "docs" }[];
  estimatedTime: string;
  isOptional?: boolean;
}

export interface RoadmapSection {
  id: string;
  title: string;
  description: string;
  steps: RoadmapStep[];
}

export interface RoadmapDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  stars: number;
  learners: number;
  topics: string[];
  color: string;
  icon: string;
  prerequisites: string[];
  outcomes: string[];
  sections: RoadmapSection[];
}

export const roadmapDetails: Record<string, RoadmapDetail> = {
  frontend: {
    id: "frontend",
    title: "Frontend Developer",
    description:
      "Learn to build beautiful, responsive user interfaces with modern JavaScript frameworks",
    longDescription:
      "Master the art of creating stunning, interactive web experiences. This comprehensive roadmap takes you from HTML basics to advanced React patterns, covering everything you need to become a professional frontend developer.",
    category: "frontend",
    difficulty: "Beginner",
    estimatedTime: "3-6 months",
    stars: 15420,
    learners: 89500,
    topics: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Testing"],
    color: "from-blue-500 to-cyan-500",
    icon: "Code",
    prerequisites: [
      "Basic computer skills",
      "Text editor installed",
      "Curiosity to learn",
    ],
    outcomes: [
      "Build responsive websites from scratch",
      "Create interactive web applications with React",
      "Write type-safe code with TypeScript",
      "Implement modern CSS techniques",
      "Debug and test frontend applications",
    ],
    sections: [
      {
        id: "fundamentals",
        title: "Web Fundamentals",
        description: "Start with the building blocks of the web",
        steps: [
          {
            id: "html",
            title: "HTML - Structure of the Web",
            description:
              "Learn semantic HTML5, forms, accessibility, and best practices for structuring web content.",
            topics: [
              "Semantic HTML",
              "Forms & Validation",
              "Accessibility (a11y)",
              "SEO Basics",
              "Meta Tags",
            ],
            resources: [
              { title: "MDN HTML Guide", type: "docs" },
              { title: "HTML Crash Course", type: "video" },
              { title: "Web.dev Learn HTML", type: "course" },
            ],
            estimatedTime: "1-2 weeks",
          },
          {
            id: "css",
            title: "CSS - Styling the Web",
            description:
              "Master CSS layouts, animations, and responsive design techniques.",
            topics: [
              "Flexbox & Grid",
              "Responsive Design",
              "CSS Variables",
              "Animations",
              "CSS Architecture",
            ],
            resources: [
              { title: "CSS Complete Guide", type: "course" },
              { title: "Flexbox Froggy", type: "article" },
              { title: "Grid Garden", type: "article" },
            ],
            estimatedTime: "2-3 weeks",
          },
          {
            id: "javascript-basics",
            title: "JavaScript Fundamentals",
            description:
              "Learn core JavaScript concepts including variables, functions, DOM manipulation, and async programming.",
            topics: [
              "Variables & Data Types",
              "Functions & Scope",
              "DOM Manipulation",
              "Events",
              "Async/Await",
            ],
            resources: [
              { title: "JavaScript.info", type: "docs" },
              { title: "Eloquent JavaScript", type: "article" },
              { title: "JS Fundamentals Course", type: "course" },
            ],
            estimatedTime: "3-4 weeks",
          },
        ],
      },
      {
        id: "modern-javascript",
        title: "Modern JavaScript",
        description: "Level up with ES6+ features and advanced concepts",
        steps: [
          {
            id: "es6",
            title: "ES6+ Features",
            description:
              "Master modern JavaScript syntax and features that make code cleaner and more efficient.",
            topics: [
              "Arrow Functions",
              "Destructuring",
              "Spread/Rest",
              "Modules",
              "Classes",
            ],
            resources: [
              { title: "ES6 Features Overview", type: "article" },
              { title: "Modern JS Tutorial", type: "course" },
            ],
            estimatedTime: "1-2 weeks",
          },
          {
            id: "async",
            title: "Asynchronous JavaScript",
            description:
              "Understand promises, async/await, and how to handle asynchronous operations.",
            topics: [
              "Promises",
              "Async/Await",
              "Fetch API",
              "Error Handling",
              "Event Loop",
            ],
            resources: [
              { title: "Async JS Deep Dive", type: "video" },
              { title: "Promise Documentation", type: "docs" },
            ],
            estimatedTime: "1-2 weeks",
          },
        ],
      },
      {
        id: "react",
        title: "React Development",
        description: "Build modern web applications with React",
        steps: [
          {
            id: "react-basics",
            title: "React Fundamentals",
            description:
              "Learn component-based architecture, JSX, props, and state management basics.",
            topics: ["Components", "JSX", "Props", "State", "Lifecycle"],
            resources: [
              { title: "React Official Docs", type: "docs" },
              { title: "React Complete Guide", type: "course" },
            ],
            estimatedTime: "2-3 weeks",
          },
          {
            id: "react-hooks",
            title: "React Hooks",
            description:
              "Master useState, useEffect, and custom hooks for powerful functional components.",
            topics: [
              "useState",
              "useEffect",
              "useContext",
              "useReducer",
              "Custom Hooks",
            ],
            resources: [
              { title: "Hooks Documentation", type: "docs" },
              { title: "Hooks in Action", type: "video" },
            ],
            estimatedTime: "2 weeks",
          },
          {
            id: "state-management",
            title: "State Management",
            description:
              "Learn advanced state management patterns and libraries.",
            topics: [
              "Context API",
              "Redux Toolkit",
              "Zustand",
              "React Query",
              "Global State",
            ],
            resources: [
              { title: "Redux Toolkit Docs", type: "docs" },
              { title: "State Management Patterns", type: "article" },
            ],
            estimatedTime: "2 weeks",
          },
        ],
      },
      {
        id: "typescript",
        title: "TypeScript",
        description: "Add type safety to your JavaScript",
        steps: [
          {
            id: "ts-basics",
            title: "TypeScript Fundamentals",
            description:
              "Learn TypeScript basics and how to add type safety to your projects.",
            topics: [
              "Type Annotations",
              "Interfaces",
              "Generics",
              "Type Guards",
              "Utility Types",
            ],
            resources: [
              { title: "TypeScript Handbook", type: "docs" },
              { title: "TS for JS Developers", type: "course" },
            ],
            estimatedTime: "2-3 weeks",
          },
          {
            id: "ts-react",
            title: "TypeScript with React",
            description:
              "Integrate TypeScript into your React applications for better developer experience.",
            topics: [
              "Typing Components",
              "Typing Hooks",
              "Event Types",
              "Generic Components",
            ],
            resources: [
              { title: "React TypeScript Cheatsheet", type: "article" },
              { title: "TS + React Course", type: "course" },
            ],
            estimatedTime: "1-2 weeks",
          },
        ],
      },
      {
        id: "testing",
        title: "Testing",
        description: "Ensure code quality with testing",
        steps: [
          {
            id: "testing-basics",
            title: "Testing Fundamentals",
            description:
              "Learn unit testing, integration testing, and testing best practices.",
            topics: [
              "Jest",
              "React Testing Library",
              "Unit Tests",
              "Integration Tests",
              "Mocking",
            ],
            resources: [
              { title: "Testing Library Docs", type: "docs" },
              { title: "Testing JavaScript", type: "course" },
            ],
            estimatedTime: "2 weeks",
          },
          {
            id: "e2e",
            title: "End-to-End Testing",
            description: "Test complete user flows with E2E testing tools.",
            topics: [
              "Playwright",
              "Cypress",
              "Test Automation",
              "CI Integration",
            ],
            resources: [
              { title: "Playwright Guide", type: "docs" },
              { title: "E2E Testing Course", type: "course" },
            ],
            estimatedTime: "1 week",
            isOptional: true,
          },
        ],
      },
    ],
  },
  backend: {
    id: "backend",
    title: "Backend Developer",
    description:
      "Master server-side programming, APIs, databases, and system architecture",
    longDescription:
      "Dive deep into server-side development and learn to build robust, scalable APIs and services. From handling requests to managing databases, this roadmap covers everything needed to become a proficient backend developer.",
    category: "backend",
    difficulty: "Intermediate",
    estimatedTime: "4-8 months",
    stars: 12300,
    learners: 67200,
    topics: [
      "Node.js",
      "Python",
      "Databases",
      "REST APIs",
      "GraphQL",
      "Microservices",
    ],
    color: "from-green-500 to-emerald-500",
    icon: "Terminal",
    prerequisites: [
      "Basic programming knowledge",
      "Understanding of HTTP",
      "Command line familiarity",
    ],
    outcomes: [
      "Build RESTful APIs from scratch",
      "Design and manage databases",
      "Implement authentication and authorization",
      "Deploy and scale applications",
      "Write clean, maintainable server code",
    ],
    sections: [
      {
        id: "programming",
        title: "Server-Side Programming",
        description: "Choose your weapon and master a backend language",
        steps: [
          {
            id: "nodejs",
            title: "Node.js & Express",
            description:
              "Build fast, scalable network applications with JavaScript on the server.",
            topics: [
              "Node.js Runtime",
              "Express.js",
              "Middleware",
              "Routing",
              "Error Handling",
            ],
            resources: [
              { title: "Node.js Docs", type: "docs" },
              { title: "Express Complete Guide", type: "course" },
            ],
            estimatedTime: "3-4 weeks",
          },
          {
            id: "python",
            title: "Python Backend",
            description:
              "Build robust backends with Python using Flask or FastAPI.",
            topics: [
              "Python Basics",
              "Flask/FastAPI",
              "Async Python",
              "Package Management",
            ],
            resources: [
              { title: "FastAPI Documentation", type: "docs" },
              { title: "Python Web Dev", type: "course" },
            ],
            estimatedTime: "3-4 weeks",
            isOptional: true,
          },
        ],
      },
      {
        id: "databases",
        title: "Databases",
        description: "Store and manage data effectively",
        steps: [
          {
            id: "sql",
            title: "SQL Databases",
            description: "Master relational databases and SQL query language.",
            topics: [
              "PostgreSQL",
              "MySQL",
              "SQL Queries",
              "Joins",
              "Indexing",
              "Normalization",
            ],
            resources: [
              { title: "PostgreSQL Tutorial", type: "docs" },
              { title: "SQL Masterclass", type: "course" },
            ],
            estimatedTime: "2-3 weeks",
          },
          {
            id: "nosql",
            title: "NoSQL Databases",
            description: "Learn document, key-value, and graph databases.",
            topics: [
              "MongoDB",
              "Redis",
              "Document Stores",
              "Caching Strategies",
            ],
            resources: [
              { title: "MongoDB University", type: "course" },
              { title: "Redis Documentation", type: "docs" },
            ],
            estimatedTime: "2 weeks",
          },
          {
            id: "orm",
            title: "ORMs & Query Builders",
            description:
              "Use abstractions to interact with databases safely and efficiently.",
            topics: ["Prisma", "TypeORM", "Migrations", "Schema Design"],
            resources: [
              { title: "Prisma Docs", type: "docs" },
              { title: "ORM Best Practices", type: "article" },
            ],
            estimatedTime: "1-2 weeks",
          },
        ],
      },
      {
        id: "apis",
        title: "API Development",
        description: "Build robust APIs for your applications",
        steps: [
          {
            id: "rest",
            title: "REST API Design",
            description:
              "Design and build RESTful APIs following best practices.",
            topics: [
              "REST Principles",
              "HTTP Methods",
              "Status Codes",
              "Versioning",
              "Documentation",
            ],
            resources: [
              { title: "REST API Design Guide", type: "article" },
              { title: "OpenAPI/Swagger", type: "docs" },
            ],
            estimatedTime: "2 weeks",
          },
          {
            id: "graphql",
            title: "GraphQL",
            description:
              "Build flexible APIs with GraphQL for better client-server communication.",
            topics: [
              "Schemas",
              "Queries",
              "Mutations",
              "Resolvers",
              "Apollo Server",
            ],
            resources: [
              { title: "GraphQL Official Guide", type: "docs" },
              { title: "GraphQL Course", type: "course" },
            ],
            estimatedTime: "2-3 weeks",
          },
          {
            id: "auth",
            title: "Authentication & Authorization",
            description:
              "Secure your APIs with proper authentication mechanisms.",
            topics: [
              "JWT",
              "OAuth 2.0",
              "Session Management",
              "RBAC",
              "Security Best Practices",
            ],
            resources: [
              { title: "Auth0 Guides", type: "docs" },
              { title: "API Security Course", type: "course" },
            ],
            estimatedTime: "2 weeks",
          },
        ],
      },
      {
        id: "architecture",
        title: "Architecture & Deployment",
        description: "Scale and deploy your applications",
        steps: [
          {
            id: "microservices",
            title: "Microservices",
            description:
              "Design and build distributed systems with microservices architecture.",
            topics: [
              "Service Design",
              "API Gateway",
              "Message Queues",
              "Event-Driven",
              "Service Mesh",
            ],
            resources: [
              { title: "Microservices Patterns", type: "article" },
              { title: "Distributed Systems Course", type: "course" },
            ],
            estimatedTime: "3-4 weeks",
          },
          {
            id: "deployment",
            title: "Deployment & DevOps Basics",
            description: "Deploy your applications and set up CI/CD pipelines.",
            topics: [
              "Docker",
              "CI/CD",
              "Cloud Platforms",
              "Monitoring",
              "Logging",
            ],
            resources: [
              { title: "Docker Documentation", type: "docs" },
              { title: "Deployment Best Practices", type: "article" },
            ],
            estimatedTime: "2-3 weeks",
          },
        ],
      },
    ],
  },
  dsa: {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Master the fundamentals of DSA for technical interviews",
    longDescription:
      "Build a rock-solid foundation in data structures and algorithms. This roadmap is designed to prepare you for technical interviews at top tech companies while making you a better problem solver.",
    category: "other",
    difficulty: "Intermediate",
    estimatedTime: "3-6 months",
    stars: 22300,
    learners: 145600,
    topics: [
      "Arrays",
      "Trees",
      "Graphs",
      "Dynamic Programming",
      "Sorting",
      "Searching",
    ],
    color: "from-primary to-yellow-500",
    icon: "Cpu",
    prerequisites: [
      "Basic programming in any language",
      "Understanding of Big O notation",
      "Problem-solving mindset",
    ],
    outcomes: [
      "Solve complex algorithmic problems",
      "Ace technical interviews",
      "Optimize code for performance",
      "Understand trade-offs in data structures",
      "Think algorithmically about problems",
    ],
    sections: [
      {
        id: "basics",
        title: "Fundamentals",
        description: "Build your foundation with basic data structures",
        steps: [
          {
            id: "arrays",
            title: "Arrays & Strings",
            description:
              "Master the most fundamental data structures and common operations.",
            topics: [
              "Two Pointers",
              "Sliding Window",
              "Prefix Sum",
              "String Manipulation",
              "Matrix Operations",
            ],
            resources: [
              { title: "Array Problems Collection", type: "article" },
              { title: "String Algorithms", type: "course" },
            ],
            estimatedTime: "2-3 weeks",
          },
          {
            id: "linked-lists",
            title: "Linked Lists",
            description:
              "Understand pointers, node manipulation, and list algorithms.",
            topics: [
              "Singly Linked",
              "Doubly Linked",
              "Fast/Slow Pointers",
              "Cycle Detection",
              "Reversal",
            ],
            resources: [
              { title: "Linked List Patterns", type: "article" },
              { title: "Visual Guide to Linked Lists", type: "video" },
            ],
            estimatedTime: "1-2 weeks",
          },
          {
            id: "stacks-queues",
            title: "Stacks & Queues",
            description:
              "Learn LIFO and FIFO data structures and their applications.",
            topics: [
              "Stack Operations",
              "Queue Types",
              "Monotonic Stack",
              "Priority Queue",
              "Deque",
            ],
            resources: [
              { title: "Stack/Queue Problems", type: "article" },
              { title: "Advanced Queue Techniques", type: "video" },
            ],
            estimatedTime: "1-2 weeks",
          },
        ],
      },
      {
        id: "trees-graphs",
        title: "Trees & Graphs",
        description: "Master hierarchical and network data structures",
        steps: [
          {
            id: "trees",
            title: "Binary Trees",
            description:
              "Learn tree traversals, properties, and common algorithms.",
            topics: [
              "Traversals (In/Pre/Post/Level)",
              "BST",
              "Tree Properties",
              "LCA",
              "Serialization",
            ],
            resources: [
              { title: "Tree Algorithms Guide", type: "docs" },
              { title: "Binary Tree Masterclass", type: "course" },
            ],
            estimatedTime: "2-3 weeks",
          },
          {
            id: "graphs",
            title: "Graph Algorithms",
            description:
              "Explore graph representations and traversal algorithms.",
            topics: [
              "BFS",
              "DFS",
              "Topological Sort",
              "Union Find",
              "Shortest Path",
            ],
            resources: [
              { title: "Graph Theory Basics", type: "article" },
              { title: "Graph Algorithms Course", type: "course" },
            ],
            estimatedTime: "3-4 weeks",
          },
          {
            id: "advanced-graphs",
            title: "Advanced Graph Algorithms",
            description:
              "Master complex graph algorithms for interview success.",
            topics: [
              "Dijkstra",
              "Bellman-Ford",
              "MST",
              "Network Flow",
              "Bipartite",
            ],
            resources: [
              { title: "Advanced Graphs", type: "course" },
              { title: "Algorithm Design Manual", type: "article" },
            ],
            estimatedTime: "2-3 weeks",
          },
        ],
      },
      {
        id: "algorithms",
        title: "Core Algorithms",
        description: "Learn essential algorithmic techniques",
        steps: [
          {
            id: "sorting",
            title: "Sorting & Searching",
            description:
              "Master sorting algorithms and binary search variations.",
            topics: [
              "Quick Sort",
              "Merge Sort",
              "Binary Search",
              "Search Variations",
              "Counting Sort",
            ],
            resources: [
              { title: "Sorting Visualized", type: "video" },
              { title: "Binary Search Patterns", type: "article" },
            ],
            estimatedTime: "2 weeks",
          },
          {
            id: "recursion",
            title: "Recursion & Backtracking",
            description:
              "Solve problems using recursive thinking and backtracking.",
            topics: [
              "Recursion Basics",
              "Backtracking",
              "Subsets/Permutations",
              "N-Queens",
              "Sudoku",
            ],
            resources: [
              { title: "Recursion Masterclass", type: "course" },
              { title: "Backtracking Patterns", type: "article" },
            ],
            estimatedTime: "2-3 weeks",
          },
          {
            id: "dp",
            title: "Dynamic Programming",
            description: "Master the art of breaking down complex problems.",
            topics: [
              "Memoization",
              "Tabulation",
              "1D/2D DP",
              "State Machines",
              "Optimization",
            ],
            resources: [
              { title: "DP Patterns Guide", type: "article" },
              { title: "Dynamic Programming Course", type: "course" },
            ],
            estimatedTime: "4-6 weeks",
          },
        ],
      },
      {
        id: "advanced",
        title: "Advanced Topics",
        description: "Level up with advanced techniques",
        steps: [
          {
            id: "greedy",
            title: "Greedy Algorithms",
            description: "Learn when and how to apply greedy approaches.",
            topics: [
              "Greedy Choice",
              "Interval Problems",
              "Scheduling",
              "Huffman Coding",
            ],
            resources: [
              { title: "Greedy Algorithms Explained", type: "video" },
              { title: "Greedy Problem Set", type: "article" },
            ],
            estimatedTime: "1-2 weeks",
          },
          {
            id: "bit-manipulation",
            title: "Bit Manipulation",
            description: "Master bitwise operations for optimized solutions.",
            topics: ["Bit Operations", "Bitmasks", "XOR Tricks", "Bit DP"],
            resources: [
              { title: "Bit Manipulation Guide", type: "article" },
              { title: "Bitwise Tricks", type: "video" },
            ],
            estimatedTime: "1 week",
          },
          {
            id: "advanced-ds",
            title: "Advanced Data Structures",
            description:
              "Learn specialized data structures for complex problems.",
            topics: [
              "Segment Trees",
              "Fenwick Trees",
              "Tries",
              "LRU Cache",
              "Bloom Filters",
            ],
            resources: [
              { title: "Advanced DS Course", type: "course" },
              { title: "Competitive Programming Handbook", type: "docs" },
            ],
            estimatedTime: "2-3 weeks",
            isOptional: true,
          },
        ],
      },
    ],
  },
  devops: {
    id: "devops",
    title: "DevOps Engineer",
    description:
      "Learn CI/CD, containerization, cloud platforms, and infrastructure automation",
    longDescription:
      "Bridge the gap between development and operations. Learn to automate deployments, manage infrastructure as code, and build reliable, scalable systems that teams can depend on.",
    category: "devops",
    difficulty: "Advanced",
    estimatedTime: "6-12 months",
    stars: 9800,
    learners: 45600,
    topics: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Monitoring"],
    color: "from-purple-500 to-violet-500",
    icon: "Cloud",
    prerequisites: [
      "Linux command line proficiency",
      "Basic networking knowledge",
      "Programming experience",
    ],
    outcomes: [
      "Containerize applications with Docker",
      "Orchestrate containers with Kubernetes",
      "Automate infrastructure with Terraform",
      "Build robust CI/CD pipelines",
      "Monitor and maintain production systems",
    ],
    sections: [
      {
        id: "fundamentals",
        title: "DevOps Fundamentals",
        description: "Build your foundation in DevOps practices",
        steps: [
          {
            id: "linux",
            title: "Linux & Shell Scripting",
            description:
              "Master the command line and automate tasks with shell scripts.",
            topics: [
              "Linux Commands",
              "Bash Scripting",
              "File Systems",
              "Process Management",
              "Networking",
            ],
            resources: [
              { title: "Linux Command Line", type: "course" },
              { title: "Shell Scripting Guide", type: "docs" },
            ],
            estimatedTime: "2-3 weeks",
          },
          {
            id: "networking",
            title: "Networking Fundamentals",
            description: "Understand networking concepts crucial for DevOps.",
            topics: [
              "TCP/IP",
              "DNS",
              "HTTP/HTTPS",
              "Load Balancing",
              "Firewalls",
            ],
            resources: [
              { title: "Networking Basics", type: "video" },
              { title: "Network Troubleshooting", type: "article" },
            ],
            estimatedTime: "1-2 weeks",
          },
        ],
      },
      {
        id: "containerization",
        title: "Containerization",
        description: "Package and deploy applications in containers",
        steps: [
          {
            id: "docker",
            title: "Docker",
            description:
              "Learn to build, run, and manage containerized applications.",
            topics: [
              "Dockerfiles",
              "Images",
              "Containers",
              "Networking",
              "Volumes",
              "Compose",
            ],
            resources: [
              { title: "Docker Documentation", type: "docs" },
              { title: "Docker Mastery", type: "course" },
            ],
            estimatedTime: "2-3 weeks",
          },
          {
            id: "kubernetes",
            title: "Kubernetes",
            description: "Orchestrate containers at scale with Kubernetes.",
            topics: [
              "Pods",
              "Services",
              "Deployments",
              "ConfigMaps",
              "Helm",
              "Ingress",
            ],
            resources: [
              { title: "Kubernetes Docs", type: "docs" },
              { title: "K8s the Hard Way", type: "article" },
            ],
            estimatedTime: "4-6 weeks",
          },
        ],
      },
      {
        id: "cicd",
        title: "CI/CD",
        description: "Automate your software delivery pipeline",
        steps: [
          {
            id: "ci-basics",
            title: "CI/CD Fundamentals",
            description:
              "Understand continuous integration and delivery principles.",
            topics: [
              "CI Principles",
              "CD Strategies",
              "Pipeline Design",
              "Testing in CI",
            ],
            resources: [
              { title: "CI/CD Best Practices", type: "article" },
              { title: "DevOps Handbook", type: "article" },
            ],
            estimatedTime: "1 week",
          },
          {
            id: "github-actions",
            title: "GitHub Actions",
            description: "Build CI/CD pipelines with GitHub's native solution.",
            topics: [
              "Workflows",
              "Actions",
              "Secrets",
              "Matrix Builds",
              "Artifacts",
            ],
            resources: [
              { title: "GitHub Actions Docs", type: "docs" },
              { title: "Actions Examples", type: "article" },
            ],
            estimatedTime: "1-2 weeks",
          },
        ],
      },
      {
        id: "iac",
        title: "Infrastructure as Code",
        description: "Manage infrastructure programmatically",
        steps: [
          {
            id: "terraform",
            title: "Terraform",
            description:
              "Define and provision infrastructure using declarative configuration.",
            topics: [
              "HCL",
              "Providers",
              "State Management",
              "Modules",
              "Workspaces",
            ],
            resources: [
              { title: "Terraform Documentation", type: "docs" },
              { title: "Terraform Up and Running", type: "article" },
            ],
            estimatedTime: "3-4 weeks",
          },
          {
            id: "cloud",
            title: "Cloud Platforms",
            description: "Master major cloud platforms and their services.",
            topics: ["AWS", "GCP", "Azure", "Serverless", "Cloud Architecture"],
            resources: [
              { title: "AWS Solutions Architect", type: "course" },
              { title: "Cloud Comparison Guide", type: "article" },
            ],
            estimatedTime: "4-6 weeks",
          },
        ],
      },
      {
        id: "monitoring",
        title: "Monitoring & Observability",
        description: "Keep your systems healthy and observable",
        steps: [
          {
            id: "monitoring-tools",
            title: "Monitoring Stack",
            description:
              "Set up comprehensive monitoring for your infrastructure.",
            topics: [
              "Prometheus",
              "Grafana",
              "Metrics",
              "Alerting",
              "Dashboards",
            ],
            resources: [
              { title: "Prometheus Docs", type: "docs" },
              { title: "Grafana Tutorial", type: "video" },
            ],
            estimatedTime: "2 weeks",
          },
          {
            id: "logging",
            title: "Logging & Tracing",
            description:
              "Implement centralized logging and distributed tracing.",
            topics: [
              "ELK Stack",
              "Jaeger",
              "Log Aggregation",
              "Distributed Tracing",
            ],
            resources: [
              { title: "Logging Best Practices", type: "article" },
              { title: "Observability Guide", type: "course" },
            ],
            estimatedTime: "1-2 weeks",
          },
        ],
      },
    ],
  },
  "ai-ml": {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description:
      "Dive into artificial intelligence, machine learning, and deep learning",
    longDescription:
      "Enter the fascinating world of AI and machine learning. From basic algorithms to deep neural networks, this roadmap will guide you through the concepts and tools needed to build intelligent systems.",
    category: "ai",
    difficulty: "Advanced",
    estimatedTime: "8-12 months",
    stars: 14200,
    learners: 56700,
    topics: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Neural Networks",
      "NLP",
      "Computer Vision",
    ],
    color: "from-pink-500 to-rose-500",
    icon: "Brain",
    prerequisites: [
      "Python programming",
      "Basic mathematics",
      "Statistics fundamentals",
    ],
    outcomes: [
      "Build and train neural networks",
      "Implement ML algorithms from scratch",
      "Work with NLP and computer vision",
      "Deploy ML models to production",
      "Understand deep learning architectures",
    ],
    sections: [
      {
        id: "foundations",
        title: "Mathematical Foundations",
        description: "Build the mathematical foundation for ML",
        steps: [
          {
            id: "math",
            title: "Mathematics for ML",
            description:
              "Learn the essential math concepts for machine learning.",
            topics: [
              "Linear Algebra",
              "Calculus",
              "Probability",
              "Statistics",
              "Optimization",
            ],
            resources: [
              { title: "Mathematics for ML", type: "course" },
              { title: "3Blue1Brown Series", type: "video" },
            ],
            estimatedTime: "3-4 weeks",
          },
          {
            id: "python-data",
            title: "Python for Data Science",
            description:
              "Master Python libraries for data manipulation and analysis.",
            topics: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Jupyter"],
            resources: [
              { title: "Python Data Science Handbook", type: "article" },
              { title: "Data Analysis Course", type: "course" },
            ],
            estimatedTime: "2-3 weeks",
          },
        ],
      },
      {
        id: "ml-basics",
        title: "Machine Learning Basics",
        description: "Learn core ML algorithms and concepts",
        steps: [
          {
            id: "supervised",
            title: "Supervised Learning",
            description: "Master regression and classification algorithms.",
            topics: [
              "Linear Regression",
              "Logistic Regression",
              "Decision Trees",
              "SVM",
              "Ensemble Methods",
            ],
            resources: [
              { title: "Scikit-learn Docs", type: "docs" },
              { title: "ML Crash Course", type: "course" },
            ],
            estimatedTime: "3-4 weeks",
          },
          {
            id: "unsupervised",
            title: "Unsupervised Learning",
            description: "Learn clustering and dimensionality reduction.",
            topics: [
              "K-Means",
              "Hierarchical Clustering",
              "PCA",
              "t-SNE",
              "Anomaly Detection",
            ],
            resources: [
              { title: "Unsupervised Learning Guide", type: "article" },
              { title: "Clustering Algorithms", type: "video" },
            ],
            estimatedTime: "2-3 weeks",
          },
        ],
      },
      {
        id: "deep-learning",
        title: "Deep Learning",
        description: "Build and train neural networks",
        steps: [
          {
            id: "neural-networks",
            title: "Neural Network Fundamentals",
            description: "Understand the building blocks of deep learning.",
            topics: [
              "Perceptrons",
              "Activation Functions",
              "Backpropagation",
              "Optimization",
              "Regularization",
            ],
            resources: [
              { title: "Deep Learning Book", type: "article" },
              { title: "Neural Networks Course", type: "course" },
            ],
            estimatedTime: "3-4 weeks",
          },
          {
            id: "frameworks",
            title: "Deep Learning Frameworks",
            description: "Master TensorFlow and PyTorch for building models.",
            topics: [
              "TensorFlow",
              "PyTorch",
              "Keras",
              "Model Training",
              "GPU Acceleration",
            ],
            resources: [
              { title: "PyTorch Documentation", type: "docs" },
              { title: "TensorFlow Guide", type: "course" },
            ],
            estimatedTime: "3-4 weeks",
          },
          {
            id: "architectures",
            title: "Advanced Architectures",
            description: "Learn CNN, RNN, Transformers, and more.",
            topics: ["CNN", "RNN/LSTM", "Transformers", "Attention", "GANs"],
            resources: [
              { title: "Attention Is All You Need", type: "article" },
              { title: "Advanced DL Course", type: "course" },
            ],
            estimatedTime: "4-6 weeks",
          },
        ],
      },
      {
        id: "specializations",
        title: "Specializations",
        description: "Dive deep into specific domains",
        steps: [
          {
            id: "nlp",
            title: "Natural Language Processing",
            description: "Build systems that understand and generate text.",
            topics: [
              "Text Processing",
              "Word Embeddings",
              "BERT",
              "GPT",
              "LLMs",
            ],
            resources: [
              { title: "NLP with Transformers", type: "article" },
              { title: "Hugging Face Course", type: "course" },
            ],
            estimatedTime: "4-6 weeks",
          },
          {
            id: "cv",
            title: "Computer Vision",
            description: "Build systems that understand images and video.",
            topics: [
              "Image Classification",
              "Object Detection",
              "Segmentation",
              "Face Recognition",
            ],
            resources: [
              { title: "CS231n Stanford", type: "course" },
              { title: "OpenCV Documentation", type: "docs" },
            ],
            estimatedTime: "4-6 weeks",
          },
        ],
      },
    ],
  },
};

// Default roadmap for any ID not found
export const getDefaultRoadmapDetail = (id: string): RoadmapDetail => ({
  id,
  title: id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, " "),
  description: "Comprehensive learning path to master this technology",
  longDescription:
    "This roadmap provides a structured approach to learning, covering fundamentals to advanced topics with hands-on resources.",
  category: "other",
  difficulty: "Intermediate",
  estimatedTime: "3-6 months",
  stars: 5000,
  learners: 25000,
  topics: [
    "Fundamentals",
    "Core Concepts",
    "Advanced Topics",
    "Best Practices",
  ],
  color: "from-primary to-emerald-500",
  icon: "Code",
  prerequisites: ["Basic programming knowledge", "Willingness to learn"],
  outcomes: [
    "Understand core concepts",
    "Build real-world projects",
    "Apply best practices",
    "Solve complex problems",
  ],
  sections: [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Begin your journey with the fundamentals",
      steps: [
        {
          id: "basics",
          title: "Core Fundamentals",
          description: "Learn the essential building blocks and concepts.",
          topics: ["Introduction", "Setup", "Basic Concepts", "First Project"],
          resources: [
            { title: "Official Documentation", type: "docs" },
            { title: "Beginner Tutorial", type: "video" },
          ],
          estimatedTime: "2-3 weeks",
        },
      ],
    },
  ],
});
