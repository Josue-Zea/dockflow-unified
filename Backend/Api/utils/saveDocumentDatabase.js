const { createUUID, client } = require('../database/conection');
const { saveChunkedPdf } = require('./pdfUtils');
const logger = require('../helpers/logger');

const saveDocument = async (numero, anio, idPdf, numerotramite, idtipo, idsubtipo) => {
    try {
        const result = await client.execute(
            "INSERT INTO expediente (numero, anio, numerotramite, iddocumento, fecharegistro, fechainserto, idtipo, idsubtipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?) IF NOT EXISTS",
            [numero, anio, numerotramite, idPdf, new Date(), new Date(), idtipo, idsubtipo],
            { prepare: true }
        );

        const applied = result.first()['[applied]'];
        if (!applied) {
            return {
                correct: false,
                id: null,
                alreadyExists: true,
                error: null
            }
        }

        return {
            correct: true,
            id: idPdf,
            error: null
        }
    } catch (error) {
        logger.logError(error, { context: 'saveDocument' });
        return {
            correct: false,
            id: null,
            error: error
        }
    }
}

const savePdfInDatabase = async (numero, anio, pdfBase64, numerotramite, idtipo, idsubtipo) => {
    const id = await createUUID();
    await saveChunkedPdf(id, pdfBase64);
    return await saveDocument(numero, anio, id, numerotramite, idtipo, idsubtipo);
}

module.exports = {
    savePdfInDatabase,
};
