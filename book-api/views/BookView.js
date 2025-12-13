const BookView = {
  formatBook: (book) => {
    return `ID: ${book.id}\nTítulo: ${book.title}\nAutor ID: ${book.authorId}\nEditorial ID: ${book.publisherId}\nAño: ${book.year}\nGénero: ${book.genre}\nISBN: ${book.isbn}`;
  },

  formatBooks: (books) => {
    if (books.length === 0) return 'No hay libros disponibles';
    
    return books.map(book => 
      ` ${book.title} (${book.year}) - ID: ${book.id}`
    ).join('\n');
  }
};

module.exports = BookView;