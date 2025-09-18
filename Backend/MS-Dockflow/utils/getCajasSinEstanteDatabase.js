const { client } = require("../database/conection");

const getCajasSinEstanteDatabase = async () => {
    let result;
    const query =
        "SELECT * FROM caja where idestante = null ALLOW FILTERING";
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