const { FILES_SERVICE_CONFIG } = require('../config/config');
const { client } = require('../database/conection');
const { saveChunkedPdf } = require('./pdfUtils');
const logger = require('../helpers/logger');

const saveFile = async (iddocumento, nombre, tipotramite, filePath) => {
  try {
    await client.execute(
      "INSERT INTO archivo (iddocumento, nombre, filepath, tipotramite) VALUES (?, ?, ?, ?)",
      [iddocumento, nombre, filePath, tipotramite],
      { prepare: true }
    );

    return {
      correct: true,
      error: null,
      iddocumento
    }
  } catch (error) {
    logger.logError(error, { context: 'saveFile' });
    return {
      correct: false,
      error: error,
      id: null
    }
  }
}

const saveFileDatabase = async (iddocumento, nombre, guardarservidor, tipotramite, pdfbase64) => {
  await saveChunkedPdf(iddocumento, pdfbase64);

  const filePath = guardarservidor ?
    `${FILES_SERVICE_CONFIG.BASE_PATH}/files/${iddocumento}.pdf` :
    "";

  return await saveFile(iddocumento, nombre, tipotramite, filePath);
}

module.exports = {
  saveFileDatabase,
};
