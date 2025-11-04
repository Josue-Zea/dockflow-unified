/**
 * Manejador centralizado de respuestas para controllers
 * Elimina código repetitivo y estandariza las respuestas
 */

const logger = require('./logger');

/**
 * Envuelve la lógica del controller y maneja errores automáticamente
 * @param {Function} handler - Función async que retorna el resultado de la operación
 * @returns {Function} Middleware de Express
 */
const asyncHandler = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        logger.logError(error, {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
            userId: req.user?.id
        });
        
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Procesa el resultado de una operación de base de datos y envía la respuesta
 * @param {Object} res - Objeto response de Express
 * @param {Object} result - Resultado de la operación {correct: boolean, data?: any, error?: string}
 * @param {Object} messages - Mensajes personalizados {success: string, error?: string}
 */
const handleDatabaseResult = (res, result, messages = {}) => {
    const defaultMessages = {
        success: 'Operación exitosa',
        error: 'Ocurrió un error al procesar la solicitud'
    };

    const finalMessages = { ...defaultMessages, ...messages };

    if (result.correct) {
        return res.status(200).json({
            success: true,
            message: finalMessages.success,
            data: result.data
        });
    } else {
        return res.status(400).json({
            success: false,
            message: finalMessages.error,
            error: result.error || result.message
        });
    }
};

/**
 * Valida que todos los parámetros requeridos estén presentes
 * @param {Object} source - Objeto que contiene los parámetros (req.body, req.query, etc)
 * @param {Array<string>} requiredFields - Array de nombres de campos requeridos
 * @returns {Object} {valid: boolean, missing?: Array<string>}
 */
const validateRequiredFields = (source, requiredFields) => {
    const missing = requiredFields.filter(field => {
        const value = source[field];
        return value === undefined || value === null || value === '';
    });

    return {
        valid: missing.length === 0,
        missing
    };
};

/**
 * Middleware para validar parámetros requeridos
 * @param {Array<string>} fields - Campos requeridos
 * @param {string} source - De dónde obtener los campos ('body', 'query', 'params')
 */
const requireFields = (fields, source = 'body') => (req, res, next) => {
    const validation = validateRequiredFields(req[source], fields);
    
    if (!validation.valid) {
        return res.status(400).json({
            success: false,
            message: 'Faltan parámetros requeridos',
            missing: validation.missing
        });
    }
    
    next();
};

module.exports = {
    asyncHandler,
    handleDatabaseResult,
    validateRequiredFields,
    requireFields
};
