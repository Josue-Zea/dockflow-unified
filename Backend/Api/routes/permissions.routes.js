const express = require('express')
const api = express.Router();
const controller = require('../controllers/permissions.controller.js');
const { checkAuth } = require('../middleware/auth.js');
const { checkRoleAuth } = require('../middleware/roleAuth.js');

api.get('/getPermisos', checkAuth, checkRoleAuth(["ADMIN"]), controller.getPermissions);

api.put('/updatePermiso', checkAuth, checkRoleAuth(["ADMIN"]), controller.updatePermission);

module.exports = api;