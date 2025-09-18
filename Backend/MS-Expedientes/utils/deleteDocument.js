const { client } = require('../database/conection');

const deleteChunks = async (idpdf) => {
    try {
        // Consulta para seleccionar todos los pedazos del documento por IDDocumento
        const query = "SELECT NumeroParte FROM Documento WHERE IDDocumento = ?";
        const result = await client.execute(query, [idpdf], { prepare: true });

        // Recorre cada chunk y lo elimina
        const deleteQuery = "DELETE FROM Documento WHERE IDDocumento = ? AND NumeroParte = ?";
        for (const row of result.rows) {
            await client.execute(deleteQuery, [idpdf, row.numeroparte], { prepare: true });
        }

        return { correct: true, error: null };
    } catch (error) {
        console.log("Error eliminando los chunks:", error);
        return { correct: false, error };
    }
};

const deleteMetadata = async (numero, anio, numerotramite) => {
    try {
        // Eliminar la metadata en la tabla expediente por IDDocumento
        const query = "DELETE FROM expediente WHERE numero = ? and anio = ? and numerotramite = ?";
        await client.execute(query, [numero, anio, numerotramite], { prepare: true });

        return { correct: true, error: null };
    } catch (error) {
        console.log("Error eliminando metadata:", error);
        return { correct: false, error };
    }
};

const deleteDocumennt = async (numero, anio, numerotramite, iddocumento) => {
    try {
        // Primero, eliminar los chunks del documento
        const chunkDeletionResult = await deleteChunks(iddocumento);
        if (!chunkDeletionResult.correct) {
            return { correct: false, error: chunkDeletionResult.error };
        }

        // Después, eliminar la metadata del documento
        const metadataDeletionResult = await deleteMetadata(numero, anio, numerotramite);
        if (!metadataDeletionResult.correct) {
            return { correct: false, error: metadataDeletionResult.error };
        }

        return { correct: true, error: null };
    } catch (error) {
        console.log("Error eliminando el PDF de la base de datos:", error);
        return { correct: false, error };
    }
};

module.exports = {
    deleteDocumennt,
};