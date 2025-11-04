const { eliminarTramiteDatabase } = require("../utils/eliminarTramiteDatabase");
const { obtenerTramitesDeExpedienteDatabase } = require("../utils/getTramitesExpediente");
const { obtenerTramitePdfDatabase } = require("../utils/obtenerTramitePdfDatabase");
const { obtenerTramitesTypeDatabase } = require("../utils/obtenerTramitesTypeDatabase");
const { saveTramiteInDatabase } = require("../utils/saveTramiteInDatabase");
const { asyncHandler, handleDatabaseResult } = require("../helpers/responseHandler");

const createTramite = asyncHandler(async (req, res) => {
    const { iddocumentoexpediente, pdfbase64, nombre, fecha, tipotramite } = req.body;
    const result = await saveTramiteInDatabase(iddocumentoexpediente, pdfbase64, nombre, fecha, tipotramite);
    
    if (result.correct) {
        res.status(200).json({
            success: true,
            message: "Trámite creado correctamente",
            id_tramite: result.id
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Error al crear el trámite",
            error: result.error
        });
    }
});

const obtenerTramitesDeExpediente = asyncHandler(async (req, res) => {
    const { iddocumentoexpediente } = req.query;
    const result = await obtenerTramitesDeExpedienteDatabase(iddocumentoexpediente);
    handleDatabaseResult(res, result, {
        success: 'Trámites obtenidos correctamente',
        error: 'Error al obtener los trámites del expediente'
    });
});

const getTramitesType = asyncHandler(async (req, res) => {
    const result = await obtenerTramitesTypeDatabase();
    handleDatabaseResult(res, result, {
        success: 'Tipos de trámite obtenidos correctamente',
        error: 'Error al obtener los tipos de trámite'
    });
});

const getTramitePdf = asyncHandler(async (req, res) => {
    const { idDocumento } = req.query;
    const result = await obtenerTramitePdfDatabase(idDocumento);
    
    if (result.correct) {
        res.status(200).json({
            success: true,
            message: "PDF obtenido correctamente",
            data: result.data
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Error al obtener el PDF del trámite",
            error: result.error
        });
    }
});

const deleteTramite = asyncHandler(async (req, res) => {
    const { idTramite, idDocumento } = req.params;
    const result = await eliminarTramiteDatabase(idTramite, idDocumento);
    handleDatabaseResult(res, result, {
        success: 'Trámite eliminado correctamente',
        error: 'Error al eliminar el trámite'
    });
});

module.exports = {
    createTramite,
    obtenerTramitesDeExpediente,
    getTramitesType,
    getTramitePdf,
    deleteTramite
};