const net = require('net');
const readline = require('readline');

// Configuración de conexión
const HOST = 'localhost';
const PORT = 8080;

// Crear interfaz para leer entrada del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ' Biblioteca > '
});

console.log('=== Cliente TCP - API de Biblioteca ===');
console.log('Conectando al servidor...');

// Crear cliente TCP
const client = net.createConnection({ host: HOST, port: PORT }, () => {
  console.log(' Conectado al servidor en', HOST + ':' + PORT);
  console.log('\nComandos disponibles:');
  console.log('  GET BOOKS');
  console.log('  GET BOOK_BY_ID|id');
  console.log('  GET BOOKS_BY_TITLE|título');
  console.log('  ADD_BOOK|título|autorId|editorialId|año|género|ISBN');
  console.log('  GET AUTHORS');
  console.log('  ADD_AUTHOR|nombre|nacionalidad|añoNacimiento');
  console.log('  GET PUBLISHERS');
  console.log('  ADD_PUBLISHER|nombre|país|añoFundación');
  console.log('  EXIT - Para salir');
  console.log('\nEjemplo: GET BOOKS\n');
  
  rl.prompt();
});

// Manejar datos recibidos del servidor
client.on('data', (data) => {
  console.log('\n Respuesta del servidor:');
  console.log('=' .repeat(50));
  console.log(data.toString());
  console.log('=' .repeat(50) + '\n');
  rl.prompt();
});

// Manejar desconexión
client.on('end', () => {
  console.log('\n🔌 Desconectado del servidor');
  rl.close();
});

// Manejar errores
client.on('error', (err) => {
  console.error(' Error de conexión:', err.message);
  rl.close();
});

// Leer comandos del usuario
rl.on('line', (line) => {
  const command = line.trim();
  
  if (command.toLowerCase() === 'exit') {
    console.log(' Saliendo...');
    client.end();
    rl.close();
    return;
  }
  
  if (command) {
    client.write(command);
  } else {
    rl.prompt();
  }
}).on('close', () => {
  console.log(' Cliente terminado');
  process.exit(0);
});