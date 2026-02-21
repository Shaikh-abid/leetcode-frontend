# CodeForge - Coding Interview Preparation Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-blue" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.8-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3.4-blue" alt="Tailwind">
  <img src="https://img.shields.io/badge/Vite-5.4-blue" alt="Vite">
</p>

CodeForge is a comprehensive coding interview preparation platform that helps developers practice coding problems, prepare for technical interviews, and land their dream jobs at top tech companies. The platform features curated problems, real-time code execution, AI-powered code review, and structured learning roadmaps.

## 🚀 Features

### Core Features
- **Problem Library**: Access hundreds of curated coding problems from real tech interviews
- **Real-time Code Execution**: Run your code instantly with detailed performance metrics
- **Multiple Language Support**: Write solutions in JavaScript, Python, C++, and Java
- **Difficulty Levels**: Problems categorized by Easy, Medium, and Hard difficulty
- **Progress Tracking**: Track your solved problems and monitor your progress

### AI-Powered Features
- **AI Code Reviewer**: Get instant AI-powered feedback on your code
  - Bug detection
  - Performance optimization suggestions
  - Code readability improvements
  - Error handling recommendations

### Learning Resources
- **Developer Roadmaps**: Structured learning paths for various career paths
  - Frontend Developer
  - Backend Developer
  - Full Stack Developer
  - DevOps Engineer
  - AI & Machine Learning
  - Data Structures & Algorithms
  - System Design
  - And many more...

### User Management
- **Authentication**: Secure login/signup with email and Google OAuth
- **User Profiles**: Customizable profiles with progress tracking
- **Solved Problems History**: Keep track of all problems you've solved

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components

### Core Libraries
- **React Router DOM** - Client-side routing
- **Monaco Editor** - Professional code editor (used in VS Code)
- **Axios** - HTTP client for API requests
- **TanStack React Query** - Powerful asynchronous state management
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation

### UI & Visualization
- **Lucide React** - Beautiful & consistent icons
- **Recharts** - Composable charts for data visualization
- **React Markdown** - Markdown rendering with syntax highlighting
- **Sonner** - Beautiful toast notifications

### Development Tools
- **ESLint** - JavaScript/TypeScript linting
- **PostCSS** - CSS transformations
- **Autoprefixer** - Vendor prefix automation

## 📁 Project Structure

```
code-canvas/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components (Navbar, Footer, Layout)
│   │   └── ui/              # shadcn/ui components
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx     # Authentication state management
│   │   ├── ProblemContext.jsx   # Problems data management
│   │   └── PlaylistContext.jsx  # Playlist management
│   ├── data/                # Static data files
│   │   ├── problems.ts      # Problem definitions
│   │   └── roadmapDetails.ts # Roadmap content
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries
│   │   └── axiosInstance.js   # Configured Axios instance
│   ├── pages/               # Page components
│   │   ├── Index.tsx            # Home page
│   │   ├── Login.tsx            # Login page
│   │   ├── Signup.tsx           # Signup page
│   │   ├── Problems.tsx         # Problems listing
│   │   ├── ProblemSolve.tsx     # Problem solving interface
│   │   ├── CreateProblem.tsx    # Create new problem
│   │   ├── Roadmaps.tsx         # Learning roadmaps
│   │   ├── RoadmapDetail.tsx    # Roadmap details
│   │   ├── Profile.tsx          # User profile
│   │   ├── CodeReviewer.tsx     # AI code reviewer
│   │   └── NotFound.tsx         # 404 page
│   ├── services/            # API service modules
│   │   ├── AuthService.js      # Authentication API
│   │   ├── ProblemService.js   # Problems API
│   │   ├── PlaylistService.js  # Playlist API
│   │   └── AIService.js        # AI API
│   ├── App.tsx             # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html            # HTML entry point
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── eslint.config.js      # ESLint configuration
```

## 🏃‍♂️ Getting Started

### Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **pnpm** (package manager)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd code-canvas
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open your browser**

Navigate to `http://localhost:5173` to view the application.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the production version |
| `npm run build:dev` | Build in development mode |
| `npm run lint` | Run ESLint to find code issues |
| `npm run preview` | Preview the production build |

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_api_url_here
```

### Backend API

This frontend is designed to work with a backend API. The API endpoints include:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/google` - Google OAuth login
- `POST /api/auth/logout` - User logout
- `GET /api/problems` - Get all problems
- `POST /api/problems` - Create a new problem
- `GET /api/problems/getProblemBySlug` - Get problem by slug
- `POST /api/submissions/run` - Run code submission
- `POST /api/submissions/submit` - Final code submission
- `POST /api/ai/review` - AI code review

## 🎨 Design System

### Color Palette

The project uses a sophisticated color system:

- **Primary**: Main brand color
- **Secondary**: Secondary actions
- **Success/Easy**: Green tones for easy difficulty
- **Warning/Medium**: Yellow/Orange tones for medium difficulty
- **Danger/Hard**: Red tones for hard difficulty

### Components

The UI is built using shadcn/ui components, which are:
- Accessible by default
- Customizable via Tailwind CSS
- Built on Radix UI primitives

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (below 768px)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Lucide](https://lucide.dev/) for the icon set

---

<p align="center">Built with ❤️ for developers, by developers</p>
