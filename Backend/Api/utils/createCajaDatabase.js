const { client, createUUID } = require("../database/conection");

const createCajaDatabase = async (nombre, idestante) => {
    const uuidCaja = await createUUID();
    let result = null;
    const finalIdEstante = idestante || "00000000-0000-0000-0000-000000000000";

    const query =
        "INSERT INTO Caja (Id, Nombre, idEstante, Lleno) VALUES (?, ?, ?, ?)";
    result = await client.execute(query, [uuidCaja, nombre, finalIdEstante, 0], { prepare: true });

    if (result.hasError) {
        throw new Error(result.error);
    }
    return {
        correct: true,
        data: { id: uuidCaja, nombre, idEstante: finalIdEstante },
    };
}

module.exports = {
    createCajaDatabase
};