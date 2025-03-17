// src/config/config.js
require('dotenv').config();

module.exports = {
  mongodbUri: process.env.MONGO_URI || 'mongodb://localhost:27017/pedidos', 
};
