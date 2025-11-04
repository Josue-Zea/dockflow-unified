const { client } = require("../database/conection");

const getExpedientesDatabase = async (idEstante, idCaja) => {
    const query =
    "SELECT expedientes FROM caja where idestante = ? and id = ? ALLOW FILTERING";
    const result = await client.execute(query, [idEstante, idCaja]);

    if (result.hasError) {
        throw new Error(result.error);
    }
    return {
        correct: true,
        data: result.rows
    };
};

const getExpedientesFromSpecificBox = async (idCaja) => {
    const query =
    "SELECT * FROM expediente where idcaja = ? ALLOW FILTERING";
    const result = await client.execute(query, [idCaja]);

    if (result.hasError) {
        throw new Error(result.error);
    }
    return {
        correct: true,
        data: result.rows
    };
};

const getAllExpedientesDatabase = async () => {
    const query =
    "SELECT numero, anio, iddocumento, fechainserto, idcaja FROM expediente ALLOW FILTERING";
    const result = await client.execute(query);

    if (result.hasError) {
        throw new Error(result.error);
    }
    return {
        correct: true,
        data: result.rows
    };
};

module.exports = {
    getExpedientesDatabase,
    getAllExpedientesDatabase,
    getExpedientesFromSpecificBox
};