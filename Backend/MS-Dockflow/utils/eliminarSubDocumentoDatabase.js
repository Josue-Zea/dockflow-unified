const { client } = require("../database/conection");

const eliminarSubDocumentoDatabase = async (idsubdocumento, iddocumento) => {
    const query =
    "DELETE FROM subdocumento WHERE id = ?";
    const result = await client.execute(query, [idsubdocumento], { prepare: true });

    const queryDoc =
    "DELETE FROM documento WHERE iddocumento = ?";
    const resultDoc = await client.execute(queryDoc, [iddocumento], { prepare: true });

    if (result.hasError || resultDoc.hasError) {
        throw new Error(result.error || resultDoc.error);
    }
    return {
        correct: true,
        data: result.rows
    };
};

module.exports = {
    eliminarSubDocumentoDatabase
};