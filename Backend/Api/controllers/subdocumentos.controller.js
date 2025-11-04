const { eliminarSubDocumentoDatabase } = require("../utils/eliminarSubDocumentoDatabase");
const { obtenerSubDocumentoPdfDatabase } = require("../utils/obtenerSubDocumentoPdfDatabase");
const { obtenerSubDocumentosTramiteDatabase } = require("../utils/obtenerSubDocumentosTramiteDatabase");
const { obtenerSubDocumentosTypeDatabase } = require("../utils/obtenerSubDocumentosTypeDatabase");
const { saveSubDocumentInDatabase } = require("../utils/saveSubDocumentoDatabase");
const { saveDocumentInServer } = require("../utils/filesService");
const { asyncHandler } = require("../helpers/responseHandler");

const createSubDocumento = asyncHandler(async (req, res) => {
    const { idtramitepadre, pdfbase64, nombre, fecha, tiposubdocumento, nombretiposubdocumento } = req.body;
    
    const result = await saveSubDocumentInDatabase(idtramitepadre, pdfbase64, nombre, fecha, tiposubdocumento, nombretiposubdocumento);
    
    if (result.correct) {
        const documentTypeForServer = nombretiposubdocumento || tiposubdocumento;
        try {
            const serverResponse = await saveDocumentInServer({
                documentName: result.id,
                documentType: documentTypeForServer,
                pdfBase64: pdfbase64,
            });

            return res.status(200).json({
                success: true,
                message: "Subdocumento creado correctamente",
                data: {
                    id: result.id,
                    filePath: serverResponse.absolutePath || serverResponse.path || null,
                }
            });
        } catch (error) {
            console.error("Error al guardar el subdocumento en el servidor de archivos:", error);
            return res.status(500).json({
                success: false,
                message: "Subdocumento almacenado pero ocurrió un error al guardar el archivo en el servidor",
                data: { id: result.id },
                error: error.details || error.message,
            });
        }
    } else {
        return res.status(400).json({
            success: false,
            message: "Error al crear el subdocumento",
            error: result.error
        });
    }
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
    const { idsubdocumento } = req.query;
    const result = await obtenerSubDocumentoPdfDatabase(idsubdocumento);
    
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