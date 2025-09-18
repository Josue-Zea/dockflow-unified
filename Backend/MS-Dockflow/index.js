const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const { SERVER_CONFIG } = require("./config/config");

// Middlewares
app.use(cors());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));
app.use('/dockflow', require('./routes/dockflow.routes'));
global.token = '';

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

module.exports = app