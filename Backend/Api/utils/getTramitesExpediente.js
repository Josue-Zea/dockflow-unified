const { client } = require("../database/conection");

const obtenerTramitesDeExpedienteDatabase = async (iddocumentopadre) => {
    const query =
    "SELECT * FROM tramite where iddocumentopadre = ? ALLOW FILTERING";
    const result = await client.execute(query, [iddocumentopadre], { prepare: true });

    if (result.hasError) {
        throw new Error(result.error);
    }
    return {
        correct: true,
        data: result.rows
    };
};

module.exports = {
    obtenerTramitesDeExpedienteDatabase
};