const { getPdfChunks } = require("./pdfUtils");

const getDocumentFromDB = async (idDocumento) => {
    const chunks = await getPdfChunks(idDocumento);
    const pdfBuffer = Buffer.concat(chunks.map(chunk => chunk.data));
    return pdfBuffer.toString('base64');
};

module.exports = {
    getDocumentFromDB
};
