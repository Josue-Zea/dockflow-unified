const { client } = require("../database/conection");

const getCajasDatabase = async (idCaja) => {
    let result;
    if (idCaja) {
        const query =
            "SELECT * FROM caja where id = ? ALLOW FILTERING";
        result = await client.execute(query, [idCaja]);
    } else {
        const query =
            "SELECT * FROM caja";
        result = await client.execute(query);
    }

    if (result.hasError) {
        throw new Error(result.error);
    }
    return {
        correct: true,
        data: result.rows
    };
};

module.exports = {
    getCajasDatabase
};