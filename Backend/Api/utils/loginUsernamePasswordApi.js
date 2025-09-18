const { userAuthResponse } = require('../helpers/objectResponses');
const { client } = require("../database/conection");
const uuid = require('uuid');

const loginUsernamePasswordApi = async (user, psw) => {
    const query = "SELECT * FROM Usuario WHERE usuario = ? AND contrasenia = ? ALLOW FILTERING";
    const result = await client.execute(query, [user, psw]);

    if (result.hasError) {
        throw new Error(result.error);
    }

    if (result.rowLength === 0) return { correct: false, data: {} };
    return await getFoundedUser(result.rows[0]);
}

const getFoundedUser = async (user) => {
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

const foundUnity = async (abreviatura, uuid) => {
    const query = abreviatura !== "" ?
        "SELECT ID, Abreviatura FROM TipoUsuario WHERE Abreviatura = ? ALLOW FILTERING" :
        "SELECT ID, Abreviatura FROM TipoUsuario WHERE id = ?";
    const result = await client.execute(query, [abreviatura !== "" ? abreviatura : uuid]);

    if (result.hasError) {
        throw new Error(result.error);
    }

    return result.first();
}

const getPermissionsUser = async (uuidTipoUsuario) => {
    const query =
        "SELECT * FROM PermisosTipoUsuario WHERE idtipousuario = ? ALLOW FILTERING";
    const result = await client.execute(query, [uuidTipoUsuario]);

    if (result.hasError) {
        throw new Error(result.error);
    }
    return result.first();
}

module.exports = {
    loginUsernamePasswordApi,
};