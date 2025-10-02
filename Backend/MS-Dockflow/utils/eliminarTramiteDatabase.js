const { client } = require("../database/conection");

const eliminarTramiteDatabase = async (idtramite, iddocumento) => {
    const query =
    "DELETE FROM tramite WHERE id = ?";
    const result = await client.execute(query, [idtramite], { prepare: true });

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
    eliminarTramiteDatabase
};