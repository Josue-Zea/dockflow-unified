const jwt = require("jsonwebtoken");
const { SERVER_CONFIG } = require("../config/config");

// Verifica access token
const verifyToken = async (token) => {
    try {
        return jwt.verify(token, SERVER_CONFIG.JWT_KEY);
    } catch (e) {
        // evitar console.log en favor del logger en controladores
        return null;
    }
};

// Firma access token (corto plazo)
const signToken = (data) => {
    const newData = { ...data };
    const opcionesToken = {
        expiresIn: SERVER_CONFIG.TOKEN_EXPIRES_IN,
    };
    return jwt.sign(newData, SERVER_CONFIG.JWT_KEY, opcionesToken);
}

// Firma refresh token (largo plazo). Se recomienda usar una clave diferente.
const signRefreshToken = (data) => {
    const newData = { ...data };
    const opcionesToken = {
        expiresIn: SERVER_CONFIG.REFRESH_TOKEN_EXPIRES_IN,
    };
    return jwt.sign(newData, SERVER_CONFIG.REFRESH_JWT_KEY, opcionesToken);
}

// Verifica refresh token
const verifyRefreshToken = async (token) => {
    try {
        return jwt.verify(token, SERVER_CONFIG.REFRESH_JWT_KEY);
    } catch (e) {
        return null;
    }
}

module.exports = {
    verifyToken,
    signToken,
    signRefreshToken,
    verifyRefreshToken
}