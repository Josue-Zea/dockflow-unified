const express = require('express')

const api = express.Router();

const tramitesController = require('../controllers/tramites.controller');
const { checkAuth } = require('../middleware/auth');

api.post('/createTramite',checkAuth, tramitesController.createTramite);
api.get('/getTramitesType',checkAuth, tramitesController.getTramitesType);
api.get('/getTramitePdf',checkAuth, tramitesController.getTramitePdf);
api.get('/getTramitesExpediente', checkAuth, tramitesController.obtenerTramitesDeExpediente);
api.delete('/deleteTramite/:idTramite/:idDocumento',checkAuth, tramitesController.deleteTramite);

module.exports = api;