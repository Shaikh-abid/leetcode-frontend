<div align="center">

# 🧠 LeetCode Practice Platform

### A full-featured coding practice platform inspired by LeetCode — built with React, TypeScript & Node.js

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

[Live Demo](#) · [Report Bug](https://github.com/Shaikh-abid/leetcode-frontend/issues) · [Request Feature](https://github.com/Shaikh-abid/leetcode-frontend/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🚀 About the Project

**LeetCode Practice Platform** is a full-stack web application designed to help developers level up their problem-solving skills. Inspired by LeetCode, this platform provides an intuitive and beautiful interface to browse coding problems, write and execute code, and track your progress — all in one place.

Whether you're preparing for technical interviews or sharpening your algorithms knowledge, this platform has you covered.

> Built as a passion project to reimagine the coding practice experience with a modern, clean UI and smooth developer experience.

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🖊️ **Code Editor & Submission** | Write, run, and submit code with a rich in-browser editor |
| 📋 **Problem Listing & Filtering** | Browse problems by difficulty, topic, and status |
| 🔐 **User Authentication** | Secure sign-up, login, and session management |
| 🌙 **Dark Mode** | Toggle between light and dark themes effortlessly |
| 📊 **Progress Tracking** | Monitor your solved problems, streaks, and statistics |
| 📱 **Responsive Design** | Optimized for desktop, tablet, and mobile screens |

---

## 🛠 Tech Stack

### Frontend
- **[React.js](https://reactjs.org/)** — Component-based UI library
- **[TypeScript](https://www.typescriptlang.org/)** — Strongly typed JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first CSS framework

### Backend
- **[Node.js](https://nodejs.org/)** — JavaScript runtime
- **[Express.js](https://expressjs.com/)** — Fast, minimalist web framework

---

## 🏁 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or above) — [Download](https://nodejs.org/)
- **npm** or **yarn**

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Shaikh-abid/leetcode-frontend.git
cd leetcode-frontend
```

2. **Install frontend dependencies**

```bash
cd client
npm install
```

3. **Install backend dependencies**

```bash
cd ../server
npm install
```

4. **Set up environment variables**

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000
```

### Running the App

**Start the backend server:**

```bash
cd server
npm run dev
```

**Start the frontend (in a new terminal):**

```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the app.

---

## 📁 Project Structure

```
leetcode-frontend/
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # Global state (auth, theme)
│   │   ├── types/           # TypeScript interfaces & types
│   │   ├── utils/           # Helper functions
│   │   └── App.tsx
│   ├── tailwind.config.ts
│   └── package.json
│
├── server/                  # Node.js + Express backend
│   ├── controllers/         # Route handlers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middleware/          # Auth & error middleware
│   └── server.js
│
└── README.md
```

---

## 📸 Screenshots

> _Screenshots / GIFs of the app can be added here._

| Problem List | Code Editor | Dashboard |
|---|---|---|
| ![Problem List](https://via.placeholder.com/280x180?text=Problem+List) | ![Code Editor](https://via.placeholder.com/280x180?text=Code+Editor) | ![Dashboard](https://via.placeholder.com/280x180?text=Dashboard) |

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📬 Contact

**Shaikh Abid**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shaikh-abid)

Project Link: [https://github.com/Shaikh-abid/leetcode-frontend](https://github.com/Shaikh-abid/leetcode-frontend)

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/Shaikh-abid">Shaikh Abid</a>
</div>
