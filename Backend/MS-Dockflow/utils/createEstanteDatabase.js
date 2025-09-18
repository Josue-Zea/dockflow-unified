const { client, createUUID } = require("../database/conection");

const createEstanteDatabase = async (nombre, ejex, ejey, ejez, alto, ancho) => {
    const uuidEstante = await createUUID();
    const query =
    "INSERT INTO Estante (Id, Nombre, EjeX, EjeY, EjeZ, Alto, Ancho) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const result = await client.execute(query, [uuidEstante, nombre, ejex, ejey, ejez, alto, ancho], { prepare : true });

    if (result.hasError) {
        throw new Error(result.error);
    }
    return {
        correct: true,
        data: result
    };
}

module.exports = {
    createEstanteDatabase
};