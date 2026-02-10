const { client } = require('../database/conection');
const logger = require('../helpers/logger');

const addExpedienteCajaDB = async (idCaja, idDocumentoExpediente) => {
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
            UPDATE expediente set idcaja = ? WHERE numero = ? AND anio = ? AND numerotramite = ?
        `;
        await client.execute(
            updateQuery,
            [idCaja, expediente.numero, expediente.anio, 1],
            { prepare: true }
        );

        return {
            correct: true,
            error: null
        };
    } catch (error) {
        logger.logError(error, { context: 'addExpedienteCajaDB' });
        return {
            correct: false,
            error: error
        };
    }
};

module.exports = {
    addExpedienteCajaDB
}