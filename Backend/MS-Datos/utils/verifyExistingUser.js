const { client } = require("../database/conection");
const uuid = require('uuid');
const { userAuthResponse } = require("../helpers/objectResponses");
const { getPermissionsUser, getPermissionsDB } = require("./permissionsDB");

const verifyExistingUser = async (userData) => {
    const { nombre_completo, unidad } = userData;
    const userFounded = await foundUser(nombre_completo);
    if (userFounded.length === 0) {
        return await createUser(nombre_completo, unidad);
    } else {
        return await getFoundedUser(userFounded[0]);
    }
}

const foundUser = async (nombre) => {
    const query = "SELECT * FROM Usuario WHERE nombre = ? ALLOW FILTERING";
    const result = await client.execute(query, [nombre]);

    if (result.hasError) {
        throw new Error(result.error);
    }

    return result.rows;
}

const foundUnity = async ( abreviatura, uuid ) => {
    const query = abreviatura !== "" ?
    "SELECT ID, Abreviatura FROM TipoUsuario WHERE Abreviatura = ? ALLOW FILTERING" : 
    "SELECT ID, Abreviatura FROM TipoUsuario WHERE id = ?";
    const result = await client.execute(query, [abreviatura !== "" ? abreviatura : uuid]);

    if (result.hasError) {
        throw new Error(result.error);
    }

    return result.first();
}

const createUser = async (nombre_completo, unidad) => {
    const result = await foundUnity(unidad, "");
    const uuidTipoUsuario = uuid.stringify(result.id.buffer);
    const uuidUsuario = uuid.v4();
    const resultInsert = await client.execute(
        "INSERT INTO Usuario (Id, IDTipoUsuario, Nombre) VALUES (?, ?, ?)",
        [uuidUsuario, uuidTipoUsuario, nombre_completo],
        { prepare: true }
    );
    if (resultInsert.info.queriedHost) {
        const permissions = await getPermissionsDB(uuidTipoUsuario);

        data = userAuthResponse(
            uuidUsuario,
            nombre_completo,
            uuidTipoUsuario,
            unidad,
            permissions.permisoexpedientes,
            permissions.permisolibros,
            permissions.verexpedientesproceso,
            permissions.verlibrosproceso
        );
        return { correct: true, data };
    } else {
        return { correct: false, };
    }
}

const getFoundedUser = async ( user ) => {
    const uuidTipoUsuario = uuid.stringify(user.idtipousuario.buffer);
    const uuidUsuario = uuid.stringify(user.id.buffer);
    const tipoUsuario = await foundUnity("", uuidTipoUsuario);
    const permissions = await getPermissionsUser(uuidTipoUsuario);
    data = userAuthResponse(
        uuidUsuario,
        user.nombre,
        tipoUsuario.id,
        tipoUsuario.abreviatura,
        permissions.permisoexpedientes,
        permissions.permisolibros,
        permissions.verexpedientesproceso,
        permissions.verlibrosproceso
    );
    return { correct: true, data };
}

module.exports = {
    verifyExistingUser,
};