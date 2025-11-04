const Joi = require('joi');

/**
 * Schema para crear un trámite
 */
const createTramiteSchema = Joi.object({
    iddocumentoexpediente: Joi.string()
        .uuid()
        .required()
        .messages({
            'string.guid': 'El ID del documento debe ser un UUID válido',
            'any.required': 'El ID del documento expediente es requerido'
        }),
    
    pdfbase64: Joi.string()
        .base64()
        .required()
        .messages({
            'string.base64': 'El PDF debe estar en formato base64 válido',
            'any.required': 'El PDF del trámite es requerido'
        }),
    
    nombre: Joi.string()
        .trim()
        .min(1)
        .max(200)
        .required()
        .messages({
            'string.empty': 'El nombre del trámite es requerido',
            'string.min': 'El nombre debe tener al menos 1 carácter',
            'string.max': 'El nombre no puede exceder 200 caracteres',
            'any.required': 'El nombre del trámite es requerido'
        }),
    
    fecha: Joi.date()
        .iso()
        .required()
        .messages({
            'date.base': 'La fecha debe ser válida',
            'date.format': 'La fecha debe estar en formato ISO',
            'any.required': 'La fecha del trámite es requerida'
        }),
    
    tipotramite: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'El tipo de trámite es requerido',
            'any.required': 'El tipo de trámite es requerido'
        })
});

/**
 * Schema para query de trámites
 */
const tramiteQuerySchema = Joi.object({
    iddocumentoexpediente: Joi.string()
        .uuid()
        .messages({
            'string.guid': 'El ID del documento debe ser un UUID válido'
        }),
    
    idDocumento: Joi.string()
        .uuid()
        .messages({
            'string.guid': 'El ID del documento debe ser un UUID válido'
        })
});

/**
 * Schema para params de trámite
 */
const tramiteParamsSchema = Joi.object({
    idTramite: Joi.string()
        .uuid()
        .required()
        .messages({
            'string.guid': 'El ID del trámite debe ser un UUID válido',
            'any.required': 'El ID del trámite es requerido'
        }),
    
    idDocumento: Joi.string()
        .uuid()
        .required()
        .messages({
            'string.guid': 'El ID del documento debe ser un UUID válido',
            'any.required': 'El ID del documento es requerido'
        })
});

module.exports = {
    createTramiteSchema,
    tramiteQuerySchema,
    tramiteParamsSchema
};
