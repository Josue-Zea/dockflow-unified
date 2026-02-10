const { client } = require("../database/conection");
const logger = require('../helpers/logger');

const eliminarSubDocumentoDatabase = async (idsubdocumento, iddocumento) => {
    try {
        // Eliminar el registro del subdocumento
        const querySubDoc = "DELETE FROM subdocumento WHERE id = ?";
        const resultSubDoc = await client.execute(querySubDoc, [idsubdocumento], { prepare: true });

        if (resultSubDoc.hasError) {
            throw new Error(resultSubDoc.error);
        }

        // Eliminar todos los chunks del documento asociado
        const queryChunks = "SELECT NumeroParte FROM Documento WHERE IDDocumento = ?";
        const chunks = await client.execute(queryChunks, [iddocumento], { prepare: true });

        const deleteChunkQuery = "DELETE FROM Documento WHERE IDDocumento = ? AND NumeroParte = ?";
        for (const row of chunks.rows) {
            await client.execute(deleteChunkQuery, [iddocumento, row.numeroparte], { prepare: true });
        }

        return {
            correct: true,
            data: null
        };
    } catch (error) {
        logger.logError(error, { context: 'eliminarSubDocumentoDatabase' });
        return {
            correct: false,
            error: error.message
        };
    }
};

module.exports = {
    eliminarSubDocumentoDatabase
};
