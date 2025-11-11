const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateResult");

const validateRefresh = [
  check("refreshToken")
    .exists({ checkFalsy: true }).withMessage("El refreshToken es obligatorio")
    .isString().withMessage("El refreshToken debe ser un string"),

  (req, res, next) => {
    validateResult(req, res, next);
  }
];

module.exports = { validateRefresh };
