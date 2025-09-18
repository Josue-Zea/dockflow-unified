const fetch = require('node-fetch');
const { SERVER_CONFIG } = require('../config/config');

const updateToken = async () => {
    const parametros = {
        username: 'admin',
        password: '123456',
    };

    // Configuración de la petición
    const opciones = {
        method: 'POST', // o 'GET', 'PUT', 'DELETE', etc.
        headers: {
            'Content-Type': 'application/json', // Tipo de contenido del cuerpo
        },
        body: JSON.stringify(parametros), // Convertir objeto a JSON
    };

    const response = await fetch(`${SERVER_CONFIG.API}/api/login/authenticate`, opciones);
    if(!response.ok){ //Algun error
        console.log("Hubo algun error");
        return false;
    } else {
        const data = await response.json();
        const { token } = data;
        global.token = token;
        return true;
    }
}

module.exports = {
    updateToken,
};