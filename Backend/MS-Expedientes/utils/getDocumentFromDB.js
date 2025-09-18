const { client } = require("../database/conection");

const getPdfChunks = async (idDocumento) => {
    const query = "SELECT data FROM documento WHERE iddocumento = ? ORDER BY numeroparte ASC";
    const result = await client.execute(query, [idDocumento]);

    if (result.hasError) {
        throw new Error(result.error);
    }

    return result.rows;
};

const getDocumentFromDB = async (idDocumento) => {
    const chunks = await getPdfChunks(idDocumento);

    // Concatenar todos los chunks en un solo buffer
    const pdfBuffer = Buffer.concat(chunks.map(chunk => chunk.data));

    // Convertir el buffer a base64
    const pdfBase64 = pdfBuffer.toString('base64');

    return pdfBase64
};

module.exports = {
    getDocumentFromDB
}