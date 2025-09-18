const { client } = require("../database/conection");

const updateEstanteDatabase = async (uuidEstante, nombre, ejex, ejey, ejez, alto, ancho) => {
    const query =`
        UPDATE Estante 
        SET Nombre = ?, EjeX = ?, EjeY = ?, EjeZ = ?, Alto = ?, Ancho = ?
        WHERE Id = ?`;
    const result = await client.execute(query, [nombre, ejex, ejey, ejez, alto, ancho, uuidEstante], { prepare : true });

    if (result.hasError) {
        throw new Error(result.error);
    }
    return {
        correct: true,
        data: result
    };
}

module.exports = {
    updateEstanteDatabase
};