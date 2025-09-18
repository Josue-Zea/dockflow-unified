const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const { SERVER_CONFIG } = require("./config/config");

// const swaggerSpec = variables.SWAGGER_CONFIG;

//Swagger configurations
// const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");

// Middlewares
app.use(cors());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));
app.use('/expedientes', require('./routes/expediente.routes'));
global.token = '';

// app.use("/admin-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

app.get("/", (req, res) => {
  res.send({
    "mensaje": `Servidor en puerto ${port} as`
  });
});

const port = SERVER_CONFIG.SERVER_PORT;
const server = http.createServer(app);

server.listen(port, '0.0.0.0', async () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

module.exports = app