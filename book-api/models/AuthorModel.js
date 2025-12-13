const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const authorsPath = path.join(__dirname, '../data/authors.json');

const getAllAuthors = () => {
  try {
    const data = fs.readFileSync(authorsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo autores:', error);
    return [];
  }
};

const getAuthorById = (id) => {
  const authors = getAllAuthors();
  return authors.find(author => author.id === id);
};

// Buscar autores por nombre o nacionalidad
const searchAuthors = (query) => {
  const authors = getAllAuthors();
  const searchTerm = query.toLowerCase();
  
  return authors.filter(author => 
    author.name.toLowerCase().includes(searchTerm) ||
    author.nationality.toLowerCase().includes(searchTerm)
  );
};

const addAuthor = (authorData) => {
  const authors = getAllAuthors();
  const newAuthor = {
    id: uuidv4(),
    ...authorData
  };
  
  authors.push(newAuthor);
  
  try {
    fs.writeFileSync(authorsPath, JSON.stringify(authors, null, 2));
    return newAuthor;
  } catch (error) {
    console.error('Error guardando autor:', error);
    return null;
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  searchAuthors,
  addAuthor
};