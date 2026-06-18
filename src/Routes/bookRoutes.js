import { protect } from '../Middleware/authMiddleware.js';
import { validateBook } from '../Middleware/validation.js';
import { admin } from '../Middleware/adminMiddleware.js';
import express from 'express';
import { createBook,getBookById,getBooks,updateBook,deleteBook } from "../Controller/BookController.js";
const router = express.Router();
// Sirf Admin books add kar sakta hai
router.post('/', protect, admin, validateBook, createBook); 

// Sab books dekh sakte hain (No auth needed)
router.get('/', getBooks); 
router.get('/:id', getBookById); 

// Sirf Admin update/delete kar sakta hai
router.put('/:id', protect, admin, updateBook); 
router.delete('/:id', protect, admin, deleteBook);
export default router;