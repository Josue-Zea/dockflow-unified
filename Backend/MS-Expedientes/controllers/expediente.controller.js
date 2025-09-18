const { getExpedienteApi } = require("../utils/getExpedienteApi");
const { parsePdfData } = require("../utils/parsePdfData");
const stream = require('stream');
const { savePdfInDatabase } = require("../utils/saveDocumentDatabase");
const { deleteDocumennt } = require("../utils/deleteDocument");
const { getTipoExpedienteDB, getSubtipoExpedienteDB } = require("../utils/getTiposExpediente");

const getExpediente = async (req, res) => {
    const { numero_expediente, anio_expediente, watermark = false } = req.body;

    const result = await getExpedienteApi(numero_expediente, anio_expediente);
    if (result.correct) {
        try {
            let resultParse = null;
            if (result.fromRM) {
                resultParse = await parsePdfData(result.data, watermark);
                savePdfInDatabase(numero_expediente, anio_expediente, resultParse.data, 1, null, null)
            } else {
                resultParse = result;
            }
            
            if (resultParse.correct) {
                //const { esolicitud, num_tramite } = result.data;
                // const respuesta = {
                //     esolicitud: esolicitud,
                //     numero_tramite: num_tramite,
                //     numero_expediente,
                //     anio_expediente,
                // }
                const respuesta = {
                    empty: "false"
                }
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'inline; filename=expediente.pdf');
                res.setHeader('Respuesta-Info', JSON.stringify(respuesta));

                const bufferStream = new stream.PassThrough();
                bufferStream.end(Buffer.from(resultParse.data, 'base64'));
                bufferStream.pipe(res);
                res.status(200);
                return;
            }
        } catch (err) {
            res.status(501).send("Error en generacion de pdf");
            console.log(err);
            console.log("Error en generacion de pdf"); return;
        }
    }
    res.status(400).send({ message : "Ocurrio algún error" });
};

const createExpediente = async (req, res) => {
    const { numero_expediente, anio_expediente, numerotramite = 1, iddocumento, idusuario, idtipodocumento, hojasdocumento, pesodocumento, idtipo, idsubtipo, idestado, idcaja, document } = req.body;

    const result = await savePdfInDatabase(numero_expediente, anio_expediente, document, numerotramite, idtipo, idsubtipo);
    if (result.correct) {
        res.status(200).send({ message : "Expediente creado correctamente" });
    } else {
        res.status(400).send({ message : "Ocurrio algún error" });
    }
};

const deleteExpediente = async (req, res) => {
    const { numero, anio, numerotramite, iddocumento } = req.body;

    const result = await deleteDocumennt(numero, anio, numerotramite, iddocumento);
    if (result.correct) {
        res.status(200).send({ message : "Expediente eliminado correctamente" });
    } else {
        res.status(400).send({ message : "Ocurrio algún error" });
    }
};

const getTipoExpediente = async (req, res) => {
    const result = await getTipoExpedienteDB();
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

const getSubTipoExpediente = async (req, res) => {
    const result = await getSubtipoExpedienteDB();
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

module.exports = {
    getExpediente,
    createExpediente,
    deleteExpediente,
    getTipoExpediente,
    getSubTipoExpediente
};