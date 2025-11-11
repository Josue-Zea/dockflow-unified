const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateResult");

const validateGetExpedienteEndpoint = [
  

  (req, res, next) => {
    validateResult(req, res, next);
  }
];

module.exports = { validateGetExpedienteEndpoint };
