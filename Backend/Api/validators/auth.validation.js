const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateResult");

const validateAuth = [
  check("username")
    .exists({ checkFalsy: true }).withMessage("El nombre de usuario es obligatorio")
    .isString().withMessage("El nombre de usuario debe ser un texto")
    .isLength({ min: 3, max: 30 }).withMessage("El nombre de usuario debe tener entre 3 y 30 caracteres"),

  check("password")
    .exists({ checkFalsy: true }).withMessage("La contraseña es obligatoria")
    .isString().withMessage("La contraseña debe ser un texto")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),

  (req, res, next) => {
    validateResult(req, res, next);
  }
];

module.exports = { validateAuth };
