const { client } = require('../database/conection');
const logger = require('../helpers/logger');

const removeExpedienteCajaDB = async (idDocumentoExpediente) => {
    try {
        const getNumeroAnioQuery = `
            SELECT numero, anio FROM expediente WHERE iddocumento = ? ALLOW FILTERING
        `;
        const result = await client.execute(getNumeroAnioQuery, [idDocumentoExpediente], { prepare: true });
        if (result.rowLength === 0) {
            return {
                correct: false,
                data: { message: "No se encontró el expediente" }
            };
        }
        const expediente = result.rows[0];

        const updateQuery = `
            UPDATE expediente set idcaja = null WHERE numero = ? AND anio = ? AND numerotramite = ?
        `;
        await client.execute(
            updateQuery,
            [expediente.numero, expediente.anio, 1],
            { prepare: true }
        );

        return {
            correct: true,
            error: null
        };
    } catch (error) {
        logger.logError(error, { context: 'removeExpedienteCajaDB' });
        return {
            correct: false,
            error: error
        };
    }
};

module.exports = {
    removeExpedienteCajaDB
}