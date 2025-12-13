const PublisherView = {
  formatPublisher: (publisher) => {
    return `ID: ${publisher.id}\nNombre: ${publisher.name}\nPaís: ${publisher.country}\nAño de fundación: ${publisher.foundationYear}`;
  },

  formatPublishers: (publishers) => {
    if (publishers.length === 0) return 'No hay editoriales disponibles';
    
    return publishers.map(publisher => 
      ` ${publisher.name} - ${publisher.country} (${publisher.foundationYear}) - ID: ${publisher.id}`
    ).join('\n');
  }
};

module.exports = PublisherView;