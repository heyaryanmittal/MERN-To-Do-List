# MERN To-Do List (Mobile Responsive)

A comprehensive full-stack MERN (MongoDB, Express, React, Node.js) To-Do List application. This project features a modern, mobile-responsive UI, user authentication, task prioritization, theme persistence, and PDF export capabilities.

## 📁 Project Structure

This project follows a standard monorepo architecture for easy management and deployment:

- **`/` (Root)**: Contains universal configurations (`vercel.json`, `.gitignore`) and orchestration scripts.
- **`backend/`**: Node.js + Express API server with MongoDB integration.
- **`frontend/`**: React + Vite application with Tailwind CSS for styling.
- **`dist/`**: Universal build output directory (at root) for production deployment.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Atlas or Local instance)

### 1. Installation

From the root directory, install all dependencies for both the root, frontend, and backend modules:
```bash
npm run install:all
```

### 2. Environment Configuration

Create the following files in their respective directories:

**`backend/.env`**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

**`frontend/.env`**
```env
VITE_API_URL=/api
```

### 3. Running Locally

You can run the entire stack or individual components from the root directory:

- **Full Stack (Concurrent)**: `npm run dev`
- **Backend Only**: `npm run backend`
- **Frontend Only**: `npm run frontend`

## 🛠️ Key Features

- **📱 Fully Mobile Responsive**: Re-engineered UI that scales perfectly from mobile screens to ultra-wide desktops.
- **🔐 Secure Authentication**: JWT-based user login and signup with protected task routes.
- **✨ Rich Task Formatting**: Support for Bold, Italic, Underline, and custom font colors.
- **🌓 Adaptive Theming**: Persistent Dark and Light modes tailored to user preferences.
- **📄 PDF Integration**: Cleanly formatted export of your entire to-do list.
- **📅 Smart Task Input**: Future-dated task entry to stay ahead of your schedule.

## 🌐 Deployment (Vercel)

This project is pre-configured for Vercel deployment. Both the frontend and backend are mapped through the root `vercel.json`:

1. Connect your repository to Vercel.
2. Ensure the root directory is selected as the project root.
3. Add your **Backend environment variables** in the Vercel dashboard.
4. Deploy! Vercel will handle the static build and API routes automatically.

---
*Created with focus on clean code and professional UI aesthetics.*
