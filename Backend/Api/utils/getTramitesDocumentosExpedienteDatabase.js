const { client } = require("../database/conection");
const { getDocumentFromDB } = require("./getDocumentFromDB");

const getTramitesDocumentosExpedienteDatabase = async (iddocumento) => {
    const query = "SELECT * FROM tramite WHERE iddocumento = ? ALLOW FILTERING";
    const result = await client.execute(query, [iddocumento], { prepare: true });

    if (result.hasError) {
        throw new Error(result.error);
    }

    let newDocuments = [];
    for (let i = 0; i < result.rows.length; i++) {
        const newDocument = {
            id: result.rows[i].id,
            idDocumento: iddocumento,
            pdfBase64: await getDocumentFromDB(result.rows[i].id.toString())
        }
        newDocuments.push(newDocument);
    }

    return {
        correct: true,
        data: newDocuments
    }
};

module.exports = {
    getTramitesDocumentosExpedienteDatabase
};
