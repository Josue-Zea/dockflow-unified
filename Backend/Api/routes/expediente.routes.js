const express = require('express')
const { checkAuth } = require('../middleware/auth.js');
const api = express.Router();
const controller = require('../controllers/expedientes.controller.js');

api.get('/getExpediente', checkAuth, controller.getExpediente);
api.get('/getTiposExpediente', checkAuth, controller.getTiposExpediente);
api.get('/getSubtiposExpediente', checkAuth, controller.getSubTiposExpediente);
api.post('/createExpediente', checkAuth, controller.createExpediente);
api.delete('/deleteExpediente', checkAuth, controller.deleteExpediente);
api.get('/getInfoExpediente', checkAuth, controller.getInfoExpediente);
api.get('/getTramitesExpediente', checkAuth, controller.getTramitesExpediente);
api.get('/getTramitesDocumentosExpediente', checkAuth, controller.getTramitesDocumentosExpediente);

module.exports = api;