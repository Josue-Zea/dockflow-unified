const { client } = require("../database/conection");

const deleteCajaDatabase = async (idCaja) => {
    const query = "DELETE FROM Caja WHERE Id = ?";

    // Ejecuta la consulta pasando el UUID de la caja
    const result = await client.execute(query, [idCaja], { prepare: true });

    if (result.hasError) {
        throw new Error(result.error);
    }

    return {
        correct: true,
        data: result
    };
};

module.exports = {
    deleteCajaDatabase
};