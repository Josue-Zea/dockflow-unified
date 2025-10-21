const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const SERVER_CONFIG = {
  PORT: process.env.SERVER_PORT || '3006',
};

const FILES_CONFIG = {
  BASE_PATH: path.resolve(process.env.FILES_BASE_PATH || 'C:/Documents')
};

module.exports = {
  SERVER_CONFIG,
  FILES_CONFIG,
};
