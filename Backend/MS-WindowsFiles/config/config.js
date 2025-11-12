const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const SERVER_CONFIG = {
  PORT: process.env.SERVER_PORT || '3006',
  WINDOWS_SERVER_VERSION: process.env.WINDOWS_SERVER_VERSION || '1.0.0',
};

const FILES_CONFIG = {
  BASE_PATH: path.resolve(process.env.FILES_BASE_PATH || 'C:/Documents')
};

module.exports = {
  SERVER_CONFIG,
  FILES_CONFIG,
};
