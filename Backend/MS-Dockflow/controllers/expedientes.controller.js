const { getInfoExpedienteDatabase } = require("../utils/getInfoExpedienteDatabase");
const { getTramitesDocumentosExpedienteDatabase } = require("../utils/getTramitesDocumentosExpedienteDatabase");
const { getTramitesExpedienteDatabase } = require("../utils/getTramitesExpedienteDatabase");

const getInfoExpediente = async (req, res) => {
    const numero = req.params.numero;
    const anio = req.params.anio;

    let code = 0, data = { message: "" };
    try {
        const result = await getInfoExpedienteDatabase(numero, anio);
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

const getTramitesExpediente = async (req, res) => {
    const idDocumento = req.params.idDocumento;

    let code = 0, data = { message: "" };
    try {
        const result = await getTramitesExpedienteDatabase(idDocumento);
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

const getTramitesDocumentosExpediente = async (req, res) => {
    const idDocumento = req.params.idDocumento;

    let code = 0, data = { message: "" };
    try {
        const result = await getTramitesDocumentosExpedienteDatabase(idDocumento);
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
    getInfoExpediente,
    getTramitesExpediente,
    getTramitesDocumentosExpediente
};