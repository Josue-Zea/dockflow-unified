const { client } = require('../database/conection');

const removeExpedienteCajaDB = async (expedienteId) => {
    try {
        const getNumeroAnioQuery = `
            SELECT numero, anio FROM expediente WHERE iddocumento = ? ALLOW FILTERING
        `;
        const result = await client.execute(getNumeroAnioQuery, [expedienteId], { prepare: true });
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
        console.error('Error al eliminar expediente:', error);
        return {
            correct: false,
            error: error
        };
    }
};

module.exports = {
    removeExpedienteCajaDB
}