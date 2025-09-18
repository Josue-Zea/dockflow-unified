const { client } = require("../database/conection");

const getEstantesNivelDatabase = async (idNivel) => {
    const query =
    `SELECT * FROM estante where ejez = ${idNivel} ALLOW FILTERING`;
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
    getEstantesNivelDatabase
};