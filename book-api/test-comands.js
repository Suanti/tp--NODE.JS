cat > test-commands.js << 'EOF'
const net = require('net');

const testCommands = [
  'GET BOOKS',
  'GET BOOK_BY_ID|1',
  'GET BOOK_BY_ID|999',  // ID que no existe
  'GET BOOKS_BY_TITLE|soledad',
  'GET BOOKS_BY_TITLE|xyz123',  // Título que no existe
  'ADD_BOOK|El Hobbit|3|3|1937|Fantasía|978-0547928227',
  'ADD_BOOK|Título|',  // Comando incompleto - debería fallar
  'GET AUTHORS',
  'ADD_AUTHOR|Isabel Allende|Chilena|1942',
  'GET PUBLISHERS',
  'ADD_PUBLISHER|Alfaguara|España|1964',
  'COMANDO_INVALIDO',  // Comando desconocido
];

let currentTest = 0;

const runTest = () => {
  if (currentTest >= testCommands.length) {
    console.log('\n Todas las pruebas completadas');
    process.exit(0);
  }

  const command = testCommands[currentTest];
  console.log(`\n🧪 Prueba ${currentTest + 1}/${testCommands.length}: "${command}"`);
  
  const client = net.createConnection({ port: 8080 }, () => {
    client.write(command);
  });

  client.on('data', (data) => {
    const response = data.toString().trim();
    
    // Verificar si es un error esperado
    if (response.startsWith('ERROR') || response.includes('no encontrado') || response.includes('No se encontraron')) {
      console.log('   Resultado:  Error esperado/manejado');
      console.log('   Respuesta:', response.substring(0, 100));
    } else if (response.startsWith('') || response.includes('agregado') || response.length > 0) {
      console.log('   Resultado:  Éxito');
      console.log('   Respuesta:', response.substring(0, 100));
    } else {
      console.log('   Resultado:  Respuesta inesperada');
      console.log('   Respuesta:', response);
    }
    
    client.end();
  });

  client.on('end', () => {
    currentTest++;
    setTimeout(runTest, 500); // Esperar medio segundo entre pruebas
  });

  client.on('error', (err) => {
    console.log('   Resultado:  Error de conexión:', err.message);
    currentTest++;
    setTimeout(runTest, 500);
  });
};

console.log('=== Iniciando pruebas de la API de Biblioteca ===');
console.log('Asegúrate de que el servidor esté corriendo (npm start)\n');
setTimeout(runTest, 1000);
EOF