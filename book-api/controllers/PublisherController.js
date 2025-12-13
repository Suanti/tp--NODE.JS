const PublisherModel = require('../models/PublisherModel');
const PublisherView = require('../views/PublisherView');

const PublisherController = {
  getAllPublishers: () => {
    try {
      const publishers = PublisherModel.getAllPublishers();
      return PublisherView.formatPublishers(publishers);
    } catch (error) {
      return `ERROR: ${error.message}`;
    }
  },

  addPublisher: (publisherData) => {
    try {
      if (!publisherData.name || !publisherData.country) {
        return 'ERROR: Faltan datos obligatorios (nombre, país)';
      }
      
      const newPublisher = PublisherModel.addPublisher(publisherData);
      if (!newPublisher) return 'ERROR: No se pudo agregar la editorial';
      
      return `Editorial agregada exitosamente:\n${PublisherView.formatPublisher(newPublisher)}`;
    } catch (error) {
      return `ERROR: ${error.message}`;
    }
  }
};

module.exports = PublisherController;