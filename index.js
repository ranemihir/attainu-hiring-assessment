import dotenv from 'dotenv';
dotenv.config();

import './db';
import express from 'express';
import cors from 'cors';
import auth from './routes/auth';
import posts from './routes/posts';
import middleware from './middleware';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(middleware);

app.use('/login', auth);
app.use('/posts', posts);

app.listen(PORT, () => `Server running at http://localhost:${PORT}`);

