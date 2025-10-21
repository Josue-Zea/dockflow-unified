const { getDocumentFromDBB64 } = require("./getDocumentFromDBB64");

const obtenerSubDocumentoPdfDatabase = async (idDocumento) => {
    const document = await getDocumentFromDBB64(idDocumento);
    return {
        correct: true,
        data: document
    };
};

module.exports = {
    obtenerSubDocumentoPdfDatabase
};