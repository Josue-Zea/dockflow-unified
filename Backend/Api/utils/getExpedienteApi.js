const { getExpedienteDB } = require('./getExpedienteDB');
const { getDocumentFromDB } = require('./getDocumentFromDB');
const logger = require('../helpers/logger');

const lookInDatabase = async (num_exp, anio_exp) => {
    try {
        const result = await getExpedienteDB(num_exp, anio_exp);
        if (!result.correct) {
            return { correct: false, notFound: result.notFound || false, fromRM: false, data: {} };
        }
        const b64Document = await getDocumentFromDB(result.data[0].iddocumento)
        return { correct: true, fromRM: false, data: b64Document };
    } catch (err) {
        logger.logError(err, { context: 'lookInDatabase' });
        return { correct: false, fromRM: false, data: {} };
    }
}

module.exports = {
    lookInDatabase
};