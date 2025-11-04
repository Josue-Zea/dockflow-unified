const { getDocumentFromDBB64 } = require("./getDocumentFromDBB64");

const obtenerTramitePdfDatabase = async (idDocumento) => {
    const document = await getDocumentFromDBB64(idDocumento);
    return {
        correct: true,
        data: document
    };
};

module.exports = {
    obtenerTramitePdfDatabase
};