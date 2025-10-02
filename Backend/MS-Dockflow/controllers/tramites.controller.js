const { eliminarTramiteDatabase } = require("../utils/eliminarTramiteDatabase");
const { obtenerTramitesDeExpedienteDatabase } = require("../utils/getTramitesExpediente");
const { obtenerTramitePdfDatabase } = require("../utils/obtenerTramitePdfDatabase");
const { obtenerTramitesTypeDatabase } = require("../utils/obtenerTramitesTypeDatabase");
const { saveTramiteInDatabase } = require("../utils/saveTramiteInDatabase");

const createTramite = async (req, res) => {
    const { iddocumentoPadre, pdfbase64, nombre, fecha, tipotramite } = req.body;

    const result = await saveTramiteInDatabase(iddocumentoPadre, pdfbase64, nombre, fecha, tipotramite);
    if (result.correct) {
        res.status(200).send({ message: "Tramite creado correctamente" });
    } else {
        res.status(400).send({ message: "Ocurrio algún error" });
    }
};

const obtenerTramitesDeExpediente = async (req, res) => {
    const { iddocumento } = req.body;

    const result = await obtenerTramitesDeExpedienteDatabase(iddocumento);
    if (result.correct) {
        res.status(200).send({ message: "Tramite creado correctamente" });
    } else {
        res.status(400).send({ message: "Ocurrio algún error" });
    }
};

const getTramitesType = async (req, res) => {
    let code = 0, data = { message: "" };
    const result = await obtenerTramitesTypeDatabase();
    if (result.correct) {
        code = 200; data = result.data;
    } else {
        code = 400; data = { message: "Ocurrió algún error" };
    }
    res.status(code).send(data);
};

const getTramitePdf = async (req, res) => {
    const idDocumento = req.params.idDocumento;
    const result = await obtenerTramitePdfDatabase(idDocumento);
    if (result.correct) {
        res.status(200).send({ message: "PDF obtenido correctamente", data: result.data });
    } else {
        res.status(400).send({ message: "Ocurrio algún error" });
    }
};

const deleteTramite = async (req, res) => {
    const idTramite = req.params.idTramite;
    const idDocumento = req.params.idDocumento;
    const result = await eliminarTramiteDatabase(idTramite, idDocumento);
    if (result.correct) {
        res.status(200).send({ message: "Trámite eliminado correctamente" });
    } else {
        res.status(400).send({ message: "Ocurrio algún error" });
    }
}

module.exports = {
    createTramite,
    obtenerTramitesDeExpediente,
    getTramitesType,
    getTramitePdf,
    deleteTramite
};