const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const booksPath = path.join(__dirname, '../data/books.json');

// Leer todos los libros
const getAllBooks = () => {
  try {
    const data = fs.readFileSync(booksPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo libros:', error);
    return [];
  }
};

// Buscar libro por ID
const getBookById = (id) => {
  const books = getAllBooks();
  return books.find(book => book.id === id);
};

// Buscar libros por título
const getBooksByTitle = (title) => {
  const books = getAllBooks();
  const searchTerm = title.toLowerCase();
  return books.filter(book => 
    book.title.toLowerCase().includes(searchTerm)
  );
};

// Añadir nuevo libro
const addBook = (bookData) => {
  const books = getAllBooks();
  const newBook = {
    id: uuidv4(), // Genera ID único automático
    ...bookData
  };
  books.push(newBook);
  
  try {
    fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
    return newBook;
  } catch (error) {
    console.error('Error guardando libro:', error);
    return null;
  }
};

// Actualizar libro
const updateBook = (id, updatedData) => {
  const books = getAllBooks();
  const index = books.findIndex(book => book.id === id);
  
  if (index === -1) return null;
  
  books[index] = { ...books[index], ...updatedData };
  
  try {
    fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
    return books[index];
  } catch (error) {
    console.error('Error actualizando libro:', error);
    return null;
  }
};

// Eliminar libro
const deleteBook = (id) => {
  const books = getAllBooks();
  const filteredBooks = books.filter(book => book.id !== id);
  
  if (books.length === filteredBooks.length) return false;
  
  try {
    fs.writeFileSync(booksPath, JSON.stringify(filteredBooks, null, 2));
    return true;
  } catch (error) {
    console.error('Error eliminando libro:', error);
    return false;
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  getBooksByTitle,
  addBook,
  updateBook,
  deleteBook
};
