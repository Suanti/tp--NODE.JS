const AuthorModel = require('../models/AuthorModel');
const AuthorView = require('../views/AuthorView');

const AuthorController = {
  getAllAuthors: () => {
    try {
      const authors = AuthorModel.getAllAuthors();
      return AuthorView.formatAuthors(authors);
    } catch (error) {
      return `ERROR: ${error.message}`;
    }
  },

  addAuthor: (authorData) => {
    try {
      if (!authorData.name || !authorData.nationality) {
        return 'ERROR: Faltan datos obligatorios (nombre, nacionalidad)';
      }
      
      const newAuthor = AuthorModel.addAuthor(authorData);
      if (!newAuthor) return 'ERROR: No se pudo agregar el autor';
      
      return ` Autor agregado exitosamente:\n${AuthorView.formatAuthor(newAuthor)}`;
    } catch (error) {
      return `ERROR: ${error.message}`;
    }
  }
};

module.exports = AuthorController;