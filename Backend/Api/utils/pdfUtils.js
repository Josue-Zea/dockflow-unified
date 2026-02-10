const { client } = require("../database/conection");
const { splitPdf } = require("./splitPdf");

const getPdfChunks = async (idDocumento) => {
    const query = "SELECT data FROM documento WHERE iddocumento = ? ORDER BY numeroparte ASC";
    const result = await client.execute(query, [idDocumento]);

    if (result.hasError) {
        throw new Error(result.error);
    }

    return result.rows;
};

const saveChunk = async (id, chunk_number, chunk) => {
    await client.execute(
        "INSERT INTO Documento (IDDocumento, NumeroParte, Data) VALUES (?, ?, ?)",
        [id, chunk_number, chunk],
        { prepare: true }
    );
};

const saveChunkedPdf = async (id, pdfBase64) => {
    const chunks = await splitPdf(pdfBase64);
    for (let i = 0; i < chunks.length; i++) {
        await saveChunk(id, i + 1, chunks[i]);
    }
};

module.exports = { getPdfChunks, saveChunk, saveChunkedPdf };
