const { client } = require("../database/conection");

const getEstantesNivelDatabase = async (idNivel) => {
    const query =
    `SELECT * FROM estante where ejez = ? ALLOW FILTERING`;
    const result = await client.execute(query, [idNivel], { prepare: true });

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