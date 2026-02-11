import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());


import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const DEFAULT_PORT = 5000;
const START_PORT = Number(process.env.PORT) || DEFAULT_PORT;

const startServer = (port, attemptsLeft = 10) => {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  server.on('error', (err) => {
    if (err?.code === 'EADDRINUSE' && attemptsLeft > 0) {
      server.close(() => startServer(port + 1, attemptsLeft - 1));
      return;
    }
    throw err;
  });
};

startServer(START_PORT);
