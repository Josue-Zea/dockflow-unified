require('dotenv').config();
//Si es necesario usar swagger, descomentar esto
const path = require("path");

const SWAGGER_CONFIG = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Evisor",
            version: "1.0.0"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: [
        `${path.join(__dirname, "../documentation/*.js")}`
    ]
};

const SERVER_CONFIG = {
    API_VERSION: process.env.API_VERSION || "1.0.0",
    SERVER_PORT: process.env.SERVER_PORT || "3000",
    MS_DATOS: process.env.MS_DATOS || "http://131.107.5.82:3001",
    MS_LIBROS: process.env.MS_LIBROS || "",
    JWT_KEY: process.env.JWT_KEY || "f723861266e7446006497747e9262f2f77e8a93e3d2c882103f566412e690f0a",
    TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN || "24h",
    REFRESH_JWT_KEY: process.env.REFRESH_JWT_KEY || (process.env.JWT_KEY || "9e46b0d694484240a054fc89d857c9d2"),
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d"
};

const DATABASE_CONFIG = {
    DATABASE_ADDR: process.env.DATABASE_ADDR || "172.16.3.5",
    KEYSPACE: process.env.KEYSPACE || "evisor"
};

const ADMIN_CONFIG = {
    ADMIN_USER: process.env.ADMIN_USER || "admin",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "123456",
    SAMPLE_TOKEN: process.env.SAMPLE_TOKEN || ""
};

const FILES_SERVICE_CONFIG = {
    BASE_URL: (process.env.FILES_SERVICE_URL || 'http://172.16.0.5:3002').replace(/\/$/, ''),
    BASE_PATH: process.env.FILES_BASE_PATH || 'C:/Documents'
};

module.exports = {
    SWAGGER_CONFIG,
    SERVER_CONFIG,
    DATABASE_CONFIG,
    ADMIN_CONFIG,
    FILES_SERVICE_CONFIG
}
