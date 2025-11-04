const { SERVER_CONFIG } = require("../config/config");
const stream = require('stream');
const { saveLog } = require('../utils/saveLog');
const { savePdfInDatabase } = require("../utils/saveDocumentDatabase");
const { lookInDatabase } = require("../utils/getExpedienteApi");
const { deleteDocument } = require("../utils/deleteDocument");
const { getTiposExpedienteDB, getSubtiposExpedienteDB } = require("../utils/getTiposExpediente");

const getExpediente = async (req, res) => {
    const { numero_expediente, anio_expediente } = req.query;

    if (!numero_expediente || !anio_expediente) {
        return res.status(400).send({ 
            message: "Los parámetros numero_expediente y anio_expediente son requeridos" 
        });
    }

    const result = await lookInDatabase(numero_expediente, anio_expediente);
    if (result.correct) {
        try {
            const respuesta = {
                empty: "false"
            }
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename=expediente.pdf');
            res.setHeader('Respuesta-Info', JSON.stringify(respuesta));

            const bufferStream = new stream.PassThrough();
            bufferStream.end(Buffer.from(result.data, 'base64'));
            bufferStream.pipe(res);
            res.status(200);
            return;
        } catch (err) {
            res.status(501).send("Error en generacion de pdf");
            console.log(err);
            console.log("Error en generacion de pdf"); return;
        }
    }
    res.status(400).send({ message: "Ocurrio algún error" });
};

const createExpediente = async (req, res) => {
    const { numero_expediente, anio_expediente, numerotramite = 1, iddocumento, idusuario, idtipodocumento, hojasdocumento, pesodocumento, idtipo, idsubtipo, idestado, idcaja, document } = req.body;

    const result = await savePdfInDatabase(numero_expediente, anio_expediente, document, numerotramite, idtipo, idsubtipo);
    if (result.correct) {
        res.status(200).send({ message: "Expediente creado correctamente", iddocumento: result.id });
    } else {
        res.status(400).send({ message: "Ocurrio algún error" });
    }
};

const deleteExpediente = async (req, res) => {
    const { numero_expediente, anio_expediente, iddocumento } = req.query;

    if (!numero_expediente || !anio_expediente || !iddocumento) {
        return res.status(400).send({ 
            message: "Los parámetros numero_expediente, anio_expediente e iddocumento son requeridos" 
        });
    }

    const result = await deleteDocument(numero_expediente, anio_expediente, 1, iddocumento);
    if (result.correct) {
        res.status(200).send({ message: "Expediente eliminado correctamente" });
    } else {
        res.status(400).send({ message: "Ocurrio algún error" });
    }
};

const getTiposExpediente = async (_, res) => {
    const result = await getTiposExpedienteDB();
    if (result.correct) {
        try {
            res.status(200);
            res.send(result);
            return;
        } catch (err) {
            res.status(501).send("Error en getTipoExpediente");
            console.log(err);
        }
    }
    res.status(400).send("Ocurrio algún error");
};

const getSubTiposExpediente = async (req, res) => {
    const result = await getSubtiposExpedienteDB();
    if (result.correct) {
        try {
            res.status(200);
            res.send(result);
            return;
        } catch (err) {
            res.status(501).send("Error en getTipoExpediente");
            console.log(err);
        }
    }
    res.status(400).send("Ocurrio algún error");
};

const getExpedientesSinCaja = async (req, res) => {
    let code = 0, data = { message: "" };
    try {
        const result = await getExpedientesSinCajaDatabase(idEstante, idCaja);
        if (result.correct) {
            code = 200; data = result.data;
        } else {
            code = 400; data = { message: "Ocurrió algún error" };
        }
    } catch (err) {
        console.log(err);
        code = 500; data = { message: "Ocurrió algún error" };
    }
    res.status(code).send(data);
};

module.exports = {
    getExpediente,
    createExpediente,
    deleteExpediente,
    getTiposExpediente,
    getSubTiposExpediente
};