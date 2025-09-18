const express = require('express')
const { checkAuth } = require('../middleware/auth.js');
const api = express.Router();
const controller = require('../controllers/expediente.controller.js');

api.post('/getExpediente', checkAuth, controller.getExpediente);
api.get('/getTipoExpediente', checkAuth, controller.getTipoExpediente);
api.get('/getSubtipoExpediente', checkAuth, controller.getSubTipoExpediente);
api.post('/createExpediente', controller.createExpediente);
api.delete('/deleteExpediente', controller.deleteExpediente);

module.exports = api;