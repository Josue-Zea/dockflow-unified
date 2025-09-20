const express = require('express')

const api = express.Router();
const estantesController = require('../controllers/estantes.controller');
const cajasController = require('../controllers/cajas.controller');
const tramitesController = require('../controllers/tramites.controller');
const expedientesController = require('../controllers/expedientes.controller');

// ESTANTES
api.get('/getEstantes', estantesController.getEstantes);
api.get('/getEstantesNivel/:idNivel', estantesController.getEstantesNivel);
api.post('/estante', estantesController.createEstante);
api.put('/estante/:idEstante', estantesController.updateEstante);
api.delete('/estante/:idEstante', estantesController.deleteEstante);
api.put('/estante/caja/:idEstante/:idCaja', estantesController.addCajaEstante);
api.delete('/estante/caja/:idEstante/:idCaja', estantesController.removeCajaEstante);

// CAJAS
api.get('/getCajas', cajasController.getCajas);
api.get('/getCajas/:idEstante', cajasController.getCajas);
api.get('/getCajasSinEstante', cajasController.getCajasSinEstante);
api.post('/caja', cajasController.createCaja);
api.put('/caja/:idCaja', cajasController.updateCaja);
api.put('/caja/:idCaja/:status', cajasController.changeFullBoxStatus);
api.delete('/caja/:idCaja', cajasController.deleteCaja);

// EXPEDIENTES
api.get('/getExpedientes/:idEstante/:idCaja', cajasController.getExpedientes);
api.get('/getExpediente/:numero/:anio', cajasController.getExpediente);
api.get('/getDocumento/:idDocumento', cajasController.getDocumento);
api.get('/getExpedientesFromBox/:idCaja', cajasController.getExpedientesFromCaja);
api.get('/getExpedientes', cajasController.getAllExpedientes);
api.put('/caja_expediente/:idCaja/:idExpediente', cajasController.addExpedienteCaja);
api.delete('/caja/removeExpediente/:idExpediente', cajasController.removeExpedienteCaja);
api.get('/getExpedienteType/:numero/:anio', expedientesController.getInfoExpediente);
api.get('/getTramitesExpediente/:idDocumento', expedientesController.getTramitesExpediente);
api.get('/getTramitesDocumentosExpediente/:idDocumento', expedientesController.getTramitesDocumentosExpediente);

// TRAMITES
api.post('/createTramite', tramitesController.createTramite);
api.get('/getTramitesType', tramitesController.getTramitesType);

module.exports = api;