const { client } = require("../database/conection");

const getCajasSinEstanteDatabase = async () => {
    let result;
    const query =
        "SELECT * FROM caja where idestante = 00000000-0000-0000-0000-000000000000 ALLOW FILTERING";
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
    getCajasSinEstanteDatabase
};