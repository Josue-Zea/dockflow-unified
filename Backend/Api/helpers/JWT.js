const jwt = require("jsonwebtoken");
const { SERVER_CONFIG } = require("../config/config");

// Para validar que el token sea correcto
const verifyToken = async (token) => {
    try {
        return jwt.verify(token, SERVER_CONFIG.JWT_KEY);
    } catch (e) {
        console.log(e);
        return null;
    }
};

const signToken = (data) => {
    const newData = { ...data };
    const opcionesToken = {
        expiresIn: '365d', // 1 mes
    };
    return jwt.sign(newData, SERVER_CONFIG.JWT_KEY, opcionesToken);
}

module.exports = {
    verifyToken,
    signToken
}