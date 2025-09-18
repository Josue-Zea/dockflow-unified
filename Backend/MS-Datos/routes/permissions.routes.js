const express = require('express')
const api = express.Router();
const controller = require('../controllers/permissions.controller.js');

api.get('/getPermisos', controller.getPermissions);

api.post('/updatePermiso', controller.updatePermission);

module.exports = api;