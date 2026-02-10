const logger = require('./logger');

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

module.exports = {
    asyncHandler,
    handleDatabaseResult
};
