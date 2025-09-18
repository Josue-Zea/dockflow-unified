const { SERVER_CONFIG } = require("../config/config");
const { fetchRoute } = require("../utils/consumeRoute");

const getUsers = async (req, res) => {
    const result = await fetchRoute(
        'GET',
        req.body,
        `${SERVER_CONFIG.MS_DATOS}/filter/getUsuarios`
    );
    res.status(result.code).send(result.data);
};

const filterLogs = async (req, res) => {
    const result = await fetchRoute(
        'POST',
        req.body,
        `${SERVER_CONFIG.MS_DATOS}/filter/filterLogs`
    );
    res.status(result.code).send(result.data);
};

module.exports = {
    getUsers,
    filterLogs,
};