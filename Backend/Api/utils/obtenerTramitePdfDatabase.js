const { getDocumentFromDB } = require("./getDocumentFromDB");

const obtenerTramitePdfDatabase = async (idDocumento) => {
    const document = await getDocumentFromDB(idDocumento);
    return {
        correct: true,
        data: document
    };
};

module.exports = {
    obtenerTramitePdfDatabase
};