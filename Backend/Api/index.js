const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const { SERVER_CONFIG, SWAGGER_CONFIG } = require("./config/config");

const swaggerSpec = SWAGGER_CONFIG;

//Swagger configurations
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// Middlewares
app.use(cors());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));
app.use('/auth', require('./routes/auth.routes'));
app.use('/permisos', require('./routes/permissions.routes'));
app.use('/expedientes', require('./routes/expediente.routes'));
app.use('/filter', require('./routes/filter.routes'));
app.use('/dockflow', require('./routes/dockflow.routes'));

app.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

app.get("/", (req, res) => {
  res.send({
    "mensaje": `Servidor en puerto ${port}`
  });
});

const port = SERVER_CONFIG.SERVER_PORT;
const server = http.createServer(app);

server.listen(port, async () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

module.exports = server