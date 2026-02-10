const { createCajaDatabase } = require("../utils/createCajaDatabase");
const { deleteCajaDatabase } = require("../utils/deleteCajaDatabase");
const { getCajasDatabase } = require("../utils/getCajasDatabase");
const { getCajasSinEstanteDatabase } = require("../utils/getCajasSinEstanteDatabase");
const { updateCajaDatabase } = require("../utils/updateCajaDatabase");
const { getExpedientesFromSpecificBox, getExpedientesDatabase, getAllExpedientesDatabase } = require("../utils/getExpedientesDatabase");
const { getExpedienteMetadata, getExpedienteMetadataFile } = require("../utils/getExpedienteMetadata");
const { addExpedienteCajaDB } = require("../utils/addExpedienteCajaDB");
const { removeExpedienteCajaDB } = require("../utils/removeExpedienteCajaDB");
const { changeFullBoxStatusDatabase } = require("../utils/changeFullBoxStatusDatabase");
const { asyncHandler, handleDatabaseResult } = require("../helpers/responseHandler");

const getCajas = asyncHandler(async (req, res) => {
    const { idCaja } = req.query;
    const result = await getCajasDatabase(idCaja);
    handleDatabaseResult(res, result, {
        success: 'Cajas obtenidas correctamente',
        error: 'Error al obtener las cajas'
    });
});

const getCajasSinEstante = asyncHandler(async (req, res) => {
    const result = await getCajasSinEstanteDatabase();
    handleDatabaseResult(res, result, {
        success: 'Cajas sin estante obtenidas correctamente',
        error: 'Error al obtener cajas sin estante'
    });
});

const getExpedientesFromCaja = asyncHandler(async (req, res) => {
    const { idCaja } = req.query;
    const result = await getExpedientesFromSpecificBox(idCaja);
    handleDatabaseResult(res, result, {
        success: 'Expedientes de la caja obtenidos correctamente',
        error: 'Error al obtener expedientes de la caja'
    });
});

const createCaja = asyncHandler(async (req, res) => {
    const { nombre, idestante } = req.body;
    const result = await createCajaDatabase(nombre, idestante);
    handleDatabaseResult(res, result, {
        success: 'Caja creada correctamente',
        error: 'Error al crear la caja'
    });
});

const updateCaja = asyncHandler(async (req, res) => {
    const { idEstante, nombre } = req.body;
    const { idCaja } = req.query;
    const result = await updateCajaDatabase(idCaja, idEstante, nombre);
    handleDatabaseResult(res, result, {
        success: 'Caja actualizada correctamente',
        error: 'Error al actualizar la caja'
    });
});

const changeFullBoxStatus = asyncHandler(async (req, res) => {
    const { idCaja, status } = req.query;
    const result = await changeFullBoxStatusDatabase(idCaja, status);
    handleDatabaseResult(res, result, {
        success: 'Estado de caja actualizado correctamente',
        error: 'Error al actualizar el estado de la caja'
    });
});

const deleteCaja = asyncHandler(async (req, res) => {
    const { idCaja } = req.query;
    const result = await deleteCajaDatabase(idCaja);
    handleDatabaseResult(res, result, {
        success: 'Caja eliminada correctamente',
        error: 'Error al eliminar la caja'
    });
});

const addExpedienteCaja = asyncHandler(async (req, res) => {
    const { idCaja, idDocumentoExpediente, idExpediente } = req.query;
    const result = await addExpedienteCajaDB(idCaja, idDocumentoExpediente || idExpediente);
    handleDatabaseResult(res, result, {
        success: 'Expediente agregado a la caja correctamente',
        error: 'Error al agregar expediente a la caja'
    });
});

const removeExpedienteCaja = asyncHandler(async (req, res) => {
    const { idDocumentoExpediente, idExpediente } = req.query;
    const result = await removeExpedienteCajaDB(idDocumentoExpediente || idExpediente);
    handleDatabaseResult(res, result, {
        success: 'Expediente removido de la caja correctamente',
        error: 'Error al remover expediente de la caja'
    });
});

const getExpedientes = asyncHandler(async (req, res) => {
    const { idEstante, idCaja } = req.query;
    const result = await getExpedientesDatabase(idEstante, idCaja);
    handleDatabaseResult(res, result, {
        success: 'Expedientes obtenidos correctamente',
        error: 'Error al obtener los expedientes'
    });
});

const getExpediente = asyncHandler(async (req, res) => {
    const { numero, anio } = req.query;
    const result = await getExpedienteMetadata(numero, anio);
    handleDatabaseResult(res, result, {
        success: 'Expediente obtenido correctamente',
        error: 'Error al obtener el expediente'
    });
});

const getDocumento = asyncHandler(async (req, res) => {
    const { idDocumento } = req.query;
    const result = await getExpedienteMetadataFile(idDocumento);
    handleDatabaseResult(res, result, {
        success: 'Documento obtenido correctamente',
        error: 'Error al obtener el documento'
    });
});

const getAllExpedientes = asyncHandler(async (req, res) => {
    const result = await getAllExpedientesDatabase();
    handleDatabaseResult(res, result, {
        success: 'Expedientes obtenidos correctamente',
        error: 'Error al obtener los expedientes'
    });
});

module.exports = {
    getCajas,
    getCajasSinEstante,
    createCaja,
    updateCaja,
    deleteCaja,
    addExpedienteCaja,
    removeExpedienteCaja,
    getExpedientesFromCaja,
    changeFullBoxStatus,
    getExpedientes,
    getExpediente,
    getDocumento,
    getAllExpedientes
};