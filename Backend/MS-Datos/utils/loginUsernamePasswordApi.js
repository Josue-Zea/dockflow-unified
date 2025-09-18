const fetch = require('node-fetch');
const { SERVER_CONFIG } = require('../config/config');
const { updateToken } = require('./updateToken');

const loginUsernamePasswordApi = async (user, psw) => {
    const parametros = {
        user,
        psw,
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

    const response = await fetch(`${SERVER_CONFIG.API}/api/rmlogin/`, opciones);
    if (!response.ok && response.status !== 401) { //Algun error
        return { correct: false, data: {} };
    }
    if (response.status === 401) {
        const result = await updateToken();
        if( !result ) {
            console.log("Error al actualizar el token"); return;
        }
    }
    const data = await response.json();
    return { correct: true, data };
}

module.exports = {
    loginUsernamePasswordApi,
};