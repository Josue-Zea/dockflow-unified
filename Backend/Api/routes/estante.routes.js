const express = require('express')

const api = express.Router();

const estantesController = require('../controllers/estantes.controller');
const { checkAuth } = require('../middleware/auth');

api.get('/getEstantes', checkAuth, estantesController.getEstantes);
api.get('/getEstantesNivel', checkAuth, estantesController.getEstantesNivel);
api.post('/estante', checkAuth, estantesController.createEstante);
api.put('/estante', checkAuth, estantesController.updateEstante);
// api.put('/estante/caja/:idEstante/:idCaja', estantesController.addCajaEstante);
api.delete('/estante', checkAuth, estantesController.deleteEstante);
// api.delete('/estante/caja/:idEstante/:idCaja', estantesController.removeCajaEstante);

module.exports = api;