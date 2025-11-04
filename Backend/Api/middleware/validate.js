const logger = require('../helpers/logger');

/**
 * Middleware de validación usando esquemas Joi
 * @param {Object} schema - Esquema de validación Joi
 * @param {string} source - De dónde obtener los datos ('body', 'query', 'params')
 * @returns {Function} Middleware de Express
 */
const validate = (schema, source = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[source], {
            abortEarly: false, // Mostrar todos los errores
            stripUnknown: true, // Eliminar campos no definidos en el schema
            convert: true // Convertir tipos automáticamente
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message.replace(/['"]/g, ''),
                type: detail.type
            }));

            logger.logWarn('Error de validación', {
                url: req.originalUrl,
                method: req.method,
                errors,
                ip: req.ip
            });

            return res.status(400).json({
                success: false,
                message: 'Errores de validación en los datos proporcionados',
                errors
            });
        }

        // Reemplazar con datos validados y sanitizados
        req[source] = value;
        next();
    };
};

/**
 * Middleware para validar múltiples fuentes
 * @param {Object} schemas - Objeto con schemas para body, query, params
 * @example
 * validateMultiple({
 *   body: createSchema,
 *   query: paginationSchema
 * })
 */
const validateMultiple = (schemas) => {
    return (req, res, next) => {
        const errors = [];

        // Validar cada fuente
        for (const [source, schema] of Object.entries(schemas)) {
            const { error, value } = schema.validate(req[source], {
                abortEarly: false,
                stripUnknown: true,
                convert: true
            });

            if (error) {
                errors.push(...error.details.map(detail => ({
                    source,
                    field: detail.path.join('.'),
                    message: detail.message.replace(/['"]/g, ''),
                    type: detail.type
                })));
            } else {
                req[source] = value;
            }
        }

        if (errors.length > 0) {
            logger.logWarn('Errores de validación múltiple', {
                url: req.originalUrl,
                method: req.method,
                errors,
                ip: req.ip
            });

            return res.status(400).json({
                success: false,
                message: 'Errores de validación en los datos proporcionados',
                errors
            });
        }

        next();
    };
};

module.exports = {
    validate,
    validateMultiple
};
