const Joi = require('joi');

/**
 * Schema para crear un estante
 */
const createEstanteSchema = Joi.object({
    nombre: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'El nombre del estante es requerido',
            'string.min': 'El nombre debe tener al menos 1 carácter',
            'string.max': 'El nombre no puede exceder 100 caracteres',
            'any.required': 'El nombre del estante es requerido'
        }),
    
    ejex: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.base': 'El eje X debe ser un número',
            'number.integer': 'El eje X debe ser un número entero',
            'number.min': 'El eje X debe ser mayor o igual a 0',
            'any.required': 'El eje X es requerido'
        }),
    
    ejey: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.base': 'El eje Y debe ser un número',
            'number.integer': 'El eje Y debe ser un número entero',
            'number.min': 'El eje Y debe ser mayor o igual a 0',
            'any.required': 'El eje Y es requerido'
        }),
    
    ejez: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.base': 'El eje Z debe ser un número',
            'number.integer': 'El eje Z debe ser un número entero',
            'number.min': 'El eje Z debe ser mayor o igual a 0',
            'any.required': 'El eje Z es requerido'
        }),
    
    alto: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'El alto debe ser un número',
            'number.integer': 'El alto debe ser un número entero',
            'number.min': 'El alto debe ser mayor a 0',
            'any.required': 'El alto es requerido'
        }),
    
    ancho: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'El ancho debe ser un número',
            'number.integer': 'El ancho debe ser un número entero',
            'number.min': 'El ancho debe ser mayor a 0',
            'any.required': 'El ancho es requerido'
        })
});

/**
 * Schema para actualizar un estante
 */
const updateEstanteSchema = Joi.object({
    nombre: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .messages({
            'string.empty': 'El nombre del estante no puede estar vacío',
            'string.min': 'El nombre debe tener al menos 1 carácter',
            'string.max': 'El nombre no puede exceder 100 caracteres'
        }),
    
    ejex: Joi.number()
        .integer()
        .min(0)
        .messages({
            'number.base': 'El eje X debe ser un número',
            'number.integer': 'El eje X debe ser un número entero',
            'number.min': 'El eje X debe ser mayor o igual a 0'
        }),
    
    ejey: Joi.number()
        .integer()
        .min(0)
        .messages({
            'number.base': 'El eje Y debe ser un número',
            'number.integer': 'El eje Y debe ser un número entero',
            'number.min': 'El eje Y debe ser mayor o igual a 0'
        }),
    
    ejez: Joi.number()
        .integer()
        .min(0)
        .messages({
            'number.base': 'El eje Z debe ser un número',
            'number.integer': 'El eje Z debe ser un número entero',
            'number.min': 'El eje Z debe ser mayor o igual a 0'
        }),
    
    alto: Joi.number()
        .integer()
        .min(1)
        .messages({
            'number.base': 'El alto debe ser un número',
            'number.integer': 'El alto debe ser un número entero',
            'number.min': 'El alto debe ser mayor a 0'
        }),
    
    ancho: Joi.number()
        .integer()
        .min(1)
        .messages({
            'number.base': 'El ancho debe ser un número',
            'number.integer': 'El ancho debe ser un número entero',
            'number.min': 'El ancho debe ser mayor a 0'
        })
}).min(1).messages({
    'object.min': 'Debe proporcionar al menos un campo para actualizar'
});

/**
 * Schema para query params de estante
 */
const estanteQuerySchema = Joi.object({
    idEstante: Joi.string()
        .uuid()
        .required()
        .messages({
            'string.guid': 'El ID del estante debe ser un UUID válido',
            'any.required': 'El ID del estante es requerido'
        }),
    
    idNivel: Joi.number()
        .integer()
        .min(0)
        .messages({
            'number.base': 'El nivel debe ser un número',
            'number.integer': 'El nivel debe ser un número entero',
            'number.min': 'El nivel debe ser mayor o igual a 0'
        })
});

module.exports = {
    createEstanteSchema,
    updateEstanteSchema,
    estanteQuerySchema
};
