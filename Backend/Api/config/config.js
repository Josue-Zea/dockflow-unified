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
}

const SERVER_CONFIG = {
    SERVER_PORT: process.env.SERVER_PORT || "3000",
    MS_DATOS: process.env.MS_DATOS || "http://131.107.5.82:3001",
    MS_EXPEDIENTES: process.env.MS_EXPEDIENTES || "http://131.107.5.47:3002",
    MS_DOCKFLOW: process.env.MS_DOCKFLOW || "http://131.107.5.106:3005",
    MS_LIBROS: process.env.MS_LIBROS || "",
    JWT_KEY: process.env.JWT_KEY || "9e46b0d694484240a054fc89d857c9d2"
}

const DATABASE_CONFIG = {
    DATABASE_ADDR: process.env.DATABASE_ADDR || "131.107.5.106",
    KEYSPACE: process.env.KEYSPACE || "sistema_nuevo"
}

const ADMIN_CONFIG = {
    ADMIN_USER: process.env.ADMIN_USER || "admin",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "123456",
    SAMPLE_TOKEN: process.env.SAMPLE_TOKEN || ""
}

module.exports = {
    SWAGGER_CONFIG,
    SERVER_CONFIG,
    DATABASE_CONFIG,
    ADMIN_CONFIG
}