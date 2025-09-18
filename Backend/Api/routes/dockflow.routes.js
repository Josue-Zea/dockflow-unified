const express = require('express')
const api = express.Router();
const { checkAuth } = require('../middleware/auth.js');
const controller = require('../controllers/dockflow.controller.js');

// ESTANTES
api.get('/getEstantes', checkAuth, controller.getEstantes);
api.get('/getEstantesNivel/:idNivel', checkAuth, controller.getEstantesNivel);
api.post('/estante', checkAuth, controller.createEstante);
api.put('/estante/:idEstante', checkAuth, controller.updateEstante);
api.delete('/estante/:idEstante', checkAuth, controller.deleteEstante);
api.put('/estante/caja/:idEstante/:idCaja', checkAuth, controller.addCajaEstante);
api.delete('/estante/caja/:idEstante/:idCaja', checkAuth, controller.removeCajaEstante);

// CAJAS
api.get('/getCajas', checkAuth, controller.getCajas);
api.get('/getCajas/:idEstante', checkAuth, controller.getCajas);
api.post('/caja', checkAuth, controller.createCaja);
api.put('/caja/:idCaja', checkAuth, controller.updateCaja);
api.put('/caja/:idCaja/:status', checkAuth, controller.updateFullStatusBox);
api.delete('/caja/:idCaja', checkAuth, controller.deleteCaja);

// EXPEDIENTES
api.get('/getExpedientes/:idEstante/:idCaja', checkAuth, controller.getExpedientes);
api.get('/getExpediente/:numero/:anio', checkAuth, controller.getExpediente);
api.get('/getDocumento/:idDocumento', checkAuth, controller.getDocumento);
api.get('/getExpedientesFromBox/:idCaja', checkAuth, controller.getExpedientesFromCaja);
api.get('/getAllExpedientes', checkAuth, controller.getAllExpedientes);
api.put('/cajaadd/:idCaja/:idExpediente', checkAuth, controller.addExpedienteCaja);
api.delete('/caja/removeExpediente/:idExpediente', checkAuth, controller.removeExpedienteCaja);
api.get('/getExpedienteType/:numero/:anio', checkAuth, controller.getInfoExpediente);
api.get('/getTramitesExpediente/:idDocumento', checkAuth, controller.getTramitesExpediente);
api.get('/getTramitesDocumentosExpediente/:idDocumento', checkAuth, controller.getTramitesDocumentosExpediente);

// TRAMITES
api.post('/createTramite', checkAuth, controller.createTramite);
api.get('/getTramitesType', checkAuth, controller.getTramitesType);

module.exports = api;