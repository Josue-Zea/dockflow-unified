const { createUUID, client } = require('../database/conection');
const { saveChunkedPdf } = require('./pdfUtils');
const logger = require('../helpers/logger');

const saveTramite = async (id, iddocumento, nombre, fecha, tipotramite, iddocumentoPadre) => {
    try {
        await client.execute(
            "INSERT INTO tramite (id, iddocumento, nombre, fecharegistro, tipotramite, iddocumentopadre) VALUES (?, ?, ?, ?, ?, ?)",
            [id, iddocumento, nombre, fecha, tipotramite, iddocumentoPadre],
            { prepare: true }
        );

        return {
            correct: true,
            id,
            iddocumento,
            error: false
        }
    } catch (error) {
        logger.logError(error, { context: 'saveTramite' });
        return {
            correct: false,
            error: error,
            iddocumento: null,
            id: null
        }
    }
}

const saveTramiteInDatabase = async (iddocumentoexpediente, pdfBase64, nombre, fecha, tipotramite) => {
    const iddocumento = await createUUID()
    const id = await createUUID();
    await saveChunkedPdf(id, pdfBase64);
    return await saveTramite(id, iddocumento, nombre, fecha, tipotramite, iddocumentoexpediente);
}

module.exports = {
    saveTramiteInDatabase,
};
