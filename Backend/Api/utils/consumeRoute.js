
const fetchRoute = async (method, body, endpoint) => {
    let code = 200, data = {};
    try {
        const opciones = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (method !== 'GET' && method !== 'DELETE') {
            opciones.body = JSON.stringify(body);
        }

        const response = await fetch(endpoint, opciones);
        if (response.ok) { //Algun error
            code = 200;
            data = await response.json();
        } else {
            code = 400;
        }
    } catch (err) {
        code = 400;
        data = { err }
    }
    return {
        code,
        data
    }
}

module.exports = {
    fetchRoute
}