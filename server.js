import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/Config/db.js';
import bookRoutes from './src/Routes/bookRoutes.js';
import authRoutes from './src/Routes/authRoutes.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Production-Ready CORS Configuration
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Frontend URL
    credentials: true,           // Cookies/Auth headers allow karo
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Sirf zaroori methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Sirf zaroori headers
}));

app.use(express.json());

// Use Routes
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Bookstore API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
