const { client } = require("../database/conection");

const deleteEstanteDatabase = async (uuidEstante) => {
    const query = "DELETE FROM Estante WHERE Id = ?";

    // Ejecuta la consulta pasando el UUID del estante
    const result = await client.execute(query, [uuidEstante], { prepare: true });

    if (result.hasError) {
        throw new Error(result.error);
    }

    return {
        correct: true,
        data: result
    };
};

module.exports = {
    deleteEstanteDatabase
};