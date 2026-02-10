const express = require('express');
const http = require('http');
const cors = require('cors');
const { SERVER_CONFIG } = require('./config/config');

const app = express();

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use('/files', require('./routes/files.routes'));

app.get('/', (req, res) => {
  res.json({ message: `Servidor en puerto ${SERVER_CONFIG.PORT}` });
});

app.get('/health', async (req, res) => {
  const health = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'OK',
    version: SERVER_CONFIG.WINDOWS_SERVER_VERSION,
    services: {}
  };

  const statusCode = health.status === 'OK' ? 200 : 503;
  res.status(statusCode).json(health);
});

const server = http.createServer(app);

server.listen(SERVER_CONFIG.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${SERVER_CONFIG.PORT}`);
});

module.exports = app;
