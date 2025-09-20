const { createCajaDatabase } = require("../utils/createCajaDatabase");
const { deleteCajaDatabase } = require("../utils/deleteCajaDatabase");
const { getCajasDatabase } = require("../utils/getCajas");
const { getExpedientesDatabase, getAllExpedientesDatabase, getExpedientesFromSpecificBox } = require("../utils/getExpedientesDatabase");
const { updateCajaDatabase } = require("../utils/updateCajaDatabase");
const { addExpedienteCajaDB } = require("../utils/addExpedienteCajaDB");
const { removeExpedienteCajaDB } = require("../utils/removeExpedienteCajaDB");
const { getCajasSinEstanteDatabase } = require("../utils/getCajasSinEstanteDatabase");
const { getExpedientesSinCajaDatabase } = require("../utils/getExpedientesSinCajaDatabase");
const { getExpedienteMetadata } = require("../utils/getExpedienteMetadata");
const { getExpedienteMetadataFile } = require("../utils/getExpedienteMetadataFile");
const { changeFullBoxStatusDatabase } = require("../utils/changeFullBoxStatusDatabase");

const getCajas = async (req, res) => {
    const idEstante = req.params.idEstante;
    let code = 0, data = { message: "" };
    try {
        const result = await getCajasDatabase(idEstante);
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

const getCajasSinEstante = async (req, res) => {
    let code = 0, data = { message: "" };
    try {
        const result = await getCajasSinEstanteDatabase();
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

const getExpedientes = async (req, res) => {
    const idEstante = req.params.idEstante;
    const idCaja = req.params.idCaja;

    let code = 0, data = { message: "" };
    try {
        const result = await getExpedientesDatabase(idEstante, idCaja);
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

const getExpediente = async (req, res) => {
    const numero = req.params.numero;
    const anio = req.params.anio;

    let code = 0, data = { message: "" };
    try {
        const result = await getExpedienteMetadata(numero, anio);
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

const getDocumento = async (req, res) => {
    const idDocumento = req.params.idDocumento;

    let code = 0, data = { message: "" };
    try {
        const result = await getExpedienteMetadataFile(idDocumento);
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

const getExpedientesFromCaja = async (req, res) => {
    const idCaja = req.params.idCaja;

    let code = 0, data = { message: "" };
    try {
        const result = await getExpedientesFromSpecificBox(idCaja);
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

const getAllExpedientes = async (req, res) => {
    let code = 0, data = { message: "" };
    try {
        const result = await getAllExpedientesDatabase();
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

const getExpedientesSinCaja = async (req, res) => {
    let code = 0, data = { message: "" };
    try {
        const result = await getExpedientesSinCajaDatabase(idEstante, idCaja);
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

const createCaja = async (req, res) => {
    const { nombre, idestante } = req.body;
    let code = 0, data = { message: "" };
    try {
        const result = await createCajaDatabase(nombre, idestante);
        if (result.correct) {
            code = 200; data = { message: "Caja creada correctamente" };
        } else {
            code = 400; data = { message: "Ocurrió algún error" };
        }
    } catch (err) {
        console.log(err);
        code = 500; data = { message: "Ocurrió algún error" };
    }
    res.status(code).send(data);
};

const updateCaja = async (req, res) => {
    const { idEstante, nombre } = req.body;
    const { idCaja } = req.params;
    let code = 0, data = { message: "" };
    try {
        const result = await updateCajaDatabase(idCaja, idEstante, nombre);
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

const changeFullBoxStatus = async (req, res) => {
    const { idCaja, status } = req.params;
    let code = 0, data = { message: "" };
    try {
        const result = await changeFullBoxStatusDatabase(idCaja, status);
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

const deleteCaja = async (req, res) => {
    const { idCaja } = req.params;
    let code = 0, data = { message: "" };
    try {
        const result = await deleteCajaDatabase(idCaja);
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

const addExpedienteCaja = async (req, res) => {
    const { idCaja, idExpediente } = req.params;
    let code = 0, data = { message: "" };
    try {
        const result = await addExpedienteCajaDB(idCaja, idExpediente);
        if (result.correct) {
            code = 200; data = { message: "Expediente agregado a la caja correctamente" };
        } else {
            code = 400; data = { message: "Ocurrió algún error" };
        }
    } catch (err) {
        console.log(err);
        code = 500; data = { message: "Ocurrió algún error" };
    }
    res.status(code).send(data);
}

const removeExpedienteCaja = async (req, res) => {
    const { idExpediente } = req.params;
    let code = 0, data = { message: "" };
    try {
        const result = await removeExpedienteCajaDB(idExpediente);
        if (result.correct) {
            code = 200; data = { message: "Expediente eliminado de la caja correctamente" };
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
    getCajas,
    getCajasSinEstante,
    getExpedientesSinCaja,
    getAllExpedientes,
    getExpedientes,
    getExpediente,
    getDocumento,
    createCaja,
    updateCaja,
    deleteCaja,
    addExpedienteCaja,
    removeExpedienteCaja,
    getExpedientesFromCaja,
    changeFullBoxStatus
};