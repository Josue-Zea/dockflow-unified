const fetch = require('node-fetch');
const { SERVER_CONFIG } = require('../config/config');
const { updateToken } = require('./updateToken');
const { getExpedienteDB } = require('./getExpedienteDB');
const { getDocumentFromDB } = require('./getDocumentFromDB');

const lookInDatabase = async (num_exp, anio_exp) => {
    try {
        const result = await getExpedienteDB(num_exp, anio_exp);
        if (!result.correct) { //Algun error
            return { correct: false, fromRM: false, data: {} };
        }
        const b64Document = await getDocumentFromDB(result.data[0].iddocumento)
        return { correct: true, fromRM: false, data: b64Document };
    } catch (err) {
        console.log("Error lookInDatabase", err);
        return { correct: false, fromRM: false, data: {} };
    }
}

module.exports = {
    lookInDatabase
};