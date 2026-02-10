const { createEstanteDatabase } = require("../utils/createEstanteDatabase");
const { deleteEstanteDatabase } = require("../utils/deleteEstanteDatabase");
const { getEstantesNivelDatabase } = require("../utils/getEstantesNivelDatabase");
const { updateEstanteDatabase } = require("../utils/updateEstanteDatabase");
const { getEstantesDatabase } = require("../utils/getEstantesDatabase");
const { asyncHandler, handleDatabaseResult } = require("../helpers/responseHandler");

const getEstantes = asyncHandler(async (req, res) => {
    const result = await getEstantesDatabase();
    handleDatabaseResult(res, result, {
        success: 'Estantes obtenidos correctamente',
        error: 'Error al obtener los estantes'
    });
});

const getEstantesNivel = asyncHandler(async (req, res) => {
    const { idNivel } = req.query;
    const result = await getEstantesNivelDatabase(idNivel);
    handleDatabaseResult(res, result, {
        success: 'Estantes del nivel obtenidos correctamente',
        error: 'Error al obtener estantes del nivel'
    });
});

const createEstante = asyncHandler(async (req, res) => {
    const { nombre, ejex, ejey, ejez, alto, ancho } = req.body;
    const result = await createEstanteDatabase(nombre, ejex, ejey, ejez, alto, ancho);
    handleDatabaseResult(res, result, {
        success: 'Estante creado correctamente',
        error: 'Error al crear el estante'
    });
});

const updateEstante = asyncHandler(async (req, res) => {
    const { nombre, ejex, ejey, ejez, alto, ancho } = req.body;
    const { idEstante } = req.query;
    const result = await updateEstanteDatabase(idEstante, nombre, ejex, ejey, ejez, alto, ancho);
    handleDatabaseResult(res, result, {
        success: 'Estante actualizado correctamente',
        error: 'Error al actualizar el estante'
    });
});

const deleteEstante = asyncHandler(async (req, res) => {
    const { idEstante } = req.query;
    const result = await deleteEstanteDatabase(idEstante);
    handleDatabaseResult(res, result, {
        success: 'Estante eliminado correctamente',
        error: 'Error al eliminar el estante'
    });
});

const addCajaEstante = asyncHandler(async (req, res) => {
    const { nombre, ejex, ejey, ejez } = req.body;
    const { idEstante } = req.query;
    const result = await updateEstanteDatabase(idEstante, nombre, ejex, ejey, ejez);
    handleDatabaseResult(res, result, {
        success: 'Estante actualizado correctamente',
        error: 'Error al actualizar el estante'
    });
});

const removeCajaEstante = asyncHandler(async (req, res) => {
    const { idEstante } = req.query;
    const result = await deleteEstanteDatabase(idEstante);
    handleDatabaseResult(res, result, {
        success: 'Estante eliminado correctamente',
        error: 'Error al eliminar el estante'
    });
});

module.exports = {
    getEstantes,
    getEstantesNivel,
    createEstante,
    updateEstante,
    deleteEstante,
    addCajaEstante,
    removeCajaEstante
};