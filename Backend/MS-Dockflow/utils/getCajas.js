const { client } = require("../database/conection");

const getCajasDatabase = async (idEstante) => {
    let result;
    if (idEstante) {
        const query =
            "SELECT * FROM caja where idestante = ? ALLOW FILTERING";
        result = await client.execute(query, [idEstante]);
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