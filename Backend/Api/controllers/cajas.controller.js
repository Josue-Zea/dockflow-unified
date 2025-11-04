const { createCajaDatabase } = require("../utils/createCajaDatabase");
const { deleteCajaDatabase } = require("../utils/deleteCajaDatabase");
const { getCajasDatabase } = require("../utils/getCajasDatabase");
const { getCajasSinEstanteDatabase } = require("../utils/getCajasSinEstanteDatabase");
const { updateCajaDatabase } = require("../utils/updateCajaDatabase");
const { getExpedientesFromSpecificBox } = require("../utils/getExpedientesDatabase");
const { addExpedienteCajaDB } = require("../utils/addExpedienteCajaDB");
const { removeExpedienteCajaDB } = require("../utils/removeExpedienteCajaDB");
const { changeFullBoxStatusDatabase } = require("../utils/changeFullBoxStatusDatabase");
const { asyncHandler, handleDatabaseResult } = require("../helpers/responseHandler");

const getCajas = asyncHandler(async (req, res) => {
    const { idEstante } = req.query;
    const result = await getCajasDatabase(idEstante);
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
    const { idCaja, idDocumentoExpediente } = req.query;
    const result = await addExpedienteCajaDB(idCaja, idDocumentoExpediente);
    handleDatabaseResult(res, result, {
        success: 'Expediente agregado a la caja correctamente',
        error: 'Error al agregar expediente a la caja'
    });
});

const removeExpedienteCaja = asyncHandler(async (req, res) => {
    const { idDocumentoExpediente } = req.query;
    const result = await removeExpedienteCajaDB(idDocumentoExpediente);
    handleDatabaseResult(res, result, {
        success: 'Expediente removido de la caja correctamente',
        error: 'Error al remover expediente de la caja'
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
    changeFullBoxStatus
};