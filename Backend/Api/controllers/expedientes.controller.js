const stream = require('stream');
const { savePdfInDatabase } = require("../utils/saveDocumentDatabase");
const { lookInDatabase } = require("../utils/getExpedienteApi");
const { deleteDocument } = require("../utils/deleteDocument");
const { getExpedienteDB } = require("../utils/getExpedienteDB");
const { getTiposExpedienteDB, getSubtiposExpedienteDB } = require("../utils/getTiposExpediente");
const { getInfoExpedienteDatabase } = require("../utils/getInfoExpedienteDatabase");
const { getTramitesExpedienteDatabase } = require("../utils/getTramitesExpedienteDatabase");
const { getTramitesDocumentosExpedienteDatabase } = require("../utils/getTramitesDocumentosExpedienteDatabase");
const { asyncHandler, handleDatabaseResult } = require("../helpers/responseHandler");
const { getExpedientesSinCajaDatabase } = require("../utils/getExpedientesSinCajaDatabase");
const logger = require('../helpers/logger');

const getExpediente = asyncHandler(async (req, res) => {
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
            logger.logError(err, { context: 'getExpediente', action: 'generacion de pdf' });
            res.status(501).send("Error en generacion de pdf");
            return;
        }
    }
    if (result.notFound) {
        return res.status(404).json({
            success: false,
            message: `No se encontró un expediente con número ${numero_expediente} y año ${anio_expediente}`
        });
    }
    res.status(500).json({ success: false, message: "Ocurrió un error al buscar el expediente" });
});

const createExpediente = asyncHandler(async (req, res) => {
    const { numero_expediente, anio_expediente, numerotramite = 1, iddocumento, idusuario, idtipodocumento, hojasdocumento, pesodocumento, idtipo, idsubtipo, idestado, idcaja, document } = req.body;

    const result = await savePdfInDatabase(numero_expediente, anio_expediente, document, numerotramite, idtipo, idsubtipo);
    if (result.alreadyExists) {
        return res.status(409).json({
            success: false,
            message: `Ya existe un expediente con número ${numero_expediente} y año ${anio_expediente}`
        });
    }
    if (result.correct) {
        res.status(201).json({ success: true, message: "Expediente creado correctamente", iddocumento: result.id });
    } else {
        res.status(500).json({ success: false, message: "Ocurrió un error al crear el expediente" });
    }
});

const deleteExpediente = asyncHandler(async (req, res) => {
    const { numero_expediente, anio_expediente, iddocumento } = req.query;

    if (!numero_expediente || !anio_expediente || !iddocumento) {
        return res.status(400).send({
            message: "Los parámetros numero_expediente, anio_expediente e iddocumento son requeridos"
        });
    }

    // Verificar que el expediente existe antes de intentar eliminarlo
    const exists = await getExpedienteDB(numero_expediente, anio_expediente);
    if (exists.notFound) {
        return res.status(404).json({
            success: false,
            message: `No se encontró un expediente con número ${numero_expediente} y año ${anio_expediente}`
        });
    }

    const result = await deleteDocument(numero_expediente, anio_expediente, 1, iddocumento);
    if (result.correct) {
        res.status(200).json({ success: true, message: "Expediente eliminado correctamente" });
    } else {
        res.status(500).json({ success: false, message: "Ocurrió un error al eliminar el expediente" });
    }
});

const getTiposExpediente = asyncHandler(async (_, res) => {
    const result = await getTiposExpedienteDB();
    handleDatabaseResult(res, result, {
        success: 'Tipos de expediente obtenidos correctamente',
        error: 'Error al obtener los tipos de expediente'
    });
});

const getSubTiposExpediente = asyncHandler(async (_, res) => {
    const result = await getSubtiposExpedienteDB();
    handleDatabaseResult(res, result, {
        success: 'Subtipos de expediente obtenidos correctamente',
        error: 'Error al obtener los subtipos de expediente'
    });
});

const getExpedientesSinCaja = asyncHandler(async (req, res) => {
    const { idEstante, idCaja } = req.params;
    const result = await getExpedientesSinCajaDatabase(idEstante, idCaja);
    handleDatabaseResult(res, result, {
        success: 'Expedientes sin caja obtenidos correctamente',
        error: 'Error al obtener los expedientes sin caja'
    });
});

const getInfoExpediente = asyncHandler(async (req, res) => {
    const { numero_expediente, anio_expediente } = req.query;
    const result = await getInfoExpedienteDatabase(numero_expediente, anio_expediente);
    handleDatabaseResult(res, result, {
        success: 'Información del expediente obtenida correctamente',
        error: 'Error al obtener información del expediente'
    });
});

const getTramitesExpediente = asyncHandler(async (req, res) => {
    const { idDocumento } = req.query;
    const result = await getTramitesExpedienteDatabase(idDocumento);
    handleDatabaseResult(res, result, {
        success: 'Trámites del expediente obtenidos correctamente',
        error: 'Error al obtener los trámites del expediente'
    });
});

const getTramitesDocumentosExpediente = asyncHandler(async (req, res) => {
    const { idDocumento } = req.query;
    const result = await getTramitesDocumentosExpedienteDatabase(idDocumento);
    handleDatabaseResult(res, result, {
        success: 'Trámites con documentos obtenidos correctamente',
        error: 'Error al obtener los trámites con documentos'
    });
});

module.exports = {
    getExpediente,
    createExpediente,
    deleteExpediente,
    getTiposExpediente,
    getSubTiposExpediente,
    getInfoExpediente,
    getTramitesExpediente,
    getTramitesDocumentosExpediente
};
