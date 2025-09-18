const { client } = require("../database/conection");

const getInfoExpedienteDatabase = async (numero, anio) => {
    const query =
    "SELECT * FROM expediente where numero = ? and anio = ? ALLOW FILTERING";
    const result = await client.execute(query, [numero, anio], { prepare: true });

    if (result.hasError) {
        return {
            correct: false,
            data: result.error
        }
    }

    if(result.rows[0].idtipo === null) {
        return {
            correct: true,
            data: result.rows[0]
        }
    }

    const queryForType =
    "SELECT * FROM tipoexpediente where id = ? ALLOW FILTERING";
    const resultTypes = await client.execute(queryForType, [result.rows[0].idtipo]);
    
    if (resultTypes.hasError) {
        return {
            correct: false,
            data: resultTypes.error
        }
    }

    const data = {
        ...result.rows[0],
        ...resultTypes.rows[0]
    }
    
    return {
        correct: true,
        data: data
    };
};

module.exports = {
    getInfoExpedienteDatabase
};