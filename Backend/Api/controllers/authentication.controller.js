const { SERVER_CONFIG } = require('../config/config');
const { signToken, signRefreshToken, verifyRefreshToken } = require('../helpers/JWT');
const { loginUsernamePasswordApi } = require('../utils/loginUsernamePasswordApi');

const loginUsernamePassword = async (req, res) => {
    const { username, password } = req.body;

    let code = 0, data = { message: "" };
    try {
        const result = await loginUsernamePasswordApi(username, password);
        if (result.correct) {
            const response = {
                mensaje: "Correcto",
                token: signToken(result.data),
                refreshToken: signRefreshToken({ id: result.data.id, username: result.data.username }),
                expiraEn: SERVER_CONFIG.TOKEN_EXPIRES_IN,
                refreshExpiraEn: SERVER_CONFIG.REFRESH_TOKEN_EXPIRES_IN
            }
            code = 200; data = response;
        } else {
            code = 401; data = { message: "Usuario o contraseña incorrectos" };
        }
    } catch (err) {
        console.log(err);
        code = 500; data = { message: "Ocurrió algún error" };
    }
    res.status(code).send(data);
};

const refreshToken = async (req, res) => {
    const { refreshToken } = req.body || {};
    if (!refreshToken) return res.status(400).send({ message: 'refreshToken es requerido' });

    try {
        const payload = await verifyRefreshToken(refreshToken);
        if (!payload) return res.status(401).send({ message: 'Refresh token inválido o expirado' });

        const newAccessToken = signToken({ id: payload.id, username: payload.username });
        const newRefreshToken = signRefreshToken({ id: payload.id, username: payload.username });

        return res.status(200).send({ token: newAccessToken, expiraEn: SERVER_CONFIG.TOKEN_EXPIRES_IN, refreshToken: newRefreshToken, refreshExpiraEn: SERVER_CONFIG.REFRESH_TOKEN_EXPIRES_IN });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Ocurrió algún error al procesar el refresh token' });
    }
}

module.exports = {
    loginUsernamePassword,
    refreshToken
};