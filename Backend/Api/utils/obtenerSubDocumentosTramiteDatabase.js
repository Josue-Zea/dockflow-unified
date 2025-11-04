const { client } = require("../database/conection");

const obtenerSubDocumentosTramiteDatabase = async (idtramitepadre) => {
    const query =
    "SELECT * FROM subdocumento where idtramitepadre = ? ALLOW FILTERING";
    const result = await client.execute(query, [idtramitepadre], { prepare: true });

    if (result.hasError) {
        throw new Error(result.error);
    }
    return {
        correct: true,
        data: result.rows
    };
};

module.exports = {
    obtenerSubDocumentosTramiteDatabase
};