const { SERVER_CONFIG } = require("../config/config");
const stream = require('stream');
const { saveLog } = require('../utils/saveLog');

const getExpediente = async (req, res) => {
    let code = 200, data = {};
    const opciones = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
    };
    const response = await fetch(
        `${SERVER_CONFIG.MS_EXPEDIENTES}/expedientes/getExpediente`,
        opciones
    );
    try {
        if (response.ok) { //Algun error
            const respuestaInfoHeader = response.headers.get('Respuesta-Info');
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename=archivo.pdf');
            res.setHeader("Access-Control-Expose-Headers", 'Respuesta-Info');
            res.setHeader('Respuesta-Info', respuestaInfoHeader);
    
            const bufferStream = new stream.PassThrough();
            bufferStream.end(Buffer.from(await response.arrayBuffer()));
            bufferStream.pipe(res);
            res.status(200);
            delete req.body.watermark;
            saveLog(false, "CONSULTA", req.body, req);
            return;
        } else {
            code = 400;
        }
    } catch (err) {
        code = 500;
        data = { err, message: "Error en MS-API, expedientes" };
    }
    res.status(code).send(data);
};

const createExpediente = async (req, res) => {
    const opciones = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
    };
    const response = await fetch(
        `${SERVER_CONFIG.MS_EXPEDIENTES}/expedientes/createExpediente`,
        opciones
    );
    res.status(response.status).send(response.data);
};

const deleteExpediente = async (req, res) => {
    const opciones = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
    };
    const response = await fetch(
        `${SERVER_CONFIG.MS_EXPEDIENTES}/expedientes/deleteExpediente`,
        opciones
    );
    res.status(response.status).send(response.data);
};

const getTipoExpediente = async (req, res) => {
    const opciones = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await fetch(
        `${SERVER_CONFIG.MS_EXPEDIENTES}/expedientes/getTipoExpediente`,
        opciones
    );
    const data = await response.json();
    res.status(response.status).send(data.data);
};

const getSubTipoExpediente = async (req, res) => {
    const opciones = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await fetch(
        `${SERVER_CONFIG.MS_EXPEDIENTES}/expedientes/getSubTipoExpediente`,
        opciones
    );
    const data = await response.json();
    res.status(response.status).send(data.data);
};

module.exports = {
    getExpediente,
    createExpediente,
    deleteExpediente,
    getTipoExpediente,
    getSubTipoExpediente
};