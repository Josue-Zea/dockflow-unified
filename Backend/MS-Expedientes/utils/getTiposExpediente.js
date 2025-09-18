const { client } = require("../database/conection");

const queryToDb = async (query) => {
    const result = await client.execute(query, []);

    if (result.hasError) {
        throw new Error(result.error);
    }

    return result.rows;
}


const getTipoExpedienteDB = async () => {
    try {
        const result = await queryToDb("SELECT * FROM TIPOEXPEDIENTE");
        return {
            correct: true,
            data: result
        };
    }catch(e){
        console.log(e);
        return {
            correct: false,
            data: {}
        };
    }
}

const getSubtipoExpedienteDB = async () => {
    try {
        const result = await queryToDb("SELECT * FROM SUBTIPOEXPEDIENTE");
        return {
            correct: true,
            data: result
        };
    }catch(e){
        console.log(e);
        return {
            correct: false,
            data: {}
        };
    }
}

module.exports = {
    getTipoExpedienteDB,
    getSubtipoExpedienteDB
};