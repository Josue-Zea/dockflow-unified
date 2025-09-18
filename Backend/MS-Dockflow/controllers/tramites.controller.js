const { obtenerTramitesDeExpedienteDatabase } = require("../utils/getTramitesExpediente");
const { obtenerTramitesTypeDatabase } = require("../utils/obtenerTramitesTypeDatabase");
const { saveTramiteInDatabase } = require("../utils/saveTramiteInDatabase");

const createTramite = async (req, res) => {
    const { iddocumento, pdfbase64, nombre, fecha, tipotramite } = req.body;

    const result = await saveTramiteInDatabase(iddocumento, pdfbase64, nombre, fecha, tipotramite);
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

module.exports = {
    createTramite,
    obtenerTramitesDeExpediente,
    getTramitesType
};