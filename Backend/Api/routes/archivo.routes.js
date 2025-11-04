const express = require('express')

const api = express.Router();

const archivosController = require('../controllers/archivos.controller');
const { checkAuth } = require('../middleware/auth');

api.post('/cargarArchivo', checkAuth, archivosController.cargarArchivo);
api.get('/getDocumentoCargado', checkAuth, archivosController.getDocumentoCargado);

module.exports = api;