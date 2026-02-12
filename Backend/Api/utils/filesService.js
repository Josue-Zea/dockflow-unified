const fetch = require('node-fetch');
const { FILES_SERVICE_CONFIG } = require('../config/config');

const FILES_ENDPOINT = `${FILES_SERVICE_CONFIG.BASE_URL}/files/document`;

const saveDocumentInServer = async ({ documentName, documentType, pdfBase64, token }) => {
    const response = await fetch(FILES_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            documentName,
            documentType,
            pdfBase64,
        }),
        timeout: 30000,
    });

    if (!response.ok) {
        const errorText = await response.text();
        const error = new Error('FILES_SERVICE_ERROR');
        error.details = errorText;
        error.status = response.status;
        throw error;
    }

    return await response.json();
};

module.exports = {
    saveDocumentInServer
};
