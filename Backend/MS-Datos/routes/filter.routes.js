const express = require('express')

const api = express.Router();
const controller = require('../controllers/filter.controller.js');

api.get('/getUsuarios', controller.getUsers);
api.put('/filterLogs', controller.filterLogs);

module.exports = api;