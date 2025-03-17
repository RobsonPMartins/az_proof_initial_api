// src/config/database.js
const mongoose = require('mongoose');
const { mongodbUri } = require('./config');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Conectado ao MongoDB com sucesso!🔥');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
