const winston = require('winston');
const path = require('path');

// Definir niveles personalizados de log
const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'blue'
    }
};

// Agregar colores
winston.addColors(customLevels.colors);

// Formato para consola (desarrollo)
const consoleFormat = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, ...metadata }) => {
        let msg = `${timestamp} [${level}]: ${message}`;
        
        // Agregar metadata si existe
        if (Object.keys(metadata).length > 0) {
            msg += ` ${JSON.stringify(metadata, null, 2)}`;
        }
        
        return msg;
    })
);

// Formato para archivos (producción)
const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

// Crear directorio de logs si no existe
const logsDir = path.join(__dirname, '../logs');

// Configurar transports
const transports = [
    // Error logs
    new winston.transports.File({
        filename: path.join(logsDir, 'error.log'),
        level: 'error',
        format: fileFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5
    }),
    
    // Combined logs
    new winston.transports.File({
        filename: path.join(logsDir, 'combined.log'),
        format: fileFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5
    })
];

// Agregar console en desarrollo
if (process.env.NODE_ENV !== 'production') {
    transports.push(
        new winston.transports.Console({
            format: consoleFormat
        })
    );
}

// Crear logger
const logger = winston.createLogger({
    levels: customLevels.levels,
    level: process.env.LOG_LEVEL || 'info',
    transports,
    exitOnError: false
});

// Crear stream para Morgan (HTTP logging)
logger.stream = {
    write: (message) => {
        logger.http(message.trim());
    }
};

// Helper methods
logger.logError = (error, context = {}) => {
    logger.error(error.message || error, {
        stack: error.stack,
        ...context
    });
};

logger.logInfo = (message, data = {}) => {
    logger.info(message, data);
};

logger.logWarn = (message, data = {}) => {
    logger.warn(message, data);
};

logger.logDebug = (message, data = {}) => {
    logger.debug(message, data);
};

module.exports = logger;
