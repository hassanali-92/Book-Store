import Book from '../Model/Book.js';

// @desc    Get all books
// @route   GET /api/books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new book
// @route   POST /api/books
export const createBook = async (req, res) => {
    const { title, author, price, isbn, publishedDate } = req.body;

    try {
        const newBook = new Book({
            title,
            author,
            price,
            isbn,
            publishedDate
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a book
// @route   PUT /api/books/:id
export const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Updated document wapas bhejne ke liye
        );
        
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};