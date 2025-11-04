const Joi = require('joi');

/**
 * Schema para login
 */
const loginSchema = Joi.object({
    username: Joi.string()
        .trim()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.empty': 'El usuario es requerido',
            'string.alphanum': 'El usuario solo puede contener caracteres alfanuméricos',
            'string.min': 'El usuario debe tener al menos 3 caracteres',
            'string.max': 'El usuario no puede exceder 30 caracteres',
            'any.required': 'El usuario es requerido'
        }),
    
    password: Joi.string()
        .min(4)
        .max(100)
        .required()
        .messages({
            'string.empty': 'La contraseña es requerida',
            'string.min': 'La contraseña debe tener al menos 4 caracteres',
            'string.max': 'La contraseña no puede exceder 100 caracteres',
            'any.required': 'La contraseña es requerida'
        })
});

module.exports = {
    loginSchema
};
