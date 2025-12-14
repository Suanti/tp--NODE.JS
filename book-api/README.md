cat > README.md << 'EOF'
 API de Gestión de Biblioteca - Servidor TCP

Trabajo Práctico Integrador - Node.js  
Implementación de una API de gestión de biblioteca usando servidor TCP.
## Estudiante: SUANTI KATALINA BERNAL ORTIZ

# Estructura del Proyecto
book-api/
├── controllers/ # Controladores (lógica de aplicación)
│ ├── BookController.js
│ ├── AuthorController.js
│ └── PublisherController.js
├── models/ # Modelos (gestión de datos)
│ ├── BookModel.js
│ ├── AuthorModel.js
│ └── PublisherModel.js
├── views/ # Vistas (formateo de respuestas)
│ ├── BookView.js
│ ├── AuthorView.js
│ └── PublisherView.js
├── data/ # Datos en formato JSON
│ ├── books.json
│ ├── authors.json
│ └── publishers.json
├── server.js # Servidor TCP principal
├── client.js # Cliente TCP interactivo
├── test-commands.js # Script de pruebas
├── package.json # Dependencias y scripts
└── README.md # Esta documentación


##  Instalación y Ejecución

### Requisitos previos
- Node.js (versión 14 o superior)
- npm (viene con Node.js)

### Pasos para instalar

1. Clonar o descargar el proyecto
git clone https://github.com/Suanti/tp--NODE.JS.git
cd book-api

2. Instalar dependencias:
   ```bash
   npm install #instala uuid para id unicas
   npm start

#  Comandos soportados:
 GET BOOKS, ADD_BOOK, GET BOOK_BY_ID, GET BOOKS_BY_TITLE
 GET AUTHORS, ADD_AUTHOR
  GET PUBLISHERS, ADD_PUBLISHER
 
 @author [KATALINA BERNAL]
 @version 1.0.0
 

## COMANDOS EJEMPLOS

# Comando: GET BOOKS
Respuesta: 
 Cien años de soledad (1967) - ID: 1
 1984 (1949) - ID: 2

# Comando: ADD_BOOK|El Principito|3|3|1943|Fábula|978-0156012195
Respuesta:
Libro agregado exitosamente:
ID: a1b2c3d4...
Título: El Principito
Autor ID: 3
Editorial ID: 3
Año: 1943
Género: Fábula
ISBN: 978-0156012195

# Comando: GET BOOK_BY_ID|999
Respuesta: Libro con ID "999" no encontrado

