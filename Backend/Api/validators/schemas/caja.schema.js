const Joi = require('joi');

/**
 * Schema para crear una caja
 */
const createCajaSchema = Joi.object({
    nombre: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'El nombre de la caja es requerido',
            'string.min': 'El nombre debe tener al menos 1 carácter',
            'string.max': 'El nombre no puede exceder 100 caracteres',
            'any.required': 'El nombre de la caja es requerido'
        }),
    
    idestante: Joi.string()
        .uuid()
        .required()
        .messages({
            'string.guid': 'El ID del estante debe ser un UUID válido',
            'any.required': 'El ID del estante es requerido'
        })
});

/**
 * Schema para actualizar una caja
 */
const updateCajaSchema = Joi.object({
    nombre: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .messages({
            'string.empty': 'El nombre de la caja no puede estar vacío',
            'string.min': 'El nombre debe tener al menos 1 carácter',
            'string.max': 'El nombre no puede exceder 100 caracteres'
        }),
    
    idEstante: Joi.string()
        .uuid()
        .messages({
            'string.guid': 'El ID del estante debe ser un UUID válido'
        })
}).min(1).messages({
    'object.min': 'Debe proporcionar al menos un campo para actualizar'
});

/**
 * Schema para query params de caja
 */
const cajaQuerySchema = Joi.object({
    idCaja: Joi.string()
        .uuid()
        .required()
        .messages({
            'string.guid': 'El ID de la caja debe ser un UUID válido',
            'any.required': 'El ID de la caja es requerido'
        }),
    
    idEstante: Joi.string()
        .uuid()
        .messages({
            'string.guid': 'El ID del estante debe ser un UUID válido'
        }),
    
    status: Joi.boolean()
        .messages({
            'boolean.base': 'El estado debe ser true o false'
        })
});

/**
 * Schema para agregar expediente a caja
 */
const addExpedienteSchema = Joi.object({
    idCaja: Joi.string()
        .uuid()
        .required()
        .messages({
            'string.guid': 'El ID de la caja debe ser un UUID válido',
            'any.required': 'El ID de la caja es requerido'
        }),
    
    idDocumentoExpediente: Joi.string()
        .uuid()
        .required()
        .messages({
            'string.guid': 'El ID del documento debe ser un UUID válido',
            'any.required': 'El ID del documento es requerido'
        })
});

module.exports = {
    createCajaSchema,
    updateCajaSchema,
    cajaQuerySchema,
    addExpedienteSchema
};
