const { eliminarSubDocumentoDatabase } = require("../utils/eliminarSubDocumentoDatabase");
const { obtenerSubDocumentoPdfDatabase } = require("../utils/obtenerSubDocumentoPdfDatabase");
const { obtenerSubDocumentosTramiteDatabase } = require("../utils/obtenerSubDocumentosTramiteDatabase");
const { obtenerSubDocumentosTypeDatabase } = require("../utils/obtenerSubDocumentosTypeDatabase");
const { saveSubDocumentInDatabase } = require("../utils/saveSubDocumentoDatabase");
const { saveDocumentInServer } = require("../utils/filesService");

const createSubDocumento = async (req, res) => {
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

            return res.status(200).send({
                message: "Subdocumento creado correctamente",
                id: result.id,
                filePath: serverResponse.absolutePath || serverResponse.path || null,
            });
        } catch (error) {
            console.error("Error al guardar el subdocumento en el servidor de archivos:", error);
            return res.status(500).send({
                message: "Subdocumento almacenado pero ocurrió un error al guardar el archivo en el servidor",
                id: result.id,
                error: error.details || error.message,
            });
        }
    } else {
        return res.status(400).send({ message: "Ocurrio algún error", error: result.error });
    }
};

const obtenerSubDocumentosTramite = async (req, res) => {
    const { idTramite } = req.params;

    const result = await obtenerSubDocumentosTramiteDatabase(idTramite);
    if (result.correct) {
        res.status(200).send({ message: "Subdocumentos obtenidos correctamente", data: result.data });
    } else {
        res.status(400).send({ message: "Ocurrio algún error", error: result.error });
    }
};

const getSubDocumentosType = async (req, res) => {
    let code = 0, data = { message: "" };
    const result = await obtenerSubDocumentosTypeDatabase();
    if (result.correct) {
        code = 200; data = result.data;
    } else {
        code = 400; data = { message: "Ocurrió algún error" };
    }
    res.status(code).send(data);
};

const getSubDocumentoPdf = async (req, res) => {
    const idSubDocumento = req.params.idSubDocumento;
    const result = await obtenerSubDocumentoPdfDatabase(idSubDocumento);
    if (result.correct) {
        res.status(200).send({ message: "PDF obtenido correctamente", data: result.data });
    } else {
        res.status(400).send({ message: "Ocurrio algún error", error: result.error });
    }
};

const deleteSubDocumento = async (req, res) => {
    const idSubDocumento = req.params.idSubDocumento;
    const idDocumento = req.body.idDocumento;
    const result = await eliminarSubDocumentoDatabase(idSubDocumento, idDocumento);
    if (result.correct) {
        res.status(200).send({ message: "Subdocumento eliminado correctamente" });
    } else {
        res.status(400).send({ message: "Ocurrio algún error", error: result.error });
    }
}

module.exports = {
    createSubDocumento,
    obtenerSubDocumentosTramite,
    getSubDocumentosType,
    getSubDocumentoPdf,
    deleteSubDocumento
};