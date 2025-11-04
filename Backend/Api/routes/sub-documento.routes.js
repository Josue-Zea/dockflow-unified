const express = require('express')

const api = express.Router();

const subDocumentosController = require('../controllers/subdocumentos.controller');
const { checkAuth } = require('../middleware/auth');

api.post('/createSubDocumento', checkAuth, subDocumentosController.createSubDocumento);
api.get('/getSubDocumentosTypes', checkAuth, subDocumentosController.getSubDocumentosType);
api.get('/getSubDocumentosTramite', checkAuth, subDocumentosController.obtenerSubDocumentosTramite);
api.get('/getSubDocumento', checkAuth, subDocumentosController.getSubDocumentoPdf);
api.delete('/deleteSubDocumento', checkAuth, subDocumentosController.deleteSubDocumento);

module.exports = api;