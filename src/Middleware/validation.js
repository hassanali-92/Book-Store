import { body } from 'express-validator';

export const validateBook = [
    // Title check karna
    body('title')
        .trim()
        .notEmpty().withMessage('Book title is required')
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),

    // Author check karna
    body('author')
        .trim()
        .notEmpty().withMessage('Author name is required'),

    // Price check karna (sirf numbers aur positive hona chahiye)
    body('price')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

    // ISBN check karna (unique identifier zaroori hai)
    body('isbn')
        .trim()
        .notEmpty().withMessage('ISBN is required')
        .isLength({ min: 10, max: 13 }).withMessage('ISBN must be between 10 and 13 characters'),

    // Published Date check karna (valid date format)
    body('publishedDate')
        .optional() // Yeh field optional rakh sakte hain
        .isISO8601().withMessage('Published date must be in valid ISO format (YYYY-MM-DD)')
];