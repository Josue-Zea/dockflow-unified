const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const { SERVER_CONFIG, SWAGGER_CONFIG } = require("./config/config");
const logger = require('./helpers/logger');

const swaggerSpec = SWAGGER_CONFIG;

//Swagger configurations
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { client } = require("./database/conection");
const { healthCheckWindowsServer } = require("./utils/healthCheckWindowsServer");
const { apiLimiter } = require("./middleware/rateLimiter");

// Middlewares
app.use(helmet());
app.use(cors());
app.use(apiLimiter);
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: true }));
app.use('/auth', require('./routes/auth.routes'));
app.use('/permisos', require('./routes/permissions.routes'));
app.use('/expedientes', require('./routes/expediente.routes'));
app.use('/filter', require('./routes/filter.routes'));
app.use('/cajas', require('./routes/caja.routes'));
app.use('/estantes', require('./routes/estante.routes'));
app.use('/tramites', require('./routes/tramite.routes'));
app.use('/subdocumentos', require('./routes/sub-documento.routes'));
app.use('/archivos', require('./routes/archivo.routes'));

app.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

app.get("/", (req, res) => {
  res.send({
    "mensaje": `Servidor en puerto ${port}`
  });
});

app.get('/health', async (req, res) => {
  const health = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'UNKNOWN',
    version: SERVER_CONFIG.API_VERSION,
    services: {},
  };

  const withTimeout = (promise, ms) => {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), ms)),
    ]);
  };

  try {
    await withTimeout(client.execute('SELECT now() FROM system.local'), 3000);
    health.services.cassandra = { status: 'UP' };
  } catch (err) {
    logger.logError(err, { context: 'healthCheck', service: 'cassandra' });
    health.services.cassandra = { status: 'DOWN', error: err && err.message };
  }

  try {
    const windowsHealth = await withTimeout(healthCheckWindowsServer(), 3000);
    health.services.windowsServer = {
      status: windowsHealth && windowsHealth.status ? windowsHealth.status : 'UNKNOWN',
      version: windowsHealth && windowsHealth.version ? windowsHealth.version : null,
    };
  } catch (err) {
    logger.logError(err, { context: 'healthCheck', service: 'windowsServer' });
    health.services.windowsServer = { status: 'DOWN', error: err && err.message };
  }

  const anyDown = Object.values(health.services).some(s => s && s.status === 'DOWN');
  health.status = anyDown ? 'DEGRADED' : 'OK';

  const statusCode = health.status === 'OK' ? 200 : 503;
  res.status(statusCode).json(health);
});

const port = SERVER_CONFIG.SERVER_PORT;
const server = http.createServer(app);

server.listen(port, async () => {
  logger.logInfo(`Servidor corriendo en el puerto ${port}`);
});

module.exports = server