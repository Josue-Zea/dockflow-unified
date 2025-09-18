const { client } = require("../database/conection");

const obtenerTramitesTypeDatabase = async () => {
    const query =
            "SELECT * FROM TipoTramite";
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
    obtenerTramitesTypeDatabase
};