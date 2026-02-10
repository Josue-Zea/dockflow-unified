const { saveDocumentInServer } = require("../utils/filesService");
const { asyncHandler } = require("../helpers/responseHandler");
const logger = require('../helpers/logger');
const { saveFileDatabase } = require("../utils/saveFileDatabase");
const { getDocumentFromDB } = require("../utils/getDocumentFromDB");

const cargarArchivo = asyncHandler(async (req, res) => {
    const {
        iddocumento,
        nombre,
        guardarservidor = false,
        tipotramite,
        pdfbase64,
    } = req.body;

    const result = await saveFileDatabase(iddocumento, nombre, guardarservidor, tipotramite, pdfbase64);

    if (result.correct) {
        let serverResponse = {};
        try {
            if (guardarservidor) {
                const token = req.headers.authorization.split(' ')[1];
                serverResponse = await saveDocumentInServer({
                    documentName: result.id,
                    documentType: tipotramite,
                    pdfBase64: pdfbase64,
                    token,
                });
            }
        } catch (error) {
            logger.logError(error, { context: 'cargarArchivo', action: 'guardar en servidor' });
            return res.status(500).json({
                success: false,
                message: "Archivo almacenado en base de datos pero ocurrió un error al guardar el archivo en el servidor",
                data: { id: result.id },
                error: error.details || error.message,
            });
        }
        return res.status(200).json({
            success: true,
            message: "Archivo cargado correctamente",
            data: {
                id: result.id,
                filePath: serverResponse.absolutePath || serverResponse.path || null,
            }
        });
    } else {
        return res.status(400).json({
            success: false,
            message: "Error al crear el subdocumento",
            error: result.error
        });
    }
});

const getDocumentoCargado = asyncHandler(async (req, res) => {
    const { idDocumento } = req.query;
    const result = await getDocumentFromDB(idDocumento);

    if (result !== "") {
        res.status(200).json({
            success: true,
            message: "Documento obtenido correctamente",
            data: result
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Error al obtener el documento",
            error: result.error
        });
    }
});

module.exports = {
    cargarArchivo,
    getDocumentoCargado
};