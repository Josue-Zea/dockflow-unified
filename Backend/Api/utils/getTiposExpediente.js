const { client } = require("../database/conection");
const logger = require('../helpers/logger');

const queryToDb = async (query) => {
    const result = await client.execute(query, []);

    if (result.hasError) {
        throw new Error(result.error);
    }

    return result.rows;
}

const getTiposExpedienteDB = async () => {
    try {
        const result = await queryToDb("SELECT * FROM TIPOEXPEDIENTE");
        return {
            correct: true,
            data: result
        };
    }catch(e){
        logger.logError(e, { context: 'getTiposExpediente' });
        return {
            correct: false,
            data: {}
        };
    }
}

const getSubtiposExpedienteDB = async () => {
    try {
        const result = await queryToDb("SELECT * FROM SUBTIPOEXPEDIENTE");
        return {
            correct: true,
            data: result
        };
    }catch(e){
        logger.logError(e, { context: 'getTiposExpediente' });
        return {
            correct: false,
            data: {}
        };
    }
}

module.exports = {
    getTiposExpedienteDB,
    getSubtiposExpedienteDB
};