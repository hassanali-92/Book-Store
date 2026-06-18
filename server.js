import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/Config/db.js';
import bookRoutes from './src/Routes/bookRoutes.js'; // Import routes
import authRoutes from './src/Routes/authRoutes.js';
// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
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