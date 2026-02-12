const { eliminarSubDocumentoDatabase } = require("../utils/eliminarSubDocumentoDatabase");
const { obtenerSubDocumentoPdfDatabase } = require("../utils/obtenerSubDocumentoPdfDatabase");
const { obtenerSubDocumentosTramiteDatabase } = require("../utils/obtenerSubDocumentosTramiteDatabase");
const { obtenerSubDocumentosTypeDatabase } = require("../utils/obtenerSubDocumentosTypeDatabase");
const { saveSubDocumentInDatabase, updateSubDocumentoFilePath } = require("../utils/saveSubDocumentoDatabase");
const { saveDocumentInServer } = require("../utils/filesService");
const { asyncHandler } = require("../helpers/responseHandler");
const logger = require('../helpers/logger');

const createSubDocumento = asyncHandler(async (req, res) => {
    const {
        idtramitepadre,
        pdfbase64,
        nombre,
        fecha,
        tiposubdocumento,
        saveInServer = false,
        nombrePdf = null,
        nombretiposubdocumento
    } = req.body;

    const result = await saveSubDocumentInDatabase(idtramitepadre, pdfbase64, nombre, fecha, tiposubdocumento);

    if (!result.correct) {
        return res.status(400).json({
            success: false,
            message: "Error al crear el subdocumento",
            error: result.error
        });
    }

    let filePath = null;

    if (saveInServer) {
        try {
            // Si envían nombrePdf se usa tal cual (con su extensión), si no, {id}.pdf
            const documentName = nombrePdf || `${result.id}.pdf`;
            const documentType = nombretiposubdocumento || tiposubdocumento;

            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({
                    success: false,
                    message: "Token de autorización no proporcionado",
                });
            }
            const token = authHeader.split(' ')[1];
            const serverResponse = await saveDocumentInServer({
                documentName,
                documentType,
                pdfBase64: pdfbase64,
                token,
            });

            filePath = serverResponse.absolutePath || serverResponse.path || null;

            // Actualizar el filepath en la BD
            await updateSubDocumentoFilePath(result.id, filePath);
        } catch (error) {
            logger.logError(error, { context: 'createSubDocumento', action: 'guardar en servidor' });
            return res.status(500).json({
                success: false,
                message: "Subdocumento almacenado en BD pero ocurrió un error al guardar el archivo en el servidor",
                data: { id: result.id, iddocumento: result.iddocumento },
                error: error.details || error.message,
            });
        }
    }

    return res.status(201).json({
        success: true,
        message: "Subdocumento creado correctamente",
        data: {
            id: result.id,
            iddocumento: result.iddocumento,
            filePath,
        }
    });
});

const obtenerSubDocumentosTramite = asyncHandler(async (req, res) => {
    const { idTramite } = req.query;
    const result = await obtenerSubDocumentosTramiteDatabase(idTramite);

    if (result.correct) {
        res.status(200).json({
            success: true,
            message: "Subdocumentos obtenidos correctamente",
            data: result.data
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Error al obtener los subdocumentos del trámite",
            error: result.error
        });
    }
});

const getSubDocumentosType = asyncHandler(async (req, res) => {
    const result = await obtenerSubDocumentosTypeDatabase();

    if (result.correct) {
        res.status(200).json({
            success: true,
            data: result.data
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Error al obtener los tipos de subdocumento",
            error: result.error
        });
    }
});

const getSubDocumentoPdf = asyncHandler(async (req, res) => {
    const { idsubdocumento, idSubDocumento } = req.query;
    const result = await obtenerSubDocumentoPdfDatabase(idsubdocumento || idSubDocumento);

    if (result.correct) {
        res.status(200).json({
            success: true,
            message: "PDF obtenido correctamente",
            data: result.data
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Error al obtener el PDF del subdocumento",
            error: result.error
        });
    }
});

const deleteSubDocumento = asyncHandler(async (req, res) => {
    const { idSubDocumento, idDocumento } = req.query;
    const result = await eliminarSubDocumentoDatabase(idSubDocumento, idDocumento);

    if (result.correct) {
        res.status(200).json({
            success: true,
            message: "Subdocumento eliminado correctamente"
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Error al eliminar el subdocumento",
            error: result.error
        });
    }
});

module.exports = {
    createSubDocumento,
    obtenerSubDocumentosTramite,
    getSubDocumentosType,
    getSubDocumentoPdf,
    deleteSubDocumento
};
