const { client } = require("../database/conection");

const getTramitesExpedienteDatabase = async (idDocumento) => {
    const query =
    "SELECT * FROM tramite where iddocumento = ? ALLOW FILTERING";
    const result = await client.execute(query, [idDocumento], { prepare: true });

    if (result.hasError) {
        throw new Error(result.error);
    }

    return {
        correct: true,
        data: result.rows
    };
};

module.exports = {
    getTramitesExpedienteDatabase
};