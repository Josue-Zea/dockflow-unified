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

const saveTramite = async (id, iddocumento, nombre, fecha, tipotramite) => {
    try {
        await client.execute(
            "INSERT INTO tramite (id, iddocumento, nombre, fecharegistro, tipotramite) VALUES (?, ?, ?, ?, ?)",
            [id, iddocumento, nombre, fecha, tipotramite],
            { prepare: true }
        );

        return {
            correct: true,
            fromRM: false,
            error: null
        }
    } catch (error) {
        console.log(error)
        return {
            correct: false,
            fromRM: false,
            error: error
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

const saveTramiteInDatabase = async (iddocumento, pdfBase64, nombre, fecha, tipotramite) => {
    // Divide el PDF en pedazos de 1 MB.
    const chunks = await splitPdf(pdfBase64);

    // Generamos el id del nuevo pdf
    const id = await createUUID();

    // Guarda los pedazos del PDF en la tabla de datos.
    for (let i = 0; i < chunks.length; i++) {
        await saveChunk(id, i + 1, chunks[i]);
    }

    // Guarda los metadatos del PDF en la tabla de metadatos.
    return await saveTramite(id, iddocumento, nombre, fecha, tipotramite);
}

module.exports = {
    saveTramiteInDatabase,
};