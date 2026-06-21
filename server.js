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
const allowedOrigins = [
  'https://book-store-frontend-phi-ten.vercel.app',
  'http://localhost:5173' // Development ke liye
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin matches any in our list (with or without trailing slash)
    const cleanOrigin = origin.replace(/\/$/, ''); 
    const isAllowed = allowedOrigins.some(allowed => allowed.replace(/\/$/, '') === cleanOrigin);
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
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
