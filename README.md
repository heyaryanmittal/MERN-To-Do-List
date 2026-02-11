# MERN To-Do List

A full-stack MERN (MongoDB, Express, React, Node.js) To-Do List application with features like authentication, task prioritization, dark/light mode, and PDF export.

## Project Structure

This project is organized as a monorepo with separate directories for frontend and backend:

- **frontend/**: React + Vite application
- **backend/**: Node.js + Express API server

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB Database (Cloud Atlas or local)

## Setup & Installation

1.  **Clone the repository**
2.  **Install dependencies** for both frontend and backend specific folders:
    ```bash
    # From the root directory
    npm run install-all
    ```
    Or manually:
    ```bash
    cd frontend && npm install
    cd ../backend && npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the **root** directory with the following variables:

    ```env
    # Backend Configuration
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    JWT_EXPIRE=7d

    # Frontend Configuration
    VITE_API_URL=http://localhost:5000/api
    ```

## Running Locally

1.  **Start the Full Project (Frontend + Backend)**
    ```bash
    # From the root directory
    npm run dev
    ```
    The frontend will start on `http://localhost:5173` (or the next available port), and the backend will start on `http://localhost:5000`.

2.  **(Optional) Run Frontend/Backend Separately**
    If you prefer running them in separate terminals, you can start them individually.

## Deployment

### Backend (e.g., Render, Railway, Heroku)
1.  Deploy the contents of the `backend/` folder.
2.  Set the environment variables (`MONGODB_URI`, `JWT_SECRET`, etc.) in the dashboard.

### Frontend (e.g., Vercel, Netlify)
1.  Deploy the contents of the `frontend/` folder.
2.  Set the build command to `npm run build` and output directory to `dist`.
3.  Set the `VITE_API_URL` environment variable to your deployed backend URL.

## Features

- **User Authentication**: Secure signup and login functionality.
- **Task Management**: Create, read, update, delete (CRUD) tasks.
- **Prioritization**: Mark tasks as high priority.
- **Theming**: Toggle between Light and Dark modes (persisted per user).
- **Rich Text**: Basic formatting options (Bold, Italic, Underline, Color).
- **PDF Export**: Download your to-do list as a PDF file.
