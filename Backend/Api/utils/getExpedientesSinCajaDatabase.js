const { client } = require("../database/conection");

const getExpedientesSinCajaDatabase = async () => {
    let result;
    const query =
        "SELECT * FROM expediente where idcaja = null ALLOW FILTERING";
    result = await client.execute(query);

    if (result.hasError) {
        throw new Error(result.error);
    }
    return {
        correct: true,
        data: result.rows
    };
};

module.exports = {
    getExpedientesSinCajaDatabase
};