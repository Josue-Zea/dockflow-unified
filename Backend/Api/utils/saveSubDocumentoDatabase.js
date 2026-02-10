const { createUUID, client } = require('../database/conection');
const { saveChunkedPdf } = require('./pdfUtils');
const logger = require('../helpers/logger');

const saveSubDocument = async (id, iddocumento, nombre, fecha, tiposubdocumento, idtramitePadre, filepath) => {
  try {
    await client.execute(
      "INSERT INTO subdocumento (id, iddocumento, nombre, fecharegistro, tiposubdocumento, idtramitepadre, filepath) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, iddocumento, nombre, fecha, tiposubdocumento, idtramitePadre, filepath],
      { prepare: true }
    );

    return {
      correct: true,
      error: null,
      iddocumento,
      id
    }
  } catch (error) {
    logger.logError(error, { context: 'saveSubDocument' });
    return {
      correct: false,
      error: error,
      iddocumento: null,
      id: null
    }
  }
}

const saveSubDocumentInDatabase = async (idtramitePadre, pdfBase64, nombre, fecha, tiposubdocumento) => {
  const iddocumento = await createUUID()
  const id = await createUUID();
  await saveChunkedPdf(id, pdfBase64);
  return await saveSubDocument(id, iddocumento, nombre, fecha, tiposubdocumento, idtramitePadre, null);
}

const updateSubDocumentoFilePath = async (id, filepath) => {
  try {
    await client.execute(
      "UPDATE subdocumento SET filepath = ? WHERE id = ?",
      [filepath, id],
      { prepare: true }
    );
    return { correct: true };
  } catch (error) {
    logger.logError(error, { context: 'updateSubDocumentoFilePath' });
    return { correct: false, error };
  }
}

module.exports = {
  saveSubDocumentInDatabase,
  updateSubDocumentoFilePath,
};
