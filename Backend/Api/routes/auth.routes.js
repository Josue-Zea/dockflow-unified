const express = require('express')
const api = express.Router();
const controller = require('../controllers/authentication.controller.js');

api.post('/login', controller.loginUsernamePassword);

module.exports = api;