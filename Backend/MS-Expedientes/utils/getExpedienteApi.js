const fetch = require('node-fetch');
const { SERVER_CONFIG } = require('../config/config');
const { updateToken } = require('./updateToken');
const { getExpedienteDB } = require('./getExpedienteDB');
const { getDocumentFromDB } = require('./getDocumentFromDB');

const getExpedienteApi = async (num_exp, anio_exp) => {
    const isInDatabase = await lookInDatabase(num_exp, anio_exp);
    if (isInDatabase.correct) {
        return isInDatabase;
    } else {
        if (global.token === '') {
            const result = await updateToken();
            if (!result) {
                res.status(501).send("Error al actualizar el token desde apiRM");
                console.log("Error al actualizar el token"); return;
            }
        }

        return await getFromRMApi(num_exp, anio_exp);
    }
}

const getFromRMApi = async (num_exp, anio_exp) => {
    try {
        const parametros = {
            num_exp,
            anio_exp,
        };

        // Configuración de la petición
        const opciones = {
            method: 'POST', // o 'GET', 'PUT', 'DELETE', etc.
            headers: {
                'Content-Type': 'application/json', // Tipo de contenido del cuerpo
                'Authorization': global.token
            },
            body: JSON.stringify(parametros), // Convertir objeto a JSON
        };

        const response = await fetch(`${SERVER_CONFIG.API}/api/pathimg/`, opciones);
        if (!response.ok && response.status !== 401) { //Algun error
            return { correct: false, fromRM: true, data: {} };
        }
        if (response.status === 401) {
            const result = await updateToken();
            if (!result) {
                console.log("Error al actualizar el token"); return;
            }
        }
        const data = await response.json();
        return { correct: true, fromRM: true, data };
    } catch (err) {
        return { correct: false, fromRM: true, data: {} };
    }
}

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
    getExpedienteApi,
};