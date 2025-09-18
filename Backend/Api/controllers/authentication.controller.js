const { SERVER_CONFIG, ADMIN_CONFIG } = require('../config/config');
const { signToken } = require('../helpers/JWT');
const { fetchRoute } = require('../utils/consumeRoute');
const { saveLog } = require('../utils/saveLog');

const loginUsernamePassword = async (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_CONFIG.ADMIN_USER && password === ADMIN_CONFIG.ADMIN_PASSWORD) {
        const adminInfo = {
            "id": "0b8249d4-ad14-42e6-9f33-37217a47406a",
            "nombre": "ADMIN",
            "tipoUsuario": "ADMIN",
            "permisoExpedientes": 3,
            "permisoLibros": 3,
            "verExpedientesProceso": true,
            "verLibrosProceso": true
        }
        const response = {
            mensaje: "Correcto",
            token: signToken(adminInfo)
        }
        res.status(200).send(response);
        delete req.body.password;
        saveLog(true, "LOGIN", req.body, null);
        return;
    }
    const result = await fetchRoute(
        'POST',
        req.body,
        `${SERVER_CONFIG.MS_DATOS}/auth/login`
    );
    if (result.code === 200) {
        const response = {
            mensaje: "Correcto",
            token: signToken(result.data)
        }
        result.data = { ...response };
    }
    res.status(result.code).send(result.data);
    delete req.body.password;
    saveLog(true, "LOGIN", req.body, null);
};

module.exports = {
    loginUsernamePassword
};