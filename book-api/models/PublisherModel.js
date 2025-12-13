const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const publishersPath = path.join(__dirname, '../data/publishers.json');

const getAllPublishers = () => {
  try {
    const data = fs.readFileSync(publishersPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo editoriales:', error);
    return [];
  }
};

const getPublisherById = (id) => {
  const publishers = getAllPublishers();
  return publishers.find(publisher => publisher.id === id);
};

const addPublisher = (publisherData) => {
  const publishers = getAllPublishers();
  const newPublisher = {
    id: uuidv4(),
    ...publisherData
  };
  
  publishers.push(newPublisher);
  
  try {
    fs.writeFileSync(publishersPath, JSON.stringify(publishers, null, 2));
    return newPublisher;
  } catch (error) {
    console.error('Error guardando editorial:', error);
    return null;
  }
};

module.exports = {
  getAllPublishers,
  getPublisherById,
  addPublisher
};
