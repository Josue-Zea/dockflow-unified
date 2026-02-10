const express = require('express')
const api = express.Router();
const controller = require('../controllers/authentication.controller.js');
const { validateAuth } = require('../validators/auth.validation.js');
const { validateRefresh } = require('../validators/refresh.validation.js');
const { authLimiter } = require('../middleware/rateLimiter');

api.post('/login', authLimiter, validateAuth, controller.loginUsernamePassword);
api.post('/refreshToken', authLimiter, validateRefresh, controller.refreshToken);

module.exports = api;