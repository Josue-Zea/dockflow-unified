const express = require('express')

const api = express.Router();

const cajasController = require('../controllers/cajas.controller');
const { checkAuth } = require('../middleware/auth');

api.get('/getCajas', checkAuth, cajasController.getCajas);
api.get('/getExpedientesFromBox', checkAuth, cajasController.getExpedientesFromCaja);
api.get('/getCajasSinEstante', checkAuth, cajasController.getCajasSinEstante);
api.post('/caja', checkAuth, cajasController.createCaja);
api.put('/cambiarEstadoCaja', checkAuth, cajasController.changeFullBoxStatus);
api.put('/caja', checkAuth, cajasController.updateCaja);
api.delete('/caja', checkAuth, cajasController.deleteCaja);
api.post('/agregarExpedienteCaja', checkAuth, cajasController.addExpedienteCaja);
api.delete('/removerExpedienteCaja', checkAuth, cajasController.removeExpedienteCaja);
api.get('/getExpedientes', checkAuth, cajasController.getExpedientes);
api.get('/getExpediente', checkAuth, cajasController.getExpediente);
api.get('/getDocumento', checkAuth, cajasController.getDocumento);
api.get('/getAllExpedientes', checkAuth, cajasController.getAllExpedientes);

module.exports = api;