const { createUUID, client } = require("../database/conection");
const { getPayloadToken } = require("../helpers/getPayloadToken");

const saveLog = async (login, operacion, descripcion, request) => {
    const consulta = login ? "INSERT INTO Bitacora (Id, Fecha, Operacion, Descripcion) VALUES (?, ?, ?, ?)"
                    : " Bitacora (Id, Fecha, IDUsuario, Operacion, Descripcion) VALUES (?, ?, ?, ?, ?)";
    const uuidUsuario = await createUUID();
    const operation = JSON.stringify(operacion);
    const description = JSON.stringify(descripcion);
    let payload;
    if(!login){ // A ejecutarse solo cuando no es login, osea existe token
        const token = request.headers.authorization.split(" ").pop();
        payload = getPayloadToken(token);
    }
    const values = login ? [uuidUsuario, new Date(), operation, description]
                    : [uuidUsuario, new Date(), payload.id, operation, description];
    try {
        // Utilizar async/await para realizar la consulta
        await client.execute(
            consulta,
            values,
            { prepare: true }
        );
    } catch (err) {
        console.error('Error al insertar en la tabla Bitacora:', err);
    }
}

module.exports = {
    saveLog
}