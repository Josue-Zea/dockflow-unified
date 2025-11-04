const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const { SERVER_CONFIG, SWAGGER_CONFIG } = require("./config/config");

const swaggerSpec = SWAGGER_CONFIG;

//Swagger configurations
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { client } = require("./database/conection");

// Middlewares
app.use(cors());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: true }));
app.use('/auth', require('./routes/auth.routes'));
app.use('/permisos', require('./routes/permissions.routes'));
app.use('/expedientes', require('./routes/expediente.routes'));
app.use('/filter', require('./routes/filter.routes'));
app.use('/dockflow', require('./routes/dockflow.routes'));
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
    status: 'OK',
    services: {}
  };

  try {
    await client.execute('SELECT now() FROM system.local');
    health.services.cassandra = 'UP';
  } catch (error) {
    health.services.cassandra = 'DOWN';
    health.status = 'DEGRADED';
  }

  const statusCode = health.status === 'OK' ? 200 : 503;
  res.status(statusCode).json(health);
});

const port = SERVER_CONFIG.SERVER_PORT;
const server = http.createServer(app);

server.listen(port, async () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

module.exports = server