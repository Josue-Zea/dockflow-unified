const { client } = require("../database/conection");

const addCajaEstanteDatabase = async (idCaja, idEstante, nombre) => {
    const query =`
        UPDATE Caja 
        SET Nombre = ?, IdEstante = ? 
        WHERE Id = ?`;
    const result = await client.execute(query, [nombre, idEstante, idCaja], { prepare : true });

    if (result.hasError) {
        throw new Error(result.error);
    }
    return {
        correct: true,
        data: result
    };
}

module.exports = {
    addCajaEstanteDatabase
};