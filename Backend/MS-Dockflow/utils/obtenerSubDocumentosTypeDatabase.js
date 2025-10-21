const { client } = require("../database/conection");

const obtenerSubDocumentosTypeDatabase = async () => {
    const query =
            "SELECT * FROM TipoSubdocumento";
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
    obtenerSubDocumentosTypeDatabase
};