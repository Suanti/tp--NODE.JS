const net = require('net');
const BookController = require('./controllers/BookController');
const AuthorController = require('./controllers/AuthorController');
const PublisherController = require('./controllers/PublisherController');

// Crear servidor TCP
const server = net.createServer((socket) => {
  console.log(' Cliente conectado desde:', socket.remoteAddress, socket.remotePort);

  // Mensaje de bienvenida
  socket.write('Bienvenido a la API de Biblioteca\nComandos disponibles:\n- GET BOOKS\n- GET BOOK_BY_ID|id\n- GET BOOKS_BY_TITLE|título\n- ADD_BOOK|título|autorId|editorialId|año|género|ISBN\n- GET AUTHORS\n- ADD_AUTHOR|nombre|nacionalidad|añoNacimiento\n- GET PUBLISHERS\n- ADD_PUBLISHER|nombre|país|añoFundación\n\n');

  // Manejar datos recibidos del cliente
  socket.on('data', (data) => {
    try {
      const command = data.toString().trim();
      console.log(` Comando recibido: "${command}"`);

      // Procesar comando
      const response = processCommand(command);
      socket.write(response + '\n');
      
    } catch (error) {
      console.error(' Error procesando comando:', error);
      socket.write(`ERROR: ${error.message}\n`);
    }
  });

  // Manejar desconexión
  socket.on('end', () => {
    console.log('🔌 Cliente desconectado');
  });

  // Manejar errores
  socket.on('error', (err) => {
    console.error(' Error en conexión:', err.message);
  });
});

// Función para procesar comandos
function processCommand(command) {
  const parts = command.split('|');
  const action = parts[0].toUpperCase();

  switch (action) {
    // === COMANDOS DE LIBROS ===
    case 'GET BOOKS':
      return BookController.getAllBooks();
    
    case 'GET BOOK_BY_ID':
      if (parts.length < 2) return 'ERROR: Faltó el ID del libro';
      return BookController.getBookById(parts[1]);
    
    case 'GET BOOKS_BY_TITLE':
      if (parts.length < 2) return 'ERROR: Faltó el título';
      return BookController.getBooksByTitle(parts[1]);
    
    case 'ADD_BOOK':
      if (parts.length < 7) return 'ERROR: Formato: ADD_BOOK|título|autorId|editorialId|año|género|ISBN';
      const bookData = {
        title: parts[1],
        authorId: parts[2],
        publisherId: parts[3],
        year: parseInt(parts[4]),
        genre: parts[5],
        isbn: parts[6]
      };
      return BookController.addBook(bookData);

    // === COMANDOS DE AUTORES ===
    case 'GET AUTHORS':
      return AuthorController.getAllAuthors();
    
    case 'ADD_AUTHOR':
      if (parts.length < 4) return 'ERROR: Formato: ADD_AUTHOR|nombre|nacionalidad|añoNacimiento';
      const authorData = {
        name: parts[1],
        nationality: parts[2],
        birthYear: parseInt(parts[3])
      };
      return AuthorController.addAuthor(authorData);

    // === COMANDOS DE EDITORIALES ===
    case 'GET PUBLISHERS':
      return PublisherController.getAllPublishers();
    
    case 'ADD_PUBLISHER':
      if (parts.length < 4) return 'ERROR: Formato: ADD_PUBLISHER|nombre|país|añoFundación';
      const publisherData = {
        name: parts[1],
        country: parts[2],
        foundationYear: parseInt(parts[3])
      };
      return PublisherController.addPublisher(publisherData);

    default:
      return 'ERROR: Comando no reconocido. Use GET BOOKS, ADD_BOOK, etc.';
  }
}

// Iniciar servidor en puerto 8080
const PORT = 8080;
server.listen(PORT, () => {
  console.log(` Servidor TCP escuchando en puerto ${PORT}`);
  console.log(` API de Biblioteca lista para recibir conexiones`);
});

// Manejo de errores del servidor
server.on('error', (err) => {
  console.error(' Error del servidor:', err.message);
  if (err.code === 'EADDRINUSE') {
    console.log(`El puerto ${PORT} ya está en uso. Intenta con otro puerto.`);
  }
});