const { client } = require("../database/conection");

const changeFullBoxStatusDatabase = async (idCaja, status) => {
    const query =`
        UPDATE Caja 
        SET Lleno = ?
        WHERE Id = ?`;
    const result = await client.execute(query, [status, idCaja], { prepare : true });

    if (result.hasError) {
        throw new Error(result.error);
    }
    return {
        correct: true,
        data: result
    };
}

module.exports = {
    changeFullBoxStatusDatabase
};