const express = require('express')
const api = express.Router();
const controller = require('../controllers/authentication.controller.js');
const { validateAuth } = require('../validators/auth.validation.js');
const { validateRefresh } = require('../validators/refresh.validation.js');

api.post('/login', validateAuth, controller.loginUsernamePassword);
api.post('/refreshToken', validateRefresh, controller.refreshToken);

module.exports = api;