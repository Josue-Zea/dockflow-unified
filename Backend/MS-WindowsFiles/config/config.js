const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const SERVER_CONFIG = {
  PORT: process.env.SERVER_PORT || '3006',
  WINDOWS_SERVER_VERSION: process.env.WINDOWS_SERVER_VERSION || '1.0.0',
  JWT_KEY: process.env.JWT_KEY || "f723861266e7446006497747e9262f2f77e8a93e3d2c882103f566412e690f0a",
};

const FILES_CONFIG = {
  BASE_PATH: path.resolve(process.env.FILES_BASE_PATH || 'C:/Documents')
};

module.exports = {
  SERVER_CONFIG,
  FILES_CONFIG,
};
