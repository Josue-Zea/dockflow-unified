const { client } = require('../database/conection');

const addExpedienteCajaDB = async (idCaja, expedienteId) => {
    try {
        const getNumeroAnioQuery = `
            SELECT numero, anio FROM expediente WHERE iddocumento = ? ALLOW FILTERING
        `;
        const result = await client.execute(getNumeroAnioQuery, [expedienteId], { prepare: true });
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
        console.error('Error al agregar expediente:', error);
        return {
            correct: false,
            error: error
        };
    }
};

module.exports = {
    addExpedienteCajaDB
}