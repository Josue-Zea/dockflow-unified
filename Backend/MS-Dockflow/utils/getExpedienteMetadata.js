const { client } = require("../database/conection");

const getExpedienteMetadata = async (numero, anio) => {
    const query =
    "SELECT * from expediente where numero = ? and anio = ? ALLOW FILTERING";
    const result = await client.execute(query, [numero, anio], { prepare: true });

    if (result.hasError) {
        throw new Error(result.error);
    }

    if(result.rows[0] === undefined) {
        return {
            correct: false,
            data: { message: "No se encontró el expediente" }
        };
    }

    const document = result.rows[0];
    if(document.idcaja === null) {
        return {
            correct: true,
            data: document
        };
    }

    const queryBox =
    "SELECT * from caja where id = ? ALLOW FILTERING";
    const resultBox = await client.execute(queryBox, [document.idcaja], { prepare: true });

    if (resultBox.hasError) {
        throw new Error(resultBox.error);
    }

    const documentBox = resultBox.rows[0];
    document.idcaja = documentBox.id;
    document.nombrecaja = documentBox.nombre;
    
    if(documentBox.idestante === null) {
        return {
            correct: true,
            data: document
        };
    }

    const queryShelf =
    "SELECT * from estante where id = ? ALLOW FILTERING";
    const resultShelf = await client.execute(queryShelf, [documentBox.idestante], { prepare: true });
    
    if (resultShelf.hasError) {
        throw new Error(resultBox.error);
    }

    const documentShelf = resultShelf.rows[0];
    document.idestante = documentShelf.id;
    document.nombreestante = documentShelf.nombre;
    document.ejex = documentShelf.ejex;
    document.ejey = documentShelf.ejey;
    document.ejez = documentShelf.ejez;
    document.alto = documentShelf.alto;
    document.ancho = documentShelf.ancho;
    
    return {
        correct: true,
        data: document
    };
};

module.exports = {
    getExpedienteMetadata
};