const fetch = require('node-fetch');
const { FILES_SERVICE_CONFIG } = require('../config/config');

const HEALTH_CHECK_ENDPOINT = `${FILES_SERVICE_CONFIG.BASE_URL}/health`;

const healthCheckWindowsServer = async () => {
    const response = await fetch(HEALTH_CHECK_ENDPOINT, {
        method: 'GET',
    });

    const payload = await response.json();
    return payload;
};

module.exports = {
    healthCheckWindowsServer,
};