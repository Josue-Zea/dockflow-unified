const Joi = require('joi');

/**
 * Schema para obtener expediente
 */
const getExpedienteSchema = Joi.object({
    numero_expediente: Joi.string()
        .trim()
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
            'string.empty': 'El número de expediente es requerido',
            'string.pattern.base': 'El número de expediente debe contener solo dígitos',
            'any.required': 'El número de expediente es requerido'
        }),
    
    anio_expediente: Joi.string()
        .trim()
        .pattern(/^[0-9]{4}$/)
        .required()
        .messages({
            'string.empty': 'El año del expediente es requerido',
            'string.pattern.base': 'El año debe ser un número de 4 dígitos',
            'any.required': 'El año del expediente es requerido'
        })
});

/**
 * Schema para eliminar expediente
 */
const deleteExpedienteSchema = Joi.object({
    numero_expediente: Joi.string()
        .trim()
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
            'string.empty': 'El número de expediente es requerido',
            'string.pattern.base': 'El número de expediente debe contener solo dígitos',
            'any.required': 'El número de expediente es requerido'
        }),
    
    anio_expediente: Joi.string()
        .trim()
        .pattern(/^[0-9]{4}$/)
        .required()
        .messages({
            'string.empty': 'El año del expediente es requerido',
            'string.pattern.base': 'El año debe ser un número de 4 dígitos',
            'any.required': 'El año del expediente es requerido'
        }),
    
    iddocumento: Joi.string()
        .uuid()
        .required()
        .messages({
            'string.guid': 'El ID del documento debe ser un UUID válido',
            'any.required': 'El ID del documento es requerido'
        })
});

/**
 * Schema para crear expediente
 */
const createExpedienteSchema = Joi.object({
    numero_expediente: Joi.string()
        .trim()
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
            'string.empty': 'El número de expediente es requerido',
            'string.pattern.base': 'El número de expediente debe contener solo dígitos',
            'any.required': 'El número de expediente es requerido'
        }),
    
    anio_expediente: Joi.string()
        .trim()
        .pattern(/^[0-9]{4}$/)
        .required()
        .messages({
            'string.empty': 'El año del expediente es requerido',
            'string.pattern.base': 'El año debe ser un número de 4 dígitos',
            'any.required': 'El año del expediente es requerido'
        }),
    
    document: Joi.string()
        .base64()
        .required()
        .messages({
            'string.base64': 'El documento debe estar en formato base64 válido',
            'any.required': 'El documento es requerido'
        }),
    
    numerotramite: Joi.number()
        .integer()
        .min(1)
        .default(1)
        .messages({
            'number.base': 'El número de trámite debe ser un número',
            'number.integer': 'El número de trámite debe ser un entero',
            'number.min': 'El número de trámite debe ser al menos 1'
        }),
    
    idtipo: Joi.string()
        .uuid()
        .required()
        .messages({
            'string.guid': 'El ID del tipo debe ser un UUID válido',
            'any.required': 'El tipo de expediente es requerido'
        }),
    
    idsubtipo: Joi.string()
        .uuid()
        .required()
        .messages({
            'string.guid': 'El ID del subtipo debe ser un UUID válido',
            'any.required': 'El subtipo de expediente es requerido'
        }),
    
    iddocumento: Joi.string()
        .uuid()
        .messages({
            'string.guid': 'El ID del documento debe ser un UUID válido'
        }),
    
    idusuario: Joi.string()
        .uuid()
        .messages({
            'string.guid': 'El ID del usuario debe ser un UUID válido'
        }),
    
    idtipodocumento: Joi.string()
        .uuid()
        .messages({
            'string.guid': 'El ID del tipo de documento debe ser un UUID válido'
        }),
    
    hojasdocumento: Joi.number()
        .integer()
        .min(1)
        .messages({
            'number.base': 'El número de hojas debe ser un número',
            'number.integer': 'El número de hojas debe ser un entero',
            'number.min': 'El número de hojas debe ser al menos 1'
        }),
    
    pesodocumento: Joi.number()
        .min(0)
        .messages({
            'number.base': 'El peso del documento debe ser un número',
            'number.min': 'El peso no puede ser negativo'
        }),
    
    idestado: Joi.string()
        .uuid()
        .messages({
            'string.guid': 'El ID del estado debe ser un UUID válido'
        }),
    
    idcaja: Joi.string()
        .uuid()
        .messages({
            'string.guid': 'El ID de la caja debe ser un UUID válido'
        })
});

module.exports = {
    getExpedienteSchema,
    deleteExpedienteSchema,
    createExpedienteSchema
};
