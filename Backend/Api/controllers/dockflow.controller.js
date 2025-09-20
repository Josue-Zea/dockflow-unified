const { SERVER_CONFIG } = require('../config/config');
const { fetchRoute } = require('../utils/consumeRoute');

const getEstantes = async (req, res) => {
    const result = await fetchRoute(
        'GET',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/getEstantes`
    );
    res.status(result.code).send(result.data);
};

const getEstantesNivel = async (req, res) => {
    const idNivel = req.params.idNivel;
    const result = await fetchRoute(
        'GET',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/getEstantesNivel/${idNivel}`
    );
    res.status(result.code).send(result.data);
};

const createEstante = async (req, res) => {
    const result = await fetchRoute(
        'POST',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/estante`
    );
    res.status(result.code).send(result.data);
};

const updateEstante = async (req, res) => {
    const idEstante = req.params.idEstante;
    const result = await fetchRoute(
        'PUT',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/estante/${idEstante}`
    );
    res.status(result.code).send(result.data);
};

const deleteEstante = async (req, res) => {
    const idEstante = req.params.idEstante;
    const result = await fetchRoute(
        'DELETE',
        null,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/estante/${idEstante}`
    );
    res.status(result.code).send(result.data);
};

const addCajaEstante = async (req, res) => {
    const idEstante = req.params.idEstante;
    const idCaja = req.params.idCaja;
    const result = await fetchRoute(
        'DELETE',
        null,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/estante/${idEstante}/${idCaja}`
    );
    res.status(result.code).send(result.data);
};

const removeCajaEstante = async (req, res) => {
    const idEstante = req.params.idEstante;
    const idCaja = req.params.idCaja;
    const result = await fetchRoute(
        'DELETE',
        null,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/estante/${idEstante}/${idCaja}`
    );
    res.status(result.code).send(result.data);
};

const getCajas = async (req, res) => {
    const idEstante = req.params.idEstante;
    const route = idEstante ? `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/getCajas/${idEstante}` : `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/getCajas`;
    const result = await fetchRoute(
        'GET',
        req.body,
        route
    );
    res.status(result.code).send(result.data);
};

const createCaja = async (req, res) => {
    const result = await fetchRoute(
        'POST',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/caja`
    );
    res.status(result.code).send(result.data);
};

const updateCaja = async (req, res) => {
    const idCaja = req.params.idCaja;
    const result = await fetchRoute(
        'PUT',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/caja/${idCaja}`
    );
    res.status(result.code).send(result.data);
};

const updateFullStatusBox = async (req, res) => {
    const idCaja = req.params.idCaja;
    const status = req.params.status;
    const result = await fetchRoute(
        'PUT',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/caja/${idCaja}/${status}`
    );
    res.status(result.code).send(result.data);
};

const deleteCaja = async (req, res) => {
    const idCaja = req.params.idCaja;
    const result = await fetchRoute(
        'DELETE',
        null,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/caja/${idCaja}`
    );
    res.status(result.code).send(result.data);
};

const getExpedientes = async (req, res) => {
    const idEstante = req.params.idEstante;
    const idCaja = req.params.idCaja;
    const result = await fetchRoute(
        'GET',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/getExpedientes/${idEstante}/${idCaja}`
    );
    res.status(result.code).send(result.data);
};

const getExpediente = async (req, res) => {
    const numero = req.params.numero;
    const anio = req.params.anio;
    const result = await fetchRoute(
        'GET',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/getExpediente/${numero}/${anio}`
    );
    res.status(result.code).send(result.data);
};

const getInfoExpediente = async (req, res) => {
    const numero = req.params.numero;
    const anio = req.params.anio;
    const result = await fetchRoute(
        'GET',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/getExpedienteType/${numero}/${anio}`
    );
    res.status(result.code).send(result.data);
};

const getTramitesExpediente = async (req, res) => {
    const idDocumento = req.params.idDocumento;
    const result = await fetchRoute(
        'GET',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/getTramitesExpediente/${idDocumento}`
    );
    res.status(result.code).send(result.data);
};

const getTramitesDocumentosExpediente = async (req, res) => {
    const idDocumento = req.params.idDocumento;
    const result = await fetchRoute(
        'GET',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/getTramitesDocumentosExpediente/${idDocumento}`
    );
    res.status(result.code).send(result.data);
};

const getTramitesType = async (req, res) => {
    const result = await fetchRoute(
        'GET',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/getTramitesType`
    );
    res.status(result.code).send(result.data);
};

const createTramite = async (req, res) => {
    const result = await fetchRoute(
        'POST',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/createTramite`
    );
    res.status(result.code).send(result.data);
}

const getDocumento = async (req, res) => {
    const idDocumento = req.params.idDocumento;
    const result = await fetchRoute(
        'GET',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/getDocumento/${idDocumento}`
    );
    res.status(result.code).send(result.data);
};

const getExpedientesFromCaja = async (req, res) => {
    const idCaja = req.params.idCaja;

    const result = await fetchRoute(
        'GET',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/getExpedientesFromBox/${idCaja}`
    );
    res.status(result.code).send(result.data);
};

const getAllExpedientes = async (req, res) => {
    const result = await fetchRoute(
        'GET',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/getExpedientes`
    );
    res.status(result.code).send(result.data);
};

const addExpedienteCaja = async (req, res) => {
    const idCaja = req.params.idCaja;
    const idExpediente = req.params.idExpediente;
    const result = await fetchRoute(
        'PUT',
        req.body,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/caja_expediente/${idCaja}/${idExpediente}`
    );
    res.status(result.code).send(result.data);
};

const removeExpedienteCaja = async (req, res) => {
    const idExpediente = req.params.idExpediente;
    const result = await fetchRoute(
        'DELETE',
        null,
        `${SERVER_CONFIG.MS_DOCKFLOW}/dockflow/caja/removeExpediente/${idExpediente}`
    );
    res.status(result.code).send(result.data);
};

module.exports = {
    getEstantes,
    getEstantesNivel,
    createEstante,
    updateEstante,
    deleteEstante,
    addCajaEstante,
    removeCajaEstante,
    createCaja,
    updateCaja,
    getDocumento,
    deleteCaja,
    getCajas,
    getExpedientes,
    getAllExpedientes,
    addExpedienteCaja,
    removeExpedienteCaja,
    getExpedientesFromCaja,
    getExpediente,
    updateFullStatusBox,
    getInfoExpediente,
    getTramitesExpediente,
    createTramite,
    getTramitesDocumentosExpediente,
    getTramitesType
};