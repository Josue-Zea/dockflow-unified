const rateLimit = require('express-rate-limit');
const logger = require('./logger');

/**
 * Rate limiter para rutas de autenticación
 * Previene ataques de fuerza bruta
 */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // 5 intentos por ventana
    skipSuccessfulRequests: false,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.logWarn('Rate limit excedido en autenticación', {
            ip: req.ip,
            url: req.originalUrl
        });
        
        res.status(429).json({
            success: false,
            message: 'Demasiados intentos de inicio de sesión. Por favor, intenta de nuevo en 15 minutos.',
            retryAfter: '15 minutes'
        });
    },
    // Usar IP como identificador
    keyGenerator: (req) => {
        return req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    }
});

/**
 * Rate limiter general para API
 * Previene abuso de endpoints
 */
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 100, // 100 requests por minuto
    skipSuccessfulRequests: false,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.logWarn('Rate limit excedido en API', {
            ip: req.ip,
            url: req.originalUrl,
            userId: req.user?.id
        });
        
        res.status(429).json({
            success: false,
            message: 'Has excedido el límite de solicitudes. Por favor, intenta más tarde.',
            retryAfter: '1 minute'
        });
    },
    keyGenerator: (req) => {
        // Si hay usuario autenticado, usar su ID, si no usar IP
        return req.user?.id || req.ip || req.headers['x-forwarded-for'];
    }
});

/**
 * Rate limiter estricto para operaciones críticas
 * (crear, actualizar, eliminar)
 */
const strictLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutos
    max: 20, // 20 operaciones por ventana
    skipSuccessfulRequests: false,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.logWarn('Rate limit estricto excedido', {
            ip: req.ip,
            url: req.originalUrl,
            method: req.method,
            userId: req.user?.id
        });
        
        res.status(429).json({
            success: false,
            message: 'Has realizado demasiadas operaciones. Por favor, espera 5 minutos.',
            retryAfter: '5 minutes'
        });
    },
    keyGenerator: (req) => {
        return req.user?.id || req.ip;
    }
});

/**
 * Rate limiter para consultas pesadas
 * (expedientes, reportes, búsquedas)
 */
const heavyQueryLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutos
    max: 10, // 10 consultas por ventana
    skipSuccessfulRequests: true, // No contar consultas exitosas
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.logWarn('Rate limit de consultas pesadas excedido', {
            ip: req.ip,
            url: req.originalUrl,
            userId: req.user?.id
        });
        
        res.status(429).json({
            success: false,
            message: 'Has realizado demasiadas consultas. Por favor, espera 2 minutos.',
            retryAfter: '2 minutes'
        });
    },
    keyGenerator: (req) => {
        return req.user?.id || req.ip;
    }
});

module.exports = {
    authLimiter,
    apiLimiter,
    strictLimiter,
    heavyQueryLimiter
};
