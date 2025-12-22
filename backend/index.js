import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js'
import taskRoute from './routes/task.route.js'
import connectDB from './config/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'https://serviot-task.vercel.app' || process.env.CLIENT_URL,
  credentials: true
}));
connectDB();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/auth', authRoute);
app.use('/api/task', taskRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});