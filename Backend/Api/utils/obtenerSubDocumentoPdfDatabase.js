const { getDocumentFromDB } = require("./getDocumentFromDB");
const logger = require('../helpers/logger');

const obtenerSubDocumentoPdfDatabase = async (idSubDocumento) => {
    try {
        // El id del subdocumento ES el IDDocumento en la tabla documento
        // (los chunks se guardan con saveChunk(id, ...) donde id es el mismo)
        const document = await getDocumentFromDB(idSubDocumento);

        if (!document || document.length === 0) {
            return {
                correct: false,
                notFound: true,
                data: null
            };
        }

        return {
            correct: true,
            data: document
        };
    } catch (error) {
        logger.logError(error, { context: 'obtenerSubDocumentoPdfDatabase' });
        return {
            correct: false,
            data: null,
            error: error.message
        };
    }
};

module.exports = {
    obtenerSubDocumentoPdfDatabase
};
