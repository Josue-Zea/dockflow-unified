const { SERVER_CONFIG } = require("../config/config");
const { fetchRoute } = require("../utils/consumeRoute");
const { saveLog } = require('../utils/saveLog');

const getPermissions = async (req, res) => {
    const result = await fetchRoute(
        'GET',
        req.body,
        `${SERVER_CONFIG.MS_DATOS}/permisos/getPermisos`
    );
    res.status(result.code).send(result.data);
};

const updatePermission = async (req, res) => {
    const result = await fetchRoute(
        'POST',
        req.body,
        `${SERVER_CONFIG.MS_DATOS}/permisos/updatePermiso`
    );
    res.status(result.code).send(result.data);
    saveLog(false, "ACTUALIZACION", req.body, req);
};

module.exports = {
    getPermissions,
    updatePermission
};