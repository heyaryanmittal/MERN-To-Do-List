// Environment
import dotenv from "dotenv";
dotenv.config();

// Core imports
import express from "express";
import cors from "cors";
import colors from "colors";
import dns from "dns";
import path from "path";
import { fileURLToPath } from "url";

// Local imports
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";

// DNS Fix for MongoDB
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Init app
const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect Database
await connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Serve Frontend (React/Vite build)
app.use(express.static(path.join(__dirname, "../dist")));

// Catch-all for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// Server Port
const DEFAULT_PORT = 5000;
const START_PORT = Number(process.env.PORT) || DEFAULT_PORT;

// Start server with port fallback
const startServer = (port, attemptsLeft = 10) => {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`.yellow.bold);
  });

  server.on("error", (err) => {
    if (err?.code === "EADDRINUSE" && attemptsLeft > 0) {
      server.close(() => startServer(port + 1, attemptsLeft - 1));
      return;
    }
    throw err;
  });
};

startServer(START_PORT);