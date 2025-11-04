const { FILES_SERVICE_CONFIG } = require('../config/config');
const { createUUID, client } = require('../database/conection');

const splitPdf = (base64Data, chunkSize = 1024 * 1024) => {
  return new Promise((resolve, reject) => {
    try {
      // Decodificar el base64 a un buffer
      const data = Buffer.from(base64Data, 'base64');

      // Obtener el tamaño total del archivo
      const fileSize = data.length;

      // Calcular el número total de pedazos
      const totalChunks = Math.ceil(fileSize / chunkSize);

      // Array para almacenar los pedazos del archivo
      const fileChunks = [];

      // Dividir el archivo en pedazos de 1MB y guardarlos en el array
      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = (i + 1) * chunkSize;
        const chunk = data.slice(start, end);
        fileChunks.push(chunk);
      }

      // Resolver la promesa con el array de pedazos
      resolve(fileChunks);
    } catch (err) {
      reject(err);
    }
  });
}

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
    console.log(error)
    return {
      correct: false,
      error: error,
      id: null
    }
  }
}

const saveChunk = async (id, chunk_number, chunk) => {
  await client.execute(
    "INSERT INTO Documento (IDDocumento, NumeroParte, Data) VALUES (?, ?, ?)",
    [id, chunk_number, chunk],
    { prepare: true }
  );
}

const saveFileDatabase = async (iddocumento, nombre, guardarservidor, tipotramite, pdfbase64) => {
  // Divide el PDF en pedazos de 1 MB.
  const chunks = await splitPdf(pdfbase64);

  // Guarda los pedazos del PDF en la tabla de datos.
  for (let i = 0; i < chunks.length; i++) {
    await saveChunk(iddocumento, i + 1, chunks[i]);
  }

  const filePath = guardarservidor ?
    `${FILES_SERVICE_CONFIG.BASE_PATH}/files/${iddocumento}.pdf` :
    "";

  // Guarda los metadatos del PDF en la tabla de metadatos.
  return await saveFile(iddocumento, nombre, tipotramite, filePath);
}

module.exports = {
  saveFileDatabase,
};