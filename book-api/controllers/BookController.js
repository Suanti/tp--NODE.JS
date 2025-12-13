const BookModel = require('../models/BookModel');
const BookView = require('../views/BookView');

const BookController = {
  getAllBooks: () => {
    try {
      const books = BookModel.getAllBooks();
      return BookView.formatBooks(books);
    } catch (error) {
      return `ERROR: ${error.message}`;
    }
  },

  getBookById: (id) => {
    try {
      const book = BookModel.getBookById(id);
      if (!book) return `Libro con ID "${id}" no encontrado`;
      return BookView.formatBook(book);
    } catch (error) {
      return `ERROR: ${error.message}`;
    }
  },

  getBooksByTitle: (title) => {
    try {
      const books = BookModel.getBooksByTitle(title);
      if (books.length === 0) return `No se encontraron libros con título "${title}"`;
      return BookView.formatBooks(books);
    } catch (error) {
      return `ERROR: ${error.message}`;
    }
  },

  addBook: (bookData) => {
    try {
      // Validar datos básicos
      if (!bookData.title || !bookData.authorId || !bookData.publisherId) {
        return 'ERROR: Faltan datos obligatorios (título, autorId, editorialId)';
      }
      
      const newBook = BookModel.addBook(bookData);
      if (!newBook) return 'ERROR: No se pudo agregar el libro';
      
      return ` Libro agregado exitosamente:\n${BookView.formatBook(newBook)}`;
    } catch (error) {
      return `ERROR: ${error.message}`;
    }
  }
};

module.exports = BookController;