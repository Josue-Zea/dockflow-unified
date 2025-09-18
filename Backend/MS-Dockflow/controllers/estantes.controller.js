const { createEstanteDatabase } = require("../utils/createEstanteDatabase");
const { deleteEstanteDatabase } = require("../utils/deleteEstanteDatabase");
const { getEstantesDatabase } = require("../utils/getEstantesDatabase");
const { getEstantesNivelDatabase } = require("../utils/getEstantesNivelDatabase");
const { updateEstanteDatabase } = require("../utils/updateEstanteDatabase");

const getEstantes = async (req, res) => {
    let code = 0, data = { message: "" };
    try {
        const result = await getEstantesDatabase();
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

const getEstantesNivel = async (req, res) => {
    const idNivel = req.params.idNivel;
    let code = 0, data = { message: "" };
    try {
        const result = await getEstantesNivelDatabase(idNivel);
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

const createEstante = async (req, res) => {
    const { nombre, ejex, ejey, ejez, alto, ancho } = req.body;
    let code = 0, data = { message: "" };
    try {
        const result = await createEstanteDatabase(nombre, ejex, ejey, ejez, alto, ancho);
        if (result.correct) {
            code = 200; data = { message: "Estante creado correctamente" };
        } else {
            code = 400; data = { message: "Ocurrió algún error" };
        }
    } catch (err) {
        console.log(err);
        code = 500; data = { message: "Ocurrió algún error" };
    }
    res.status(code).send(data);
};

const updateEstante = async (req, res) => {
    const { nombre, ejex, ejey, ejez, alto, ancho } = req.body;
    const { idEstante } = req.params;
    let code = 0, data = { message: "" };
    try {
        const result = await updateEstanteDatabase(idEstante, nombre, ejex, ejey, ejez, alto, ancho);
        if (result.correct) {
            code = 200; data = { message: "Estante actualizado correctamente" };
        } else {
            code = 400; data = { message: "Ocurrió algún error" };
        }
    } catch (err) {
        console.log(err);
        code = 500; data = { message: "Ocurrió algún error" };
    }
    res.status(code).send(data);
}

const deleteEstante = async (req, res) => {
    const { idEstante } = req.params;
    let code = 0, data = { message: "" };
    try {
        const result = await deleteEstanteDatabase(idEstante);
        if (result.correct) {
            code = 200; data = { message: "Estante eliminado correctamente" };
        } else {
            code = 400; data = { message: "Ocurrió algún error" };
        }
    } catch (err) {
        console.log(err);
        code = 500; data = { message: "Ocurrió algún error" };
    }
    res.status(code).send(data);
}

const addCajaEstante = async (req, res) => {
    const { nombre, ejex, ejey, ejez } = req.body;
    const { idEstante } = req.params;
    let code = 0, data = { message: "" };
    try {
        const result = await updateEstanteDatabase(idEstante, nombre, ejex, ejey, ejez);
        if (result.correct) {
            code = 200; data = { message: "Estante actualizado correctamente" };
        } else {
            code = 400; data = { message: "Ocurrió algún error" };
        }
    } catch (err) {
        console.log(err);
        code = 500; data = { message: "Ocurrió algún error" };
    }
    res.status(code).send(data);
}

const removeCajaEstante = async (req, res) => {
    const { idEstante } = req.params;
    let code = 0, data = { message: "" };
    try {
        const result = await deleteEstanteDatabase(idEstante);
        if (result.correct) {
            code = 200; data = { message: "Estante eliminado correctamente" };
        } else {
            code = 400; data = { message: "Ocurrió algún error" };
        }
    } catch (err) {
        console.log(err);
        code = 500; data = { message: "Ocurrió algún error" };
    }
    res.status(code).send(data);
}

module.exports = {
    getEstantes,
    getEstantesNivel,
    createEstante,
    updateEstante,
    deleteEstante,
    addCajaEstante,
    removeCajaEstante
};