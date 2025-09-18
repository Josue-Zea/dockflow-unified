const { client } = require("../database/conection");

const obtenerTramitesDeExpedienteDatabase = async (iddocumento) => {
    const query =
    "SELECT * FROM tramite where iddocumento = ? ALLOW FILTERING";
    const result = await client.execute(query, [iddocumento], { prepare: true });

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