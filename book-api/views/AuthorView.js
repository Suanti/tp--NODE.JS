const AuthorView = {
  formatAuthor: (author) => {
    return `ID: ${author.id}\nNombre: ${author.name}\nNacionalidad: ${author.nationality}\nAño de nacimiento: ${author.birthYear}`;
  },

  formatAuthors: (authors) => {
    if (authors.length === 0) return 'No hay autores disponibles';
    
    return authors.map(author => 
      ` ${author.name} - ${author.nationality} (${author.birthYear}) - ID: ${author.id}`
    ).join('\n');
  }
};

module.exports = AuthorView;