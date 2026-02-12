const { saveAuditLog } = require('../utils/saveLog');

const METHOD_TO_OPERATION = {
    POST: 'CREATE',
    PUT: 'UPDATE',
    DELETE: 'DELETE',
};

/**
 * Middleware que registra operaciones CRUD en la tabla Bitacora.
 * Se engancha a res.on('finish') para ejecutar DESPUÉS de enviar la respuesta,
 * así no impacta el tiempo de respuesta del endpoint.
 */
const auditLog = (req, res, next) => {
    const method = req.method.toUpperCase();
    const operation = METHOD_TO_OPERATION[method];

    // Solo loguear métodos mutantes
    if (!operation) {
        return next();
    }

    res.on('finish', () => {
        // Solo loguear respuestas exitosas (2xx)
        if (res.statusCode < 200 || res.statusCode >= 300) return;

        // Solo loguear si hay usuario autenticado
        const userId = req.user && req.user.id;
        if (!userId) return;

        const descripcion = `${method} ${req.originalUrl} - ${res.statusCode}`;
        saveAuditLog(userId, operation, descripcion);
    });

    next();
};

module.exports = { auditLog };
