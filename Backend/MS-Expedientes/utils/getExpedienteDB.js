const { client } = require("../database/conection");

const getExpedienteDB = async (num_exp, anio_exp) => {
    try {
        const result = await queryToDb(num_exp, anio_exp);
        const parsedDocument = parseDocument(result);

        if(parsedDocument.length === 0){
            return {
                correct: false,
                fromRM: false,
                data: {}
            };
        }
        return {
            correct: true,
            fromRM: false,
            data: parsedDocument
        };
    }catch(e){
        console.log("Error getExpedienteDB", e)
        return {
            correct: false,
            fromRM: false,
            data: {}
        };
    }
};

const queryToDb = async (num_exp, anio_exp) => {
    const query =
    "SELECT numero, anio, iddocumento FROM Expediente WHERE numero = ? and anio = ? ALLOW FILTERING";
    const result = await client.execute(query, [num_exp, anio_exp], { prepare: true });

    if (result.hasError) {
        throw new Error(result.error);
    }

    return result.rows;
}

const parseDocument = (document) => {
    let newDocument = [];
    for (let i = 0; i < document.length; i++) {
        const element = document[i];
        const doc = {
            numero: element.numero,
            anio: element.anio,
            iddocumento: element.iddocumento
        }
        newDocument.push(doc);
    }
    return [...newDocument];
}

module.exports = {
    getExpedienteDB
}