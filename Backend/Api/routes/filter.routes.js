const express = require('express')

const api = express.Router();
const controller = require('../controllers/filter.controller.js');
const { checkAuth } = require('../middleware/auth.js');
const { checkRoleAuth } = require('../middleware/roleAuth.js');

api.get('/getUsuarios', checkAuth, checkRoleAuth(["ADMIN"]), controller.getUsers);

api.post('/filterLogs', checkAuth, checkRoleAuth(["ADMIN"]), controller.filterLogs);

module.exports = api;